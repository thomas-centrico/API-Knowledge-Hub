// SQLite Database Connection and Query Functions
// This module handles all database operations for the API_METADATA table

/**
 * Database configuration
 * Update DB_PATH to point to your local SQLite database file
 */
const DB_PATH = './database/api_metadata.db'; // Update this path to your database location

/**
 * Initialize database connection
 * Note: This approach uses a backend API since React runs in the browser
 * For direct SQLite access, you'll need a Node.js backend
 */

/**
 * Fetch all APIs from the database
 * @returns {Promise<Array>} Array of API objects
 */
export async function getAllAPIs() {
  try {
    // Fetch from backend API server on port 3002
    const response = await fetch('/api/apis');
    if (!response.ok) {
      throw new Error('Failed to fetch APIs');
    }
    const result = await response.json();
    // Handle both formats: direct array or { success, data } object
    return Array.isArray(result) ? result : (result.data || []);
  } catch (error) {
    console.error('Error fetching APIs:', error);
    throw error;
  }
}

/**
 * Fetch a single API by ID
 * @param {string} id - API ID
 * @returns {Promise<Object>} API object
 */
export async function getAPIById(id) {
  try {
    const response = await fetch(`/api/apis/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch API with ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching API ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch APIs by filters
 * @param {Object} filters - Filter criteria
 * @returns {Promise<Array>} Filtered array of API objects
 */
export async function getAPIsByFilters(filters) {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/apis?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch filtered APIs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching filtered APIs:', error);
    throw error;
  }
}

/**
 * Transform database row to API object format
 * @param {Object} row - Database row
 * @returns {Object} Formatted API object
 */
export function transformDatabaseRow(row) {
  return {
    id: row.ID,
    name: row.NAME,
    type: row.TYPE,
    category: row.CATEGORY,
    status: row.STATUS,
    version: row.VERSION,
    description: row.DESCRIPTION,
    owner: row.OWNER,
    department: row.DEPARTMENT,
    lastUpdated: row.LAST_UPDATED,
    createdAt: row.CREATED_AT,
    endpoints: row.ENDPOINTS,
    baseUrl: row.BASE_URL,
    authMethod: row.AUTH_METHOD,
    rateLimit: row.RATE_LIMIT,
    slaUptime: row.SLA_UPTIME,
    responseTime: row.RESPONSE_TIME,
    docUrl: row.DOC_URL,
    hasInteractiveDocs: row.HAS_INTERACTIVE_DOCS === 'true' || row.HAS_INTERACTIVE_DOCS === '1',
    contactEmail: row.CONTACT_EMAIL,
    contactTeam: row.CONTACT_TEAM,
    slackChannel: row.SLACK_CHANNEL,
  };
}
