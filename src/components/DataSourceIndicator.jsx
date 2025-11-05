import React, { useState, useEffect } from 'react';
import { useAPI } from '../contexts/APIContext.jsx';

const DataSourceIndicator = () => {
  const { 
    dataSource, 
    databaseAvailable, 
    apis, 
    switchToDatabase, 
    switchToStatic, 
    checkDatabaseAvailability,
    forceReloadFromDatabase 
  } = useAPI();
  
  const [lastChecked, setLastChecked] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkDataSources = async () => {
    setIsChecking(true);
    try {
      await checkDatabaseAvailability();
      setLastChecked(new Date().toLocaleTimeString());
    } catch (error) {
      console.log('Error checking database:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Check database availability on mount
    checkDataSources();
    
    // Check every 30 seconds
    const interval = setInterval(checkDataSources, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (dataSource) {
      case 'database': return 'text-green-600 bg-green-50';
      case 'static': 
        return databaseAvailable 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch (dataSource) {
      case 'database': return '🗄️';
      case 'static': return databaseAvailable ? '🔄' : '📄';
      default: return '❓';
    }
  };

  const getStatusMessage = () => {
    switch (dataSource) {
      case 'database': 
        return `Using Database (${apis.length} APIs)`;
      case 'static': 
        return databaseAvailable 
          ? `Using Static Data (Database Available)` 
          : `Using Static Data (${apis.length} APIs)`;
      default: 
        return 'Unknown Data Source';
    }
  };

  const handleSwitchToDatabase = async () => {
    try {
      await switchToDatabase();
    } catch (error) {
      alert('Failed to switch to database. Is the API server running?');
    }
  };

  const handleSwitchToStatic = () => {
    switchToStatic();
  };

  const getActionButton = () => {
    if (dataSource === 'static' && databaseAvailable) {
      return (
        <button 
          onClick={handleSwitchToDatabase}
          className="ml-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
          Switch to Database
        </button>
      );
    }
    
    if (dataSource === 'database') {
      return (
        <button 
          onClick={handleSwitchToStatic}
          className="ml-2 px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
        >
          Switch to Static
        </button>
      );
    }
    
    return null;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`px-4 py-2 rounded-lg shadow-lg border ${getStatusColor()}`}>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getStatusIcon()}</span>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {getStatusMessage()}
            </span>
            <div className="flex items-center text-xs opacity-75">
              <span>Database: {dataSource.databaseStatus}</span>
              {dataSource.lastChecked && (
                <span className="ml-2">• Last checked: {dataSource.lastChecked}</span>
              )}
            </div>
          </div>
          {getActionButton()}
        </div>
        
        {/* Detailed info panel */}
        <div className="mt-2 pt-2 border-t border-current border-opacity-20">
          <div className="text-xs space-y-1">
            <div>📄 Static File: Available</div>
            <div>🗄️ Database: {databaseAvailable ? 'Available' : 'Unavailable'} ({apis.length} APIs loaded)</div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={checkDataSources}
                disabled={isChecking}
                className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs hover:bg-opacity-75 transition-colors disabled:opacity-50"
              >
                {isChecking ? 'Checking...' : 'Refresh'}
              </button>
              {dataSource === 'static' && (
                <button 
                  onClick={async () => {
                    setIsChecking(true);
                    const success = await forceReloadFromDatabase();
                    if (success) {
                      alert('Successfully switched to database! 🎉');
                    } else {
                      alert('Database not available. Please ensure the backend server is running on port 3002.');
                    }
                    setIsChecking(false);
                  }}
                  disabled={isChecking}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors disabled:opacity-50"
                >
                  Load from Database
                </button>
              )}
              {databaseAvailable && (
                <button 
                  onClick={() => window.open('http://localhost:3002/api/apis', '_blank')}
                  className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs hover:bg-opacity-75 transition-colors"
                >
                  View API Data
                </button>
              )}
            </div>
            {lastChecked && (
              <div className="text-xs opacity-75">Last checked: {lastChecked}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourceIndicator;