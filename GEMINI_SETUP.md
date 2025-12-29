# Google Gemini AI Integration Setup Guide

## Overview

The AskAIChannel component has been completely rewritten to use **Google Gemini AI** instead of predefined responses. The AI now provides **dynamic, intelligent responses** to any question about studies, roadmaps, concepts, and learning strategies.

## What Changed

### ✅ Removed

- Supabase function calls (`/functions/v1/skill-mentor`)
- Hardcoded predefined responses
- Complex SSE (Server-Sent Events) stream parsing logic
- Supabase authentication headers

### ✅ Added

- Direct Google Gemini API integration using `@google/generative-ai`
- Stream-based responses for real-time typing effect
- Conversation context awareness (remembers previous messages)
- Smart error handling for quota limits and API issues
- API key validation with user-friendly warnings

## Setup Instructions

### Step 1: Get Your Gemini API Key (Free)

1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**
2. Click **"Create API Key"** in **new Google Cloud project** (or use existing)
3. Copy the generated API key
4. Paste it into `.env.local` file:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

### Step 2: Restart Development Server

```bash
npm run dev
```

The app will automatically detect the API key and enable the AI Skill Mentor.

## How It Works

### Initialization

- API key is loaded from `VITE_GEMINI_API_KEY` environment variable
- Gemini `gemini-pro` model is initialized on component mount
- If key is missing, a friendly warning appears in the UI

### Conversation Flow

1. User types a question and presses Enter
2. Question is added to messages (with animation)
3. Component sends request to Gemini with conversation history
4. Response streams in real-time, updating the UI character by character
5. Previous messages provide context for better responses

### Error Handling

- **Missing API Key**: Shows warning banner with setup instructions
- **Quota Exceeded**: Tells user to wait before trying again
- **Invalid API Key**: Clear error message with debugging info
- **Network Errors**: Graceful fallback with helpful message

## Key Features

✨ **Dynamic Responses**: Each answer is unique based on your question
📚 **Context Aware**: Remembers previous messages in conversation
⚡ **Real-time Streaming**: See responses appear word-by-word
🎯 **Smart Suggestions**: Helpful prompt suggestions on first interaction
🛡️ **Safe & Secure**: API key stays in your `.env.local` (not in git)
💰 **Free Tier**: Google Gemini API has generous free quota (60 requests/minute)

## Example Questions to Try

- "Explain recursion with examples"
- "Create a study roadmap for data structures"
- "How do I understand Big O notation?"
- "Find free resources for system design"
- "What's the difference between array and linked list?"
- "How do I prepare for coding interviews?"

## Limitations & Usage Limits

- **Rate Limit**: 60 requests per minute (free tier)
- **Max Tokens**: ~4000 character responses
- **Conversation Length**: Can include up to ~20 previous messages in context
- **Model**: Uses Gemini 1.5 Flash for fast, accurate responses

## Troubleshooting

### "API Key Missing" Warning

**Problem**: API key warning appears in the chat  
**Solution**: Add your API key to `.env.local` and restart dev server

### "API Quota Exhausted"

**Problem**: Can't send more messages  
**Solution**: Wait a moment (quota resets within a minute) or use another API key

### Empty Responses

**Problem**: AI responds with empty message  
**Solution**: Try asking again with different phrasing. Check browser console for errors.

### No Suggestions Showing

**Problem**: Suggested prompts don't appear  
**Solution**: These only show on first message. Clear chat or refresh to see them again.

## API Key Security

✅ **Safe**: Stored in `.env.local` (git-ignored by default)  
✅ **Frontend Safe**: Used only in browser (Gemini allows frontend requests)  
⚠️ **Important**: Never commit `.env.local` to git  
⚠️ **Monitor Usage**: Check Google Cloud console for API usage

## Customization Options

### Change AI Model

Edit line in AskAIChannel.tsx:

```typescript
const model = genAIRef.current.getGenerativeModel({ model: "gemini-pro" });
```

Available models:

- `gemini-pro` (current - fast, good for chat)
- `gemini-pro-vision` (with image support)
- `gemini-1.5-flash` (faster, newer)

### Adjust Context Length

Edit the conversation history mapping:

```typescript
.slice(0, -1) // Change this to keep more/fewer messages
```

### Custom System Prompt

Add before sending message:

```typescript
const systemPrompt = "You are an expert educator...";
conversationHistory.push({
  role: "user",
  parts: [{ text: systemPrompt }],
});
```

## File Changes Summary

📝 **Modified**: `src/components/channels/AskAIChannel.tsx`

- Removed Supabase imports and function calls
- Added Google Generative AI import
- Completely rewrote `handleSend()` function
- Added API key validation
- Updated UI warnings and messages

📝 **Created**: `.env.local`

- Stores your Gemini API key securely

📦 **Added Dependency**: `@google/generative-ai@latest`

## Next Steps

1. ✅ API key created
2. ✅ Code updated
3. 📝 Add API key to `.env.local`
4. 🚀 Restart dev server
5. 💬 Start chatting with AI Mentor!

## Support

If you encounter issues:

1. Check browser console (F12 → Console tab)
2. Verify API key in `.env.local`
3. Visit [Google AI Studio](https://aistudio.google.com) to verify key is active
4. Check [Google Cloud Console](https://console.cloud.google.com) for API quota

Happy learning! 🎓
