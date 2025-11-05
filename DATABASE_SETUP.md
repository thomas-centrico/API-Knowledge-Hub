# Database Setup Guide

This guide explains how to set up and use the SQLite database connection for the API Reference Knowledge Graph Platform.

## Architecture

The application uses a **client-server architecture** for database access:
- **Frontend**: React application running on Vite dev server (port 3001)
- **Backend**: Express.js API server with SQLite connection (port 3002)
- **Database**: SQLite database file (`api_metadata.db`)

This architecture is necessary because React runs in the browser and cannot directly access SQLite databases. The backend API server acts as a bridge between the React frontend and the SQLite database.

## Prerequisites

1. Node.js installed (v14 or higher)
2. SQLite database file with the `API_METADATA` table
3. Network connectivity for npm package installation

## Installation Steps

### 1. Install Dependencies

Due to network issues, you may need to install packages manually or configure proxy settings:

```powershell
# Try installing with timeout increase
npm install --timeout=60000

# Or install individual packages
npm install better-sqlite3 express cors nodemon
```

If you encounter network timeouts, configure npm proxy:
```powershell
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port
```

### 2. Create Database File

Ensure your SQLite database file is located at:
```
database/api_metadata.db
```

The database should contain the `API_METADATA` table with the following schema:

```sql
CREATE TABLE API_METADATA (
    ID TEXT PRIMARY KEY,
    NAME TEXT,
    TYPE TEXT,
    CATEGORY TEXT,
    STATUS TEXT,
    VERSION TEXT,
    DESCRIPTION TEXT,
    OWNER TEXT,
    DEPARTMENT TEXT,
    LAST_UPDATED TEXT,
    CREATED_AT TEXT,
    ENDPOINTS INTEGER,
    BASE_URL TEXT,
    AUTH_METHOD TEXT,
    RATE_LIMIT TEXT,
    SLA_UPTIME REAL,
    RESPONSE_TIME INTEGER,
    DOC_URL TEXT,
    HAS_INTERACTIVE_DOCS TEXT,
    CONTACT_EMAIL TEXT,
    CONTACT_TEAM TEXT,
    SLACK_CHANNEL TEXT
);
```

### 3. Populate Database (Optional)

If you need to insert sample data, use the provided SQL script:
```sql
-- See database/insert_scripts.sql for examples
```

## Running the Application

### Option 1: Run Both Servers Separately (Recommended)

**Terminal 1 - Backend Server:**
```powershell
npm run server
```

**Terminal 2 - Frontend Development Server:**
```powershell
npm run dev
```

### Option 2: Development Mode with Auto-Reload

For backend development with automatic restart on changes:

**Terminal 1 - Backend with Nodemon:**
```powershell
npm run server:dev
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

## Verifying the Setup

### 1. Check Backend Server

Open browser and navigate to:
```
http://localhost:3002/health
```

Expected response:
```json
{
  "status": "OK",
  "database": "connected"
}
```

### 2. Check API Endpoints

**Get all APIs:**
```
http://localhost:3002/api/apis
```

**Get API by ID:**
```
http://localhost:3002/api/apis/rest-1
```

**Get statistics:**
```
http://localhost:3002/api/stats
```

### 3. Check Frontend

The frontend should automatically connect through the proxy configuration:
```
http://localhost:3001
```

The React app will make requests to `/api/apis` which Vite will proxy to `http://localhost:3002/api/apis`

## API Endpoints

The backend server provides the following REST API endpoints:

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/api/apis` | Get all APIs | `type`, `category`, `status`, `search` |
| GET | `/api/apis/:id` | Get single API | - |
| GET | `/api/stats` | Get statistics | - |
| GET | `/health` | Health check | - |

### Example Queries

**Filter by type:**
```
http://localhost:3002/api/apis?type=REST_API
```

**Filter by category:**
```
http://localhost:3002/api/apis?category=Integration
```

**Search APIs:**
```
http://localhost:3002/api/apis?search=payment
```

**Multiple filters:**
```
http://localhost:3002/api/apis?type=REST_API&status=Active&search=user
```

## Configuration

### Database Path

Update the database path in `server.js` if needed:
```javascript
const DB_PATH = path.join(__dirname, '../database/api_metadata.db');
```

### Server Port

Change the backend server port in `server.js`:
```javascript
const PORT = process.env.PORT || 3002;
```

And update the proxy configuration in `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3002',
    // ...
  }
}
```

## Troubleshooting

### Issue: Network timeout during npm install

**Solution:**
1. Configure npm proxy settings
2. Increase timeout: `npm install --timeout=60000`
3. Download and install packages manually

### Issue: Database file not found

**Solution:**
1. Check the database file exists at the specified path
2. Update `DB_PATH` in `server.js` to the correct location
3. Ensure proper file permissions

### Issue: Backend server won't start

**Solution:**
1. Check if port 3002 is already in use
2. Ensure `better-sqlite3` is installed correctly
3. Verify database file is accessible
4. Check Node.js version compatibility

### Issue: Frontend can't connect to backend

**Solution:**
1. Ensure backend server is running on port 3002
2. Check Vite proxy configuration in `vite.config.js`
3. Verify no firewall blocking localhost connections
4. Check browser console for CORS errors

### Issue: Empty data or errors in frontend

**Solution:**
1. Verify backend API returns data: `http://localhost:3002/api/apis`
2. Check browser console for error messages
3. Ensure database has records
4. Check network tab in browser DevTools

## Data Flow

```
User Browser (http://localhost:3001)
    ↓
React App (Frontend)
    ↓
Fetch Request to /api/apis
    ↓
Vite Proxy (configured in vite.config.js)
    ↓
Express Server (http://localhost:3002)
    ↓
better-sqlite3 Driver
    ↓
SQLite Database (database/api_metadata.db)
    ↓
API_METADATA Table
```

## Development Notes

- The frontend uses React Context (`APIContext`) to manage API data
- All database queries are performed server-side for security
- The backend transforms database rows to match the frontend's expected format
- Vite's proxy feature eliminates CORS issues during development

## Production Deployment

For production deployment:

1. Build the frontend:
```powershell
npm run build
```

2. Serve static files from the backend:
```javascript
// Add to server.js
app.use(express.static('dist'));
```

3. Use environment variables for configuration:
```javascript
const DB_PATH = process.env.DB_PATH || './database/api_metadata.db';
const PORT = process.env.PORT || 3002;
```

4. Consider using PM2 or similar for process management:
```powershell
npm install -g pm2
pm2 start server.js
```

## Additional Resources

- [better-sqlite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- [Express.js Guide](https://expressjs.com/)
- [Vite Proxy Configuration](https://vitejs.dev/config/server-options.html#server-proxy)
