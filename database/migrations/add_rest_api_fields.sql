-- =============================================================================
-- Migration: Add REST API specific fields to API_METADATA table
-- Date: 2025-11-05
-- Description: Adds ENDPOINT, METHOD, and CONTENT_TYPE columns for REST APIs
-- =============================================================================

-- Add REST API specific columns
ALTER TABLE API_METADATA ADD COLUMN ENDPOINT VARCHAR(500);
ALTER TABLE API_METADATA ADD COLUMN METHOD VARCHAR(20) CHECK (METHOD IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'));
ALTER TABLE API_METADATA ADD COLUMN CONTENT_TYPE VARCHAR(100);

-- Create index for endpoint search
CREATE INDEX IF NOT EXISTS idx_api_metadata_endpoint ON API_METADATA(ENDPOINT);
CREATE INDEX IF NOT EXISTS idx_api_metadata_method ON API_METADATA(METHOD);

-- Update existing REST APIs to have default values
UPDATE API_METADATA 
SET METHOD = 'GET', 
    CONTENT_TYPE = 'application/json',
    ENDPOINT = '/api/v1'
WHERE TYPE = 'REST_API' 
  AND (METHOD IS NULL OR METHOD = '');

COMMIT;
