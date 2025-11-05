# Quick Start: Shared Database Setup

## For Team Members - 5 Minute Setup

### Option 1: Automated Setup (Recommended)

1. **Get the shared database path from your team lead**
   Example: `\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db`

2. **Run the configuration script:**
   ```powershell
   .\configure-shared-db.ps1
   ```
   
3. **Enter the shared path when prompted**

4. **Start the servers:**
   ```powershell
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Open browser:** `http://localhost:3001`

✅ Done! You should see all 21+ APIs from the shared database.

---

### Option 2: Manual Setup (5 minutes)

1. **Create/Edit `.env` file** in project root

2. **Add this content:**
   ```ini
   DB_PATH=\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db
   PORT=3002
   NODE_ENV=development
   DB_WAL_MODE=true
   DB_MODE=readwrite
   DB_TIMEOUT=5000
   ALLOWED_ORIGINS=http://localhost:3001,http://127.0.0.1:3001
   LOG_LEVEL=info
   ```

3. **Replace** `\\YourServer\SharedFolder\...` with your actual shared path

4. **Save the file**

5. **Start servers:**
   ```powershell
   # Backend
   npm run server
   
   # Frontend (new terminal)
   npm run dev
   ```

6. **Verify:**
   Open `http://localhost:3001` - you should see the shared APIs

---

## ✅ Verification Checklist

When server starts, you should see:

```
✅ Loaded configuration from .env file
🔧 Server Configuration:
  Database Path: \\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db
🌐 Using shared/network database - concurrent access enabled
✅ Connected to SQLite database
📊 Database contains 21 APIs
```

In the browser, top-right should show:
- **"Using Database (21 APIs)"** ✅
- NOT "Using Static Data" ❌

---

## 🐛 Quick Troubleshooting

### Can't access shared path?
```powershell
# Test access
Test-Path "\\YourServer\SharedFolder\APIKnowledgeHub\APIDATA.db"
```

If False: Contact IT or team lead for access

### Database locked errors?
- Check `DB_WAL_MODE=true` in `.env`
- Restart backend server
- Ask others to close DB Browser if open

### Still see "Static Data"?
- Hard refresh browser: `Ctrl+Shift+R`
- Check backend console for errors
- Verify `.env` file exists with correct path

---

## 📞 Need Help?

1. Check `SHARED_DATABASE_SETUP.md` for detailed guide
2. Review backend server console for errors
3. Ask your team lead for the correct shared path
4. Verify network access to shared location

---

## 🎯 Pro Tips

- Keep backend server running while working
- Refresh browser after other users make changes
- Use consistent API naming conventions
- Communicate before making bulk changes
- Back up database before major updates

**Happy API documenting! 🚀**
