# OpenAI Chatbot Integration Guide

## Overview
The API Knowledge Hub now includes an AI-powered chatbot using OpenAI's GPT models for natural, intelligent conversations about your APIs.

## Features

### 🤖 AI-Powered Responses
- Natural language understanding
- Context-aware conversations
- Intelligent API recommendations
- Dynamic learning from your API catalog

### 🔄 Dual Mode Operation
- **AI Mode**: Uses OpenAI GPT for advanced natural language processing
- **Rule-Based Mode**: Falls back to pattern matching (no API key needed)
- Easy toggle between modes in the chat interface

### 🎯 Smart Capabilities
- Semantic search across APIs
- Understanding of user intent
- Contextual recommendations
- Multi-turn conversations with memory

## Setup Instructions

### Step 1: Install Dependencies

Due to network restrictions, you may need to install the OpenAI package manually:

```bash
npm install openai
```

If npm registry is blocked, try alternative methods:
```bash
# Using yarn
yarn add openai

# Or download and install manually from npmjs.com
```

### Step 2: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the API key (starts with `sk-...`)

### Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Open `.env` file and add your OpenAI API key:
```bash
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

**Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### Step 4: Restart Development Server

```bash
npm run dev
```

The chatbot will automatically detect the API key and enable AI mode.

## Usage

### Opening the Chatbot
- Click the floating purple chat button in the bottom-right corner
- The button shows a green indicator when AI is active

### AI Mode Indicator
- **AI badge** visible in header when AI mode is active
- **Sparkles icon** (✨) replaces message icon
- **Toggle button** to switch between AI and rule-based modes

### Example Conversations

**Natural Language Queries:**
```
User: "I need an API to handle payments"
AI: Analyzes your catalog and recommends relevant payment APIs with explanations

User: "What's the difference between REST and Java APIs?"
AI: Provides detailed comparison based on your actual APIs

User: "Show me everything related to user authentication"
AI: Lists all authentication-related APIs with context
```

**API Discovery:**
```
User: "What can the Payment Gateway API do?"
AI: Provides comprehensive details about capabilities, integration, and usage

User: "Which APIs work well with the User Management API?"
AI: Suggests compatible APIs based on relationships and common patterns
```

**Intelligent Recommendations:**
```
User: "I'm building a customer portal, what APIs should I use?"
AI: Analyzes requirements and suggests a complete API stack with reasoning
```

## Configuration Options

### Model Selection

Edit `.env` to choose different GPT models:

```bash
# Faster, cost-effective (recommended)
VITE_OPENAI_MODEL=gpt-3.5-turbo

# More capable, slower, more expensive
VITE_OPENAI_MODEL=gpt-4

# Latest GPT-4 Turbo
VITE_OPENAI_MODEL=gpt-4-turbo-preview
```

### Conversation Parameters

The AI service (`src/lib/aiService.js`) includes configurable parameters:

```javascript
const completion = await this.client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: messages,
  temperature: 0.7,        // Creativity (0-1)
  max_tokens: 500,         // Response length
  presence_penalty: 0.6,   // Topic diversity
  frequency_penalty: 0.3   // Word repetition
});
```

Adjust these in `aiService.js` based on your needs:
- **temperature**: Lower = more focused, Higher = more creative
- **max_tokens**: Control response length (cost impact)
- **penalties**: Reduce repetition and encourage varied responses

## Cost Management

### Estimated Costs (GPT-3.5-turbo)
- Input: $0.0015 per 1K tokens
- Output: $0.002 per 1K tokens
- Average conversation turn: ~300-500 tokens
- **Estimated**: ~$0.001 per message exchange

### Best Practices
1. **Use GPT-3.5-turbo for production** (10x cheaper than GPT-4)
2. **Implement rate limiting** if needed
3. **Monitor usage** on OpenAI dashboard
4. **Set spending limits** in OpenAI account settings

### Free Tier
OpenAI provides $5 in free credits for new accounts, good for:
- ~5,000 messages with GPT-3.5-turbo
- Perfect for testing and development

## Troubleshooting

### "OpenAI package not installed"
```bash
npm install openai
# If it fails, try:
npm cache clean --force
npm install openai --legacy-peer-deps
```

### "Authentication error: Invalid OpenAI API key"
- Check `.env` file has correct key format: `sk-...`
- Ensure no extra spaces or quotes
- Verify key is valid on OpenAI dashboard

### "Rate limit exceeded"
- Wait a few minutes before retrying
- Check usage limits on OpenAI dashboard
- Consider upgrading OpenAI account tier

### "AI chatbot is not configured"
- Verify `.env` file exists (not just `.env.example`)
- Confirm `VITE_OPENAI_API_KEY` is set correctly
- Restart dev server after adding environment variables

### Network connectivity issues
- Check proxy settings if behind corporate firewall
- Verify access to `api.openai.com`
- Try alternative installation methods for npm packages

## Fallback Mode

If OpenAI is unavailable, the chatbot automatically falls back to rule-based responses:
- Pattern matching for common queries
- API catalog search and filtering
- Navigation assistance
- Still functional without API key

## Advanced Features

### Custom System Prompts
Edit `aiService.js` → `getSystemPrompt()` to customize AI behavior and expertise.

### API Context Enhancement
The AI automatically includes:
- Your entire API catalog
- API relationships and dependencies
- Department and category information
- Current user context and filters

### Intelligent Search
Use the AI service for semantic search:
```javascript
const results = await aiService.intelligentSearch("payment processing");
```

### API Recommendations
Get AI-powered suggestions:
```javascript
const recommendations = await aiService.recommendAPIs("I need user authentication");
```

## Security Considerations

### API Key Security
- ✅ Never commit `.env` to version control
- ✅ Use environment variables only
- ✅ Rotate keys regularly
- ⚠️ `dangerouslyAllowBrowser: true` is set for demo purposes
- 🔒 For production, implement server-side proxy

### Recommended Production Architecture
```
Frontend (React) 
    ↓
Your Backend API Server
    ↓
OpenAI API
```

This prevents exposing your OpenAI key in the browser.

## Support

### OpenAI Resources
- [OpenAI Documentation](https://platform.openai.com/docs)
- [API Reference](https://platform.openai.com/docs/api-reference)
- [Community Forum](https://community.openai.com/)

### Project Resources
- Check `src/lib/aiService.js` for implementation details
- Review `IntelligentChatbot.jsx` for UI integration
- See `.env.example` for all configuration options

## Future Enhancements

Planned features:
- [ ] Voice input/output
- [ ] API code generation
- [ ] Multi-language support
- [ ] Integration examples
- [ ] Usage analytics dashboard
- [ ] Custom training on your documentation

---

**Ready to get started?**
1. Install OpenAI package: `npm install openai`
2. Add API key to `.env`
3. Restart server
4. Click the chat button! 🚀
