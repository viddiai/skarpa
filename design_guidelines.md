# Design Guidelines for Skarpa M&A Advisory Website

## Design Approach

**Hybrid Professional B2B Approach**
Drawing inspiration from Linear's clarity, Stripe's sophistication, and Calendly's conversion-focused simplicity. This is a high-trust B2B environment where credibility and professionalism are paramount—visual design should reinforce expertise without distracting from conversion goals.

**Core Principle**: Surgical precision over creative flourish. Every element serves trust-building or conversion.

---

## Typography System

**Font Families** (Google Fonts CDN):
- **Primary**: Inter (headings, body, UI)
- **Accent**: DM Sans (statistics, highlighted numbers)

**Hierarchy**:
- **H1 (Hero)**: text-5xl md:text-6xl, font-bold, tracking-tight
- **H2 (Sections)**: text-3xl md:text-4xl, font-semibold
- **H3 (Subsections)**: text-xl md:text-2xl, font-semibold
- **Body**: text-base md:text-lg, leading-relaxed
- **Stats/Numbers**: text-4xl md:text-5xl font-bold (DM Sans)
- **Microcopy**: text-sm, opacity-75

---

## Layout & Spacing System

**Container Strategy**:
- Full-width sections with inner `max-w-6xl mx-auto px-6 md:px-12`
- Hero: `max-w-7xl` for impact
- Content blocks: `max-w-4xl` for readability

**Spacing Primitives** (Tailwind):
Primary units: **4, 8, 12, 16, 20, 24**
- Section padding: `py-16 md:py-24 lg:py-32`
- Component gaps: `gap-8 md:gap-12`
- Card padding: `p-8`
- Tight groupings: `space-y-4`
- Generous groupings: `space-y-12`

**Grid Patterns**:
- Features/Cases: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Stats blocks: `grid-cols-2 md:grid-cols-4`
- Process timeline: Vertical on mobile, horizontal stepper on desktop

---

## Component Library

### Navigation
- Sticky header with subtle backdrop-blur
- Logo left, menu items center-right, CTA button far right
- Mobile: Hamburger with slide-out menu
- Height: `h-20`

### Hero Section
- **Large, professional hero image**: Modern office/handshake/professional setting with subtle overlay
- Two-column on desktop (60/40 split: content/image or vice versa)
- Dual CTA buttons: Primary (solid) + Secondary (outline)
- Trust statistics below headline (inline, subtle dividers)
- Logo strip beneath CTAs

### Cards (Cases, Features)
- Subtle border, no shadow at rest
- Hover: gentle lift with shadow (`hover:shadow-lg hover:-translate-y-1 transition-all`)
- Padding: `p-8`
- Icons: 40x40px, top-left or centered

### Process Timeline
- Desktop: Horizontal stepper with connecting lines
- Mobile: Vertical with left-aligned markers
- Step numbers in circles (`w-12 h-12` rounded-full with number inside)
- Each step: Number + Title + 2-sentence description

### Forms (Exit-Diagnos, Köparguide)
- Clean, single-column layout
- Input fields: `h-12`, rounded corners, subtle border
- Progress indicator for multi-step forms
- Submit buttons: Full-width on mobile, auto on desktop
- Microcopy beneath each field group

### CTA Components
- **Primary Button**: Solid, `px-8 py-4`, `text-lg font-semibold`, rounded
- **Secondary Button**: Outlined, same dimensions
- **Sticky Mobile CTA**: Fixed bottom bar, backdrop-blur, with shadow
- Buttons on images: Backdrop-blur (`backdrop-blur-sm bg-white/90`)

### FAQ Section
- Accordion pattern with chevron icons (Heroicons)
- Each item: Question (font-semibold) + expandable answer
- Smooth height transitions

### Trust Signals
- Logo grid: Grayscale at rest, color on hover
- Statistics: Large numbers with small labels beneath
- Testimonial quotes: Italic text, attribution with company/title

---

## Images

**Hero Section**: 
Full-width hero image showing professional business environment (modern office, professional handshake, or Swedish business setting). Image should convey trust and expertise. Use subtle gradient overlay for text readability.

**Case Studies**: 
Each case card includes relevant business/industry imagery. Keep images subtle and professional—not stock photography clichés.

**Team Section**: 
Professional headshots in consistent style (same lighting, background treatment).

**General Image Treatment**:
- Rounded corners: `rounded-lg` for cards, `rounded-2xl` for hero
- Aspect ratios: 16:9 for landscape, 1:1 for headshots
- Lazy loading with blur placeholders

---

## Accessibility & Interactions

- Minimum touch target: 44x44px
- Focus states: Visible ring on all interactive elements
- Skip navigation link
- Semantic HTML throughout
- ARIA labels for icons and complex interactions
- Smooth scrolling for anchor links
- Reduced motion preference respected

**Animations**: Minimal and purposeful only
- Subtle fade-ins on scroll for section reveals
- Button hover states (scale or background shift)
- Smooth accordion expansions
- NO distracting hero animations, parallax effects, or decorative motion

---

## Mobile-First Considerations

- All sections stack to single column on mobile
- Hero image fills viewport height on mobile with content overlay
- Sticky CTA bar appears on mobile scroll
- Touch-friendly spacing (minimum `p-4` on interactive elements)
- Hamburger menu with smooth slide transition
- Forms use native input types for better mobile UX

---

This design system prioritizes **clarity, trust, and conversion** while maintaining the sophisticated professionalism expected by Swedish business owners contemplating multi-million SEK transactions.