-- Migration to add ENDPOINT and CONTENT_TYPE fields to API_METADATA table
-- These fields are needed for REST API configurations

-- Add ENDPOINT column if it doesn't exist
ALTER TABLE API_METADATA ADD COLUMN ENDPOINT VARCHAR(500);

-- Add CONTENT_TYPE column if it doesn't exist  
ALTER TABLE API_METADATA ADD COLUMN CONTENT_TYPE VARCHAR(100);

-- Add index for endpoint searches
CREATE INDEX IF NOT EXISTS idx_api_metadata_endpoint ON API_METADATA(ENDPOINT);
