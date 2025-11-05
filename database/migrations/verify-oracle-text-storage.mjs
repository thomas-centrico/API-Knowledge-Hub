import Database from 'better-sqlite3';

const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔍 Verifying Oracle API Text Storage Implementation\n');

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
  console.log('\n2️⃣ Checking existing Oracle APIs...');
  const oracleAPIs = db.prepare(`
    SELECT ID, NAME, TYPE, 
           SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT,
           SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON
    FROM API_METADATA 
    WHERE TYPE = 'ORACLE_API'
  `).all();
  
  console.log(`   Found ${oracleAPIs.length} Oracle APIs\n`);
  
  oracleAPIs.forEach(api => {
    console.log(`   📌 ${api.NAME} (${api.ID})`);
    console.log(`      SAMPLE_CALL_TEXT: ${api.SAMPLE_CALL_TEXT ? `${api.SAMPLE_CALL_TEXT.substring(0, 50)}...` : 'NULL'}`);
    console.log(`      SAMPLE_RESULT_TEXT: ${api.SAMPLE_RESULT_TEXT ? `${api.SAMPLE_RESULT_TEXT.substring(0, 50)}...` : 'NULL'}`);
    console.log(`      SAMPLE_REQUEST_JSON: ${api.SAMPLE_REQUEST_JSON ? 'HAS DATA (should be NULL)' : 'NULL ✓'}`);
    console.log(`      SAMPLE_RESPONSE_JSON: ${api.SAMPLE_RESPONSE_JSON ? 'HAS DATA (should be NULL)' : 'NULL ✓'}`);
    console.log('');
  });
  
  // 3. Check REST APIs
  console.log('3️⃣ Checking REST APIs (sample)...');
  const restAPIs = db.prepare(`
    SELECT ID, NAME, TYPE,
           SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT,
           SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON
    FROM API_METADATA 
    WHERE TYPE = 'REST_API'
    LIMIT 2
  `).all();
  
  restAPIs.forEach(api => {
    console.log(`   📌 ${api.NAME} (${api.ID})`);
    console.log(`      SAMPLE_REQUEST_JSON: ${api.SAMPLE_REQUEST_JSON ? 'HAS DATA ✓' : 'NULL'}`);
    console.log(`      SAMPLE_RESPONSE_JSON: ${api.SAMPLE_RESPONSE_JSON ? 'HAS DATA ✓' : 'NULL'}`);
    console.log(`      SAMPLE_CALL_TEXT: ${api.SAMPLE_CALL_TEXT ? 'HAS DATA (should be NULL)' : 'NULL ✓'}`);
    console.log(`      SAMPLE_RESULT_TEXT: ${api.SAMPLE_RESULT_TEXT ? 'HAS DATA (should be NULL)' : 'NULL ✓'}`);
    console.log('');
  });
  
  console.log('✅ Verification complete!');
  
  db.close();
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
