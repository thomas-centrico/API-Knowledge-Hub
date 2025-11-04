# API Reference Knowledge Graph Platform

This is an AI-powered platform for discovering, exploring, and managing business APIs across different types (REST, Java, Oracle).

## Project Overview

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Features**: API search, knowledge graph visualization, filtering, AI recommendations
- **API Types**: REST APIs, Java APIs, Oracle APIs
- **Visualization**: Interactive knowledge graphs and grid views
- **AI Features**: Semantic search, auto-categorization, recommendations

## Development Guidelines

- Use TypeScript for all new code
- Follow the component-based architecture in `/src/components`
- Maintain type safety with interfaces in `/src/types`
- Use Tailwind CSS for styling
- Implement responsive design for all components

## Key Components

- `Header.tsx`: Main navigation and branding
- `SearchBar.tsx`: AI-powered search interface
- `APIGrid.tsx`: Grid view of API cards
- `APICard.tsx`: Individual API display component
- `KnowledgeGraph.tsx`: Interactive graph visualization
- `FilterSidebar.tsx`: Search filters and view controls

## API Types Supported

- **REST_API**: HTTP-based web APIs
- **JAVA_API**: Java library and framework APIs
- **ORACLE_API**: Oracle database and system APIs

## Current Status

✅ Project scaffolding complete
✅ Core components created
✅ TypeScript types defined
✅ Dependencies installed
✅ Build compilation successful
✅ Development server running on port 3001
✅ Application accessible at http://localhost:3001