#!/usr/bin/env node

/**
 * Database Migration Script
 * Adds REST API specific fields to the API_METADATA table
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = path.join(path.dirname(__dirname), '.env');
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

console.log('🔧 Database Migration: Add REST API Fields');
console.log('Database Path:', DB_PATH);

if (!fs.existsSync(DB_PATH)) {
  console.error('❌ Database file not found:', DB_PATH);
  process.exit(1);
}

try {
  const db = new Database(DB_PATH);
  
  console.log('\n📊 Checking current schema...');
  
  // Check if columns already exist
  const columns = db.pragma('table_info(API_METADATA)');
  const columnNames = columns.map(col => col.name);
  
  const hasEndpoint = columnNames.includes('ENDPOINT');
  const hasMethod = columnNames.includes('METHOD');
  const hasContentType = columnNames.includes('CONTENT_TYPE');
  
  if (hasEndpoint && hasMethod && hasContentType) {
    console.log('✅ All columns already exist. No migration needed.');
    db.close();
    process.exit(0);
  }
  
  console.log('\n🔨 Running migration...');
  
  // Add columns if they don't exist
  if (!hasEndpoint) {
    console.log('  Adding ENDPOINT column...');
    db.exec('ALTER TABLE API_METADATA ADD COLUMN ENDPOINT VARCHAR(500)');
  }
  
  if (!hasMethod) {
    console.log('  Adding METHOD column...');
    db.exec('ALTER TABLE API_METADATA ADD COLUMN METHOD VARCHAR(20)');
  }
  
  if (!hasContentType) {
    console.log('  Adding CONTENT_TYPE column...');
    db.exec('ALTER TABLE API_METADATA ADD COLUMN CONTENT_TYPE VARCHAR(100)');
  }
  
  // Create indexes
  console.log('  Creating indexes...');
  db.exec('CREATE INDEX IF NOT EXISTS idx_api_metadata_endpoint ON API_METADATA(ENDPOINT)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_api_metadata_method ON API_METADATA(METHOD)');
  
  // Update existing REST APIs with default values
  console.log('  Updating existing REST APIs with default values...');
  const updateStmt = db.prepare(`
    UPDATE API_METADATA 
    SET METHOD = COALESCE(METHOD, 'GET'),
        CONTENT_TYPE = COALESCE(CONTENT_TYPE, 'application/json'),
        ENDPOINT = COALESCE(ENDPOINT, '/api/v1')
    WHERE TYPE = 'REST_API' 
      AND (METHOD IS NULL OR METHOD = '' OR CONTENT_TYPE IS NULL OR CONTENT_TYPE = '')
  `);
  
  const result = updateStmt.run();
  console.log(`  Updated ${result.changes} REST APIs`);
  
  console.log('\n✅ Migration completed successfully!');
  
  // Verify the changes
  const restApis = db.prepare('SELECT COUNT(*) as count FROM API_METADATA WHERE TYPE = ?').get('REST_API');
  console.log(`\n📊 Total REST APIs in database: ${restApis.count}`);
  
  db.close();
  
} catch (error) {
  console.error('❌ Migration failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
