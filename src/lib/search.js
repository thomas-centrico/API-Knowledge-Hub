import Fuse from 'fuse.js';

// Fuse.js configuration for semantic search
const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 },
    { name: 'department', weight: 0.1 },
    { name: 'owner', weight: 0.05 },
    { name: 'technical.authMethod', weight: 0.05 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

let fuseInstance = null;

/**
 * Initialize or update the Fuse search instance
 */
export const initializeSearch = (apis) => {
  fuseInstance = new Fuse(apis, fuseOptions);
};

/**
 * Perform semantic search on APIs
 */
export const searchAPIs = (query, apis) => {
  if (!query.trim()) {
    return apis;
  }

  if (!fuseInstance) {
    initializeSearch(apis);
  }

  const results = fuseInstance.search(query);
  return results.map(result => result.item);
};

/**
 * Filter APIs based on multiple criteria
 */
export const filterAPIs = (apis, filters) => {
  return apis.filter(api => {
    // Filter by types
    if (filters.types.length > 0 && !filters.types.includes(api.type)) {
      return false;
    }

    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(api.category)) {
      return false;
    }

    // Filter by statuses
    if (filters.statuses.length > 0 && !filters.statuses.includes(api.status)) {
      return false;
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        api.tags.some(apiTag => 
          apiTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Filter by departments
    if (filters.departments.length > 0 && !filters.departments.includes(api.department)) {
      return false;
    }

    return true;
  });
};

/**
 * Generate facets for filtering UI
 */
export const generateFacets = (apis) => {
  const facets = {
    types: { REST_API: 0, JAVA_API: 0, ORACLE_API: 0 },
    categories: {
      authentication: 0,
      payment: 0,
      analytics: 0,
      storage: 0,
      communication: 0,
      security: 0,
      database: 0,
      messaging: 0,
      utilities: 0,
      integration: 0,
    },
    statuses: {
      active: 0,
      deprecated: 0,
      beta: 0,
      maintenance: 0,
    },
    tags: {},
    departments: {},
  };

  apis.forEach(api => {
    // Count types
    facets.types[api.type] = (facets.types[api.type] || 0) + 1;

    // Count categories
    facets.categories[api.category] = (facets.categories[api.category] || 0) + 1;

    // Count statuses
    facets.statuses[api.status] = (facets.statuses[api.status] || 0) + 1;

    // Count tags
    api.tags.forEach(tag => {
      facets.tags[tag] = (facets.tags[tag] || 0) + 1;
    });

    // Count departments
    facets.departments[api.department] = (facets.departments[api.department] || 0) + 1;
  });

  return facets;
};

/**
 * Perform combined search and filter operation
 */
export const searchAndFilter = (apis, filters) => {
  // First apply text search if query exists
  let filteredAPIs = apis;
  
  if (filters.query.trim()) {
    filteredAPIs = searchAPIs(filters.query, apis);
  }

  // Then apply filters
  filteredAPIs = filterAPIs(filteredAPIs, filters);

  // Generate facets from all APIs (not filtered) for better UX
  const facets = generateFacets(apis);

  return {
    apis: filteredAPIs,
    totalCount: filteredAPIs.length,
    facets,
  };
};

/**
 * Sort APIs by various criteria
 */
export const sortAPIs = (apis, field, direction = 'asc') => {
  return [...apis].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];

    // Handle nested objects
    if (field === 'usage.requestsPerDay') {
      aValue = a.usage?.requestsPerDay || 0;
      bValue = b.usage?.requestsPerDay || 0;
    } else if (field === 'technical.responseTime') {
      aValue = a.technical?.responseTime || 0;
      bValue = b.technical?.responseTime || 0;
    }

    // Handle different data types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

/**
 * Get popular tags from APIs
 */
export const getPopularTags = (apis, limit = 10) => {
  const tagCounts = {};
  
  apis.forEach(api => {
    api.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
};

/**
 * Get API recommendations based on current selection
 */
export const getRecommendations = (selectedAPI, allAPIs, limit = 5) => {
  if (!selectedAPI) return [];

  const scores = allAPIs
    .filter(api => api.id !== selectedAPI.id)
    .map(api => {
      let score = 0;

      // Same category bonus
      if (api.category === selectedAPI.category) score += 3;

      // Same department bonus
      if (api.department === selectedAPI.department) score += 2;

      // Common tags bonus
      const commonTags = api.tags.filter(tag => selectedAPI.tags.includes(tag));
      score += commonTags.length;

      // Dependency relationship bonus
      if (selectedAPI.dependencies.includes(api.id) || 
          selectedAPI.dependents.includes(api.id) ||
          api.dependencies.includes(selectedAPI.id) ||
          api.dependents.includes(selectedAPI.id)) {
        score += 5;
      }

      return { api, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scores.map(({ api }) => api);
};

/**
 * Create empty search filters
 */
export const createEmptyFilters = () => ({
  query: '',
  types: [],
  categories: [],
  statuses: [],
  tags: [],
  departments: [],
});

/**
 * Check if filters are empty (no active filters)
 */
export const areFiltersEmpty = (filters) => {
  return (
    !filters.query.trim() &&
    filters.types.length === 0 &&
    filters.categories.length === 0 &&
    filters.statuses.length === 0 &&
    filters.tags.length === 0 &&
    filters.departments.length === 0
  );
};