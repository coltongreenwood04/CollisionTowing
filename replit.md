# Collision Towing - Local Towing Company Website

## Overview

A modern, conversion-optimized website for Collision Towing, a 24/7 towing and roadside assistance company serving Northern Utah. Acquired by Rusty Feik in January 2025, the company operates from multiple locations with the main office in Eden, UT, central offices in West Jordan and Ogden, and storage yards in Murray (Yard #10557), West Jordan, and Ogden.

The application is built as a full-stack web platform featuring a React frontend with shadcn/ui components and an Express backend, designed to maximize lead generation through quote requests, service scheduling, direct phone contact (801-946-6531), and email communication (collisiontow2018@gmail.com).

The site emphasizes mobile-first emergency response with prominent call-to-action buttons, professional trust-building elements, and comprehensive service information across 9 counties (Weber, Morgan, Salt Lake, Davis, Box Elder, Utah, Tooele, Cache, and Summit). The company is on rotation for Utah Highway Patrol (Salt Lake & Weber counties) and Unified Police Department (Midvale).

The company specializes in handling specialty vehicles including exotic cars, electric vehicles (EVs), and lowered vehicles using modern flatbed tow trucks with specialized equipment. Key features include customer testimonials, service galleries with fleet photos, and multiple contact methods.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as build tool and dev server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- React Hook Form with Zod validation for form handling

**UI Framework:**
- shadcn/ui component library (New York style variant)
- Radix UI primitives for accessible components
- Tailwind CSS for styling with custom design system
- Inter font family from Google Fonts

**Design System:**
- Mobile-first responsive design approach
- Custom color scheme with HSL-based CSS variables supporting light/dark modes
- Neutral base color palette (primary: blue hsl(212 95% 38%))
- Consistent spacing scale using Tailwind utilities
- Elevation system using shadows and hover effects
- Professional, trust-building aesthetic per design_guidelines.md

**Page Structure:**
- Home: Hero section with emergency service CTA, service overview, trust badges
- Services: Detailed service listings with features and pricing, specialty vehicle handling section
- Gallery: Dynamic image showcase loading from database, with fallback to default images
- Reviews: Customer testimonials with star ratings
- Contact: Multi-tab contact forms (general contact, quote requests, scheduling)
- Admin: Password-protected dashboard for analytics and gallery management

**Key Components:**
- Header: Sticky navigation with logo, menu, and prominent phone CTA
- Footer: Multi-column layout with links, contact info, and company details
- MobileCallButton: Fixed bottom call button for mobile devices
- QuoteButton: Reusable component linking to contact form quote tab

### Backend Architecture

**Server Stack:**
- Express.js HTTP server
- TypeScript with ES modules
- Vite middleware for development hot-reloading
- Custom request logging middleware

**API Design:**
- RESTful JSON API with `/api/*` prefix
- Resource endpoints for services, vehicles, testimonials
- Form submission endpoints for quotes, scheduling, contact messages, vehicle offers
- Validation using Zod schemas from shared schema definitions

**Data Layer:**
- In-memory storage implementation (MemStorage class) for development
- Interface-based storage abstraction (IStorage) for future database integration
- Type-safe data models using Drizzle ORM schema definitions

**Development Features:**
- Replit-specific plugins for error overlay and dev tooling
- Path aliases for clean imports (@/, @shared/, @assets/)
- Automatic route registration system
- JSON response capture for request logging

### Data Storage Solutions

**Current Implementation:**
- In-memory Map-based storage for all entities
- UUID generation for entity IDs using crypto.randomUUID()

**Database Schema (Drizzle ORM):**
Defined in shared/schema.ts for PostgreSQL with the following tables:

1. **services**: Towing/roadside services catalog
   - Fields: id, name, description, basePrice, icon

2. **vehicles**: Vehicles for sale inventory
   - Fields: id, make, model, year, price, mileage, condition, description, imageUrl, status
   - Default status: "available"

3. **testimonials**: Customer reviews
   - Fields: id, customerName, rating, comment, date, source
   - Auto-timestamp on creation

4. **quoteRequests**: Quote request submissions
   - Fields: id, name, phone, email, serviceType, location, message, createdAt, status
   - Default status: "pending"

5. **schedulingRequests**: Service scheduling submissions
   - Fields: id, name, phone, email, serviceType, preferredDate, preferredTime, location, vehicleInfo, message, createdAt, status

6. **contactMessages**: General contact form submissions
   - Fields: id, name, phone, email, subject, message, createdAt, status

7. **vehicleOffers**: Vehicle purchase inquiries
   - Fields: id, vehicleId, name, phone, email, offerAmount, message, createdAt, status

8. **gallery_images**: Gallery photo management
   - Fields: id, title, category, imageUrl, displayOrder, createdAt
   - Stores permanent object storage paths for uploaded images
   - Categories: fleet, work-in-progress, facilities, specialty
   - Admin-managed via upload interface

**Migration Strategy:**
- Drizzle Kit configured for PostgreSQL migrations
- Migration output directory: ./migrations
- Database connection via DATABASE_URL environment variable
- Ready for Neon serverless PostgreSQL integration

### Object Storage

**Replit Object Storage Integration:**
- Bucket: repl-default-bucket-eb76087a-07eb-407d-a74e-6e9eff6c85ee
- Bucket ID: replit-objstore-61f394a8-ee1c-483e-bd18-5c67ece308c5
- Image upload flow using presigned URLs
- Permanent object paths stored as `/objects/uploads/{uuid}`
- Admin gallery management with file upload, preview, and deletion
- Categories: Fleet & Equipment, Work in Progress, Facilities, Specialty Vehicles

**Environment Variables:**
- DEFAULT_OBJECT_STORAGE_BUCKET_ID: Object storage bucket identifier
- PUBLIC_OBJECT_SEARCH_PATHS: Public asset directories
- PRIVATE_OBJECT_DIR: Private uploads directory path

**Implementation:**
- server/objectStorage.ts: Service wrapper for @google-cloud/storage
- Presigned URL generation for secure uploads
- Path normalization for permanent storage references
- Integration with gallery_images database table

### Authentication and Authorization

**Admin Dashboard:**
- Client-side password protection (password: "collision2025")
- Uses localStorage key "collision_admin_auth" for session persistence
- Access to analytics dashboard and gallery management
- Note: Basic security for internal use, not production-grade authentication

**Public Endpoints:**
All API endpoints are publicly accessible for form submissions and data retrieval. Future implementation would require session management (connect-pg-simple package included for PostgreSQL sessions).

### External Dependencies

**Third-Party Services:**
1. **Google Analytics**: Tracking and analytics integration
   - Configuration: VITE_GA_MEASUREMENT_ID environment variable
   - Page view tracking on route changes
   - Event tracking utilities for conversions
   - Initialization in App.tsx

2. **Replit Object Storage**: Cloud storage for gallery images
   - Google Cloud Storage backend via @google-cloud/storage
   - Presigned URL upload flow for secure file transfers
   - Permanent object path storage for reliable image serving
   - Admin-managed gallery with upload, preview, and deletion

3. **Google Fonts**: Web typography
   - Inter font family with multiple weights (300-800)
   - Preconnect optimization for performance

**Database:**
- Neon Serverless PostgreSQL (@neondatabase/serverless)
- Connection pooling support
- Configured via DATABASE_URL in drizzle.config.ts

**UI Libraries:**
- Radix UI component primitives (20+ packages)
- Embla Carousel for image galleries
- Lucide React for icons
- date-fns for date formatting

**Development Tools:**
- Replit-specific plugins for enhanced dev experience
- esbuild for server bundling in production
- tsx for TypeScript execution in development

**Form Handling:**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for Zod integration

**Styling:**
- Tailwind CSS with PostCSS
- class-variance-authority for component variants
- clsx and tailwind-merge for class name utilities