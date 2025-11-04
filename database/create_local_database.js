const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'local_api_knowledge_hub.db');

console.log('🔧 Creating local SQLite database...');
console.log(`📍 Database location: ${DB_PATH}`);

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Error creating database:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to local SQLite database');
});

// Create tables
const createTables = () => {
    console.log('📋 Creating database tables...');
    
    const tables = [
        `CREATE TABLE IF NOT EXISTS API_METADATA (
            ID TEXT PRIMARY KEY,
            NAME TEXT NOT NULL,
            TYPE TEXT NOT NULL,
            CATEGORY TEXT,
            STATUS TEXT,
            DESCRIPTION TEXT,
            OWNER TEXT,
            DEPARTMENT TEXT,
            VERSION TEXT,
            CREATED_AT TEXT,
            LAST_UPDATED TEXT,
            DOCUMENTATION_URL TEXT,
            ENDPOINTS TEXT,
            AUTHENTICATION TEXT,
            RATE_LIMIT TEXT
        )`,
        
        `CREATE TABLE IF NOT EXISTS API_TAGS (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            API_ID TEXT,
            TAG TEXT,
            FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID)
        )`,
        
        `CREATE TABLE IF NOT EXISTS API_DEPENDENCIES (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            API_ID TEXT,
            DEPENDENCY_NAME TEXT,
            DEPENDENCY_TYPE TEXT,
            FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID)
        )`,
        
        `CREATE TABLE IF NOT EXISTS API_DEPENDENTS (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            API_ID TEXT,
            DEPENDENT_NAME TEXT,
            DEPENDENT_TYPE TEXT,
            FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID)
        )`,
        
        `CREATE TABLE IF NOT EXISTS API_USAGE (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            API_ID TEXT,
            REQUESTS_PER_DAY INTEGER,
            ACTIVE_USERS INTEGER,
            ERROR_RATE REAL,
            FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID)
        )`,
        
        `CREATE TABLE IF NOT EXISTS API_CONTACTS (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            API_ID TEXT,
            EMAIL TEXT,
            TEAM TEXT,
            SLACK_CHANNEL TEXT,
            PHONE TEXT,
            CREATED_AT TEXT,
            FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID)
        )`
    ];
    
    let completed = 0;
    tables.forEach((sql, index) => {
        db.run(sql, (err) => {
            if (err) {
                console.error(`❌ Error creating table ${index + 1}:`, err.message);
            } else {
                console.log(`✅ Created table ${index + 1}/${tables.length}`);
            }
            
            completed++;
            if (completed === tables.length) {
                insertSampleData();
            }
        });
    });
};

// Insert sample data
const insertSampleData = () => {
    console.log('📊 Inserting sample data...');
    
    const apis = [
        {
            id: 'rest-001',
            name: 'notificaFirmaModulo',
            type: 'REST_API',
            category: 'authentication',
            status: 'active',
            description: 'A new method to receive notification back from FEA about document signature results',
            owner: 'ITCREDITI-INDIA',
            department: 'ITCREDITI',
            version: 'v1.0.0',
            tags: ['notification', 'signature', 'document', 'FEA']
        },
        {
            id: 'java-001',
            name: 'getListaOneriUsura',
            type: 'JAVA_API',
            category: 'financial',
            status: 'active',
            description: 'Java method to retrieve list of usury charges and interest rates',
            owner: 'ITCREDITI-JAVA-TEAM',
            department: 'ITCREDITI',
            version: 'v2.1.0',
            tags: ['financial', 'usury', 'charges', 'interest-rates']
        },
        {
            id: 'oracle-001',
            name: 'WEBLOGIC_DBA.CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK',
            type: 'ORACLE_API',
            category: 'database',
            status: 'active',
            description: 'Oracle function to retrieve bank ABI code by bank ID through external interface',
            owner: 'WEBLOGIC_DBA',
            department: 'ITCREDITI',
            version: 'v1.5.0',
            tags: ['oracle', 'banking', 'ABI', 'external-interface']
        }
    ];
    
    let completed = 0;
    
    apis.forEach((api) => {
        // Insert API metadata
        db.run(`INSERT INTO API_METADATA 
                (ID, NAME, TYPE, CATEGORY, STATUS, DESCRIPTION, OWNER, DEPARTMENT, VERSION, CREATED_AT, LAST_UPDATED)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [api.id, api.name, api.type, api.category, api.status, api.description, 
             api.owner, api.department, api.version, new Date().toISOString(), new Date().toISOString()],
            (err) => {
                if (err) {
                    console.error(`❌ Error inserting API ${api.id}:`, err.message);
                } else {
                    console.log(`✅ Inserted API: ${api.name}`);
                }
                
                // Insert tags
                api.tags.forEach((tag) => {
                    db.run(`INSERT INTO API_TAGS (API_ID, TAG) VALUES (?, ?)`,
                        [api.id, tag]);
                });
                
                // Insert usage data
                const usage = {
                    'rest-001': { requests: 1500, users: 45, error: 0.02 },
                    'java-001': { requests: 3200, users: 78, error: 0.01 },
                    'oracle-001': { requests: 890, users: 23, error: 0.03 }
                };
                
                const apiUsage = usage[api.id];
                if (apiUsage) {
                    db.run(`INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE)
                            VALUES (?, ?, ?, ?)`,
                        [api.id, apiUsage.requests, apiUsage.users, apiUsage.error]);
                }
                
                // Insert contact data
                const contacts = {
                    'rest-001': { 
                        email: 'itcrediti-india@company.com', 
                        team: 'ITCREDITI-INDIA', 
                        slack: '#itcrediti-rest-apis',
                        phone: '+91-80-1234-5678'
                    },
                    'java-001': { 
                        email: 'java-team@company.com', 
                        team: 'ITCREDITI-JAVA-TEAM', 
                        slack: '#java-apis',
                        phone: '+39-02-9876-5432'
                    },
                    'oracle-001': { 
                        email: 'dba-team@company.com', 
                        team: 'WEBLOGIC_DBA', 
                        slack: '#oracle-db-apis',
                        phone: '+39-02-1111-2222'
                    }
                };
                
                const apiContact = contacts[api.id];
                if (apiContact) {
                    db.run(`INSERT INTO API_CONTACTS (API_ID, EMAIL, TEAM, SLACK_CHANNEL, PHONE, CREATED_AT)
                            VALUES (?, ?, ?, ?, ?, ?)`,
                        [api.id, apiContact.email, apiContact.team, apiContact.slack, apiContact.phone, new Date().toISOString()]);
                }
                
                completed++;
                if (completed === apis.length) {
                    finishSetup();
                }
            });
    });
};

// Finish setup
const finishSetup = () => {
    console.log('\n🎯 Local database setup completed successfully!');
    console.log('📍 Database created at:', DB_PATH);
    console.log('📊 Sample data inserted: 3 APIs with tags and usage statistics');
    
    // Close database
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
            console.log('\n🚀 You can now start the API server with: node api-server.js');
        }
    });
};

// Start database creation
createTables();