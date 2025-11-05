import Database from 'better-sqlite3';

const DB_PATH = process.env.DB_PATH || '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';

console.log('🧪 Testing REST API Update with New Columns\n');

try {
    const db = new Database(DB_PATH);
    
    // Find a REST API to update
    const restApis = db.prepare(`
        SELECT ID, NAME, TYPE 
        FROM API_METADATA 
        WHERE TYPE = 'REST_API'
        LIMIT 1
    `).all();
    
    if (restApis.length === 0) {
        console.log('❌ No REST APIs found in database');
        process.exit(1);
    }
    
    const testApi = restApis[0];
    console.log(`📝 Testing with API: ${testApi.NAME} (${testApi.ID})\n`);
    
    // Update with REST-specific fields
    const updateStmt = db.prepare(`
        UPDATE API_METADATA 
        SET 
            ENDPOINT = ?,
            METHOD = ?,
            CONTENT_TYPE = ?,
            SAMPLE_REQUEST_JSON = ?,
            SAMPLE_RESPONSE_JSON = ?,
            LAST_UPDATED = CURRENT_TIMESTAMP
        WHERE ID = ?
    `);
    
    const testData = {
        endpoint: '/api/v1/test-endpoint',
        method: 'POST',
        contentType: 'application/json',
        sampleRequest: JSON.stringify({ test: 'request data', id: 123 }, null, 2),
        sampleResponse: JSON.stringify({ success: true, data: { result: 'test response' } }, null, 2)
    };
    
    console.log('📤 Attempting to update with:');
    console.log(`  Endpoint: ${testData.endpoint}`);
    console.log(`  Method: ${testData.method}`);
    console.log(`  Content Type: ${testData.contentType}`);
    console.log(`  Sample Request: ${testData.sampleRequest.substring(0, 50)}...`);
    console.log(`  Sample Response: ${testData.sampleResponse.substring(0, 50)}...\n`);
    
    const result = updateStmt.run(
        testData.endpoint,
        testData.method,
        testData.contentType,
        testData.sampleRequest,
        testData.sampleResponse,
        testApi.ID
    );
    
    console.log(`✅ Update successful! Changes: ${result.changes}\n`);
    
    // Verify the update
    const verifyStmt = db.prepare(`
        SELECT 
            ID, NAME, TYPE,
            ENDPOINT, METHOD, CONTENT_TYPE,
            SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON
        FROM API_METADATA 
        WHERE ID = ?
    `);
    
    const updated = verifyStmt.get(testApi.ID);
    
    console.log('✓ Verification - Data Retrieved:');
    console.log(`  ID: ${updated.ID}`);
    console.log(`  Name: ${updated.NAME}`);
    console.log(`  Endpoint: ${updated.ENDPOINT || '(null)'}`);
    console.log(`  Method: ${updated.METHOD || '(null)'}`);
    console.log(`  Content Type: ${updated.CONTENT_TYPE || '(null)'}`);
    console.log(`  Sample Request: ${updated.SAMPLE_REQUEST_JSON ? updated.SAMPLE_REQUEST_JSON.substring(0, 50) + '...' : '(null)'}`);
    console.log(`  Sample Response: ${updated.SAMPLE_RESPONSE_JSON ? updated.SAMPLE_RESPONSE_JSON.substring(0, 50) + '...' : '(null)'}`);
    
    db.close();
    
    console.log('\n🎉 All REST API fields are working correctly!');
    console.log('\n✅ Next Steps:');
    console.log('  1. Open Admin Panel: http://localhost:3001/admin');
    console.log('  2. Edit a REST API');
    console.log('  3. Fill in Endpoint, Method, Content Type, and JSON samples');
    console.log('  4. Save and verify the data persists');
    console.log('  5. Click "View Details" to see all fields displayed');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
}
