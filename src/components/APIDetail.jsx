import React from 'react';
import { ArrowLeft, ExternalLink, Clock, Users, Activity, AlertTriangle, CheckCircle, XCircle, Pause, Globe, Key, Zap, Shield, Mail, MessageSquare } from 'lucide-react';

const APIDetail = ({ api, onBack, relatedAPIs }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'deprecated': return 'text-red-600 bg-red-100';
      case 'beta': return 'text-yellow-600 bg-yellow-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'deprecated': return <XCircle className="w-4 h-4" />;
      case 'beta': return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance': return <Pause className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'REST_API': return 'bg-blue-500';
      case 'JAVA_API': return 'bg-orange-500';
      case 'ORACLE_API': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to APIs</span>
        </button>
      </div>

      {/* API Header */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${getTypeColor(api.type)}`}></div>
              <h1 className="text-2xl font-bold text-gray-900">{api.name}</h1>
              <span className="text-gray-500">v{api.version}</span>
            </div>
            <p className="text-gray-600 text-lg">{api.description}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(api.status)}`}>
              {getStatusIcon(api.status)}
              <span className="capitalize">{api.status}</span>
            </div>
            
            {api.documentation?.url && (
              <a
                href={api.documentation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Documentation</span>
              </a>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium text-gray-900">{api.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Owner</p>
            <p className="font-medium text-gray-900">{api.owner}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium text-gray-900 capitalize">{api.category}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Technical Details */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h2>
            <div className="space-y-4">
              {/* REST API Details */}
              {api.type === 'REST_API' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Base URL</span>
                      </div>
                      <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                        {api.technical?.baseUrl || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Endpoint</span>
                      </div>
                      <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                        {api.technical?.endpoint || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Key className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Method</span>
                      </div>
                      <p className="text-sm text-gray-900 font-mono bg-blue-50 p-2 rounded">
                        {api.technical?.method || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Key className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Content Type</span>
                      </div>
                      <p className="text-sm text-gray-900">{api.technical?.contentType || 'Not specified'}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Authentication</span>
                    </div>
                    <p className="text-sm text-gray-900">{api.technical?.authMethod || 'Not specified'}</p>
                  </div>
                  {api.technical?.rateLimit && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Rate Limits</span>
                      </div>
                      <p className="text-sm text-gray-900">{api.technical.rateLimit}</p>
                    </div>
                  )}
                </>
              )}

              {/* JAVA API Details */}
              {api.type === 'JAVA_API' && (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Package Name</span>
                      </div>
                      <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                        {api.technical?.packageName || 'Not specified'}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Class Name</span>
                        </div>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                          {api.technical?.className || 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Key className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Method</span>
                        </div>
                        <p className="text-sm text-gray-900 font-mono bg-orange-50 p-2 rounded">
                          {api.technical?.methodName || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    {api.technical?.interfaceName && (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Interface</span>
                        </div>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                          {api.technical.interfaceName}
                        </p>
                      </div>
                    )}
                    {api.technical?.apiSignature && (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Key className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">API Signature</span>
                        </div>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                          {api.technical.apiSignature}
                        </p>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Authentication</span>
                      </div>
                      <p className="text-sm text-gray-900">{api.technical?.authMethod || 'Not specified'}</p>
                    </div>
                  </div>
                </>
              )}


            </div>
          </div>



          {/* Sample Request/Response */}
          {(api.sampleRequest || api.sampleResponse) && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {(api.type === 'ORACLE_API' || api.type === 'JAVA_API') ? 'Execution Example' : 'API Examples'}
              </h2>
              
              <div className="space-y-4">
                {api.sampleRequest && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {(api.type === 'ORACLE_API' || api.type === 'JAVA_API') ? 'Sample Call' : 'Sample Request'}
                      </span>
                    </div>
                    <pre className="text-xs text-gray-900 font-mono bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto whitespace-pre-wrap">
{(api.type === 'ORACLE_API' || api.type === 'JAVA_API')
  ? (typeof api.sampleRequest === 'string' ? api.sampleRequest : JSON.stringify(api.sampleRequest, null, 2))
  : JSON.stringify(api.sampleRequest, null, 2)}
                    </pre>
                  </div>
                )}
                {api.sampleResponse && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {(api.type === 'ORACLE_API' || api.type === 'JAVA_API') ? 'Sample Result' : 'Sample Response'}
                      </span>
                    </div>
                    <pre className="text-xs text-gray-900 font-mono bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto whitespace-pre-wrap">
{(api.type === 'ORACLE_API' || api.type === 'JAVA_API')
  ? (typeof api.sampleResponse === 'string' ? api.sampleResponse : JSON.stringify(api.sampleResponse, null, 2))
  : JSON.stringify(api.sampleResponse, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {(api.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-3">
              {api.contact?.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a
                    href={`mailto:${api.contact.email}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {api.contact.email}
                  </a>
                </div>
              )}
              {api.contact?.team && (
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{api.contact.team}</span>
                </div>
              )}
              {api.contact?.slackChannel && (
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{api.contact.slackChannel}</span>
                </div>
              )}
              {api.contact?.phone && (
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <a
                    href={`tel:${api.contact.phone}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {api.contact.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Dependencies */}
          {(api.dependencies || []).length > 0 && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Dependencies</h2>
              <div className="space-y-2">
                {(api.dependencies || []).map((depId) => {
                  const dependency = relatedAPIs.find(a => a.id === depId);
                  return (
                    <div key={depId} className="text-sm text-gray-600">
                      {dependency ? dependency.name : depId}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dependents */}
          {(api.dependents || []).length > 0 && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Used By</h2>
              <div className="space-y-2">
                {(api.dependents || []).map((depId) => {
                  const dependent = relatedAPIs.find(a => a.id === depId);
                  return (
                    <div key={depId} className="text-sm text-gray-600">
                      {dependent ? dependent.name : depId}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related APIs */}
          {relatedAPIs.length > 0 && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Related APIs</h2>
              <div className="space-y-3">
                {relatedAPIs.slice(0, 5).map((relatedAPI) => (
                  <div
                    key={relatedAPI.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className={`w-2 h-2 rounded-full ${getTypeColor(relatedAPI.type)}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 break-words">{relatedAPI.name}</p>
                      <p className="text-xs text-gray-500 break-words">{relatedAPI.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APIDetail;