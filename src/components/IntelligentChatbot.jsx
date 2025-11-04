import React, { useState, useEffect } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
  ConversationHeader
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { useAPI } from '../contexts/APIContext.jsx';

const IntelligentChatbot = () => {
  const { apis, filteredApis, searchFilters, viewMode, setViewMode, setFilters, setSelectedAPI, setDetailViewAPI } = useAPI();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      message: `🚀 Welcome to API Intelligence Assistant! 

I have comprehensive knowledge of all ${apis.length} APIs in your catalog including their specifications, dependencies, usage patterns, and integration details.

Ask me anything like:
• "Tell me about the Payment Gateway API"
• "Which APIs are used for authentication?"
• "Show me deprecated APIs"
• "What are the dependencies of User Management API?"
• "Find APIs in the Finance department"

I can also help you navigate, filter, and switch between different views. How can I assist you today?`,
      sentTime: "just now",
      sender: "assistant",
      direction: "incoming"
    };
    
    setMessages([welcomeMessage]);
  }, [apis.length]);

  const processMessage = (message) => {
    const userMessage = {
      message,
      sentTime: "just now", 
      sender: "user",
      direction: "outgoing"
    };

    setMessages(prev => [...prev, userMessage]);
    setTyping(true);

    // Simulate processing delay for more natural feel
    setTimeout(() => {
      const response = generateIntelligentResponse(message);
      const assistantMessage = {
        message: response,
        sentTime: "just now",
        sender: "assistant", 
        direction: "incoming"
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setTyping(false);
    }, 1200);
  };

  const generateIntelligentResponse = (query) => {
    const q = query.toLowerCase();

    // Direct API search by name
    const apiByName = apis.find(api => 
      api.name.toLowerCase().includes(q) || q.includes(api.name.toLowerCase())
    );

    if (apiByName) {
      return generateAPIDetailsResponse(apiByName);
    }

    // Search by functionality/category
    if (q.includes('authentication') || q.includes('auth') || q.includes('login')) {
      return handleAuthenticationQuery();
    }

    if (q.includes('payment') || q.includes('billing') || q.includes('transaction')) {
      return handlePaymentQuery();
    }

    if (q.includes('user') || q.includes('profile') || q.includes('account')) {
      return handleUserQuery();
    }

    // Department queries
    if (q.includes('department') || q.includes('finance') || q.includes('hr') || q.includes('engineering')) {
      return handleDepartmentQuery(q);
    }

    // Status queries
    if (q.includes('deprecated') || q.includes('beta') || q.includes('active') || q.includes('status')) {
      return handleStatusQuery(q);
    }

    // Type queries
    if (q.includes('rest') || q.includes('java') || q.includes('oracle')) {
      return handleTypeQuery(q);
    }

    // Dependencies and relationships
    if (q.includes('depend') || q.includes('connect') || q.includes('relationship')) {
      return handleDependencyQuery();
    }

    // Navigation commands
    if (q.includes('show') && q.includes('graph')) {
      setViewMode('graph');
      return "🔗 I've switched you to the Knowledge Graph view! You can now see the visual relationships between all APIs. Click on any node to explore detailed information about that API.";
    }

    if (q.includes('filter') || q.includes('search')) {
      return handleFilteringHelp();
    }

    // Statistics and overview
    if (q.includes('statistic') || q.includes('overview') || q.includes('summary') || q.includes('how many')) {
      return generateStatisticsResponse();
    }

    // Help and guidance
    if (q.includes('help') || q.includes('how')) {
      return generateHelpResponse();
    }

    // Default intelligent response
    return generateContextualResponse(q);
  };

  const generateAPIDetailsResponse = (api) => {
    const relatedAPIs = apis.filter(a => 
      a.id !== api.id && (
        a.category === api.category ||
        a.department === api.department ||
        api.dependencies?.includes(a.id) ||
        a.dependencies?.includes(api.id)
      )
    );

    // Auto-show API details
    setDetailViewAPI(api);

    return `📋 **${api.name}** (${api.type.replace('_', ' ')})

**Overview:**
${api.description}

**Details:**
• **Version:** ${api.version}
• **Status:** ${api.status} 
• **Department:** ${api.department}
• **Category:** ${api.category}
• **Usage:** ${api.usage?.requestsPerDay || 'N/A'} requests/day

**Integration Info:**
• **Endpoint:** ${api.endpoint || 'Available in API details'}
• **Authentication:** ${api.authentication || 'See documentation'}
• **Rate Limit:** ${api.rateLimit || 'Standard limits apply'}

**Dependencies:** ${api.dependencies?.length ? api.dependencies.join(', ') : 'None'}
**Related APIs:** ${relatedAPIs.slice(0, 3).map(a => a.name).join(', ')}

I've opened the detailed view for you. Would you like to know more about its integrations or related APIs?`;
  };

  const handleAuthenticationQuery = () => {
    const authAPIs = apis.filter(api => 
      api.category.toLowerCase().includes('auth') || 
      api.name.toLowerCase().includes('auth') ||
      api.description.toLowerCase().includes('auth')
    );

    return `🔐 **Authentication APIs** (${authAPIs.length} found):

${authAPIs.map(api => 
  `• **${api.name}** - ${api.description.substring(0, 80)}...`
).join('\n')}

**Security Features:**
• OAuth 2.0 and JWT token support
• Multi-factor authentication
• Session management  
• Role-based access control

Want me to show details for any specific authentication API?`;
  };

  const handlePaymentQuery = () => {
    const paymentAPIs = apis.filter(api => 
      api.category.toLowerCase().includes('payment') || 
      api.name.toLowerCase().includes('payment') ||
      api.description.toLowerCase().includes('payment')
    );

    return `💳 **Payment & Billing APIs** (${paymentAPIs.length} found):

${paymentAPIs.map(api => 
  `• **${api.name}** - ${api.type.replace('_', ' ')} API`
).join('\n')}

**Supported Features:**
• Credit card processing
• Digital wallet integration
• Subscription billing
• Transaction monitoring
• Refund management

Which payment API would you like to explore in detail?`;
  };

  const handleUserQuery = () => {
    const userAPIs = apis.filter(api => 
      api.name.toLowerCase().includes('user') || 
      api.description.toLowerCase().includes('user') ||
      api.category.toLowerCase().includes('user')
    );

    return `👤 **User Management APIs** (${userAPIs.length} found):

${userAPIs.map(api => 
  `• **${api.name}** - ${api.status} (${api.department})`
).join('\n')}

**User Operations:**
• Profile management
• Account creation/updates
• Preference settings
• Activity tracking

Need specific details about user management functionality?`;
  };

  const handleDepartmentQuery = (query) => {
    const departments = [...new Set(apis.map(api => api.department))];
    let targetDept = departments.find(dept => query.includes(dept.toLowerCase()));
    
    if (targetDept) {
      const deptAPIs = apis.filter(api => api.department === targetDept);
      return `🏢 **${targetDept} Department APIs** (${deptAPIs.length} total):

${deptAPIs.map(api => 
  `• **${api.name}** - ${api.category} (${api.status})`
).join('\n')}

This department specializes in ${deptAPIs[0]?.category} and related services. Which API interests you most?`;
    }

    return `🏢 **Department Overview:**

Available departments:
${departments.map(dept => {
  const count = apis.filter(api => api.department === dept).length;
  return `• **${dept}** - ${count} APIs`;
}).join('\n')}

Which department would you like to explore?`;
  };

  const handleStatusQuery = (query) => {
    const activeAPIs = apis.filter(api => api.status === 'active');
    const betaAPIs = apis.filter(api => api.status === 'beta');
    const deprecatedAPIs = apis.filter(api => api.status === 'deprecated');

    if (query.includes('deprecated')) {
      return `⚠️ **Deprecated APIs** (${deprecatedAPIs.length} total):

${deprecatedAPIs.map(api => 
  `• **${api.name}** - Migrate to newer alternatives`
).join('\n')}

**Migration Guidance:**
These APIs are being phased out. I recommend exploring active alternatives in the same categories.`;
    }

    return `📊 **API Status Overview:**

✅ **Active APIs:** ${activeAPIs.length} (Production ready)
🧪 **Beta APIs:** ${betaAPIs.length} (Testing phase)  
⚠️ **Deprecated APIs:** ${deprecatedAPIs.length} (Phase out planned)

**Recommendation:** Use active APIs for production systems. Which status category interests you?`;
  };

  const handleTypeQuery = (query) => {
    const restAPIs = apis.filter(api => api.type === 'REST_API');
    const javaAPIs = apis.filter(api => api.type === 'JAVA_API');  
    const oracleAPIs = apis.filter(api => api.type === 'ORACLE_API');

    if (query.includes('rest')) {
      return `🌐 **REST APIs** (${restAPIs.length} available):

${restAPIs.slice(0, 5).map(api => 
  `• **${api.name}** - ${api.category}`
).join('\n')}

REST APIs are perfect for web applications and microservices architecture. Need details on any specific REST API?`;
    }

    if (query.includes('java')) {
      return `☕ **Java APIs** (${javaAPIs.length} available):

${javaAPIs.slice(0, 5).map(api => 
  `• **${api.name}** - ${api.department}`  
).join('\n')}

Java APIs are ideal for enterprise applications and backend services. Which Java API catches your interest?`;
    }

    if (query.includes('oracle')) {
      return `🗃️ **Oracle APIs** (${oracleAPIs.length} available):

${oracleAPIs.slice(0, 5).map(api => 
  `• **${api.name}** - ${api.category}`
).join('\n')}

Oracle APIs provide robust database and enterprise system connectivity. Want to explore any Oracle API in detail?`;
    }

    return `🔧 **API Types Overview:**

• **REST APIs:** ${restAPIs.length} (Web services)
• **Java APIs:** ${javaAPIs.length} (Enterprise libraries)  
• **Oracle APIs:** ${oracleAPIs.length} (Database systems)

Which type would you like to explore?`;
  };

  const handleDependencyQuery = () => {
    const apisWithDeps = apis.filter(api => api.dependencies && api.dependencies.length > 0);
    
    return `🔗 **API Dependencies & Relationships:**

APIs with dependencies (${apisWithDeps.length}):
${apisWithDeps.slice(0, 4).map(api => 
  `• **${api.name}** depends on: ${api.dependencies.join(', ')}`
).join('\n')}

💡 Use the Knowledge Graph view to visualize all relationships! The graph shows:
• Direct dependencies
• Category relationships  
• Department connections
• Common tag associations

Would you like me to switch to graph view?`;
  };

  const generateStatisticsResponse = () => {
    const restCount = apis.filter(api => api.type === 'REST_API').length;
    const javaCount = apis.filter(api => api.type === 'JAVA_API').length;
    const oracleCount = apis.filter(api => api.type === 'ORACLE_API').length;
    const departments = [...new Set(apis.map(api => api.department))];
    const categories = [...new Set(apis.map(api => api.category))];

    return `📈 **Comprehensive API Statistics:**

**📊 By Type:**
• REST APIs: ${restCount} (${Math.round(restCount/apis.length*100)}%)
• Java APIs: ${javaCount} (${Math.round(javaCount/apis.length*100)}%)
• Oracle APIs: ${oracleCount} (${Math.round(oracleCount/apis.length*100)}%)

**🏢 Coverage:**
• Departments: ${departments.length}
• Categories: ${categories.length}
• Total APIs: ${apis.length}

**🎯 Current View:**
• Visible APIs: ${filteredApis.length}
• View Mode: ${viewMode}

Want details about any specific category or department?`;
  };

  const generateHelpResponse = () => {
    return `🤖 **AI Assistant Capabilities:**

I have deep knowledge of all ${apis.length} APIs and can help with:

**🔍 Information Queries:**
• "Tell me about [API name]"
• "Which APIs handle authentication?"
• "Show me Finance department APIs"

**📋 Analysis & Insights:**
• API dependencies and relationships
• Status and version information  
• Usage patterns and recommendations

**🎯 Navigation & Actions:**
• Switch between grid/list/graph views
• Filter and search assistance
• Direct API detail access

**💡 Smart Features:**
• Contextual recommendations
• Integration guidance
• Best practice suggestions

Just ask me anything about your APIs in natural language!`;
  };

  const generateContextualResponse = (query) => {
    // Fallback intelligent response
    const suggestions = [
      "Try asking about specific APIs by name",
      "Ask about API categories like 'authentication' or 'payments'", 
      "Inquire about departments or API status",
      "Request statistics or overviews",
      "Ask for help with navigation or filtering"
    ];

    return `🤔 I understand you're looking for information, but I need a bit more context.

Here are some things you can ask me:
${suggestions.map(s => `• ${s}`).join('\n')}

**Examples:**
• "Show me payment APIs"
• "What's the User Management API?"
• "Which APIs are deprecated?"
• "Switch to graph view"

What would you like to know about our API catalog?`;
  };

  const handleFilteringHelp = () => {
    return `🔍 **Advanced Filtering & Search Guide:**

**Current Status:**
• Total APIs: ${apis.length}
• Currently visible: ${filteredApis.length}
• Active filters: ${Object.values(searchFilters).some(v => Array.isArray(v) ? v.length > 0 : v) ? 'Yes' : 'None'}

**Search Options:**
• Text search in names/descriptions
• Filter by type (REST, Java, Oracle)
• Category-based filtering
• Department filtering
• Status filtering (active, beta, deprecated)

**Pro Tips:**
• Combine multiple filters for precise results
• Use the graph view to explore relationships
• Click API cards for detailed information

Need help finding something specific?`;
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 group animate-pulse"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-8 h-8" />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
          
          {/* Enhanced Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
            🤖 AI Assistant - Ask about APIs
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        </button>
      )}

      {/* AI Chat Interface */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          {/* Custom Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">API Intelligence Assistant</h3>
                <p className="text-xs text-blue-100">Knows all {apis.length} APIs • Real-time insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={closeChat}
                className="w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Interface */}
          {!isMinimized && (
            <div style={{ height: "520px" }}>
              <MainContainer>
                <ChatContainer>
                  <MessageList 
                    scrollBehavior="smooth"
                    typingIndicator={typing ? <TypingIndicator content="AI is analyzing your request..." /> : null}
                  >
                    {messages.map((message, i) => (
                      <Message
                        key={i}
                        model={{
                          message: message.message,
                          sentTime: message.sentTime,
                          sender: message.sender,
                          direction: message.direction
                        }}
                      >
                        <Avatar 
                          src={message.sender === 'assistant' ? 
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366f1'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40'%3E🤖%3C/text%3E%3C/svg%3E" :
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2310b981'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40'%3E👤%3C/text%3E%3C/svg%3E"
                          } 
                        />
                      </Message>
                    ))}
                  </MessageList>
                  <MessageInput 
                    placeholder="Ask me anything about your APIs..." 
                    onSend={processMessage}
                    attachButton={false}
                  />
                </ChatContainer>
              </MainContainer>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default IntelligentChatbot;