const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3003; // Different port from your React app
const DB_PATH = path.join(__dirname, 'database', 'local_api_knowledge_hub.db');

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to SQLite database');
});

// Helper function to get API with all related data
function getAPIWithDetails(apiId, callback) {
    const query = `
        SELECT 
            am.*,
            GROUP_CONCAT(DISTINCT at.TAG) AS tags,
            GROUP_CONCAT(DISTINCT ad.DEPENDENCY_NAME || ':' || ad.DEPENDENCY_TYPE) AS dependencies,
            GROUP_CONCAT(DISTINCT adt.DEPENDENT_NAME || ':' || adt.DEPENDENT_TYPE) AS dependents
        FROM API_METADATA am
        LEFT JOIN API_TAGS at ON am.ID = at.API_ID
        LEFT JOIN API_DEPENDENCIES ad ON am.ID = ad.API_ID
        LEFT JOIN API_DEPENDENTS adt ON am.ID = adt.API_ID
        WHERE am.ID = ?
        GROUP BY am.ID
    `;
    
    db.get(query, [apiId], (err, api) => {
        if (err) return callback(err, null);
        if (!api) return callback(null, null);
        
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
                url: api.DOCUMENTATION_URL || '',
                hasInteractiveDocs: false
            },
            endpoints: api.ENDPOINTS ? JSON.parse(api.ENDPOINTS) : [],
            authentication: api.AUTHENTICATION ? JSON.parse(api.AUTHENTICATION) : {},
            rateLimit: api.RATE_LIMIT ? JSON.parse(api.RATE_LIMIT) : {},
            dependencies: api.dependencies ? 
                api.dependencies.split(',').map(dep => {
                    const [name, type] = dep.split(':');
                    return { name, type, required: true };
                }) : [],
            dependents: api.dependents ?
                api.dependents.split(',').map(dep => {
                    const [name, type] = dep.split(':');
                    return { name, type };
                }) : []
        };
        
        callback(null, transformedAPI);
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
            ac.EMAIL as contact_email,
            ac.TEAM as contact_team,
            ac.SLACK_CHANNEL as contact_slack,
            ac.PHONE as contact_phone
        FROM API_METADATA am
        LEFT JOIN API_TAGS at ON am.ID = at.API_ID
        LEFT JOIN API_CONTACTS ac ON am.ID = ac.API_ID
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
                url: api.DOCUMENTATION_URL || '',
                hasInteractiveDocs: false
            },
            contact: {
                email: api.contact_email || '',
                team: api.contact_team || '',
                slackChannel: api.contact_slack || '',
                phone: api.contact_phone || ''
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
    
    const { id, name, type, category, status, description, tags, owner, department, version, documentation } = req.body;
    
    if (!id || !name || !type) {
        return res.status(400).json({ error: 'Missing required fields: id, name, type' });
    }
    
    const now = new Date().toISOString();
    
    // Insert API metadata
    const insertAPIQuery = `
        INSERT INTO API_METADATA (
            ID, NAME, TYPE, CATEGORY, STATUS, DESCRIPTION, OWNER, DEPARTMENT, 
            VERSION, DOCUMENTATION_URL, CREATED_AT, LAST_UPDATED
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(insertAPIQuery, [
        id, name, type, category || 'general', status || 'active', 
        description || '', owner || 'Unknown', department || 'Unknown',
        version || 'v1.0.0', documentation?.url || '', now, now
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
        
        console.log(`✅ Successfully added API: ${name} (${id})`);
        res.json({ success: true, message: 'API added successfully', id: id });
    });
});

// Update existing API
app.put('/api/apis/:id', (req, res) => {
    console.log(`📡 PUT /api/apis/${req.params.id} - Updating API in database`);
    
    const apiId = req.params.id;
    const { name, type, category, status, description, tags, owner, department, version, documentation } = req.body;
    
    if (!name || !type) {
        return res.status(400).json({ error: 'Missing required fields: name, type' });
    }
    
    const now = new Date().toISOString();
    
    // Update API metadata
    const updateAPIQuery = `
        UPDATE API_METADATA SET 
            NAME = ?, TYPE = ?, CATEGORY = ?, STATUS = ?, DESCRIPTION = ?, 
            OWNER = ?, DEPARTMENT = ?, VERSION = ?, DOCUMENTATION_URL = ?, LAST_UPDATED = ?
        WHERE ID = ?
    `;
    
    db.run(updateAPIQuery, [
        name, type, category || 'general', status || 'active', 
        description || '', owner || 'Unknown', department || 'Unknown',
        version || 'v1.0.0', documentation?.url || '', now, apiId
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