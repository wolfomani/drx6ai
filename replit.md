# Dr.X AI Chat Application

## Overview

This is a full-stack AI chat application built with React, Express, and TypeScript. The application provides a multi-model AI chat interface with support for various AI providers including Google's Gemini, DeepSeek, and others. It features a modern, dark-themed UI with Arabic language support and real-time chat functionality.

## User Preferences

Preferred communication style: Simple, everyday language.
Architecture focus: AI-Native Interactive UX with Cognitive Interface design
UI Philosophy: Explainable AI UX showing internal model reasoning
Features: Multi-model orchestration, reasoning modes, cognitive AI states

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and bundling
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Development**: tsx for TypeScript execution
- **Build**: esbuild for production bundling

### Database & ORM
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Located in `shared/schema.ts` for type safety across frontend and backend
- **Migrations**: Drizzle Kit for schema migrations
- **Storage**: Currently using in-memory storage with interface for easy database integration

## Key Components

### AI Integration
- **Provider Pattern**: Modular AI provider system supporting multiple models
- **Supported Providers**: Google Gemini, DeepSeek (extensible for more)
- **Model Selection**: Dynamic model switching within conversations
- **Chat Interface**: Real-time messaging with attachment support

### Chat System
- **Conversations**: Full conversation management with CRUD operations
- **Messages**: Message storage with role-based categorization (user/assistant)
- **Attachments**: Support for file attachments with metadata storage
- **Real-time Updates**: Optimistic updates with React Query
- **Cognitive Interface**: Visual reasoning display showing AI thinking process
- **Multi-Model Support**: DeepSeek (reasoning), Groq (speed), Together (open-source), Gemini (multimodal)

### UI/UX Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Theme**: Custom dark theme with Dr.X branding
- **Arabic Support**: RTL text direction and Arabic language interface
- **Voice Recording**: Audio input capability with browser APIs
- **Suggestion Chips**: Quick action buttons for common prompts
- **Cognitive UI**: Real-time display of AI reasoning steps and thinking process
- **Model Status Indicators**: Live status showing AI thinking stages
- **Conversation Sidebar**: Organized conversation management with collapsible design
- **AI Thinking Visualization**: Progressive indicators showing analysis, processing, and generation stages

### Shared Types
- **Schema Validation**: Zod schemas for runtime type checking
- **Type Safety**: Shared TypeScript types between frontend and backend
- **API Contracts**: Consistent request/response structures

## Data Flow

1. **User Interaction**: User submits message through MessageInput component
2. **State Update**: React Query handles optimistic updates and caching
3. **API Request**: Request sent to Express backend with conversation context
4. **AI Processing**: Backend routes to appropriate AI provider
5. **Response Handling**: AI response processed and stored
6. **UI Update**: Frontend receives response and updates conversation view

## External Dependencies

### AI Services
- **Google AI**: Gemini API integration for text generation
- **DeepSeek**: Placeholder for DeepSeek API integration
- **Extensible**: Architecture supports additional AI providers

### Database
- **Neon Database**: PostgreSQL hosting (configured via DATABASE_URL)
- **Connection Pooling**: Built-in connection management

### Authentication
- **Session Management**: Express sessions with PostgreSQL storage
- **Security**: CORS and security middleware configured

## Deployment Strategy

### Development
- **Hot Reload**: Vite dev server with HMR
- **TypeScript**: Real-time type checking
- **API Proxy**: Development server proxies API requests

### Production Build
- **Frontend**: Vite builds React app to static files
- **Backend**: esbuild bundles Express server
- **Environment**: NODE_ENV-based configuration
- **Assets**: Static file serving from dist/public

### Environment Configuration
- **Database**: DATABASE_URL for PostgreSQL connection
- **AI APIs**: GEMINI_API_KEY, DEEPSEEK_API_KEY for respective services
- **Build**: Separate development and production configurations

### Key Design Decisions

1. **Monorepo Structure**: Single repository with shared types and schemas
2. **Type Safety**: End-to-end TypeScript with runtime validation
3. **Modular AI Providers**: Interface-based design for easy provider swapping
4. **React Query**: Chosen for excellent caching and optimistic updates
5. **Drizzle ORM**: Type-safe database operations with PostgreSQL
6. **Tailwind + shadcn/ui**: Rapid UI development with consistent design system
7. **Express.js**: Simple, well-understood backend framework
8. **In-Memory Fallback**: Graceful degradation when database not available

## Recent Changes

### Major Update - January 23, 2025
- **API Integration Success**: Fixed environment variable loading with dotenv package
- **DeepSeek API**: Successfully configured with chat completions endpoint and reasoning display
- **Gemini API**: Integrated with thinking configuration (gemini-2.0-flash-thinking-exp model)
- **Together API**: Added support for DeepSeek-R1-Distill-Llama-70B-free model (free tier)
- **Cognitive UI**: Enhanced reasoning display for all supported models
- **Performance**: DeepSeek ~30s (deep analysis), Gemini ~1s (fast thinking), Together ~5s (balanced)
- **Error Handling**: Comprehensive API error management and status indicators
- **UI Improvements**: Enhanced thinking indicators and model-specific messaging

### Working Models Status
- ✅ **DeepSeek**: Fully functional with advanced reasoning
- ✅ **Gemini**: Fast thinking model with excellent performance  
- ✅ **Together**: Free DeepSeek-R1 model working perfectly
- ❌ **Groq**: Requires updated API key (401 authentication error)