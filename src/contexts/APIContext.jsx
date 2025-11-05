import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { sampleAPIs } from '../data/sampleData.js'; // Fallback for when API server is unavailable
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
  dataSource: 'static', // Track whether we're using 'database' or 'static' data
  databaseAvailable: false, // Track if database API server is available
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
      
    case 'SET_DATA_SOURCE':
      return { ...state, dataSource: action.payload };
      
    case 'SET_DATABASE_AVAILABLE':
      return { ...state, databaseAvailable: action.payload };
      
    default:
      return state;
  }
};

// Create context
const APIContext = createContext(null);

// Context provider component
export const APIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // Function to fetch APIs from database
  const fetchAPIsFromDatabase = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/apis');
      if (!response.ok) throw new Error('Database API server not responding');
      
      const data = await response.json();
      if (data.success && data.data) {
        dispatch({ type: 'SET_DATABASE_AVAILABLE', payload: true });
        return { apis: data.data, source: 'database' };
      }
      throw new Error('Invalid database response');
    } catch (error) {
      console.log('Database not available, falling back to static data:', error.message);
      dispatch({ type: 'SET_DATABASE_AVAILABLE', payload: false });
      return null;
    }
  };

  // Initialize APIs on mount
  useEffect(() => {
    const loadAPIs = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let apisToLoad = [];
        let dataSource = 'static';
        
        // Try to load from database first
        const databaseResult = await fetchAPIsFromDatabase();
        
        if (databaseResult) {
          // Database is available, use database data
          apisToLoad = databaseResult.apis;
          dataSource = 'database';
          console.log('✅ Loading APIs from database:', apisToLoad.length);
        } else {
          // Database not available, check localStorage, then fallback to static
          const storedAPIs = localStorage.getItem('customAPIs');
          apisToLoad = storedAPIs ? JSON.parse(storedAPIs) : sampleAPIs;
          dataSource = 'static';
          console.log('📄 Loading APIs from static data:', apisToLoad.length);
        }
        
        // Set data source
        dispatch({ type: 'SET_DATA_SOURCE', payload: dataSource });
        
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
        console.error('Error loading APIs:', error);
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

    refreshAPIs: async () => {
      // Refresh data from current source
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        let apisToLoad = [];
        let dataSource = 'static';
        
        // Try database first
        const databaseResult = await fetchAPIsFromDatabase();
        
        if (databaseResult) {
          apisToLoad = databaseResult.apis;
          dataSource = 'database';
          console.log('🔄 Refreshed APIs from database:', apisToLoad.length);
        } else {
          // Fallback to static data
          const storedAPIs = localStorage.getItem('customAPIs');
          apisToLoad = storedAPIs ? JSON.parse(storedAPIs) : sampleAPIs;
          dataSource = 'static';
          console.log('🔄 Refreshed APIs from static data:', apisToLoad.length);
        }
        
        dispatch({ type: 'SET_DATA_SOURCE', payload: dataSource });
        dispatch({ type: 'SET_APIS', payload: apisToLoad });
        initializeSearch(apisToLoad);
        
      } catch (error) {
        console.error('Error refreshing APIs:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh APIs' });
      }
    },

    // Admin operations
    addAPI: async (apiData) => {
      if (state.dataSource === 'database' && state.databaseAvailable) {
        // Add to database
        try {
          const response = await fetch('http://localhost:3002/api/apis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData),
          });
          
          const result = await response.json();
          
          if (!response.ok) {
            throw new Error(result.error || 'Failed to add API to database');
          }
          
          console.log('✅ API added to database:', result.message);
          
          // Refresh data from database
          const databaseResult = await fetchAPIsFromDatabase();
          if (databaseResult) {
            dispatch({ type: 'SET_APIS', payload: databaseResult.apis });
            initializeSearch(databaseResult.apis);
          }
          
        } catch (error) {
          console.error('❌ Error adding API to database:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to add API to database' });
        }
      } else {
        // Add to local state (static data)
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
      }
    },

    updateAPI: async (apiData) => {
      if (state.dataSource === 'database' && state.databaseAvailable) {
        // Update in database
        try {
          const response = await fetch(`http://localhost:3002/api/apis/${apiData.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData),
          });
          
          const result = await response.json();
          
          if (!response.ok) {
            throw new Error(result.error || 'Failed to update API in database');
          }
          
          console.log('✅ API updated in database:', result.message);
          
          // Refresh data from database
          const databaseResult = await fetchAPIsFromDatabase();
          if (databaseResult) {
            dispatch({ type: 'SET_APIS', payload: databaseResult.apis });
            initializeSearch(databaseResult.apis);
          }
          
        } catch (error) {
          console.error('❌ Error updating API in database:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to update API in database' });
        }
      } else {
        // Update in local state (static data)
        const updatedAPIs = state.apis.map(api => 
          api.id === apiData.id 
            ? { ...apiData, lastUpdated: new Date().toISOString() }
            : api
        );
        dispatch({ type: 'SET_APIS', payload: updatedAPIs });
        initializeSearch(updatedAPIs);
        
        // Store in localStorage for persistence
        localStorage.setItem('customAPIs', JSON.stringify(updatedAPIs));
      }
    },

    deleteAPI: async (apiId) => {
      if (state.dataSource === 'database' && state.databaseAvailable) {
        // Delete from database
        try {
          const response = await fetch(`http://localhost:3002/api/apis/${apiId}`, {
            method: 'DELETE',
          });
          
          const result = await response.json();
          
          if (!response.ok) {
            throw new Error(result.error || 'Failed to delete API from database');
          }
          
          console.log('✅ API deleted from database:', result.message);
          
          // Refresh data from database
          const databaseResult = await fetchAPIsFromDatabase();
          if (databaseResult) {
            dispatch({ type: 'SET_APIS', payload: databaseResult.apis });
            initializeSearch(databaseResult.apis);
          }
          
        } catch (error) {
          console.error('❌ Error deleting API from database:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to delete API from database' });
        }
      } else {
        // Delete from local state (static data)
        const updatedAPIs = state.apis.filter(api => api.id !== apiId);
        dispatch({ type: 'SET_APIS', payload: updatedAPIs });
        initializeSearch(updatedAPIs);
        
        // Store in localStorage for persistence
        localStorage.setItem('customAPIs', JSON.stringify(updatedAPIs));
      }
    },

    // Data source management
    switchToDatabase: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const databaseResult = await fetchAPIsFromDatabase();
        
        if (databaseResult) {
          dispatch({ type: 'SET_DATA_SOURCE', payload: 'database' });
          dispatch({ type: 'SET_APIS', payload: databaseResult.apis });
          initializeSearch(databaseResult.apis);
          console.log('✅ Switched to database data');
        } else {
          throw new Error('Database not available');
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to switch to database' });
        console.error('Error switching to database:', error);
      }
    },

    switchToStatic: () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const storedAPIs = localStorage.getItem('customAPIs');
        const apisToLoad = storedAPIs ? JSON.parse(storedAPIs) : sampleAPIs;
        
        dispatch({ type: 'SET_DATA_SOURCE', payload: 'static' });
        dispatch({ type: 'SET_APIS', payload: apisToLoad });
        initializeSearch(apisToLoad);
        console.log('📄 Switched to static data');
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to switch to static data' });
        console.error('Error switching to static data:', error);
      }
    },

    checkDatabaseAvailability: async () => {
      const result = await fetchAPIsFromDatabase();
      return result !== null;
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