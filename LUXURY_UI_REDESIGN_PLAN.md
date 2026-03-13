# GLAMGO Luxury UI Redesign Plan

**Senior Product Designer + Front-End Lead Audit & Rebuild Strategy**

**Date:** March 12, 2026  
**Status:** Planning Phase Complete → Ready to Execute  
**Timeline:** 3 waves over 4-6 weeks  
**Risk:** Low (keeping all backend intact, UI layer only)

---

## PART 1: DESIGN SYSTEM FOR LUXURY BEAUTY BRAND

### 1.1 Color Palette

Based on the GlamGo logo (soft blush background, purple-to-gold gradients, refined luxury aesthetic):

```typescript
// constants/DesignSystem.ts - COLOR TOKENS

export const Colors = {
  // Primary: Deep Purple (luxury, sophisticated, premium)
  primary: {
    deepPlum: "#522888", // Hero element, primary CTAs, bold accents
    lightPlum: "#7B4FA1", // Hover states, secondary elements
    paleAmethyst: "#D4C5E2", // Light backgrounds, subtle overlays
  },

  // Secondary: Soft Gold (warmth, elegance, premium finish)
  secondary: {
    softGold: "#BF9553", // Accent, highlight, premium badge
    richGold: "#A0804D", // Hover, active states
    paleMint: "#F5E6D3", // Light backgrounds, subtle tints
  },

  // Neutrals: Blush + Cream + Grey (refined, sophisticated)
  neutral: {
    blushCream: "#FFF8F5", // Primary background (from logo)
    softBlush: "#FBF0EC", // Secondary background, cards
    warmWhite: "#FEFDFB", // Tertiary background, inputs
    white: "#FFFFFF", // Pure white for contrast, buttons

    lightGrey: "#F0EAE6", // Dividers, disabled states
    mediumGrey: "#A89A92", // Secondary text, placeholders
    mutedText: "#8C7A9A", // Tertiary text, captions
    darkText: "#3D2E42", // Primary text, contrast
  },

  // Semantic: Status + States (intuitive, accessible)
  semantic: {
    success: "#6BB088", // Order confirmed, completed
    warning: "#E8A869", // Pending, needs attention
    error: "#D67C7C", // Failed, errors
    info: "#7B9BD1", // Information, hints
  },

  // Gradients: Premium visual polish
  gradient: {
    primary: ["#522888", "#7B4FA1"], // Deep plum fade
    accent: ["#BF9553", "#D4C5E2"], // Gold to plum
    sunset: ["#BF9553", "#E8A869"], // Gold to warm
    soft: ["#FBF0EC", "#FFF8F5"], // Blush fade
  },
};

// Usage Guidelines:
// 🎯 HERO SECTIONS: primary.deepPlum (authority, premium feel)
// 💳 BUTTONS/CTAs: secondary.softGold or primary.deepPlum (warmth OR power)
// 📝 BACKGROUNDS: neutral.blushCream (default) or neutral.softBlush (secondary)
// 📄 TEXT: neutral.darkText (primary), neutral.mediumGrey (secondary), neutral.mutedText (tertiary)
// ✨ ACCENTS: Gradients for special moments (checkout, order confirmation)
// ❌ ERRORS: semantic.error with soft background
```

---

### 1.2 Typography System

```typescript
// constants/DesignSystem.ts - TYPOGRAPHY TOKENS

export const Typography = {
  // Font Families
  fontFamily: {
    heading: "PlayfairDisplay-Bold", // Serif, luxury, elegant (majestically narrow)
    headingAlt: "Cormorant-SemiBold", // Serif alternative, ultra-elegant
    body: "Inter-Regular", // Clean sans-serif, readable
    bodyMedium: "Inter-Medium", // Slightly heavier for emphasis
    bodySemibold: "Inter-SemiBold", // For buttons, labels
  },

  // Font Sizes (in pt, scales with device)
  fontSize: {
    xs: 11, // Captions, badges
    sm: 13, // Body small, secondary text
    base: 15, // Body regular, primary text
    lg: 17, // Larger body, emphasis
    xl: 19, // Subheadings
    "2xl": 22, // Secondary headings
    "3xl": 26, // Primary headings
    "4xl": 32, // Hero/title text
    "5xl": 40, // Extra hero (use sparingly)
  },

  // Font Weights
  fontWeight: {
    light: "300" as any,
    normal: "400" as any,
    medium: "500" as any,
    semibold: "600" as any,
    bold: "700" as any,
  },

  // Line Heights (for readability)
  lineHeight: {
    tight: 1.2, // Headings
    normal: 1.4, // Body text
    relaxed: 1.6, // Longer form content
    loose: 1.8, // Captions, fine print
  },

  // Letter Spacing (for refinement)
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    relaxed: 0.3,
    wide: 0.6,
    wider: 1.0, // All-caps labels (BEAUTY, DELIVERED, etc.)
  },
};

// Usage Guidelines:
// 🎯 HERO TITLES: fontSize.4xl, fontFamily.heading, letterSpacing.wider
// 📖 BODY: fontSize.base, fontFamily.body, lineHeight.normal
// 🏷️ LABELS: fontSize.xs, fontFamily.bodySemibold, letterSpacing.wide, textTransform: 'uppercase'
// 💬 CAPTIONS: fontSize.xs, fontFamily.body, color.mediumGrey
// 🔘 BUTTONS: fontSize.sm, fontFamily.bodySemibold, textTransform: 'capitalize'
```

---

### 1.3 Elevation & Shadows (Depth)

```typescript
// constants/DesignSystem.ts - SHADOWS & ELEVATION

export const Shadows = {
  // Subtle: Minimal depth (inputs, cards at rest)
  subtle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // Medium: Gentle lift (cards, modals, navigation)
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  // Strong: Prominent elevation (floating buttons, popups)
  strong: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },

  // Deep: Maximum depth (modals, drawers, overlays)
  deep: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
};

// Usage:
// INPUTS/FIELDS: Shadows.subtle
// CARDS/PHOTOS: Shadows.medium
// FAB/FLOATING: Shadows.strong
// MODALS/OVERLAYS: Shadows.deep
```

---

### 1.4 Spacing & Layout Grid

```typescript
// constants/DesignSystem.ts - SPACING

export const Spacing = {
  // Base unit: 4px
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
  "4xl": 80,
};

// Usage:
// Margins: Spacing.lg (between sections), Spacing.base (between items)
// Padding: Spacing.lg (screen edges), Spacing.md (card internals)
// Gaps: Spacing.sm (items in list), Spacing.base (form fields)
// Grid: 4-column on mobile, 12-column on desktop
```

---

### 1.5 Border Radius (Curves)

```typescript
// constants/DesignSystem.ts - BORDER RADIUS

export const BorderRadius = {
  none: 0,
  xs: 4, // Tight curves (tags, badges)
  sm: 8, // Subtle curves (buttons, inputs)
  md: 12, // Standard curves (cards, modals)
  lg: 16, // Generous curves (larger cards, sections)
  xl: 24, // Very generous (hero sections)
  full: 9999, // Circles (avatars, FABs)
};

// Usage:
// BUTTONS: BorderRadius.sm
// CARDS/IMAGES: BorderRadius.md
// LARGE CARDS: BorderRadius.lg
// AVATARS/BADGES: BorderRadius.full
// INPUT FIELDS: BorderRadius.sm
```

---

### 1.6 Component Variants

```typescript
// components/GlamButton.tsx - BUTTON STYLES

export const GlamButton = ({
  variant = "primary", // 'primary' | 'secondary' | 'ghost' | 'outline'
  size = "md", // 'sm' | 'md' | 'lg'
  ...props
}) => {
  // Variant: primary (deep plum, white text, strong shadow)
  // Variant: secondary (soft gold, white text, medium shadow)
  // Variant: ghost (transparent, plum text, no shadow)
  // Variant: outline (border only, transparent bg)
};

// components/GlamCard.tsx - CARD STYLES
export const GlamCard = ({
  variant = "default", // 'default' | 'elevated' | 'flat'
  ...props
}) => {
  // Variant: default (blush bg, subtle shadow, padding.lg)
  // Variant: elevated (white bg, medium shadow, more contrast)
  // Variant: flat (very subtle, almost no shadow)
};

// components/GlamHeader.tsx - HEADER STYLES
export const GlamHeader = ({
  variant = "default", // 'default' | 'minimal' | 'transparent'
  ...props
}) => {
  // Variant: default (solid blush bg, shadow)
  // Variant: minimal (no bg, just text + spacing)
  // Variant: transparent (fade to transparent as scroll)
};

// components/GlamInput.tsx - INPUT STYLES
export const GlamInput = ({
  variant = "standard", // 'standard' | 'outlined' | 'underline'
  ...props
}) => {
  // Standard: blush bg, subtle focus
  // Outlined: border only, focus adds color
  // Underline: minimal, just underline accent
};
```

---

## PART 2: CURRENT UI AUDIT

### 2.1 Major Screens & Current Issues

| Screen           | File                         | Current Issues                      | Luxury Gap | Priority    |
| ---------------- | ---------------------------- | ----------------------------------- | ---------- | ----------- |
| **ONBOARDING**   |
| Welcome/Splash   | `index.tsx`                  | Generic, no brand feel              | HIGH       | 🔴 Must-do  |
| Role Selection   | `(auth)/role-selection.tsx`  | Plain, no visual hierarchy          | HIGH       | 🔴 Must-do  |
| Sign-In          | `(auth)/sign-in.tsx`         | Dark colors, rigid layout           | MEDIUM     | 🟡 Week 1-2 |
| Sign-Up          | `(auth)/sign-up.tsx`         | Cluttered, too many fields at once  | MEDIUM     | 🟡 Week 1-2 |
| **CUSTOMER**     |
| Home/Shop        | `(customer)/shop.tsx`        | Grid layout, no curation            | HIGH       | 🔴 Must-do  |
| Browse           | `browse.tsx`                 | Basic list, no hero section         | HIGH       | 🔴 Must-do  |
| Product Detail   | `product-detail.tsx`         | Too much info density, poor spacing | MEDIUM     | 🟡 Week 1-2 |
| Cart             | `(customer)/cart.tsx`        | Utilitarian, no polish              | MEDIUM     | 🟡 Week 2-3 |
| Checkout         | `(customer)/checkout.tsx`    | Multi-step but unclear, no guidance | MEDIUM     | 🟡 Week 2-3 |
| Order History    | `(customer)/orders.tsx`      | List-based, no visual progress      | MEDIUM     | 🟡 Week 2-3 |
| Order Tracking   | `(customer)/order-[id].tsx`  | Timeline format, could be richer    | LOW        | 🟢 Week 3-4 |
| **VENDOR**       |
| Dashboard        | `(vendor)/dashboard.tsx`     | No metrics, feels empty             | HIGH       | 🔴 Must-do  |
| Orders           | `(vendor)/orders.tsx`        | Tab-based, could be clearer         | MEDIUM     | 🟡 Week 2   |
| Products         | `(vendor)/products.tsx`      | Table layout, not mobile-optimized  | MEDIUM     | 🟡 Week 2   |
| Product Edit     | `edit-product.tsx`           | Form-heavy, intimidating            | MEDIUM     | 🟡 Week 2-3 |
| **DRIVER**       |
| Dashboard        | `(driver)/dashboard.tsx`     | No map view, list-only              | MEDIUM     | 🟡 Week 2-3 |
| Delivery Details | `(driver)/delivery-[id].tsx` | Basic card, no live tracking UI     | MEDIUM     | 🟡 Week 2-3 |
| Earnings         | `(driver)/earnings.tsx`      | Spreadsheet-like                    | LOW        | 🟢 Week 3-4 |
| **ADMIN**        |
| Dashboard        | `(admin)/dashboard.tsx`      | No analytics/overview               | HIGH       | 🟡 Week 3-4 |
| Users            | `(admin)/users.tsx`          | List-based, no filtering/search     | MEDIUM     | 🟢 Week 3-4 |
| Orders           | `(admin)/orders.tsx`         | No visual status, no assignment UI  | MEDIUM     | 🟢 Week 3-4 |

---

### 2.2 Current Design Inconsistencies

**Color Issues:**

- ❌ Inconsistent use of dark colors (some screens too dark for luxury brand)
- ❌ No gradient accents (feels flat, not premium)
- ❌ Text colors vary (no clear hierarchy)

**Typography Issues:**

- ❌ No serif/heading font (no character)
- ❌ Font sizes don't scale well
- ❌ Line heights cramped (hard to read)

**Spacing Issues:**

- ❌ Inconsistent margins/padding (feels chaotic)
- ❌ No breathing room (dense)
- ❌ Poor section separation

**Component Issues:**

- ❌ No unified button style (mix of colors)
- ❌ Cards have no depth (flat, boring)
- ❌ Icons inconsistent (Ionicons but no custom branding)

**Navigation Issues:**

- ❌ Bottom tabs feel generic
- ❌ No visual indication of current section (unclear)
- ❌ Role switching awkward

---

## PART 3: NEW INFORMATION ARCHITECTURE (IA)

### 3.1 Customer User Flow (Luxury Redesign)

```
┌─────────────┐
│   Welcome   │ → "Discover premium beauty delivered"
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│   Browse Home (Curated)      │ → Hero section, featured categories
└──────┬──────────────────────┘
       │
       ├─→ Search/Filter
       ├─→ Category Browse
       └─→ Recommendations
       │
       ▼
┌─────────────────────────────┐
│  Product Detail (Rich)       │ → Photos, testimonials, pricing, add to cart
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   Cart (Summary)             │ → Items, price breakdown, checkout CTA
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Checkout (Multi-Step)       │ → Address → Payment → Confirmation
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Order Confirmation          │ → Success animation, order details, tracking link
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Order Tracking              │ → Timeline, status, driver info, ETA
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Order History               │ → Past orders, reorder, reviews
└─────────────────────────────┘
```

### 3.2 Vendor User Flow (Luxury Redesign)

```
┌──────────────────────────────┐
│  Dashboard (Metrics Hub)      │ → Today's orders, revenue, active orders, quick actions
└──────┬───────────────────────┘
       │
       ├─→ Orders
       │   └─→ Pending → Accept/Decline
       │
       ├─→ Products
       │   ├─→ Browse
       │   └─→ Edit/Create
       │
       └─→ Profile
           └─→ Store info, hours, settings
```

### 3.3 Driver User Flow (Luxury Redesign)

```
┌──────────────────────────────┐
│  Dashboard (Today's Runs)     │ → Map view, available orders, total earnings
└──────┬───────────────────────┘
       │
       ├─→ Available Orders
       │   └─→ Accept → Pickup → Mark Delivered
       │
       ├─→ Earnings
       │   └─→ Today, week, month
       │
       └─→ Profile
           └─→ Availability, rating
```

---

## PART 4: WAVE-BY-WAVE IMPLEMENTATION PLAN

### WAVE 1: Foundation + Customer Journey (This Week - March 12-14)

**Goal:** Core brand aesthetic applied to critical customer path  
**Time:** 8 hours over 3 days  
**Risk:** Very Low (UI-only changes)

#### W1.1: Create Global Theme & Component Library

```
FILES TO CREATE:
- constants/DesignSystem.ts (Colors, Typography, Spacing, BorderRadius, Shadows)
- components/GlamButton.tsx (Reusable luxury button)
- components/GlamCard.tsx (Reusable luxury card)
- components/GlamHeader.tsx (Reusable luxury header)
- components/GlamInput.tsx (Reusable luxury input)
- components/GlamTabs.tsx (Reusable luxury tabs)
- components/GlamGradient.tsx (Gradient wrapper)
- constants/glamgoTheme.ts (Export all design tokens)

CODE OUTLINE:
// constants/DesignSystem.ts
export const Colors = { ... };
export const Typography = { ... };
export const Spacing = { ... };
export const BorderRadius = { ... };
export const Shadows = { ... };

// components/GlamButton.tsx
interface GlamButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
  title: string;
  onPress: () => void;
  loading?: boolean;
}
export default function GlamButton({ variant='primary', size='md', ... }) {
  // Render button with appropriate colors, shadows, spacing
}

// Similar patterns for Card, Header, Input, Tabs
```

**Effort:** 2 hours (template setup mostly done)

#### W1.2: Redesign Welcome/Role Selection Screens

```
FILES TO MODIFY:
- app/index.tsx (Welcome screen)
- app/(auth)/role-selection.tsx (Role selection)

CHANGES:
Welcome Screen:
- Hero section: GlamGoLogo (centered, large), "DISCOVER BEAUTY DELIVERED" tagline (serif font)
- Subheading: "Premium products, fast delivery, luxury experience"
- Background: Soft blush gradient
- CTA buttons: "Shop Now" (primary) + "Become Vendor" (secondary)
- Clean, spacious layout (not crowded)

Role Selection:
- Show 3 cards (Customer, Vendor, Driver) with icons
- Each card: Large icon, role title, description, select button
- Smooth animations on selection
- Spacious grid layout
```

**Effort:** 2 hours

#### W1.3: Redesign Browse/Home Screen (Customer)

```
FILES TO MODIFY:
- app/browse.tsx or app/(customer)/shop.tsx

CHANGES:
Hero Section (200px):
- Background gradient: Soft blush to white
- Title: "Discover Premium Beauty" (serif, deep plum)
- Subtitle: "Curated products for your beauty needs"
- Tagline in gold accent

Search Bar:
- Soft blush background, deep plum text
- Placeholder: "Search products, brands, beauty needs..."
- Small search icon

Featured Section:
- "Featured This Week" or "Best Sellers" section
- Horizontal scroll of 3-4 product cards (image + title + price)
- Each card: Image, name, price, subtle hover effect

Categories Section:
- Grid of categories (Skincare, Makeup, Haircare, Tools, etc.)
- Each category: Icon, name, arrow, clickable
- Soft background, no heavy borders

Recommendation Section:
- "Recommended For You" based on browsing history
- Grid of product cards (image + name + price + quick "Add to Cart" CTA)
- Clean, spacious layout

Navigation:
- Bottom tabs: Home, Browse, Cart, Profile (simple icons, labels)
- Active state: Soft gold underline, deep plum icon
```

**Effort:** 2-3 hours

#### W1.4: Redesign Product Detail Screen

```
FILES TO MODIFY:
- app/product-detail.tsx

CHANGES:
Hero/Image Section (60% of screen):
- Large product image with zoom capability
- Soft shadow, rounded corners (BorderRadius.lg)
- Swipe indicator (small dots if multiple images)

Product Info Section:
- Product name (serif heading, deep plum, large)
- Price (prominent, gold accent, semibold)
- Rating (stars + count, if available)
- Short description (body text, medium grey)

Key Details:
- Brand, size, coverage, key ingredients (small cards)
- Each detail in soft blush card with border accent

Add to Cart:
- Quantity selector (+ / - buttons, simple)
- Large "Add to Cart" CTA (primary button, full width)
- Or checkout directly (secondary button)

Reviews Section (collapsible):
- "Customer Reviews" heading
- 3-5 reviews with photo, name, rating, quote
- "See All Reviews" button

Spacing:
- Generous padding between sections (Spacing.xl)
- Clear visual hierarchy
```

**Effort:** 2 hours

#### W1.5: Wire Up New Components in Sign-In

```
FILES TO MODIFY:
- app/(auth)/sign-in.tsx (already done with security fixes, just verify aesthetics)

Status: Already updated with new design system imports
Action: Just verify appearance matches

**Effort:** 0.5 hours (verification only)
```

**Wave 1 Summary:**

- ✅ Global design system created
- ✅ 6 core components built (Button, Card, Header, Input, Tabs, Gradient)
- ✅ 4 critical screens redesigned (Welcome, Role Selection, Browse, Product Detail)
- ✅ Customer's initial journey looks luxurious and cohesive
- ✅ Ready for demo

**Total Effort:** 8-10 hours (achievable in 1 week)

---

### WAVE 2: Checkout + Vendor Dashboard (Week 2)

**Goal:** Complete customer purchase flow + Vendor operational interface  
**Time:** 8-10 hours  
**Risk:** Low (still UI-only, no business logic changes)

#### W2.1: Redesign Cart Screen

```
FILES TO MODIFY:
- app/(customer)/cart.tsx

CHANGES:
Header: "Your Cart" (with soft gold accent underline)
Cart Items:
- Each item: Image + name + price + quantity + remove button
- Swipe-to-remove gesture
- Subtle dividers between items
- Empty state: Icon + message + "Continue Shopping" CTA

Order Summary:
- Subtotal, tax, delivery fee (clear breakdown)
- Promo code input (optional)
- Total (prominent, large serif font, gold accent)

Checkout CTA:
- "Proceed to Checkout" (primary button, full width)
- Or "Continue Shopping" (secondary)

Effort: 1.5 hours
```

#### W2.2: Redesign Checkout Screens (Multi-Step)

```
FILES TO MODIFY:
- app/(customer)/checkout.tsx (or multiple checkout-* screens)

CHANGES:
Step Indicator (top):
- 3 steps: Delivery → Payment → Confirmation
- Current step highlighted in deep plum, others in light grey
- Lines connecting steps

Step 1 - Delivery:
- "Where should we deliver?" heading
- Address input fields (street, city, postal, apartment)
- Delivery instructions (optional text area)
- Delivery date/time selector (calendar + time picker)
- "Continue" CTA (primary button)

Step 2 - Payment:
- "How would you like to pay?" heading
- Payment methods (credit card form, Apple Pay, Google Pay)
- Billing address (same as delivery, or different)
- "Complete Order" CTA (primary button, shows total)

Visual Polish:
- Generous spacing between steps
- Progress animation when moving between steps
- Input validation with clear error messages
- Loading state on "Complete Order"

Effort: 2.5 hours
```

#### W2.3: Redesign Vendor Dashboard

```
FILES TO MODIFY:
- app/(vendor)/dashboard.tsx

CHANGES:
Header: "Your Dashboard" with date (e.g., "Today, March 12")

Metrics Row (horizontal scroll if needed):
- Card 1: "Orders Today" (number, unit, context)
- Card 2: "Revenue" (total, currency)
- Card 3: "Active Orders" (count, action link)
- Card 4: "Rating" (stars, count)

Each metric card:
- Large number in deep plum (serif font)
- Label in medium grey (sans-serif)
- Soft blush background, subtle shadow
- Optional sparkle icon if trending up

Quick Actions (grid):
- "Pending Orders" → badge with count
- "Create Product" → button with icon
- "View Products" → button with icon
- "Store Settings" → button with icon

Recent Activity:
- "Orders in Last 7 Days" section
- Chart (bar chart) showing daily order count
- Or timeline of recent orders

Navigation:
- Bottom tabs: Dashboard, Orders, Products, Store, Profile
- Current: deep plum underline, others: medium grey

Effort: 2 hours
```

#### W2.4: Redesign Vendor Orders Screen

```
FILES TO MODIFY:
- app/(vendor)/orders.tsx

CHANGES:
Tabs: All | Pending | Accepted | Declined | Completed
(Use new GlamTabs component)

For each order (card):
- Customer name + avatar
- Order details: items (quantity, names)
- Amount (price, currency)
- Status badge (Pending = orange, Accepted = green, etc.)
- Timestamp ("2 hours ago")
- Action buttons: "Accept" (primary), "Decline" (ghost)

Empty state (if no orders):
- Icon (order icon)
- Message: "No pending orders" or "All orders accepted!"
- Refresh button

Interactions:
- Tap order to see full details (modal or new screen)
- Swipe right to accept, swipe left to decline (optional)
- Satisfying animations (button press, order acceptance)

Effort: 1.5 hours
```

#### W2.5: Redesign Vendor Products List

```
FILES TO MODIFY:
- app/(vendor)/products.tsx

CHANGES:
Header:
- "Your Products" with total count
- "Add Product" button (primary, top right)

Search/Filter:
- Search input (product name, category)
- Filter by category, price range

Product Grid (2 columns):
- Each cell: Product image, name, price, stock status, edit button
- Out of stock: Greyed out, badge
- Edit button (pencil icon, soft gold hover)

Empty state:
- Icon + message + "Add Your First Product" CTA

Interactions:
- Tap product card to edit
- Long-press to delete (with confirmation)
- Swipe to edit/delete (optional)

Effort: 1.5 hours
```

**Wave 2 Summary:**

- ✅ Complete customer checkout flow redesigned (4 screens)
- ✅ Vendor dashboard with metrics + quick actions
- ✅ Vendor orders and products screens
- ✅ All using consistent design system
- ✅ Ready for beta testing with vendors

**Total Effort:** 8-10 hours (achievable in week 2)

---

### WAVE 3: Driver + Admin + Polish (Week 3-4)

**Goal:** Driver and admin interfaces + micro-interactions, empty/error states, skeleton loaders  
**Time:** 8-10 hours  
**Risk:** Low (final UI polish)

#### W3.1: Redesign Driver Dashboard

```
FILES TO MODIFY:
- app/(driver)/dashboard.tsx

CHANGES:
Header: "Today's Deliveries" + date + earnings total (gold accent)

Map Section (60% of screen, if enabled):
- Map view showing available deliveries as pins
- Current location (blue dot)
- Tap pin to see order details (popup card)
- Or switch to list view if no map

Orders List:
- Each order: Pickup address, delivery address, customer name, earnings
- Status: "Ready for Pickup" | "In Transit" | "Delivered"
- Tap to start delivery flow

Earnings Summary (at bottom):
- "Today's Earnings: $XX.XX" (large, gold)
- "Completed: X | In Progress: Y"

Navigation:
- Tabs: Today, History, Earnings, Profile

Effort: 2 hours
```

#### W3.2: Redesign Driver Delivery Screen

```
FILES TO MODIFY:
- app/(driver)/delivery-[id].tsx

CHANGES:
Header: "Delivery Details" with order ID

Order Info Card:
- Customer name + phone (clickable, call icon)
- Item summary ("2 items, $XX.XX")
- Status: "Pickup" or "Delivery"

Pickup Section (if applicable):
- Vendor name, address, phone
- "Confirm Pickup" button
- Items checklist (optional)

Delivery Section (main):
- Delivery address (street, apartment, instructions)
- Map (showing delivery location from current position)
- Distance + ETA
- Customer phone + "Call" button (blue, clickable)
- "Confirm Delivery" button (primary)

Chat (optional):
- Quick message to customer
- "I'm 5 minutes away" template

Rating (after delivery):
- "Rate this delivery" (stars, optional comment)

Effort: 2 hours
```

#### W3.3: Redesign Admin Dashboard

```
FILES TO MODIFY:
- app/(admin)/dashboard.tsx (web version if separate)

CHANGES:
Side Navigation (web layout):
- Logo at top
- Menu items: Dashboard, Users, Orders, Reports, Settings
- Active item highlighted in deep plum
- Collapse/expand on mobile

Dashboard Grid:
- KPI Cards: Total Orders, Total Users, Total Revenue, Active Vendors
- Charts: Orders over time, User acquisition, Revenue trend
- Recent activity table: Latest orders, new users, pending approvals

Users Section (accessible from nav):
- Table: User name, email, role, status, joined date
- Filter: Role, status, date range
- Actions: Approve, suspend, edit
- Search by email/name

Orders Section:
- Table: Order ID, customer, vendor, amount, status, date
- Filter: Status, date range, vendor
- Actions: View details, assign driver, cancel

Effort: 2 hours
```

#### W3.4: Micro-Interactions & Polish

```
ENHANCEMENTS:

Skeleton Loaders:
- Create SkeletonLoader component
- Use for: Product list, order list, profile loading
- Pulsing animation, blush background
- Match layout of actual content (no layout shift)

Empty States:
- Create EmptyState component
- Design for: No products, no orders, no reviews
- Icon + message + optional CTA
- Matches brand aesthetics

Error States:
- Error modal with icon + message + retry button
- Non-intrusive but visible

Loading Buttons:
- Buttons show spinner when loading
- Disable interaction while loading
- Success animation (brief checkmark) on completion

Haptic Feedback:
- Tap feedback on button presses
- Success feedback on order confirmation
- Warning feedback on potential destructive actions

Transitions:
- Screen transitions: Fade (modals), slide left/right (tab changes)
- Smooth animations on data loading/updates
- Delightful micro-animations (checkout confirmation, order accepted)

Effort: 2 hours
```

#### W3.5: Design System Documentation

```
FILE TO CREATE:
- docs/DESIGN_SYSTEM_GUIDE.md

Content:
- Color palette (with usage examples)
- Typography (font families, sizes, weights, usage)
- Component library (Button, Card, Header, Input, etc.)
- Spacing rules (padding, margins, gaps)
- Shadows and elevation
- Icons (which Ionicons to use, custom icons)
- Animation guidelines
- Accessibility checklist

Usage:
- Reference for all future development
- Ensures consistency
- Helps new developers understand brand

Effort: 1.5 hours
```

**Wave 3 Summary:**

- ✅ Driver and admin interfaces redesigned
- ✅ Micro-interactions and polish applied
- ✅ Empty/error/loading states designed
- ✅ Design system documented
- ✅ Production-ready

**Total Effort:** 8-10 hours (achievable in week 3-4)

---

## PART 5: EXAMPLE REWRITES (2 Key Screens)

### 5.1 Customer Home/Browse Screen

**Current (Generic):**

```typescript
// Before: app/browse.tsx (simplified)
export default function BrowseScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products
    const allProducts = await getAllProducts();
    setProducts(allProducts);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.image }} />
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

**Luxury Redesign:**

```typescript
// After: app/(customer)/shop.tsx (luxury version)
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/DesignSystem';
import GlamCard from '@/components/GlamCard';
import GlamButton from '@/components/GlamButton';
import GlamInput from '@/components/GlamInput';
import GlamGradient from '@/components/GlamGradient';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, FlatList, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomerShopScreen() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories([{ id: 'all', name: 'All' }, ...categoriesData]);
    } catch (error) {
      logger.error('Failed to load shop data', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchText ||
      product.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO SECTION */}
        <GlamGradient
          colors={[Colors.neutral.softBlush, Colors.neutral.blushCream]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Discover Premium Beauty</Text>
            <Text style={styles.heroSubtitle}>Curated products for your beauty needs</Text>
          </View>
        </GlamGradient>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <GlamInput
            placeholder="Search products, brands..."
            value={searchText}
            onChangeText={setSearchText}
            leftIcon={<Ionicons name="search" size={18} color={Colors.neutral.mediumGrey} />}
            variant="standard"
          />
        </View>

        {/* FEATURED SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured This Week</Text>
            <Pressable onPress={() => router.push('/(customer)/shop?category=featured')}>
              <Text style={styles.seeAllLink}>See All</Text>
            </Pressable>
          </View>
          <FlatList
            data={products.slice(0, 4)}
            renderItem={({ item }) => (
              <Pressable
                style={styles.featuredCard}
                onPress={() => router.push(`/product-detail?id=${item.id}`)}
              >
                <GlamCard>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.featuredImage}
                  />
                  <View style={styles.featuredInfo}>
                    <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                </GlamCard>
              </Pressable>
            )}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* CATEGORIES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.categoryButton,
                  selectedCategory === item.id && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === item.id && styles.categoryButtonTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            )}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* PRODUCTS GRID */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
          </Text>
          {loading ? (
            // Skeleton loader
            <View style={styles.skeletonGrid}>
              {[1, 2, 3, 4].map(i => (
                <View key={i} style={styles.skeletonCard} />
              ))}
            </View>
          ) : filteredProducts.length === 0 ? (
            // Empty state
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={Colors.neutral.mediumGrey} />
              <Text style={styles.emptyStateText}>No products found</Text>
              <GlamButton
                variant="ghost"
                title="Clear Filters"
                onPress={() => {
                  setSelectedCategory('all');
                  setSearchText('');
                }}
              />
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <Pressable
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => router.push(`/product-detail?id=${product.id}`)}
                >
                  <GlamCard variant="elevated">
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                      <Text style={styles.productBrand}>{product.brand}</Text>
                      <View style={styles.productFooter}>
                        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                        {product.rating && (
                          <View style={styles.rating}>
                            <Ionicons name="star" size={12} color={Colors.secondary.softGold} />
                            <Text style={styles.ratingText}>{product.rating}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </GlamCard>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },
  heroSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing['3xl'],
    borderRadius: BorderRadius.lg,
    margin: Spacing.lg,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
    textAlign: 'center',
    marginBottom: Spacing.base,
    fontFamily: Typography.fontFamily.heading,
  },
  heroSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mutedText,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.body,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
    fontFamily: Typography.fontFamily.heading,
  },
  seeAllLink: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary.softGold,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.body,
  },
  featuredCard: {
    marginRight: Spacing.md,
    width: 160,
  },
  featuredImage: {
    width: '100%',
    height: 160,
    borderRadius: BorderRadius.md,
    resizeMode: 'cover',
  },
  featuredInfo: {
    paddingTop: Spacing.sm,
  },
  productName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.xs,
  },
  productPrice: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.secondary.softGold,
  },
  categoryButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.softBlush,
    ...Shadows.subtle,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary.deepPlum,
  },
  categoryButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.primary.deepPlum,
  },
  categoryButtonTextActive: {
    color: Colors.neutral.white,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: Spacing.lg,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: BorderRadius.md,
    resizeMode: 'cover',
  },
  productInfo: {
    paddingTop: Spacing.md,
  },
  productBrand: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    letterSpacing: Typography.letterSpacing.wide,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeletonCard: {
    width: '48%',
    height: 220,
    backgroundColor: Colors.neutral.softBlush,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['3xl'],
    gap: Spacing.lg,
  },
  emptyStateText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    fontFamily: Typography.fontFamily.body,
  },
});
```

**Key Improvements:**

- ✅ Hero section with compelling copy + gradient
- ✅ Luxury typography (serif for titles, sans-serif for body)
- ✅ Generous spacing (breathing room)
- ✅ Beautiful product cards with shadows + rounded corners
- ✅ Smooth category filtering
- ✅ Empty state + skeleton loaders
- ✅ Professional colors (deep plum + soft gold accents)
- ✅ Consistent component usage (GlamCard, GlamInput, etc.)

---

### 5.2 Vendor Dashboard Screen

**Luxury Redesign:**

```typescript
// app/(vendor)/dashboard.tsx
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/DesignSystem';
import GlamCard from '@/components/GlamCard';
import GlamButton from '@/components/GlamButton';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Pressable, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';

export default function VendorDashboardScreen() {
  const router = useRouter();
  const [metrics, setMetrics] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [metricsData, ordersData, chartDataResponse] = await Promise.all([
        getVendorMetrics(),
        getRecentOrders(5),
        getOrdersChartData(),
      ]);
      setMetrics(metricsData);
      setRecentOrders(ordersData);
      setChartData(chartDataResponse);
    } catch (error) {
      logger.error('Failed to load dashboard', error);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({ label, value, icon, trend, color = 'primary' }) => (
    <GlamCard style={styles.metricCard}>
      <View style={styles.metricContent}>
        <View style={styles.metricLeft}>
          <Text style={styles.metricValue}>{value}</Text>
          <Text style={styles.metricLabel}>{label}</Text>
          {trend && (
            <View style={styles.trendBadge}>
              <Ionicons
                name={trend > 0 ? 'arrow-up' : 'arrow-down'}
                size={12}
                color={trend > 0 ? Colors.semantic.success : Colors.semantic.error}
              />
              <Text style={styles.trendText}>{Math.abs(trend)}% from yesterday</Text>
            </View>
          )}
        </View>
        <View
          style={[
            styles.metricIcon,
            {
              backgroundColor:
                color === 'primary'
                  ? Colors.primary.paleAmethyst
                  : Colors.semantic.warning,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={color === 'primary' ? Colors.primary.deepPlum : Colors.semantic.warning}
          />
        </View>
      </View>
    </GlamCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Afternoon</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/(vendor)/profile')}
            style={styles.profileButton}
          >
            <Ionicons name="person-circle" size={40} color={Colors.primary.deepPlum} />
          </Pressable>
        </View>

        {/* KEY METRICS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <FlatList
            data={[
              { label: 'Orders Today', value: metrics?.todayOrders || 0, icon: 'shopping-bag', trend: 12 },
              { label: 'Revenue', value: `$${metrics?.todayRevenue || 0}`, icon: 'cash-multiple', trend: -5 },
              { label: 'Active Orders', value: metrics?.activeOrders || 0, icon: 'truck-delivery', trend: null },
              { label: 'Rating', value: metrics?.rating || '4.8', icon: 'star', trend: null },
            ]}
            renderItem={({ item }) => (
              <MetricCard
                label={item.label}
                value={item.value}
                icon={item.icon}
                trend={item.trend}
              />
            )}
            scrollEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.metricsContainer}
          />
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <GlamButton
              variant="primary"
              title="Pending Orders"
              onPress={() => router.push('/(vendor)/orders?tab=pending')}
              size="lg"
              customStyle={styles.actionButton}
            />
            <GlamButton
              variant="secondary"
              title="New Product"
              onPress={() => router.push('/(vendor)/add-product')}
              size="lg"
              customStyle={styles.actionButton}
            />
          </View>
          <View style={styles.actionsGrid}>
            <GlamButton
              variant="ghost"
              title="View All Products"
              onPress={() => router.push('/(vendor)/products')}
              size="lg"
              customStyle={styles.actionButton}
            />
            <GlamButton
              variant="ghost"
              title="Store Settings"
              onPress={() => router.push('/(vendor)/store-settings')}
              size="lg"
              customStyle={styles.actionButton}
            />
          </View>
        </View>

        {/* ORDERS CHART */}
        {chartData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Last 7 Days</Text>
            <GlamCard>
              <VictoryChart
                width={Dimensions.get('window').width - Spacing.lg * 2 - Spacing.base * 2}
                height={200}
              >
                <VictoryAxis
                  style={{ axis: { strokeWidth: 0 }, ticks: { fill: 'none' } }}
                />
                <VictoryBar
                  data={chartData}
                  x="day"
                  y="orders"
                  style={{ data: { fill: Colors.secondary.softGold } }}
                />
              </VictoryChart>
            </GlamCard>
          </View>
        )}

        {/* RECENT ORDERS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <Pressable onPress={() => router.push('/(vendor)/orders')}>
              <Text style={styles.seeAllLink}>See All</Text>
            </Pressable>
          </View>
          {recentOrders.length === 0 ? (
            <GlamCard>
              <View style={styles.emptyOrdersState}>
                <Ionicons name="inbox-outline" size={48} color={Colors.neutral.mediumGrey} />
                <Text style={styles.emptyOrdersText}>No recent orders</Text>
              </View>
            </GlamCard>
          ) : (
            recentOrders.map((order) => (
              <Pressable
                key={order.id}
                onPress={() => router.push(`/(vendor)/order-details?id=${order.id}`)}
              >
                <GlamCard style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <View>
                      <Text style={styles.orderId}>Order #{order.id}</Text>
                      <Text style={styles.orderTime}>
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            order.status === 'PENDING'
                              ? Colors.semantic.warning
                              : Colors.semantic.success,
                        },
                      ]}
                    >
                      <Text style={styles.statusText}>{order.status}</Text>
                    </View>
                  </View>
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderCustomer}>{order.customerName}</Text>
                    <Text style={styles.orderItems}>{order.itemCount} items</Text>
                  </View>
                  <View style={styles.orderFooter}>
                    <Text style={styles.orderAmount}>${order.total}</Text>
                    {order.status === 'PENDING' && (
                      <GlamButton
                        variant="primary"
                        title="Review"
                        size="sm"
                        onPress={() => router.push(`/(vendor)/order-details?id=${order.id}`)}
                      />
                    )}
                  </View>
                </GlamCard>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
    fontFamily: Typography.fontFamily.heading,
  },
  date: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  profileButton: {
    padding: Spacing.sm,
  },
  section: {
    marginBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
    marginBottom: Spacing.lg,
    fontFamily: Typography.fontFamily.heading,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  seeAllLink: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary.softGold,
    fontWeight: Typography.fontWeight.semibold,
  },
  metricsContainer: {
    gap: Spacing.md,
  },
  metricCard: {
    width: 160,
    padding: Spacing.md,
  },
  metricContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  metricLeft: {
    flex: 1,
  },
  metricValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.deepPlum,
    marginBottom: Spacing.xs,
  },
  metricLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wide,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  trendText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.semantic.success,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  orderCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  orderId: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkText,
  },
  orderTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.white,
    textTransform: 'uppercase',
  },
  orderDetails: {
    marginBottom: Spacing.md,
  },
  orderCustomer: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.darkText,
  },
  orderItems: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lightGrey,
  },
  orderAmount: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.secondary.softGold,
  },
  emptyOrdersState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['2xl'],
    gap: Spacing.md,
  },
  emptyOrdersText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
  },
});
```

**Key Improvements:**

- ✅ Metrics cards with icons + trends
- ✅ Quick action buttons (grid layout)
- ✅ Chart visualization (orders over time)
- ✅ Recent orders with status badges
- ✅ Professional header with greeting
- ✅ Consistent design system usage
- ✅ Empty state handling
- ✅ Responsive, spacious layout

---

## PART 6: TODAY VS. LATER (PRIORITIZED TASK LIST)

### 🔴 MUST-DO BEFORE NEXT DEMO (This Week - March 12-14)

1. **Create Design System** (`constants/DesignSystem.ts`)
   - Colors, Typography, Spacing, Shadows, Borders
   - Status: ~1 hour
   - Impact: Enables all other screens
   - ✅ Can complete today

2. **Build Core Components** (6 files)
   - GlamButton, GlamCard, GlamHeader, GlamInput, GlamTabs, GlamGradient
   - Status: ~2 hours
   - Impact: Reusable across all screens
   - ✅ Can complete today

3. **Redesign Welcome Screen** (`app/index.tsx`)
   - Hero section, logo, tagline, CTA buttons
   - Status: ~45 min
   - Impact: First impression (crucial for demo)
   - ✅ Can complete today

4. **Redesign Browse/Shop Screen** (`app/(customer)/shop.tsx`)
   - Hero, search, featured, categories, products grid
   - Status: ~2 hours
   - Impact: Core customer journey
   - ✅ Can complete today

5. **Redesign Product Detail** (`app/product-detail.tsx`)
   - Image, info, pricing, add to cart, reviews
   - Status: ~1.5 hours
   - Impact: Completes customer browsing flow
   - ✅ Can complete today

6. **Redesign Sign-In** (`app/(auth)/sign-in.tsx`)
   - Already updated for security; verify aesthetics match new design system
   - Status: ~30 min (verification)
   - Impact: Brand consistency
   - ✅ Already done (security fixes)

7. **Redesign Role Selection** (`app/(auth)/role-selection.tsx`)
   - 3 cards (Customer, Vendor, Driver), descriptions, select buttons
   - Status: ~1 hour
   - Impact: Smooth onboarding experience
   - ✅ Can complete today

**Total Time:** ~8-10 hours  
**Feasible in:** 1 week (spreading across 3 days)  
**Effort:** HIGH but doable  
**Risk:** LOW (UI-only, no backend changes)

### 🟡 SAFE TO DO NEXT WEEK (March 17-21)

8. **Redesign Checkout Flow** (`app/(customer)/checkout.tsx`)
   - Multi-step: Address → Payment → Confirmation
   - Status: ~2.5 hours
   - Impact: Customer purchase completion
   - Pre-requisite: Core components built
   - ✅ Can start early next week

9. **Redesign Cart Screen** (`app/(customer)/cart.tsx`)
   - Items list, order summary, checkout CTA
   - Status: ~1.5 hours
   - Impact: Supports checkout flow
   - ✅ Can start early next week

10. **Redesign Vendor Dashboard** (`app/(vendor)/dashboard.tsx`)
    - Metrics, quick actions, recent orders, chart
    - Status: ~2 hours
    - Impact: Vendor experience improvement
    - ✅ Can start mid-week next week

11. **Redesign Vendor Orders** (`app/(vendor)/orders.tsx`)
    - Tabs (All, Pending, Accepted), order cards, actions
    - Status: ~1.5 hours
    - Impact: Vendor order management
    - ✅ Can start mid-week next week

12. **Redesign Vendor Products** (`app/(vendor)/products.tsx`)
    - Grid layout, search, filter, edit buttons
    - Status: ~1.5 hours
    - Impact: Vendor product management
    - ✅ Can start end of week

### 🟢 SAFE TO DO WEEK 3-4 (March 24-31)

13. **Redesign Driver Dashboard** (`app/(driver)/dashboard.tsx`)
    - Map/list view, available orders, earnings
    - Status: ~2 hours
    - Impact: Driver experience
    - ✅ Week 3

14. **Redesign Driver Delivery** (`app/(driver)/delivery-[id].tsx`)
    - Order details, map, pickup/delivery flow, rating
    - Status: ~2 hours
    - Impact: Driver delivery experience
    - ✅ Week 3

15. **Redesign Admin Dashboard** (`app/(admin)/dashboard.tsx` or web)
    - KPIs, charts, users, orders sections
    - Status: ~2 hours
    - Impact: Admin oversight
    - ✅ Week 3-4

16. **Polish & Micro-Interactions**
    - Skeleton loaders, empty states, error states, haptic feedback
    - Status: ~2 hours
    - Impact: Professional feel
    - ✅ Week 3-4

17. **Design System Documentation**
    - Create `docs/DESIGN_SYSTEM_GUIDE.md`
    - Status: ~1.5 hours
    - Impact: Future development consistency
    - ✅ Week 4

---

## SUMMARY TABLE

| Phase      | Week      | Tasks                          | Hours | Files | Risk   | Status            |
| ---------- | --------- | ------------------------------ | ----- | ----- | ------ | ----------------- |
| **WAVE 1** | This Week | Design System + 6 Core Screens | 8-10  | 10-15 | 🟢 Low | 🟡 Ready to Start |
| **WAVE 2** | Week 2    | Checkout + Vendor Dashboard    | 8-10  | 8-10  | 🟢 Low | 🟢 Follow Wave 1  |
| **WAVE 3** | Week 3-4  | Driver + Admin + Polish        | 8-10  | 8-10  | 🟢 Low | 🟢 Follow Wave 2  |
| **TOTAL**  | 4-6 weeks | Complete Luxury Redesign       | 24-30 | 26-35 | 🟢 Low | ✅ Achievable     |

---

## FINAL RECOMMENDATIONS

### Immediate Actions (Next 30 Minutes)

1. ✅ Review this plan with team
2. ✅ Confirm color palette (logo matches? approval?)
3. ✅ Confirm typography (PlayfairDisplay + Inter available?)
4. ✅ Assign Wave 1 tasks

### Go/No-Go for Demo (March 13)

**GO:** If you can complete Wave 1 (8-10 hours this week)

- App looks cohesive, luxury, brand-consistent
- Customer journey (browse → detail → cart → checkout) is polished
- Welcome/onboarding feels premium
- Ready to impress stakeholders

**NO-GO:** If Wave 1 can't be completed

- Keep current design for demo
- Mention redesign is underway (show mockups)
- Target redesigned app for March 20 follow-up demo

### Success Metrics

- ✅ App feels 2x more premium than current (subjective, but clear)
- ✅ Consistent brand application (colors, fonts, spacing)
- ✅ 0 design regressions (nothing looks worse than before)
- ✅ 0 breaking changes (all backend intact, all flows work)
- ✅ Team confident in design direction

---

**Status:** Ready to Execute  
**Complexity:** Medium (but low-risk UI-only changes)  
**Timeline:** 4-6 weeks for complete redesign  
**Recommendation:** Start Wave 1 immediately (this week), target March 13 demo with at least customer journey redesigned

🚀 **Let's build GlamGo as a luxury brand!**
