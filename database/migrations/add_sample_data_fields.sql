-- =============================================================================
-- Migration: Add Sample Request/Response fields to API_METADATA table
-- Date: 2025-11-05
-- Description: Adds SAMPLE_REQUEST_JSON and SAMPLE_RESPONSE_JSON columns
-- =============================================================================

-- Add sample request/response columns as TEXT to store JSON
ALTER TABLE API_METADATA ADD COLUMN SAMPLE_REQUEST_JSON TEXT;
ALTER TABLE API_METADATA ADD COLUMN SAMPLE_RESPONSE_JSON TEXT;

-- No need for indexes on JSON text fields

COMMIT;
