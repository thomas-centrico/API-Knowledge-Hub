#!/usr/bin/env node
/**
 * Database Verification Script
 * Checks if the API_METADATA table exists and shows its structure
 * 
 * Usage: node database/verify-db.js
 */

import Database from 'better-sqlite3';

// Database path
const DB_PATH = process.env.DB_PATH || 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db';

console.log('🔍 Database Verification Starting...\n');
console.log(`📁 Database Path: ${DB_PATH}\n`);

try {
  // Connect to database
  console.log('📦 Connecting to database...');
  const db = new Database(DB_PATH, { readonly: true });
  console.log('✅ Connected successfully\n');
  
  // Check if API_METADATA table exists
  console.log('🔎 Checking for API_METADATA table...');
  const tableCheck = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='API_METADATA'"
  ).get();
  
  if (!tableCheck) {
    console.log('❌ API_METADATA table does NOT exist');
    console.log('\n📋 Available tables:');
    const tables = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
    ).all();
    
    if (tables.length === 0) {
      console.log('   No tables found in database');
    } else {
      tables.forEach(table => {
        console.log(`   - ${table.name}`);
      });
    }
    
    console.log('\n💡 Run "npm run db:init" to create the API_METADATA table with sample data');
  } else {
    console.log('✅ API_METADATA table exists\n');
    
    // Get table structure
    console.log('📊 Table Structure:');
    const columns = db.prepare('PRAGMA table_info(API_METADATA)').all();
    console.log('\n   Columns:');
    columns.forEach(col => {
      const pk = col.pk ? ' (PRIMARY KEY)' : '';
      const notNull = col.notnull ? ' NOT NULL' : '';
      console.log(`   - ${col.name}: ${col.type}${pk}${notNull}`);
    });
    
    // Get row count
    console.log('\n📈 Data Statistics:');
    const countResult = db.prepare('SELECT COUNT(*) as count FROM API_METADATA').get();
    console.log(`   Total Records: ${countResult.count}`);
    
    if (countResult.count > 0) {
      // Get breakdown by type
      const byType = db.prepare('SELECT TYPE, COUNT(*) as count FROM API_METADATA GROUP BY TYPE').all();
      if (byType.length > 0) {
        console.log('\n   By Type:');
        byType.forEach(row => {
          console.log(`     - ${row.TYPE}: ${row.count}`);
        });
      }
      
      // Get breakdown by status
      const byStatus = db.prepare('SELECT STATUS, COUNT(*) as count FROM API_METADATA GROUP BY STATUS').all();
      if (byStatus.length > 0) {
        console.log('\n   By Status:');
        byStatus.forEach(row => {
          console.log(`     - ${row.STATUS}: ${row.count}`);
        });
      }
      
      // Show sample records
      console.log('\n📝 Sample Records (first 3):');
      const samples = db.prepare('SELECT ID, NAME, TYPE, STATUS FROM API_METADATA LIMIT 3').all();
      samples.forEach((row, index) => {
        console.log(`   ${index + 1}. ${row.NAME} (${row.ID})`);
        console.log(`      Type: ${row.TYPE}, Status: ${row.STATUS}`);
      });
    } else {
      console.log('   ⚠️  Table is empty - no records found');
      console.log('\n💡 Run "npm run db:init" to populate with sample data');
    }
  }
  
  // Check for indexes
  console.log('\n🔑 Indexes:');
  const indexes = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='API_METADATA'"
  ).all();
  
  if (indexes.length === 0) {
    console.log('   No custom indexes found');
  } else {
    indexes.forEach(idx => {
      console.log(`   - ${idx.name}`);
    });
  }
  
  // Close database
  db.close();
  console.log('\n✅ Verification completed successfully!\n');
  
} catch (error) {
  console.error('\n❌ Verification failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
