import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database path
const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔍 Checking API_METADATA table structure...');
console.log(`📂 Database: ${DB_PATH}\n`);

try {
  const db = new Database(DB_PATH);
  
  // Get all columns
  const columns = db.prepare(`PRAGMA table_info(API_METADATA)`).all();
  
  console.log('📋 Current columns:');
  columns.forEach(col => {
    console.log(`   ${col.name} (${col.type})`);
  });
  
  // Check for specific columns
  const requiredColumns = [
    'SCHEMA_NAME',
    'PROCEDURE_NAME',
    'SAMPLE_CALL_TEXT',
    'SAMPLE_RESULT_TEXT',
    'SAMPLE_REQUEST_JSON',
    'SAMPLE_RESPONSE_JSON'
  ];
  
  console.log('\n🔍 Required columns check:');
  requiredColumns.forEach(colName => {
    const exists = columns.some(col => col.name === colName);
    console.log(`   ${colName}: ${exists ? '✓' : '✗ MISSING'}`);
  });
  
  db.close();
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
