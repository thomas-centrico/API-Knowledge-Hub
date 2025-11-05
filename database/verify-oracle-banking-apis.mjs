import Database from 'better-sqlite3';

const DB_PATH = 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db';

console.log('🔍 Oracle Banking APIs - Dependency Analysis\n');
console.log('='.repeat(80));

try {
  const db = new Database(DB_PATH);
  
  // Get all Oracle banking APIs with their relationships
  const apis = db.prepare(`
    SELECT 
      am.ID,
      am.NAME,
      am.CATEGORY,
      am.DESCRIPTION,
      am.RESPONSE_TIME,
      (SELECT COUNT(*) FROM API_DEPENDENCIES WHERE API_ID = am.ID) as depends_on_count,
      (SELECT COUNT(*) FROM API_DEPENDENTS WHERE API_ID = am.ID) as dependent_count,
      (SELECT GROUP_CONCAT(NAME, ', ') 
       FROM API_METADATA 
       WHERE ID IN (SELECT DEPENDS_ON_ID FROM API_DEPENDENCIES WHERE API_ID = am.ID)) as depends_on,
      (SELECT GROUP_CONCAT(NAME, ', ') 
       FROM API_METADATA 
       WHERE ID IN (SELECT DEPENDENT_ID FROM API_DEPENDENTS WHERE API_ID = am.ID)) as dependents
    FROM API_METADATA am
    WHERE am.ID LIKE 'oracle-bank-%'
    ORDER BY am.ID
  `).all();
  
  console.log('\n📊 GROUP 1: Bank Identification Translation APIs\n');
  apis.filter(api => api.CATEGORY === 'banking').forEach(api => {
    console.log(`✓ ${api.NAME}`);
    console.log(`  ID: ${api.ID}`);
    console.log(`  Purpose: ${api.DESCRIPTION.substring(0, 100)}...`);
    console.log(`  Response Time: ${api.RESPONSE_TIME}ms`);
    if (api.depends_on) {
      console.log(`  📥 Depends on: ${api.depends_on}`);
    }
    if (api.dependents) {
      console.log(`  📤 Used by: ${api.dependents}`);
    }
    console.log('');
  });
  
  console.log('📊 GROUP 2: Database Routing APIs\n');
  apis.filter(api => api.CATEGORY === 'infrastructure').forEach(api => {
    console.log(`✓ ${api.NAME}`);
    console.log(`  ID: ${api.ID}`);
    console.log(`  Purpose: ${api.DESCRIPTION.substring(0, 100)}...`);
    console.log(`  Response Time: ${api.RESPONSE_TIME}ms`);
    if (api.depends_on) {
      console.log(`  📥 Depends on: ${api.depends_on}`);
    }
    if (api.dependents) {
      console.log(`  📤 Used by: ${api.dependents}`);
    }
    console.log('');
  });
  
  console.log('📊 GROUP 3: Account Operations API\n');
  apis.filter(api => api.CATEGORY === 'financial').forEach(api => {
    console.log(`✓ ${api.NAME}`);
    console.log(`  ID: ${api.ID}`);
    console.log(`  Purpose: ${api.DESCRIPTION.substring(0, 100)}...`);
    console.log(`  Response Time: ${api.RESPONSE_TIME}ms`);
    if (api.depends_on) {
      console.log(`  📥 Depends on: ${api.depends_on}`);
    }
    if (api.dependents) {
      console.log(`  📤 Used by: ${api.dependents}`);
    }
    console.log('');
  });
  
  // Show usage statistics
  console.log('='.repeat(80));
  console.log('\n📈 Usage Statistics\n');
  
  const usage = db.prepare(`
    SELECT 
      am.NAME,
      au.REQUESTS_PER_DAY,
      au.ACTIVE_USERS,
      au.ERROR_RATE,
      am.RESPONSE_TIME
    FROM API_METADATA am
    JOIN API_USAGE au ON am.ID = au.API_ID
    WHERE am.ID LIKE 'oracle-bank-%'
    ORDER BY au.REQUESTS_PER_DAY DESC
  `).all();
  
  console.log('API Name'.padEnd(40) + 'Req/Day'.padEnd(12) + 'Users'.padEnd(10) + 'Err Rate'.padEnd(12) + 'Resp(ms)');
  console.log('-'.repeat(80));
  usage.forEach(u => {
    console.log(
      u.NAME.padEnd(40) +
      u.REQUESTS_PER_DAY.toLocaleString().padEnd(12) +
      u.ACTIVE_USERS.toString().padEnd(10) +
      (u.ERROR_RATE * 100).toFixed(2) + '%'.padEnd(12) +
      u.RESPONSE_TIME + 'ms'
    );
  });
  
  // Show dependency chains
  console.log('\n' + '='.repeat(80));
  console.log('\n🔗 Dependency Chains\n');
  
  console.log('Chain 1: Full Bank Lookup (ID_BANCA → Database)');
  console.log('  1. CRC_FN_BANK_CODE_BY_ID_BANK (ID_BANCA → BANK_CODE)');
  console.log('  2. CRC_FN_NOME_DB_BY_COD_BANCA (BANK_CODE → Database Name)');
  console.log('  3. CRC_FN_NOME_SCHEMA_BY_COD_BANCA (BANK_CODE → Schema)');
  console.log('  4. CRC_FN_GET_SALDO (ID_CONTO → Balance) [requires routing]');
  
  console.log('\nChain 2: ABI-based Lookup (ABI_CODE → Database)');
  console.log('  1. CRC_FN_BANK_CODE_BY_ABI (ABI_CODE → BANK_CODE)');
  console.log('  2. CRC_FN_NOME_DB_BY_COD_BANCA (BANK_CODE → Database Name)');
  console.log('  3. CRC_FN_NOME_SCHEMA_BY_COD_BANCA (BANK_CODE → Schema)');
  
  console.log('\nChain 3: Reverse Validation (ABI_CODE → ID_BANCA → BANK_CODE)');
  console.log('  1. CRC_FN_ID_BANK_BY_ABI (ABI_CODE → ID_BANCA)');
  console.log('  2. CRC_FN_BANK_CODE_BY_ID_BANK (ID_BANCA → BANK_CODE)');
  
  console.log('\n' + '='.repeat(80));
  console.log('\n✨ Total Oracle Banking APIs: ' + apis.length);
  console.log('✨ Total Dependencies: ' + apis.reduce((sum, api) => sum + api.depends_on_count, 0));
  console.log('✨ Total Dependent Relationships: ' + apis.reduce((sum, api) => sum + api.dependent_count, 0));
  console.log('\n🎉 All APIs successfully integrated into Knowledge Hub!\n');
  
  db.close();
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
