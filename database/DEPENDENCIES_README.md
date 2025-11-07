# API Dependencies Sample Data

This folder contains scripts to populate the `API_DEPENDENCIES` and `API_DEPENDENTS` tables with realistic dependency relationships between APIs in your database.

## Files

1. **insert_dependencies_sample.sql** - SQL script with ~120 dependency relationships and ~70 dependent relationships
2. **insert-dependencies.mjs** - Node.js script to execute the SQL file and show statistics

## Dependency Relationships Included

### AnticipoFatture (Invoice Financing)
- REST APIs depend on Java libraries, Oracle procedures, and common utilities
- Example: Invoice Submission API depends on Core Processing Engine and CRIF credit check

### Finanziamenti (Financing)
- Loan origination depends on credit assessment and document management
- Interest rate engine depends on amortization calculator
- Disbursement control depends on payment processing

### CreditiCommon (Common Services)
- Foundational APIs that many others depend on
- Core Processing Library is used by multiple business domains
- Utilities and Logger are widely used

### Platform Services
- Security Service used by most REST APIs
- Payment Processing used by financial APIs
- Notification Service used for alerts and confirmations

## How to Run

### Option 1: Using Node.js Script (Recommended)

```bash
cd database
node insert-dependencies.mjs
```

This will:
- Connect to your database using the DB_PATH from .env
- Execute all INSERT statements
- Show statistics about dependencies
- Display top APIs with most dependencies

### Option 2: Direct SQL Execution

You can also execute the SQL file directly using any SQLite client:

```bash
sqlite3 "path/to/APIDATA.db" < insert_dependencies_sample.sql
```

Or from Windows PowerShell:
```powershell
$dbPath = "\\nas3be\ITCrediti\DEV_Team_IND\Thomas\Hackathon_25\DB\APIDATA.db"
# Use SQLite command-line tool or database management tool
```

## Sample Relationships

### Most Depended Upon APIs (Top 5)
1. **oracle-001** (Core Database API) - 14 dependents
2. **java-001** (Logger) - 9 dependents  
3. **CREDITI_JAVA_002** (Utilities) - 8 dependents
4. **rest-004** (Notification Service) - 6 dependents
5. **rest-007** (Security Service) - 4 dependents

### APIs with Most Dependencies (Top 5)
1. **FINANZ_REST_001** (Loan Origination) - 4 dependencies
2. **AF_REST_002** (Credit Assessment) - 3 dependencies
3. **AF_REST_003** (Funding Management) - 3 dependencies
4. **rest-005** (E-commerce API) - 3 dependencies

## Understanding the Relationships

### API_DEPENDENCIES Table
Stores which APIs a given API depends on:
- `API_ID`: The API that has dependencies
- `DEPENDS_ON`: The API it depends on

Example: `AF_REST_001` (Invoice Submission) depends on `AF_JAVA_001` (Core Processing)

### API_DEPENDENTS Table  
Stores which APIs depend on a given API (reverse relationship):
- `API_ID`: The API that others depend on
- `DEPENDENT`: An API that depends on it

Example: `oracle-001` (Core Database) has `rest-001` (User Management) as a dependent

## Knowledge Graph Visualization

After inserting this data, you can visualize the dependencies in the Knowledge Graph view:

1. Navigate to the Knowledge Graph tab in your application
2. Enable the "Dependencies" checkbox in the Display Options
3. Red solid lines show direct dependencies (API depends on another)
4. Green solid lines show usage relationships (API is used by another)

## Clearing Existing Data

If you want to start fresh, uncomment these lines at the top of `insert_dependencies_sample.sql`:

```sql
DELETE FROM API_DEPENDENCIES;
DELETE FROM API_DEPENDENTS;
```

## Customization

You can add your own dependencies by adding INSERT statements:

```sql
-- API_X depends on API_Y
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) 
VALUES ('API_X_ID', 'API_Y_ID');

-- API_Y has API_X as a dependent
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) 
VALUES ('API_Y_ID', 'API_X_ID');
```

## Statistics

The sample data includes:
- **~120 dependency relationships** across all API types
- **~70 dependent relationships** (reverse mappings)
- Covers REST APIs, Java APIs, and Oracle APIs
- Realistic dependencies based on typical microservices architecture

## Notes

- The script handles duplicate entries gracefully (UNIQUE constraint)
- Dependencies are designed to be realistic based on API functionality
- Core/utility APIs have many dependents (widely used)
- Business APIs have multiple dependencies (compose functionality)
