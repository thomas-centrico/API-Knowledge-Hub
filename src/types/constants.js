// API Types Constants
export const API_TYPES = {
  REST_API: 'REST_API',
  JAVA_API: 'JAVA_API',
  ORACLE_API: 'ORACLE_API'
};

export const API_STATUSES = {
  ACTIVE: 'active',
  DEPRECATED: 'deprecated',
  BETA: 'beta',
  MAINTENANCE: 'maintenance'
};

export const API_CATEGORIES = {
  AUTHENTICATION: 'authentication',
  PAYMENT: 'payment',
  ANALYTICS: 'analytics',
  STORAGE: 'storage',
  COMMUNICATION: 'communication',
  SECURITY: 'security',
  DATABASE: 'database',
  MESSAGING: 'messaging',
  UTILITIES: 'utilities',
  INTEGRATION: 'integration'
};

export const VIEW_MODES = {
  GRID: 'grid',
  GRAPH: 'graph',
  LIST: 'list'
};

// PropTypes-like validation helpers (optional)
export const validateAPI = (api) => {
  return (
    api &&
    typeof api.id === 'string' &&
    typeof api.name === 'string' &&
    Object.values(API_TYPES).includes(api.type) &&
    Object.values(API_CATEGORIES).includes(api.category) &&
    Object.values(API_STATUSES).includes(api.status)
  );
};

export const createEmptyFilters = () => ({
  query: '',
  types: [],
  categories: [],
  statuses: [],
  tags: [],
  departments: [],
});

export const createEmptyAppState = () => ({
  apis: [],
  filteredApis: [],
  searchFilters: createEmptyFilters(),
  viewMode: VIEW_MODES.GRID,
  selectedAPI: null,
  graphData: { nodes: [], links: [] },
  loading: false,
  error: null,
});