# Quick Start Guide: SQLite Database Integration

This is a quick reference for setting up and running the application with SQLite database.

## 🚀 Quick Setup (5 Steps)

### 1. Install Dependencies

```powershell
npm install
```

If you encounter network timeouts, try:
```powershell
npm install --timeout=60000
```

### 2. Initialize Database

Create and populate the SQLite database:

```powershell
npm run db:init
```

This creates `database/api_metadata.db` with sample data.

### 3. Start Backend Server

In Terminal 1:
```powershell
npm run server
```

You should see:
```
🚀 Backend API server running on http://localhost:3002
✅ Connected to SQLite database
```

### 4. Start Frontend Server

In Terminal 2:
```powershell
npm run dev
```

### 5. Open Application

Navigate to: http://localhost:3001

## 📋 Quick Commands

| Command | Description |
|---------|-------------|
| `npm run db:init` | Initialize/reset database |
| `npm run server` | Start backend API server |
| `npm run server:dev` | Start backend with auto-reload |
| `npm run dev` | Start frontend dev server |
| `npm run build` | Build for production |

## ✅ Verify Setup

### Check Backend
Open: http://localhost:3002/health

Should return:
```json
{"status": "OK", "database": "connected"}
```

### Check Data
Open: http://localhost:3002/api/apis

Should return array of API objects.

### Check Frontend
Open: http://localhost:3001

Should display API cards with data from database.

## 📁 File Structure

```
API_React/API/
├── database/
│   ├── api_metadata.db          # SQLite database (created by init-db.js)
│   ├── setup.sql                # SQL schema and sample data
│   └── init-db.js               # Database initialization script
├── src/
│   ├── contexts/
│   │   └── APIContext.jsx       # Updated to fetch from database
│   └── lib/
│       └── database.js          # Database utility functions
├── server.js                     # Express backend API server
├── vite.config.js               # Includes proxy config
└── package.json                 # Updated with new scripts
```

## 🔧 Configuration

### Database Location
Default: `database/api_metadata.db`

To change, update in `server.js`:
```javascript
const DB_PATH = path.join(__dirname, 'path/to/your/database.db');
```

### Server Ports
- **Backend**: Port 3002 (change in `server.js`)
- **Frontend**: Port 3001 (change in `vite.config.js`)

## 🐛 Common Issues

### Issue: "Cannot find module 'better-sqlite3'"

**Solution:**
```powershell
npm install better-sqlite3 --save
```

### Issue: "Database file not found"

**Solution:**
```powershell
npm run db:init
```

### Issue: Frontend shows no data

**Solutions:**
1. Check backend is running: http://localhost:3002/health
2. Check browser console for errors
3. Verify database has data: http://localhost:3002/api/apis

### Issue: Port already in use

**Solution:**
Find and kill the process:
```powershell
# Find process on port 3002
netstat -ano | findstr :3002

# Kill process (replace PID)
taskkill /PID <PID> /F
```

## 📊 Database Schema

The `API_METADATA` table contains:

```sql
CREATE TABLE API_METADATA (
    ID TEXT PRIMARY KEY,
    NAME TEXT,
    TYPE TEXT,                    -- 'REST_API', 'JAVA_API', 'ORACLE_API'
    CATEGORY TEXT,
    STATUS TEXT,                  -- 'Active', 'Beta', 'Deprecated'
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

## 🔌 API Endpoints

### Get All APIs
```
GET http://localhost:3002/api/apis
```

### Filter APIs
```
GET http://localhost:3002/api/apis?type=REST_API
GET http://localhost:3002/api/apis?status=Active
GET http://localhost:3002/api/apis?search=payment
```

### Get Single API
```
GET http://localhost:3002/api/apis/:id
```

### Get Statistics
```
GET http://localhost:3002/api/stats
```

## 📚 Additional Documentation

For detailed information, see:
- **DATABASE_SETUP.md** - Comprehensive setup guide
- **database/setup.sql** - Database schema and sample data
- **server.js** - Backend API implementation
- **src/lib/database.js** - Database utility functions

## 🎯 Next Steps

1. ✅ Customize sample data in `database/setup.sql`
2. ✅ Run `npm run db:init` to reload database
3. ✅ Add your own API records
4. ✅ Modify frontend components as needed
5. ✅ Deploy to production (see DATABASE_SETUP.md)

## 💡 Development Tips

- Use `npm run server:dev` for backend hot-reload during development
- The frontend automatically reloads on changes
- Check browser DevTools Network tab to debug API calls
- Use SQLite GUI tools to inspect database (e.g., DB Browser for SQLite)

## 🔗 Useful Links

- Backend API: http://localhost:3002
- Frontend App: http://localhost:3001
- Health Check: http://localhost:3002/health
- API Stats: http://localhost:3002/api/stats

---

Need help? Check DATABASE_SETUP.md for detailed troubleshooting.
