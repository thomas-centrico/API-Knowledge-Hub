-- =============================================================================
-- INSERT SCRIPTS FOR API KNOWLEDGE HUB DATABASE
-- Generated from sample data in sampleData.js
-- =============================================================================

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- =============================================================================
-- 1. INSERT INTO API_METADATA - Core API Information
-- =============================================================================

-- REST APIs
INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-001', 'notificaFirmaModulo', 'REST_API', 'authentication', 'active', 'v1.0.0', 'a new method in order to have a notification back from FEA to receive the result of signature of the document that has been generated to be digitally signed', 'ITCREDITI-INDIA', 'ITCREDITI', '2024-10-25 10:30:00', '2023-05-15 08:00:00', 1, 'http://soa.bansel.it/osb/GestioneAmministrativaGaranzie', 'OAuth 2.0 Bearer Token', '1000 requests/hour per user', 99.9, 95, 'https://api-docs.company.com/user-mgmt', 'N', 'itcrediti-support@company.com', 'ITCREDITI', '#itcrediti-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-002', 'Payment Processing API', 'REST_API', 'payment', 'active', 'v3.2.1', 'Secure payment processing with support for multiple payment methods, fraud detection, PCI compliance, and real-time transaction monitoring.', 'Sarah Johnson', 'Financial Services', TIMESTAMP '2024-10-28 14:20:00', TIMESTAMP '2023-03-10 09:15:00', 18, 'https://api.company.com/payments/v3', 'API Key + OAuth 2.0', '500 requests/hour per merchant', 99.95, 120, 'https://api-docs.company.com/payments', 'Y', 'payments-team@company.com', 'Financial Services', '#payments-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-003', 'Analytics Dashboard API', 'REST_API', 'analytics', 'active', 'v1.8.0', 'Business intelligence API providing real-time metrics, custom reports, data visualization endpoints, and predictive analytics capabilities.', 'Mike Chen', 'Data & Analytics', TIMESTAMP '2024-10-20 16:45:00', TIMESTAMP '2023-08-22 11:30:00', 32, 'https://api.company.com/analytics/v1', 'OAuth 2.0 Bearer Token', '2000 requests/hour per user', 99.5, 200, 'https://api-docs.company.com/analytics', 'Y', 'analytics-team@company.com', 'Data & Analytics', '#analytics-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-004', 'Notification Service API', 'REST_API', 'communication', 'active', 'v2.0.3', 'Multi-channel notification system supporting email, SMS, push notifications, webhooks, and in-app messaging with delivery tracking.', 'Lisa Rodriguez', 'Platform Services', TIMESTAMP '2024-10-22 09:15:00', TIMESTAMP '2023-06-18 13:20:00', 15, 'https://api.company.com/notifications/v2', 'API Key', '10000 requests/hour per service', 99.8, 80, 'https://api-docs.company.com/notifications', 'Y', 'platform-team@company.com', 'Platform Services', '#notifications-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-005', 'E-commerce API', 'REST_API', 'integration', 'beta', 'v1.0.0-beta.3', 'Complete e-commerce solution with product catalog, inventory management, order processing, and customer management capabilities.', 'David Park', 'E-commerce', TIMESTAMP '2024-10-29 11:00:00', TIMESTAMP '2024-07-01 10:00:00', 42, 'https://api-beta.company.com/ecommerce/v1', 'OAuth 2.0 Bearer Token', '1000 requests/hour per store', 99.0, 180, 'https://api-docs.company.com/ecommerce', 'N', 'ecommerce-team@company.com', 'E-commerce Platform', '#ecommerce-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-006', 'File Storage API', 'REST_API', 'storage', 'deprecated', 'v1.2.5', 'Legacy file storage and management system. Being replaced by Cloud Storage API v2.', 'Tom Wilson', 'Infrastructure', TIMESTAMP '2024-08-15 14:30:00', TIMESTAMP '2022-11-20 09:00:00', 12, 'https://api.company.com/storage/v1', 'API Key', '500 requests/hour per user', 98.0, 350, 'https://api-docs.company.com/storage-v1', 'N', 'infrastructure@company.com', 'Infrastructure', '#infrastructure');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-007', 'Security Service API', 'REST_API', 'security', 'active', 'v2.3.1', 'Core security services including encryption, token validation, audit logging, and threat detection with real-time monitoring.', 'Jennifer Lee', 'Security', TIMESTAMP '2024-10-26 08:45:00', TIMESTAMP '2023-01-15 07:30:00', 28, 'https://api.company.com/security/v2', 'mTLS + API Key', '5000 requests/hour per service', 99.99, 50, 'https://api-docs.company.com/security', 'Y', 'security-team@company.com', 'Information Security', '#security-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('java-001', 'Aggiorna Stato Pratica', 'JAVA_API', 'utilities', 'active', 'v3.1.2', 'get aggiornaStatoPratica details.', 'Robert Kumar', 'CREDITI', TIMESTAMP '2024-10-18 15:20:00', TIMESTAMP '2023-02-28 12:00:00', NULL, NULL, 'Service Account', NULL, 99.7, 145, 'https://docs.company.com/java/business-rules', 'N', 'business-logic@company.com', 'Business Logic', '#business-rules');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('java-002', 'Data Processing Engine', 'JAVA_API', 'analytics', 'active', 'v2.8.0', 'High-performance data processing framework for ETL operations, real-time streaming, batch processing, and data transformations.', 'Anna Petrov', 'Data Engineering', TIMESTAMP '2024-10-24 13:10:00', TIMESTAMP '2023-04-05 10:45:00', NULL, NULL, 'Service Account', NULL, 99.5, 85, 'https://docs.company.com/java/data-processing', 'N', 'data-engineering@company.com', 'Data Engineering', '#data-processing');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('java-003', 'Cryptography Library', 'JAVA_API', 'security', 'active', 'v1.5.3', 'Enterprise-grade cryptographic functions including AES encryption, RSA key management, digital signatures, and secure hashing.', 'Mark Thompson', 'Security', TIMESTAMP '2024-10-27 12:30:00', TIMESTAMP '2023-09-12 14:15:00', NULL, NULL, 'Service Account + Hardware Token', NULL, 99.95, 25, 'https://docs.company.com/java/cryptography', 'N', 'crypto-team@company.com', 'Cryptography', '#crypto-lib');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('java-004', 'Message Queue Handler', 'JAVA_API', 'messaging', 'maintenance', 'v2.2.1', 'Reliable message queue processing with support for Apache Kafka, RabbitMQ, and custom protocols. Currently under maintenance for performance improvements.', 'Carlos Martinez', 'Platform Services', TIMESTAMP '2024-09-30 16:00:00', TIMESTAMP '2023-07-08 11:20:00', NULL, NULL, 'Service Account', NULL, 98.5, 320, 'https://docs.company.com/java/message-queue', 'N', 'messaging-team@company.com', 'Platform Services', '#messaging');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('oracle-001', 'Core Database API', 'ORACLE_API', 'database', 'active', '19c Enterprise', 'Primary Oracle database interface providing CRUD operations, stored procedures, triggers, and advanced query capabilities for core business data.', 'Patricia Wong', 'Database Administration', TIMESTAMP '2024-10-25 09:00:00', TIMESTAMP '2022-08-15 08:00:00', NULL, 'oracle://db.company.com:1521/PROD', 'Oracle Wallet + Service Account', NULL, 99.9, 65, 'https://docs.company.com/oracle/core-db', 'N', 'dba-team@company.com', 'Database Administration', '#oracle-db');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('oracle-002', 'Data Warehouse API', 'ORACLE_API', 'analytics', 'active', '21c Enterprise', 'Enterprise data warehouse with OLAP capabilities, dimensional modeling, and advanced analytics for business intelligence and reporting.', 'Kevin Zhang', 'Data & Analytics', TIMESTAMP '2024-10-23 14:45:00', TIMESTAMP '2023-01-30 09:30:00', NULL, 'oracle://dw.company.com:1521/DW', 'Oracle Wallet + LDAP', NULL, 99.5, 180, 'https://docs.company.com/oracle/data-warehouse', 'N', 'dw-team@company.com', 'Data Warehouse', '#data-warehouse');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, ENDPOINTS, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('oracle-003', 'Legacy ERP Integration', 'ORACLE_API', 'integration', 'deprecated', '11g Standard', 'Legacy Oracle ERP system integration. Scheduled for decommission in Q2 2025. Use Modern ERP API instead.', 'Nancy Brown', 'Enterprise Systems', TIMESTAMP '2024-06-15 10:00:00', TIMESTAMP '2020-03-10 08:00:00', NULL, 'oracle://legacy.company.com:1521/ERP', 'Legacy Oracle Authentication', NULL, 95.0, 500, 'https://docs.company.com/oracle/legacy-erp', 'N', 'erp-team@company.com', 'Enterprise Systems', '#legacy-systems');

-- =====================================================
-- 2. INSERT INTO API_TAGS
-- =====================================================

-- REST API Tags
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'authentication');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'users');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'oauth');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'rbac');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'sessions');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-002', 'payments');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-002', 'credit-card');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-002', 'fraud-detection');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-002', 'pci-compliant');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-002', 'webhooks');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-003', 'analytics');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-003', 'metrics');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-003', 'reporting');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-003', 'dashboards');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-003', 'business-intelligence');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-004', 'notifications');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-004', 'email');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-004', 'sms');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-004', 'push');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-004', 'webhooks');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-004', 'messaging');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-005', 'ecommerce');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-005', 'products');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-005', 'orders');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-005', 'inventory');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-005', 'catalog');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-006', 'storage');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-006', 'files');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-006', 'legacy');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-006', 'deprecated');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-007', 'security');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-007', 'encryption');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-007', 'tokens');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-007', 'audit');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-007', 'monitoring');

-- Java API Tags
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-001', 'rules-engine');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-001', 'workflow');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-001', 'decisions');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-001', 'policies');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-001', 'automation');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-002', 'data-processing');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-002', 'etl');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-002', 'streaming');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-002', 'batch');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-002', 'transformations');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-003', 'cryptography');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-003', 'encryption');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-003', 'security');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-003', 'keys');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-003', 'signatures');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-004', 'messaging');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-004', 'queue');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-004', 'kafka');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-004', 'rabbitmq');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('java-004', 'async');

-- Oracle API Tags
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'database');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'oracle');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'crud');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'procedures');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'queries');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'data-warehouse');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'olap');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'analytics');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'reporting');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'bi');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-003', 'erp');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-003', 'legacy');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-003', 'integration');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-003', 'deprecated');

-- =====================================================
-- 3. INSERT INTO API_DEPENDENCIES
-- =====================================================

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-001', 'rest-007');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-002', 'rest-001');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-002', 'rest-007');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-003', 'rest-001');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-003', 'java-002');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-004', 'rest-001');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-005', 'rest-001');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-005', 'rest-002');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-005', 'rest-004');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('rest-006', 'rest-007');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('java-001', 'java-002');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('java-001', 'oracle-001');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('java-002', 'oracle-001');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('java-002', 'oracle-002');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('java-003', 'rest-007');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('java-004', 'java-002');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('oracle-002', 'oracle-001');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID) VALUES ('oracle-003', 'oracle-001');

-- =====================================================
-- 4. INSERT INTO API_DEPENDENTS
-- =====================================================

INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-001', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-001', 'rest-003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-001', 'rest-004');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-002', 'rest-005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-004', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-004', 'rest-005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-006', 'rest-003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-007', 'rest-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-007', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-007', 'rest-006');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('rest-007', 'java-003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('java-001', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('java-002', 'rest-003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('java-002', 'java-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('java-003', 'java-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('java-003', 'rest-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('java-003', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('java-004', 'rest-003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('java-004', 'rest-004');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-001', 'java-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-001', 'java-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-001', 'rest-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-001', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-001', 'oracle-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-002', 'java-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID) VALUES ('oracle-002', 'rest-003');

-- =====================================================
-- 5. INSERT INTO API_USAGE
-- =====================================================

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('rest-001', 125000, 2500, 0.020);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('rest-002', 85000, 1200, 0.010);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('rest-003', 65000, 800, 0.030);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('rest-004', 180000, 3500, 0.015);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('rest-005', 25000, 150, 0.080);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('rest-006', 5000, 45, 0.120);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('rest-007', 250000, 4200, 0.005);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('java-001', 95000, 280, 0.025);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('java-002', 155000, 420, 0.018);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('java-003', 75000, 180, 0.008);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('java-004', 200000, 650, 0.045);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('oracle-001', 450000, 1200, 0.012);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('oracle-002', 85000, 320, 0.028);
INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE) VALUES ('oracle-003', 8000, 25, 0.150);

-- =====================================================
-- COMMIT TRANSACTION
-- =====================================================
COMMIT;

-- =====================================================
-- VERIFICATION QUERIES (OPTIONAL)
-- =====================================================

-- Check total records inserted
SELECT 'API_METADATA' as TABLE_NAME, COUNT(*) as RECORD_COUNT FROM API_METADATA
UNION ALL
SELECT 'API_TAGS', COUNT(*) FROM API_TAGS
UNION ALL
SELECT 'API_DEPENDENCIES', COUNT(*) FROM API_DEPENDENCIES
UNION ALL
SELECT 'API_DEPENDENTS', COUNT(*) FROM API_DEPENDENTS
UNION ALL
SELECT 'API_USAGE', COUNT(*) FROM API_USAGE;

-- Sample query to verify relationships
SELECT 
    am.NAME as API_NAME,
    am.TYPE,
    am.CATEGORY,
    am.STATUS,
    au.REQUESTS_PER_DAY,
    au.ACTIVE_USERS,
    au.ERROR_RATE
FROM API_METADATA am
JOIN API_USAGE au ON am.ID = au.API_ID
WHERE am.STATUS = 'active'
ORDER BY au.REQUESTS_PER_DAY DESC;