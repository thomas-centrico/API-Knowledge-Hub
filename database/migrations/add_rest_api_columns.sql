-- Migration: Add REST API specific columns to API_METADATA table
-- This adds support for storing endpoint, method, content type, and sample JSON data

-- Add REST API specific columns
ALTER TABLE API_METADATA ADD COLUMN ENDPOINT VARCHAR(500);
ALTER TABLE API_METADATA ADD COLUMN METHOD VARCHAR(20);
ALTER TABLE API_METADATA ADD COLUMN CONTENT_TYPE VARCHAR(100);

-- Add JSON sample data columns
ALTER TABLE API_METADATA ADD COLUMN SAMPLE_REQUEST_JSON TEXT;
ALTER TABLE API_METADATA ADD COLUMN SAMPLE_RESPONSE_JSON TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_api_metadata_endpoint ON API_METADATA(ENDPOINT);
CREATE INDEX IF NOT EXISTS idx_api_metadata_method ON API_METADATA(METHOD);

-- Migration complete
SELECT 'Migration completed successfully: Added ENDPOINT, METHOD, CONTENT_TYPE, SAMPLE_REQUEST_JSON, SAMPLE_RESPONSE_JSON columns' AS status;
