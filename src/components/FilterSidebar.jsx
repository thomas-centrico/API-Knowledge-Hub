import React from 'react';
import { X, Filter } from 'lucide-react';

export const FilterSidebar = ({
  filters,
  onFiltersChange,
  facets,
  isOpen,
  onToggle,
  isCompact = false
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleArrayFilter = (key, value) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      query: '',
      types: [],
      categories: [],
      statuses: [],
      tags: [],
      departments: [],
    });
  };

  // For compact mode (graph view), render inline without sidebar wrapper
  if (isCompact) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1 rounded-xl shadow-lg">
        <div className="bg-gradient-to-tr from-cyan-50 via-blue-50 to-indigo-100 p-6 rounded-lg border border-blue-200/60">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Clear All Button */}
            <div className="col-span-full flex justify-end mb-4">
              <button
                onClick={clearAllFilters}
                className="text-sm text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Clear all filters
              </button>
            </div>

            {/* API Types */}
            <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-lg border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2"></span>
                API Types
              </h3>
            <div className="space-y-2">
              {Object.entries(facets.types).map(([type, count]) => (
                <label key={type} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.types.includes(type)}
                    onChange={() => toggleArrayFilter('types', type)}
                    className="rounded border-blue-200 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                    {type.replace('_', ' ')} <span className="text-blue-600 font-medium">({count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-gradient-to-br from-white/80 to-indigo-50/80 backdrop-blur-sm p-4 rounded-lg border border-indigo-200/50 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mr-2"></span>
              Categories
            </h3>
            <div className="space-y-2">
              {Object.entries(facets.categories).map(([category, count]) => (
                <label key={category} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleArrayFilter('categories', category)}
                    className="rounded border-blue-200 text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                    {category} <span className="text-indigo-600 font-medium">({count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-sm p-4 rounded-lg border border-purple-200/50 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-2"></span>
              Status
            </h3>
            <div className="space-y-2">
              {Object.entries(facets.statuses).map(([status, count]) => (
                <label key={status} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes(status)}
                    onChange={() => toggleArrayFilter('statuses', status)}
                    className="rounded border-blue-200 text-purple-600 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                    {status} <span className="text-purple-600 font-medium">({count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="bg-gradient-to-br from-white/80 to-cyan-50/80 backdrop-blur-sm p-4 rounded-lg border border-cyan-200/50 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full mr-2"></span>
              Departments
            </h3>
            <div className="space-y-2">
              {Object.entries(facets.departments).map(([department, count]) => (
                <label key={department} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.departments.includes(department)}
                    onChange={() => toggleArrayFilter('departments', department)}
                    className="rounded border-blue-200 text-cyan-600 focus:ring-cyan-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                    {department} <span className="text-cyan-600 font-medium">({count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-gradient-to-br from-white/80 to-pink-50/80 backdrop-blur-sm p-4 rounded-lg border border-pink-200/50 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mr-2"></span>
              Popular Tags
            </h3>
            <div className="space-y-2">
              {Object.entries(facets.tags).map(([tag, count]) => (
                <label key={tag} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={() => toggleArrayFilter('tags', tag)}
                    className="rounded border-blue-200 text-pink-600 focus:ring-pink-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                    {tag} <span className="text-pink-600 font-medium">({count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:block inset-y-0 left-0 z-50 w-80 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-r border-blue-200 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="bg-gradient-to-tr from-cyan-50 via-blue-50 to-indigo-100 p-1 m-2 rounded-lg">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-blue-200/60">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-blue-900">Filters</h2>
              </div>
              <div className="flex items-center space-x-2">
                {/* Clear All Button */}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-3 py-1.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Clear all
                </button>
                <button
                  onClick={onToggle}
                  className="p-1 hover:bg-blue-100/50 rounded-md lg:hidden transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>

            {/* API Types */}
            <div className="mb-6 bg-gradient-to-br from-blue-50/80 to-white/80 p-4 rounded-lg border border-blue-200/50 shadow-sm">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2"></span>
                API Types
              </h3>
              <div className="space-y-2">
                {Object.entries(facets.types).map(([type, count]) => (
                  <label key={type} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => toggleArrayFilter('types', type)}
                      className="rounded border-blue-200 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                      {type.replace('_', ' ')} <span className="text-blue-600 font-medium">({count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6 bg-gradient-to-br from-indigo-50/80 to-white/80 p-4 rounded-lg border border-indigo-200/50 shadow-sm">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mr-2"></span>
                Categories
              </h3>
              <div className="space-y-2">
                {Object.entries(facets.categories).map(([category, count]) => (
                  <label key={category} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleArrayFilter('categories', category)}
                      className="rounded border-blue-200 text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                      {category} <span className="text-indigo-600 font-medium">({count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mb-6 bg-gradient-to-br from-purple-50/80 to-white/80 p-4 rounded-lg border border-purple-200/50 shadow-sm">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-2"></span>
                Status
              </h3>
              <div className="space-y-2">
                {Object.entries(facets.statuses).map(([status, count]) => (
                  <label key={status} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.statuses.includes(status)}
                      onChange={() => toggleArrayFilter('statuses', status)}
                      className="rounded border-blue-200 text-purple-600 focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                      {status} <span className="text-purple-600 font-medium">({count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="mb-6 bg-gradient-to-br from-cyan-50/80 to-white/80 p-4 rounded-lg border border-cyan-200/50 shadow-sm">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full mr-2"></span>
                Departments
              </h3>
              <div className="space-y-2">
                {Object.entries(facets.departments).map(([department, count]) => (
                  <label key={department} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.departments.includes(department)}
                      onChange={() => toggleArrayFilter('departments', department)}
                      className="rounded border-blue-200 text-cyan-600 focus:ring-cyan-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                      {department} <span className="text-cyan-600 font-medium">({count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="mb-6 bg-gradient-to-br from-pink-50/80 to-white/80 p-4 rounded-lg border border-pink-200/50 shadow-sm">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mr-2"></span>
                Popular Tags
              </h3>
              <div className="space-y-2">
                {Object.entries(facets.tags).map(([tag, count]) => (
                  <label key={tag} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => toggleArrayFilter('tags', tag)}
                      className="rounded border-blue-200 text-pink-600 focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-blue-800 group-hover:text-blue-900 transition-colors">
                      {tag} <span className="text-pink-600 font-medium">({count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;