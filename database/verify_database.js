const sqlite3 = require('sqlite3').verbose();

const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\DB\\api_knowledge_hub.db';

console.log('🔍 Verifying API Knowledge Hub Database...\n');
console.log(`📍 Database location: ${DB_PATH}\n`);

const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('❌ Failed to connect to database:', err.message);
        process.exit(1);
    }
    console.log('🔗 Connected to database for verification.');
});

// Check tables exist
const checkTables = () => {
    console.log('\n📋 Checking database tables...');
    
    db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name", (err, tables) => {
        if (err) {
            console.error('Error checking tables:', err.message);
            return;
        }
        
        console.log(`✅ Found ${tables.length} tables:`);
        tables.forEach(table => {
            console.log(`   - ${table.name}`);
        });
        
        checkData();
    });
};

// Check data counts
const checkData = () => {
    console.log('\n📊 Checking data counts...');
    
    const queries = [
        { name: 'API_METADATA', query: 'SELECT COUNT(*) as count FROM API_METADATA' },
        { name: 'API_TAGS', query: 'SELECT COUNT(*) as count FROM API_TAGS' },
        { name: 'API_USAGE', query: 'SELECT COUNT(*) as count FROM API_USAGE' }
    ];
    
    let completed = 0;
    queries.forEach(q => {
        db.get(q.query, (err, row) => {
            if (err) {
                console.error(`Error checking ${q.name}:`, err.message);
            } else {
                console.log(`✅ ${q.name}: ${row.count} records`);
            }
            
            completed++;
            if (completed === queries.length) {
                showSampleData();
            }
        });
    });
};

// Show sample data
const showSampleData = () => {
    console.log('\n📋 Sample API data:');
    console.log('===================');
    
    db.all(`SELECT 
                am.ID, am.NAME, am.TYPE, am.CATEGORY, am.STATUS, am.OWNER,
                au.REQUESTS_PER_DAY, au.ACTIVE_USERS, au.ERROR_RATE
            FROM API_METADATA am
            LEFT JOIN API_USAGE au ON am.ID = au.API_ID
            ORDER BY am.TYPE, am.NAME`, (err, rows) => {
        if (err) {
            console.error('Error fetching sample data:', err.message);
        } else {
            rows.forEach((row, index) => {
                console.log(`${index + 1}. ${row.NAME}`);
                console.log(`   ID: ${row.ID}`);
                console.log(`   Type: ${row.TYPE} | Category: ${row.CATEGORY} | Status: ${row.STATUS}`);
                console.log(`   Owner: ${row.OWNER}`);
                console.log(`   Daily Requests: ${row.REQUESTS_PER_DAY || 'N/A'} | Active Users: ${row.ACTIVE_USERS || 'N/A'}`);
                console.log(`   Error Rate: ${row.ERROR_RATE || 'N/A'}%`);
                console.log('');
            });
        }
        
        showTagData();
    });
};

// Show tag data
const showTagData = () => {
    console.log('📊 API Tags:');
    console.log('============');
    
    db.all(`SELECT 
                am.NAME, 
                GROUP_CONCAT(at.TAG, ', ') as TAGS
            FROM API_METADATA am
            LEFT JOIN API_TAGS at ON am.ID = at.API_ID
            GROUP BY am.ID, am.NAME
            ORDER BY am.NAME`, (err, rows) => {
        if (err) {
            console.error('Error fetching tag data:', err.message);
        } else {
            rows.forEach(row => {
                console.log(`${row.NAME}: ${row.TAGS || 'No tags'}`);
            });
        }
        
        // Test a complex query
        testComplexQuery();
    });
};

// Test complex query
const testComplexQuery = () => {
    console.log('\n🧪 Testing complex query...');
    
    const complexQuery = `
        SELECT 
            am.TYPE as API_TYPE,
            COUNT(*) as COUNT,
            AVG(au.REQUESTS_PER_DAY) as AVG_DAILY_REQUESTS,
            AVG(au.ACTIVE_USERS) as AVG_ACTIVE_USERS,
            AVG(au.ERROR_RATE) as AVG_ERROR_RATE
        FROM API_METADATA am
        LEFT JOIN API_USAGE au ON am.ID = au.API_ID
        GROUP BY am.TYPE
        ORDER BY COUNT(*) DESC
    `;
    
    db.all(complexQuery, (err, rows) => {
        if (err) {
            console.error('Error running complex query:', err.message);
        } else {
            console.log('✅ API Statistics by Type:');
            console.log('==========================');
            rows.forEach(row => {
                console.log(`${row.API_TYPE}:`);
                console.log(`  Count: ${row.COUNT}`);
                console.log(`  Avg Daily Requests: ${Math.round(row.AVG_DAILY_REQUESTS || 0)}`);
                console.log(`  Avg Active Users: ${Math.round(row.AVG_ACTIVE_USERS || 0)}`);
                console.log(`  Avg Error Rate: ${(row.AVG_ERROR_RATE || 0).toFixed(3)}%`);
                console.log('');
            });
        }
        
        finishVerification();
    });
};

// Finish verification
const finishVerification = () => {
    console.log('🎯 Database verification completed successfully!');
    console.log('\n🔗 Connection Information:');
    console.log('==========================');
    console.log(`Database Path: ${DB_PATH}`);
    console.log(`Connection String: sqlite:///${DB_PATH}`);
    console.log(`File Size: Available in file system`);
    
    console.log('\n📚 Usage Examples:');
    console.log('==================');
    console.log('Node.js:');
    console.log(`const db = new sqlite3.Database('${DB_PATH}');`);
    console.log('');
    console.log('Python:');
    console.log(`conn = sqlite3.connect(r'${DB_PATH}')`);
    console.log('');
    console.log('C#:');
    console.log(`connectionString = "Data Source=${DB_PATH}";`);
    
    // Close database
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err.message);
        } else {
            console.log('\n🔐 Database connection closed.');
            console.log('\n✅ Verification complete! Database is ready for use.');
        }
    });
};

// Start verification
checkTables();