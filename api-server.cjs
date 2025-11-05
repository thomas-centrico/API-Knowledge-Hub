const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3002; // Backend API port
const DB_PATH = 'C:\\Users\\gbs02099\\OneDrive - Sella\\Documents\\2025\\Hack\\APIDATA.db';

// Middleware
app.use(cors());
app.use(express.json());

// Database connection  
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err.message);
        console.error('Database path attempted:', DB_PATH);
        process.exit(1);
    }
    console.log('✅ Connected to SQLite database');
    console.log('📊 Database path:', DB_PATH);
});

// Helper function to get API with all related data
function getAPIWithDetails(apiId, callback) {
    const query = `
        SELECT 
            am.*,
            GROUP_CONCAT(DISTINCT at.TAG) AS tags,
            au.REQUESTS_PER_DAY,
            au.ACTIVE_USERS
        FROM API_METADATA am
        LEFT JOIN API_TAGS at ON am.ID = at.API_ID
        LEFT JOIN API_USAGE au ON am.ID = au.API_ID
        WHERE am.ID = ?
        GROUP BY am.ID
    `;
    
    db.get(query, [apiId], (err, api) => {
        if (err) return callback(err, null);
        if (!api) return callback(null, null);
        
        // Get sample request
        db.get('SELECT * FROM API_SAMPLE_REQUESTS WHERE API_ID = ? LIMIT 1', [apiId], (reqErr, sampleReq) => {
            if (reqErr) console.error('Error fetching sample request:', reqErr);
            
            // Get sample response
            db.get('SELECT * FROM API_SAMPLE_RESPONSES WHERE API_ID = ? LIMIT 1', [apiId], (resErr, sampleRes) => {
                if (resErr) console.error('Error fetching sample response:', resErr);
                
                // Parse sample data
                let sampleRequest = {};
                let sampleResponse = {};
                
                try {
                    if (sampleReq && sampleReq.REQUEST_DATA) {
                        sampleRequest = JSON.parse(sampleReq.REQUEST_DATA);
                    }
                } catch (e) {
                    console.error('Error parsing sample request:', e);
                }
                
                try {
                    if (sampleRes && sampleRes.RESPONSE_DATA) {
                        sampleResponse = JSON.parse(sampleRes.RESPONSE_DATA);
                    }
                } catch (e) {
                    console.error('Error parsing sample response:', e);
                }
                
                // Transform database format to frontend format
                const transformedAPI = {
                    id: api.ID,
                    name: api.NAME,
                    type: api.TYPE,
                    category: api.CATEGORY || 'general',
                    status: api.STATUS || 'active',
                    description: api.DESCRIPTION || '',
                    tags: api.tags ? api.tags.split(',') : [],
                    owner: api.OWNER || 'Unknown',
                    department: api.DEPARTMENT || 'Unknown',
                    lastUpdated: api.LAST_UPDATED || new Date().toISOString(),
                    createdAt: api.CREATED_AT || new Date().toISOString(),
                    version: api.VERSION || 'v1.0.0',
                    documentation: {
                        url: api.DOC_URL || '',
                        hasInteractiveDocs: api.HAS_INTERACTIVE_DOCS === 'Y'
                    },
                    technical: {
                        baseUrl: api.BASE_URL || '',
                        endpoint: sampleReq?.ENDPOINT || '',
                        method: sampleReq?.HTTP_METHOD || api.METHOD_NAME || 'GET',
                        contentType: 'application/json',
                        authMethod: api.AUTH_METHOD || '',
                        rateLimit: api.RATE_LIMIT || '',
                        responseTime: api.RESPONSE_TIME || 0,
                        slaUptime: api.SLA_UPTIME || 99.9,
                        // Java API fields
                        packageName: api.PACKAGE_NAME || '',
                        className: api.CLASS_NAME || '',
                        interface: api.INTERFACE_NAME || '',
                        apiSignature: api.API_SIGNATURE || '',
                        // Oracle API fields
                        connectionString: api.CONNECTION_STRING || '',
                        schemaName: api.SCHEMA_NAME || '',
                        procedureName: api.PROCEDURE_NAME || ''
                    },
                    contact: {
                        email: api.CONTACT_EMAIL || '',
                        team: api.CONTACT_TEAM || '',
                        slackChannel: api.SLACK_CHANNEL || ''
                    },
                    usage: {
                        requestsPerDay: api.REQUESTS_PER_DAY || 0,
                        uniqueUsers: api.ACTIVE_USERS || 0
                    },
                    sampleRequest: sampleRequest,
                    sampleResponse: sampleResponse,
                    dependencies: [],
                    dependents: []
                };
                
                callback(null, transformedAPI);
            });
        });
    });
}

// Routes

// Get all APIs
app.get('/api/apis', (req, res) => {
    console.log('📡 GET /api/apis - Fetching all APIs from database');
    
    const query = `
        SELECT 
            am.*,
            GROUP_CONCAT(DISTINCT at.TAG) AS tags,
            au.REQUESTS_PER_DAY,
            au.ACTIVE_USERS
        FROM API_METADATA am
        LEFT JOIN API_TAGS at ON am.ID = at.API_ID
        LEFT JOIN API_USAGE au ON am.ID = au.API_ID
        GROUP BY am.ID
        ORDER BY am.TYPE, am.NAME
    `;
    
    db.all(query, (err, rows) => {
        if (err) {
            console.error('❌ Database error:', err.message);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        
        const apis = rows.map(api => ({
            id: api.ID,
            name: api.NAME,
            type: api.TYPE,
            category: api.CATEGORY || 'general',
            status: api.STATUS || 'active',
            description: api.DESCRIPTION || '',
            tags: api.tags ? api.tags.split(',') : [],
            owner: api.OWNER || 'Unknown',
            department: api.DEPARTMENT || 'Unknown',
            lastUpdated: api.LAST_UPDATED || new Date().toISOString(),
            createdAt: api.CREATED_AT || new Date().toISOString(),
            version: api.VERSION || 'v1.0.0',
            documentation: {
                url: api.DOC_URL || '',
                hasInteractiveDocs: api.HAS_INTERACTIVE_DOCS === 'Y'
            },
            technical: {
                baseUrl: api.BASE_URL || '',
                endpoint: '', // Will be loaded from sample request
                method: api.METHOD_NAME || 'GET',
                contentType: 'application/json',
                authMethod: api.AUTH_METHOD || '',
                rateLimit: api.RATE_LIMIT || '',
                responseTime: api.RESPONSE_TIME || 0,
                slaUptime: api.SLA_UPTIME || 99.9,
                // Java API fields
                packageName: api.PACKAGE_NAME || '',
                className: api.CLASS_NAME || '',
                interface: api.INTERFACE_NAME || '',
                apiSignature: api.API_SIGNATURE || '',
                // Oracle API fields
                connectionString: api.CONNECTION_STRING || '',
                schemaName: api.SCHEMA_NAME || '',
                procedureName: api.PROCEDURE_NAME || ''
            },
            contact: {
                email: api.CONTACT_EMAIL || '',
                team: api.CONTACT_TEAM || '',
                slackChannel: api.SLACK_CHANNEL || ''
            },
            usage: {
                requestsPerDay: api.REQUESTS_PER_DAY || 0,
                uniqueUsers: api.ACTIVE_USERS || 0
            }
        }));
        
        console.log(`✅ Returning ${apis.length} APIs from database`);
        res.json({
            success: true,
            source: 'database',
            count: apis.length,
            data: apis
        });
    });
});

// Get single API with full details
app.get('/api/apis/:id', (req, res) => {
    const apiId = req.params.id;
    console.log(`📡 GET /api/apis/${apiId} - Fetching API details`);
    
    getAPIWithDetails(apiId, (err, api) => {
        if (err) {
            console.error('❌ Database error:', err.message);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        
        if (!api) {
            return res.status(404).json({ error: 'API not found' });
        }
        
        console.log(`✅ Returning API details for ${apiId}`);
        res.json({
            success: true,
            source: 'database',
            data: api
        });
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    db.get('SELECT COUNT(*) as count FROM API_METADATA', (err, row) => {
        if (err) {
            return res.status(500).json({ 
                status: 'error', 
                database: 'disconnected',
                error: err.message 
            });
        }
        
        res.json({
            status: 'healthy',
            database: 'connected',
            apiCount: row.count,
            timestamp: new Date().toISOString()
        });
    });
});

// Data source comparison endpoint
app.get('/api/compare-sources', (req, res) => {
    db.get('SELECT COUNT(*) as dbCount FROM API_METADATA', (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        res.json({
            database: {
                count: row.dbCount,
                source: 'SQLite Database'
            },
            static: {
                count: 16, // Known from sampleData.js
                source: 'sampleData.js file'
            },
            recommendation: row.dbCount > 0 ? 
                'Use database for production data' : 
                'Populate database first'
        });
    });
});

// Add new API
app.post('/api/apis', (req, res) => {
    console.log('📡 POST /api/apis - Adding new API to database');
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
    
    const { 
        id, name, type, category, status, description, tags, owner, department, version, 
        documentation, technical, contact, usage, sampleRequest, sampleResponse 
    } = req.body;
    
    if (!id || !name || !type) {
        return res.status(400).json({ error: 'Missing required fields: id, name, type' });
    }
    
    const now = new Date().toISOString();
    
    // Extract technical fields based on API type
    const tech = technical || {};
    
    // Check if ENDPOINT and CONTENT_TYPE columns exist
    db.get("PRAGMA table_info(API_METADATA)", (pragmaErr) => {
        // Don't fail if pragma fails, just proceed with basic columns
    });
    
    // Insert API metadata with all fields
    const insertAPIQuery = `
        INSERT INTO API_METADATA (
            ID, NAME, TYPE, CATEGORY, STATUS, DESCRIPTION, OWNER, DEPARTMENT, 
            VERSION, DOC_URL, HAS_INTERACTIVE_DOCS, CREATED_AT, LAST_UPDATED,
            BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME,
            CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL,
            PACKAGE_NAME, CLASS_NAME, METHOD_NAME, INTERFACE_NAME, API_SIGNATURE,
            SCHEMA_NAME, PROCEDURE_NAME, CONNECTION_STRING
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(insertAPIQuery, [
        id, name, type, category || 'general', status || 'active', 
        description || '', owner || 'Unknown', department || 'Unknown',
        version || 'v1.0.0', 
        documentation?.url || '', 
        documentation?.hasInteractiveDocs ? 'Y' : 'N',
        now, now,
        // Technical fields (REST API)
        tech.baseUrl || '',
        tech.authMethod || '',
        tech.rateLimit || '',
        tech.slaUptime || 99.9,
        tech.responseTime || 0,
        // Contact fields
        contact?.email || '',
        contact?.team || '',
        contact?.slackChannel || '',
        // Java API fields
        tech.packageName || '',
        tech.className || '',
        tech.method || '',
        tech.interface || '',
        tech.apiSignature || '',
        // Oracle API fields
        tech.schemaName || '',
        tech.procedureName || '',
        tech.connectionString || ''
    ], function(err) {
        if (err) {
            console.error('❌ Error inserting API:', err.message);
            return res.status(500).json({ error: 'Failed to insert API', details: err.message });
        }
        
        // Insert tags if provided
        if (tags && tags.length > 0) {
            const insertTagsQuery = `INSERT INTO API_TAGS (API_ID, TAG) VALUES (?, ?)`;
            const tagArray = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : []);
            
            tagArray.forEach(tag => {
                if (tag.trim()) {
                    db.run(insertTagsQuery, [id, tag.trim()], (tagErr) => {
                        if (tagErr) {
                            console.error('❌ Error inserting tag:', tagErr.message);
                        }
                    });
                }
            });
        }
        
        // Insert sample request if provided
        if (sampleRequest && Object.keys(sampleRequest).length > 0) {
            const insertRequestQuery = `
                INSERT INTO API_SAMPLE_REQUESTS (
                    API_ID, REQUEST_NAME, REQUEST_DATA, HTTP_METHOD, ENDPOINT
                ) VALUES (?, ?, ?, ?, ?)
            `;
            db.run(insertRequestQuery, [
                id, 
                'Sample Request', 
                JSON.stringify(sampleRequest),
                tech.method || 'GET',
                tech.endpoint || ''
            ], (reqErr) => {
                if (reqErr) {
                    console.error('❌ Error inserting sample request:', reqErr.message);
                }
            });
        }
        
        // Insert sample response if provided
        if (sampleResponse && Object.keys(sampleResponse).length > 0) {
            const insertResponseQuery = `
                INSERT INTO API_SAMPLE_RESPONSES (
                    API_ID, RESPONSE_NAME, RESPONSE_DATA, STATUS_CODE
                ) VALUES (?, ?, ?, ?)
            `;
            db.run(insertResponseQuery, [
                id,
                'Sample Response',
                JSON.stringify(sampleResponse),
                200
            ], (resErr) => {
                if (resErr) {
                    console.error('❌ Error inserting sample response:', resErr.message);
                }
            });
        }
        
        // Insert usage data if provided
        if (usage) {
            const insertUsageQuery = `
                INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS) 
                VALUES (?, ?, ?)
            `;
            db.run(insertUsageQuery, [
                id,
                usage.requestsPerDay || 0,
                usage.uniqueUsers || 0
            ], (usageErr) => {
                if (usageErr) {
                    console.error('❌ Error inserting usage data:', usageErr.message);
                }
            });
        }
        
        console.log(`✅ Successfully added API: ${name} (${id})`);
        res.json({ success: true, message: 'API added successfully', id: id });
    });
});

// Update existing API
app.put('/api/apis/:id', (req, res) => {
    console.log(`📡 PUT /api/apis/${req.params.id} - Updating API in database`);
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
    
    const apiId = req.params.id;
    const { 
        name, type, category, status, description, tags, owner, department, version, 
        documentation, technical, contact, usage, sampleRequest, sampleResponse 
    } = req.body;
    
    if (!name || !type) {
        return res.status(400).json({ error: 'Missing required fields: name, type' });
    }
    
    const now = new Date().toISOString();
    const tech = technical || {};
    
    // Update API metadata with all fields
    const updateAPIQuery = `
        UPDATE API_METADATA SET 
            NAME = ?, TYPE = ?, CATEGORY = ?, STATUS = ?, DESCRIPTION = ?, 
            OWNER = ?, DEPARTMENT = ?, VERSION = ?, DOC_URL = ?, HAS_INTERACTIVE_DOCS = ?,
            LAST_UPDATED = ?,
            BASE_URL = ?, AUTH_METHOD = ?, RATE_LIMIT = ?, SLA_UPTIME = ?, RESPONSE_TIME = ?,
            CONTACT_EMAIL = ?, CONTACT_TEAM = ?, SLACK_CHANNEL = ?,
            PACKAGE_NAME = ?, CLASS_NAME = ?, METHOD_NAME = ?, INTERFACE_NAME = ?, API_SIGNATURE = ?,
            SCHEMA_NAME = ?, PROCEDURE_NAME = ?, CONNECTION_STRING = ?
        WHERE ID = ?
    `;
    
    db.run(updateAPIQuery, [
        name, type, category || 'general', status || 'active', 
        description || '', owner || 'Unknown', department || 'Unknown',
        version || 'v1.0.0', 
        documentation?.url || '', 
        documentation?.hasInteractiveDocs ? 'Y' : 'N',
        now,
        // Technical fields (REST API)
        tech.baseUrl || '',
        tech.authMethod || '',
        tech.rateLimit || '',
        tech.slaUptime || 99.9,
        tech.responseTime || 0,
        // Contact fields
        contact?.email || '',
        contact?.team || '',
        contact?.slackChannel || '',
        // Java API fields
        tech.packageName || '',
        tech.className || '',
        tech.method || '',
        tech.interface || '',
        tech.apiSignature || '',
        // Oracle API fields
        tech.schemaName || '',
        tech.procedureName || '',
        tech.connectionString || '',
        apiId
    ], function(err) {
        if (err) {
            console.error('❌ Error updating API:', err.message);
            return res.status(500).json({ error: 'Failed to update API', details: err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'API not found' });
        }
        
        // Delete existing tags and insert new ones
        db.run('DELETE FROM API_TAGS WHERE API_ID = ?', [apiId], (deleteErr) => {
            if (deleteErr) {
                console.error('❌ Error deleting old tags:', deleteErr.message);
            }
            
            // Insert new tags if provided
            if (tags && tags.length > 0) {
                const insertTagsQuery = `INSERT INTO API_TAGS (API_ID, TAG) VALUES (?, ?)`;
                const tagArray = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : []);
                
                tagArray.forEach(tag => {
                    if (tag.trim()) {
                        db.run(insertTagsQuery, [apiId, tag.trim()], (tagErr) => {
                            if (tagErr) {
                                console.error('❌ Error inserting tag:', tagErr.message);
                            }
                        });
                    }
                });
            }
        });
        
        // Delete and re-insert sample request
        db.run('DELETE FROM API_SAMPLE_REQUESTS WHERE API_ID = ?', [apiId], (delReqErr) => {
            if (delReqErr) {
                console.error('❌ Error deleting old sample request:', delReqErr.message);
            }
            
            if (sampleRequest && Object.keys(sampleRequest).length > 0) {
                const insertRequestQuery = `
                    INSERT INTO API_SAMPLE_REQUESTS (
                        API_ID, REQUEST_NAME, REQUEST_DATA, HTTP_METHOD, ENDPOINT
                    ) VALUES (?, ?, ?, ?, ?)
                `;
                db.run(insertRequestQuery, [
                    apiId, 
                    'Sample Request', 
                    JSON.stringify(sampleRequest),
                    tech.method || 'GET',
                    tech.endpoint || ''
                ], (reqErr) => {
                    if (reqErr) {
                        console.error('❌ Error inserting sample request:', reqErr.message);
                    }
                });
            }
        });
        
        // Delete and re-insert sample response
        db.run('DELETE FROM API_SAMPLE_RESPONSES WHERE API_ID = ?', [apiId], (delResErr) => {
            if (delResErr) {
                console.error('❌ Error deleting old sample response:', delResErr.message);
            }
            
            if (sampleResponse && Object.keys(sampleResponse).length > 0) {
                const insertResponseQuery = `
                    INSERT INTO API_SAMPLE_RESPONSES (
                        API_ID, RESPONSE_NAME, RESPONSE_DATA, STATUS_CODE
                    ) VALUES (?, ?, ?, ?)
                `;
                db.run(insertResponseQuery, [
                    apiId,
                    'Sample Response',
                    JSON.stringify(sampleResponse),
                    200
                ], (resErr) => {
                    if (resErr) {
                        console.error('❌ Error inserting sample response:', resErr.message);
                    }
                });
            }
        });
        
        // Update or insert usage data
        if (usage) {
            const upsertUsageQuery = `
                INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, LAST_UPDATED) 
                VALUES (?, ?, ?, ?)
                ON CONFLICT(API_ID) DO UPDATE SET
                    REQUESTS_PER_DAY = excluded.REQUESTS_PER_DAY,
                    ACTIVE_USERS = excluded.ACTIVE_USERS,
                    LAST_UPDATED = excluded.LAST_UPDATED
            `;
            db.run(upsertUsageQuery, [
                apiId,
                usage.requestsPerDay || 0,
                usage.uniqueUsers || 0,
                now
            ], (usageErr) => {
                if (usageErr) {
                    console.error('❌ Error updating usage data:', usageErr.message);
                }
            });
        }
        
        console.log(`✅ Successfully updated API: ${name} (${apiId})`);
        res.json({ success: true, message: 'API updated successfully', id: apiId });
    });
});

// Delete API
app.delete('/api/apis/:id', (req, res) => {
    console.log(`📡 DELETE /api/apis/${req.params.id} - Deleting API from database`);
    
    const apiId = req.params.id;
    
    // Delete tags first (foreign key constraint)
    db.run('DELETE FROM API_TAGS WHERE API_ID = ?', [apiId], (tagErr) => {
        if (tagErr) {
            console.error('❌ Error deleting API tags:', tagErr.message);
            return res.status(500).json({ error: 'Failed to delete API tags', details: tagErr.message });
        }
        
        // Delete API metadata
        db.run('DELETE FROM API_METADATA WHERE ID = ?', [apiId], function(err) {
            if (err) {
                console.error('❌ Error deleting API:', err.message);
                return res.status(500).json({ error: 'Failed to delete API', details: err.message });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({ error: 'API not found' });
            }
            
            console.log(`✅ Successfully deleted API: ${apiId}`);
            res.json({ success: true, message: 'API deleted successfully', id: apiId });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 API Server Started!');
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🗄️  Database: ${DB_PATH}`);
    console.log('\n📋 Available Endpoints:');
    console.log(`   GET http://localhost:${PORT}/api/health - Health check`);
    console.log(`   GET http://localhost:${PORT}/api/apis - Get all APIs`);
    console.log(`   GET http://localhost:${PORT}/api/apis/:id - Get specific API`);
    console.log(`   POST http://localhost:${PORT}/api/apis - Add new API`);
    console.log(`   PUT http://localhost:${PORT}/api/apis/:id - Update API`);
    console.log(`   DELETE http://localhost:${PORT}/api/apis/:id - Delete API`);
    console.log(`   GET http://localhost:${PORT}/api/compare-sources - Compare data sources`);
    console.log('\n💡 To test: Open http://localhost:3001 (your React app)');
    console.log('💡 Then update APIContext.jsx to use this API server');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down API server...');
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
        process.exit(0);
    });
});