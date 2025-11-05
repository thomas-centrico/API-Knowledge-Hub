// Backend API Server for SQLite Database Access
// This Express server provides REST API endpoints for the React frontend

import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables from .env file if it exists
function loadEnvFile() {
  const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        if (key && !process.env[key]) {
          process.env[key] = value;
        }
      }
    });
    console.log('✅ Loaded configuration from .env file');
  }
}

loadEnvFile();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Configuration
const config = {
  dbPath: process.env.DB_PATH || 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db',
  dbMode: process.env.DB_MODE || 'readwrite',
  walMode: process.env.DB_WAL_MODE === 'true',
  timeout: parseInt(process.env.DB_TIMEOUT || '5000'),
  logLevel: process.env.LOG_LEVEL || 'info',
  enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING === 'true',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001']
};

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (config.allowedOrigins.indexOf(origin) !== -1 || config.allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
if (config.enableRequestLogging) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Database connection
const DB_PATH = config.dbPath;
let db;

console.log('🔧 Server Configuration:');
console.log('  Port:', PORT);
console.log('  Database Path:', DB_PATH);
console.log('  Database Mode:', config.dbMode);
console.log('  WAL Mode:', config.walMode);
console.log('  Timeout:', config.timeout + 'ms');
console.log('  Log Level:', config.logLevel);
console.log('  Allowed Origins:', config.allowedOrigins.join(', '));

// Check if database file exists
if (!fs.existsSync(DB_PATH)) {
  console.error('❌ Database file not found:', DB_PATH);
  console.error('Please ensure the database exists or update DB_PATH in .env file');
  process.exit(1);
}

try {
  // Initialize database connection
  const readonly = config.dbMode === 'readonly';
  db = new Database(DB_PATH, { 
    readonly: readonly,
    timeout: config.timeout,
    verbose: config.logLevel === 'debug' ? console.log : null
  });
  
  // Enable WAL mode for better concurrent access (recommended for shared databases)
  if (config.walMode && !readonly) {
    db.pragma('journal_mode = WAL');
    console.log('✅ WAL mode enabled for better concurrent access');
  }
  
  // Set busy timeout for handling locked database
  db.pragma(`busy_timeout = ${config.timeout}`);
  
  // Verify database connection
  const testQuery = db.prepare('SELECT COUNT(*) as count FROM API_METADATA').get();
  
  console.log('✅ Connected to SQLite database');
  console.log(`📊 Database contains ${testQuery.count} APIs`);
  
  // Check if it's a network path
  const isNetworkPath = DB_PATH.startsWith('\\\\') || DB_PATH.startsWith('//');
  if (isNetworkPath) {
    console.log('🌐 Using shared/network database - concurrent access enabled');
  }
  
} catch (error) {
  console.error('❌ Failed to connect to database:', error);
  console.error('Database path attempted:', DB_PATH);
  console.error('\nTroubleshooting:');
  console.error('  1. Check if the database file exists');
  console.error('  2. Verify you have read/write permissions');
  console.error('  3. For network paths, ensure the share is accessible');
  console.error('  4. Check your .env file configuration');
  process.exit(1);
}

/**
 * Transform database row to API format
 */
function transformRow(row) {
  if (!row) return null;
  
  const api = {
    id: row.ID,
    name: row.NAME,
    type: row.TYPE,
    category: row.CATEGORY || 'Uncategorized',
    status: row.STATUS,
    version: row.VERSION,
    description: row.DESCRIPTION,
    owner: row.OWNER,
    department: row.DEPARTMENT,
    lastUpdated: row.LAST_UPDATED,
    createdAt: row.CREATED_AT,
    // Documentation
    documentation: {
      url: row.DOC_URL || '',
      hasInteractiveDocs: row.HAS_INTERACTIVE_DOCS === 'true' || row.HAS_INTERACTIVE_DOCS === '1',
    },
    // Contact
    contact: {
      email: row.CONTACT_EMAIL || '',
      team: row.CONTACT_TEAM || '',
      slackChannel: row.SLACK_CHANNEL || '',
    },
    // Technical details - base fields
    technical: {
      baseUrl: row.BASE_URL || '',
      authMethod: row.AUTH_METHOD || '',
      rateLimit: row.RATE_LIMIT || '',
      slaUptime: row.SLA_UPTIME || 99.9,
      responseTime: row.RESPONSE_TIME || 0,
    },
    // Sample data - use appropriate columns based on API type
    sampleRequest: (row.TYPE === 'ORACLE_API' || row.TYPE === 'JAVA_API')
      ? (row.SAMPLE_CALL_TEXT || '')
      : (row.SAMPLE_REQUEST_JSON ? JSON.parse(row.SAMPLE_REQUEST_JSON) : {}),
    sampleResponse: (row.TYPE === 'ORACLE_API' || row.TYPE === 'JAVA_API')
      ? (row.SAMPLE_RESULT_TEXT || '')
      : (row.SAMPLE_RESPONSE_JSON ? JSON.parse(row.SAMPLE_RESPONSE_JSON) : {}),
    // Add missing fields required by frontend
    tags: [],
    dependencies: [],
    dependents: [],
    usage: {
      requestsPerDay: 0,
      uniqueUsers: 0,
    },
  };
  
  // Add type-specific technical fields
  if (row.TYPE === 'REST_API') {
    api.technical.endpoint = row.ENDPOINT || '';
    api.technical.method = row.METHOD || 'GET';
    api.technical.contentType = row.CONTENT_TYPE || 'application/json';
  } else if (row.TYPE === 'JAVA_API') {
    api.technical.packageName = row.PACKAGE_NAME || '';
    api.technical.className = row.CLASS_NAME || '';
    api.technical.methodName = row.METHOD_NAME || '';
    api.technical.interfaceName = row.INTERFACE_NAME || '';
    api.technical.apiSignature = row.API_SIGNATURE || '';
  }
  // Note: ORACLE_API specific columns not in current schema
  
  return api;
}

/**
 * GET /api/apis - Get all APIs with optional filters
 */
app.get('/api/apis', (req, res) => {
  try {
    console.log('📡 GET /api/apis - Fetching all APIs from database');
    console.log('Database object:', db ? 'Connected' : 'Not connected');
    
    const { type, category, status, search } = req.query;
    
    let query = 'SELECT * FROM API_METADATA WHERE 1=1';
    const params = [];
    
    if (type) {
      query += ' AND TYPE = ?';
      params.push(type);
    }
    
    if (category) {
      query += ' AND CATEGORY = ?';
      params.push(category);
    }
    
    if (status) {
      query += ' AND STATUS = ?';
      params.push(status);
    }
    
    if (search) {
      query += ' AND (NAME LIKE ? OR DESCRIPTION LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY LAST_UPDATED DESC';
    
    console.log('Executing query:', query);
    console.log('With params:', params);
    
    const stmt = db.prepare(query);
    console.log('Statement prepared successfully');
    
    const rows = stmt.all(...params);
    console.log('Rows fetched:', rows.length);
    
    const apis = rows.map(transformRow);
    console.log('APIs transformed:', apis.length);
    
    console.log(`✅ Returning ${apis.length} APIs from database`);
    res.json({
      success: true,
      source: 'database',
      count: apis.length,
      data: apis
    });
  } catch (error) {
    console.error('❌ Error fetching APIs:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch APIs', 
      message: error.message,
      stack: error.stack
    });
  }
});

/**
 * GET /api/apis/:id - Get a single API by ID
 */
app.get('/api/apis/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('SELECT * FROM API_METADATA WHERE ID = ?');
    const row = stmt.get(id);
    
    if (!row) {
      return res.status(404).json({ error: 'API not found' });
    }
    
    const api = transformRow(row);
    res.json(api);
  } catch (error) {
    console.error('Error fetching API:', error);
    res.status(500).json({ error: 'Failed to fetch API', message: error.message });
  }
});

/**
 * GET /api/stats - Get database statistics
 */
app.get('/api/stats', (req, res) => {
  try {
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM API_METADATA');
    const total = totalStmt.get().count;
    
    const typeStmt = db.prepare('SELECT TYPE, COUNT(*) as count FROM API_METADATA GROUP BY TYPE');
    const byType = typeStmt.all();
    
    const categoryStmt = db.prepare('SELECT CATEGORY, COUNT(*) as count FROM API_METADATA GROUP BY CATEGORY');
    const byCategory = categoryStmt.all();
    
    const statusStmt = db.prepare('SELECT STATUS, COUNT(*) as count FROM API_METADATA GROUP BY STATUS');
    const byStatus = statusStmt.all();
    
    res.json({
      total,
      byType,
      byCategory,
      byStatus,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats', message: error.message });
  }
});

/**
 * POST /api/apis - Create a new API
 */
app.post('/api/apis', (req, res) => {
  try {
    const apiData = req.body;
    
    // Validate required fields
    if (!apiData.id || !apiData.name || !apiData.type) {
      return res.status(400).json({ error: 'Missing required fields: id, name, type' });
    }
    
    // Check if API already exists
    const existingStmt = db.prepare('SELECT ID FROM API_METADATA WHERE ID = ?');
    if (existingStmt.get(apiData.id)) {
      return res.status(409).json({ error: 'API with this ID already exists' });
    }
    
    // Insert API - Build dynamic query based on API type
    const technical = apiData.technical || {};
    const documentation = apiData.documentation || {};
    const contact = apiData.contact || {};
    
    let insertQuery = `
      INSERT INTO API_METADATA (
        ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION,
        OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT,
        BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME,
        DOC_URL, HAS_INTERACTIVE_DOCS,
        CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL`;
    
    let params = [
      apiData.id,
      apiData.name,
      apiData.type,
      apiData.category || 'integration',
      apiData.status || 'active',
      apiData.version || 'v1.0.0',
      apiData.description || '',
      apiData.owner || '',
      apiData.department || '',
      apiData.lastUpdated || new Date().toISOString(),
      apiData.createdAt || new Date().toISOString(),
      technical.baseUrl || '',
      technical.authMethod || '',
      technical.rateLimit || '',
      technical.slaUptime || 99.9,
      technical.responseTime || 0,
      documentation.url || '',
      documentation.hasInteractiveDocs ? 'true' : 'false',
      contact.email || '',
      contact.team || '',
      contact.slackChannel || ''
    ];
    
    // Add sample data columns based on API type
    if (apiData.type === 'ORACLE_API' || apiData.type === 'JAVA_API') {
      insertQuery += `,
        SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT`;
      params.push(
        typeof apiData.sampleRequest === 'string' ? apiData.sampleRequest : JSON.stringify(apiData.sampleRequest || ''),
        typeof apiData.sampleResponse === 'string' ? apiData.sampleResponse : JSON.stringify(apiData.sampleResponse || '')
      );
    } else {
      insertQuery += `,
        SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON`;
      params.push(
        apiData.sampleRequest ? JSON.stringify(apiData.sampleRequest) : null,
        apiData.sampleResponse ? JSON.stringify(apiData.sampleResponse) : null
      );
    }
    
    // Add type-specific fields
    if (apiData.type === 'REST_API') {
      insertQuery += `,
        ENDPOINT, METHOD, CONTENT_TYPE`;
      params.push(
        technical.endpoint || '',
        technical.method || 'GET',
        technical.contentType || 'application/json'
      );
    } else if (apiData.type === 'JAVA_API') {
      insertQuery += `,
        PACKAGE_NAME, CLASS_NAME, METHOD_NAME, INTERFACE_NAME, API_SIGNATURE`;
      params.push(
        technical.packageName || '',
        technical.className || '',
        technical.methodName || '',
        technical.interfaceName || '',
        technical.apiSignature || ''
      );
    }
    
    // Close the INSERT query with placeholders
    insertQuery += `) VALUES (${params.map(() => '?').join(', ')})`;
    
    // Note: ORACLE_API specific columns not in schema
    
    const insertStmt = db.prepare(insertQuery);
    insertStmt.run(...params);
    
    // Insert tags
    if (apiData.tags && apiData.tags.length > 0) {
      const tagStmt = db.prepare('INSERT OR IGNORE INTO API_TAGS (API_ID, TAG) VALUES (?, ?)');
      for (const tag of apiData.tags) {
        tagStmt.run(apiData.id, tag);
      }
    }
    
    // Insert dependencies
    if (apiData.dependencies && apiData.dependencies.length > 0) {
      const depStmt = db.prepare('INSERT OR IGNORE INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES (?, ?)');
      for (const dep of apiData.dependencies) {
        depStmt.run(apiData.id, dep);
      }
    }
    
    // Insert dependents
    if (apiData.dependents && apiData.dependents.length > 0) {
      const depStmt = db.prepare('INSERT OR IGNORE INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES (?, ?)');
      for (const dep of apiData.dependents) {
        depStmt.run(apiData.id, dep);
      }
    }
    
    // Insert usage statistics
    const usageStmt = db.prepare(`
      INSERT OR REPLACE INTO API_USAGE (API_ID, REQUESTS_PER_DAY, UNIQUE_USERS)
      VALUES (?, ?, ?)
    `);
    usageStmt.run(
      apiData.id,
      apiData.usage?.requestsPerDay || 0,
      apiData.usage?.uniqueUsers || 0
    );
    
    console.log(`✅ Created API: ${apiData.id}`);
    res.status(201).json({ success: true, id: apiData.id, message: 'API created successfully' });
  } catch (error) {
    console.error('Error creating API:', error);
    res.status(500).json({ error: 'Failed to create API', message: error.message });
  }
});

/**
 * PUT /api/apis/:id - Update an existing API
 */
app.put('/api/apis/:id', (req, res) => {
  try {
    const { id } = req.params;
    const apiData = req.body;
    
    console.log('📥 PUT /api/apis/' + id + ' - Received data:');
    console.log('  Type:', apiData.type);
    console.log('  Technical:', JSON.stringify(apiData.technical, null, 2));
    console.log('  Has sampleRequest:', !!apiData.sampleRequest);
    console.log('  Has sampleResponse:', !!apiData.sampleResponse);
    
    // Check if API exists
    const existingStmt = db.prepare('SELECT ID FROM API_METADATA WHERE ID = ?');
    if (!existingStmt.get(id)) {
      return res.status(404).json({ error: 'API not found' });
    }
    
    // Update API - Build dynamic query based on API type
    const technical = apiData.technical || {};
    const documentation = apiData.documentation || {};
    const contact = apiData.contact || {};
    
    let updateQuery = `
      UPDATE API_METADATA SET
        NAME = ?,
        TYPE = ?,
        CATEGORY = ?,
        STATUS = ?,
        VERSION = ?,
        DESCRIPTION = ?,
        OWNER = ?,
        DEPARTMENT = ?,
        LAST_UPDATED = ?,
        BASE_URL = ?,
        AUTH_METHOD = ?,
        RATE_LIMIT = ?,
        SLA_UPTIME = ?,
        RESPONSE_TIME = ?,
        DOC_URL = ?,
        HAS_INTERACTIVE_DOCS = ?,
        CONTACT_EMAIL = ?,
        CONTACT_TEAM = ?,
        SLACK_CHANNEL = ?`;
    
    let params = [
      apiData.name,
      apiData.type,
      apiData.category,
      apiData.status,
      apiData.version,
      apiData.description,
      apiData.owner,
      apiData.department,
      new Date().toISOString(),
      technical.baseUrl || '',
      technical.authMethod || '',
      technical.rateLimit || '',
      technical.slaUptime || 99.9,
      technical.responseTime || 0,
      documentation.url || '',
      documentation.hasInteractiveDocs ? 'true' : 'false',
      contact.email || '',
      contact.team || '',
      contact.slackChannel || ''
    ];
    
    // Add sample data based on API type
    if (apiData.type === 'ORACLE_API' || apiData.type === 'JAVA_API') {
      // Oracle and Java APIs use plain text columns
      updateQuery += `,
        SAMPLE_CALL_TEXT = ?,
        SAMPLE_RESULT_TEXT = ?,
        SAMPLE_REQUEST_JSON = NULL,
        SAMPLE_RESPONSE_JSON = NULL`;
      params.push(
        typeof apiData.sampleRequest === 'string' ? apiData.sampleRequest : JSON.stringify(apiData.sampleRequest || ''),
        typeof apiData.sampleResponse === 'string' ? apiData.sampleResponse : JSON.stringify(apiData.sampleResponse || '')
      );
    } else {
      // REST APIs use JSON columns
      updateQuery += `,
        SAMPLE_REQUEST_JSON = ?,
        SAMPLE_RESPONSE_JSON = ?,
        SAMPLE_CALL_TEXT = NULL,
        SAMPLE_RESULT_TEXT = NULL`;
      params.push(
        apiData.sampleRequest ? JSON.stringify(apiData.sampleRequest) : null,
        apiData.sampleResponse ? JSON.stringify(apiData.sampleResponse) : null
      );
    }
    
    // Add type-specific fields
    if (apiData.type === 'REST_API') {
      updateQuery += `,
        ENDPOINT = ?,
        METHOD = ?,
        CONTENT_TYPE = ?`;
      params.push(
        technical.endpoint || '',
        technical.method || 'GET',
        technical.contentType || 'application/json'
      );
    } else if (apiData.type === 'JAVA_API') {
      updateQuery += `,
        PACKAGE_NAME = ?,
        CLASS_NAME = ?,
        METHOD_NAME = ?,
        INTERFACE_NAME = ?,
        API_SIGNATURE = ?`;
      params.push(
        technical.packageName || '',
        technical.className || '',
        technical.methodName || '',
        technical.interfaceName || '',
        technical.apiSignature || ''
      );
    }
    // Note: ORACLE_API specific columns not in schema
    
    updateQuery += ' WHERE ID = ?';
    params.push(id);
    
    console.log('💾 Executing UPDATE with params:');
    console.log('  ENDPOINT:', technical.endpoint);
    console.log('  METHOD:', technical.method);
    console.log('  CONTENT_TYPE:', technical.contentType);
    console.log('  SAMPLE_REQUEST_JSON length:', apiData.sampleRequest ? JSON.stringify(apiData.sampleRequest).length : 0);
    console.log('  SAMPLE_RESPONSE_JSON length:', apiData.sampleResponse ? JSON.stringify(apiData.sampleResponse).length : 0);
    
    const updateStmt = db.prepare(updateQuery);
    updateStmt.run(...params);
    
    // Update tags - delete old and insert new
    db.prepare('DELETE FROM API_TAGS WHERE API_ID = ?').run(id);
    if (apiData.tags && apiData.tags.length > 0) {
      const tagStmt = db.prepare('INSERT INTO API_TAGS (API_ID, TAG) VALUES (?, ?)');
      for (const tag of apiData.tags) {
        tagStmt.run(id, tag);
      }
    }
    
    // Update dependencies
    db.prepare('DELETE FROM API_DEPENDENCIES WHERE API_ID = ?').run(id);
    if (apiData.dependencies && apiData.dependencies.length > 0) {
      const depStmt = db.prepare('INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES (?, ?)');
      for (const dep of apiData.dependencies) {
        depStmt.run(id, dep);
      }
    }
    
    // Update dependents
    db.prepare('DELETE FROM API_DEPENDENTS WHERE API_ID = ?').run(id);
    if (apiData.dependents && apiData.dependents.length > 0) {
      const depStmt = db.prepare('INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES (?, ?)');
      for (const dep of apiData.dependents) {
        depStmt.run(id, dep);
      }
    }
    
    // Update usage statistics
    const usageStmt = db.prepare(`
      INSERT OR REPLACE INTO API_USAGE (API_ID, REQUESTS_PER_DAY, UNIQUE_USERS)
      VALUES (?, ?, ?)
    `);
    usageStmt.run(
      id,
      apiData.usage?.requestsPerDay || 0,
      apiData.usage?.uniqueUsers || 0
    );
    
    console.log(`✅ Updated API: ${id}`);
    res.json({ success: true, id, message: 'API updated successfully' });
  } catch (error) {
    console.error('Error updating API:', error);
    res.status(500).json({ error: 'Failed to update API', message: error.message });
  }
});

/**
 * DELETE /api/apis/:id - Delete an API
 */
app.delete('/api/apis/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if API exists
    const existingStmt = db.prepare('SELECT ID FROM API_METADATA WHERE ID = ?');
    if (!existingStmt.get(id)) {
      return res.status(404).json({ error: 'API not found' });
    }
    
    // Delete from all tables
    db.prepare('DELETE FROM API_TAGS WHERE API_ID = ?').run(id);
    db.prepare('DELETE FROM API_DEPENDENCIES WHERE API_ID = ?').run(id);
    db.prepare('DELETE FROM API_DEPENDENTS WHERE API_ID = ?').run(id);
    db.prepare('DELETE FROM API_USAGE WHERE API_ID = ?').run(id);
    db.prepare('DELETE FROM API_METADATA WHERE ID = ?').run(id);
    
    console.log(`✅ Deleted API: ${id}`);
    res.json({ success: true, id, message: 'API deleted successfully' });
  } catch (error) {
    console.error('Error deleting API:', error);
    res.status(500).json({ error: 'Failed to delete API', message: error.message });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  try {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM API_METADATA');
    const row = stmt.get();
    
    res.json({
      status: 'healthy',
      database: 'connected',
      apiCount: row.count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nClosing database connection...');
  db.close();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend API server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${DB_PATH}`);
  console.log(`📡 API endpoints:`);
  console.log(`   GET    /api/apis - Get all APIs`);
  console.log(`   GET    /api/apis/:id - Get API by ID`);
  console.log(`   POST   /api/apis - Create new API`);
  console.log(`   PUT    /api/apis/:id - Update API`);
  console.log(`   DELETE /api/apis/:id - Delete API`);
  console.log(`   GET    /api/stats - Get statistics`);
  console.log(`   GET    /api/health - Health check`);
});
