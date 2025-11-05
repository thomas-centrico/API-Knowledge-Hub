import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '..', '.env');
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

console.log('🔧 Database Migration: Add Sample Data Fields');
console.log('Database Path:', DB_PATH);

try {
  const db = new Database(DB_PATH);
  
  console.log('📊 Checking current schema...\n');
  
  // Check if columns already exist
  const tableInfo = db.pragma('table_info(API_METADATA)');
  const hasRequestJson = tableInfo.some(col => col.name === 'SAMPLE_REQUEST_JSON');
  const hasResponseJson = tableInfo.some(col => col.name === 'SAMPLE_RESPONSE_JSON');
  
  if (hasRequestJson && hasResponseJson) {
    console.log('✅ Sample data columns already exist. No migration needed.');
    db.close();
    process.exit(0);
  }
  
  console.log('🔨 Running migration...');
  
  // Add columns if they don't exist
  if (!hasRequestJson) {
    console.log('  Adding SAMPLE_REQUEST_JSON column...');
    db.exec('ALTER TABLE API_METADATA ADD COLUMN SAMPLE_REQUEST_JSON TEXT');
  }
  
  if (!hasResponseJson) {
    console.log('  Adding SAMPLE_RESPONSE_JSON column...');
    db.exec('ALTER TABLE API_METADATA ADD COLUMN SAMPLE_RESPONSE_JSON TEXT');
  }
  
  console.log('\n✅ Migration completed successfully!\n');
  
  // Get total count
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM API_METADATA');
  const result = countStmt.get();
  console.log(`📊 Total APIs in database: ${result.count}`);
  
  db.close();
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
