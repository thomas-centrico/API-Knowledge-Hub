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
   * Build system prompt with API context
   */
  getSystemPrompt() {
    const apiSummary = this.apiContext.slice(0, 10).map(api => 
      `- ${api.name} (${api.type}): ${api.description}`
    ).join('\n');

    return `You are an intelligent API assistant for an API Knowledge Hub platform. You help users discover, understand, and integrate business APIs.

Available APIs in the system:
${apiSummary}

Your capabilities:
- Answer questions about available APIs
- Explain API functionalities and use cases
- Suggest relevant APIs based on user needs
- Provide guidance on API integration
- Help with API troubleshooting
- Compare different API options

Guidelines:
- Be concise and helpful
- Reference specific APIs from the available list when relevant
- If you don't have information about a specific API, be honest
- Provide practical examples when possible
- Use a friendly, professional tone`;
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
}

// Export singleton instance
const aiService = new AIService();
export default aiService;
