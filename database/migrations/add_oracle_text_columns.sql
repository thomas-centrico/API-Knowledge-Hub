-- =============================================================================
-- Migration: Add Oracle API Text Columns
-- Description: Adds SAMPLE_CALL_TEXT and SAMPLE_RESULT_TEXT columns for Oracle APIs
--              These columns store plain text instead of JSON format
-- Date: 2025-11-06
-- =============================================================================

BEGIN TRANSACTION;

-- Add plain text columns for Oracle API sample data
ALTER TABLE API_METADATA ADD COLUMN SAMPLE_CALL_TEXT TEXT;
ALTER TABLE API_METADATA ADD COLUMN SAMPLE_RESULT_TEXT TEXT;

-- Add comment column to track column purpose
-- SAMPLE_CALL_TEXT: Stores plain text Oracle API calls (not JSON)
-- SAMPLE_RESULT_TEXT: Stores plain text Oracle API results (not JSON)
-- SAMPLE_REQUEST_JSON: Stores JSON format REST/JAVA API requests
-- SAMPLE_RESPONSE_JSON: Stores JSON format REST/JAVA API responses

SELECT 'Migration completed successfully: Added SAMPLE_CALL_TEXT, SAMPLE_RESULT_TEXT columns for Oracle APIs' AS status;

COMMIT;
