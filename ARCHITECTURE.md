# SQLite Database Integration - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Browser                            │
│                     http://localhost:3001                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                     React Application                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Components: Header, SearchBar, APIGrid, KnowledgeGraph  │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                        │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │           APIContext (State Management)                   │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                        │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │        src/lib/database.js (API Client)                   │  │
│  │  - getAllAPIs()                                           │  │
│  │  - getAPIById(id)                                         │  │
│  │  - getAPIsByFilters(filters)                             │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                        │
│                         │ fetch('/api/apis')                     │
└─────────────────────────┼────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                    Vite Dev Server                                │
│                  (Port 3001)                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Proxy Configuration (vite.config.js)                       │ │
│  │  '/api/*' → 'http://localhost:3002'                        │ │
│  └────────────────────┬───────────────────────────────────────┘ │
└─────────────────────────┼───────────────────────────────────────┘
                          │ Forward requests
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                Express.js Backend Server                          │
│                    (Port 3002)                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  REST API Endpoints (server.js)                            │ │
│  │  - GET  /api/apis       (get all with filters)             │ │
│  │  - GET  /api/apis/:id   (get by ID)                        │ │
│  │  - GET  /api/stats      (statistics)                       │ │
│  │  - GET  /health         (health check)                     │ │
│  └────────────────────┬───────────────────────────────────────┘ │
│                       │                                           │
│  ┌────────────────────▼───────────────────────────────────────┐ │
│  │  Data Transformation Layer                                  │ │
│  │  - transformRow(row) → API object                          │ │
│  └────────────────────┬───────────────────────────────────────┘ │
│                       │                                           │
│  ┌────────────────────▼───────────────────────────────────────┐ │
│  │  better-sqlite3 Driver                                      │ │
│  │  - db.prepare(query)                                        │ │
│  │  - stmt.all() / stmt.get()                                 │ │
│  └────────────────────┬───────────────────────────────────────┘ │
└─────────────────────────┼───────────────────────────────────────┘
                          │ SQL Queries
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                    SQLite Database                                │
│                database/api_metadata.db                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Table: API_METADATA                                        │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  ID (PK)          │ NAME        │ TYPE                │  │ │
│  │  │  CATEGORY         │ STATUS      │ VERSION             │  │ │
│  │  │  DESCRIPTION      │ OWNER       │ DEPARTMENT          │  │ │
│  │  │  LAST_UPDATED     │ CREATED_AT  │ ENDPOINTS           │  │ │
│  │  │  BASE_URL         │ AUTH_METHOD │ RATE_LIMIT          │  │ │
│  │  │  SLA_UPTIME       │ RESPONSE_TIME│ DOC_URL            │  │ │
│  │  │  HAS_INTERACTIVE_DOCS │ CONTACT_EMAIL │ CONTACT_TEAM  │  │ │
│  │  │  SLACK_CHANNEL                                         │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Indexes: TYPE, CATEGORY, STATUS, DEPARTMENT, LAST_UPDATED       │
└───────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Page Load / Initial Data Fetch

```
User loads page
    ↓
React App initializes
    ↓
APIContext useEffect() triggers
    ↓
getAllAPIs() called
    ↓
fetch('/api/apis')
    ↓
Vite proxy forwards to http://localhost:3002/api/apis
    ↓
Express handler: app.get('/api/apis', ...)
    ↓
db.prepare('SELECT * FROM API_METADATA ...')
    ↓
stmt.all() executes query
    ↓
Transform rows: transformRow(row)
    ↓
res.json(apis) sends response
    ↓
Data received in frontend
    ↓
initializeSearch(apisData)
    ↓
dispatch({ type: 'SET_APIS', payload: apisData })
    ↓
UI re-renders with data
```

### 2. Search/Filter Operation

```
User enters search term or selects filter
    ↓
APIContext: setFilters() called
    ↓
useEffect() detects filter change
    ↓
searchAndFilter() processes data client-side
    ↓
dispatch({ type: 'SET_FILTERED_APIS', payload: result.apis })
    ↓
UI re-renders with filtered results
```

### 3. View Single API

```
User clicks on API card
    ↓
getAPIById(id) called
    ↓
fetch(`/api/apis/${id}`)
    ↓
Vite proxy forwards to http://localhost:3002/api/apis/:id
    ↓
Express handler: app.get('/api/apis/:id', ...)
    ↓
db.prepare('SELECT * FROM API_METADATA WHERE ID = ?')
    ↓
stmt.get(id) executes query
    ↓
transformRow(row)
    ↓
res.json(api) sends response
    ↓
UI displays API details
```

## Component Interaction

```
┌──────────────────────────────────────────────────────────────┐
│  App.jsx (Root Component)                                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  APIProvider (Context Provider)                         │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Header                                           │  │  │
│  │  │  - Navigation                                     │  │  │
│  │  │  - Branding                                       │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  SearchBar                                        │  │  │
│  │  │  - useAPI().searchAPIs()                         │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  FilterSidebar                                    │  │  │
│  │  │  - useAPI().setFilters()                         │  │  │
│  │  │  - Types, Categories, Status filters             │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  APIGrid (if viewMode === 'grid')                │  │  │
│  │  │  ┌──────────────────────────────────────────┐    │  │  │
│  │  │  │  APICard (for each API)                   │    │  │  │
│  │  │  │  - Display API metadata                   │    │  │  │
│  │  │  │  - Click to view details                  │    │  │  │
│  │  │  └──────────────────────────────────────────┘    │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  KnowledgeGraph (if viewMode === 'graph')        │  │  │
│  │  │  - D3.js visualization                           │  │  │
│  │  │  - Node and link interactions                    │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  All components access APIContext via useAPI() hook   │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## State Management

```
APIContext State:
{
  apis: [],              // All APIs from database
  filteredApis: [],      // Filtered based on searchFilters
  searchFilters: {       // Current filter state
    query: "",
    types: [],
    categories: [],
    statuses: [],
    tags: [],
    departments: []
  },
  viewMode: 'grid',      // 'grid' or 'graph'
  selectedAPI: null,     // Currently selected API
  detailViewAPI: null,   // API in detail view
  graphData: {           // Knowledge graph data
    nodes: [],
    links: []
  },
  loading: false,        // Loading state
  error: null            // Error message
}
```

## File Organization

```
API_React/API/
│
├── Frontend Files
│   ├── src/
│   │   ├── components/          # UI Components
│   │   │   ├── APICard.jsx
│   │   │   ├── APIGrid.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   └── KnowledgeGraph.jsx
│   │   │
│   │   ├── contexts/            # State Management
│   │   │   └── APIContext.jsx   # [MODIFIED] Uses database API
│   │   │
│   │   ├── lib/                 # Utilities
│   │   │   ├── database.js      # [NEW] Database API client
│   │   │   ├── search.js        # Search/filter logic
│   │   │   └── graph.js         # Graph utilities
│   │   │
│   │   ├── data/
│   │   │   └── sampleData.js    # [DEPRECATED] No longer used
│   │   │
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   │
│   └── vite.config.js           # [MODIFIED] Added proxy
│
├── Backend Files
│   ├── server.js                # [NEW] Express backend
│   │
│   └── database/
│       ├── api_metadata.db      # [CREATED BY init-db.js]
│       ├── setup.sql            # [NEW] Schema + sample data
│       └── init-db.js           # [NEW] DB initialization
│
├── Configuration
│   ├── package.json             # [MODIFIED] Added scripts & deps
│   └── .env.example             # [NEW] Environment variables
│
└── Documentation
    ├── README.md                # [MODIFIED] Updated instructions
    ├── QUICKSTART.md            # [NEW] Quick setup guide
    ├── DATABASE_SETUP.md        # [NEW] Detailed setup docs
    ├── IMPLEMENTATION_SUMMARY.md # [NEW] Technical summary
    └── ARCHITECTURE.md          # [NEW] This file
```

## Technology Stack Details

### Frontend Stack
```
React 18.2.0
  └── Component-based UI
  
Vite 4.4.5
  └── Development server with HMR
  └── Proxy to backend API
  
React Context API
  └── Global state management
  └── No Redux needed for this scale
  
Tailwind CSS 3.3.0
  └── Utility-first styling
  
Framer Motion 10.16.0
  └── Smooth animations
  
Lucide React 0.288.0
  └── Icon library
```

### Backend Stack
```
Express.js 4.18.0
  └── Lightweight web framework
  └── RESTful API endpoints
  └── Middleware support
  
better-sqlite3 9.0.0
  └── Synchronous SQLite3 bindings
  └── Fast and reliable
  └── No async overhead
  
cors 2.8.5
  └── Cross-Origin Resource Sharing
  └── Enable frontend-backend communication
```

### Development Tools
```
Nodemon 3.0.0
  └── Auto-restart backend on changes
  
ESLint 8.45.0
  └── Code quality and consistency
  
Vite Dev Server
  └── Hot Module Replacement (HMR)
  └── Fast refresh
```

## Security Considerations

### Current Setup (Development)
- ✅ CORS enabled for localhost
- ✅ Read-only database operations (mostly)
- ⚠️ No authentication required
- ⚠️ No rate limiting
- ⚠️ No input validation

### Production Recommendations
- [ ] Add authentication (JWT, OAuth)
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] Use HTTPS only
- [ ] Restrict CORS to specific domains
- [ ] Add API key requirement
- [ ] Implement request logging
- [ ] Add database backup strategy
- [ ] Use environment variables for secrets
- [ ] Add error monitoring (Sentry, etc.)

## Performance Optimization

### Database
- ✅ Indexes on frequently queried columns
- ✅ Synchronous queries (better-sqlite3)
- 🔄 Connection pooling (not needed for SQLite)
- 🔄 Query caching (future enhancement)

### Frontend
- ✅ Component-based architecture
- ✅ Context API for state (no prop drilling)
- ✅ Conditional rendering
- 🔄 Code splitting (future)
- 🔄 Lazy loading (future)

### Backend
- ✅ Express.js (lightweight)
- ✅ Direct database access (no ORM overhead)
- 🔄 Response caching (future)
- 🔄 Gzip compression (future)

## Scalability Considerations

### Current Limitations
- Single SQLite file (not for high concurrency)
- No horizontal scaling
- In-process database (same as backend)

### Migration Path
```
Current: SQLite
  ↓
  └── PostgreSQL (for multi-user)
      ↓
      └── Add Redis for caching
          ↓
          └── Microservices architecture
              ↓
              └── Container orchestration (K8s)
```

## Monitoring and Debugging

### Backend Monitoring
```bash
# Server logs
npm run server

# Health check
curl http://localhost:3002/health

# API stats
curl http://localhost:3002/api/stats
```

### Frontend Debugging
```
Browser DevTools:
  - Console: Check for errors
  - Network: Monitor API calls
  - React DevTools: Inspect component state
  - Redux DevTools: (not used, using Context)
```

### Database Inspection
```bash
# Use SQLite CLI
sqlite3 database/api_metadata.db

# Or use GUI tool
# - DB Browser for SQLite
# - SQLiteStudio
# - DataGrip
```

## Deployment Architecture

### Development
```
Localhost:3001 (Frontend)
Localhost:3002 (Backend + Database)
```

### Production Option 1: Single Server
```
Production Server
  ├── Nginx (Reverse Proxy)
  ├── Backend (Node.js + Express)
  │   └── SQLite Database
  └── Frontend (Static files served by Nginx)
```

### Production Option 2: Separated
```
CDN (Frontend static files)
  ↓
API Server (Backend)
  ↓
Database Server (PostgreSQL recommended)
```

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-10-31  
**Maintained By**: Development Team
