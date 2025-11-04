# =============================================================================
# SQLite Database Setup Script for API Knowledge Hub (PowerShell)
# This script creates the SQLite database and populates it with sample data
# =============================================================================

Write-Host "Creating API Knowledge Hub SQLite Database..." -ForegroundColor Green
Write-Host ""

# Set the database path (shared drive)
$DB_PATH = "\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\api_knowledge_hub.db"
$CURRENT_DIR = Get-Location

Write-Host "Database will be created at: $DB_PATH" -ForegroundColor Yellow
Write-Host ""

# Check if SQLite is available
try {
    $sqliteVersion = sqlite3 --version 2>&1
    Write-Host "SQLite3 is available. Version: $sqliteVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: SQLite3 is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install SQLite3 and ensure it's in your system PATH" -ForegroundColor Red
    Write-Host "Download from: https://www.sqlite.org/download.html" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Ensure the directory exists
$dbDir = Split-Path $DB_PATH -Parent
if (!(Test-Path $dbDir)) {
    Write-Host "Creating directory: $dbDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $dbDir -Force | Out-Null
}

# Create the database and schema
Write-Host "Creating database schema..." -ForegroundColor Cyan
try {
    $schemaPath = Join-Path $CURRENT_DIR "create_schema.sql"
    Get-Content $schemaPath | sqlite3 $DB_PATH
    Write-Host "Schema created successfully." -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to create database schema" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Insert sample data
Write-Host "Inserting sample data..." -ForegroundColor Cyan
try {
    $dataPath = Join-Path $CURRENT_DIR "insert_data_complete.sql"
    Get-Content $dataPath | sqlite3 $DB_PATH
    Write-Host "Sample data inserted successfully." -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to insert sample data" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Verify the database
Write-Host "Verifying database creation..." -ForegroundColor Cyan
try {
    $verification = @"
SELECT 'API_METADATA' as TABLE_NAME, COUNT(*) as RECORD_COUNT FROM API_METADATA
UNION ALL
SELECT 'API_TAGS', COUNT(*) FROM API_TAGS
UNION ALL
SELECT 'API_DEPENDENCIES', COUNT(*) FROM API_DEPENDENCIES
UNION ALL
SELECT 'API_DEPENDENTS', COUNT(*) FROM API_DEPENDENTS
UNION ALL
SELECT 'API_USAGE', COUNT(*) FROM API_USAGE
UNION ALL
SELECT 'API_SAMPLE_REQUESTS', COUNT(*) FROM API_SAMPLE_REQUESTS
UNION ALL
SELECT 'API_SAMPLE_RESPONSES', COUNT(*) FROM API_SAMPLE_RESPONSES
UNION ALL
SELECT 'API_ENVIRONMENTS', COUNT(*) FROM API_ENVIRONMENTS
UNION ALL
SELECT 'API_SEARCH_INDEX', COUNT(*) FROM API_SEARCH_INDEX;
"@

    $results = $verification | sqlite3 $DB_PATH
    Write-Host ""
    Write-Host "Database Verification Results:" -ForegroundColor Yellow
    Write-Host "=============================" -ForegroundColor Yellow
    $results | ForEach-Object { Write-Host $_ -ForegroundColor White }
    
} catch {
    Write-Host "ERROR: Failed to verify database" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "=============================================================================" -ForegroundColor Green
Write-Host "Database setup completed successfully!" -ForegroundColor Green
Write-Host "Database location: $DB_PATH" -ForegroundColor Yellow
Write-Host ""
Write-Host "You can now use this database with your API Knowledge Hub application." -ForegroundColor White
Write-Host "Connection string: sqlite:///$DB_PATH" -ForegroundColor Cyan
Write-Host "=============================================================================" -ForegroundColor Green
Write-Host ""

# Test a sample query
Write-Host "Testing with a sample query..." -ForegroundColor Cyan
try {
    $sampleQuery = "SELECT NAME, TYPE, CATEGORY, STATUS FROM API_METADATA LIMIT 5;"
    $sampleResults = $sampleQuery | sqlite3 $DB_PATH
    Write-Host ""
    Write-Host "Sample APIs in Database:" -ForegroundColor Yellow
    Write-Host "======================" -ForegroundColor Yellow
    $sampleResults | ForEach-Object { Write-Host $_ -ForegroundColor White }
} catch {
    Write-Host "Warning: Could not execute sample query" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit"