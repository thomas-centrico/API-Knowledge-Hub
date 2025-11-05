const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Configuration
const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\DB\\api_knowledge_hub.db';
const SCHEMA_FILE = path.join(__dirname, 'create_schema.sql');
const DATA_FILE = path.join(__dirname, 'insert_data_complete.sql');

console.log('🚀 Setting up API Knowledge Hub SQLite Database...\n');

// Helper function to execute SQL file
function executeSqlFile(db, filePath, description) {
    return new Promise((resolve, reject) => {
        console.log(`📋 ${description}...`);
        
        fs.readFile(filePath, 'utf8', (err, sql) => {
            if (err) {
                reject(new Error(`Failed to read ${filePath}: ${err.message}`));
                return;
            }

            // Execute the entire SQL as a single statement
            db.exec(sql, (err) => {
                if (err) {
                    // Try splitting and executing individual statements if bulk execution fails
                    const statements = sql.split(';').filter(stmt => {
                        const trimmed = stmt.trim();
                        return trimmed.length > 0 && 
                               !trimmed.startsWith('--') && 
                               !trimmed.startsWith('/*') &&
                               trimmed !== 'COMMIT';
                    });
                    
                    let completed = 0;
                    const executeNext = () => {
                        if (completed >= statements.length) {
                            console.log(`✅ ${description} completed successfully.\n`);
                            resolve();
                            return;
                        }

                        const statement = statements[completed].trim();
                        db.run(statement, (err) => {
                            if (err && !err.message.includes('already exists') && !err.message.includes('duplicate')) {
                                console.warn(`⚠️  Warning in statement ${completed + 1}: ${err.message}`);
                                console.warn(`Statement: ${statement.substring(0, 100)}...`);
                            }
                            completed++;
                            executeNext();
                        });
                    };
                    
                    executeNext();
                } else {
                    console.log(`✅ ${description} completed successfully.\n`);
                    resolve();
                }
            });
        });
    });
}

// Main setup function
async function setupDatabase() {
    try {
        // Ensure directory exists
        const dbDir = path.dirname(DB_PATH);
        if (!fs.existsSync(dbDir)) {
            console.log(`📁 Creating directory: ${dbDir}`);
            fs.mkdirSync(dbDir, { recursive: true });
        }

        console.log(`📍 Database location: ${DB_PATH}\n`);

        // Create database connection
        const db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                throw new Error(`Failed to connect to database: ${err.message}`);
            }
            console.log('🔗 Connected to SQLite database.');
        });

        // Enable foreign keys
        await new Promise((resolve, reject) => {
            db.run('PRAGMA foreign_keys = ON;', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Execute schema creation
        await executeSqlFile(db, SCHEMA_FILE, 'Creating database schema');

        // Execute data insertion
        await executeSqlFile(db, DATA_FILE, 'Inserting sample data');

        // Verify database
        console.log('🔍 Verifying database...');
        const verificationQuery = `
            SELECT 'API_METADATA' as TABLE_NAME, COUNT(*) as RECORD_COUNT FROM API_METADATA
            UNION ALL
            SELECT 'API_TAGS', COUNT(*) FROM API_TAGS
            UNION ALL
            SELECT 'API_DEPENDENCIES', COUNT(*) FROM API_DEPENDENCIES
            UNION ALL
            SELECT 'API_DEPENDENTS', COUNT(*) FROM API_DEPENDENTS
            UNION ALL
            SELECT 'API_USAGE', COUNT(*) FROM API_USAGE
            UNION ALL
            SELECT 'API_SAMPLE_REQUESTS', COUNT(*) FROM API_SAMPLE_REQUESTS
            UNION ALL
            SELECT 'API_SAMPLE_RESPONSES', COUNT(*) FROM API_SAMPLE_RESPONSES
            UNION ALL
            SELECT 'API_ENVIRONMENTS', COUNT(*) FROM API_ENVIRONMENTS
            UNION ALL
            SELECT 'API_SEARCH_INDEX', COUNT(*) FROM API_SEARCH_INDEX;
        `;

        const verificationResults = await new Promise((resolve, reject) => {
            db.all(verificationQuery, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\n📊 Database Verification Results:');
        console.log('=================================');
        verificationResults.forEach(row => {
            console.log(`${row.TABLE_NAME}: ${row.RECORD_COUNT} records`);
        });

        // Test sample query
        console.log('\n🧪 Testing with sample query...');
        const sampleQuery = 'SELECT NAME, TYPE, CATEGORY, STATUS FROM API_METADATA LIMIT 5;';
        const sampleResults = await new Promise((resolve, reject) => {
            db.all(sampleQuery, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\n📋 Sample APIs in Database:');
        console.log('===========================');
        sampleResults.forEach(row => {
            console.log(`${row.NAME} | ${row.TYPE} | ${row.CATEGORY} | ${row.STATUS}`);
        });

        // Close database
        db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err.message);
            } else {
                console.log('\n🔐 Database connection closed.');
            }
        });

        console.log('\n🎉 Database setup completed successfully!');
        console.log('='.repeat(50));
        console.log(`📍 Database location: ${DB_PATH}`);
        console.log(`🔗 Connection string: sqlite:///${DB_PATH}`);
        console.log('='.repeat(50));

    } catch (error) {
        console.error('\n❌ Error setting up database:', error.message);
        process.exit(1);
    }
}

// Test database connection and basic queries
async function testDatabase() {
    try {
        console.log('🧪 Testing database connection...\n');
        
        const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                throw new Error(`Failed to connect to database: ${err.message}`);
            }
            console.log('✅ Connected to database for testing.');
        });

        // Test comprehensive view
        const testQuery = `
            SELECT 
                am.NAME,
                am.TYPE,
                am.CATEGORY,
                am.STATUS,
                am.OWNER,
                au.REQUESTS_PER_DAY,
                au.ACTIVE_USERS,
                COUNT(at.TAG) as TAG_COUNT
            FROM API_METADATA am
            LEFT JOIN API_USAGE au ON am.ID = au.API_ID
            LEFT JOIN API_TAGS at ON am.ID = at.API_ID
            GROUP BY am.ID
            ORDER BY au.REQUESTS_PER_DAY DESC
            LIMIT 10;
        `;

        const results = await new Promise((resolve, reject) => {
            db.all(testQuery, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\n📊 Top 10 APIs by Usage:');
        console.log('========================');
        results.forEach((row, index) => {
            console.log(`${index + 1}. ${row.NAME}`);
            console.log(`   Type: ${row.TYPE} | Category: ${row.CATEGORY} | Status: ${row.STATUS}`);
            console.log(`   Owner: ${row.OWNER} | Daily Requests: ${row.REQUESTS_PER_DAY || 'N/A'}`);
            console.log(`   Active Users: ${row.ACTIVE_USERS || 'N/A'} | Tags: ${row.TAG_COUNT}`);
            console.log('');
        });

        db.close();
        console.log('🎯 Database test completed successfully!\n');

    } catch (error) {
        console.error('❌ Database test failed:', error.message);
        process.exit(1);
    }
}

// Command line interface
const command = process.argv[2];

switch (command) {
    case 'test':
        testDatabase();
        break;
    case 'setup':
    default:
        setupDatabase();
        break;
}

module.exports = {
    setupDatabase,
    testDatabase,
    DB_PATH
};