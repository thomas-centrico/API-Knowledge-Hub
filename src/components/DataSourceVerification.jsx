import React, { useState, useEffect } from 'react';
import { useAPI } from '../contexts/APIContext.jsx';

const DataSourceVerification = () => {
  const { 
    apis, 
    dataSource, 
    databaseAvailable, 
    switchToDatabase, 
    switchToStatic, 
    checkDatabaseAvailability 
  } = useAPI();
  
  const [databaseApis, setDatabaseApis] = useState([]);
  const [serverStatus, setServerStatus] = useState('checking');
  
  useEffect(() => {
    checkDatabaseAPIs();
  }, []);

  const checkDatabaseAPIs = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/apis');
      if (response.ok) {
        const data = await response.json();
        setDatabaseApis(data.data || []);
        setServerStatus('connected');
      } else {
        setServerStatus('error');
      }
    } catch (error) {
      setServerStatus('disconnected');
      console.log('Database API not available:', error.message);
    }
  };

  const handleSwitchToDatabase = async () => {
    try {
      await switchToDatabase();
      await checkDatabaseAPIs();
    } catch (error) {
      alert('Failed to switch to database. Is the API server running?');
    }
  };

  const handleSwitchToStatic = () => {
    switchToStatic();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🔍 Data Source Verification</h1>
      
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`border rounded-lg p-4 ${
          dataSource === 'static' ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📄</span>
            <div>
              <h3 className={`font-semibold ${
                dataSource === 'static' ? 'text-orange-800' : 'text-gray-800'
              }`}>
                Static Data {dataSource === 'static' ? '(Current)' : ''}
              </h3>
              <p className={`${
                dataSource === 'static' ? 'text-orange-600' : 'text-gray-600'
              }`}>
                {dataSource === 'static' ? `${apis.length} APIs loaded` : 'Available as fallback'}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`border rounded-lg p-4 ${
          serverStatus === 'connected' ? 
            (dataSource === 'database' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200') : 
          serverStatus === 'disconnected' ? 'bg-red-50 border-red-200' : 
          'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">
              {dataSource === 'database' ? '🗄️' :
               serverStatus === 'connected' ? '�' : 
               serverStatus === 'disconnected' ? '❌' : '⏳'}
            </span>
            <div>
              <h3 className={`font-semibold ${
                dataSource === 'database' ? 'text-green-800' :
                serverStatus === 'connected' ? 'text-blue-800' : 
                serverStatus === 'disconnected' ? 'text-red-800' : 
                'text-gray-800'
              }`}>
                Database API Server {dataSource === 'database' ? '(Current)' : ''}
              </h3>
              <p className={`${
                dataSource === 'database' ? 'text-green-600' :
                serverStatus === 'connected' ? 'text-blue-600' : 
                serverStatus === 'disconnected' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {dataSource === 'database' ? `${apis.length} APIs loaded` :
                 serverStatus === 'connected' ? `${databaseApis.length} APIs available` :
                 serverStatus === 'disconnected' ? 'Server not running' :
                 'Checking...'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold text-blue-800">Integration Status</h3>
              <p className="text-blue-600">
                {dataSource === 'database' ? 'Using database data' :
                 serverStatus === 'connected' ? 'Ready to switch' : 
                 'Start API server first'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Static Data */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            📄 Static Data {dataSource === 'static' ? '(Currently Used)' : '(Available)'}
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {dataSource === 'static' ? (
              // Show current static APIs
              apis.slice(0, 10).map((api, index) => (
                <div key={api.id} className="flex items-center justify-between p-3 bg-orange-50 rounded">
                  <div>
                    <span className="font-medium">{api.name}</span>
                    <span className="ml-2 px-2 py-1 text-xs bg-orange-200 text-orange-700 rounded">
                      {api.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{api.id}</span>
                </div>
              ))
            ) : (
              // Show available static data count
              <div className="text-center text-gray-500 py-8">
                <p>Static data available as fallback</p>
                <p className="text-sm mt-2">16 APIs in sampleData.js file</p>
              </div>
            )}
            {dataSource === 'static' && apis.length > 10 && (
              <div className="text-center text-gray-500 py-2">
                ... and {apis.length - 10} more APIs
              </div>
            )}
          </div>
          
          {dataSource !== 'static' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={handleSwitchToStatic}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Switch to Static Data
              </button>
            </div>
          )}
        </div>

        {/* Database Data */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            🗄️ Database Data {dataSource === 'database' ? '(Currently Used)' : 
              serverStatus === 'connected' ? '(Available)' : '(Unavailable)'}
          </h2>
          {serverStatus === 'connected' ? (
            <>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(dataSource === 'database' ? apis : databaseApis).map((api, index) => (
                  <div key={api.id} className={`flex items-center justify-between p-3 rounded ${
                    dataSource === 'database' ? 'bg-green-50' : 'bg-blue-50'
                  }`}>
                    <div>
                      <span className="font-medium">{api.name}</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded ${
                        dataSource === 'database' 
                          ? 'bg-green-200 text-green-700' 
                          : 'bg-blue-200 text-blue-700'
                      }`}>
                        {api.type}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{api.id}</span>
                  </div>
                ))}
                {(dataSource === 'database' ? apis : databaseApis).length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No APIs found in database
                  </div>
                )}
              </div>
              
              {dataSource !== 'database' && databaseApis.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleSwitchToDatabase}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Switch to Database Data
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Database API server not available</p>
              <p className="text-sm mt-2">
                Start the API server with: <code className="bg-gray-100 px-2 py-1 rounded">node api-server.js</code>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          📋 Data Source Management
        </h3>
        
        {dataSource === 'database' ? (
          <div className="space-y-2 text-blue-700">
            <p className="font-medium">✅ You are currently using DATABASE data!</p>
            <div className="text-sm space-y-1">
              <p>• APIs are loaded from the SQLite database via API server</p>
              <p>• Real-time data with {apis.length} APIs available</p>
              <p>• Use the "Switch to Static" button above to use fallback data</p>
            </div>
          </div>
        ) : serverStatus === 'connected' ? (
          <div className="space-y-2 text-blue-700">
            <p className="font-medium">🔄 Database is available - you can switch!</p>
            <div className="text-sm space-y-1">
              <p>• Database API server is running and accessible</p>
              <p>• Click "Switch to Database Data" button above to use live data</p>
              <p>• Currently using static fallback data with {apis.length} APIs</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-blue-700">
            <p className="font-medium">📄 Using static data (database unavailable)</p>
            <div className="text-sm space-y-1">
              <p>• Start the API server: <code className="bg-blue-100 px-1 rounded">node api-server.js</code></p>
              <p>• Ensure database is accessible at the shared drive location</p>
              <p>• The app will automatically detect when database becomes available</p>
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={checkDatabaseAPIs}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              🔄 Refresh Status
            </button>
            
            {serverStatus === 'connected' && (
              <button 
                onClick={() => window.open('http://localhost:3003/api/apis', '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                🔗 View Database API
              </button>
            )}
            
            <button 
              onClick={() => window.open('http://localhost:3003/api/health', '_blank')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
                🏥 Health Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourceVerification;