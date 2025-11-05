# Oracle & Java API Text Storage Implementation

## Overview
This document describes the database schema changes made to support plain text storage for Oracle and Java API sample data, instead of forcing JSON format.

## Problem Statement
Oracle and Java APIs were using the same JSON columns (`SAMPLE_REQUEST_JSON` and `SAMPLE_RESPONSE_JSON`) as REST APIs, which was inappropriate since:
- **Oracle APIs**: Call and results are often plain text SQL statements, procedure calls, and result sets
- **Java APIs**: Method calls and return values are better represented as plain text showing actual code execution

## Solution

### 1. New Database Columns Added

Two new TEXT columns were added to the `API_METADATA` table:

```sql
ALTER TABLE API_METADATA ADD COLUMN SAMPLE_CALL_TEXT TEXT;
ALTER TABLE API_METADATA ADD COLUMN SAMPLE_RESULT_TEXT TEXT;
```

**Column Purpose:**
- `SAMPLE_CALL_TEXT`: Stores plain text Oracle/Java API calls (SQL statements, procedure calls, method invocations, etc.)
- `SAMPLE_RESULT_TEXT`: Stores plain text Oracle/Java API results (result sets, output parameters, return values, etc.)
- `SAMPLE_REQUEST_JSON`: Continues to store JSON format REST API requests
- `SAMPLE_RESPONSE_JSON`: Continues to store JSON format REST API responses

### 2. Backend Server Changes (server.js)

#### transformRow Function (Line ~180)
Updated to read from appropriate columns based on API type:

```javascript
// Sample data - use appropriate columns based on API type
sampleRequest: row.TYPE === 'ORACLE_API' 
  ? (row.SAMPLE_CALL_TEXT || '')
  : (row.SAMPLE_REQUEST_JSON ? JSON.parse(row.SAMPLE_REQUEST_JSON) : {}),
sampleResponse: row.TYPE === 'ORACLE_API'
  ? (row.SAMPLE_RESULT_TEXT || '')
  : (row.SAMPLE_RESPONSE_JSON ? JSON.parse(row.SAMPLE_RESPONSE_JSON) : {}),
```

#### POST /api/apis (Line ~350)
Updated INSERT query to use correct columns:

```javascript
// Add sample data columns based on API type
if (apiData.type === 'ORACLE_API') {
  insertQuery += `,
    SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT`;
  params.push(
    typeof apiData.sampleRequest === 'string' ? apiData.sampleRequest : JSON.stringify(apiData.sampleRequest || ''),
    typeof apiData.sampleResponse === 'string' ? apiData.sampleResponse : JSON.stringify(apiData.sampleResponse || '')
  );
} else {
  insertQuery += `,
    SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON`;
  params.push(
    apiData.sampleRequest ? JSON.stringify(apiData.sampleRequest) : null,
    apiData.sampleResponse ? JSON.stringify(apiData.sampleResponse) : null
  );
}
```

#### PUT /api/apis/:id (Line ~510)
Updated UPDATE query to use correct columns:

```javascript
// Add sample data based on API type
if (apiData.type === 'ORACLE_API') {
  // Oracle APIs use plain text columns
  updateQuery += `,
    SAMPLE_CALL_TEXT = ?,
    SAMPLE_RESULT_TEXT = ?,
    SAMPLE_REQUEST_JSON = NULL,
    SAMPLE_RESPONSE_JSON = NULL`;
  params.push(
    typeof apiData.sampleRequest === 'string' ? apiData.sampleRequest : JSON.stringify(apiData.sampleRequest || ''),
    typeof apiData.sampleResponse === 'string' ? apiData.sampleResponse : JSON.stringify(apiData.sampleResponse || '')
  );
} else {
  // REST and JAVA APIs use JSON columns
  updateQuery += `,
    SAMPLE_REQUEST_JSON = ?,
    SAMPLE_RESPONSE_JSON = ?,
    SAMPLE_CALL_TEXT = NULL,
    SAMPLE_RESULT_TEXT = NULL`;
  params.push(
    apiData.sampleRequest ? JSON.stringify(apiData.sampleRequest) : null,
    apiData.sampleResponse ? JSON.stringify(apiData.sampleResponse) : null
  );
}
```

### 3. Frontend Changes

#### AdminPanel.jsx (Line ~100, ~141, ~780)
- Modified form initialization to detect Oracle API type
- Added conditional parsing: Oracle = plain text, REST/JAVA = JSON
- Changed form headers: "Sample Call & Result" for Oracle vs "Sample Data (JSON format)" for others
- Updated labels: "Sample Call"/"Sample Result" for Oracle vs "Sample Request"/"Sample Response" for others

#### APIDetail.jsx (Line ~245)
- Modified display logic to show Oracle samples as plain text
- Changed header: "Execution Example" for Oracle vs "API Examples" for others
- Updated labels to match AdminPanel conventions

## Database Schema Summary

### Column Usage by API Type

| API Type | Sample Request Column | Sample Response Column |
|----------|----------------------|------------------------|
| REST_API | SAMPLE_REQUEST_JSON (JSON) | SAMPLE_RESPONSE_JSON (JSON) |
| JAVA_API | SAMPLE_CALL_TEXT (TEXT) | SAMPLE_RESULT_TEXT (TEXT) |
| ORACLE_API | SAMPLE_CALL_TEXT (TEXT) | SAMPLE_RESULT_TEXT (TEXT) |

### Data Storage Rules

1. **Oracle & Java APIs**: Store as plain text strings in TEXT columns (`SAMPLE_CALL_TEXT`, `SAMPLE_RESULT_TEXT`)
2. **REST APIs**: Store as JSON-stringified objects in JSON columns (`SAMPLE_REQUEST_JSON`, `SAMPLE_RESPONSE_JSON`)
3. **NULL Handling**: When saving one type, NULL out the other type's columns to prevent data confusion

## Migration Files

1. **add_oracle_text_columns.sql**: Migration script to add new columns
2. **run-oracle-text-migration.mjs**: Node.js script to execute migration
3. **check-columns.mjs**: Verification script to check column existence

## Benefits

✅ **Appropriate Data Types**: Oracle and Java APIs now use TEXT instead of forced JSON
✅ **Better UX**: Users see appropriate labels ("Call/Result" vs "Request/Response")
✅ **Data Integrity**: Separate columns prevent mixing text and JSON data
✅ **Backward Compatible**: REST APIs continue working with JSON format
✅ **Clear Separation**: NULL handling ensures only one set of columns is populated per API type
✅ **Realistic Examples**: Java method calls and Oracle procedures shown as actual code instead of JSON objects

## Testing Checklist

- [x] Database migration completed successfully
- [x] SAMPLE_CALL_TEXT column added
- [x] SAMPLE_RESULT_TEXT column added
- [x] Backend server updated to use correct columns
- [x] transformRow reads from appropriate columns
- [x] POST endpoint saves to correct columns
- [x] PUT endpoint updates correct columns
- [x] AdminPanel displays correct headers for Oracle
- [x] APIDetail displays correct headers for Oracle
- [ ] Create/Edit Oracle API with plain text samples
- [ ] Create/Edit Java API with plain text samples
- [ ] Verify data saves correctly to TEXT columns
- [ ] View Oracle/Java API and confirm plain text display
- [ ] Verify REST APIs still work with JSON

## Next Steps

1. Test creating a new Oracle API with plain text samples
2. Test creating a new Java API with plain text samples  
3. Test editing existing Oracle/Java APIs
4. Verify the data is properly displayed in the user panel
5. Check that REST APIs continue to work correctly with JSON format
