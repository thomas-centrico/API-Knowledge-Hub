-- =============================================================================
-- INSERT SCRIPTS FOR ORACLE BANKING APIs - Knowledge Hub Database
-- Generated: November 5, 2025
-- Description: Bank identification and account management Oracle APIs with 
--              comprehensive dependency mapping
-- =============================================================================

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- =============================================================================
-- GROUP 1: Bank Identification Translation APIs
-- Purpose: Bidirectional mapping between ID_BANCA, ABI_CODE, and BANK_CODE
-- =============================================================================

-- API 1: Get ABI Code by Bank ID
INSERT INTO API_METADATA (
    ID, NAME, TYPE, CATEGORY, STATUS, VERSION, 
    DESCRIPTION, OWNER, DEPARTMENT, 
    LAST_UPDATED, CREATED_AT, 
    ENDPOINTS, BASE_URL, AUTH_METHOD, 
    RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, 
    DOC_URL, HAS_INTERACTIVE_DOCS, 
    CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL
) VALUES (
    'oracle-bank-001',
    'CRC_FN_ABI_BY_ID_BANK',
    'ORACLE_API',
    'banking',
    'active',
    '1.0.0',
    'Retrieve ABI_CODE using ID_BANCA. Part of the bank identification translation layer that enables conversion between different bank identifier formats. Used for regulatory reporting and inter-bank communication.',
    'WEBLOGIC_DBA',
    'Banking Operations',
    TIMESTAMP '2024-11-05 10:00:00',
    TIMESTAMP '2020-01-15 09:00:00',
    NULL,
    'oracle://db.bansel.it:1521/PROD',
    'Oracle Wallet + Service Account',
    NULL,
    99.95,
    45,
    'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
    'N',
    'dba-team@bansel.it',
    'Database Administration',
    '#oracle-banking-api'
);

-- API 2: Get Bank Code by Bank ID
INSERT INTO API_METADATA (
    ID, NAME, TYPE, CATEGORY, STATUS, VERSION, 
    DESCRIPTION, OWNER, DEPARTMENT, 
    LAST_UPDATED, CREATED_AT, 
    ENDPOINTS, BASE_URL, AUTH_METHOD, 
    RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, 
    DOC_URL, HAS_INTERACTIVE_DOCS, 
    CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL
) VALUES (
    'oracle-bank-002',
    'CRC_FN_BANK_CODE_BY_ID_BANK',
    'ORACLE_API',
    'banking',
    'active',
    '1.0.0',
    'Retrieve BANK_CODE using ID_BANCA. Essential for database routing and schema selection. This API enables the system to determine which database instance and schema should handle operations for a specific bank.',
    'WEBLOGIC_DBA',
    'Banking Operations',
    TIMESTAMP '2024-11-05 10:00:00',
    TIMESTAMP '2020-01-15 09:00:00',
    NULL,
    'oracle://db.bansel.it:1521/PROD',
    'Oracle Wallet + Service Account',
    NULL,
    99.95,
    45,
    'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
    'N',
    'dba-team@bansel.it',
    'Database Administration',
    '#oracle-banking-api'
);

-- API 3: Get Bank ID by ABI Code
INSERT INTO API_METADATA (
    ID, NAME, TYPE, CATEGORY, STATUS, VERSION, 
    DESCRIPTION, OWNER, DEPARTMENT, 
    LAST_UPDATED, CREATED_AT, 
    ENDPOINTS, BASE_URL, AUTH_METHOD, 
    RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, 
    DOC_URL, HAS_INTERACTIVE_DOCS, 
    CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL
) VALUES (
    'oracle-bank-003',
    'CRC_FN_ID_BANK_BY_ABI',
    'ORACLE_API',
    'banking',
    'active',
    '1.0.0',
    'Retrieve ID_BANCA using ABI_CODE. Provides reverse lookup capability from Italian Banking Association code to internal bank identifier. Critical for processing external banking messages and SEPA transactions.',
    'WEBLOGIC_DBA',
    'Banking Operations',
    TIMESTAMP '2024-11-05 10:00:00',
    TIMESTAMP '2020-01-15 09:00:00',
    NULL,
    'oracle://db.bansel.it:1521/PROD',
    'Oracle Wallet + Service Account',
    NULL,
    99.95,
    50,
    'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
    'N',
    'dba-team@bansel.it',
    'Database Administration',
    '#oracle-banking-api'
);

-- API 4: Get Bank Code by ABI Code
INSERT INTO API_METADATA (
    ID, NAME, TYPE, CATEGORY, STATUS, VERSION, 
    DESCRIPTION, OWNER, DEPARTMENT, 
    LAST_UPDATED, CREATED_AT, 
    ENDPOINTS, BASE_URL, AUTH_METHOD, 
    RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, 
    DOC_URL, HAS_INTERACTIVE_DOCS, 
    CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL
) VALUES (
    'oracle-bank-004',
    'CRC_FN_BANK_CODE_BY_ABI',
    'ORACLE_API',
    'banking',
    'active',
    '1.0.0',
    'Retrieve BANK_CODE using ABI_CODE. Direct translation from Italian Banking Association identifier to internal bank code. Enables streamlined database routing without intermediate ID_BANCA lookup.',
    'WEBLOGIC_DBA',
    'Banking Operations',
    TIMESTAMP '2024-11-05 10:00:00',
    TIMESTAMP '2020-01-15 09:00:00',
    NULL,
    'oracle://db.bansel.it:1521/PROD',
    'Oracle Wallet + Service Account',
    NULL,
    99.95,
    50,
    'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
    'N',
    'dba-team@bansel.it',
    'Database Administration',
    '#oracle-banking-api'
);

-- =============================================================================
-- GROUP 2: Database Routing APIs
-- Purpose: Determine correct database and schema for multi-tenant operations
-- =============================================================================

-- API 5: Get Database Name by Bank Code
INSERT INTO API_METADATA (
    ID, NAME, TYPE, CATEGORY, STATUS, VERSION, 
    DESCRIPTION, OWNER, DEPARTMENT, 
    LAST_UPDATED, CREATED_AT, 
    ENDPOINTS, BASE_URL, AUTH_METHOD, 
    RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, 
    DOC_URL, HAS_INTERACTIVE_DOCS, 
    CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL
) VALUES (
    'oracle-bank-005',
    'CRC_FN_NOME_DB_BY_COD_BANCA',
    'ORACLE_API',
    'infrastructure',
    'active',
    '1.0.0',
    'Retrieve database name (e.g., oraboh, oraopn) using BANK_CODE. Essential for multi-tenant architecture where different banks operate on separate Oracle database instances. Used for connection pooling and query routing.',
    'WEBLOGIC_DBA',
    'Database Administration',
    TIMESTAMP '2024-11-05 10:00:00',
    TIMESTAMP '2020-01-15 09:00:00',
    NULL,
    'oracle://db.bansel.it:1521/PROD',
    'Oracle Wallet + Service Account',
    NULL,
    99.98,
    35,
    'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
    'N',
    'dba-team@bansel.it',
    'Database Administration',
    '#oracle-banking-api'
);

-- API 6: Get Schema Name by Bank Code
INSERT INTO API_METADATA (
    ID, NAME, TYPE, CATEGORY, STATUS, VERSION, 
    DESCRIPTION, OWNER, DEPARTMENT, 
    LAST_UPDATED, CREATED_AT, 
    ENDPOINTS, BASE_URL, AUTH_METHOD, 
    RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, 
    DOC_URL, HAS_INTERACTIVE_DOCS, 
    CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL
) VALUES (
    'oracle-bank-006',
    'CRC_FN_NOME_SCHEMA_BY_COD_BANCA',
    'ORACLE_API',
    'infrastructure',
    'active',
    '1.0.0',
    'Retrieve database schema name using BANK_CODE. Works in conjunction with database name API to build complete connection strings for bank-specific operations. Critical for data isolation in multi-tenant environment.',
    'WEBLOGIC_DBA',
    'Database Administration',
    TIMESTAMP '2024-11-05 10:00:00',
    TIMESTAMP '2020-01-15 09:00:00',
    NULL,
    'oracle://db.bansel.it:1521/PROD',
    'Oracle Wallet + Service Account',
    NULL,
    99.98,
    35,
    'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
    'N',
    'dba-team@bansel.it',
    'Database Administration',
    '#oracle-banking-api'
);

-- =============================================================================
-- GROUP 3: Account Operations API
-- Purpose: Financial account balance retrieval
-- =============================================================================

-- API 7: Get Account Balance
INSERT INTO API_METADATA (
    ID, NAME, TYPE, CATEGORY, STATUS, VERSION, 
    DESCRIPTION, OWNER, DEPARTMENT, 
    LAST_UPDATED, CREATED_AT, 
    ENDPOINTS, BASE_URL, AUTH_METHOD, 
    RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, 
    DOC_URL, HAS_INTERACTIVE_DOCS, 
    CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL
) VALUES (
    'oracle-bank-007',
    'CRC_FN_GET_SALDO',
    'ORACLE_API',
    'financial',
    'active',
    '1.0.0',
    'Retrieve account balance (SALDO) using ID_CONTO (account ID). Real-time balance inquiry for customer accounts. Must be executed against the correct database instance determined by bank routing APIs. High-frequency operation requiring optimal performance.',
    'WEBLOGIC_DBA',
    'Financial Services',
    TIMESTAMP '2024-11-05 10:00:00',
    TIMESTAMP '2020-01-15 09:00:00',
    NULL,
    'oracle://db.bansel.it:1521/PROD',
    'Oracle Wallet + Service Account',
    NULL,
    99.99,
    25,
    'https://docs.bansel.it/oracle/crc-pkg-ext-interface',
    'N',
    'financial-services@bansel.it',
    'Financial Services',
    '#oracle-banking-api'
);

-- =====================================================
-- API TAGS - Categorization and Search Optimization
-- =====================================================

-- Bank Identification APIs Tags
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-001', 'banking');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-001', 'identification');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-001', 'abi-code');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-001', 'translation');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-001', 'oracle-function');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-002', 'banking');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-002', 'identification');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-002', 'bank-code');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-002', 'translation');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-002', 'routing');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-003', 'banking');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-003', 'identification');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-003', 'abi-code');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-003', 'reverse-lookup');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-003', 'sepa');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-004', 'banking');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-004', 'identification');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-004', 'abi-code');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-004', 'bank-code');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-004', 'direct-translation');

-- Database Routing APIs Tags
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-005', 'database');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-005', 'routing');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-005', 'multi-tenant');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-005', 'infrastructure');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-005', 'connection-management');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-006', 'database');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-006', 'routing');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-006', 'multi-tenant');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-006', 'schema');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-006', 'data-isolation');

-- Account Operations API Tags
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-007', 'financial');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-007', 'account');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-007', 'balance');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-007', 'real-time');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-bank-007', 'high-frequency');

-- =====================================================
-- API DEPENDENCIES - What Each API Requires
-- =====================================================

-- Bank Code APIs depend on ID lookup (transitive dependencies)
-- These represent alternative paths in the dependency graph

-- Database routing APIs depend on bank code translation
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('oracle-bank-005', 'oracle-bank-002');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('oracle-bank-005', 'oracle-bank-004');

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('oracle-bank-006', 'oracle-bank-002');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('oracle-bank-006', 'oracle-bank-004');

-- Account balance API depends on database routing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('oracle-bank-007', 'oracle-bank-005');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('oracle-bank-007', 'oracle-bank-006');

-- =====================================================
-- API DEPENDENTS - What Depends On Each API
-- =====================================================

-- ID_BANCA conversion APIs are used by bank code lookups
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-bank-001', 'oracle-bank-004');

-- Bank code APIs are used by database routing
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-bank-002', 'oracle-bank-005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-bank-002', 'oracle-bank-006');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-bank-004', 'oracle-bank-005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-bank-004', 'oracle-bank-006');

-- ABI lookup used by ID_BANCA conversion
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-bank-003', 'oracle-bank-002');

-- Database routing APIs used by account operations
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-bank-005', 'oracle-bank-007');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-bank-006', 'oracle-bank-007');

-- =====================================================
-- API USAGE STATISTICS
-- =====================================================

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES 
('oracle-bank-001', 45000, 320, 0.008);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES 
('oracle-bank-002', 68000, 420, 0.006);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES 
('oracle-bank-003', 38000, 280, 0.010);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES 
('oracle-bank-004', 52000, 350, 0.007);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES 
('oracle-bank-005', 125000, 580, 0.004);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES 
('oracle-bank-006', 125000, 580, 0.004);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES 
('oracle-bank-007', 850000, 1200, 0.002);

-- =====================================================
-- COMMIT TRANSACTION
-- =====================================================
COMMIT;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check inserted records
SELECT 
    'Oracle Banking APIs Inserted' as STATUS,
    COUNT(*) as API_COUNT 
FROM API_METADATA 
WHERE ID LIKE 'oracle-bank-%';

-- View complete dependency chain
SELECT 
    am.NAME as API_NAME,
    am.CATEGORY,
    am.DESCRIPTION,
    GROUP_CONCAT(DISTINCT dep_am.NAME) as DEPENDS_ON
FROM API_METADATA am
LEFT JOIN API_DEPENDENCIES ad ON am.ID = ad.API_ID
LEFT JOIN API_METADATA dep_am ON ad.DEPENDS_ON_ID = dep_am.ID
WHERE am.ID LIKE 'oracle-bank-%'
GROUP BY am.ID, am.NAME, am.CATEGORY, am.DESCRIPTION
ORDER BY am.ID;

-- View usage statistics
SELECT 
    am.NAME,
    am.CATEGORY,
    au.REQUESTS_PER_DAY,
    au.ACTIVE_USERS,
    au.ERROR_RATE,
    am.RESPONSE_TIME
FROM API_METADATA am
JOIN API_USAGE au ON am.ID = au.API_ID
WHERE am.ID LIKE 'oracle-bank-%'
ORDER BY au.REQUESTS_PER_DAY DESC;

-- =====================================================
-- DEPENDENCY MAPPING SUMMARY
-- =====================================================

/*
DEPENDENCY GRAPH VISUALIZATION:

GROUP 1: Bank Identification Translation (Bidirectional)
┌─────────────────────────────────────────────────────┐
│  ID_BANCA (001,002) ←→ ABI_CODE (003,004)          │
│                                                      │
│  oracle-bank-001: ID_BANCA → ABI_CODE              │
│  oracle-bank-002: ID_BANCA → BANK_CODE             │
│  oracle-bank-003: ABI_CODE → ID_BANCA              │
│  oracle-bank-004: ABI_CODE → BANK_CODE             │
└─────────────────────────────────────────────────────┘
              ↓ BANK_CODE (002, 004)
┌─────────────────────────────────────────────────────┐
│  GROUP 2: Database Routing                          │
│                                                      │
│  oracle-bank-005: BANK_CODE → Database Name        │
│  oracle-bank-006: BANK_CODE → Schema Name          │
└─────────────────────────────────────────────────────┘
              ↓ Database + Schema
┌─────────────────────────────────────────────────────┐
│  GROUP 3: Account Operations                        │
│                                                      │
│  oracle-bank-007: ID_CONTO → SALDO (Balance)       │
│  (Requires correct database routing)                │
└─────────────────────────────────────────────────────┘

INTEGRATION PATTERNS:

Pattern 1: Full Lookup Chain (ID_BANCA → Balance)
  Input: ID_BANCA
  → oracle-bank-002 (Get BANK_CODE)
  → oracle-bank-005 (Get Database)
  → oracle-bank-006 (Get Schema)
  → oracle-bank-007 (Get Balance with ID_CONTO)

Pattern 2: ABI-based Lookup (ABI_CODE → Database)
  Input: ABI_CODE
  → oracle-bank-004 (Get BANK_CODE)
  → oracle-bank-005 (Get Database)
  → oracle-bank-006 (Get Schema)

Pattern 3: Reverse Validation
  Input: ABI_CODE
  → oracle-bank-003 (Get ID_BANCA)
  → oracle-bank-002 (Get BANK_CODE for validation)

CACHING RECOMMENDATIONS:
- APIs 001-006: Reference data, cache TTL 24 hours
- API 007: Real-time data, no caching or very short TTL (seconds)

ERROR HANDLING:
- If direct path fails, use alternative lookup paths
- Always validate bidirectional consistency
- Implement circuit breakers for high-frequency API 007
*/
