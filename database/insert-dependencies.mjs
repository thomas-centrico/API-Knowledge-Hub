/**
 * Insert Sample Dependencies Data
 * This script populates the API_DEPENDENCIES and API_DEPENDENTS tables
 * with realistic dependency relationships between APIs
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        if (key && !process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnvFile();

const DB_PATH = process.env.DB_PATH || 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db';

console.log('🚀 Starting dependency data insertion...');
console.log('📊 Database:', DB_PATH);

// Check if database exists
if (!fs.existsSync(DB_PATH)) {
  console.error('❌ Database file not found:', DB_PATH);
  console.error('Please ensure the database exists or update DB_PATH in .env file');
  process.exit(1);
}

try {
  // Connect to database
  const db = new Database(DB_PATH, { 
    readonly: false,
    timeout: 5000
  });

  console.log('✅ Connected to database');

  // Read SQL file
  const sqlPath = path.join(__dirname, 'insert_dependencies_sample_fixed.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('❌ SQL file not found:', sqlPath);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  console.log('📄 Loaded SQL file');

  // Split SQL into individual statements
  const statements = sqlContent
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

  console.log(`📝 Found ${statements.length} SQL statements`);

  // Check existing data
  const existingDeps = db.prepare('SELECT COUNT(*) as count FROM API_DEPENDENCIES').get();
  const existingDependents = db.prepare('SELECT COUNT(*) as count FROM API_DEPENDENTS').get();
  
  console.log(`\n📊 Current data:`);
  console.log(`   Dependencies: ${existingDeps.count}`);
  console.log(`   Dependents: ${existingDependents.count}`);

  // Ask user if they want to clear existing data
  if (existingDeps.count > 0 || existingDependents.count > 0) {
    console.log('\n⚠️  Warning: Existing dependency data found.');
    console.log('   The script will add new relationships to existing data.');
    console.log('   To clear existing data first, uncomment the DELETE statements in the SQL file.');
  }

  // Execute statements
  console.log('\n🔄 Executing SQL statements...');
  let insertCount = 0;
  let errorCount = 0;

  for (const statement of statements) {
    try {
      if (statement.toUpperCase().includes('INSERT INTO')) {
        db.prepare(statement).run();
        insertCount++;
        if (insertCount % 10 === 0) {
          process.stdout.write(`\r   Inserted ${insertCount} records...`);
        }
      } else {
        // Execute other statements (like SELECT for verification)
        const result = db.prepare(statement).all();
        if (result && result.length > 0) {
          console.log('\n\n✅ Verification results:');
          result.forEach(row => {
            console.log(`   ${row.Info}: ${row.Count}`);
          });
        }
      }
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        // Skip duplicate entries silently
        continue;
      }
      errorCount++;
      console.error(`\n❌ Error executing statement: ${error.message}`);
      console.error(`   Statement: ${statement.substring(0, 100)}...`);
    }
  }

  console.log(`\n\n✅ Execution complete!`);
  console.log(`   Records inserted: ${insertCount}`);
  if (errorCount > 0) {
    console.log(`   Errors encountered: ${errorCount}`);
  }

  // Get final counts
  const finalDeps = db.prepare('SELECT COUNT(*) as count FROM API_DEPENDENCIES').get();
  const finalDependents = db.prepare('SELECT COUNT(*) as count FROM API_DEPENDENTS').get();
  
  console.log(`\n📊 Final data:`);
  console.log(`   Dependencies: ${finalDeps.count} (added ${finalDeps.count - existingDeps.count})`);
  console.log(`   Dependents: ${finalDependents.count} (added ${finalDependents.count - existingDependents.count})`);

  // Show some statistics
  console.log(`\n📈 Dependency Statistics:`);
  
  const topDependers = db.prepare(`
    SELECT 
      am.NAME as api_name,
      COUNT(*) as dependency_count
    FROM API_DEPENDENCIES ad
    JOIN API_METADATA am ON ad.API_ID = am.ID
    GROUP BY ad.API_ID, am.NAME
    ORDER BY dependency_count DESC
    LIMIT 5
  `).all();

  if (topDependers.length > 0) {
    console.log(`\n   Top 5 APIs with most dependencies (APIs that depend on others):`);
    topDependers.forEach((row, idx) => {
      console.log(`   ${idx + 1}. ${row.api_name}: ${row.dependency_count} dependencies`);
    });
  }

  const topDependedUpon = db.prepare(`
    SELECT 
      am.NAME as api_name,
      COUNT(*) as dependent_count
    FROM API_DEPENDENTS ad
    JOIN API_METADATA am ON ad.API_ID = am.ID
    GROUP BY ad.API_ID, am.NAME
    ORDER BY dependent_count DESC
    LIMIT 5
  `).all();

  if (topDependedUpon.length > 0) {
    console.log(`\n   Top 5 most depended upon APIs (other APIs depend on them):`);
    topDependedUpon.forEach((row, idx) => {
      console.log(`   ${idx + 1}. ${row.api_name}: ${row.dependent_count} dependents`);
    });
  }

  // Close database
  db.close();
  console.log('\n✅ Database connection closed');
  console.log('🎉 Dependencies data insertion completed successfully!');
  console.log('\n💡 You can now view the dependency graph in the Knowledge Graph view.');

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
