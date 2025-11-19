# Design Guidelines: Local Towing Company Website

## Design Approach
**Reference-Based Service Business Design** - Drawing from successful local service platforms like Thumbtack, Angi, and HomeAdvisor. Focus on trust, clarity, and mobile-first conversion optimization for emergency service needs.

## Core Design Principles
1. **Trust First**: Professional, clean aesthetic that builds immediate credibility
2. **Mobile Emergency Focus**: Large tap targets, prominent call buttons, fast loading
3. **Conversion Optimized**: Clear CTAs, minimal friction to contact/schedule
4. **Information Clarity**: Easy-to-scan services, pricing, and availability

## Typography
- **Primary Font**: Inter or Roboto (Google Fonts) - clean, professional, highly legible
- **Headings**: 
  - H1: Bold, 2.5rem (mobile) / 3.5rem (desktop)
  - H2: Semibold, 2rem (mobile) / 2.5rem (desktop)
  - H3: Semibold, 1.5rem
- **Body**: Regular, 1rem (mobile) / 1.125rem (desktop)
- **Buttons/CTAs**: Semibold, 1rem
- **Small Text** (rates, availability): Regular, 0.875rem

## Layout System
**Spacing Scale**: Tailwind units of 3, 4, 6, 8, 12, 16
- Component padding: p-4 (mobile), p-6 (tablet), p-8 (desktop)
- Section spacing: py-12 (mobile), py-16 (desktop)
- Card gaps: gap-4 to gap-6
- Button padding: px-6 py-3

**Container Strategy**:
- Full-width sections with inner max-w-6xl
- Form containers: max-w-2xl
- Content reading width: max-w-4xl

## Component Library

### Navigation Header
- Sticky header with company logo (left)
- Desktop: Horizontal nav links (Services, Vehicles, Reviews, Contact)
- Mobile: Hamburger menu
- Persistent "CALL NOW" button (right side, always visible)
- Include phone number in desktop header

### Hero Section
- **Image**: Large hero image showing tow truck in action or professional driver
- Height: 60vh (mobile), 70vh (desktop)
- Content overlay: Company name, tagline, service area
- Two prominent CTAs: "Call Now" (primary) + "Request Quote" (secondary)
- Both buttons with backdrop blur background
- Include trust badge: "24/7 Emergency Service" or "Licensed & Insured"

### Click-to-Call Buttons
- Primary CTA style: Large, prominent
- Fixed bottom bar on mobile (doesn't scroll away)
- Icon: Phone icon from Heroicons
- Text: "Call Now: [Number]" or just phone number
- Present on every page as specified

### Services Section
- Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Service cards with:
  - Icon from Heroicons (truck, wrench, etc.)
  - Service name (h3)
  - Brief description
  - Starting price or "Request Quote" link
- Each card includes mini CTA button

### Pricing/Rates Display
- Table or card format showing:
  - Service type
  - Base rate or range
  - Additional fees clearly listed
- "Call for exact quote" CTA
- Transparency builds trust

### Quote Request Forms
- Clean, simple forms (not overwhelming)
- Fields: Name, Phone (required), Email, Service Type (dropdown), Location, Message
- Large submit button
- Confirmation message on submit
- Present as modal or dedicated section

### Scheduling Request
- Calendar/date picker integration
- Time slot selection
- Service type dropdown
- Contact details
- "Preferred" vs "Guaranteed" time clarity

### Vehicles for Sale Section
- Grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Vehicle cards:
  - Large image (3:2 aspect ratio)
  - Make/Model/Year (h3)
  - Price (prominent)
  - Key specs (mileage, condition)
  - "View Details" or "Make Offer" button
- Modal or dedicated page for full details
- Offer form: Name, Phone, Email, Offer Amount, Message

### Before/After Gallery
- Two-column comparison layout or slider
- Image pairs showing recovery/towing work
- Captions with brief context
- Lightbox for full-size viewing

### Testimonials/Reviews
- Card-based layout: 1 column (mobile), 2-3 columns (desktop)
- Star rating (5-star display)
- Customer name + photo (if available) or initials
- Quote text
- Date
- Source (Google, Facebook, etc.)

### Contact Section
- Two-column layout (desktop): 
  - Left: Contact form
  - Right: Business info (hours, address, phone, email) + embedded map
- Mobile: Stacked
- Multiple contact methods prominent

### Footer
- Company info, service areas
- Quick links to key pages
- Social media icons (if applicable)
- Copyright and credentials (license numbers)

## Images

### Hero Image
Large, professional photo showing:
- Tow truck in action or parked professionally
- Driver in uniform (builds trust)
- Clean, well-maintained equipment
- Local recognizable background if possible
Placement: Full-width hero section at top of homepage

### Service Images
Optional small icons or photos for each service type on service cards

### Vehicle Listings
Multiple photos per vehicle (exterior, interior, under hood)
3:2 aspect ratio for consistency

### Before/After Gallery
Pairs of images showing successful tows, recoveries, or vehicle rescues
Should showcase range of services (accident recovery, roadside assistance, etc.)

### Trust Elements
Consider: Team photo, business location photo, certifications/licenses as image badges

## Mobile-Specific Considerations
- Bottom fixed call bar (doesn't interfere with content)
- Thumb-friendly tap targets (minimum 44px)
- Single-column forms
- Collapsible sections for long content
- Fast-loading optimized images

## Trust & Credibility Elements
- License/certification badges in header or footer
- "24/7 Available" messaging
- Service area map
- Years in business
- Insurance/bonding information
- Professional photos (team, trucks, office)

## Conversion Optimization
- Every page has quote button
- Phone number always visible
- Forms are short and simple
- Clear next steps
- Minimal clicks to contact
- Emergency service messaging prominent