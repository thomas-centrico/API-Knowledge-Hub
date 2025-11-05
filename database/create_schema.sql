-- =============================================================================
-- API KNOWLEDGE HUB DATABASE SCHEMA
-- SQLite Database Schema for API Management Platform
-- =============================================================================

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- =============================================================================
-- 1. API_METADATA - Core API Information
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_METADATA (
    ID VARCHAR(50) PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    TYPE VARCHAR(20) NOT NULL CHECK (TYPE IN ('REST_API', 'JAVA_API', 'ORACLE_API')),
    CATEGORY VARCHAR(50) NOT NULL,
    STATUS VARCHAR(20) NOT NULL CHECK (STATUS IN ('active', 'deprecated', 'beta', 'maintenance')),
    VERSION VARCHAR(50),
    DESCRIPTION TEXT,
    OWNER VARCHAR(100),
    DEPARTMENT VARCHAR(100),
    LAST_UPDATED TIMESTAMP,
    CREATED_AT TIMESTAMP,
    
    -- Technical Details
    ENDPOINTS INTEGER, -- Number of endpoints for REST APIs
    BASE_URL VARCHAR(500),
    AUTH_METHOD VARCHAR(100),
    RATE_LIMIT VARCHAR(200),
    SLA_UPTIME DECIMAL(5,2),
    RESPONSE_TIME INTEGER, -- in milliseconds
    
    -- Documentation
    DOC_URL VARCHAR(500),
    HAS_INTERACTIVE_DOCS CHAR(1) CHECK (HAS_INTERACTIVE_DOCS IN ('Y', 'N')),
    
    -- Contact Information
    CONTACT_EMAIL VARCHAR(255),
    CONTACT_TEAM VARCHAR(100),
    SLACK_CHANNEL VARCHAR(100),
    
    -- Java API specific fields
    PACKAGE_NAME VARCHAR(255),
    CLASS_NAME VARCHAR(255),
    METHOD_NAME VARCHAR(255),
    INTERFACE_NAME VARCHAR(255),
    API_SIGNATURE TEXT,
    
    -- Oracle API specific fields
    SCHEMA_NAME VARCHAR(100),
    PROCEDURE_NAME VARCHAR(255),
    FUNCTION_SIGNATURE TEXT,
    CONNECTION_STRING VARCHAR(500),
    
    -- Metadata
    CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFIED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 2. API_TAGS - Tags for API categorization and search
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_TAGS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    TAG VARCHAR(100) NOT NULL,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    UNIQUE(API_ID, TAG)
);

-- =============================================================================
-- 3. API_DEPENDENCIES - API dependency relationships
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_DEPENDENCIES (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    DEPENDS_ON_ID VARCHAR(50) NOT NULL,
    DEPENDENCY_TYPE VARCHAR(50) DEFAULT 'RUNTIME',
    DESCRIPTION TEXT,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    FOREIGN KEY (DEPENDS_ON_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    UNIQUE(API_ID, DEPENDS_ON_ID)
);

-- =============================================================================
-- 4. API_DEPENDENTS - Reverse dependency tracking
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_DEPENDENTS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    DEPENDENT_ID VARCHAR(50) NOT NULL,
    RELATIONSHIP_TYPE VARCHAR(50) DEFAULT 'CONSUMER',
    DESCRIPTION TEXT,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    FOREIGN KEY (DEPENDENT_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    UNIQUE(API_ID, DEPENDENT_ID)
);

-- =============================================================================
-- 5. API_USAGE - Usage statistics and metrics
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_USAGE (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    REQUESTS_PER_DAY INTEGER DEFAULT 0,
    ACTIVE_USERS INTEGER DEFAULT 0,
    ERROR_RATE DECIMAL(5,3) DEFAULT 0.000,
    PEAK_REQUESTS_PER_HOUR INTEGER DEFAULT 0,
    AVERAGE_RESPONSE_TIME INTEGER DEFAULT 0,
    P95_RESPONSE_TIME INTEGER DEFAULT 0,
    P99_RESPONSE_TIME INTEGER DEFAULT 0,
    LAST_UPDATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    UNIQUE(API_ID)
);

-- =============================================================================
-- 6. API_SAMPLE_REQUESTS - Sample request examples
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_SAMPLE_REQUESTS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    REQUEST_NAME VARCHAR(255),
    REQUEST_DESCRIPTION TEXT,
    REQUEST_DATA TEXT, -- JSON format
    REQUEST_HEADERS TEXT, -- JSON format
    HTTP_METHOD VARCHAR(10),
    ENDPOINT VARCHAR(500),
    CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE
);

-- =============================================================================
-- 7. API_SAMPLE_RESPONSES - Sample response examples
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_SAMPLE_RESPONSES (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    REQUEST_ID INTEGER,
    RESPONSE_NAME VARCHAR(255),
    RESPONSE_DESCRIPTION TEXT,
    RESPONSE_DATA TEXT, -- JSON format
    RESPONSE_HEADERS TEXT, -- JSON format
    STATUS_CODE INTEGER,
    RESPONSE_TIME INTEGER,
    CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    FOREIGN KEY (REQUEST_ID) REFERENCES API_SAMPLE_REQUESTS(ID) ON DELETE SET NULL
);

-- =============================================================================
-- 8. API_ENVIRONMENTS - Environment-specific configurations
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_ENVIRONMENTS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    ENVIRONMENT VARCHAR(20) NOT NULL CHECK (ENVIRONMENT IN ('dev', 'qa', 'uat', 'staging', 'prod')),
    BASE_URL VARCHAR(500),
    STATUS VARCHAR(20) DEFAULT 'active',
    DESCRIPTION TEXT,
    CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    UNIQUE(API_ID, ENVIRONMENT)
);

-- =============================================================================
-- 9. API_VERSIONS - Version history tracking
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_VERSIONS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    VERSION VARCHAR(50) NOT NULL,
    RELEASE_DATE TIMESTAMP,
    STATUS VARCHAR(20) DEFAULT 'active',
    CHANGELOG TEXT,
    BREAKING_CHANGES TEXT,
    MIGRATION_GUIDE TEXT,
    CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    UNIQUE(API_ID, VERSION)
);

-- =============================================================================
-- 10. API_SEARCH_INDEX - Full-text search support
-- =============================================================================
CREATE TABLE IF NOT EXISTS API_SEARCH_INDEX (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    API_ID VARCHAR(50) NOT NULL,
    SEARCH_TEXT TEXT,
    KEYWORDS TEXT,
    LAST_INDEXED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (API_ID) REFERENCES API_METADATA(ID) ON DELETE CASCADE,
    UNIQUE(API_ID)
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Primary search indexes
CREATE INDEX IF NOT EXISTS idx_api_metadata_type ON API_METADATA(TYPE);
CREATE INDEX IF NOT EXISTS idx_api_metadata_category ON API_METADATA(CATEGORY);
CREATE INDEX IF NOT EXISTS idx_api_metadata_status ON API_METADATA(STATUS);
CREATE INDEX IF NOT EXISTS idx_api_metadata_owner ON API_METADATA(OWNER);
CREATE INDEX IF NOT EXISTS idx_api_metadata_department ON API_METADATA(DEPARTMENT);
CREATE INDEX IF NOT EXISTS idx_api_metadata_last_updated ON API_METADATA(LAST_UPDATED);

-- Tag search indexes
CREATE INDEX IF NOT EXISTS idx_api_tags_tag ON API_TAGS(TAG);
CREATE INDEX IF NOT EXISTS idx_api_tags_api_id ON API_TAGS(API_ID);

-- Dependency indexes
CREATE INDEX IF NOT EXISTS idx_api_dependencies_api_id ON API_DEPENDENCIES(API_ID);
CREATE INDEX IF NOT EXISTS idx_api_dependencies_depends_on ON API_DEPENDENCIES(DEPENDS_ON_ID);
CREATE INDEX IF NOT EXISTS idx_api_dependents_api_id ON API_DEPENDENTS(API_ID);
CREATE INDEX IF NOT EXISTS idx_api_dependents_dependent_id ON API_DEPENDENTS(DEPENDENT_ID);

-- Usage indexes
CREATE INDEX IF NOT EXISTS idx_api_usage_requests_per_day ON API_USAGE(REQUESTS_PER_DAY);
CREATE INDEX IF NOT EXISTS idx_api_usage_active_users ON API_USAGE(ACTIVE_USERS);
CREATE INDEX IF NOT EXISTS idx_api_usage_error_rate ON API_USAGE(ERROR_RATE);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_api_search_keywords ON API_SEARCH_INDEX(KEYWORDS);

-- =============================================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =============================================================================

-- Update modified_date when API_METADATA is updated
CREATE TRIGGER IF NOT EXISTS update_api_metadata_modified_date 
    AFTER UPDATE ON API_METADATA
BEGIN
    UPDATE API_METADATA 
    SET MODIFIED_DATE = CURRENT_TIMESTAMP 
    WHERE ID = NEW.ID;
END;

-- Update search index when API metadata changes
CREATE TRIGGER IF NOT EXISTS update_search_index_on_api_change
    AFTER UPDATE ON API_METADATA
BEGIN
    INSERT OR REPLACE INTO API_SEARCH_INDEX (API_ID, SEARCH_TEXT, KEYWORDS, LAST_INDEXED)
    VALUES (
        NEW.ID,
        NEW.NAME || ' ' || NEW.DESCRIPTION || ' ' || COALESCE(NEW.OWNER, '') || ' ' || COALESCE(NEW.DEPARTMENT, ''),
        NEW.TYPE || ',' || NEW.CATEGORY || ',' || NEW.STATUS || ',' || COALESCE(NEW.OWNER, '') || ',' || COALESCE(NEW.DEPARTMENT, ''),
        CURRENT_TIMESTAMP
    );
END;

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- Comprehensive API view with all related data
CREATE VIEW IF NOT EXISTS v_api_complete AS
SELECT 
    am.*,
    au.REQUESTS_PER_DAY,
    au.ACTIVE_USERS,
    au.ERROR_RATE,
    au.PEAK_REQUESTS_PER_HOUR,
    au.AVERAGE_RESPONSE_TIME,
    au.P95_RESPONSE_TIME,
    au.P99_RESPONSE_TIME,
    GROUP_CONCAT(at.TAG, ',') as TAGS,
    (SELECT COUNT(*) FROM API_DEPENDENCIES ad WHERE ad.API_ID = am.ID) as DEPENDENCY_COUNT,
    (SELECT COUNT(*) FROM API_DEPENDENTS adp WHERE adp.API_ID = am.ID) as DEPENDENT_COUNT
FROM API_METADATA am
LEFT JOIN API_USAGE au ON am.ID = au.API_ID
LEFT JOIN API_TAGS at ON am.ID = at.API_ID
GROUP BY am.ID;

-- Popular APIs view
CREATE VIEW IF NOT EXISTS v_popular_apis AS
SELECT 
    am.ID,
    am.NAME,
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

-- Dependency graph view
CREATE VIEW IF NOT EXISTS v_dependency_graph AS
SELECT 
    ad.API_ID,
    am1.NAME as API_NAME,
    ad.DEPENDS_ON_ID,
    am2.NAME as DEPENDS_ON_NAME,
    ad.DEPENDENCY_TYPE,
    am1.TYPE as API_TYPE,
    am2.TYPE as DEPENDENCY_TYPE_API
FROM API_DEPENDENCIES ad
JOIN API_METADATA am1 ON ad.API_ID = am1.ID
JOIN API_METADATA am2 ON ad.DEPENDS_ON_ID = am2.ID;

-- =============================================================================
-- INITIAL DATA POPULATION FUNCTIONS
-- =============================================================================

-- Function to calculate API health score
-- (This would be implemented in application logic, but defined here for reference)
-- Health Score = (SLA_UPTIME * 0.4) + ((1 - ERROR_RATE) * 100 * 0.3) + (Response_Time_Score * 0.3)

COMMIT;