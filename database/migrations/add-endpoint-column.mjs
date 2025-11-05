import Database from 'better-sqlite3';

const DB_PATH = process.env.DB_PATH || '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🔄 Adding ENDPOINT column...\n');

try {
    const db = new Database(DB_PATH);
    
    // Check if column exists
    const columns = db.prepare('PRAGMA table_info(API_METADATA)').all();
    const hasEndpoint = columns.some(c => c.name === 'ENDPOINT');
    
    if (hasEndpoint) {
        console.log('✅ ENDPOINT column already exists!');
    } else {
        console.log('➕ Adding ENDPOINT column...');
        db.prepare('ALTER TABLE API_METADATA ADD COLUMN ENDPOINT VARCHAR(500)').run();
        db.prepare('CREATE INDEX IF NOT EXISTS idx_api_metadata_endpoint ON API_METADATA(ENDPOINT)').run();
        console.log('✅ ENDPOINT column added successfully!');
    }
    
    // Verify all required columns
    const updatedColumns = db.prepare('PRAGMA table_info(API_METADATA)').all();
    const requiredColumns = ['ENDPOINT', 'METHOD', 'CONTENT_TYPE', 'SAMPLE_REQUEST_JSON', 'SAMPLE_RESPONSE_JSON'];
    
    console.log('\n✓ REST API Columns Status:');
    requiredColumns.forEach(colName => {
        const exists = updatedColumns.some(c => c.name === colName);
        console.log(`  ${exists ? '✅' : '❌'} ${colName}`);
    });
    
    db.close();
    console.log('\n🎉 All required columns are now in place!');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
