#!/usr/bin/env node
/**
 * Database Migration Script
 * Adds sample data to existing database without removing current records
 * 
 * Usage: node database/add-sample-data.js
 */

import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const DB_PATH = process.env.DB_PATH || 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db';
const SQL_SCRIPT = join(__dirname, 'setup.sql');

console.log('➕ Adding Sample Data to Existing Database...\n');
console.log(`📁 Database Path: ${DB_PATH}`);
console.log(`📄 SQL Script: ${SQL_SCRIPT}\n`);

try {
  // Create database connection
  console.log('📦 Connecting to database...');
  const db = new Database(DB_PATH);
  
  // Check current record count
  const beforeCount = db.prepare('SELECT COUNT(*) as count FROM API_METADATA').get().count;
  console.log(`📊 Current records in database: ${beforeCount}\n`);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
  
  // Read SQL script
  console.log('📖 Reading SQL setup script...');
  const sql = readFileSync(SQL_SCRIPT, 'utf8');
  
  // Extract only INSERT statements
  const statements = sql
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && stmt.toUpperCase().includes('INSERT'));
  
  console.log(`📝 Found ${statements.length} INSERT statements\n`);
  
  // Execute each INSERT statement
  console.log('⚙️  Adding sample data...');
  let successCount = 0;
  let skipCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    try {
      const stmt = statements[i];
      
      // Use INSERT OR IGNORE to skip if ID already exists
      const modifiedStmt = stmt.replace(/^INSERT\s+/i, 'INSERT OR IGNORE ');
      
      const result = db.prepare(modifiedStmt).run();
      
      if (result.changes > 0) {
        successCount++;
        const match = stmt.match(/VALUES\s*\(\s*'([^']+)'/);
        if (match) {
          console.log(`   ✅ Added API: ${match[1]}`);
        }
      } else {
        skipCount++;
        const match = stmt.match(/VALUES\s*\(\s*'([^']+)'/);
        if (match) {
          console.log(`   ⏭️  Skipped (already exists): ${match[1]}`);
        }
      }
    } catch (error) {
      console.error(`   ❌ Error in statement ${i + 1}:`, error.message);
    }
  }
  
  // Get final statistics
  console.log('\n📊 Final Database Statistics:');
  const afterCount = db.prepare('SELECT COUNT(*) as count FROM API_METADATA').get().count;
  console.log(`   Total Records: ${afterCount} (added ${afterCount - beforeCount})`);
  
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
  
  console.log(`\n✅ Operation completed successfully!`);
  console.log(`   Records added: ${successCount}`);
  console.log(`   Records skipped: ${skipCount}`);
  console.log(`\n🎉 Database is ready to use!\n`);
  
} catch (error) {
  console.error('\n❌ Operation failed:', error);
  console.error(error.stack);
  process.exit(1);
}
