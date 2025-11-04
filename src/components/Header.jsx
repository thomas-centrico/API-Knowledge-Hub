import React from 'react';
import { Search, Grid3X3, List, RefreshCw, Settings, Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAPI } from '../contexts/APIContext.jsx';
import BrainNetwork from './icons/BrainNetwork.jsx';

export const Header = ({ onSearch }) => {
  const { viewMode, setViewMode, refreshAPIs, loading } = useAPI();
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname === '/admin';

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleRefresh = () => {
    refreshAPIs();
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BrainNetwork className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">API Knowledge Graph</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search APIs by name, description, tags..."
                  className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle - Only show on main page */}
            {!isAdminPage && (
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleViewChange('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleViewChange('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleViewChange('graph')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'graph'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="Knowledge Graph"
                >
                  <BrainNetwork className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Admin Button */}
            <button
              onClick={() => handleNavigate(isAdminPage ? '/' : '/admin')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isAdminPage 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title={isAdminPage ? 'Back to APIs' : 'Admin Panel'}
            >
              <Shield className="w-4 h-4" />
              {isAdminPage && <span className="text-sm font-medium">Back</span>}
            </button>

            {/* Refresh Button */}
            {!isAdminPage && (
              <button
                onClick={handleRefresh}
                disabled={loading}
                className={`p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors ${
                  loading ? 'animate-spin' : ''
                }`}
                title="Refresh Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}

            {/* Settings Button */}
            <button
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-500">
              Discover and explore APIs across your organization
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>REST APIs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Java APIs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Oracle APIs</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};