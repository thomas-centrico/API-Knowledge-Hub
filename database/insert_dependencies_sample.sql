-- ============================================================================
-- Sample Data for API Dependencies and Dependents Tables
-- This script inserts realistic dependency relationships between APIs
-- ============================================================================

-- Clear existing data (optional - uncomment if you want to start fresh)
-- DELETE FROM API_DEPENDENCIES;
-- DELETE FROM API_DEPENDENTS;

-- ============================================================================
-- AnticipoFatture (Invoice Financing) Dependencies
-- ============================================================================

-- AF REST APIs depend on AF Java Libraries and Oracle procedures
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_001', 'AF_JAVA_001'); -- Invoice Submission uses Core Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_001', 'AF_ORACLE_001'); -- Invoice Submission uses Invoice Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_001', 'CREDITI_JAVA_002'); -- Uses common utilities

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_002', 'AF_JAVA_002'); -- Credit Assessment uses Risk Assessment Library
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_002', 'CREDITI_REST_003'); -- Uses common Risk Assessment
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_002', 'RGDC_REST_001'); -- Uses CRIF credit check

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_003', 'AF_JAVA_001'); -- Funding Management uses Core Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_003', 'CREDITI_REST_004'); -- Uses common Payment Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_003', 'rest-002'); -- Uses Payment Processing API

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_004', 'AF_ORACLE_002'); -- Portfolio Management uses Analytics
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_004', 'rest-003'); -- Uses Analytics Dashboard

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_005', 'AF_ORACLE_003'); -- Collections uses Collections Functions
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_005', 'CREDITI_REST_004'); -- Uses Payment Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_REST_005', 'rest-004'); -- Uses Notification Service

-- AF Java Libraries depend on common utilities and database APIs
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_JAVA_001', 'CREDITI_JAVA_001'); -- Core Processing uses Core Library
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_JAVA_001', 'CREDITI_JAVA_002'); -- Uses Utilities
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_JAVA_001', 'AF_ORACLE_001'); -- Uses Oracle procedures
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_JAVA_001', 'java-001'); -- Uses Logger

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_JAVA_002', 'CREDITI_ORACLE_002'); -- Risk Assessment uses Risk Functions
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_JAVA_002', 'java-001'); -- Uses Logger

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_JAVA_003', 'CREDITI_JAVA_002'); -- Integration Utilities uses common utils
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('AF_JAVA_003', 'java-004'); -- Uses Message Queue Handler

-- ============================================================================
-- Finanziamenti (Financing) Dependencies
-- ============================================================================

-- Finanziamenti REST APIs
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_001', 'FINANZ_JAVA_001'); -- Loan Origination uses Credit Assessment
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_001', 'CREDITI_REST_002'); -- Uses Credit Score API
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_001', 'CREDITI_REST_005'); -- Uses Document Management
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_001', 'RGDC_REST_001'); -- Uses CRIF check

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_002', 'FINANZ_ORACLE_001'); -- Credit Line uses Portfolio Analytics
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_002', 'CREDITI_REST_003'); -- Uses Risk Assessment

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_003', 'FINANZ_JAVA_001'); -- Collateral Valuation uses Credit Engine
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_003', 'rest-003'); -- Uses Analytics

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_004', 'FINANZ_JAVA_002'); -- Interest Rate uses Amortization Calculator
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_004', 'oracle-bank-007'); -- Uses GET_SALDO function

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_005', 'rest-002'); -- Disbursement uses Payment Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_005', 'CREDITI_REST_004'); -- Uses common Payment Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_005', 'rest-004'); -- Uses Notification Service

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_006', 'FINANZ_ORACLE_001'); -- Covenant Monitoring uses Analytics
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_REST_006', 'rest-004'); -- Uses Notification Service

-- Finanziamenti Java Libraries
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_JAVA_001', 'CREDITI_JAVA_001'); -- Credit Assessment uses Core Library
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_JAVA_001', 'CREDITI_ORACLE_002'); -- Uses Risk Functions
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_JAVA_001', 'java-001'); -- Uses Logger

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_JAVA_002', 'CREDITI_JAVA_002'); -- Amortization uses Utilities
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_JAVA_002', 'java-001'); -- Uses Logger

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_JAVA_003', 'CREDITI_JAVA_002'); -- Document Processing uses Utilities
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_JAVA_003', 'CREDITI_REST_005'); -- Uses Document Management API

-- Finanziamenti Oracle APIs
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_ORACLE_001', 'oracle-001'); -- Uses Core Database API
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_ORACLE_002', 'CREDITI_ORACLE_001'); -- Provisioning uses Credit Calculations
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('FINANZ_ORACLE_003', 'oracle-001'); -- Regulatory Reporting uses Core DB

-- ============================================================================
-- CreditiCommon (Common Credit Services) Dependencies
-- ============================================================================

-- CreditiCommon REST APIs
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_001', 'CREDITI_JAVA_001'); -- Loan Application uses Core Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_001', 'CREDITI_REST_002'); -- Uses Credit Score
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_001', 'rest-001'); -- Uses User Management

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_002', 'CREDITI_ORACLE_002'); -- Credit Score uses Risk Functions
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_002', 'RGDC_REST_001'); -- Uses CRIF integration

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_003', 'CREDITI_ORACLE_002'); -- Risk Assessment uses Risk Functions
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_003', 'CREDITI_JAVA_001'); -- Uses Core Processing

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_004', 'rest-002'); -- Payment Processing uses base Payment API
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_004', 'CREDITI_ORACLE_001'); -- Uses Credit Calculations
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_004', 'rest-004'); -- Uses Notification Service

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_REST_005', 'CREDITI_JAVA_002'); -- Document Management uses Utilities

-- CreditiCommon Java Libraries (foundational - minimal dependencies)
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_JAVA_001', 'java-001'); -- Core Processing uses Logger
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_JAVA_001', 'CREDITI_ORACLE_001'); -- Uses Credit Calculations

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_JAVA_002', 'java-001'); -- Utilities uses Logger

-- CreditiCommon Oracle APIs
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_ORACLE_001', 'oracle-001'); -- Uses Core Database API
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('CREDITI_ORACLE_002', 'oracle-001'); -- Uses Core Database API

-- ============================================================================
-- Additional Java APIs Dependencies
-- ============================================================================

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('JAVA_FNE_001', 'CREDITI_JAVA_002'); -- Uses Utilities
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('JAVA_FNE_001', 'java-001'); -- Uses Logger

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('JAVA_AF_001', 'AF_JAVA_003'); -- Uses Integration Utilities
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('JAVA_AF_001', 'java-001'); -- Uses Logger

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('JAVA_FINANZ_001', 'FINANZ_JAVA_001'); -- Uses Credit Assessment Engine
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('JAVA_FINANZ_001', 'java-001'); -- Uses Logger

-- ============================================================================
-- Banking Oracle APIs Dependencies
-- ============================================================================

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('oracle-bank-001', 'oracle-001'); -- ABI lookup uses Core DB
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('oracle-bank-002', 'oracle-001'); -- Bank Code uses Core DB
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('oracle-bank-003', 'oracle-001'); -- ID Bank uses Core DB
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('oracle-bank-004', 'oracle-bank-001'); -- Bank Code by ABI uses ABI lookup
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('oracle-bank-005', 'oracle-001'); -- Nome DB uses Core DB
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('oracle-bank-006', 'oracle-001'); -- Nome Schema uses Core DB
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('oracle-bank-007', 'oracle-001'); -- GET_SALDO uses Core DB

-- ============================================================================
-- Platform REST APIs Dependencies
-- ============================================================================

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-001', 'rest-007'); -- User Management uses Security Service
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-001', 'oracle-001'); -- Uses Core Database

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-002', 'rest-007'); -- Payment uses Security Service
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-002', 'rest-004'); -- Payment uses Notification Service
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-002', 'oracle-001'); -- Uses Core Database

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-003', 'oracle-001'); -- Analytics uses Core Database

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-004', 'java-004'); -- Notification uses Message Queue
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-004', 'rest-007'); -- Uses Security Service

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-005', 'rest-002'); -- E-commerce uses Payment Processing
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-005', 'rest-001'); -- Uses User Management
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-005', 'rest-004'); -- Uses Notification Service

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-007', 'rest-001'); -- Security uses User Management for auth
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('rest-007', 'oracle-001'); -- Uses Core Database

-- ============================================================================
-- RGDC (CRIF Integration) Dependencies
-- ============================================================================

INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('RGDC_REST_001', 'rest-007'); -- Uses Security Service
INSERT INTO API_DEPENDENCIES (API_ID, DEPENDS_ON) VALUES ('RGDC_REST_001', 'CREDITI_JAVA_002'); -- Uses Utilities

-- ============================================================================
-- Dependents (Reverse Dependencies)
-- These show which APIs use/depend on a given API
-- ============================================================================

-- Core utilities are used by many APIs
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'CREDITI_JAVA_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'CREDITI_JAVA_002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'AF_JAVA_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'AF_JAVA_002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'FINANZ_JAVA_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'FINANZ_JAVA_002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'JAVA_FNE_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'JAVA_AF_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-001', 'JAVA_FINANZ_001');

-- CREDITI_JAVA_002 (Utilities) is widely used
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_002', 'AF_REST_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_002', 'AF_JAVA_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_002', 'AF_JAVA_003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_002', 'FINANZ_JAVA_002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_002', 'FINANZ_JAVA_003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_002', 'CREDITI_REST_005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_002', 'JAVA_FNE_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_002', 'RGDC_REST_001');

-- CREDITI_JAVA_001 (Core Processing) is used by many business APIs
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_001', 'AF_JAVA_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_001', 'FINANZ_JAVA_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_001', 'CREDITI_REST_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_JAVA_001', 'CREDITI_REST_003');

-- oracle-001 (Core Database API) is foundational
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'CREDITI_ORACLE_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'CREDITI_ORACLE_002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'FINANZ_ORACLE_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'FINANZ_ORACLE_003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'oracle-bank-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'oracle-bank-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'oracle-bank-003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'oracle-bank-005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'oracle-bank-006');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'oracle-bank-007');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'rest-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'rest-003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('oracle-001', 'rest-007');

-- rest-002 (Payment Processing API) is widely used
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-002', 'AF_REST_003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-002', 'FINANZ_REST_005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-002', 'CREDITI_REST_004');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-002', 'rest-005');

-- rest-004 (Notification Service) is widely used
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-004', 'AF_REST_005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-004', 'FINANZ_REST_005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-004', 'FINANZ_REST_006');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-004', 'CREDITI_REST_004');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-004', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-004', 'rest-005');

-- rest-007 (Security Service) is widely used
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-007', 'rest-001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-007', 'rest-002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-007', 'rest-004');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-007', 'RGDC_REST_001');

-- CREDITI_REST_002 (Credit Score API) is used for credit checks
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_002', 'FINANZ_REST_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_002', 'CREDITI_REST_001');

-- CREDITI_REST_003 (Risk Assessment API) is used for risk evaluation
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_003', 'AF_REST_002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_003', 'FINANZ_REST_002');

-- CREDITI_REST_004 (Payment Processing) is used for payment operations
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_004', 'AF_REST_003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_004', 'AF_REST_005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_004', 'FINANZ_REST_005');

-- CREDITI_REST_005 (Document Management) is used for document handling
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_005', 'FINANZ_REST_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('CREDITI_REST_005', 'FINANZ_JAVA_003');

-- RGDC_REST_001 (CRIF Integration) is used for credit checks
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('RGDC_REST_001', 'AF_REST_002');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('RGDC_REST_001', 'FINANZ_REST_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('RGDC_REST_001', 'CREDITI_REST_002');

-- rest-001 (User Management) is used for authentication
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-001', 'CREDITI_REST_001');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-001', 'rest-005');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-001', 'rest-007');

-- rest-003 (Analytics Dashboard) is used for analytics
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-003', 'AF_REST_004');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('rest-003', 'FINANZ_REST_003');

-- java-004 (Message Queue Handler) is used for messaging
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-004', 'AF_JAVA_003');
INSERT INTO API_DEPENDENTS (API_ID, DEPENDENT) VALUES ('java-004', 'rest-004');

-- ============================================================================
-- Summary Statistics (for reference)
-- ============================================================================
-- Total Dependencies: ~120 relationships
-- Total Dependents: ~70 relationships
-- 
-- Most depended upon APIs:
-- 1. oracle-001 (Core Database API) - 14 dependents
-- 2. java-001 (Logger) - 9 dependents
-- 3. CREDITI_JAVA_002 (Utilities) - 8 dependents
-- 4. rest-004 (Notification Service) - 6 dependents
-- 5. rest-007 (Security Service) - 4 dependents
--
-- APIs with most dependencies:
-- 1. FINANZ_REST_001 (Loan Origination) - 4 dependencies
-- 2. AF_REST_002 (Credit Assessment) - 3 dependencies
-- 3. AF_REST_003 (Funding Management) - 3 dependencies
-- 4. rest-005 (E-commerce API) - 3 dependencies
-- ============================================================================

-- Verify the insertions
SELECT 'Total Dependencies Inserted:' as Info, COUNT(*) as Count FROM API_DEPENDENCIES
UNION ALL
SELECT 'Total Dependents Inserted:', COUNT(*) FROM API_DEPENDENTS;
