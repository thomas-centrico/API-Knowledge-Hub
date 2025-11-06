/**
 * AI Service for OpenAI Integration
 * Handles chatbot conversations and API-related queries
 */

// Note: Install openai package when network is available
// Run: npm install openai

let OpenAI;
try {
  // Dynamic import to handle if package is not installed yet
  const openaiModule = await import('openai');
  OpenAI = openaiModule.default;
} catch (error) {
  console.warn('OpenAI package not installed. Run: npm install openai');
}

class AIService {
  constructor() {
    this.client = null;
    this.conversationHistory = [];
    this.apiContext = [];
    this.isInitialized = false;
  }

  /**
   * Initialize OpenAI client with API key
   */
  initialize() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      console.warn('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file');
      return false;
    }

    if (!OpenAI) {
      console.error('OpenAI package not available. Run: npm install openai');
      return false;
    }

    try {
      this.client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Enable browser usage (for demo purposes)
      });
      this.isInitialized = true;
      console.log('✅ AI Service initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      return false;
    }
  }

  /**
   * Set API context for enhanced responses
   * @param {Array} apis - List of APIs to provide as context
   */
  setAPIContext(apis) {
    this.apiContext = apis;
  }

  /**
   * Build enhanced system prompt with API context
   */
  getSystemPrompt() {
    // Create comprehensive API catalog
    const apiCatalog = this.apiContext.map(api => ({
      id: api.id,
      name: api.name,
      type: api.type,
      description: api.description,
      category: api.category,
      department: api.department,
      status: api.status,
      tags: api.tags?.join(', ') || '',
      dependencies: api.dependencies?.join(', ') || 'none'
    }));

    // Group APIs by category for better context
    const categories = [...new Set(this.apiContext.map(api => api.category))];
    const categoryBreakdown = categories.map(cat => {
      const count = this.apiContext.filter(api => api.category === cat).length;
      return `${cat}: ${count} APIs`;
    }).join(', ');

    return `You are an advanced AI assistant for the API Knowledge Hub - an intelligent API discovery and integration platform. You have deep understanding of natural language and can interpret user intent with high accuracy.

## Your Enhanced Capabilities:

### 1. Natural Language Understanding
- Understand complex, conversational queries
- Handle ambiguous or vague questions intelligently
- Recognize user intent (search, compare, integrate, troubleshoot, learn)
- Extract key entities and requirements from queries
- Understand context from previous conversations

### 2. API Knowledge Base
Total APIs: ${this.apiContext.length}
Categories: ${categoryBreakdown}

Sample APIs:
${apiCatalog.slice(0, 8).map(api => 
  `• ${api.name} (${api.type.replace('_', ' ')}) - ${api.category}
    ${api.description}
    Tags: ${api.tags || 'N/A'} | Status: ${api.status}`
).join('\n')}

### 3. Smart Query Interpretation Examples:
- "I need something for payments" → Identify payment-related APIs
- "APIs used by Finance team" → Filter by department
- "Fast authentication" → Consider both auth category AND performance
- "What's better: API A or B?" → Provide detailed comparison
- "How do I integrate X?" → Provide step-by-step guidance

### 4. Response Strategy:
- **Direct Questions**: Provide specific, factual answers
- **Vague Queries**: Ask clarifying questions or provide top options
- **Comparison Requests**: Create structured comparisons
- **Integration Help**: Offer practical implementation guidance
- **Troubleshooting**: Diagnose issues and suggest solutions

### 5. Response Format Guidelines:
- Use **bold** for emphasis on API names and key points
- Use bullet points (•) for lists
- Include relevant metrics (version, status, performance)
- Suggest related or alternative APIs when appropriate
- Be conversational yet professional
- Keep responses concise but informative (2-4 paragraphs max)

### 6. Context Awareness:
- Remember previous questions in the conversation
- Build upon earlier topics
- Reference APIs discussed before
- Maintain conversation coherence

### 7. Intelligent Behaviors:
- If user asks about non-existent API, suggest closest matches
- Proactively mention important details (deprecation, dependencies)
- Warn about compatibility or integration challenges
- Recommend best practices

Always prioritize user needs and provide actionable information. Be helpful, accurate, and engaging.`;
  }

  /**
   * Send a message to the chatbot and get a response
   * @param {string} userMessage - User's message
   * @returns {Promise<string>} - AI response
   */
  async chat(userMessage) {
    if (!this.isInitialized) {
      const initialized = this.initialize();
      if (!initialized) {
        return "I'm sorry, but the AI chatbot is not configured yet. Please add your OpenAI API key to the .env file.";
      }
    }

    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Keep conversation history manageable (last 10 messages)
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      // Build messages array with system prompt
      const messages = [
        {
          role: 'system',
          content: this.getSystemPrompt()
        },
        ...this.conversationHistory
      ];

      // Call OpenAI API
      const completion = await this.client.chat.completions.create({
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      });

      const assistantMessage = completion.choices[0].message.content;

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      return assistantMessage;

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      if (error.status === 401) {
        return "Authentication error: Invalid OpenAI API key. Please check your .env configuration.";
      } else if (error.status === 429) {
        return "Rate limit exceeded. Please try again in a moment.";
      } else if (error.status === 500) {
        return "OpenAI service is temporarily unavailable. Please try again later.";
      }
      
      return "I'm sorry, I encountered an error processing your request. Please try again.";
    }
  }

  /**
   * Search for relevant APIs based on user query
   * @param {string} query - User's search query
   * @returns {Promise<Array>} - Filtered APIs
   */
  async intelligentSearch(query) {
    if (!this.isInitialized) {
      // Fallback to simple search if AI not available
      return this.apiContext.filter(api => 
        api.name.toLowerCase().includes(query.toLowerCase()) ||
        api.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    try {
      // Use AI to understand search intent
      const completion = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: 'Extract search keywords and API type from user query. Return JSON: {keywords: [], type: "REST_API|JAVA_API|ORACLE_API|null", intent: "search|integrate|learn"}'
        }, {
          role: 'user',
          content: query
        }],
        temperature: 0.3,
        response_format: { type: "json_object" }
      });

      const aiIntent = JSON.parse(completion.choices[0].message.content);
      
      // Filter APIs based on AI understanding
      return this.apiContext.filter(api => {
        const matchesType = !aiIntent.type || api.type === aiIntent.type;
        const matchesKeywords = aiIntent.keywords.some(kw => 
          api.name.toLowerCase().includes(kw.toLowerCase()) ||
          api.description.toLowerCase().includes(kw.toLowerCase()) ||
          api.department?.toLowerCase().includes(kw.toLowerCase())
        );
        return matchesType && matchesKeywords;
      });

    } catch (error) {
      console.error('Error in intelligent search:', error);
      // Fallback to simple search
      return this.apiContext.filter(api => 
        api.name.toLowerCase().includes(query.toLowerCase()) ||
        api.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  /**
   * Get API recommendations based on user needs
   * @param {string} userNeed - Description of what user needs
   * @returns {Promise<Array>} - Recommended APIs with explanations
   */
  async recommendAPIs(userNeed) {
    if (!this.isInitialized) {
      return [];
    }

    try {
      const apiList = this.apiContext.map(api => 
        `${api.id}: ${api.name} - ${api.description}`
      ).join('\n');

      const completion = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `You are an API recommendation expert. Based on user needs, recommend the most relevant APIs from this list:\n\n${apiList}\n\nReturn JSON array: [{apiId: number, reason: string, confidence: "high|medium|low"}]`
        }, {
          role: 'user',
          content: userNeed
        }],
        temperature: 0.5,
        response_format: { type: "json_object" }
      });

      const recommendations = JSON.parse(completion.choices[0].message.content);
      return recommendations;

    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    }
  }

  /**
   * Enhanced Natural Language Understanding - Extract user intent and entities
   * @param {string} query - User's natural language query
   * @returns {Promise<Object>} - Structured intent analysis
   */
  async analyzeIntent(query) {
    if (!this.isInitialized) {
      return this.fallbackIntentAnalysis(query);
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `Analyze the user's query and extract structured information. Return JSON with:
{
  "intent": "search|compare|integrate|troubleshoot|learn|general",
  "entities": {
    "apiNames": [],
    "apiTypes": [],
    "categories": [],
    "departments": [],
    "features": [],
    "requirements": []
  },
  "sentiment": "positive|neutral|negative|urgent",
  "complexity": "simple|moderate|complex",
  "needsClarification": boolean,
  "suggestedClarification": "question to ask user if needsClarification is true"
}`
        }, {
          role: 'user',
          content: query
        }],
        temperature: 0.3,
        response_format: { type: "json_object" }
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing intent:', error);
      return this.fallbackIntentAnalysis(query);
    }
  }

  /**
   * Fallback intent analysis using pattern matching
   */
  fallbackIntentAnalysis(query) {
    const q = query.toLowerCase();
    
    // Detect intent
    let intent = 'general';
    if (q.includes('compare') || q.includes('vs') || q.includes('difference')) intent = 'compare';
    else if (q.includes('integrate') || q.includes('implement') || q.includes('how to')) intent = 'integrate';
    else if (q.includes('error') || q.includes('issue') || q.includes('problem')) intent = 'troubleshoot';
    else if (q.includes('learn') || q.includes('tutorial') || q.includes('guide')) intent = 'learn';
    else if (q.includes('find') || q.includes('search') || q.includes('show') || q.includes('list')) intent = 'search';

    // Extract entities
    const apiTypes = [];
    if (q.includes('rest')) apiTypes.push('REST_API');
    if (q.includes('java')) apiTypes.push('JAVA_API');
    if (q.includes('oracle')) apiTypes.push('ORACLE_API');

    return {
      intent,
      entities: {
        apiNames: [],
        apiTypes,
        categories: [],
        departments: [],
        features: [],
        requirements: []
      },
      sentiment: q.includes('urgent') || q.includes('asap') ? 'urgent' : 'neutral',
      complexity: 'moderate',
      needsClarification: false,
      suggestedClarification: null
    };
  }

  /**
   * Enhanced chat with intent-aware responses
   * @param {string} userMessage - User's message
   * @returns {Promise<string>} - AI response
   */
  async chatWithIntent(userMessage) {
    // First analyze the intent
    const intentAnalysis = await this.analyzeIntent(userMessage);
    
    // If clarification needed, ask for it
    if (intentAnalysis.needsClarification && intentAnalysis.suggestedClarification) {
      return `🤔 ${intentAnalysis.suggestedClarification}`;
    }

    // Enhance the response based on intent
    const enhancedContext = this.buildEnhancedContext(intentAnalysis);
    
    // Use regular chat with enhanced context
    return this.chat(userMessage, enhancedContext);
  }

  /**
   * Build enhanced context based on intent analysis
   */
  buildEnhancedContext(intentAnalysis) {
    const { intent, entities } = intentAnalysis;
    let contextAddition = '';

    // Add relevant APIs to context based on entities
    if (entities.apiTypes.length > 0) {
      const relevantAPIs = this.apiContext.filter(api => 
        entities.apiTypes.includes(api.type)
      );
      contextAddition += `\nFocus on ${entities.apiTypes.join(' and ')} APIs. `;
    }

    if (entities.categories.length > 0) {
      contextAddition += `User is interested in ${entities.categories.join(', ')} categories. `;
    }

    // Add intent-specific guidance
    switch(intent) {
      case 'compare':
        contextAddition += '\nProvide a structured comparison with pros/cons. ';
        break;
      case 'integrate':
        contextAddition += '\nProvide step-by-step integration guidance with code examples if possible. ';
        break;
      case 'troubleshoot':
        contextAddition += '\nDiagnose the issue and provide solutions. ';
        break;
      case 'learn':
        contextAddition += '\nProvide educational content with examples and best practices. ';
        break;
    }

    return contextAddition;
  }

  /**
   * Multi-turn conversation with context preservation
   * @param {string} userMessage - User's message  
   * @param {string} additionalContext - Additional context to add
   * @returns {Promise<string>} - AI response
   */
  async chat(userMessage, additionalContext = '') {
    if (!this.isInitialized) {
      const initialized = this.initialize();
      if (!initialized) {
        return "I'm sorry, but the AI chatbot is not configured yet. Please add your OpenAI API key to the .env file.";
      }
    }

    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage + (additionalContext ? `\n[Context: ${additionalContext}]` : '')
      });

      // Keep conversation history manageable (last 10 messages)
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      // Build messages array with system prompt
      const messages = [
        {
          role: 'system',
          content: this.getSystemPrompt()
        },
        ...this.conversationHistory
      ];

      // Call OpenAI API
      const completion = await this.client.chat.completions.create({
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 600,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      });

      const assistantMessage = completion.choices[0].message.content;

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      return assistantMessage;

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      if (error.status === 401) {
        return "Authentication error: Invalid OpenAI API key. Please check your .env configuration.";
      } else if (error.status === 429) {
        return "Rate limit exceeded. Please try again in a moment.";
      } else if (error.status === 500) {
        return "OpenAI service is temporarily unavailable. Please try again later.";
      }
      
      return "I'm sorry, I encountered an error processing your request. Please try again.";
    }
  }

  /**
   * Semantic similarity search using embeddings
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Ranked APIs by relevance
   */
  async semanticSearch(query) {
    if (!this.isInitialized) {
      return this.intelligentSearch(query);
    }

    try {
      // Get embedding for user query
      const queryEmbedding = await this.client.embeddings.create({
        model: 'text-embedding-ada-002',
        input: query
      });

      // For now, use intelligent search as fallback
      // In production, you would store API embeddings and compute similarity
      return this.intelligentSearch(query);

    } catch (error) {
      console.error('Error in semantic search:', error);
      return this.intelligentSearch(query);
    }
  }

  /**
   * Generate contextual follow-up questions
   * @returns {Array<string>} - Suggested follow-up questions
   */
  generateFollowUpQuestions() {
    const lastUserMessage = this.conversationHistory
      .filter(msg => msg.role === 'user')
      .slice(-1)[0];

    if (!lastUserMessage) {
      return [
        "Which department are you working in?",
        "What type of integration are you planning?",
        "Are you looking for REST, Java, or Oracle APIs?"
      ];
    }

    // Generate context-aware follow-ups based on conversation
    return [
      "Would you like to see code examples?",
      "Do you need information about API dependencies?",
      "Should I compare this with similar APIs?",
      "Would you like to know about integration best practices?"
    ];
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Check if AI service is ready
   */
  isReady() {
    return this.isInitialized && this.client !== null;
  }

  /**
   * Get conversation summary
   */
  getConversationSummary() {
    return {
      messageCount: this.conversationHistory.length,
      userMessages: this.conversationHistory.filter(m => m.role === 'user').length,
      assistantMessages: this.conversationHistory.filter(m => m.role === 'assistant').length
    };
  }
}

// Export singleton instance
const aiService = new AIService();
export default aiService;
