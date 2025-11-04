-- =============================================================================
-- COMPLETE INSERT SCRIPTS FOR API KNOWLEDGE HUB DATABASE
-- Based on sampleData.js with proper mappings for SQLite
-- =============================================================================

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- =============================================================================
-- 1. INSERT INTO API_METADATA - Core API Information
-- =============================================================================

-- REST APIs
INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-001', 'notificaFirmaModulo', 'REST_API', 'authentication', 'active', 'v1.0.0', 'a new method in order to have a notification back from FEA to receive the result of signature of the document that has been generated to be digitally signed', 'ITCREDITI-INDIA', 'ITCREDITI', '2024-10-25 10:30:00', '2023-05-15 08:00:00', 'http://soa.bansel.it/osb/GestioneAmministrativaGaranzie', 'OAuth 2.0 Bearer Token', '1000 requests/hour per user', 99.9, 95, 'https://api-docs.company.com/user-mgmt', 'N', 'itcrediti-support@company.com', 'ITCREDITI', '#itcrediti-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-002', 'Payment Processing API', 'REST_API', 'payment', 'active', 'v3.2.1', 'Secure payment processing with support for multiple payment methods, fraud detection, PCI compliance, and real-time transaction monitoring.', 'Sarah Johnson', 'Financial Services', '2024-10-28 14:20:00', '2023-03-10 09:15:00', 'https://api.company.com/payments/v3', 'API Key + OAuth 2.0', '500 requests/hour per merchant', 99.95, 120, 'https://api-docs.company.com/payments', 'Y', 'payments-team@company.com', 'Financial Services', '#payments-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-003', 'Analytics Dashboard API', 'REST_API', 'analytics', 'active', 'v1.8.0', 'Business intelligence API providing real-time metrics, custom reports, data visualization endpoints, and predictive analytics capabilities.', 'Mike Chen', 'Data & Analytics', '2024-10-20 16:45:00', '2023-08-22 11:30:00', 'https://api.company.com/analytics/v1', 'OAuth 2.0 Bearer Token', '2000 requests/hour per user', 99.5, 200, 'https://api-docs.company.com/analytics', 'Y', 'analytics-team@company.com', 'Data & Analytics', '#analytics-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-004', 'Notification Service API', 'REST_API', 'communication', 'active', 'v2.0.3', 'Multi-channel notification system supporting email, SMS, push notifications, webhooks, and in-app messaging with delivery tracking.', 'Lisa Rodriguez', 'Platform Services', '2024-10-22 09:15:00', '2023-06-18 13:20:00', 'https://api.company.com/notifications/v2', 'API Key', '10000 requests/hour per service', 99.8, 80, 'https://api-docs.company.com/notifications', 'Y', 'platform-team@company.com', 'Platform Services', '#notifications-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-005', 'E-commerce API', 'REST_API', 'integration', 'beta', 'v1.0.0-beta.3', 'Complete e-commerce solution with product catalog, inventory management, order processing, and customer management capabilities.', 'David Park', 'E-commerce', '2024-10-29 11:00:00', '2024-07-01 10:00:00', 'https://api-beta.company.com/ecommerce/v1', 'OAuth 2.0 Bearer Token', '1000 requests/hour per store', 99.0, 180, 'https://api-docs.company.com/ecommerce', 'N', 'ecommerce-team@company.com', 'E-commerce Platform', '#ecommerce-api');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-006', 'File Storage API', 'REST_API', 'storage', 'deprecated', 'v1.2.5', 'Legacy file storage and management system. Being replaced by Cloud Storage API v2.', 'Tom Wilson', 'Infrastructure', '2024-08-15 14:30:00', '2022-11-20 09:00:00', 'https://api.company.com/storage/v1', 'API Key', '500 requests/hour per user', 98.0, 350, 'https://api-docs.company.com/storage-v1', 'N', 'infrastructure@company.com', 'Infrastructure', '#infrastructure');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, AUTH_METHOD, RATE_LIMIT, SLA_UPTIME, RESPONSE_TIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('rest-007', 'Security Service API', 'REST_API', 'security', 'active', 'v2.3.1', 'Core security services including encryption, token validation, audit logging, and threat detection with real-time monitoring.', 'Jennifer Lee', 'Security', '2024-10-26 08:45:00', '2023-01-15 07:30:00', 'https://api.company.com/security/v2', 'mTLS + API Key', '5000 requests/hour per service', 99.99, 50, 'https://api-docs.company.com/security', 'Y', 'security-team@company.com', 'Information Security', '#security-api');

-- Java APIs
INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, PACKAGE_NAME, CLASS_NAME, METHOD_NAME, INTERFACE_NAME, API_SIGNATURE, AUTH_METHOD, RESPONSE_TIME, SLA_UPTIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('java-001', 'getListaOneriUsura', 'JAVA_API', 'utilities', 'active', 'v3.1.2', 'It would provide the details about list of wear and tear charges applied', 'ITCREDITI-INDIA', 'CREDITI', '2024-10-18 15:20:00', '2023-02-28 12:00:00', 'it.sella.gag.gestore', 'GestoreGaranzieImpl', 'getListaOneriUsura', 'IGestoreGaranzie', 'IGestoreGaranzie.getListaOneriUsura(numeroConto)', 'Service Account', 145, 99.7, 'https://docs.company.com/java/business-rules', 'N', 'business-logic@company.com', 'Business Logic', '#business-rules');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, PACKAGE_NAME, CLASS_NAME, METHOD_NAME, AUTH_METHOD, RESPONSE_TIME, SLA_UPTIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('java-002', 'Data Processing Engine', 'JAVA_API', 'analytics', 'active', 'v2.8.0', 'High-performance data processing framework for ETL operations, real-time streaming, batch processing, and data transformations.', 'Anna Petrov', 'Data Engineering', '2024-10-24 13:10:00', '2023-04-05 10:45:00', 'com.company.dataengineering.processing', 'DataProcessingEngine', 'processData', 'Service Account', 85, 99.5, 'https://docs.company.com/java/data-processing', 'N', 'data-engineering@company.com', 'Data Engineering', '#data-processing');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, PACKAGE_NAME, CLASS_NAME, METHOD_NAME, AUTH_METHOD, RESPONSE_TIME, SLA_UPTIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('java-003', 'Cryptography Library', 'JAVA_API', 'security', 'active', 'v1.5.3', 'Enterprise-grade cryptographic functions including AES encryption, RSA key management, digital signatures, and secure hashing.', 'Mark Thompson', 'Security', '2024-10-27 12:30:00', '2023-09-12 14:15:00', 'com.company.security.crypto', 'CryptographyService', 'encrypt', 'Service Account + Hardware Token', 25, 99.95, 'https://docs.company.com/java/cryptography', 'N', 'crypto-team@company.com', 'Cryptography', '#crypto-lib');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, PACKAGE_NAME, CLASS_NAME, METHOD_NAME, AUTH_METHOD, RESPONSE_TIME, SLA_UPTIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('java-004', 'Message Queue Handler', 'JAVA_API', 'messaging', 'maintenance', 'v2.2.1', 'Reliable message queue processing with support for Apache Kafka, RabbitMQ, and custom protocols. Currently under maintenance for performance improvements.', 'Carlos Martinez', 'Platform Services', '2024-09-30 16:00:00', '2023-07-08 11:20:00', 'com.company.platform.messaging', 'MessageQueueHandler', 'publishMessage', 'Service Account', 320, 98.5, 'https://docs.company.com/java/message-queue', 'N', 'messaging-team@company.com', 'Platform Services', '#messaging');

-- Oracle APIs
INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, CONNECTION_STRING, SCHEMA_NAME, PROCEDURE_NAME, FUNCTION_SIGNATURE, AUTH_METHOD, RESPONSE_TIME, SLA_UPTIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('oracle-001', 'WEBLOGIC_DBA.CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK(IN_ID_BANCA IN NUMBER)', 'ORACLE_API', 'database', 'active', 'v1.0', 'Oracle function to retrieve ABI (Italian Banking Association) code for a given bank ID. Part of the CRC external interface package used for bank identification and validation.', 'Patricia Wong', 'Database Administration', '2024-11-04 10:00:00', '2022-08-15 08:00:00', 'oracle://weblogic.company.com:1521/PROD', 'jdbc:oracle:thin:@weblogic.company.com:1521:PROD', 'WEBLOGIC_DBA', 'CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK', 'CRC_FN_ABI_BY_ID_BANK(IN_ID_BANCA IN NUMBER) RETURN VARCHAR2', 'Oracle Wallet + Service Account', 45, 99.9, 'https://docs.company.com/oracle/weblogic-crc-interface', 'N', 'dba-team@company.com', 'Database Administration', '#oracle-db');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, CONNECTION_STRING, SCHEMA_NAME, PROCEDURE_NAME, AUTH_METHOD, RESPONSE_TIME, SLA_UPTIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('oracle-002', 'Data Warehouse API', 'ORACLE_API', 'analytics', 'active', '21c Enterprise', 'Enterprise data warehouse with OLAP capabilities, dimensional modeling, and advanced analytics for business intelligence and reporting.', 'Kevin Zhang', 'Data & Analytics', '2024-10-23 14:45:00', '2023-01-30 09:30:00', 'oracle://dw.company.com:1521/DW', 'jdbc:oracle:thin:@dw.company.com:1521:DW', 'DW_ANALYTICS', 'PKG_ANALYTICS.SP_AGGREGATE_DATA', 'Oracle Wallet + LDAP', 180, 99.5, 'https://docs.company.com/oracle/data-warehouse', 'N', 'dw-team@company.com', 'Data Warehouse', '#data-warehouse');

INSERT INTO API_METADATA (ID, NAME, TYPE, CATEGORY, STATUS, VERSION, DESCRIPTION, OWNER, DEPARTMENT, LAST_UPDATED, CREATED_AT, BASE_URL, CONNECTION_STRING, SCHEMA_NAME, PROCEDURE_NAME, AUTH_METHOD, RESPONSE_TIME, SLA_UPTIME, DOC_URL, HAS_INTERACTIVE_DOCS, CONTACT_EMAIL, CONTACT_TEAM, SLACK_CHANNEL) VALUES
('oracle-003', 'Legacy ERP Integration', 'ORACLE_API', 'integration', 'deprecated', '11g Standard', 'Legacy Oracle ERP system integration. Scheduled for decommission in Q2 2025. Use Modern ERP API instead.', 'Nancy Brown', 'Enterprise Systems', '2024-06-15 10:00:00', '2020-03-10 08:00:00', 'oracle://legacy.company.com:1521/ERP', 'jdbc:oracle:thin:@legacy.company.com:1521:ERP', 'ERP_LEGACY', 'PKG_ERP.SP_GET_ORDERS', 'Legacy Oracle Authentication', 500, 95.0, 'https://docs.company.com/oracle/legacy-erp', 'N', 'erp-team@company.com', 'Enterprise Systems', '#legacy-systems');

-- =============================================================================
-- 2. INSERT INTO API_TAGS
-- =============================================================================

-- REST API Tags
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'notification');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'signature');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'document');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('rest-001', 'FEA');

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
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'weblogic');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'banking');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'abi-code');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'lookup');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-001', 'external-interface');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'data-warehouse');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'olap');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'analytics');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'reporting');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-002', 'bi');

INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-003', 'erp');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-003', 'legacy');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-003', 'integration');
INSERT INTO API_TAGS (API_ID, TAG) VALUES ('oracle-003', 'deprecated');

-- =============================================================================
-- 3. INSERT INTO API_DEPENDENCIES
-- =============================================================================

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('java-001', 'java-002', 'RUNTIME');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('java-001', 'oracle-001', 'DATABASE');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('rest-002', 'java-001', 'SERVICE');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('java-002', 'oracle-001', 'DATABASE');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('java-002', 'oracle-002', 'DATABASE');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('java-003', 'rest-007', 'SECURITY');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('java-004', 'java-002', 'RUNTIME');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('rest-003', 'java-002', 'SERVICE');
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON_ID, DEPENDENCY_TYPE) VALUES ('rest-004', 'java-004', 'SERVICE');

-- =============================================================================
-- 4. INSERT INTO API_DEPENDENTS (Reverse dependencies)
-- =============================================================================

INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-001', 'rest-002', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-002', 'java-001', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-002', 'rest-003', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-002', 'java-004', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-003', 'java-001', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-003', 'rest-001', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-003', 'rest-002', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-004', 'rest-003', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('java-004', 'rest-004', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('oracle-001', 'java-001', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('oracle-001', 'java-002', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('oracle-001', 'rest-001', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('oracle-001', 'rest-002', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('oracle-001', 'oracle-002', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('oracle-002', 'java-002', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('oracle-002', 'rest-003', 'CONSUMER');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT_ID, RELATIONSHIP_TYPE) VALUES ('rest-007', 'java-003', 'CONSUMER');

-- =============================================================================
-- 5. INSERT INTO API_USAGE
-- =============================================================================

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('rest-001', 15000, 250, 0.020, 800, 95, 150, 300);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('rest-002', 85000, 1200, 0.010, 4500, 120, 200, 450);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('rest-003', 65000, 800, 0.030, 3200, 200, 350, 700);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('rest-004', 180000, 3500, 0.015, 9000, 80, 120, 250);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('rest-005', 25000, 150, 0.080, 1200, 180, 300, 600);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('rest-006', 5000, 45, 0.120, 250, 350, 500, 800);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('rest-007', 250000, 4200, 0.005, 12000, 50, 80, 150);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('java-001', 95000, 280, 0.025, 4500, 145, 250, 500);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('java-002', 155000, 420, 0.018, 7200, 85, 150, 300);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('java-003', 75000, 180, 0.008, 3600, 25, 40, 80);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('java-004', 200000, 650, 0.045, 9500, 320, 500, 1000);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('oracle-001', 450000, 1200, 0.012, 20000, 45, 75, 150);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('oracle-002', 85000, 320, 0.028, 4000, 180, 300, 600);

INSERT INTO API_USAGE (API_ID, REQUESTS_PER_DAY, ACTIVE_USERS, ERROR_RATE, PEAK_REQUESTS_PER_HOUR, AVERAGE_RESPONSE_TIME, P95_RESPONSE_TIME, P99_RESPONSE_TIME) VALUES 
('oracle-003', 8000, 25, 0.150, 400, 500, 800, 1200);

-- =============================================================================
-- 6. INSERT INTO API_SAMPLE_REQUESTS
-- =============================================================================

-- Sample requests for REST APIs
INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA, HTTP_METHOD, ENDPOINT) VALUES 
('rest-001', 'Notification Request', 'Request for document signature notification', '{"DM_ID": "DOC_12345"}', 'POST', '/notificaFirmaModulo');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA, HTTP_METHOD, ENDPOINT) VALUES 
('rest-002', 'Process Payment', 'Process credit card payment', '{"merchantId": "MERCH_98765", "amount": 150.00, "currency": "USD", "paymentMethod": "credit_card", "cardDetails": {"cardNumber": "4111111111111111", "expiryMonth": "12", "expiryYear": "2025", "cvv": "123"}, "customerEmail": "customer@example.com"}', 'POST', '/process');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA, HTTP_METHOD, ENDPOINT) VALUES 
('rest-003', 'Generate Sales Report', 'Generate analytics report for sales data', '{"reportType": "sales", "startDate": "2024-01-01", "endDate": "2024-12-31", "metrics": ["revenue", "conversions"], "groupBy": "month"}', 'POST', '/reports');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA, HTTP_METHOD, ENDPOINT) VALUES 
('rest-004', 'Send Notification', 'Send email notification to user', '{"channel": "email", "recipient": "user@example.com", "subject": "Order Confirmation", "message": "Your order #12345 has been confirmed", "priority": "normal", "metadata": {"orderId": "12345", "customerName": "John Doe"}}', 'POST', '/send');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA, HTTP_METHOD, ENDPOINT) VALUES 
('rest-005', 'Create Order', 'Create new e-commerce order', '{"customerId": "CUST_567890", "items": [{"productId": "PROD_123", "quantity": 2, "price": 49.99}, {"productId": "PROD_456", "quantity": 1, "price": 79.99}], "shippingAddress": {"street": "123 Main St", "city": "New York", "zipCode": "10001", "country": "USA"}, "paymentMethod": "credit_card"}', 'POST', '/orders');

-- Sample requests for Java APIs
INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA) VALUES 
('java-001', 'Get Oneri Usura List', 'Retrieve list of wear and tear charges', '{"numeroConto": "F6E9604262501"}');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA) VALUES 
('java-002', 'Process ETL Data', 'Execute ETL data processing job', '{"jobType": "ETL", "sourceConfig": {"type": "database", "connectionString": "jdbc:oracle:thin:@db.company.com:1521:PROD"}, "transformations": ["normalize", "aggregate", "enrich"], "targetConfig": {"type": "warehouse", "table": "DW_SALES_DATA"}, "schedule": "daily"}');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA) VALUES 
('java-003', 'Encrypt Data', 'Encrypt sensitive data using AES-256-GCM', '{"operation": "encrypt", "algorithm": "AES-256-GCM", "data": "sensitive_data_to_encrypt", "keyId": "KEY_ABC123", "options": {"ivLength": 16, "tagLength": 128}}');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA) VALUES 
('java-004', 'Publish Message', 'Publish message to Kafka queue', '{"queue": "orders-queue", "messageType": "ORDER_CREATED", "payload": {"orderId": "ORD_456789", "customerId": "CUST_123", "amount": 299.99, "items": 3}, "priority": "normal", "deliveryMode": "persistent"}');

-- Sample requests for Oracle APIs
INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA) VALUES 
('oracle-001', 'Get ABI Code', 'Retrieve ABI code for bank ID', '{"parameters": [{"name": "IN_ID_BANCA", "value": 12345, "type": "NUMBER"}]}');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA) VALUES 
('oracle-002', 'OLAP Aggregate Query', 'Execute OLAP aggregation query', '{"query": "OLAP_AGGREGATE", "dimensions": ["time", "product", "region"], "measures": ["sales_amount", "quantity", "profit"], "timeRange": {"start": "2024-01-01", "end": "2024-10-23"}, "filters": {"region": ["North", "South"], "product_category": "Electronics"}, "aggregation": "SUM"}');

INSERT INTO API_SAMPLE_REQUESTS (API_ID, REQUEST_NAME, REQUEST_DESCRIPTION, REQUEST_DATA) VALUES 
('oracle-003', 'Get ERP Orders', 'Retrieve orders from legacy ERP system', '{"operation": "GET_ORDERS", "parameters": {"customer_id": "CUST_9876", "date_from": "2024-01-01", "date_to": "2024-06-15", "status": "COMPLETED"}}');

-- =============================================================================
-- 7. INSERT INTO API_SAMPLE_RESPONSES
-- =============================================================================

-- Sample responses for REST APIs
INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, STATUS_CODE, RESPONSE_TIME) VALUES 
('rest-001', 'Notification Success', 'Successful signature notification response', '{"status": "OK", "message": "Document signature notification received successfully"}', 200, 95);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, STATUS_CODE, RESPONSE_TIME) VALUES 
('rest-002', 'Payment Approved', 'Successful payment processing response', '{"transactionId": "TXN_ABC123456", "status": "approved", "amount": 150.00, "currency": "USD", "timestamp": "2024-10-28T14:20:00Z", "authCode": "AUTH789"}', 200, 120);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, STATUS_CODE, RESPONSE_TIME) VALUES 
('rest-003', 'Sales Report Generated', 'Successfully generated sales analytics report', '{"reportId": "rpt_12345", "reportType": "sales", "period": {"start": "2024-01-01", "end": "2024-12-31"}, "results": [{"month": "2024-01", "revenue": 125000.50, "conversions": 450}, {"month": "2024-02", "revenue": 138500.75, "conversions": 520}], "totalRevenue": 1500000.00, "totalConversions": 5800}', 200, 200);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, STATUS_CODE, RESPONSE_TIME) VALUES 
('rest-004', 'Notification Sent', 'Successfully sent email notification', '{"notificationId": "NOTIF_789ABC", "status": "sent", "channel": "email", "recipient": "user@example.com", "sentAt": "2024-10-22T09:15:00Z", "deliveryStatus": "delivered"}', 200, 80);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, STATUS_CODE, RESPONSE_TIME) VALUES 
('rest-005', 'Order Created', 'Successfully created new order', '{"orderId": "ORD_789123", "status": "confirmed", "totalAmount": 179.97, "currency": "USD", "estimatedDelivery": "2024-11-05", "trackingNumber": "TRACK_ABC123"}', 200, 180);

-- Sample responses for Java APIs
INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, RESPONSE_TIME) VALUES 
('java-001', 'Oneri Usura Retrieved', 'Successfully retrieved oneri usura list', '{"success": true, "data": "List of Oneri Usura"}', 145);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, RESPONSE_TIME) VALUES 
('java-002', 'ETL Job Completed', 'Successfully completed ETL processing job', '{"jobId": "JOB_987654", "status": "completed", "recordsProcessed": 125000, "executionTime": 850, "startTime": "2024-10-24T13:00:00Z", "endTime": "2024-10-24T13:14:10Z", "summary": {"extracted": 125000, "transformed": 125000, "loaded": 125000, "errors": 0}}', 85);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, RESPONSE_TIME) VALUES 
('java-003', 'Data Encrypted', 'Successfully encrypted data using AES-256-GCM', '{"success": true, "encryptedData": "U2FsdGVkX1+9z8Y3J...", "iv": "a1b2c3d4e5f6g7h8", "tag": "i9j0k1l2m3n4o5p6", "algorithm": "AES-256-GCM", "keyId": "KEY_ABC123", "timestamp": "2024-10-27T12:30:00Z"}', 25);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, RESPONSE_TIME) VALUES 
('java-004', 'Message Published', 'Successfully published message to queue', '{"messageId": "MSG_789456123", "queue": "orders-queue", "status": "published", "timestamp": "2024-09-30T16:00:00Z", "partitionId": 2, "offset": 150234}', 320);

-- Sample responses for Oracle APIs
INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, RESPONSE_TIME) VALUES 
('oracle-001', 'ABI Code Retrieved', 'Successfully retrieved ABI code for bank', '{"success": true, "data": [{"ABI_CODE": "03069"}], "executionTime": 45, "procedureName": "CRC_FN_ABI_BY_ID_BANK", "schemaName": "WEBLOGIC_DBA", "returnType": "VARCHAR2"}', 45);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, RESPONSE_TIME) VALUES 
('oracle-002', 'OLAP Query Results', 'Successfully executed OLAP aggregation query', '{"success": true, "queryId": "QRY_DW_789", "resultCount": 245, "data": [{"time_period": "2024-Q3", "product": "Laptop Pro", "region": "North", "sales_amount": 1500000, "quantity": 500, "profit": 450000}, {"time_period": "2024-Q3", "product": "Tablet Max", "region": "South", "sales_amount": 950000, "quantity": 800, "profit": 285000}], "executionTime": 180, "timestamp": "2024-10-23T14:45:00Z"}', 180);

INSERT INTO API_SAMPLE_RESPONSES (API_ID, RESPONSE_NAME, RESPONSE_DESCRIPTION, RESPONSE_DATA, RESPONSE_TIME) VALUES 
('oracle-003', 'ERP Orders Retrieved', 'Successfully retrieved orders from legacy ERP', '{"success": true, "deprecationWarning": "This API will be decommissioned in Q2 2025. Please migrate to Modern ERP API.", "recordCount": 12, "data": [{"order_id": "ORD_54321", "customer_id": "CUST_9876", "order_date": "2024-03-15", "total_amount": 5400.00, "status": "COMPLETED"}], "executionTime": 500, "timestamp": "2024-06-15T10:00:00Z"}', 500);

-- =============================================================================
-- 8. INSERT INTO API_ENVIRONMENTS
-- =============================================================================

-- Environment configurations for key APIs
INSERT INTO API_ENVIRONMENTS (API_ID, ENVIRONMENT, BASE_URL, STATUS, DESCRIPTION) VALUES 
('rest-001', 'dev', 'http://soa-dev.bansel.it/osb/GestioneAmministrativaGaranzie', 'active', 'Development environment for notificaFirmaModulo API');

INSERT INTO API_ENVIRONMENTS (API_ID, ENVIRONMENT, BASE_URL, STATUS, DESCRIPTION) VALUES 
('rest-001', 'qa', 'http://soa-qa.bansel.it/osb/GestioneAmministrativaGaranzie', 'active', 'QA environment for notificaFirmaModulo API');

INSERT INTO API_ENVIRONMENTS (API_ID, ENVIRONMENT, BASE_URL, STATUS, DESCRIPTION) VALUES 
('rest-001', 'prod', 'http://soa.bansel.it/osb/GestioneAmministrativaGaranzie', 'active', 'Production environment for notificaFirmaModulo API');

INSERT INTO API_ENVIRONMENTS (API_ID, ENVIRONMENT, BASE_URL, STATUS, DESCRIPTION) VALUES 
('oracle-001', 'dev', 'jdbc:oracle:thin:@weblogic-dev.company.com:1521:DEV/WEBLOGIC_DBA', 'active', 'Development environment for Oracle CRC interface');

INSERT INTO API_ENVIRONMENTS (API_ID, ENVIRONMENT, BASE_URL, STATUS, DESCRIPTION) VALUES 
('oracle-001', 'qa', 'jdbc:oracle:thin:@weblogic-qa.company.com:1521:QA/WEBLOGIC_DBA', 'active', 'QA environment for Oracle CRC interface');

INSERT INTO API_ENVIRONMENTS (API_ID, ENVIRONMENT, BASE_URL, STATUS, DESCRIPTION) VALUES 
('oracle-001', 'uat', 'jdbc:oracle:thin:@weblogic-uat.company.com:1521:UAT/WEBLOGIC_DBA', 'active', 'UAT environment for Oracle CRC interface');

INSERT INTO API_ENVIRONMENTS (API_ID, ENVIRONMENT, BASE_URL, STATUS, DESCRIPTION) VALUES 
('oracle-001', 'prod', 'jdbc:oracle:thin:@weblogic.company.com:1521:PROD/WEBLOGIC_DBA', 'active', 'Production environment for Oracle CRC interface');

-- =============================================================================
-- 9. INSERT INTO API_SEARCH_INDEX
-- =============================================================================

-- Populate search index for all APIs
INSERT INTO API_SEARCH_INDEX (API_ID, SEARCH_TEXT, KEYWORDS) 
SELECT 
    ID,
    NAME || ' ' || DESCRIPTION || ' ' || COALESCE(OWNER, '') || ' ' || COALESCE(DEPARTMENT, ''),
    TYPE || ',' || CATEGORY || ',' || STATUS || ',' || COALESCE(OWNER, '') || ',' || COALESCE(DEPARTMENT, '')
FROM API_METADATA;

-- =============================================================================
-- COMMIT ALL CHANGES
-- =============================================================================
COMMIT;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Check total records inserted
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

-- Sample query to verify complete API data
SELECT 
    am.ID,
    am.NAME,
    am.TYPE,
    am.CATEGORY,
    am.STATUS,
    am.OWNER,
    au.REQUESTS_PER_DAY,
    au.ACTIVE_USERS,
    au.ERROR_RATE,
    COUNT(at.TAG) as TAG_COUNT,
    COUNT(DISTINCT env.ENVIRONMENT) as ENV_COUNT
FROM API_METADATA am
LEFT JOIN API_USAGE au ON am.ID = au.API_ID
LEFT JOIN API_TAGS at ON am.ID = at.API_ID
LEFT JOIN API_ENVIRONMENTS env ON am.ID = env.API_ID
GROUP BY am.ID, am.NAME, am.TYPE, am.CATEGORY, am.STATUS, am.OWNER, au.REQUESTS_PER_DAY, au.ACTIVE_USERS, au.ERROR_RATE
ORDER BY au.REQUESTS_PER_DAY DESC;