# =========================================================================
# API Knowledge Hub - Shared Database Configuration Script
# =========================================================================
# This script helps you configure the application to use a shared database
# Run this on each user's machine after setting up the shared database

param(
    [Parameter(Mandatory=$false)]
    [string]$SharedDatabasePath,
    
    [Parameter(Mandatory=$false)]
    [switch]$Help
)

$ErrorActionPreference = "Stop"

function Show-Help {
    Write-Host ""
    Write-Host "API Knowledge Hub - Shared Database Configuration" -ForegroundColor Cyan
    Write-Host "=" * 70
    Write-Host ""
    Write-Host "This script configures the application to use a shared database."
    Write-Host ""
    Write-Host "USAGE:" -ForegroundColor Yellow
    Write-Host "  .\configure-shared-db.ps1 -SharedDatabasePath <path>"
    Write-Host ""
    Write-Host "EXAMPLES:" -ForegroundColor Yellow
    Write-Host "  # Network share"
    Write-Host "  .\configure-shared-db.ps1 -SharedDatabasePath '\\server\share\APIDATA.db'"
    Write-Host ""
    Write-Host "  # Mapped drive"
    Write-Host "  .\configure-shared-db.ps1 -SharedDatabasePath 'Z:\APIDATA.db'"
    Write-Host ""
    Write-Host "  # Interactive mode (prompts for path)"
    Write-Host "  .\configure-shared-db.ps1"
    Write-Host ""
    Write-Host "OPTIONS:" -ForegroundColor Yellow
    Write-Host "  -Help    Show this help message"
    Write-Host ""
    exit 0
}

if ($Help) {
    Show-Help
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host " API Knowledge Hub - Shared Database Configuration" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Get current directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile = Join-Path $scriptDir ".env"
$envExampleFile = Join-Path $scriptDir ".env.example"

# Step 1: Get shared database path
if (-not $SharedDatabasePath) {
    Write-Host "📍 Enter the shared database path:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  \\YourServer\SharedFolder\APIDATA.db"
    Write-Host "  Z:\APIKnowledgeHub\APIDATA.db"
    Write-Host "  C:\Users\YourName\OneDrive - Company\Shared\APIDATA.db"
    Write-Host ""
    $SharedDatabasePath = Read-Host "Shared Database Path"
}

if ([string]::IsNullOrWhiteSpace($SharedDatabasePath)) {
    Write-Host "❌ No path provided. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔍 Validating configuration..." -ForegroundColor Cyan
Write-Host ""

# Step 2: Validate path format
Write-Host "1️⃣  Checking path format..." -NoNewline
if ($SharedDatabasePath -match '[\<\>\|"\*\?]') {
    Write-Host " ❌" -ForegroundColor Red
    Write-Host "   Error: Path contains invalid characters" -ForegroundColor Red
    exit 1
}
Write-Host " ✅" -ForegroundColor Green

# Step 3: Check if path is accessible
Write-Host "2️⃣  Checking path accessibility..." -NoNewline
$parentPath = Split-Path -Parent $SharedDatabasePath

if (Test-Path $parentPath) {
    Write-Host " ✅" -ForegroundColor Green
    
    # Check if database file exists
    if (Test-Path $SharedDatabasePath) {
        Write-Host "   ✅ Database file found" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Database file not found (will be created)" -ForegroundColor Yellow
    }
} else {
    Write-Host " ❌" -ForegroundColor Red
    Write-Host "   Error: Cannot access the path or parent folder" -ForegroundColor Red
    Write-Host "   Please verify:" -ForegroundColor Yellow
    Write-Host "   - Network connection is active"
    Write-Host "   - Server/share name is correct"
    Write-Host "   - You have permissions to access the folder"
    exit 1
}

# Step 4: Test write permissions
Write-Host "3️⃣  Testing write permissions..." -NoNewline
$testFile = Join-Path $parentPath ".test_$(Get-Random).tmp"
try {
    New-Item -ItemType File -Path $testFile -Force | Out-Null
    Remove-Item $testFile -Force
    Write-Host " ✅" -ForegroundColor Green
} catch {
    Write-Host " ❌" -ForegroundColor Red
    Write-Host "   Error: No write permission in shared folder" -ForegroundColor Red
    Write-Host "   Contact your administrator to grant write access" -ForegroundColor Yellow
    exit 1
}

# Step 5: Backup existing .env if it exists
if (Test-Path $envFile) {
    Write-Host "4️⃣  Backing up existing .env..." -NoNewline
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupFile = "$envFile.backup_$timestamp"
    Copy-Item $envFile $backupFile
    Write-Host " ✅" -ForegroundColor Green
    Write-Host "   Backup: $backupFile" -ForegroundColor Gray
} else {
    Write-Host "4️⃣  No existing .env file found" -ForegroundColor Gray
}

# Step 6: Create/Update .env file
Write-Host "5️⃣  Creating configuration file..." -NoNewline

$envContent = @"
# API Knowledge Hub - Environment Configuration
# Auto-generated by configure-shared-db.ps1 on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================

# Shared database path
DB_PATH=$SharedDatabasePath

# =============================================================================
# SERVER CONFIGURATION
# =============================================================================

PORT=3002
NODE_ENV=development

# =============================================================================
# DATABASE OPTIONS
# =============================================================================

# Enable WAL mode for better concurrent access (IMPORTANT for shared DB)
DB_WAL_MODE=true
DB_MODE=readwrite
DB_TIMEOUT=5000

# =============================================================================
# CORS & LOGGING
# =============================================================================

ALLOWED_ORIGINS=http://localhost:3001,http://127.0.0.1:3001
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=false
"@

Set-Content -Path $envFile -Value $envContent -Encoding UTF8
Write-Host " ✅" -ForegroundColor Green

# Step 7: Verify configuration
Write-Host "6️⃣  Verifying configuration..." -NoNewline
if (Test-Path $envFile) {
    $content = Get-Content $envFile -Raw
    if ($content -match "DB_PATH=$([regex]::Escape($SharedDatabasePath))") {
        Write-Host " ✅" -ForegroundColor Green
    } else {
        Write-Host " ⚠️" -ForegroundColor Yellow
        Write-Host "   Warning: Path verification failed" -ForegroundColor Yellow
    }
} else {
    Write-Host " ❌" -ForegroundColor Red
    Write-Host "   Error: Could not create .env file" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host " Configuration Complete! ✅" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Configuration Summary:" -ForegroundColor Cyan
Write-Host "   Shared Database: $SharedDatabasePath" -ForegroundColor White
Write-Host "   Config File: $envFile" -ForegroundColor White
Write-Host "   WAL Mode: Enabled (for concurrent access)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   1. Stop the backend server if it's running (Ctrl+C)"
Write-Host "   2. Start the backend server:"
Write-Host "      npm run server" -ForegroundColor Cyan
Write-Host ""
Write-Host "   3. Start the frontend (in another terminal):"
Write-Host "      npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "   4. Open browser: http://localhost:3001"
Write-Host ""
Write-Host "📊 Expected Output:" -ForegroundColor Yellow
Write-Host "   You should see:" 
Write-Host "   ✅ Loaded configuration from .env file"
Write-Host "   🌐 Using shared/network database - concurrent access enabled"
Write-Host "   ✅ Connected to SQLite database"
Write-Host "   📊 Database contains XX APIs"
Write-Host ""
Write-Host "📖 For more information, see SHARED_DATABASE_SETUP.md" -ForegroundColor Gray
Write-Host ""

# Offer to start servers
Write-Host "Would you like to start the backend server now? (Y/N): " -NoNewline -ForegroundColor Yellow
$response = Read-Host

if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host ""
    Write-Host "Starting backend server..." -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    # Change to script directory and start server
    Set-Location $scriptDir
    npm run server
}

Write-Host ""
Write-Host "Configuration saved successfully! 🎉" -ForegroundColor Green
Write-Host ""
