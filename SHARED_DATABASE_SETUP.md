# Shared Database Setup Guide

## Overview
This guide explains how to configure the API Knowledge Hub to use a shared/network database so all team members can access the same data.

---

## 🎯 Benefits of Shared Database

1. **Centralized Data** - Single source of truth for all API documentation
2. **Real-time Sync** - Everyone sees the same data instantly
3. **Collaborative** - Multiple users can add/update APIs
4. **Consistent** - No data synchronization issues
5. **Backup** - Easier to backup a single shared location

---

## 📋 Prerequisites

### Option 1: Windows Network Share (Recommended)
- Access to a shared network folder (e.g., `\\server\share`)
- Read/Write permissions to the shared folder
- Stable network connection

### Option 2: Mapped Network Drive
- Network drive mapped to a letter (e.g., `Z:\`)
- Read/Write permissions

### Option 3: Cloud Storage (OneDrive, Google Drive, Dropbox)
- Shared folder synced across team members
- Note: May have sync delays

---

## 🚀 Setup Instructions

### Step 1: Choose Shared Location

Pick one of these options based on your infrastructure:

#### Windows Network Share (Best for corporate environments)
```
\\YourServerName\SharedFolder\APIKnowledgeHub\APIDATA.db
```

#### Mapped Network Drive
```
Z:\APIKnowledgeHub\APIDATA.db
```

#### Cloud Storage (OneDrive example)
```
C:\Users\YourName\OneDrive - Company\Shared\APIKnowledgeHub\APIDATA.db
```

---

### Step 2: Copy Database to Shared Location

1. **Create the shared folder structure:**
   ```
   \\YourServer\SharedFolder\
   └── APIKnowledgeHub\
       ├── APIDATA.db
       └── backups\  (recommended for safety)
   ```

2. **Copy your current database:**
   ```powershell
   # From PowerShell
   $source = "C:\Users\gbs02099\OneDrive - Sella\Documents\2025\Hack\APIDATA.db"
   $destination = "\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db"
   Copy-Item $source $destination
   ```

3. **Verify the copy:**
   ```powershell
   # Check file exists and size matches
   Get-Item "\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db" | Select-Object FullName, Length
   ```

---

### Step 3: Configure Each User's Environment

Each team member needs to update their `.env` file:

1. **Navigate to project folder:**
   ```
   C:\Users\gbs02099\VSC Workspace\API_React\API_React\API\
   ```

2. **Edit the `.env` file:**
   ```ini
   # Update this line with your shared path
   DB_PATH=\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db
   
   # Keep other settings
   PORT=3002
   NODE_ENV=development
   DB_WAL_MODE=true
   DB_MODE=readwrite
   DB_TIMEOUT=5000
   ALLOWED_ORIGINS=http://localhost:3001,http://127.0.0.1:3001
   LOG_LEVEL=info
   ```

3. **Save the file**

---

### Step 4: Restart the Backend Server

1. **Stop the current server** (if running):
   ```powershell
   # Press Ctrl+C in the terminal running the server
   # Or use Task Manager to end node.exe process
   ```

2. **Start the server:**
   ```powershell
   npm run server
   ```

3. **Verify connection:**
   You should see:
   ```
   ✅ Loaded configuration from .env file
   🔧 Server Configuration:
     Database Path: \\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db
   🌐 Using shared/network database - concurrent access enabled
   ✅ Connected to SQLite database
   📊 Database contains 21 APIs
   ```

---

## 🔧 Configuration Options

### `.env` File Settings

```ini
# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================

# Network share (recommended for teams)
DB_PATH=\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db

# Mapped drive
# DB_PATH=Z:\APIKnowledgeHub\APIDATA.db

# OneDrive shared folder
# DB_PATH=C:\Users\YourName\OneDrive - Company\Shared\APIKnowledgeHub\APIDATA.db

# =============================================================================
# CONCURRENT ACCESS SETTINGS
# =============================================================================

# Enable WAL mode - IMPORTANT for shared database!
# This allows multiple users to read while one user writes
DB_WAL_MODE=true

# Connection timeout (milliseconds)
# Increase if experiencing timeout errors on slow networks
DB_TIMEOUT=5000

# Database mode (readwrite or readonly)
DB_MODE=readwrite

# =============================================================================
# SERVER SETTINGS
# =============================================================================

PORT=3002
NODE_ENV=development

# CORS origins (comma-separated, no spaces)
ALLOWED_ORIGINS=http://localhost:3001,http://127.0.0.1:3001

# Logging
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=false
```

---

## 🔒 Security & Permissions

### Required Permissions

Each user needs:
- ✅ Read permission (to view APIs)
- ✅ Write permission (to add/update APIs)
- ✅ Delete permission (to remove APIs)

### Setting Windows Share Permissions

1. Right-click shared folder → Properties → Sharing → Advanced Sharing
2. Click "Permissions"
3. Add your team/users with "Full Control" or "Change" permissions
4. Apply changes

### File Permissions

Ensure the database file has:
- Read/Write for all team members
- No "Read-only" attribute

---

## 📊 Testing the Setup

### Test 1: Verify Connection
```powershell
# Test backend connection
curl http://localhost:3002/api/health
```

Expected output:
```json
{
  "status": "healthy",
  "database": "connected",
  "apiCount": 21,
  "timestamp": "2025-11-05T..."
}
```

### Test 2: Check API Count
```powershell
$response = Invoke-RestMethod "http://localhost:3002/api/apis"
Write-Host "Total APIs: $($response.count)"
Write-Host "Source: $($response.source)"
```

### Test 3: Multi-User Test
1. Have User A add a new API
2. Have User B refresh their frontend (Ctrl+R)
3. User B should see the new API immediately

---

## 🐛 Troubleshooting

### Issue: "Database file not found"

**Solution:**
```powershell
# Verify path is accessible
Test-Path "\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db"
```

If False:
- Check server name is correct
- Verify shared folder exists
- Confirm network connection
- Try accessing via File Explorer first

---

### Issue: "Access Denied" or "Permission Denied"

**Solution:**
1. Check Windows share permissions
2. Verify you can create/edit files in the shared folder
3. Try accessing the folder in File Explorer
4. Contact IT admin if permissions needed

---

### Issue: "Database is locked"

**Solution:**
1. Ensure `DB_WAL_MODE=true` in `.env`
2. Close any other apps accessing the database (DB Browser, etc.)
3. Restart the backend server
4. Check if another user has exclusive lock

---

### Issue: Slow Performance

**Solution:**
1. Increase timeout: `DB_TIMEOUT=10000`
2. Check network speed to shared location
3. Consider VPN connection quality
4. Enable WAL mode if not already: `DB_WAL_MODE=true`

---

### Issue: "ETIMEDOUT" or Connection Timeout

**Solution:**
```ini
# Increase timeout in .env
DB_TIMEOUT=15000

# For very slow networks
DB_TIMEOUT=30000
```

---

## 📁 Recommended Folder Structure

```
\\YourServer\SharedFolder\APIKnowledgeHub\
│
├── APIDATA.db                    # Main database
├── APIDATA.db-shm                # WAL shared memory (auto-created)
├── APIDATA.db-wal                # WAL write-ahead log (auto-created)
│
├── backups\                      # Backup folder
│   ├── APIDATA_2025-11-05.db
│   ├── APIDATA_2025-11-04.db
│   └── ...
│
├── docs\                         # Documentation
│   ├── API_Standards.md
│   └── Usage_Guide.md
│
└── README.txt                    # Setup instructions
```

---

## 🔄 Backup Strategy

### Automated Daily Backup (PowerShell Script)

Create `backup-database.ps1`:

```powershell
# Backup script for shared database
$sourcePath = "\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db"
$backupFolder = "\\YourServer\SharedFolder\APIKnowledgeHub\backups"
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$backupPath = "$backupFolder\APIDATA_$timestamp.db"

# Create backup folder if not exists
if (!(Test-Path $backupFolder)) {
    New-Item -ItemType Directory -Path $backupFolder
}

# Copy database
Copy-Item $sourcePath $backupPath

# Keep only last 30 days of backups
Get-ChildItem $backupFolder -Filter "APIDATA_*.db" | 
    Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-30) } |
    Remove-Item

Write-Host "✅ Backup created: $backupPath"
```

Schedule this script using Windows Task Scheduler to run daily.

---

## 👥 Team Workflow

### Adding New APIs
1. User opens frontend at `http://localhost:3001`
2. Clicks "Add New API" button
3. Fills in API details
4. Saves to shared database
5. All other users see it immediately after refresh

### Updating APIs
1. Search/find the API to update
2. Click "Edit" button
3. Make changes
4. Save - updates shared database
5. Other users see changes after refresh

### Best Practices
- ✅ Communicate with team before bulk changes
- ✅ Use descriptive API names and categories
- ✅ Keep tags consistent across similar APIs
- ✅ Document dependencies accurately
- ✅ Test changes before saving

---

## 🎯 Migration Checklist

- [ ] Choose shared location
- [ ] Create shared folder structure
- [ ] Copy database to shared location
- [ ] Test access from your machine
- [ ] Update `.env` file with shared path
- [ ] Restart backend server
- [ ] Verify connection and API count
- [ ] Notify team members
- [ ] Provide them with shared path
- [ ] Help team members update their `.env` files
- [ ] Test multi-user access
- [ ] Set up backup script
- [ ] Document the setup for new team members

---

## 📞 Support

If you encounter issues:

1. Check the backend server console for error messages
2. Verify network connectivity to shared location
3. Confirm file permissions are correct
4. Review this guide's troubleshooting section
5. Contact your IT admin for network/permission issues

---

## 🌟 Success Indicators

You know it's working when:

✅ Multiple users can access the frontend simultaneously  
✅ Changes made by one user appear for others (after refresh)  
✅ Backend server shows "Using shared/network database"  
✅ No "database locked" errors during normal use  
✅ API count is consistent across all users  

---

**Congratulations! Your team now has a shared API Knowledge Hub! 🎉**
