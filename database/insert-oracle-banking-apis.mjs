import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database path
const DB_PATH = 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db';

console.log('🔄 Inserting Oracle Banking APIs into database...');
console.log(`📁 Database: ${DB_PATH}`);

try {
  // Connect to database
  const db = new Database(DB_PATH);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
  
  console.log('\n✅ Database connected successfully');
  
  // Start transaction
  const insertTransaction = db.transaction(() => {
    
    // =====================================================
    // GROUP 1: Bank Identification Translation APIs
    // =====================================================
    
    console.log('\n📝 Inserting Bank Identification APIs...');
    
    const insertAPI = db.prepare(`
      INSERT INTO API_METADATA (
        ID, NAME, TYPE, CATEGORY, STATUS, VERSION, 
        DESCRIPTION, OWNER, DEPARTMENT, 
        LAST_UPDATED, CREATED_AT, 
        ENDPOINTS, BASE_URL, AUTH_METHOD, 
        RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, 
        DOC_URL, HAS_INTERACTIVE_DOCS, 
        CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    // API 1: Get ABI Code by Bank ID
    insertAPI.run(
      'oracle-bank-001',
      'CRC_FN_ABI_BY_ID_BANK',
      'ORACLE_API',
      'banking',
      'active',
      '1.0.0',
      'Retrieve ABI_CODE using ID_BANCA. Part of the bank identification translation layer that enables conversion between different bank identifier formats. Used for regulatory reporting and inter-bank communication.',
      'WEBLOGIC_DBA',
      'Banking Operations',
      '2024-11-05 10:00:00',
      '2020-01-15 09:00:00',
      null,
      'oracle://db.bansel.it:1521/PROD',
      'Oracle Wallet + Service Account',
      null,
      99.95,
      45,
      'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
      'N',
      'dba-team@bansel.it',
      'Database Administration',
      '#oracle-banking-api'
    );
    
    // API 2: Get Bank Code by Bank ID
    insertAPI.run(
      'oracle-bank-002',
      'CRC_FN_BANK_CODE_BY_ID_BANK',
      'ORACLE_API',
      'banking',
      'active',
      '1.0.0',
      'Retrieve BANK_CODE using ID_BANCA. Essential for database routing and schema selection. This API enables the system to determine which database instance and schema should handle operations for a specific bank.',
      'WEBLOGIC_DBA',
      'Banking Operations',
      '2024-11-05 10:00:00',
      '2020-01-15 09:00:00',
      null,
      'oracle://db.bansel.it:1521/PROD',
      'Oracle Wallet + Service Account',
      null,
      99.95,
      45,
      'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
      'N',
      'dba-team@bansel.it',
      'Database Administration',
      '#oracle-banking-api'
    );
    
    // API 3: Get Bank ID by ABI Code
    insertAPI.run(
      'oracle-bank-003',
      'CRC_FN_ID_BANK_BY_ABI',
      'ORACLE_API',
      'banking',
      'active',
      '1.0.0',
      'Retrieve ID_BANCA using ABI_CODE. Provides reverse lookup capability from Italian Banking Association code to internal bank identifier. Critical for processing external banking messages and SEPA transactions.',
      'WEBLOGIC_DBA',
      'Banking Operations',
      '2024-11-05 10:00:00',
      '2020-01-15 09:00:00',
      null,
      'oracle://db.bansel.it:1521/PROD',
      'Oracle Wallet + Service Account',
      null,
      99.95,
      50,
      'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
      'N',
      'dba-team@bansel.it',
      'Database Administration',
      '#oracle-banking-api'
    );
    
    // API 4: Get Bank Code by ABI Code
    insertAPI.run(
      'oracle-bank-004',
      'CRC_FN_BANK_CODE_BY_ABI',
      'ORACLE_API',
      'banking',
      'active',
      '1.0.0',
      'Retrieve BANK_CODE using ABI_CODE. Direct translation from Italian Banking Association identifier to internal bank code. Enables streamlined database routing without intermediate ID_BANCA lookup.',
      'WEBLOGIC_DBA',
      'Banking Operations',
      '2024-11-05 10:00:00',
      '2020-01-15 09:00:00',
      null,
      'oracle://db.bansel.it:1521/PROD',
      'Oracle Wallet + Service Account',
      null,
      99.95,
      50,
      'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
      'N',
      'dba-team@bansel.it',
      'Database Administration',
      '#oracle-banking-api'
    );
    
    console.log('✅ Inserted 4 Bank Identification APIs');
    
    // =====================================================
    // GROUP 2: Database Routing APIs
    // =====================================================
    
    console.log('\n📝 Inserting Database Routing APIs...');
    
    // API 5: Get Database Name by Bank Code
    insertAPI.run(
      'oracle-bank-005',
      'CRC_FN_NOME_DB_BY_COD_BANCA',
      'ORACLE_API',
      'infrastructure',
      'active',
      '1.0.0',
      'Retrieve database name (e.g., oraboh, oraopn) using BANK_CODE. Essential for multi-tenant architecture where different banks operate on separate Oracle database instances. Used for connection pooling and query routing.',
      'WEBLOGIC_DBA',
      'Database Administration',
      '2024-11-05 10:00:00',
      '2020-01-15 09:00:00',
      null,
      'oracle://db.bansel.it:1521/PROD',
      'Oracle Wallet + Service Account',
      null,
      99.98,
      35,
      'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
      'N',
      'dba-team@bansel.it',
      'Database Administration',
      '#oracle-banking-api'
    );
    
    // API 6: Get Schema Name by Bank Code
    insertAPI.run(
      'oracle-bank-006',
      'CRC_FN_NOME_SCHEMA_BY_COD_BANCA',
      'ORACLE_API',
      'infrastructure',
      'active',
      '1.0.0',
      'Retrieve database schema name using BANK_CODE. Works in conjunction with database name API to build complete connection strings for bank-specific operations. Critical for data isolation in multi-tenant environment.',
      'WEBLOGIC_DBA',
      'Database Administration',
      '2024-11-05 10:00:00',
      '2020-01-15 09:00:00',
      null,
      'oracle://db.bansel.it:1521/PROD',
      'Oracle Wallet + Service Account',
      null,
      99.98,
      35,
      'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
      'N',
      'dba-team@bansel.it',
      'Database Administration',
      '#oracle-banking-api'
    );
    
    console.log('✅ Inserted 2 Database Routing APIs');
    
    // =====================================================
    // GROUP 3: Account Operations API
    // =====================================================
    
    console.log('\n📝 Inserting Account Operations API...');
    
    // API 7: Get Account Balance
    insertAPI.run(
      'oracle-bank-007',
      'CRC_FN_GET_SALDO',
      'ORACLE_API',
      'financial',
      'active',
      '1.0.0',
      'Retrieve account balance (SALDO) using ID_CONTO (account ID). Real-time balance inquiry for customer accounts. Must be executed against the correct database instance determined by bank routing APIs. High-frequency operation requiring optimal performance.',
      'WEBLOGIC_DBA',
      'Financial Services',
      '2024-11-05 10:00:00',
      '2020-01-15 09:00:00',
      null,
      'oracle://db.bansel.it:1521/PROD',
      'Oracle Wallet + Service Account',
      null,
      99.99,
      25,
      'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
      'N',
      'financial-services@bansel.it',
      'Financial Services',
      '#oracle-banking-api'
    );
    
    console.log('✅ Inserted 1 Account Operations API');
    
    // =====================================================
    // API TAGS
    // =====================================================
    
    console.log('\n📝 Inserting API Tags...');
    
    const insertTag = db.prepare('INSERT INTO API_TAGS (API_ID, TAG) VALUES (?, ?)');
    
    const tags = [
      // oracle-bank-001
      ['oracle-bank-001', 'banking'],
      ['oracle-bank-001', 'identification'],
      ['oracle-bank-001', 'abi-code'],
      ['oracle-bank-001', 'translation'],
      ['oracle-bank-001', 'oracle-function'],
      // oracle-bank-002
      ['oracle-bank-002', 'banking'],
      ['oracle-bank-002', 'identification'],
      ['oracle-bank-002', 'bank-code'],
      ['oracle-bank-002', 'translation'],
      ['oracle-bank-002', 'routing'],
      // oracle-bank-003
      ['oracle-bank-003', 'banking'],
      ['oracle-bank-003', 'identification'],
      ['oracle-bank-003', 'abi-code'],
      ['oracle-bank-003', 'reverse-lookup'],
      ['oracle-bank-003', 'sepa'],
      // oracle-bank-004
      ['oracle-bank-004', 'banking'],
      ['oracle-bank-004', 'identification'],
      ['oracle-bank-004', 'abi-code'],
      ['oracle-bank-004', 'bank-code'],
      ['oracle-bank-004', 'direct-translation'],
      // oracle-bank-005
      ['oracle-bank-005', 'database'],
      ['oracle-bank-005', 'routing'],
      ['oracle-bank-005', 'multi-tenant'],
      ['oracle-bank-005', 'infrastructure'],
      ['oracle-bank-005', 'connection-management'],
      // oracle-bank-006
      ['oracle-bank-006', 'database'],
      ['oracle-bank-006', 'routing'],
      ['oracle-bank-006', 'multi-tenant'],
      ['oracle-bank-006', 'schema'],
      ['oracle-bank-006', 'data-isolation'],
      // oracle-bank-007
      ['oracle-bank-007', 'financial'],
      ['oracle-bank-007', 'account'],
      ['oracle-bank-007', 'balance'],
      ['oracle-bank-007', 'real-time'],
      ['oracle-bank-007', 'high-frequency']
    ];
    
    tags.forEach(([apiId, tag]) => {
      insertTag.run(apiId, tag);
    });
    
    console.log(`✅ Inserted ${tags.length} tags`);
    
    // =====================================================
    // API DEPENDENCIES
    // =====================================================
    
    console.log('\n📝 Inserting API Dependencies...');
    
    const insertDependency = db.prepare('INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES (?, ?)');
    
    const dependencies = [
      // Database routing depends on bank code translation
      ['oracle-bank-005', 'oracle-bank-002'],
      ['oracle-bank-005', 'oracle-bank-004'],
      ['oracle-bank-006', 'oracle-bank-002'],
      ['oracle-bank-006', 'oracle-bank-004'],
      // Account balance depends on database routing
      ['oracle-bank-007', 'oracle-bank-005'],
      ['oracle-bank-007', 'oracle-bank-006']
    ];
    
    dependencies.forEach(([apiId, dependsOnId]) => {
      insertDependency.run(apiId, dependsOnId);
    });
    
    console.log(`✅ Inserted ${dependencies.length} dependencies`);
    
    // =====================================================
    // API DEPENDENTS
    // =====================================================
    
    console.log('\n📝 Inserting API Dependents...');
    
    const insertDependent = db.prepare('INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES (?, ?)');
    
    const dependents = [
      // Bank identification used by routing
      ['oracle-bank-001', 'oracle-bank-004'],
      ['oracle-bank-002', 'oracle-bank-005'],
      ['oracle-bank-002', 'oracle-bank-006'],
      ['oracle-bank-003', 'oracle-bank-002'],
      ['oracle-bank-004', 'oracle-bank-005'],
      ['oracle-bank-004', 'oracle-bank-006'],
      // Database routing used by account operations
      ['oracle-bank-005', 'oracle-bank-007'],
      ['oracle-bank-006', 'oracle-bank-007']
    ];
    
    dependents.forEach(([apiId, dependentId]) => {
      insertDependent.run(apiId, dependentId);
    });
    
    console.log(`✅ Inserted ${dependents.length} dependents`);
    
    // =====================================================
    // API USAGE
    // =====================================================
    
    console.log('\n📝 Inserting API Usage Statistics...');
    
    const insertUsage = db.prepare(`
      INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) 
      VALUES (?, ?, ?, ?)
    `);
    
    const usageData = [
      ['oracle-bank-001', 45000, 320, 0.008],
      ['oracle-bank-002', 68000, 420, 0.006],
      ['oracle-bank-003', 38000, 280, 0.010],
      ['oracle-bank-004', 52000, 350, 0.007],
      ['oracle-bank-005', 125000, 580, 0.004],
      ['oracle-bank-006', 125000, 580, 0.004],
      ['oracle-bank-007', 850000, 1200, 0.002]
    ];
    
    usageData.forEach(([apiId, requests, users, errorRate]) => {
      insertUsage.run(apiId, requests, users, errorRate);
    });
    
    console.log(`✅ Inserted ${usageData.length} usage records`);
  });
  
  // Execute transaction
  insertTransaction();
  
  console.log('\n✅ All Oracle Banking APIs inserted successfully!');
  
  // Verification
  console.log('\n📊 Verification:');
  const count = db.prepare("SELECT COUNT(*) as count FROM API_METADATA WHERE ID LIKE 'oracle-bank-%'").get();
  console.log(`   Total Oracle Banking APIs: ${count.count}`);
  
  const apis = db.prepare(`
    SELECT ID, NAME, CATEGORY, 
           (SELECT COUNT(*) FROM API_DEPENDENCIES WHERE API_ID = API_METADATA.ID) as dep_count,
           (SELECT COUNT(*) FROM API_DEPENDENTS WHERE API_ID = API_METADATA.ID) as dependent_count
    FROM API_METADATA 
    WHERE ID LIKE 'oracle-bank-%'
    ORDER BY ID
  `).all();
  
  console.log('\n📋 Inserted APIs:');
  apis.forEach(api => {
    console.log(`   ${api.ID}: ${api.NAME}`);
    console.log(`      Category: ${api.CATEGORY}`);
    console.log(`      Dependencies: ${api.dep_count} | Dependents: ${api.dependent_count}`);
  });
  
  // Close database
  db.close();
  console.log('\n✨ Database connection closed');
  console.log('🎉 Oracle Banking APIs successfully added to Knowledge Hub!\n');
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
