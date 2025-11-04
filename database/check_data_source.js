const sqlite3 = require('sqlite3').verbose();

const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\DB\\api_knowledge_hub.db';

// Simple test to verify data source
async function checkDataSource() {
    console.log('🔍 Data Source Verification Tool\n');
    
    // 1. Check static file data
    console.log('📄 Static Data (sampleData.js):');
    try {
        const { sampleAPIs } = require('../src/data/sampleData.js');
        console.log(`✅ Static file contains ${sampleAPIs.length} APIs`);
        console.log('First 3 API names from static file:');
        sampleAPIs.slice(0, 3).forEach((api, index) => {
            console.log(`   ${index + 1}. ${api.name} (${api.id})`);
        });
    } catch (error) {
        console.log('❌ Error reading static file:', error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // 2. Check database data
    console.log('🗄️  Database Data (SQLite):');
    
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.log('❌ Cannot connect to database:', err.message);
            console.log('💡 This means your app is definitely using static data');
            return;
        }
        
        console.log('✅ Database connection successful');
        
        db.all('SELECT ID, NAME, TYPE FROM API_METADATA ORDER BY TYPE, NAME', (err, rows) => {
            if (err) {
                console.log('❌ Error querying database:', err.message);
                return;
            }
            
            console.log(`✅ Database contains ${rows.length} APIs`);
            
            if (rows.length > 0) {
                console.log('First 3 API names from database:');
                rows.slice(0, 3).forEach((api, index) => {
                    console.log(`   ${index + 1}. ${api.NAME} (${api.ID})`);
                });
                
                // Compare with static data
                console.log('\n🔄 Data Source Analysis:');
                if (rows.length === 3) {
                    console.log('📊 Database has 3 APIs (minimal test data)');
                    console.log('📊 Static file has many more APIs');
                    console.log('➡️  Your application is currently using STATIC DATA');
                    console.log('💡 To use database data, you need to create API endpoints');
                } else {
                    console.log('📊 Database structure is ready for integration');
                }
            } else {
                console.log('⚠️  Database exists but has no data');
            }
            
            db.close();
            
            console.log('\n' + '='.repeat(50));
            console.log('🎯 CONCLUSION:');
            console.log('Your app is currently using STATIC DATA from sampleData.js');
            console.log('To use DATABASE DATA, follow the integration steps below.');
            console.log('='.repeat(50));
        });
    });
}

checkDataSource();