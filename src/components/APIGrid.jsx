import React from 'react';
import { Loader2, Search } from 'lucide-react';
import { APICard } from './APICard.jsx';

export const APIGrid = ({ 
  apis, 
  loading = false, 
  onSelectAPI, 
  selectedAPI 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading APIs...</p>
        </div>
      </div>
    );
  }

  if (apis.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No APIs found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apis.map((api) => (
        <APICard
          key={api.id}
          api={api}
          onSelect={onSelectAPI}
          isSelected={selectedAPI === api.id}
          showActions={true}
        />
      ))}
    </div>
  );
};