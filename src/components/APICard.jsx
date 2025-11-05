import React from 'react';
import { 
  ExternalLink, 
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Wrench 
} from 'lucide-react';

const getStatusIcon = (status) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'deprecated':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'beta':
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case 'maintenance':
      return <Wrench className="w-4 h-4 text-gray-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'deprecated':
      return 'bg-red-100 text-red-800';
    case 'beta':
      return 'bg-yellow-100 text-yellow-800';
    case 'maintenance':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'REST_API':
      return 'bg-blue-100 text-blue-800';
    case 'JAVA_API':
      return 'bg-red-100 text-red-800';
    case 'ORACLE_API':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const APICard = ({ 
  api, 
  onSelect, 
  isSelected = false, 
  showActions = true 
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(api);
    }
  };

  const handleExternalLink = (e) => {
    e.stopPropagation();
    if (api.documentation?.external) {
      window.open(api.documentation.external, '_blank');
    }
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md border border-gray-200 p-6 
        hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : ''}
      `}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate flex-1 min-w-0" title={api.name}>
              {api.name}
            </h3>
            {showActions && (
              <button
                onClick={handleExternalLink}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors flex-shrink-0"
                title="Open documentation"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(api.type)}`}>
              {api.type.replace('_', ' ')}
            </span>
            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(api.status)}`}>
              {getStatusIcon(api.status)}
              <span className="capitalize">{api.status}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {api.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {api.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs"
          >
            {tag}
          </span>
        ))}
        {api.tags.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-500 text-xs">
            +{api.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{api.department}</span>
        <span>v{api.version}</span>
      </div>

      {/* Category Badge */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {api.category}
        </span>
      </div>
    </div>
  );
};