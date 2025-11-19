# KeepAll App Website - Design Style Guide

## Design Philosophy

### Visual Language
**Wes Anderson meets Vintage iOS Notes** - A sophisticated blend of meticulous cinematic aesthetics with the warm, familiar comfort of analog note-taking. The design evokes the feeling of opening a cherished leather-bound notebook while maintaining the precision and symmetry of Anderson's visual storytelling.

### Core Aesthetic Principles
- **Meticulous Symmetry**: Perfectly balanced compositions with centered focal points
- **Nostalgic Warmth**: Manilla paper textures and cream backgrounds
- **Cinematic Depth**: Layered shadows and subtle depth effects
- **Vintage Typography**: Typewriter headers paired with clean sans-serif body text
- **Soft Minimalism**: Clean layouts with purposeful negative space

## Color Palette

### Primary Colors
- **Manilla Cream** (#F5F1E8) - Main background, evoking aged paper
- **Espresso Brown** (#3C2415) - Primary text and strong accents
- **Latte Beige** (#D4B896) - Secondary backgrounds and cards
- **Soft Gray** (#8B7355) - Subtle text and borders

### Accent Colors
- **Wes Anderson Yellow** (#FFC857) - Highlights and active states
- **Muted Sage** (#A8B5A0) - Success states and secondary actions
- **Dusty Rose** (#E8C5C5) - Gentle emphasis and hover states
- **Warm Charcoal** (#2D1810) - Dark mode primary text

### Dark Mode Palette
- **Deep Espresso** (#1A1611) - Dark mode background
- **Cream White** (#F7F3E9) - Dark mode text
- **Soft Mocha** (#3D3429) - Dark mode cards
- **Golden Accent** (#E6B85C) - Dark mode highlights

## Typography

### Header Typography
**Primary**: Custom typewriter-inspired serif with subtle irregularities
- **Font Family**: "Courier Prime", "Courier New", monospace
- **Characteristics**: Fixed-width, vintage typewriter aesthetic
- **Usage**: Main headings, page titles, navigation
- **Sizes**: 48px (hero), 32px (section), 24px (subsection)

### Body Typography
**Secondary**: Clean, readable sans-serif
- **Font Family**: "Inter", "Helvetica Neue", sans-serif
- **Characteristics**: Neutral, highly legible, modern
- **Usage**: Body text, descriptions, UI elements
- **Sizes**: 16px (body), 14px (small), 12px (caption)

### Accent Typography
**Tertiary**: Vintage serif for special emphasis
- **Font Family**: "Crimson Text", "Georgia", serif
- **Characteristics**: Elegant, literary, sophisticated
- **Usage**: Quotes, testimonials, special callouts

## Visual Effects & Animation

### Core Libraries Integration
1. **Anime.js** - Smooth property animations and staggered reveals
2. **Splitting.js** - Character-level text animations for typewriter effects
3. **ECharts.js** - Data visualizations with custom color schemes
4. **p5.js** - Generative background patterns and paper textures
5. **Pixi.js** - Advanced visual effects and particle systems
6. **Typed.js** - Typewriter animation for hero text
7. **Splide.js** - Smooth carousel transitions

### Animation Principles
- **Subtle Entrance**: Elements fade in with gentle upward motion (16px)
- **Staggered Timing**: Sequential reveals with 100ms delays
- **Hover Elevation**: Cards lift 8px with expanded shadows
- **Paper Flip**: Page transitions with subtle 3D rotation
- **Typewriter Effect**: Character-by-character text reveal at 50ms intervals

### Background Effects
- **Paper Texture**: Subtle grain overlay using p5.js
- **Symmetrical Patterns**: Geometric shapes in corners and edges
- **Depth Layers**: Multiple shadow levels for dimensional feel
- **Vintage Filters**: Slight sepia tone on images

## Layout & Composition

### Grid System
- **Base Grid**: 12-column responsive grid with 24px gutters
- **Breakpoints**: Mobile (320px), Tablet (768px), Desktop (1024px), Large (1440px)
- **Spacing Scale**: 8px, 16px, 24px, 32px, 48px, 64px, 96px

### Symmetry Rules
- **Centered Alignment**: All major elements centered horizontally
- **Balanced Composition**: Equal visual weight on both sides
- **Mirrored Elements**: Paired design elements for perfect balance
- **Golden Ratio**: 1.618 proportions for key sections

### Card Design
- **Border Radius**: 12px for soft, approachable corners
- **Shadows**: Multi-layer shadows for depth
  - **Default**: 0 4px 12px rgba(60, 36, 21, 0.1)
  - **Hover**: 0 8px 24px rgba(60, 36, 21, 0.15)
- **Padding**: 24px internal spacing
- **Background**: Latte Beige with subtle texture

## Interactive Elements

### Button Styles
- **Primary**: Espresso background, Cream text, rounded corners
- **Secondary**: Transparent with Espresso border
- **Hover**: Gentle scale (1.02x) with shadow expansion
- **Active**: Slight inset shadow for tactile feedback

### Form Elements
- **Input Fields**: Manilla background, Espresso border, rounded corners
- **Focus States**: Wes Anderson Yellow border with subtle glow
- **Labels**: Small serif text above inputs
- **Validation**: Muted Sage for success, Dusty Rose for errors

### Navigation
- **Style**: Clean horizontal bar with centered logo
- **Hover**: Underline animation with Wes Anderson Yellow
- **Active**: Bold weight with color shift
- **Mobile**: Hamburger menu with slide-out panel

## Imagery Style

### Photography Treatment
- **Color Grading**: Warm, slightly desaturated with sepia undertones
- **Composition**: Symmetrical framing with centered subjects
- **Aspect Ratios**: 4:3 for nostalgic feel, 16:9 for modern sections
- **Filters**: Subtle film grain and vignetting

### Iconography
- **Style**: Minimal line icons with rounded corners
- **Weight**: 2px stroke width
- **Color**: Espresso Brown with hover transitions
- **Size**: 24px standard, 32px for prominent actions

## Responsive Behavior

### Mobile-First Approach
- **Typography**: Scaled down proportionally (0.875x ratio)
- **Spacing**: Reduced vertical rhythm (16px base)
- **Cards**: Full-width with reduced margins
- **Navigation**: Collapsible hamburger menu

### Tablet Adaptations
- **Grid**: 8-column layout with sidebar navigation
- **Cards**: 2-column grid layout
- **Typography**: Intermediate sizing between mobile and desktop

### Desktop Enhancements
- **Layout**: Full 12-column grid utilization
- **Cards**: 3-4 column grid with hover effects
- **Typography**: Larger scale for impact
- **Animations**: Enhanced with more complex sequences

## Accessibility Standards

### Color Contrast
- **Text on Background**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: Clear focus indicators
- **Color Blindness**: Tested with deuteranopia and protanopia simulators

### Motion & Animation
- **Reduced Motion**: Respect user preferences
- **Focus Management**: Clear keyboard navigation
- **Screen Readers**: Proper ARIA labels and descriptions
- **Touch Targets**: Minimum 44px for mobile interactions

This design system creates a cohesive, sophisticated aesthetic that honors both Wes Anderson's meticulous visual style and the warm, familiar feeling of vintage note-taking applications.