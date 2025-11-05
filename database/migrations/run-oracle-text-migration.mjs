import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database path
const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔧 Starting Oracle Text Columns Migration...');
console.log(`📂 Database: ${DB_PATH}`);

try {
  // Open database
  const db = new Database(DB_PATH);
  
  // Read migration SQL
  const migrationSQL = readFileSync(
    join(__dirname, 'add_oracle_text_columns.sql'),
    'utf-8'
  );
  
  console.log('\n📋 Executing migration SQL...');
  
  // Execute migration
  db.exec(migrationSQL);
  
  // Verify columns were added
  const columns = db.prepare(`
    PRAGMA table_info(API_METADATA)
  `).all();
  
  const hasCallText = columns.some(col => col.name === 'SAMPLE_CALL_TEXT');
  const hasResultText = columns.some(col => col.name === 'SAMPLE_RESULT_TEXT');
  
  console.log('\n✅ Migration completed successfully!');
  console.log('\n📊 Column verification:');
  console.log(`   SAMPLE_CALL_TEXT: ${hasCallText ? '✓ Added' : '✗ Missing'}`);
  console.log(`   SAMPLE_RESULT_TEXT: ${hasResultText ? '✓ Added' : '✗ Missing'}`);
  
  // Show all columns
  console.log('\n📋 All API_METADATA columns:');
  columns.forEach(col => {
    const marker = col.name.includes('SAMPLE') ? '🔹' : '  ';
    console.log(`${marker} ${col.name} (${col.type})`);
  });
  
  db.close();
  console.log('\n✨ Migration complete! Oracle APIs can now store plain text samples.');
  
} catch (error) {
  console.error('\n❌ Migration failed:', error.message);
  process.exit(1);
}
