import Database from 'better-sqlite3';

const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔍 Verifying Java & Oracle API Text Storage Implementation\n');

try {
  const db = new Database(DB_PATH);
  
  // 1. Check columns exist
  console.log('1️⃣ Checking database columns...');
  const columns = db.prepare(`PRAGMA table_info(API_METADATA)`).all();
  const requiredCols = ['SAMPLE_CALL_TEXT', 'SAMPLE_RESULT_TEXT', 'SAMPLE_REQUEST_JSON', 'SAMPLE_RESPONSE_JSON'];
  
  requiredCols.forEach(col => {
    const exists = columns.some(c => c.name === col);
    console.log(`   ${col}: ${exists ? '✓' : '✗'}`);
  });
  
  // 2. Check Oracle APIs
  console.log('\n2️⃣ Checking Oracle APIs...');
  const oracleAPIs = db.prepare(`
    SELECT ID, NAME, TYPE, 
           SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT,
           SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON
    FROM API_METADATA 
    WHERE TYPE = 'ORACLE_API'
  `).all();
  
  console.log(`   Found ${oracleAPIs.length} Oracle APIs`);
  console.log(`   Expected to use: SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT\n`);
  
  // 3. Check Java APIs
  console.log('3️⃣ Checking Java APIs...');
  const javaAPIs = db.prepare(`
    SELECT ID, NAME, TYPE,
           SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT,
           SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON
    FROM API_METADATA 
    WHERE TYPE = 'JAVA_API'
  `).all();
  
  console.log(`   Found ${javaAPIs.length} Java APIs`);
  console.log(`   Expected to use: SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT\n`);
  
  javaAPIs.forEach(api => {
    console.log(`   📌 ${api.NAME} (${api.ID})`);
    console.log(`      SAMPLE_CALL_TEXT: ${api.SAMPLE_CALL_TEXT ? `${api.SAMPLE_CALL_TEXT.substring(0, 50)}...` : 'NULL'}`);
    console.log(`      SAMPLE_RESULT_TEXT: ${api.SAMPLE_RESULT_TEXT ? `${api.SAMPLE_RESULT_TEXT.substring(0, 50)}...` : 'NULL'}`);
    console.log(`      SAMPLE_REQUEST_JSON: ${api.SAMPLE_REQUEST_JSON ? 'HAS DATA (should be NULL)' : 'NULL ✓'}`);
    console.log(`      SAMPLE_RESPONSE_JSON: ${api.SAMPLE_RESPONSE_JSON ? 'HAS DATA (should be NULL)' : 'NULL ✓'}`);
    console.log('');
  });
  
  // 4. Check REST APIs
  console.log('4️⃣ Checking REST APIs (sample)...');
  const restAPIs = db.prepare(`
    SELECT ID, NAME, TYPE,
           SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT,
           SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON
    FROM API_METADATA 
    WHERE TYPE = 'REST_API'
    LIMIT 2
  `).all();
  
  console.log(`   Found ${restAPIs.length} REST APIs (showing 2)`);
  console.log(`   Expected to use: SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON\n`);
  
  restAPIs.forEach(api => {
    console.log(`   📌 ${api.NAME} (${api.ID})`);
    console.log(`      SAMPLE_REQUEST_JSON: ${api.SAMPLE_REQUEST_JSON ? 'HAS DATA ✓' : 'NULL'}`);
    console.log(`      SAMPLE_RESPONSE_JSON: ${api.SAMPLE_RESPONSE_JSON ? 'HAS DATA ✓' : 'NULL'}`);
    console.log(`      SAMPLE_CALL_TEXT: ${api.SAMPLE_CALL_TEXT ? 'HAS DATA (should be NULL)' : 'NULL ✓'}`);
    console.log(`      SAMPLE_RESULT_TEXT: ${api.SAMPLE_RESULT_TEXT ? 'HAS DATA (should be NULL)' : 'NULL ✓'}`);
    console.log('');
  });
  
  // 5. Summary
  console.log('📊 Summary:');
  console.log(`   Oracle APIs: ${oracleAPIs.length} (use TEXT columns)`);
  console.log(`   Java APIs: ${javaAPIs.length} (use TEXT columns)`);
  console.log(`   REST APIs: Use JSON columns`);
  
  console.log('\n✅ Verification complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Edit a Java API in Admin Panel');
  console.log('   2. Add plain text in "Sample Call" and "Sample Result" fields');
  console.log('   3. Save and verify data is stored in TEXT columns');
  console.log('   4. View the Java API in user panel to see plain text display');
  
  db.close();
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
