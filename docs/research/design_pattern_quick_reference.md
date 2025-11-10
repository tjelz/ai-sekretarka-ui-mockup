# Design Pattern Quick Reference
**Fast lookup guide for AI Sekretarka design patterns**

---

## 🎨 Color Palette

```css
/* Primary Brand */
--primary: #007BFF          /* Main blue */
--primary-hover: #0056b3    /* Darker blue */
--primary-light: #3b9fff    /* Light blue */

/* Semantic Colors */
--success: #10B981          /* Green - actions, growth */
--warning: #F97316          /* Orange - alerts */
--info: #3B82F6             /* Blue - information */
--trust: #9333EA            /* Purple - security */

/* Backgrounds */
--bg-primary: #FFFFFF       /* White */
--bg-secondary: #F9FAFB     /* Gray-50 */
--bg-accent: #EFF6FF        /* Blue-50 */

/* Text */
--text-primary: #111827     /* Gray-900 */
--text-secondary: #4B5563   /* Gray-600 */
--text-muted: #6B7280       /* Gray-500 */

/* Gradients */
--gradient-blue: linear-gradient(to right, #007BFF, #0056b3)
--gradient-green: linear-gradient(to right, #10B981, #059669)
```

---

## 📐 Spacing Scale

```css
/* Padding/Margin */
px-4  (1rem / 16px)   → Mobile base
px-6  (1.5rem / 24px) → Tablet
px-8  (2rem / 32px)   → Desktop

py-12 (3rem / 48px)   → Section spacing
py-16 (4rem / 64px)   → Large sections

gap-4 (1rem)          → Small grids
gap-6 (1.5rem)        → Medium grids
gap-8 (2rem)          → Large grids
```

---

## 🔤 Typography Scale

```css
/* Headlines */
text-7xl (4.5rem / 72px)  font-black    → Hero headline (desktop)
text-6xl (3.75rem / 60px) font-black    → Hero headline (tablet)
text-5xl (3rem / 48px)    font-black    → Hero headline (mobile)

/* Section Headings */
text-4xl (2.25rem / 36px) font-bold     → Section h2 (desktop)
text-3xl (1.875rem / 30px) font-bold    → Section h2 (mobile)

/* Subheadings */
text-2xl (1.5rem / 24px)  font-bold     → Card headings
text-xl (1.25rem / 20px)  leading-relaxed → Subheadlines

/* Body Text */
text-lg (1.125rem / 18px) text-gray-600 → Large body
text-base (1rem / 16px)   text-gray-600 → Normal body
text-sm (0.875rem / 14px) text-gray-600 → Small body
text-xs (0.75rem / 12px)  text-gray-500 → Badges, labels
```

---

## 🔘 Button Patterns

### Primary CTA (Hero)
```jsx
<Button className="
  bg-gradient-to-r from-green-500 to-green-600
  hover:from-green-600 hover:to-green-700
  text-white text-xl px-14 py-8 rounded-xl
  font-bold shadow-lg hover:shadow-2xl
  transition-all hover:scale-105
  group
">
  <Zap className="w-6 h-6 mr-2 group-hover:animate-pulse" />
  Action Text
  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
</Button>
```

### Secondary CTA (Hero)
```jsx
<Button variant="outline" className="
  border-2 border-[#007BFF]
  text-[#007BFF] hover:bg-blue-50
  text-xl px-10 py-8 rounded-xl
  font-semibold transition-all
  group
">
  <MessageSquare className="w-5 h-5 mr-2" />
  Lower Commitment Action
</Button>
```

### Standard CTA (Sections)
```jsx
<Button className="
  bg-[#007BFF] hover:bg-[#0056b3]
  text-white text-base px-10 py-6
  rounded-lg font-semibold
  shadow-md hover:shadow-lg
  transition-all
">
  Section Action
</Button>
```

---

## 📦 Card Patterns

### Feature Card
```jsx
<div className="
  bg-white border border-gray-200
  p-6 rounded-xl
  hover:shadow-lg transition-shadow
">
  <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
    <Icon className="w-7 h-7 text-[#007BFF]" strokeWidth={2} />
  </div>
  <h3 className="text-lg font-bold text-gray-900 mb-3">
    Feature Title
  </h3>
  <p className="text-sm text-gray-600 leading-relaxed">
    Feature description focusing on benefits
  </p>
</div>
```

### Stat Card (Animated)
```jsx
<div className="
  bg-white/80 backdrop-blur-lg
  border border-white/50
  shadow-xl rounded-2xl p-6
  hover:shadow-2xl hover:scale-105
  transition-all duration-300
  group relative overflow-hidden
">
  {/* Icon with pulse */}
  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
    <Icon className="w-7 h-7 text-[#007BFF]" />
  </div>

  {/* Number with CountUp */}
  <div className="text-5xl font-black text-gray-900">
    <CountUp end={42} duration={2.5} />
    <span className="text-4xl">+</span>
  </div>

  {/* Label */}
  <h3 className="text-sm font-semibold text-gray-600 mb-1">Main Label</h3>
  <p className="text-xs text-gray-500 mb-3">Sublabel</p>

  {/* Trend Badge */}
  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#007BFF] px-3 py-1.5 rounded-full text-xs font-semibold">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-100"></span>
    </span>
    ↗ +18% this week
  </div>
</div>
```

### Pricing Card
```jsx
<div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow relative">
  {/* Popular Badge (if applicable) */}
  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
    <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">
      POPULARNE
    </span>
  </div>

  {/* Icon */}
  <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
    <Users className="w-7 h-7 text-purple-600" />
  </div>

  {/* Plan Name */}
  <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Name</h3>

  {/* Description */}
  <p className="text-sm text-gray-600 mb-4">Target audience descriptor</p>

  {/* Price */}
  <div className="mb-6">
    <span className="text-5xl font-bold text-gray-900">599 zł</span>
    <span className="text-gray-600 ml-2">/miesiąc</span>
  </div>

  {/* Features */}
  <ul className="space-y-3 mb-6">
    <li className="flex items-center gap-2 text-gray-700">
      <CheckCircle2 className="w-5 h-5 text-green-500" />
      Feature item
    </li>
  </ul>
</div>
```

### Highlighted Card (Most Important)
```jsx
<div className="
  bg-gradient-to-br from-[#007BFF] to-[#0056b3]
  p-8 rounded-2xl shadow-lg
  text-white hover:shadow-2xl
  transition-shadow
">
  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-5">
    <Icon className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-lg font-bold mb-3">Highlighted Title</h3>
  <p className="text-blue-100 leading-relaxed">
    Most important content here
  </p>
</div>
```

---

## 🎬 Animation Patterns

### Scroll-Triggered (useInView)
```jsx
const [ref, inView] = useInView({
  triggerOnce: true,
  threshold: 0.1,
});

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30, scale: 0.9 }}
  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
>
  Content
</motion.div>
```

### Typewriter Effect
```jsx
// Rotating phrases every 3 seconds
<AnimatePresence mode="wait">
  <motion.span
    key={currentIndex}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] bg-clip-text text-transparent"
  >
    {phrases[currentIndex]}
  </motion.span>
</AnimatePresence>
```

### Pulse Effect (Badge)
```jsx
<span className="relative flex h-2 w-2">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-100"></span>
</span>
```

### CountUp Numbers
```jsx
{inView && (
  <CountUp
    end={99.9}
    duration={2.5}
    decimals={1}
    delay={0.2}
  />
)}
```

### Icon Pulse Animation
```jsx
<motion.div
  animate={{
    scale: [1, 1.05, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  <Icon />
</motion.div>
```

---

## 📱 Responsive Grid Patterns

### 4-Column Feature Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
  {/* Cards */}
</div>
```

### 3-Column Pricing Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Pricing cards */}
</div>
```

### 2-Column Content Grid
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  {/* Left content */}
  {/* Right visual */}
</div>
```

### 2-Column Split (Implementation Steps)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* 4 cards in 2x2 grid */}
</div>
```

---

## 🏷️ Badge Patterns

### Section Badge (Top of Section)
```jsx
<div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
  <Icon className="w-4 h-4" />
  Section Label
</div>
```

### Trust Badge (Hero)
```jsx
<div className="flex items-center gap-2">
  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
    <Icon className="w-3 h-3 text-green-600" />
  </div>
  <span className="font-medium">Trust indicator text</span>
</div>
```

### Popular Badge (Pricing)
```jsx
<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
  <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">
    POPULARNE
  </span>
</div>
```

### AUTO Badge (Implementation)
```jsx
<div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
  AUTO
</div>
```

---

## 📝 Form Pattern

```jsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div>
    <label className="block text-black font-semibold mb-3 flex items-center gap-2">
      <Icon className="w-4 h-4 text-[#007BFF]" />
      Field Label
    </label>
    <input
      type="text"
      value={formData.field}
      onChange={(e) => setFormData({ ...formData, field: e.target.value })}
      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all"
      placeholder="Example"
      required
    />
  </div>

  <Button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white text-lg py-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
  >
    {isSubmitting ? "Wysyłanie..." : "Submit Text"}
  </Button>
</form>
```

---

## 🎯 Icon Usage

### Sizes
```jsx
Hero CTA: w-6 h-6
Section CTAs: w-5 h-5
Feature cards: w-7 h-7
Stat cards: w-7 h-7
Form labels: w-4 h-4
Badges: w-3 h-3 to w-4 h-4
```

### Common Icons (lucide-react)
```
Phone: Calling, contact
Calendar: Appointments, scheduling
MessageSquare: Chat, SMS, communication
Shield: Security, trust, compliance
Clock: Time, speed, 24/7
Zap: Speed, energy, action
TrendingUp: Growth, improvement, ROI
CheckCircle2: Confirmation, features, success
Users: Customers, team, people
Settings: Configuration, setup
ArrowRight: Navigation, next step
Star: Quality, rating, popular
Sparkles: AI, magic, special
AlertCircle: Warning, attention, info
```

---

## 🌈 Gradient Formulas

### Blue (Primary Brand)
```css
bg-gradient-to-r from-[#007BFF] to-[#0056b3]
hover:from-[#0056b3] hover:to-[#003d82]
```

### Green (Success/Action)
```css
bg-gradient-to-r from-green-500 to-green-600
hover:from-green-600 hover:to-green-700
```

### Background Gradients
```css
bg-gradient-to-br from-white via-blue-50 to-indigo-50
bg-gradient-to-b from-blue-50/50 to-white
bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30
```

### Card Gradients
```css
bg-gradient-to-br from-[#007BFF] to-[#0056b3]  /* Highlighted cards */
bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50  /* Result cards */
bg-gradient-to-r from-blue-600 to-indigo-600  /* CTA backgrounds */
```

---

## 📐 Container Patterns

### Page Container
```jsx
<div className="min-h-screen bg-white">
  {/* Sections */}
</div>
```

### Section Container
```jsx
<section className="py-12 px-4 bg-gray-50">
  <div className="container mx-auto max-w-6xl">
    {/* Content */}
  </div>
</section>
```

### Split Layout (Hero)
```jsx
<section className="relative py-10 px-4 overflow-hidden">
  <div className="container mx-auto max-w-7xl relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>{/* Left content */}</div>
      <div>{/* Right visual */}</div>
    </div>
  </div>
</section>
```

---

## 🔄 Loading States

### Button
```jsx
<Button disabled={isSubmitting}>
  {isSubmitting ? "Wysyłanie..." : "Submit"}
</Button>
```

### Spinner (Simple)
```jsx
<div className="flex items-center gap-2">
  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  Loading...
</div>
```

### Skeleton Card
```jsx
<div className="bg-gray-100 animate-pulse">
  <div className="h-12 bg-gray-200 rounded mb-4"></div>
  <div className="h-4 bg-gray-200 rounded mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
</div>
```

---

## 💬 Toast Notifications (Sonner)

```jsx
import { toast } from "sonner"

// Success
toast.success("Success Message", {
  description: "Additional details here"
})

// Error
toast.error("Error Message", {
  description: "Error details and fallback action"
})

// Info
toast.info("Information", {
  description: "Additional context"
})
```

---

## 📊 Metrics Display Pattern

```jsx
<div className="text-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
  <div className="text-3xl font-black text-blue-600 mb-1">
    {formatNumber(value)}
  </div>
  <p className="text-xs text-gray-600 font-medium leading-tight">
    Metric Label
  </p>
</div>
```

---

## 🎨 Shadow Scale

```css
shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow:      0 1px 3px 0 rgb(0 0 0 / 0.1)
shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1)
shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1)
shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1)
shadow-2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25)

Common hover pattern:
shadow-lg hover:shadow-2xl transition-shadow
```

---

## 🎯 Rounded Corners

```css
rounded:     0.25rem (4px)   - Small elements
rounded-lg:  0.5rem (8px)    - Buttons, inputs
rounded-xl:  0.75rem (12px)  - Cards, modals
rounded-2xl: 1rem (16px)     - Large cards
rounded-3xl: 1.5rem (24px)   - Hero sections
rounded-full: 9999px         - Circles, pills
```

---

## 📱 Mobile Detection Pattern

```jsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// Use in animations
const particleCount = isMobile ? 5 : 15;
const animationDuration = isMobile ? 3500 : 2500;
```

---

## 🎬 Performance Optimization

```jsx
// Use willChange for animations
style={{ willChange: 'transform, opacity' }}

// Reduce animations on mobile
{!isMobile && (
  <motion.div {...animationProps}>
    {/* Animated content */}
  </motion.div>
)}

// Static alternative on mobile
{isMobile && (
  <div>
    {/* Static content */}
  </div>
)}
```

---

**Last Updated:** 2025-11-07
**Based On:** AI Sekretarka Receptionist Page
**Use:** Copy-paste these patterns into new landing pages
