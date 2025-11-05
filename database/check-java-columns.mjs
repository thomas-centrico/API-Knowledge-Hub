import Database from 'better-sqlite3';

const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔍 Checking Java API Database Columns\n');

try {
  const db = new Database(DB_PATH);
  
  const columns = db.pragma('table_info(API_METADATA)');
  
  console.log('📋 Looking for Java API specific columns:');
  const javaColumns = columns.filter(c => 
    c.name.includes('PACKAGE') || 
    c.name.includes('CLASS') || 
    c.name.includes('METHOD') || 
    c.name.includes('INTERFACE') || 
    c.name.includes('SIGNATURE')
  );
  
  if (javaColumns.length === 0) {
    console.log('❌ No Java-specific columns found\n');
    console.log('Required columns:');
    console.log('  • PACKAGE_NAME');
    console.log('  • CLASS_NAME');
    console.log('  • METHOD_NAME');
    console.log('  • INTERFACE_NAME');
    console.log('  • API_SIGNATURE');
  } else {
    console.log('✅ Found Java columns:');
    javaColumns.forEach(c => console.log(`  • ${c.name} (${c.type})`));
  }
  
  // Check Java APIs
  console.log('\n🔍 Checking Java APIs:');
  const javaAPIs = db.prepare('SELECT ID, NAME FROM API_METADATA WHERE TYPE = ?').all('JAVA_API');
  console.log(`Found ${javaAPIs.length} Java APIs`);
  
  db.close();
} catch (error) {
  console.error('❌ Error:', error.message);
}
