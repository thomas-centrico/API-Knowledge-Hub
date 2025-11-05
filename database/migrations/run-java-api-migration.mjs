import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database path
const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔧 Starting Java API Columns Migration...');
console.log(`📂 Database: ${DB_PATH}`);

try {
  // Open database
  const db = new Database(DB_PATH);
  
  // Read migration SQL
  const migrationSQL = readFileSync(
    join(__dirname, 'add_java_api_columns.sql'),
    'utf-8'
  );
  
  console.log('\n📋 Executing migration SQL...');
  
  // Execute migration
  db.exec(migrationSQL);
  
  // Verify columns were added
  const columns = db.prepare(`
    PRAGMA table_info(API_METADATA)
  `).all();
  
  const javaColumns = [
    'PACKAGE_NAME',
    'CLASS_NAME', 
    'METHOD_NAME',
    'INTERFACE_NAME',
    'API_SIGNATURE'
  ];
  
  console.log('\n✅ Migration completed successfully!');
  console.log('\n📊 Java API column verification:');
  
  javaColumns.forEach(colName => {
    const exists = columns.some(col => col.name === colName);
    console.log(`   ${colName}: ${exists ? '✓ Added' : '✗ Missing'}`);
  });
  
  // Show all columns with JAVA in context
  console.log('\n📋 All API_METADATA columns (Java-related highlighted):');
  columns.forEach(col => {
    const isJavaCol = javaColumns.includes(col.name);
    const marker = isJavaCol ? '🔹' : '  ';
    console.log(`${marker} ${col.name} (${col.type})`);
  });
  
  db.close();
  console.log('\n✨ Migration complete! Java APIs can now store technical details.');
  
} catch (error) {
  console.error('\n❌ Migration failed:', error.message);
  process.exit(1);
}
