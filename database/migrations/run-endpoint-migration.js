const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db';
const MIGRATION_FILE = path.join(__dirname, 'add_endpoint_contenttype_fields.sql');

console.log('🔄 Running database migration...');
console.log('📂 Database:', DB_PATH);
console.log('📄 Migration file:', MIGRATION_FILE);

// Read migration SQL
const migrationSQL = fs.readFileSync(MIGRATION_FILE, 'utf8');

// Connect to database
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to database');
});

// Execute migration
db.exec(migrationSQL, (err) => {
    if (err) {
        console.error('❌ Migration failed:', err.message);
        db.close();
        process.exit(1);
    }
    
    console.log('✅ Migration completed successfully!');
    console.log('📋 Added columns: ENDPOINT, CONTENT_TYPE');
    
    // Verify columns were added
    db.all("PRAGMA table_info(API_METADATA)", (err, columns) => {
        if (err) {
            console.error('❌ Error verifying migration:', err.message);
        } else {
            console.log('\n📊 API_METADATA table structure:');
            const newColumns = columns.filter(col => 
                col.name === 'ENDPOINT' || col.name === 'CONTENT_TYPE'
            );
            newColumns.forEach(col => {
                console.log(`   ✓ ${col.name} (${col.type})`);
            });
        }
        
        db.close((closeErr) => {
            if (closeErr) {
                console.error('❌ Error closing database:', closeErr.message);
            } else {
                console.log('\n✅ Database connection closed');
            }
        });
    });
});
