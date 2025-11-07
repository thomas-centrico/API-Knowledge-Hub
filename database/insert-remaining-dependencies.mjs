import Database from 'better-sqlite3';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
function loadEnvFile() {
  const envPath = join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnvFile();

const DB_PATH = process.env.DB_PATH || '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\DB\\APIDATA.db';

console.log('🚀 Inserting remaining dependency relationships...');
console.log('📊 Database:', DB_PATH);

try {
  const db = new Database(DB_PATH, { readonly: false, timeout: 5000 });
  console.log('✅ Connected to database');

  // Count existing
  const existingDeps = db.prepare('SELECT COUNT(*) as count FROM API_DEPENDENCIES').get().count;
  console.log('📊 Existing dependencies:', existingDeps);

  // Read SQL file and extract only API_DEPENDENCIES statements
  const sqlPath = join(__dirname, 'insert_dependencies_sample_fixed.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  
  // Extract values from INSERT statements
  const dependencyPattern = /INSERT INTO API_DEPENDENCIES.*?VALUES\s*\('([^']+)',\s*'([^']+)'\)/gi;
  const matches = [...sqlContent.matchAll(dependencyPattern)];
  
  console.log(`📝 Found ${matches.length} dependency relationships in SQL file`);
  
  const insertStmt = db.prepare('INSERT OR IGNORE INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES (?, ?)');
  
  let inserted = 0;
  let skipped = 0;
  
  console.log('🔄 Inserting dependencies...');
  
  const insertMany = db.transaction((dependencies) => {
    for (const [_, apiId, dependsOnId] of dependencies) {
      const result = insertStmt.run(apiId, dependsOnId);
      if (result.changes > 0) {
        inserted++;
        if (inserted % 10 === 0) {
          process.stdout.write(`\r   Inserted ${inserted} new dependencies...`);
        }
      } else {
        skipped++;
      }
    }
  });
  
  insertMany(matches);
  
  console.log(`\n\n✅ Insertion complete!`);
  console.log(`   New dependencies added: ${inserted}`);
  console.log(`   Skipped (already exist): ${skipped}`);
  
  const finalCount = db.prepare('SELECT COUNT(*) as count FROM API_DEPENDENCIES').get().count;
  console.log(`📊 Total dependencies now: ${finalCount}`);
  
  // Show top APIs with most dependencies
  console.log('\n📈 Top 5 APIs with most dependencies:');
  const topDeps = db.prepare(`
    SELECT am.NAME as api_name, COUNT(*) as dependency_count
    FROM API_DEPENDENCIES ad
    JOIN API_METADATA am ON ad.API_ID = am.ID
    GROUP BY ad.API_ID
    ORDER BY dependency_count DESC
    LIMIT 5
  `).all();
  
  topDeps.forEach((row, i) => {
    console.log(`   ${i + 1}. ${row.api_name}: ${row.dependency_count} dependencies`);
  });
  
  db.close();
  console.log('\n✅ Database connection closed');
  console.log('🎉 Dependencies ready! View them in the Knowledge Graph.');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
