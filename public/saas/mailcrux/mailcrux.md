# Mail Crux - AI-Powered Email Intelligence System

Mail Crux is an intelligent email management and summarization platform that transforms how users interact with their inbox through AI-powered categorization, sentiment analysis, and automated daily summaries. Unlike traditional email clients, Mail Crux processes emails using natural language processing to surface what matters most, extract action items, and provide contextual insights about communication patterns.

## Core Objective

The primary objective of Mail Crux is to reduce email overload by automatically analyzing, categorizing, and summarizing email content. It integrates with Gmail to fetch real emails, processes them through a sophisticated NLP pipeline, and presents them through a familiar Gmail-inspired interface enhanced with intelligent features like importance scoring, sentiment analysis, and daily summaries.

## System Architecture

Mail Crux consists of two integrated components that work together seamlessly:

### Frontend (React Application)
- **Location**: Root directory
- **Technology**: React 17, Material UI, Redux, Firebase
- **Purpose**: Provides a Gmail-like user interface for viewing and managing emails
- **Features**: 
  - Real-time email display with Firebase integration
  - Category-based email organization (Inbox, Social, Promotions, Updates, Forums)
  - Compose and send emails
  - User authentication via Google Firebase
  - Responsive design with sidebar navigation

### Backend (Smart Email Manager)
- **Location**: `Email/` subdirectory
- **Technology**: Node.js, Express, MongoDB, Gmail API, OpenAI API
- **Purpose**: Handles email processing, NLP analysis, and intelligent features
- **Features**:
  - Gmail API integration for fetching real emails
  - Natural language processing for categorization
  - Sentiment analysis and importance scoring
  - AI-powered summarization (with OpenAI)
  - Daily email summary generation
  - Action item extraction

## How It Works Together

1. **User Authentication**: Users sign in via Google OAuth through the React frontend
2. **Gmail Integration**: Backend connects to Gmail API using OAuth tokens to fetch emails
3. **Email Processing Pipeline**:
   - Emails are extracted from Gmail API
   - NLP algorithms categorize emails (Important, Social, Promotions, Updates, Forums)
   - Sentiment analysis determines tone (positive, neutral, negative)
   - Importance scoring (0-100) prioritizes emails based on content and context
   - AI generates concise summaries and extracts key points
   - Action items are identified and extracted
4. **Data Storage**: Processed emails are stored in MongoDB with all metadata
5. **Frontend Display**: React app fetches processed emails and displays them with smart indicators
6. **Daily Summaries**: Scheduled tasks generate daily summaries highlighting important communications, action items, and communication patterns

## Key Features

### Intelligent Email Categorization
- Uses rule-based NLP patterns and optional OpenAI integration
- Automatically sorts emails into: Important, Social, Promotions, Updates, Forums
- Learns from user behavior patterns

### Importance Scoring
- Calculates 0-100 importance score based on:
  - Keyword analysis (urgent, important, deadline, etc.)
  - Recipient count (fewer recipients = higher importance)
  - Sender reputation (excludes noreply, marketing addresses)
  - Category weighting

### Sentiment Analysis
- Analyzes email tone using natural language processing
- Identifies positive, neutral, or negative sentiment
- Helps users understand emotional context of communications

### AI-Powered Summarization
- Generates concise 1-2 sentence summaries of email content
- Uses OpenAI GPT when API key is available
- Falls back to extractive summarization when unavailable
- Helps users quickly understand email content without reading full text

### Action Item Extraction
- Identifies requests, tasks, and action items within emails
- Extracts key points for quick reference
- Aggregates action items across emails in daily summaries

### Daily Email Summaries
- Scheduled generation of daily email activity reports
- Includes:
  - Overview of email activity
  - Top important emails
  - Aggregated action items
  - Communication patterns (busy periods, top senders)
  - Sentiment breakdown
- Helps users stay on top of inbox without reading every email

### Gmail Integration
- Secure OAuth 2.0 authentication with Gmail
- Real-time email synchronization
- Automatic token refresh for seamless access
- Respects Gmail labels and read status

## Technology Stack

### Frontend
- **React 17**: UI framework
- **Material UI 4**: Component library
- **Redux Toolkit**: State management
- **React Router**: Navigation
- **Firebase**: Authentication and real-time database
- **React Hook Form**: Form handling

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database for email storage
- **Mongoose**: ODM for MongoDB
- **Gmail API**: Email integration
- **Natural (NLP)**: Natural language processing
- **OpenAI API**: Enhanced AI features (optional)
- **JWT**: Authentication

## Benefits Over Traditional Email Clients

1. **Reduced Email Overload**: Automatic categorization and importance scoring helps users focus on what matters
2. **Time Savings**: AI summaries and action item extraction reduce time spent reading emails
3. **Better Organization**: Smart categorization goes beyond manual labeling
4. **Insights**: Daily summaries provide communication pattern analysis
5. **Familiar Interface**: Gmail-inspired design reduces learning curve
6. **Scalable**: Backend can process thousands of emails efficiently
7. **Flexible**: Works with or without OpenAI API (graceful degradation)

## Development Status

The project is currently in active development with:
- ✅ Frontend Gmail clone interface complete
- ✅ Backend NLP processing pipeline implemented
- ✅ Gmail API integration functional
- ✅ MongoDB email storage operational
- ✅ Mock data generation for testing
- ⏳ OpenAI integration (optional enhancement)
- ⏳ Production deployment configuration

## Getting Started

The project can be run in two modes:

### Frontend Only (Gmail Clone)
```bash
npm start
```
Runs the React frontend on http://localhost:3000 with Firebase for email storage.

### Full System (Frontend + Backend)
```bash
cd Email
npm run dev
```
Starts both the React frontend and Node.js backend with full NLP processing capabilities.

## Future Enhancements

- Machine learning model for improved categorization
- Email thread analysis and conversation summarization
- Mobile application
- Advanced analytics dashboard
- Integration with other email providers (Outlook, Exchange)
- Collaborative features for team email management
