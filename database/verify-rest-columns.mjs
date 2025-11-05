import Database from 'better-sqlite3';

const DB_PATH = process.env.DB_PATH || '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔍 Checking database columns for REST API fields...\n');

try {
    const db = new Database(DB_PATH, { readonly: true });
    
    // Get all columns from API_METADATA
    const columns = db.prepare('PRAGMA table_info(API_METADATA)').all();
    
    console.log('📊 API_METADATA Table Structure:');
    console.log('═'.repeat(100));
    
    // Check for REST API specific columns
    const requiredRESTColumns = {
        'ENDPOINT': 'VARCHAR',
        'METHOD': 'VARCHAR',
        'CONTENT_TYPE': 'VARCHAR',
        'BASE_URL': 'VARCHAR',
        'SAMPLE_REQUEST_JSON': 'TEXT',
        'SAMPLE_RESPONSE_JSON': 'TEXT'
    };
    
    const foundColumns = {};
    columns.forEach(col => {
        foundColumns[col.name] = col.type;
    });
    
    console.log('\n✓ Required REST API Columns Check:');
    console.log('─'.repeat(100));
    
    for (const [colName, expectedType] of Object.entries(requiredRESTColumns)) {
        if (foundColumns[colName]) {
            console.log(`✅ ${colName.padEnd(25)} - Found (${foundColumns[colName]})`);
        } else {
            console.log(`❌ ${colName.padEnd(25)} - MISSING!`);
        }
    }
    
    console.log('\n📋 All Columns in API_METADATA:');
    console.log('─'.repeat(100));
    columns.forEach(col => {
        const notNull = col.notnull ? 'NOT NULL' : '';
        const pk = col.pk ? 'PRIMARY KEY' : '';
        const flags = [notNull, pk].filter(Boolean).join(' ');
        console.log(`  ${col.cid.toString().padStart(2)}) ${col.name.padEnd(30)} ${col.type.padEnd(20)} ${flags}`);
    });
    
    // Check a sample record
    console.log('\n📝 Sample REST API Record:');
    console.log('─'.repeat(100));
    
    const sampleAPI = db.prepare("SELECT * FROM API_METADATA WHERE TYPE = 'REST_API' LIMIT 1").get();
    
    if (sampleAPI) {
        console.log(`\nAPI ID: ${sampleAPI.ID}`);
        console.log(`Name: ${sampleAPI.NAME}`);
        console.log(`\nREST API Specific Fields:`);
        console.log(`  BASE_URL: ${sampleAPI.BASE_URL || '(not set)'}`);
        console.log(`  ENDPOINT: ${sampleAPI.ENDPOINT || '(not set)'}`);
        console.log(`  METHOD: ${sampleAPI.METHOD || '(not set)'}`);
        console.log(`  CONTENT_TYPE: ${sampleAPI.CONTENT_TYPE || '(not set)'}`);
        console.log(`  SAMPLE_REQUEST_JSON: ${sampleAPI.SAMPLE_REQUEST_JSON ? 'Set (' + sampleAPI.SAMPLE_REQUEST_JSON.length + ' chars)' : '(not set)'}`);
        console.log(`  SAMPLE_RESPONSE_JSON: ${sampleAPI.SAMPLE_RESPONSE_JSON ? 'Set (' + sampleAPI.SAMPLE_RESPONSE_JSON.length + ' chars)' : '(not set)'}`);
    } else {
        console.log('⚠️  No REST API records found in database');
    }
    
    // Check API_SAMPLE_REQUESTS table
    console.log('\n📊 Checking API_SAMPLE_REQUESTS Table:');
    console.log('─'.repeat(100));
    const sampleReqTable = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='API_SAMPLE_REQUESTS'").get();
    if (sampleReqTable) {
        const sampleReqColumns = db.prepare('PRAGMA table_info(API_SAMPLE_REQUESTS)').all();
        console.log('✅ API_SAMPLE_REQUESTS table exists');
        console.log('Columns:', sampleReqColumns.map(c => c.name).join(', '));
    } else {
        console.log('❌ API_SAMPLE_REQUESTS table not found');
    }
    
    // Check API_SAMPLE_RESPONSES table
    console.log('\n📊 Checking API_SAMPLE_RESPONSES Table:');
    console.log('─'.repeat(100));
    const sampleResTable = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='API_SAMPLE_RESPONSES'").get();
    if (sampleResTable) {
        const sampleResColumns = db.prepare('PRAGMA table_info(API_SAMPLE_RESPONSES)').all();
        console.log('✅ API_SAMPLE_RESPONSES table exists');
        console.log('Columns:', sampleResColumns.map(c => c.name).join(', '));
    } else {
        console.log('❌ API_SAMPLE_RESPONSES table not found');
    }
    
    db.close();
    console.log('\n✅ Database verification complete\n');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
}
