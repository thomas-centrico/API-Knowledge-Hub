import Database from 'better-sqlite3';

const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔍 Verifying Java API Fields Implementation\n');

try {
  const db = new Database(DB_PATH);
  
  // 1. Check columns exist
  console.log('1️⃣ Checking Java API columns...');
  const columns = db.prepare(`PRAGMA table_info(API_METADATA)`).all();
  const javaColumns = ['PACKAGE_NAME', 'CLASS_NAME', 'METHOD_NAME', 'INTERFACE_NAME', 'API_SIGNATURE'];
  
  javaColumns.forEach(col => {
    const exists = columns.some(c => c.name === col);
    console.log(`   ${col}: ${exists ? '✓' : '✗'}`);
  });
  
  // 2. Check existing Java APIs
  console.log('\n2️⃣ Checking existing Java APIs...');
  const javaAPIs = db.prepare(`
    SELECT ID, NAME, TYPE, 
           PACKAGE_NAME, CLASS_NAME, METHOD_NAME, INTERFACE_NAME, API_SIGNATURE,
           SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT
    FROM API_METADATA 
    WHERE TYPE = 'JAVA_API'
  `).all();
  
  console.log(`   Found ${javaAPIs.length} Java APIs\n`);
  
  javaAPIs.forEach(api => {
    console.log(`   📌 ${api.NAME} (${api.ID})`);
    console.log(`      PACKAGE_NAME: ${api.PACKAGE_NAME || 'Not set'}`);
    console.log(`      CLASS_NAME: ${api.CLASS_NAME || 'Not set'}`);
    console.log(`      METHOD_NAME: ${api.METHOD_NAME || 'Not set'}`);
    console.log(`      INTERFACE_NAME: ${api.INTERFACE_NAME || 'Not set'}`);
    console.log(`      API_SIGNATURE: ${api.API_SIGNATURE || 'Not set'}`);
    console.log(`      SAMPLE_CALL_TEXT: ${api.SAMPLE_CALL_TEXT ? 'Has data' : 'Empty'}`);
    console.log(`      SAMPLE_RESULT_TEXT: ${api.SAMPLE_RESULT_TEXT ? 'Has data' : 'Empty'}`);
    console.log('');
  });
  
  console.log('✅ Verification complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Open Admin Panel');
  console.log('   2. Edit a Java API (e.g., java-001)');
  console.log('   3. Fill in the Java API Technical Details:');
  console.log('      - Package Name: com.example.api');
  console.log('      - Class Name: UserService');
  console.log('      - Method: getUserById');
  console.log('      - Interface: IUserService');
  console.log('      - API Signature: IUserService.getUserById(String id)');
  console.log('   4. Fill in Sample Call & Result (plain text)');
  console.log('   5. Save and view in user panel');
  
  db.close();
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
