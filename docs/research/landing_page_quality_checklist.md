# Landing Page Quality Checklist
**Based on AI Sekretarka Receptionist Page Analysis**

Use this checklist to ensure new landing pages meet or exceed the benchmark quality level.

---

## 🎯 Essential Components (Must-Have)

### Hero Section
- [ ] Split layout (50/50 content + visual on desktop)
- [ ] Compelling headline with problem statement
- [ ] Dynamic/rotating element (typewriter, carousel, etc.)
- [ ] Clear subheadline with benefit + speed indicator
- [ ] Primary CTA (bold, colorful, with icons and animations)
- [ ] Secondary CTA (outline style, lower commitment)
- [ ] 3 trust badges/quick value props below CTAs
- [ ] Animated background or visual interest element
- [ ] Product demo mockup or visual (animated preferred)

### Social Proof Section
- [ ] Live activity feed or real-time updates
- [ ] 4+ animated stat cards with metrics
- [ ] Color-coded categories (blue, green, purple, orange)
- [ ] Trend indicators (↗, ↘, ✓)
- [ ] CountUp animations on numbers
- [ ] Scroll-triggered animations (useInView)

### Interactive Engagement Tool
- [ ] Calculator, quiz, or interactive element
- [ ] Real-time calculations/results
- [ ] Visual sliders or input controls
- [ ] Prominent result display with CTA
- [ ] Full-screen or near-full-screen section
- [ ] Mobile-optimized interactions

### Features Section
- [ ] 4-6 feature cards in grid layout
- [ ] Color-coded icons in circles
- [ ] Short, benefit-focused descriptions
- [ ] Hover effects (shadow, scale)
- [ ] Responsive grid (1 → 2 → 4 columns)

### Process/Implementation Section
- [ ] 3-4 numbered steps
- [ ] Visual progression (cards, timeline)
- [ ] Highlight automation ("AUTO" badges)
- [ ] Final step emphasized (gradient, larger)
- [ ] CTA button after steps

### Use Case Example
- [ ] Conversational UI or visual demonstration
- [ ] Real-world scenario shown
- [ ] Customer names/personas included
- [ ] Before/after or step-by-step flow
- [ ] Capability summary below

### Pricing Section
- [ ] 3-tier structure (Solo, Team, Enterprise)
- [ ] "Popular" badge on recommended tier
- [ ] Feature lists with checkmarks
- [ ] Clear pricing with currency
- [ ] Additional calls pricing shown
- [ ] 2 CTAs below (primary + demo)
- [ ] Trust indicators (no hidden fees, cancel anytime)

### Contact/Conversion Section
- [ ] Contact form (3-5 fields max)
- [ ] Loading states and validation
- [ ] Success/error toast notifications
- [ ] Alternative conversion path (calculator, demo)
- [ ] Trust indicators (response time, support hours)

### Footer
- [ ] Logo and tagline
- [ ] Copyright information
- [ ] Minimal design (don't distract from CTAs above)

---

## 🎨 Design Standards

### Color System
- [ ] Primary brand color used consistently (#007BFF or equivalent)
- [ ] 4+ semantic colors defined (success, warning, info, trust)
- [ ] Gradient formulas documented
- [ ] Background color hierarchy (white → gray-50 → color-50)
- [ ] Text color hierarchy (gray-900 → gray-600 → gray-500)

### Typography
- [ ] Font weight scale defined (black, bold, semibold, medium)
- [ ] Size scale: 5xl-7xl headlines, 3xl-4xl subheadings, xl body
- [ ] Leading adjusted per context (tight headlines, relaxed body)
- [ ] Responsive text sizing (3 breakpoint sizes minimum)

### Spacing & Layout
- [ ] Consistent padding scale (px-4 → px-6 → px-8)
- [ ] Section vertical spacing (py-12 → py-16)
- [ ] Container max-width defined (5xl, 6xl, 7xl)
- [ ] Grid gaps consistent (gap-4, gap-6, gap-8)

### Interactive Elements
- [ ] Hover states on all clickable elements
- [ ] Scale animations on buttons (hover:scale-105)
- [ ] Shadow transitions (shadow-lg → shadow-2xl)
- [ ] Icon animations (translate-x, pulse, etc.)
- [ ] Disabled states styled
- [ ] Loading states visible

---

## 🚀 Technical Requirements

### Performance
- [ ] Mobile detection for animation optimization
- [ ] Reduced animations on mobile (isMobile checks)
- [ ] willChange CSS on animated elements
- [ ] Lazy loading for images (Next.js Image)
- [ ] Optimized component rendering (React.memo where needed)
- [ ] Minimal bundle size (code splitting)

### Responsiveness
- [ ] Mobile-first design approach
- [ ] 3+ breakpoints used (sm, md, lg minimum)
- [ ] Grid layouts collapse properly (4 → 2 → 1 columns)
- [ ] Text sizes scale down smoothly
- [ ] CTAs stack on mobile (flex-col → flex-row)
- [ ] Navigation adapts (hidden items, hamburger if needed)

### Code Quality
- [ ] TypeScript for all components
- [ ] Component modularity (7+ reusable components)
- [ ] Props interfaces defined
- [ ] Error handling implemented
- [ ] Form validation present
- [ ] Loading states managed
- [ ] External API calls error-handled

### SEO & Metadata
- [ ] Page title with keywords
- [ ] Meta description (150-160 chars)
- [ ] Open Graph tags
- [ ] Twitter card tags
- [ ] Favicon defined
- [ ] Semantic HTML structure
- [ ] Heading hierarchy (h1 → h2 → h3)

---

## 📊 Conversion Optimization

### CTAs (Call-to-Actions)
- [ ] 8+ CTAs throughout page
- [ ] Primary CTAs use action verbs + urgency
- [ ] Secondary CTAs offer lower commitment
- [ ] CTAs repeat in multiple sections
- [ ] Button text varies to match context
- [ ] Icons included in CTA buttons
- [ ] Hover animations on all CTAs

### Psychological Triggers
- [ ] Loss aversion (negative framing in headline)
- [ ] Urgency (today, now, limited time)
- [ ] Social proof (customer names, activity feed)
- [ ] Authority (specific metrics, compliance badges)
- [ ] Scarcity (implied through usage stats)
- [ ] Reciprocity (free tools, demos, no credit card)
- [ ] Commitment/consistency (low barrier to entry)

### Trust Signals
- [ ] 10+ trust indicators throughout page
- [ ] Compliance badges (RODO, GDPR, etc.)
- [ ] Security icons (Shield, Lock)
- [ ] Speed promises (5 minutes, 24/7)
- [ ] No credit card required badge
- [ ] Money-back or cancel anytime guarantee
- [ ] Customer activity/names shown
- [ ] Specific metrics (not vague claims)
- [ ] Response time promises
- [ ] Support availability stated

### Risk Reduction
- [ ] "No hidden costs" statement
- [ ] "Cancel anytime" option
- [ ] "No credit card required" badge
- [ ] Free demo/trial option
- [ ] Money-back guarantee (if applicable)
- [ ] Clear pricing with no surprises
- [ ] Support availability clearly stated

---

## ✍️ Copy Standards

### Headlines
- [ ] Problem statement in headline
- [ ] Benefit-focused (not feature-focused)
- [ ] Rotating/dynamic element for multiple pain points
- [ ] Gradient text on emphasis words
- [ ] Negative framing for loss aversion
- [ ] 10-15 words maximum
- [ ] Action-oriented language

### Subheadlines
- [ ] Formula: Benefit + Mechanism + Speed
- [ ] 15-25 words maximum
- [ ] Specific timeline mentioned
- [ ] Quantified benefits when possible

### Body Copy
- [ ] Short paragraphs (2-3 sentences max)
- [ ] Bullet points for features
- [ ] Bold text for emphasis
- [ ] Numbers instead of words (5 not five)
- [ ] Active voice preferred
- [ ] Benefit → Feature → Proof structure

### CTA Button Text
- [ ] Action verb + benefit/urgency
- [ ] 2-4 words ideal
- [ ] Varies per context (not all "Get Started")
- [ ] Examples: "Zacznij Oszczędzać Dziś", "Oblicz ROI", "Zobacz Demo"

---

## 🎬 Animation Standards

### Scroll-Triggered
- [ ] useInView hook from react-intersection-observer
- [ ] triggerOnce: true for performance
- [ ] Staggered delays for multiple elements
- [ ] Threshold: 0.1-0.2 for early triggers
- [ ] Effects: opacity 0→1, y: 30→0, scale: 0.9→1

### Hover Animations
- [ ] Scale on buttons (1 → 1.05)
- [ ] Shadow increase on cards (lg → 2xl)
- [ ] Icon translations (arrows move right)
- [ ] Color transitions on text/backgrounds
- [ ] Smooth transitions (transition-all duration-300)

### Continuous Animations
- [ ] Rotation/cycle intervals: 2.5-3.5 seconds
- [ ] Pulse effects on badges/icons
- [ ] Background orb movements (18-25s loops)
- [ ] Particle animations (10-20s durations)
- [ ] Performance: fewer/slower on mobile

### Performance Rules
- [ ] isMobile detection implemented
- [ ] Static elements on mobile when possible
- [ ] Reduced particle counts on mobile (15 → 5)
- [ ] Slower intervals on mobile
- [ ] willChange CSS property on animated elements
- [ ] GPU acceleration preferred (transform, opacity)

---

## 📱 Mobile Optimization

### Layout Adaptations
- [ ] Grid columns collapse (4 → 2 → 1)
- [ ] Text sizes reduce smoothly (5xl → 6xl → 7xl)
- [ ] Padding scales down (px-8 → px-6 → px-4)
- [ ] CTAs stack vertically on mobile
- [ ] Navigation items hide with menu icon
- [ ] Forms remain usable (large touch targets)

### Content Adjustments
- [ ] Shorter headlines on mobile (if needed)
- [ ] Hidden elements on mobile (hidden sm:block)
- [ ] Simplified animations
- [ ] Larger touch targets (44x44px minimum)
- [ ] Readable font sizes (16px+ for body)

### Performance
- [ ] Static backgrounds on mobile
- [ ] Fewer particles/decorative elements
- [ ] Slower animation intervals
- [ ] Lazy loading aggressive on mobile
- [ ] Images optimized for mobile sizes

---

## 🧪 Testing Checklist

### Functionality
- [ ] All CTAs click to correct destinations
- [ ] Forms submit successfully
- [ ] Loading states display correctly
- [ ] Error messages show appropriately
- [ ] Success notifications appear
- [ ] External links open in new tabs
- [ ] Internal links navigate correctly

### Responsiveness
- [ ] Test on mobile (375px, 414px widths)
- [ ] Test on tablet (768px, 1024px widths)
- [ ] Test on desktop (1280px, 1920px widths)
- [ ] All text readable at all sizes
- [ ] No horizontal scroll
- [ ] Touch targets large enough (44x44px+)

### Performance
- [ ] Lighthouse score 90+ (Performance)
- [ ] Lighthouse score 90+ (Accessibility)
- [ ] Lighthouse score 90+ (Best Practices)
- [ ] Lighthouse score 90+ (SEO)
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1

### Cross-Browser
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 📈 Analytics Setup

### Tracking Implementation
- [ ] Page view tracking
- [ ] CTA click tracking (all 8+ CTAs)
- [ ] Form submission tracking
- [ ] Form abandonment tracking
- [ ] Scroll depth tracking
- [ ] Calculator usage tracking
- [ ] External link click tracking
- [ ] Time on page by section

### Goals/Conversions
- [ ] Primary conversion (form submit) defined
- [ ] Secondary conversion (demo request) defined
- [ ] Calculator completion defined
- [ ] Scroll depth milestones (25%, 50%, 75%, 100%)
- [ ] CTA click goals
- [ ] Email link click goals

---

## 🏆 Quality Score Calculation

**Scoring System:** (out of 100 points)

- Essential Components (30 points): ___/30
- Design Standards (15 points): ___/15
- Technical Requirements (15 points): ___/15
- Conversion Optimization (15 points): ___/15
- Copy Standards (10 points): ___/10
- Animation Standards (5 points): ___/5
- Mobile Optimization (10 points): ___/10

**Total Score: ___/100**

**Benchmark (AI Sekretarka): 95/100**

**Minimum Acceptable Score: 85/100**

---

## 🚀 Launch Readiness

Before launching a new landing page, ensure:

- [ ] Quality score ≥ 85/100
- [ ] All essential components present
- [ ] Mobile testing completed
- [ ] Performance benchmarks met
- [ ] Analytics tracking implemented
- [ ] Form submissions tested
- [ ] External links verified
- [ ] SEO metadata complete
- [ ] Error handling tested
- [ ] Loading states verified
- [ ] Stakeholder approval received
- [ ] A/B testing plan prepared (if applicable)

---

**Document Version:** 1.0
**Last Updated:** 2025-11-07
**Based On:** AI Sekretarka Receptionist Page Analysis
**Maintained By:** Design Research Team
