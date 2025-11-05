import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.DB_PATH || '\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\APIDATA.db';
const MIGRATION_FILE = path.join(__dirname, 'add_rest_api_columns.sql');

console.log('🔄 Running database migration to add REST API columns...\n');
console.log('📂 Database:', DB_PATH);
console.log('📄 Migration file:', MIGRATION_FILE);
console.log('═'.repeat(80));

try {
    // Read migration SQL
    const migrationSQL = fs.readFileSync(MIGRATION_FILE, 'utf8');
    
    // Connect to database
    const db = new Database(DB_PATH, { verbose: console.log });
    
    console.log('\n✅ Connected to database');
    
    // Check current schema
    console.log('\n📊 Checking current schema...');
    const columnsBefore = db.prepare('PRAGMA table_info(API_METADATA)').all();
    const existingColumns = columnsBefore.map(c => c.name);
    
    const columnsToAdd = ['ENDPOINT', 'METHOD', 'CONTENT_TYPE', 'SAMPLE_REQUEST_JSON', 'SAMPLE_RESPONSE_JSON'];
    const missingColumns = columnsToAdd.filter(col => !existingColumns.includes(col));
    
    if (missingColumns.length === 0) {
        console.log('✅ All required columns already exist!');
        console.log('\nExisting columns:', columnsToAdd.join(', '));
        db.close();
        process.exit(0);
    }
    
    console.log('\n❌ Missing columns:', missingColumns.join(', '));
    console.log('\n🔄 Applying migration...\n');
    
    // Execute migration - run each statement separately
    const statements = migrationSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s && !s.startsWith('--'));
    
    let statementsExecuted = 0;
    for (const statement of statements) {
        try {
            if (statement.toUpperCase().includes('ALTER TABLE') || 
                statement.toUpperCase().includes('CREATE INDEX')) {
                db.prepare(statement).run();
                statementsExecuted++;
                console.log(`✓ Executed: ${statement.substring(0, 60)}...`);
            } else if (statement.toUpperCase().includes('SELECT')) {
                const result = db.prepare(statement).get();
                console.log(`\n${result.status}\n`);
            }
        } catch (err) {
            // Ignore "duplicate column" errors - column already exists
            if (err.message.includes('duplicate column name')) {
                console.log(`⚠️  Column already exists: ${statement.substring(0, 60)}...`);
            } else {
                throw err;
            }
        }
    }
    
    console.log(`\n✅ Migration completed! Executed ${statementsExecuted} statements.`);
    
    // Verify columns were added
    console.log('\n📊 Verifying new schema...');
    const columnsAfter = db.prepare('PRAGMA table_info(API_METADATA)').all();
    const newColumns = columnsAfter.filter(c => columnsToAdd.includes(c.name));
    
    console.log('\n✓ Added columns:');
    newColumns.forEach(col => {
        console.log(`   - ${col.name} (${col.type})`);
    });
    
    // Test with a sample record
    console.log('\n🧪 Testing with a sample REST API record...');
    const sampleAPI = db.prepare("SELECT * FROM API_METADATA WHERE TYPE = 'REST_API' LIMIT 1").get();
    
    if (sampleAPI) {
        console.log(`\nFound API: ${sampleAPI.NAME} (${sampleAPI.ID})`);
        console.log('Current values for new columns:');
        console.log(`  ENDPOINT: ${sampleAPI.ENDPOINT || '(null)'}`);
        console.log(`  METHOD: ${sampleAPI.METHOD || '(null)'}`);
        console.log(`  CONTENT_TYPE: ${sampleAPI.CONTENT_TYPE || '(null)'}`);
        console.log(`  SAMPLE_REQUEST_JSON: ${sampleAPI.SAMPLE_REQUEST_JSON ? 'Set' : '(null)'}`);
        console.log(`  SAMPLE_RESPONSE_JSON: ${sampleAPI.SAMPLE_RESPONSE_JSON ? 'Set' : '(null)'}`);
    }
    
    db.close();
    console.log('\n✅ Database connection closed');
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Restart the backend server (node server.js)');
    console.log('   2. Test creating/updating APIs in the Admin Panel');
    console.log('   3. Verify data is being saved correctly');
    
} catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error.stack);
    process.exit(1);
}
