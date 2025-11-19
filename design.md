# KeepAll Website - Design Style Guide

## Design Philosophy

### Visual Language
The KeepAll website embodies a sophisticated blend of Wes Anderson's meticulous symmetry and the nostalgic simplicity of old iOS Notes. The design evokes the tactile experience of organizing physical papers while maintaining modern digital functionality. Every element feels intentional, calm, and elegantly crafted.

### Color Palette
**Primary Colors:**
- **Manilla** (#F4E4BC) - Warm, paper-like background tone
- **Espresso** (#3C2415) - Deep brown for primary text and borders
- **Latte** (#D4A574) - Medium brown for secondary elements and accents
- **Cream** (#FAF7F0) - Soft off-white for highlights and card backgrounds

**Supporting Neutrals:**
- **Parchment** (#E8DCC0) - For subtle section dividers
- **Charcoal** (#2C2C2C) - For dark mode text
- **Warm Gray** (#8B7355) - For secondary text and icons

### Typography
**Display Font (Headers):** 
- **Typewriter Serif**: "Courier New", "American Typewriter", or similar vintage serif
- Used for: Main headings, app title, section headers
- Characteristics: Slightly distressed, monospaced feel, evokes old typewriter text

**Body Font (Content):**
- **Clean Sans-Serif**: "Inter", "SF Pro Display", or "Helvetica Neue"
- Used for: Body text, UI elements, navigation, descriptions
- Characteristics: Highly legible, modern, neutral

**Font Hierarchy:**
- H1: 2.5rem, Typewriter Serif, Espresso
- H2: 2rem, Typewriter Serif, Espresso  
- H3: 1.5rem, Clean Sans-Serif, Espresso
- Body: 1rem, Clean Sans-Serif, Espresso/Warm Gray
- Small: 0.875rem, Clean Sans-Serif, Warm Gray

## Visual Effects & Animation

### Core Libraries Used
1. **Anime.js** - Smooth property animations and transitions
2. **Splitting.js** - Text reveal effects for headings
3. **Typed.js** - Typewriter effect for hero text
4. **ECharts.js** - Data visualization for bookmark analytics
5. **Splide.js** - Smooth carousels for bookmark collections
6. **p5.js** - Subtle particle effects and background animations
7. **Pixi.js** - Advanced visual effects for paper textures

### Animation Principles
**Paper-Flip Transitions:**
- Cards rotate on Y-axis with subtle shadow expansion
- Duration: 300ms with ease-out timing
- Maximum rotation: 15 degrees
- Shadow grows from 2px to 8px blur

**Fade-In Reveals:**
- Elements start with opacity: 0 and translateY: 20px
- Staggered delays: 100ms between elements
- Complete in 250ms with custom cubic-bezier

**Hover Effects:**
- Cards lift 8px with expanded shadow
- Scale transform: 1.02 (subtle growth)
- Color temperature shifts slightly warmer
- Transition duration: 200ms

### Background Effects
**Subtle Paper Texture:**
- Generated noise pattern overlay at 5% opacity
- Warm grain texture that doesn't interfere with readability
- Consistent across all sections

**Floating Elements:**
- Small paper fragments drift slowly across background
- Maximum 3 elements visible at once
- Slow, organic movement patterns
- Opacity: 0.1 to maintain subtlety

## Header & Navigation Design

### Navigation Bar
**Style:** Fixed position with subtle backdrop blur
**Background:** Cream with 90% opacity and paper texture
**Typography:** Clean Sans-Serif, 0.9rem
**Hover State:** Underline animation from left to right
**Active State:** Slightly darker text with subtle background highlight

### Hero Section
**Background:** Custom generated hero image with manilla envelopes
**Text Treatment:** 
- App name with typewriter effect using Typed.js
- Gradient text animation cycling through palette colors
- Subtle character-by-character reveal

## Component Styling

### Bookmark Cards
**Structure:**
- Rounded corners: 12px
- Background: Cream with subtle paper texture
- Border: 1px solid Parchment
- Shadow: 0 2px 8px rgba(60, 36, 21, 0.1)
- Padding: 24px

**Hover State:**
- Transform: translateY(-8px) scale(1.02)
- Shadow: 0 12px 24px rgba(60, 36, 21, 0.15)
- Border color shifts to Latte

### Search Interface
**Input Field:**
- Background: transparent with bottom border
- Border color: Parchment, focus: Latte
- Placeholder text in Warm Gray
- Icon in Espresso color

**Suggestions Dropdown:**
- Background: Cream with paper texture
- Border: 1px solid Parchment
- Rounded corners: 8px
- Item hover: subtle Latte background

### Category Sidebar
**Background:** Slightly darker Cream (#F9F5ED)
**Width:** 280px on desktop, collapsible on mobile
**Category Headers:** Typewriter Serif, Espresso
**Expand/Collapse:** Smooth height transition with rotate icon

## Dark Mode Adaptations

### Color Inversions
- **Background:** Dark charcoal (#1A1A1A)
- **Cards:** Slightly lighter charcoal (#2A2A2A)
- **Text:** Cream (#FAF7F0)
- **Accents:** Latte becomes lighter (#E6C08A)
- **Borders:** Darker warm gray (#4A4A4A)

### Texture Adjustments
- Paper texture remains but with reduced opacity
- Subtle digital grain instead of paper fibers
- Maintains tactile feel while feeling appropriately digital

## Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

### Mobile Adaptations
- Cards stack vertically with full width
- Typography scales down proportionally
- Touch-friendly sizing (minimum 44px tap targets)
- Simplified animations for performance

## Accessibility Considerations

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements have clear focus indicators
- Color is never the only way to convey information

### Motion Preferences
- Respects prefers-reduced-motion media query
- Provides alternative static states for all animations
- Maintains full functionality without animations

This design system creates a cohesive, elegant experience that honors both the Wes Anderson aesthetic and the functional simplicity of classic iOS Notes, resulting in a website that feels both nostalgic and thoroughly modern.