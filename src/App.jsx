import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { APIProvider, useAPI } from './contexts/APIContext.jsx';
import { Header } from './components/Header.jsx';
import { APIGrid } from './components/APIGrid.jsx';
import { KnowledgeGraph } from './components/KnowledgeGraph.jsx';
import { FilterSidebar } from './components/FilterSidebar.jsx';
import APIDetail from './components/APIDetail.jsx';
import IntelligentChatbot from './components/IntelligentChatbot.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import DataSourceIndicator from './components/DataSourceIndicator.jsx';
import DataSourceVerification from './components/DataSourceVerification.jsx';
import { searchAndFilter } from './lib/search.js';

const AppContent = () => {
  const { 
    apis, 
    filteredApis,
    searchFilters, 
    viewMode, 
    selectedAPI, 
    graphData, 
    loading, 
    setFilters, 
    setSelectedAPI,
    detailViewAPI,
    setDetailViewAPI
  } = useAPI();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (query) => {
    const newFilters = { ...searchFilters, query };
    setFilters(newFilters);
  };

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handleSelectAPI = (api) => {
    console.log('handleSelectAPI called with:', api); // Debug log
    setSelectedAPI(api);
    setDetailViewAPI(api);
  };

  const handleBackToMain = () => {
    setSelectedAPI(null);
    setDetailViewAPI(null);
  };

  const facets = searchAndFilter(apis, searchFilters).facets;

  // If an API is selected for detailed view, show the detail component
  if (detailViewAPI) {
    // Get related APIs based on dependencies, dependents, category, and department
    const relatedAPIs = apis.filter(api => {
      if (api.id === detailViewAPI.id) return false;
      
      // Safe access to properties with default values
      const apiDependencies = api.dependencies || [];
      const apiDependents = api.dependents || [];
      const detailDependencies = detailViewAPI.dependencies || [];
      const detailDependents = detailViewAPI.dependents || [];
      const apiTags = api.tags || [];
      const detailTags = detailViewAPI.tags || [];
      
      // Include if it's a dependency or dependent
      if (detailDependencies.includes(api.id) || 
          detailDependents.includes(api.id) ||
          apiDependencies.includes(detailViewAPI.id) ||
          apiDependents.includes(detailViewAPI.id)) {
        return true;
      }
      
      // Include if same category or department
      if (api.category === detailViewAPI.category || 
          api.department === detailViewAPI.department) {
        return true;
      }
      
      // Include if has common tags
      const commonTags = apiTags.filter(tag => detailTags.includes(tag));
      if (commonTags.length > 0) {
        return true;
      }
      
      return false;
    });

    return (
      <APIDetail 
        api={detailViewAPI}
        onBack={handleBackToMain}
        relatedAPIs={relatedAPIs}
      />
    );
  }

  const renderMainContent = () => {
    switch (viewMode) {
      case 'graph':
        return (
          <KnowledgeGraph
            data={graphData}
            onNodeClick={(node) => {
              console.log('App received node click:', node); // Debug log
              const api = apis.find(a => a.id === node.id);
              console.log('Found API:', api); // Debug log
              if (api) handleSelectAPI(api);
            }}
            selectedNode={selectedAPI?.id}
            width={1200}
            height={800}
          />
        );
      case 'list':
        return (
          <div className="space-y-4">
            {filteredApis.map((api) => (
              <div key={api.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{api.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{api.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{api.department}</span>
                      <span>v{api.version}</span>
                      <span className="capitalize">{api.status}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelectAPI(api)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'grid':
      default:
        return (
          <APIGrid
            apis={filteredApis}
            loading={loading}
            onSelectAPI={handleSelectAPI}
            selectedAPI={selectedAPI?.id}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Filter Sidebar - hide in graph mode for cleaner view */}
          {viewMode !== 'graph' && (
            <FilterSidebar
              filters={searchFilters}
              onFiltersChange={handleFiltersChange}
              facets={facets}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          )}

          {/* Main Content Area */}
          <div className={`flex-1 ${viewMode !== 'graph' ? 'lg:ml-6' : ''}`}>
            {/* Mobile Filter Toggle - only for non-graph modes */}
            {viewMode !== 'graph' && (
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            )}

            {/* Results Summary - show different content for graph mode */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  {viewMode === 'graph' ? (
                    <>
                      <h2 className="text-xl font-semibold text-gray-900">Knowledge Graph</h2>
                      <p className="text-gray-600 mt-1">
                        {filteredApis.length} API{filteredApis.length !== 1 ? 's' : ''} • {graphData.links?.length || 0} relationships
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        💡 Click on any node to view detailed API information
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {filteredApis.length} API{filteredApis.length !== 1 ? 's' : ''} found
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Showing results from {apis.length} total APIs
                      </p>
                    </>
                  )}
                </div>
                
                {/* Graph mode filter toggle */}
                {viewMode === 'graph' && (
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isFilterOpen 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Collapsible filters for graph mode */}
            {viewMode === 'graph' && isFilterOpen && (
              <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900">Filter APIs</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Refine the graph to show specific APIs and relationships
                  </p>
                </div>
                <div className="p-4">
                  <FilterSidebar
                    filters={searchFilters}
                    onFiltersChange={handleFiltersChange}
                    facets={facets}
                    isOpen={true}
                    onToggle={() => setIsFilterOpen(!isFilterOpen)}
                    isCompact={true}
                  />
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="space-y-6">
              {renderMainContent()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Source Indicator */}
      <DataSourceIndicator />
      
      {/* Intelligent AI Chatbot */}
      <IntelligentChatbot />
    </div>
  );
};

const App = () => {
  return (
    <APIProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/data-source" element={<DataSourceVerification />} />
        <Route path="*" element={<AppContent />} />
      </Routes>
    </APIProvider>
  );
};

export default App;