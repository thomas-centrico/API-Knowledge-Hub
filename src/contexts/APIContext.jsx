import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { sampleAPIs } from '../data/sampleData.js';
import { searchAndFilter, createEmptyFilters, initializeSearch } from '../lib/search.js';
import { createGraphData } from '../lib/graph.js';

// Initial state
const initialState = {
  apis: [],
  filteredApis: [],
  searchFilters: createEmptyFilters(),
  viewMode: 'grid',
  selectedAPI: null,
  detailViewAPI: null,
  graphData: { nodes: [], links: [] },
  loading: false,
  error: null,
};

// Reducer function
const apiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
      
    case 'SET_APIS':
      return { ...state, apis: action.payload, loading: false };
      
    case 'SET_FILTERS':
      return { ...state, searchFilters: action.payload };
      
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
      
    case 'SET_SELECTED_API':
      return { ...state, selectedAPI: action.payload };
      
    case 'SET_DETAIL_VIEW_API':
      return { ...state, detailViewAPI: action.payload };
      
    case 'SET_FILTERED_APIS':
      return { ...state, filteredApis: action.payload };
      
    case 'SET_GRAPH_DATA':
      return { ...state, graphData: action.payload };
      
    default:
      return state;
  }
};

// Create context
const APIContext = createContext(null);

// Context provider component
export const APIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // Initialize APIs on mount
  useEffect(() => {
    const loadAPIs = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Load from localStorage if available, otherwise use sample data
        const storedAPIs = localStorage.getItem('customAPIs');
        const apisToLoad = storedAPIs ? JSON.parse(storedAPIs) : sampleAPIs;
        
        // Initialize search with loaded data
        initializeSearch(apisToLoad);
        
        // Set APIs and initial filtered data
        dispatch({ type: 'SET_APIS', payload: apisToLoad });
        dispatch({ type: 'SET_FILTERED_APIS', payload: apisToLoad });
        
        // Generate initial graph data
        const graphData = createGraphData(apisToLoad);
        dispatch({ type: 'SET_GRAPH_DATA', payload: graphData });
        
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load APIs' });
      }
    };

    loadAPIs();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    if (state.apis.length > 0) {
      const result = searchAndFilter(state.apis, state.searchFilters);
      dispatch({ type: 'SET_FILTERED_APIS', payload: result.apis });
    }
  }, [state.searchFilters, state.apis]);

  // Update graph data when filtered APIs change
  useEffect(() => {
    if (state.filteredApis.length > 0) {
      const graphData = createGraphData(state.filteredApis);
      dispatch({ type: 'SET_GRAPH_DATA', payload: graphData });
    }
  }, [state.filteredApis]);

  // Context actions
  const actions = {
    setFilters: (filters) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },

    setViewMode: (mode) => {
      dispatch({ type: 'SET_VIEW_MODE', payload: mode });
    },

    setSelectedAPI: (api) => {
      dispatch({ type: 'SET_SELECTED_API', payload: api });
    },

    setDetailViewAPI: (api) => {
      dispatch({ type: 'SET_DETAIL_VIEW_API', payload: api });
    },

    clearFilters: () => {
      const emptyFilters = createEmptyFilters();
      dispatch({ type: 'SET_FILTERS', payload: emptyFilters });
    },

    searchAPIs: (query) => {
      const newFilters = { ...state.searchFilters, query };
      dispatch({ type: 'SET_FILTERS', payload: newFilters });
    },

    filterByType: (types) => {
      const newFilters = { ...state.searchFilters, types };
      dispatch({ type: 'SET_FILTERS', payload: newFilters });
    },

    filterByCategory: (categories) => {
      const newFilters = { ...state.searchFilters, categories };
      dispatch({ type: 'SET_FILTERS', payload: newFilters });
    },

    filterByStatus: (statuses) => {
      const newFilters = { ...state.searchFilters, statuses };
      dispatch({ type: 'SET_FILTERS', payload: newFilters });
    },

    filterByTags: (tags) => {
      const newFilters = { ...state.searchFilters, tags };
      dispatch({ type: 'SET_FILTERS', payload: newFilters });
    },

    filterByDepartments: (departments) => {
      const newFilters = { ...state.searchFilters, departments };
      dispatch({ type: 'SET_FILTERS', payload: newFilters });
    },

    refreshAPIs: () => {
      // Simulate refresh
      dispatch({ type: 'SET_LOADING', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_APIS', payload: sampleAPIs });
      }, 1000);
    },

    // Admin operations
    addAPI: (apiData) => {
      const newAPI = {
        ...apiData,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      const updatedAPIs = [...state.apis, newAPI];
      dispatch({ type: 'SET_APIS', payload: updatedAPIs });
      initializeSearch(updatedAPIs);
      
      // Store in localStorage for persistence
      localStorage.setItem('customAPIs', JSON.stringify(updatedAPIs));
    },

    updateAPI: (apiData) => {
      const updatedAPIs = state.apis.map(api => 
        api.id === apiData.id 
          ? { ...apiData, lastUpdated: new Date().toISOString() }
          : api
      );
      dispatch({ type: 'SET_APIS', payload: updatedAPIs });
      initializeSearch(updatedAPIs);
      
      // Store in localStorage for persistence
      localStorage.setItem('customAPIs', JSON.stringify(updatedAPIs));
    },

    deleteAPI: (apiId) => {
      const updatedAPIs = state.apis.filter(api => api.id !== apiId);
      dispatch({ type: 'SET_APIS', payload: updatedAPIs });
      initializeSearch(updatedAPIs);
      
      // Store in localStorage for persistence
      localStorage.setItem('customAPIs', JSON.stringify(updatedAPIs));
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  );
};

// Custom hook to use the API context
export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};

// Helper hook for filtered data with additional computed properties
export const useFilteredAPIs = () => {
  const { filteredApis, searchFilters } = useAPI();
  
  return {
    apis: filteredApis,
    totalCount: filteredApis.length,
    hasResults: filteredApis.length > 0,
    isEmpty: filteredApis.length === 0,
    hasFilters: Object.values(searchFilters).some(value => 
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    ),
  };
};

// Helper hook for graph data
export const useGraphData = () => {
  const { graphData, apis, viewMode } = useAPI();
  
  return {
    ...graphData,
    isGraphView: viewMode === 'graph',
    nodeCount: graphData.nodes.length,
    linkCount: graphData.links.length,
    hasData: graphData.nodes.length > 0,
  };
};

// Export context for external use if needed
export default APIContext;