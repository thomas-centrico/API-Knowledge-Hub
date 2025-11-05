@echo off
REM =============================================================================
REM SQLite Database Setup Script for API Knowledge Hub
REM This script creates the SQLite database and populates it with sample data
REM =============================================================================

echo Creating API Knowledge Hub SQLite Database...
echo.

REM Set the database path (shared drive)
set DB_PATH=\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\api_knowledge_hub.db

echo Database will be created at: %DB_PATH%
echo.

REM Check if SQLite is available
sqlite3 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: SQLite3 is not installed or not in PATH
    echo Please install SQLite3 and ensure it's in your system PATH
    echo Download from: https://www.sqlite.org/download.html
    pause
    exit /b 1
)

echo SQLite3 is available. Creating database...
echo.

REM Create the database and schema
echo Creating database schema...
sqlite3 "%DB_PATH%" < "create_schema.sql"
if %errorlevel% neq 0 (
    echo ERROR: Failed to create database schema
    pause
    exit /b 1
)

echo Schema created successfully.
echo.

REM Insert sample data
echo Inserting sample data...
sqlite3 "%DB_PATH%" < "insert_data_complete.sql"
if %errorlevel% neq 0 (
    echo ERROR: Failed to insert sample data
    pause
    exit /b 1
)

echo Sample data inserted successfully.
echo.

REM Verify the database
echo Verifying database creation...
sqlite3 "%DB_PATH%" "SELECT COUNT(*) as 'Total APIs' FROM API_METADATA; SELECT COUNT(*) as 'Total Tags' FROM API_TAGS; SELECT COUNT(*) as 'Total Usage Records' FROM API_USAGE;"

echo.
echo =============================================================================
echo Database setup completed successfully!
echo Database location: %DB_PATH%
echo.
echo You can now use this database with your API Knowledge Hub application.
echo Connection string: sqlite:///%DB_PATH%
echo =============================================================================
echo.

pause