import Database from 'better-sqlite3';

const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔍 Checking database schema...');
console.log('📂 Database:', DB_PATH);

try {
    const db = new Database(DB_PATH, { readonly: true });
    
    // Get column information
    const columns = db.prepare('PRAGMA table_info(API_METADATA)').all();
    
    console.log('\n📊 API_METADATA table columns:');
    console.log('─'.repeat(80));
    
    const requiredColumns = [
        'ENDPOINT',
        'METHOD', 
        'CONTENT_TYPE',
        'SAMPLE_REQUEST_JSON',
        'SAMPLE_RESPONSE_JSON',
        'BASE_URL',
        'CONTACT_EMAIL',
        'CONTACT_TEAM',
        'SLACK_CHANNEL',
        'DOC_URL',
        'HAS_INTERACTIVE_DOCS'
    ];
    
    const foundColumns = columns.map(col => col.name);
    
    columns.forEach(col => {
        const isRequired = requiredColumns.includes(col.name);
        const marker = isRequired ? '✓' : ' ';
        console.log(`[${marker}] ${col.name.padEnd(30)} ${col.type.padEnd(20)} ${col.notnull ? 'NOT NULL' : ''}`);
    });
    
    console.log('\n🔍 Checking for missing required columns:');
    console.log('─'.repeat(80));
    
    const missingColumns = requiredColumns.filter(col => !foundColumns.includes(col));
    
    if (missingColumns.length > 0) {
        console.log('❌ Missing columns:');
        missingColumns.forEach(col => {
            console.log(`   - ${col}`);
        });
    } else {
        console.log('✅ All required columns exist!');
    }
    
    // Test a sample record
    console.log('\n📝 Sample record from database:');
    console.log('─'.repeat(80));
    
    const sampleAPI = db.prepare('SELECT * FROM API_METADATA LIMIT 1').get();
    
    if (sampleAPI) {
        console.log('ID:', sampleAPI.ID);
        console.log('NAME:', sampleAPI.NAME);
        console.log('TYPE:', sampleAPI.TYPE);
        console.log('ENDPOINT:', sampleAPI.ENDPOINT || '(not set)');
        console.log('METHOD:', sampleAPI.METHOD || '(not set)');
        console.log('CONTENT_TYPE:', sampleAPI.CONTENT_TYPE || '(not set)');
        console.log('BASE_URL:', sampleAPI.BASE_URL || '(not set)');
        console.log('SAMPLE_REQUEST_JSON:', sampleAPI.SAMPLE_REQUEST_JSON ? 'Set (' + sampleAPI.SAMPLE_REQUEST_JSON.length + ' chars)' : '(not set)');
        console.log('SAMPLE_RESPONSE_JSON:', sampleAPI.SAMPLE_RESPONSE_JSON ? 'Set (' + sampleAPI.SAMPLE_RESPONSE_JSON.length + ' chars)' : '(not set)');
    } else {
        console.log('❌ No records found in database');
    }
    
    db.close();
    console.log('\n✅ Schema check complete');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
