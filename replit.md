# Overview

This is a full-stack portfolio website for Mauricio Cárcamo, a Data Scientist and Sociologist. The application showcases professional experience, projects, education, and contact information through a modern, responsive web interface. Built as a single-page application with a React frontend and Express backend, it's designed to present a professional portfolio with smooth navigation and interactive elements.

# User Preferences

Preferred communication style: Simple, everyday language.
Color preferences: Masculine and professional color palette (dark steel blue tones).
Deployment: GitHub Pages compatible with static HTML structure.
Project focus: Data science portfolio with emphasis on professional presentation.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component system for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack React Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules for modern JavaScript features
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for efficient bundling and deployment

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle migrations with shared schema definitions
- **Development Storage**: In-memory storage implementation for development/testing

## Authentication and Authorization
- **Session Management**: PostgreSQL-based sessions using connect-pg-simple
- **User Schema**: Basic user model with username/password fields and UUID primary keys
- **Validation**: Zod schemas for runtime type validation and data integrity

## External Dependencies

### Third-party Services
- **Database**: Neon Database (serverless PostgreSQL hosting)
- **Asset Storage**: Local asset storage for certificates and images
- **Social Integration**: WhatsApp API for automated communications
- **External Links**: GitHub, LinkedIn, and email integration for professional networking

### Key Libraries and Frameworks
- **UI Framework**: React with Radix UI primitives and shadcn/ui components
- **Database**: Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React and React Icons for consistent iconography
- **Development**: Vite with React plugin and TypeScript support
- **Deployment**: Replit-specific plugins for development environment integration

### Development Tools
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESM modules with modern JavaScript features
- **Build Process**: Vite for development, esbuild for production bundling
- **Development Server**: Express with Vite middleware integration for hot module replacement