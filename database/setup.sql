-- SQLite Database Setup Script for API_METADATA
-- Run this script to create and populate the database

-- Create the API_METADATA table
CREATE TABLE IF NOT EXISTS API_METADATA (
    ID TEXT PRIMARY KEY,
    NAME TEXT NOT NULL,
    TYPE TEXT NOT NULL,
    CATEGORY TEXT,
    STATUS TEXT,
    VERSION TEXT,
    DESCRIPTION TEXT,
    OWNER TEXT,
    DEPARTMENT TEXT,
    LAST_UPDATED TEXT,
    CREATED_AT TEXT,
    ENDPOINTS INTEGER,
    BASE_URL TEXT,
    AUTH_METHOD TEXT,
    RATE_LIMIT TEXT,
    SLA_UPTIME REAL,
    RESPONSE_TIME INTEGER,
    DOC_URL TEXT,
    HAS_INTERACTIVE_DOCS TEXT,
    CONTACT_EMAIL TEXT,
    CONTACT_TEAM TEXT,
    SLACK_CHANNEL TEXT
);

-- Sample data inserts (customize based on your needs)
INSERT OR REPLACE INTO API_METADATA VALUES
(
    'rest-1',
    'User Management API',
    'REST_API',
    'Integration',
    'Active',
    'v2.1.0',
    'Comprehensive API for managing user accounts, profiles, and authentication',
    'John Doe',
    'Engineering',
    '2024-03-15',
    '2023-01-10',
    12,
    'https://api.company.com/users',
    'OAuth 2.0',
    '1000 req/hour',
    99.9,
    150,
    'https://docs.company.com/api/users',
    'true',
    'api-team@company.com',
    'API Team',
    '#api-support'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'rest-2',
    'Payment Processing API',
    'REST_API',
    'Financial',
    'Active',
    'v3.0.2',
    'Secure payment processing and transaction management API',
    'Jane Smith',
    'Finance',
    '2024-03-20',
    '2022-06-15',
    8,
    'https://api.company.com/payments',
    'API Key',
    '500 req/hour',
    99.95,
    200,
    'https://docs.company.com/api/payments',
    'true',
    'payments@company.com',
    'Payment Team',
    '#payment-api'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'java-1',
    'Data Processing Library',
    'JAVA_API',
    'Data Management',
    'Active',
    'v1.5.0',
    'Java library for efficient data processing and transformation',
    'Bob Johnson',
    'Data Engineering',
    '2024-02-28',
    '2023-08-20',
    0,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'https://docs.company.com/java/data-processing',
    'false',
    'data-eng@company.com',
    'Data Team',
    '#data-engineering'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'oracle-1',
    'Customer Database API',
    'ORACLE_API',
    'Database',
    'Active',
    'v12c',
    'Oracle database API for customer data management',
    'Alice Brown',
    'Database Administration',
    '2024-03-10',
    '2021-11-05',
    15,
    'oracle://db.company.com:1521/CUSTOMERS',
    'Oracle Auth',
    'N/A',
    99.99,
    50,
    'https://docs.company.com/oracle/customer-db',
    'false',
    'dba@company.com',
    'DBA Team',
    '#database-ops'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'rest-3',
    'Inventory Management API',
    'REST_API',
    'Operations',
    'Beta',
    'v1.0.0-beta',
    'Real-time inventory tracking and management system API',
    'Charlie Wilson',
    'Operations',
    '2024-03-25',
    '2024-01-15',
    10,
    'https://api.company.com/inventory',
    'JWT',
    '2000 req/hour',
    98.5,
    180,
    'https://docs.company.com/api/inventory',
    'true',
    'ops-team@company.com',
    'Operations Team',
    '#inventory'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'rest-4',
    'Analytics API',
    'REST_API',
    'Analytics',
    'Active',
    'v2.5.1',
    'Business analytics and reporting API with real-time metrics',
    'Diana Prince',
    'Analytics',
    '2024-03-18',
    '2022-03-10',
    20,
    'https://api.company.com/analytics',
    'OAuth 2.0',
    '5000 req/hour',
    99.8,
    120,
    'https://docs.company.com/api/analytics',
    'true',
    'analytics@company.com',
    'Analytics Team',
    '#analytics'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'java-2',
    'Security Framework',
    'JAVA_API',
    'Security',
    'Active',
    'v2.0.3',
    'Comprehensive Java security framework for authentication and authorization',
    'Eve Martinez',
    'Security',
    '2024-03-12',
    '2023-05-20',
    0,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'https://docs.company.com/java/security',
    'false',
    'security@company.com',
    'Security Team',
    '#security'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'oracle-2',
    'Order Management Database',
    'ORACLE_API',
    'Database',
    'Active',
    'v19c',
    'Oracle database for order processing and fulfillment',
    'Frank Castle',
    'Database Administration',
    '2024-03-08',
    '2022-09-15',
    18,
    'oracle://db.company.com:1521/ORDERS',
    'Oracle Auth',
    'N/A',
    99.95,
    45,
    'https://docs.company.com/oracle/orders-db',
    'false',
    'dba@company.com',
    'DBA Team',
    '#database-ops'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'rest-5',
    'Notification Service API',
    'REST_API',
    'Communication',
    'Active',
    'v1.8.0',
    'Multi-channel notification service for emails, SMS, and push notifications',
    'Grace Hopper',
    'Platform',
    '2024-03-22',
    '2023-02-01',
    6,
    'https://api.company.com/notifications',
    'API Key',
    '10000 req/hour',
    99.7,
    90,
    'https://docs.company.com/api/notifications',
    'true',
    'platform@company.com',
    'Platform Team',
    '#notifications'
);

INSERT OR REPLACE INTO API_METADATA VALUES
(
    'rest-6',
    'File Storage API',
    'REST_API',
    'Storage',
    'Deprecated',
    'v1.2.5',
    'Legacy file storage and retrieval API (migrating to v2)',
    'Henry Ford',
    'Infrastructure',
    '2023-12-15',
    '2021-05-10',
    8,
    'https://api.company.com/files',
    'Basic Auth',
    '100 req/hour',
    95.0,
    300,
    'https://docs.company.com/api/files',
    'false',
    'infra@company.com',
    'Infrastructure Team',
    '#storage'
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_type ON API_METADATA(TYPE);
CREATE INDEX IF NOT EXISTS idx_category ON API_METADATA(CATEGORY);
CREATE INDEX IF NOT EXISTS idx_status ON API_METADATA(STATUS);
CREATE INDEX IF NOT EXISTS idx_department ON API_METADATA(DEPARTMENT);
CREATE INDEX IF NOT EXISTS idx_last_updated ON API_METADATA(LAST_UPDATED);

-- Verify data insertion
SELECT 'Total APIs: ' || COUNT(*) as summary FROM API_METADATA;
SELECT 'APIs by Type:' as summary;
SELECT TYPE, COUNT(*) as count FROM API_METADATA GROUP BY TYPE;
SELECT 'APIs by Status:' as summary;
SELECT STATUS, COUNT(*) as count FROM API_METADATA GROUP BY STATUS;
