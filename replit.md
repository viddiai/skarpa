# Skarpa M&A Advisory Website

## Overview

This is a conversion-optimized website for Skarpa, an M&A advisory firm that helps Swedish business owners (25-300 MSEK deal size) sell their companies. The site focuses on three primary conversion goals:

1. Exit Diagnosis form completion
2. Meeting bookings (Calendly integration)
3. Buyer Guide downloads

The application is built as a single-page marketing site with a professional B2B design approach inspired by Linear, Stripe, and Calendly. It emphasizes trust-building through statistics, case studies, and a clear process timeline while minimizing friction in conversion paths.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing (single-page application with minimal route handling).

**UI Component Library**: shadcn/ui components built on Radix UI primitives, providing accessible and customizable components. The design system uses the "new-york" style variant with custom styling.

**Styling Approach**: 
- Tailwind CSS with custom configuration for the design system
- HSL-based color system with CSS variables for theming
- Custom spacing, typography, and component variants
- Font stack: Inter (primary), DM Sans (accent for statistics/numbers)
- Responsive-first approach with mobile breakpoint at 768px

**State Management**: 
- TanStack Query (React Query) for server state and API interactions
- Local component state with React hooks for UI state
- Toast notifications for user feedback

**Form Handling**: React Hook Form with Zod schema validation for type-safe form submissions.

### Backend Architecture

**Runtime**: Node.js with Express.js server framework.

**Development vs Production**:
- Development: Vite middleware integration for HMR and live reloading
- Production: Static file serving from built assets

**API Structure**: RESTful endpoints for form submissions:
- `/api/exit-diagnosis` - Exit diagnosis form submissions
- `/api/buyer-guide` - Buyer guide download requests
- `/api/contact` - Contact form messages

**Data Validation**: Zod schemas shared between client and server via the `@shared` directory, ensuring type safety across the full stack.

**Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`) for development. The architecture supports swapping to database-backed storage (Drizzle ORM with PostgreSQL schema defined but not actively used).

### Data Storage Solutions

**Database Schema** (Defined but using in-memory storage):
- Drizzle ORM configured for PostgreSQL with Neon serverless driver
- Tables defined: users, exit_diagnoses, buyer_guide_requests, contact_messages
- UUID primary keys with timestamps
- Schema location: `shared/schema.ts` for cross-stack type sharing

**Current Implementation**: In-memory storage using JavaScript Maps for rapid development and demonstration purposes.

**Production Ready**: Database connection string expected via `DATABASE_URL` environment variable when switching to persistent storage.

### Authentication and Authorization

No authentication system currently implemented. The site is a public marketing website with form submissions that don't require user accounts. Future admin panel access would require implementing authentication.

### External Dependencies

**UI Component Libraries**:
- @radix-ui/* - Accessible UI primitives (accordion, dialog, dropdown, navigation, popover, etc.)
- lucide-react - Icon library
- class-variance-authority - Component variant styling
- tailwind-merge & clsx - Class name utilities

**State & Data Fetching**:
- @tanstack/react-query - Server state management
- react-hook-form - Form state and validation
- zod - Schema validation
- @hookform/resolvers - Form validation integration

**Database & ORM**:
- drizzle-orm - TypeScript ORM
- drizzle-zod - Zod schema generation from Drizzle schemas
- @neondatabase/serverless - Neon PostgreSQL serverless driver

**Build & Development Tools**:
- vite - Build tool and dev server
- @vitejs/plugin-react - React plugin for Vite
- @replit/vite-plugin-* - Replit-specific development enhancements
- typescript & tsx - TypeScript runtime and tooling
- esbuild - Server-side bundling for production

**Styling**:
- tailwindcss - Utility-first CSS framework
- autoprefixer - CSS vendor prefixing
- postcss - CSS processing

**Third-Party Integrations**:
- Google Fonts (Inter, DM Sans) - Typography
- Calendly - Meeting scheduling (referenced but not implemented in code)
- Email delivery system (referenced in comments, not implemented)

**Assets**: Static images stored in `attached_assets/generated_images/` directory for hero backgrounds, team photos, and case study visuals.