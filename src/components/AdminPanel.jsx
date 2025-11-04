import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Search } from 'lucide-react';
import { useAPI } from '../contexts/APIContext';

const AdminPanel = () => {
  const { apis, addAPI, updateAPI, deleteAPI } = useAPI();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAPI, setEditingAPI] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      id: '',
      name: '',
      type: 'REST_API',
      category: 'integration',
      status: 'active',
      version: '',
      description: '',
      tags: '',
      owner: '',
      department: '',
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      documentation: {
        url: '',
        hasInteractiveDocs: false,
      },
      dependencies: '',
      dependents: '',
      usage: {
        requestsPerDay: 0,
        uniqueUsers: 0,
      },
      technical: {
        // REST API fields
        baseUrl: '',
        endpoint: '',
        method: 'GET',
        contentType: 'application/json',
        authMethod: '',
        rateLimit: '',
        responseTime: 0,
        slaUptime: 99.9,
        // JAVA API fields
        packageName: '',
        className: '',
        interface: '',
        apiSignature: '',
        // ORACLE API fields
        connectionString: '',
        schemaName: '',
        procedureName: '',
      },
      contact: {
        email: '',
        team: '',
        slackChannel: '',
      },
      sampleRequest: '',
      sampleResponse: '',
    };
  }

  const handleOpenForm = (api = null) => {
    if (api) {
      setEditingAPI(api);
      setFormData({
        ...api,
        tags: api.tags.join(', '),
        dependencies: api.dependencies.join(', '),
        dependents: api.dependents.join(', '),
        sampleRequest: JSON.stringify(api.sampleRequest, null, 2),
        sampleResponse: JSON.stringify(api.sampleResponse, null, 2),
      });
    } else {
      setEditingAPI(null);
      setFormData(getEmptyForm());
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAPI(null);
    setFormData(getEmptyForm());
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Parse JSON fields
      const sampleRequest = formData.sampleRequest ? JSON.parse(formData.sampleRequest) : {};
      const sampleResponse = formData.sampleResponse ? JSON.parse(formData.sampleResponse) : {};

      // Process arrays
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      const dependencies = formData.dependencies.split(',').map(t => t.trim()).filter(t => t);
      const dependents = formData.dependents.split(',').map(t => t.trim()).filter(t => t);

      const apiData = {
        ...formData,
        tags,
        dependencies,
        dependents,
        sampleRequest,
        sampleResponse,
        usage: {
          requestsPerDay: parseInt(formData.usage.requestsPerDay) || 0,
          uniqueUsers: parseInt(formData.usage.uniqueUsers) || 0,
        },
        technical: {
          ...formData.technical,
          responseTime: parseInt(formData.technical.responseTime) || 0,
          slaUptime: parseFloat(formData.technical.slaUptime) || 99.9,
        },
      };

      if (editingAPI) {
        updateAPI(apiData);
      } else {
        addAPI(apiData);
      }

      handleCloseForm();
    } catch (error) {
      alert('Error saving API: ' + error.message);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this API?')) {
      deleteAPI(id);
    }
  };

  const filteredAPIs = apis.filter(api =>
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">API Admin Panel</h1>
        <p className="text-gray-600">Manage API entries, add new APIs, and update existing ones</p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search APIs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="ml-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New API</span>
          </button>
        </div>
      </div>

      {/* API List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAPIs.map((api) => (
                <tr key={api.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm font-medium text-gray-900 truncate" title={api.name}>
                      {api.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate" title={api.id}>
                      {api.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      api.type === 'REST_API' ? 'bg-blue-100 text-blue-800' :
                      api.type === 'JAVA_API' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {api.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate" title={api.department}>
                      {api.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      api.status === 'active' ? 'bg-green-100 text-green-800' :
                      api.status === 'deprecated' ? 'bg-red-100 text-red-800' :
                      api.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {api.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{api.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenForm(api)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="Edit API"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(api.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete API"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAPI ? 'Edit API' : 'Add New API'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">API ID *</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      disabled={!!editingAPI}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      placeholder="rest-001, java-001, oracle-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="REST_API">REST API</option>
                      <option value="JAVA_API">Java API</option>
                      <option value="ORACLE_API">Oracle API</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="authentication">Authentication</option>
                      <option value="payment">Payment</option>
                      <option value="analytics">Analytics</option>
                      <option value="storage">Storage</option>
                      <option value="communication">Communication</option>
                      <option value="security">Security</option>
                      <option value="database">Database</option>
                      <option value="messaging">Messaging</option>
                      <option value="utilities">Utilities</option>
                      <option value="integration">Integration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="deprecated">Deprecated</option>
                      <option value="beta">Beta</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Version *</label>
                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="v1.0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner *</label>
                    <input
                      type="text"
                      name="owner"
                      value={formData.owner}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="authentication, oauth, security"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Details - REST API */}
              {formData.type === 'REST_API' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">REST API Technical Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Base URL *</label>
                      <input
                        type="text"
                        name="technical.baseUrl"
                        value={formData.technical.baseUrl}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://api.company.com/service"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint *</label>
                      <input
                        type="text"
                        name="technical.endpoint"
                        value={formData.technical.endpoint}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="/api/resource"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Method *</label>
                      <select
                        name="technical.method"
                        value={formData.technical.method}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                      <input
                        type="text"
                        name="technical.contentType"
                        value={formData.technical.contentType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="application/json"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rate Limit</label>
                      <input
                        type="text"
                        name="technical.rateLimit"
                        value={formData.technical.rateLimit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1000 requests/hour"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Details - JAVA API */}
              {formData.type === 'JAVA_API' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Java API Technical Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Package Name *</label>
                      <input
                        type="text"
                        name="technical.packageName"
                        value={formData.technical.packageName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="com.company.service"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class Name *</label>
                      <input
                        type="text"
                        name="technical.className"
                        value={formData.technical.className}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ServiceImplementation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Method *</label>
                      <input
                        type="text"
                        name="technical.method"
                        value={formData.technical.method}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="processData"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interface</label>
                      <input
                        type="text"
                        name="technical.interface"
                        value={formData.technical.interface}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="IService"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">API Signature</label>
                      <input
                        type="text"
                        name="technical.apiSignature"
                        value={formData.technical.apiSignature}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="IService.processData(parameter)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Details - ORACLE API */}
              {formData.type === 'ORACLE_API' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Oracle API Technical Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Base URL *</label>
                      <input
                        type="text"
                        name="technical.baseUrl"
                        value={formData.technical.baseUrl}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="oracle://db.company.com:1521/PROD"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">JDBC Connection String *</label>
                      <input
                        type="text"
                        name="technical.connectionString"
                        value={formData.technical.connectionString}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="jdbc:oracle:thin:@db.company.com:1521:PROD"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Schema Name *</label>
                      <input
                        type="text"
                        name="technical.schemaName"
                        value={formData.technical.schemaName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="CORE_SCHEMA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Procedure/Package Name *</label>
                      <input
                        type="text"
                        name="technical.procedureName"
                        value={formData.technical.procedureName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="PKG_CORE.SP_PROCEDURE"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Common Technical Fields */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance & Authentication</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Auth Method *</label>
                    <input
                      type="text"
                      name="technical.authMethod"
                      value={formData.technical.authMethod}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="OAuth 2.0, API Key, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Response Time (ms)</label>
                    <input
                      type="number"
                      name="technical.responseTime"
                      value={formData.technical.responseTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SLA Uptime (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="technical.slaUptime"
                      value={formData.technical.slaUptime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="99.9"
                    />
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requests Per Day</label>
                    <input
                      type="number"
                      name="usage.requestsPerDay"
                      value={formData.usage.requestsPerDay}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unique Users</label>
                    <input
                      type="number"
                      name="usage.uniqueUsers"
                      value={formData.usage.uniqueUsers}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="250"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="contact.email"
                      value={formData.contact.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="team@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                    <input
                      type="text"
                      name="contact.team"
                      value={formData.contact.team}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Platform Team"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slack Channel</label>
                    <input
                      type="text"
                      name="contact.slackChannel"
                      value={formData.contact.slackChannel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="#api-support"
                    />
                  </div>
                </div>
              </div>

              {/* Documentation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Documentation URL</label>
                    <input
                      type="url"
                      name="documentation.url"
                      value={formData.documentation.url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://docs.company.com/api"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="documentation.hasInteractiveDocs"
                        checked={formData.documentation.hasInteractiveDocs}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Has Interactive Docs</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Dependencies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Relationships</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dependencies (comma-separated IDs)</label>
                    <input
                      type="text"
                      name="dependencies"
                      value={formData.dependencies}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="rest-001, java-002"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dependents (comma-separated IDs)</label>
                    <input
                      type="text"
                      name="dependents"
                      value={formData.dependents}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="rest-003, rest-004"
                    />
                  </div>
                </div>
              </div>

              {/* Sample Request/Response */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Data (JSON format)</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Request</label>
                    <textarea
                      name="sampleRequest"
                      value={formData.sampleRequest}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder='{"key": "value"}'
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Response</label>
                    <textarea
                      name="sampleResponse"
                      value={formData.sampleResponse}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder='{"success": true, "data": {}}'
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingAPI ? 'Update API' : 'Create API'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
