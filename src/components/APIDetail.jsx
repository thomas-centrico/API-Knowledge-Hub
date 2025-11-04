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
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-medium text-gray-900">{formatDate(api.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Usage Statistics */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Activity className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{formatNumber(api.usage?.requestsPerDay || 0)}</p>
                <p className="text-sm text-gray-600">Requests/Day</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{formatNumber(api.usage?.uniqueUsers || 0)}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">{api.technical?.responseTime || 0}ms</p>
                <p className="text-sm text-gray-600">Avg Response</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{api.technical?.slaUptime || 0}%</p>
                <p className="text-sm text-gray-600">Uptime</p>
              </div>
            </div>
          </div>

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
                          {api.technical?.method || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    {api.technical?.interface && (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Interface</span>
                        </div>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                          {api.technical.interface}
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

              {/* ORACLE API Details */}
              {api.type === 'ORACLE_API' && (
                <>
                  <div className="grid grid-cols-1 gap-4">
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
                        <span className="text-sm font-medium text-gray-700">JDBC Connection String</span>
                      </div>
                      <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                        {api.technical?.connectionString || 'Not specified'}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Schema Name</span>
                        </div>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                          {api.technical?.schemaName || 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Key className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Procedure/Package</span>
                        </div>
                        <p className="text-sm text-gray-900 font-mono bg-red-50 p-2 rounded break-all">
                          {api.technical?.procedureName || 'Not specified'}
                        </p>
                      </div>
                    </div>
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

          {/* Oracle API Comprehensive Metadata */}
          {api.type === 'ORACLE_API' && (
            <>
              {/* Core Metadata */}
              {(api.owningProject || api.businessFunction || api.consumerProjects || api.technologyStack || api.interfaceType) && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Core Metadata</h2>
                  <div className="space-y-3">
                    {api.owningProject && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Owning Project</p>
                        <p className="text-sm text-gray-900">{api.owningProject}</p>
                      </div>
                    )}
                    {api.businessFunction && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Business Function</p>
                        <p className="text-sm text-gray-900">{api.businessFunction}</p>
                      </div>
                    )}
                    {api.consumerProjects && api.consumerProjects.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Consumer Projects</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {api.consumerProjects.map((project, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {api.technologyStack && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Technology Stack</p>
                        <p className="text-sm text-gray-900">{api.technologyStack}</p>
                      </div>
                    )}
                    {api.interfaceType && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Interface Type</p>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded inline-block">
                          {api.interfaceType}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Environments */}
              {api.environments && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Environments</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {api.environments.dev && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Development</p>
                        <p className="text-xs text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                          {api.environments.dev}
                        </p>
                      </div>
                    )}
                    {api.environments.qa && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">QA</p>
                        <p className="text-xs text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                          {api.environments.qa}
                        </p>
                      </div>
                    )}
                    {api.environments.uat && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">UAT</p>
                        <p className="text-xs text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                          {api.environments.uat}
                        </p>
                      </div>
                    )}
                    {api.environments.prod && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Production</p>
                        <p className="text-xs text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                          {api.environments.prod}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Authentication Details */}
              {api.authentication && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Authentication & Access Control</h2>
                  <div className="space-y-3">
                    {api.authentication.method && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Method</p>
                        <p className="text-sm text-gray-900">{api.authentication.method}</p>
                      </div>
                    )}
                    {api.authentication.tokenEndpoint && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Token Endpoint</p>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                          {api.authentication.tokenEndpoint}
                        </p>
                      </div>
                    )}
                    {api.authentication.accessControl && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Access Control</p>
                        <p className="text-sm text-gray-900">{api.authentication.accessControl}</p>
                      </div>
                    )}
                    {api.authentication.onboardingSteps && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Onboarding Steps</p>
                        <p className="text-sm text-gray-900">{api.authentication.onboardingSteps}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Input & Output Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Specifications */}
                {api.inputSpecifications && (
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Input Specifications</h2>
                    <div className="space-y-3">
                      {api.inputSpecifications.format && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Format</p>
                          <p className="text-sm text-gray-900">{api.inputSpecifications.format}</p>
                        </div>
                      )}
                      {api.inputSpecifications.mandatoryFields && api.inputSpecifications.mandatoryFields.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Mandatory Fields</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {api.inputSpecifications.mandatoryFields.map((field, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-mono rounded">
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {api.inputSpecifications.optionalFields && api.inputSpecifications.optionalFields.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Optional Fields</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {api.inputSpecifications.optionalFields.map((field, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-mono rounded">
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {api.inputSpecifications.validationRules && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Validation Rules</p>
                          <p className="text-xs text-gray-900">{api.inputSpecifications.validationRules}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Output Specifications */}
                {api.outputSpecifications && (
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Output Specifications</h2>
                    <div className="space-y-3">
                      {api.outputSpecifications.format && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Format</p>
                          <p className="text-sm text-gray-900">{api.outputSpecifications.format}</p>
                        </div>
                      )}
                      {api.outputSpecifications.successResponse && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Success Response</p>
                          <p className="text-xs text-gray-900 font-mono bg-green-50 p-2 rounded">
                            {api.outputSpecifications.successResponse}
                          </p>
                        </div>
                      )}
                      {api.outputSpecifications.errorResponse && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Error Response</p>
                          <p className="text-xs text-gray-900 font-mono bg-red-50 p-2 rounded">
                            {api.outputSpecifications.errorResponse}
                          </p>
                        </div>
                      )}
                      {api.outputSpecifications.errorCodes && api.outputSpecifications.errorCodes.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Error Codes</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {api.outputSpecifications.errorCodes.map((code, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-mono rounded">
                                {code}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Functional Behavior */}
              {api.functionalBehavior && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Functional Behavior</h2>
                  <div className="space-y-3">
                    {api.functionalBehavior.summary && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Summary</p>
                        <p className="text-sm text-gray-900">{api.functionalBehavior.summary}</p>
                      </div>
                    )}
                    {api.functionalBehavior.dependencies && api.functionalBehavior.dependencies.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Dependencies</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {api.functionalBehavior.dependencies.map((dep, idx) => (
                            <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {api.functionalBehavior.transactionHandling && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Transaction Handling</p>
                        <p className="text-sm text-gray-900">{api.functionalBehavior.transactionHandling}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Versioning */}
              {api.versioning && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Versioning & Change Log</h2>
                  <div className="space-y-3">
                    {api.versioning.currentVersion && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Current Version</p>
                        <p className="text-sm text-gray-900 font-mono">{api.versioning.currentVersion}</p>
                      </div>
                    )}
                    {api.versioning.changeLog && api.versioning.changeLog.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Change Log</p>
                        <ul className="mt-1 space-y-1">
                          {api.versioning.changeLog.map((entry, idx) => (
                            <li key={idx} className="text-xs text-gray-900 pl-4 border-l-2 border-blue-300">
                              {entry}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {api.versioning.compatibility && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Compatibility</p>
                        <p className="text-sm text-gray-900">{api.versioning.compatibility}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              {api.performance && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {api.performance.rateLimits && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Rate Limits</p>
                        <p className="text-sm text-gray-900">{api.performance.rateLimits}</p>
                      </div>
                    )}
                    {api.performance.timeouts && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Timeouts</p>
                        <p className="text-sm text-gray-900">{api.performance.timeouts}</p>
                      </div>
                    )}
                    {api.performance.expectedResponseTime && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Expected Response Time</p>
                        <p className="text-sm text-gray-900">{api.performance.expectedResponseTime}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Monitoring */}
              {api.monitoring && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Monitoring & Logging</h2>
                  <div className="space-y-3">
                    {api.monitoring.loggingLocation && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Logging Location</p>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                          {api.monitoring.loggingLocation}
                        </p>
                      </div>
                    )}
                    {api.monitoring.monitoringTool && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Monitoring Tool</p>
                        <p className="text-sm text-gray-900">{api.monitoring.monitoringTool}</p>
                      </div>
                    )}
                    {api.monitoring.errorReporting && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Error Reporting</p>
                        <p className="text-sm text-gray-900">{api.monitoring.errorReporting}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Consumer Guidelines */}
              {api.consumerGuidelines && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Consumer Guidelines</h2>
                  <div className="space-y-3">
                    {api.consumerGuidelines.sampleCode && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Sample Code</p>
                        <pre className="text-xs text-gray-900 font-mono bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto mt-1">
{api.consumerGuidelines.sampleCode}
                        </pre>
                      </div>
                    )}
                    {api.consumerGuidelines.retryLogic && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Retry Logic</p>
                        <p className="text-sm text-gray-900">{api.consumerGuidelines.retryLogic}</p>
                      </div>
                    )}
                    {api.consumerGuidelines.bestPractices && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Best Practices</p>
                        <p className="text-sm text-gray-900">{api.consumerGuidelines.bestPractices}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Support Information */}
              {api.support && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Support & Contact</h2>
                  <div className="space-y-3">
                    {api.support.apiOwner && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">API Owner</p>
                        <p className="text-sm text-gray-900">{api.support.apiOwner}</p>
                      </div>
                    )}
                    {api.support.supportChannel && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Support Channel</p>
                        <p className="text-sm text-gray-900">{api.support.supportChannel}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Sample Request/Response */}
          {(api.sampleRequest || api.sampleResponse) && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {api.type === 'ORACLE_API' ? 'Execution Example' : 'API Examples'}
              </h2>
              
              {/* Oracle API - SQL Style Format */}
              {api.type === 'ORACLE_API' ? (
                <div className="space-y-4">
                  {api.sampleRequest && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">Input Parameters</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <table className="w-full text-xs font-mono">
                          <thead>
                            <tr className="border-b border-blue-300">
                              <th className="text-left py-1 px-2 text-blue-900">Parameter</th>
                              <th className="text-left py-1 px-2 text-blue-900">Value</th>
                              <th className="text-left py-1 px-2 text-blue-900">Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {api.sampleRequest.parameters ? (
                              api.sampleRequest.parameters.map((param, idx) => (
                                <tr key={idx} className="border-b border-blue-100">
                                  <td className="py-1 px-2 text-blue-800 font-semibold">{param.name}</td>
                                  <td className="py-1 px-2 text-gray-900">{String(param.value)}</td>
                                  <td className="py-1 px-2 text-gray-600">{param.type}</td>
                                </tr>
                              ))
                            ) : (
                              Object.entries(api.sampleRequest).map(([key, value]) => (
                                <tr key={key} className="border-b border-blue-100">
                                  <td className="py-1 px-2 text-blue-800 font-semibold">{key}</td>
                                  <td className="py-1 px-2 text-gray-900">
                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                  </td>
                                  <td className="py-1 px-2 text-gray-600">{typeof value}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {api.sampleResponse && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">Output Result</span>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        {api.sampleResponse.data && Array.isArray(api.sampleResponse.data) ? (
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs font-mono">
                              <thead>
                                <tr className="border-b border-green-300">
                                  {Object.keys(api.sampleResponse.data[0] || {}).map(column => (
                                    <th key={column} className="text-left py-1 px-2 text-green-900">
                                      {column.toUpperCase()}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {api.sampleResponse.data.map((row, idx) => (
                                  <tr key={idx} className="border-b border-green-100">
                                    {Object.values(row).map((value, vidx) => (
                                      <td key={vidx} className="py-1 px-2 text-gray-900">
                                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="mt-2 pt-2 border-t border-green-200 text-xs text-gray-600">
                              <div className="flex justify-between">
                                <span>Records: {api.sampleResponse.recordCount || api.sampleResponse.data.length}</span>
                                {api.sampleResponse.executionTime && (
                                  <span>Execution Time: {api.sampleResponse.executionTime}ms</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {Object.entries(api.sampleResponse).map(([key, value]) => (
                              <div key={key} className="flex">
                                <span className="font-semibold text-green-800 min-w-[120px]">{key}:</span>
                                <span className="text-gray-900">
                                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Execution Summary */}
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <div className="text-xs font-mono space-y-1">
                      <div className="flex">
                        <span className="font-semibold text-gray-700 min-w-[120px]">Procedure:</span>
                        <span className="text-gray-900">{api.technical?.procedureName}</span>
                      </div>
                      <div className="flex">
                        <span className="font-semibold text-gray-700 min-w-[120px]">Schema:</span>
                        <span className="text-gray-900">{api.technical?.schemaName}</span>
                      </div>
                      {api.sampleResponse?.success !== undefined && (
                        <div className="flex">
                          <span className="font-semibold text-gray-700 min-w-[120px]">Status:</span>
                          <span className={api.sampleResponse.success ? 'text-green-600' : 'text-red-600'}>
                            {api.sampleResponse.success ? '✓ SUCCESS' : '✗ FAILED'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* REST API and JAVA API - JSON Format */
                <div className="space-y-4">
                  {api.sampleRequest && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">Sample Request</span>
                      </div>
                      <pre className="text-xs text-gray-900 font-mono bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto">
{JSON.stringify(api.sampleRequest, null, 2)}
                      </pre>
                    </div>
                  )}
                  {api.sampleResponse && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">Sample Response</span>
                      </div>
                      <pre className="text-xs text-gray-900 font-mono bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto">
{JSON.stringify(api.sampleResponse, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {api.tags.map((tag) => (
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
              {api.contact?.slackChannel && (
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{api.contact.slackChannel}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dependencies */}
          {api.dependencies.length > 0 && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Dependencies</h2>
              <div className="space-y-2">
                {api.dependencies.map((depId) => {
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
          {api.dependents.length > 0 && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Used By</h2>
              <div className="space-y-2">
                {api.dependents.map((depId) => {
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
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{relatedAPI.name}</p>
                      <p className="text-xs text-gray-500">{relatedAPI.department}</p>
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