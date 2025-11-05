#!/usr/bin/env node
/**
 * Database Initialization Script
 * Creates and populates the SQLite database with sample data
 * 
 * Usage: node database/init-db.js
 */

import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
// Use environment variable if set, otherwise use the specified path
const DB_PATH = process.env.DB_PATH || 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db';
const SQL_SCRIPT = join(__dirname, 'setup.sql');

console.log('🚀 Database Initialization Starting...\n');
console.log(`📁 Database Path: ${DB_PATH}`);
console.log(`📄 SQL Script: ${SQL_SCRIPT}\n`);

try {
  // Create database connection
  console.log('📦 Creating database connection...');
  const db = new Database(DB_PATH);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
  
  // Read SQL script
  console.log('📖 Reading SQL setup script...');
  const sql = readFileSync(SQL_SCRIPT, 'utf8');
  
  // Split SQL statements (simple split by semicolon)
  const statements = sql
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
  
  console.log(`📝 Found ${statements.length} SQL statements to execute\n`);
  
  // Execute each statement
  console.log('⚙️  Executing SQL statements...');
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    try {
      const stmt = statements[i];
      
      // Skip SELECT statements used for verification in the script
      if (stmt.toUpperCase().startsWith('SELECT')) {
        const result = db.prepare(stmt).all();
        console.log(`   ℹ️  ${JSON.stringify(result)}`);
        continue;
      }
      
      db.prepare(stmt).run();
      successCount++;
      
      // Show progress for data insertion
      if (stmt.toUpperCase().includes('INSERT INTO')) {
        const match = stmt.match(/VALUES\s*\(\s*'([^']+)'/);
        if (match) {
          console.log(`   ✅ Inserted API: ${match[1]}`);
        }
      }
    } catch (error) {
      errorCount++;
      console.error(`   ❌ Error in statement ${i + 1}:`, error.message);
    }
  }
  
  // Get final statistics
  console.log('\n📊 Database Statistics:');
  const totalApis = db.prepare('SELECT COUNT(*) as count FROM API_METADATA').get();
  console.log(`   Total APIs: ${totalApis.count}`);
  
  const byType = db.prepare('SELECT TYPE, COUNT(*) as count FROM API_METADATA GROUP BY TYPE').all();
  console.log('\n   APIs by Type:');
  byType.forEach(row => {
    console.log(`     - ${row.TYPE}: ${row.count}`);
  });
  
  const byStatus = db.prepare('SELECT STATUS, COUNT(*) as count FROM API_METADATA GROUP BY STATUS').all();
  console.log('\n   APIs by Status:');
  byStatus.forEach(row => {
    console.log(`     - ${row.STATUS}: ${row.count}`);
  });
  
  // Close database
  db.close();
  
  console.log(`\n✅ Database initialization completed successfully!`);
  console.log(`   Statements executed: ${successCount}`);
  if (errorCount > 0) {
    console.log(`   ⚠️  Errors encountered: ${errorCount}`);
  }
  console.log(`\n🎉 Database is ready to use at: ${DB_PATH}\n`);
  
} catch (error) {
  console.error('\n❌ Database initialization failed:', error);
  console.error(error.stack);
  process.exit(1);
}
