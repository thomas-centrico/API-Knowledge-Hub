const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Configuration
const DB_PATH = '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\DB\\api_knowledge_hub.db';

console.log('🚀 Creating API Knowledge Hub SQLite Database...\n');
console.log(`📍 Database location: ${DB_PATH}\n`);

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Failed to connect to database:', err.message);
        process.exit(1);
    }
    console.log('🔗 Connected to SQLite database.');
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON;');

// Create tables
const createTables = () => {
    console.log('📋 Creating database tables...');
    
    // 1. API_METADATA table
    db.run(`CREATE TABLE IF NOT EXISTS API_METADATA (
        ID VARCHAR(50) PRIMARY KEY,
        NAME VARCHAR(255) NOT NULL,
        TYPE VARCHAR(20) NOT NULL CHECK (TYPE IN ('REST_API', 'JAVA_API', 'ORACLE_API')),
        CATEGORY VARCHAR(50) NOT NULL,
        STATUS VARCHAR(20) NOT NULL CHECK (STATUS IN ('active', 'deprecated', 'beta', 'maintenance')),
        VERSION VARCHAR(50),
        DESCRIPTION TEXT,
        OWNER VARCHAR(100),
        DEPARTMENT VARCHAR(100),
        LAST_UPDATED TIMESTAMP,
        CREATED_AT TIMESTAMP,
        BASE_URL VARCHAR(500),
        AUTH_METHOD VARCHAR(100),
        RATE_LIMIT VARCHAR(200),
        SLA_UPTIME DECIMAL(5,2),
        RESPONSE_TIME INTEGER,
        DOC_URL VARCHAR(500),
        HAS_INTERACTIVE_DOCS CHAR(1) CHECK (HAS_INTERACTIVE_DOCS IN ('Y', 'N')),
        CONTACT_EMAIL VARCHAR(255),
        CONTACT_TEAM VARCHAR(100),
        SLACK_CHANNEL VARCHAR(100),
        PACKAGE_NAME VARCHAR(255),
        CLASS_NAME VARCHAR(255),
        METHOD_NAME VARCHAR(255),
        INTERFACE_NAME VARCHAR(255),
        API_SIGNATURE TEXT,
        SCHEMA_NAME VARCHAR(100),
        PROCEDURE_NAME VARCHAR(255),
        FUNCTION_SIGNATURE TEXT,
        CONNECTION_STRING VARCHAR(500),
        CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        MODIFIED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating API_METADATA:', err.message);
        else console.log('✅ API_METADATA table created');
    });

    // 2. API_TAGS table
    db.run(`CREATE TABLE IF NOT EXISTS API_TAGS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        API_ID VARCHAR(50) NOT NULL,
        TAG VARCHAR(100) NOT NULL,
        FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
        UNIQUE(API_ID, TAG)
    )`, (err) => {
        if (err) console.error('Error creating API_TAGS:', err.message);
        else console.log('✅ API_TAGS table created');
    });

    // 3. API_DEPENDENCIES table
    db.run(`CREATE TABLE IF NOT EXISTS API_DEPENDENCIES (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        API_ID VARCHAR(50) NOT NULL,
        DEPENDS_ON_ID VARCHAR(50) NOT NULL,
        DEPENDENCY_TYPE VARCHAR(50) DEFAULT 'RUNTIME',
        DESCRIPTION TEXT,
        FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
        FOREIGN KEY (DEPENDS_ON_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
        UNIQUE(API_ID, DEPENDS_ON_ID)
    )`, (err) => {
        if (err) console.error('Error creating API_DEPENDENCIES:', err.message);
        else console.log('✅ API_DEPENDENCIES table created');
    });

    // 4. API_DEPENDENTS table
    db.run(`CREATE TABLE IF NOT EXISTS API_DEPENDENTS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        API_ID VARCHAR(50) NOT NULL,
        DEPENDENT_ID VARCHAR(50) NOT NULL,
        RELATIONSHIP_TYPE VARCHAR(50) DEFAULT 'CONSUMER',
        DESCRIPTION TEXT,
        FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
        FOREIGN KEY (DEPENDENT_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
        UNIQUE(API_ID, DEPENDENT_ID)
    )`, (err) => {
        if (err) console.error('Error creating API_DEPENDENTS:', err.message);
        else console.log('✅ API_DEPENDENTS table created');
    });

    // 5. API_USAGE table
    db.run(`CREATE TABLE IF NOT EXISTS API_USAGE (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        API_ID VARCHAR(50) NOT NULL,
        REQUESTS_PER_DAY INTEGER DEFAULT 0,
        ACTIVE_USERS INTEGER DEFAULT 0,
        ERROR_RATE DECIMAL(5,3) DEFAULT 0.000,
        PEAK_REQUESTS_PER_HOUR INTEGER DEFAULT 0,
        AVERAGE_RESPONSE_TIME INTEGER DEFAULT 0,
        P95_RESPONSE_TIME INTEGER DEFAULT 0,
        P99_RESPONSE_TIME INTEGER DEFAULT 0,
        LAST_UPDATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
        UNIQUE(API_ID)
    )`, (err) => {
        if (err) console.error('Error creating API_USAGE:', err.message);
        else console.log('✅ API_USAGE table created');
    });

    // 6. API_SAMPLE_REQUESTS table
    db.run(`CREATE TABLE IF NOT EXISTS API_SAMPLE_REQUESTS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        API_ID VARCHAR(50) NOT NULL,
        REQUEST_NAME VARCHAR(255),
        REQUEST_DESCRIPTION TEXT,
        REQUEST_DATA TEXT,
        REQUEST_HEADERS TEXT,
        HTTP_METHOD VARCHAR(10),
        ENDPOINT VARCHAR(500),
        CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE
    )`, (err) => {
        if (err) console.error('Error creating API_SAMPLE_REQUESTS:', err.message);
        else console.log('✅ API_SAMPLE_REQUESTS table created');
    });

    // 7. API_SAMPLE_RESPONSES table
    db.run(`CREATE TABLE IF NOT EXISTS API_SAMPLE_RESPONSES (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        API_ID VARCHAR(50) NOT NULL,
        REQUEST_ID INTEGER,
        RESPONSE_NAME VARCHAR(255),
        RESPONSE_DESCRIPTION TEXT,
        RESPONSE_DATA TEXT,
        RESPONSE_HEADERS TEXT,
        STATUS_CODE INTEGER,
        RESPONSE_TIME INTEGER,
        CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
        FOREIGN KEY (REQUEST_ID) REFERENCES API_SAMPLE_REQUESTS(ID) ON DELETE SET NULL
    )`, (err) => {
        if (err) console.error('Error creating API_SAMPLE_RESPONSES:', err.message);
        else console.log('✅ API_SAMPLE_RESPONSES table created');
    });

    // Wait a bit then create indexes
    setTimeout(createIndexes, 1000);
};

// Create indexes
const createIndexes = () => {
    console.log('\n📋 Creating database indexes...');
    
    const indexes = [
        'CREATE INDEX IF NOT EXISTS idx_api_metadata_type ON API_METADATA(TYPE)',
        'CREATE INDEX IF NOT EXISTS idx_api_metadata_category ON API_METADATA(CATEGORY)',
        'CREATE INDEX IF NOT EXISTS idx_api_metadata_status ON API_METADATA(STATUS)',
        'CREATE INDEX IF NOT EXISTS idx_api_metadata_owner ON API_METADATA(OWNER)',
        'CREATE INDEX IF NOT EXISTS idx_api_tags_tag ON API_TAGS(TAG)',
        'CREATE INDEX IF NOT EXISTS idx_api_tags_api_id ON API_TAGS(API_ID)',
        'CREATE INDEX IF NOT EXISTS idx_api_usage_requests_per_day ON API_USAGE(REQUESTS_PER_DAY)'
    ];

    let completed = 0;
    indexes.forEach((indexSql, i) => {
        db.run(indexSql, (err) => {
            if (err) console.error(`Error creating index ${i + 1}:`, err.message);
            else console.log(`✅ Index ${i + 1} created`);
            
            completed++;
            if (completed === indexes.length) {
                setTimeout(insertSampleData, 1000);
            }
        });
    });
};

// Insert sample data
const insertSampleData = () => {
    console.log('\n📋 Inserting sample data...');

    // Sample API data from your original file
    const apis = [
        {
            id: 'rest-001',
            name: 'notificaFirmaModulo',
            type: 'REST_API',
            category: 'authentication',
            status: 'active',
            version: 'v1.0.0',
            description: 'a new method in order to have a notification back from FEA to receive the result of signature of the document that has been generated to be digitally signed',
            owner: 'ITCREDITI-INDIA',
            department: 'ITCREDITI',
            base_url: 'http://soa.bansel.it/osb/GestioneAmministrativaGaranzie',
            auth_method: 'OAuth 2.0 Bearer Token',
            sla_uptime: 99.9,
            response_time: 95,
            contact_email: 'itcrediti-support@company.com',
            contact_team: 'ITCREDITI',
            slack_channel: '#itcrediti-api'
        },
        {
            id: 'java-001',
            name: 'getListaOneriUsura',
            type: 'JAVA_API',
            category: 'utilities',
            status: 'active',
            version: 'v3.1.2',
            description: 'It would provide the details about list of wear and tear charges applied',
            owner: 'ITCREDITI-INDIA',
            department: 'CREDITI',
            package_name: 'it.sella.gag.gestore',
            class_name: 'GestoreGaranzieImpl',
            method_name: 'getListaOneriUsura',
            interface_name: 'IGestoreGaranzie',
            api_signature: 'IGestoreGaranzie.getListaOneriUsura(numeroConto)',
            auth_method: 'Service Account',
            response_time: 145,
            sla_uptime: 99.7,
            contact_email: 'business-logic@company.com',
            contact_team: 'Business Logic',
            slack_channel: '#business-rules'
        },
        {
            id: 'oracle-001',
            name: 'WEBLOGIC_DBA.CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK',
            type: 'ORACLE_API',
            category: 'database',
            status: 'active',
            version: 'v1.0',
            description: 'Oracle function to retrieve ABI (Italian Banking Association) code for a given bank ID',
            owner: 'Patricia Wong',
            department: 'Database Administration',
            base_url: 'oracle://weblogic.company.com:1521/PROD',
            connection_string: 'jdbc:oracle:thin:@weblogic.company.com:1521:PROD',
            schema_name: 'WEBLOGIC_DBA',
            procedure_name: 'CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK',
            function_signature: 'CRC_FN_ABI_BY_ID_BANK(IN_ID_BANCA IN NUMBER) RETURN VARCHAR2',
            auth_method: 'Oracle Wallet + Service Account',
            response_time: 45,
            sla_uptime: 99.9,
            contact_email: 'dba-team@company.com',
            contact_team: 'Database Administration',
            slack_channel: '#oracle-db'
        }
    ];

    let insertedApis = 0;
    apis.forEach((api, index) => {
        const sql = `INSERT OR REPLACE INTO API_METADATA (
            ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT,
            BASE_URL, AUTH_METHOD, SLA_UPTIME, RESPONSE_TIME, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL,
            PACKAGE_NAME, CLASS_NAME, METHOD_NAME, INTERFACE_NAME, API_SIGNATURE,
            CONNECTION_STRING, SCHEMA_NAME, PROCEDURE_NAME, FUNCTION_SIGNATURE,
            LAST_UPDATED, CREATED_AT
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`;

        const params = [
            api.id, api.name, api.type, api.category, api.status, api.version, api.description,
            api.owner, api.department, api.base_url, api.auth_method, api.sla_uptime, api.response_time,
            api.contact_email, api.contact_team, api.slack_channel, api.package_name, api.class_name,
            api.method_name, api.interface_name, api.api_signature, api.connection_string,
            api.schema_name, api.procedure_name, api.function_signature
        ];

        db.run(sql, params, (err) => {
            if (err) {
                console.error(`Error inserting API ${api.id}:`, err.message);
            } else {
                console.log(`✅ Inserted API: ${api.name}`);
            }
            
            insertedApis++;
            if (insertedApis === apis.length) {
                insertTags();
            }
        });
    });
};

// Insert tags
const insertTags = () => {
    console.log('\n📋 Inserting tags...');
    
    const tags = [
        { api_id: 'rest-001', tag: 'notification' },
        { api_id: 'rest-001', tag: 'signature' },
        { api_id: 'rest-001', tag: 'document' },
        { api_id: 'rest-001', tag: 'FEA' },
        { api_id: 'java-001', tag: 'rules-engine' },
        { api_id: 'java-001', tag: 'workflow' },
        { api_id: 'java-001', tag: 'decisions' },
        { api_id: 'oracle-001', tag: 'weblogic' },
        { api_id: 'oracle-001', tag: 'banking' },
        { api_id: 'oracle-001', tag: 'abi-code' }
    ];

    let insertedTags = 0;
    tags.forEach(tag => {
        db.run('INSERT OR IGNORE INTO API_TAGS (API_ID, TAG) VALUES (?, ?)', [tag.api_id, tag.tag], (err) => {
            if (err) {
                console.error(`Error inserting tag ${tag.tag}:`, err.message);
            } else {
                console.log(`✅ Inserted tag: ${tag.tag} for ${tag.api_id}`);
            }
            
            insertedTags++;
            if (insertedTags === tags.length) {
                insertUsageData();
            }
        });
    });
};

// Insert usage data
const insertUsageData = () => {
    console.log('\n📋 Inserting usage data...');
    
    const usageData = [
        { api_id: 'rest-001', requests_per_day: 15000, active_users: 250, error_rate: 0.020 },
        { api_id: 'java-001', requests_per_day: 95000, active_users: 280, error_rate: 0.025 },
        { api_id: 'oracle-001', requests_per_day: 450000, active_users: 1200, error_rate: 0.012 }
    ];

    let insertedUsage = 0;
    usageData.forEach(usage => {
        db.run('INSERT OR REPLACE INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES (?, ?, ?, ?)', 
            [usage.api_id, usage.requests_per_day, usage.active_users, usage.error_rate], (err) => {
            if (err) {
                console.error(`Error inserting usage data for ${usage.api_id}:`, err.message);
            } else {
                console.log(`✅ Inserted usage data for: ${usage.api_id}`);
            }
            
            insertedUsage++;
            if (insertedUsage === usageData.length) {
                verifyDatabase();
            }
        });
    });
};

// Verify database
const verifyDatabase = () => {
    console.log('\n🔍 Verifying database...');
    
    db.all(`SELECT 
                am.NAME, am.TYPE, am.CATEGORY, am.STATUS, am.OWNER,
                au.REQUESTS_PER_DAY, au.ACTIVE_USERS,
                COUNT(at.TAG) as TAG_COUNT
            FROM API_METADATA am
            LEFT JOIN API_USAGE au ON am.ID = au.API_ID
            LEFT JOIN API_TAGS at ON am.ID = at.API_ID
            GROUP BY am.ID
            ORDER BY am.NAME`, (err, rows) => {
        if (err) {
            console.error('Error verifying database:', err.message);
        } else {
            console.log('\n📊 Database Verification Results:');
            console.log('=================================');
            rows.forEach(row => {
                console.log(`${row.NAME} | ${row.TYPE} | ${row.CATEGORY} | ${row.STATUS}`);
                console.log(`  Owner: ${row.OWNER} | Daily Requests: ${row.REQUESTS_PER_DAY || 'N/A'} | Tags: ${row.TAG_COUNT}`);
                console.log('');
            });
        }

        // Close database
        db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err.message);
            } else {
                console.log('🔐 Database connection closed.');
            }
        });

        console.log('\n🎉 Database setup completed successfully!');
        console.log('='.repeat(50));
        console.log(`📍 Database location: ${DB_PATH}`);
        console.log(`🔗 Connection string: sqlite:///${DB_PATH}`);
        console.log('='.repeat(50));
    });
};

// Start the process
createTables();