# API Knowledge Hub Database Setup

This directory contains all the necessary files to create and populate the SQLite database for the API Knowledge Hub project.

## 📁 Database Location
The database is created at the shared drive location:
```
\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\api_knowledge_hub.db
```

## 📋 Files Overview

### Schema and Data Files
- **`create_schema.sql`** - Complete database schema with tables, indexes, views, and triggers
- **`insert_data_complete.sql`** - Sample data insertion scripts based on sampleData.js
- **`insert_scripts.sql`** - Legacy insert script (replaced by insert_data_complete.sql)

### Setup Scripts
- **`setup_database.bat`** - Windows batch script for database setup
- **`setup_database.ps1`** - PowerShell script for database setup
- **`setup_database.js`** - Node.js script for programmatic database setup
- **`package.json`** - Node.js dependencies for database scripts

### Documentation
- **`README.md`** - This file

## 🗃️ Database Schema

The database consists of the following main tables:

### Core Tables
1. **`API_METADATA`** - Core API information (REST, Java, Oracle APIs)
2. **`API_TAGS`** - Tags for categorization and search
3. **`API_DEPENDENCIES`** - API dependency relationships
4. **`API_DEPENDENTS`** - Reverse dependency tracking
5. **`API_USAGE`** - Usage statistics and metrics

### Additional Tables
6. **`API_SAMPLE_REQUESTS`** - Sample request examples
7. **`API_SAMPLE_RESPONSES`** - Sample response examples
8. **`API_ENVIRONMENTS`** - Environment-specific configurations
9. **`API_VERSIONS`** - Version history tracking
10. **`API_SEARCH_INDEX`** - Full-text search support

### Views
- **`v_api_complete`** - Comprehensive API view with all related data
- **`v_popular_apis`** - Popular APIs ordered by usage
- **`v_dependency_graph`** - Dependency relationships view

## 🚀 Setup Instructions

### Prerequisites
- SQLite3 must be installed and available in your system PATH
- For Node.js setup: Node.js and npm must be installed

### Option 1: Using PowerShell (Recommended)
```powershell
cd "c:\Users\gbs03954\IdeaProjects\API-Knowledge-Hub\database"
.\setup_database.ps1
```

### Option 2: Using Command Prompt
```cmd
cd "c:\Users\gbs03954\IdeaProjects\API-Knowledge-Hub\database"
setup_database.bat
```

### Option 3: Using Node.js
```bash
cd "c:\Users\gbs03954\IdeaProjects\API-Knowledge-Hub\database"
npm install
node setup_database.js
```

### Option 4: Manual Setup
```sql
-- Connect to SQLite and run:
sqlite3 "\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\api_knowledge_hub.db"

-- Then execute:
.read create_schema.sql
.read insert_data_complete.sql
.exit
```

## 📊 Sample Data

The database is populated with sample APIs including:

### REST APIs (7 APIs)
- notificaFirmaModulo (ITCREDITI authentication API)
- Payment Processing API
- Analytics Dashboard API
- Notification Service API
- E-commerce API (Beta)
- File Storage API (Deprecated)
- Security Service API

### Java APIs (4 APIs)
- getListaOneriUsura (Business rules engine)
- Data Processing Engine
- Cryptography Library
- Message Queue Handler

### Oracle APIs (3 APIs)
- WEBLOGIC_DBA.CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK
- Data Warehouse API
- Legacy ERP Integration (Deprecated)

## 🔍 Database Verification

After setup, you can verify the database with these queries:

### Check Record Counts
```sql
SELECT 'API_METADATA' as TABLE_NAME, COUNT(*) as RECORD_COUNT FROM API_METADATA
UNION ALL
SELECT 'API_TAGS', COUNT(*) FROM API_TAGS
UNION ALL
SELECT 'API_USAGE', COUNT(*) FROM API_USAGE;
```

### View All APIs
```sql
SELECT NAME, TYPE, CATEGORY, STATUS, OWNER FROM API_METADATA ORDER BY TYPE, NAME;
```

### Top APIs by Usage
```sql
SELECT 
    am.NAME,
    am.TYPE,
    au.REQUESTS_PER_DAY,
    au.ACTIVE_USERS
FROM API_METADATA am
JOIN API_USAGE au ON am.ID = au.API_ID
ORDER BY au.REQUESTS_PER_DAY DESC
LIMIT 10;
```

## 🔗 Connection Information

### Connection String for Applications
```
sqlite:///\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\api_knowledge_hub.db
```

### Node.js Connection Example
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('\\\\nas3be\\ITCrediti\\DEV_Team_IND\\Thomas\\Hackathon_25\\DB\\api_knowledge_hub.db');
```

### Python Connection Example
```python
import sqlite3
conn = sqlite3.connect(r'\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\api_knowledge_hub.db')
```

## 🛠️ Troubleshooting

### Common Issues

1. **SQLite not found**
   - Download SQLite from: https://www.sqlite.org/download.html
   - Add to system PATH

2. **Network path not accessible**
   - Ensure you have access to the shared drive
   - Check network connectivity
   - Verify path format: `\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\`

3. **Permission errors**
   - Ensure you have write permissions to the shared drive
   - Run as administrator if necessary

4. **Database locked**
   - Close any existing database connections
   - Check if another application is using the database

### Testing the Setup
```bash
# Using Node.js
node setup_database.js test

# Using SQLite directly
sqlite3 "\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\api_knowledge_hub.db" "SELECT COUNT(*) FROM API_METADATA;"
```

## 📈 Database Statistics

After successful setup, the database contains:
- **16 APIs** (7 REST, 4 Java, 3 Oracle, 2 additional)
- **~60 Tags** for categorization
- **~15 Dependencies** relationships
- **~25 Usage records** with metrics
- **~15 Sample requests/responses**
- **Multiple environment configurations**

## 🔄 Updating the Database

To update the database with new APIs or schema changes:

1. Modify the relevant SQL files
2. Re-run the setup script
3. The script will handle existing data appropriately

## 📞 Support

For issues or questions regarding the database setup, contact:
- **Team**: API Knowledge Hub Development Team
- **Location**: Database files in project repository under `/database/`