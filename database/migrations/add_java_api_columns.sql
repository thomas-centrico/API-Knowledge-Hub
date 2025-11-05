-- =============================================================================
-- Migration: Add Java API Columns
-- Description: Adds PACKAGE_NAME, CLASS_NAME, METHOD_NAME, INTERFACE_NAME, 
--              API_SIGNATURE columns for Java API technical details
-- Date: 2025-11-06
-- =============================================================================

BEGIN TRANSACTION;

-- Add Java API specific columns
ALTER TABLE API_METADATA ADD COLUMN PACKAGE_NAME VARCHAR(255);
ALTER TABLE API_METADATA ADD COLUMN CLASS_NAME VARCHAR(255);
ALTER TABLE API_METADATA ADD COLUMN METHOD_NAME VARCHAR(255);
ALTER TABLE API_METADATA ADD COLUMN INTERFACE_NAME VARCHAR(255);
ALTER TABLE API_METADATA ADD COLUMN API_SIGNATURE TEXT;

-- Column descriptions:
-- PACKAGE_NAME: Java package name (e.g., com.example.api)
-- CLASS_NAME: Java class name (e.g., UserService)
-- METHOD_NAME: Java method name (e.g., getUserById)
-- INTERFACE_NAME: Java interface name if applicable
-- API_SIGNATURE: Full method signature with parameters

SELECT 'Migration completed successfully: Added Java API columns (PACKAGE_NAME, CLASS_NAME, METHOD_NAME, INTERFACE_NAME, API_SIGNATURE)' AS status;

COMMIT;
