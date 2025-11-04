const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'local_api_knowledge_hub.db');

console.log('📞 Inserting contact data...');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to database');
});

const contacts = [
    {
        api_id: 'rest-001',
        email: 'itcrediti-india@company.com',
        team: 'ITCREDITI-INDIA',
        slack: '#itcrediti-rest-apis',
        phone: '+91-80-1234-5678'
    },
    {
        api_id: 'java-001',
        email: 'java-team@company.com',
        team: 'ITCREDITI-JAVA-TEAM',
        slack: '#java-apis',
        phone: '+39-02-9876-5432'
    },
    {
        api_id: 'oracle-001',
        email: 'dba-team@company.com',
        team: 'WEBLOGIC_DBA',
        slack: '#oracle-db-apis',
        phone: '+39-02-1111-2222'
    }
];

let completed = 0;

contacts.forEach((contact) => {
    db.run(`INSERT OR REPLACE INTO API_CONTACTS (API_ID, EMAIL, TEAM, SLACK_CHANNEL, PHONE, CREATED_AT)
            VALUES (?, ?, ?, ?, ?, ?)`,
        [contact.api_id, contact.email, contact.team, contact.slack, contact.phone, new Date().toISOString()],
        (err) => {
            if (err) {
                console.error(`❌ Error inserting contact for ${contact.api_id}:`, err.message);
            } else {
                console.log(`✅ Inserted contact for ${contact.api_id}`);
            }
            
            completed++;
            if (completed === contacts.length) {
                db.close((err) => {
                    if (err) {
                        console.error('❌ Error closing database:', err.message);
                    } else {
                        console.log('✅ Database closed');
                        console.log('🎉 Contact data insertion completed!');
                    }
                });
            }
        });
});