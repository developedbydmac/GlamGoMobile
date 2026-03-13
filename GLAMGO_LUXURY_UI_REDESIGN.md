# GlamGo Luxury UI/UX Redesign Plan

**Date:** March 12, 2026  
**Brand Vision:** High-end luxury beauty marketplace - soft, elegant, refined  
**Tech Stack:** Expo React Native (mobile), React (admin web), existing AWS backend  
**Design Reference:** Soft blush background, flowing script "GlamGo", purple-to-gold gradients, refined typography

---

## PART 1: UI/UX AUDIT OF CURRENT APP

### Overall Brand Misalignment Issues:

**Current State:** Generic e-commerce app with basic styling
**Target State:** Luxury beauty experience like Sephora, Ulta, or Charlotte Tilbury apps

---

### Mobile App Audit by Screen:

#### 🔴 **Onboarding/Auth Screens** (`app/index.tsx`, `app/pending-approval.tsx`)

**Current Issues:**

- **Colors:** Generic black text on white, no brand colors
- **Typography:** System fonts, no elegance or hierarchy
- **Spacing:** Cramped, form-focused rather than welcoming
- **Imagery:** No welcome hero, no brand photography
- **UX:** Functional but not inviting - feels like filling out a form, not entering a luxury space

**Files:**

- `app/index.tsx` (login/signup)
- `app/pending-approval.tsx` (approval waiting screen)

**Must Change:**

- Add full-screen hero with soft gradient background
- Replace "Login" with "Welcome to GlamGo" with script font
- Add beauty product imagery (soft-focus cosmetics)
- Redesign forms with floating labels and elegant inputs

---

#### 🔴 **Customer Browse** (`app/browse.tsx`, `app/browse-new.tsx`)

**Current Issues:**

- **Layout:** Grid feels utilitarian, not curated
- **Cards:** Sharp corners, basic shadows, no luxury feel
- **Colors:** Harsh whites, no warmth or sophistication
- **Typography:** Plain product names, no visual hierarchy for pricing
- **Imagery:** Product photos not styled consistently (mixed quality)
- **UX:** Feels like browsing a warehouse, not a boutique

**Files:**

- `app/browse.tsx` (current browse screen)
- `app/browse-new.tsx` (alternate implementation)

**Must Change:**

- Softer card shadows with blush/cream backgrounds
- Elegant serif fonts for product names
- Gold accent for prices
- Hero section at top with "Discover Your Glow" messaging
- Category pills with gradient accents instead of basic buttons

---

#### 🔴 **Product Detail** (`app/product-detail.tsx`)

**Current Issues:**

- **Layout:** Image at top, text below - no storytelling
- **Colors:** Flat, no premium feel
- **Typography:** Product description in basic paragraph, not designed
- **CTA Button:** Generic "Add to Cart" - not luxury language
- **UX:** Functional checkout, not desire-building experience

**Files:**

- `app/product-detail.tsx`

**Must Change:**

- Full-screen image carousel with pinch-to-zoom
- Product name in elegant serif over soft gradient backdrop
- Price in gold with supporting text "Invest in your beauty"
- "Add to Bag" instead of "Add to Cart" (luxury language)
- Ingredient callouts with icons (paraben-free, cruelty-free, vegan)
- Related products carousel at bottom

---

#### 🔴 **Cart/Checkout** (Cart tab, no dedicated checkout screen yet)

**Current Issues:**

- **Layout:** List of items, feels transactional
- **Colors:** Basic white background, no warmth
- **Typography:** Plain item names and prices
- **CTA:** "Place Order" - utilitarian language
- **UX:** Checkout feels rushed, not celebratory

**Files:**

- `app/(customer)/cart.tsx` (cart within tab navigator)

**Must Change:**

- Rename to "Your Bag" instead of "Cart"
- Soft blush background instead of white
- Add "You're Almost There" hero message
- Elegant item cards with product images prominent
- Replace "Place Order" with "Complete Your Purchase" in gradient gold button
- Add trust badges (secure payment, fast shipping)

---

#### 🔴 **Order Tracking** (`app/(customer)/orders.tsx`)

**Current Issues:**

- **Layout:** Plain list of orders, no emotional connection
- **Colors:** Monotone, no status differentiation
- **Typography:** Order numbers feel like receipts, not experiences
- **UX:** Transactional, not "your beauty journey"

**Files:**

- `app/(customer)/orders.tsx`

**Must Change:**

- Hero: "Your Beauty Journey" instead of "My Orders"
- Status badges with color coding (soft purple for pending, gold for delivered)
- Timeline view for order progression (not just status text)
- Product thumbnails for each order
- "Reorder" quick action buttons

---

#### 🟡 **Vendor Dashboard** (`app/(vendor)/products.tsx`, `app/(vendor)/orders.tsx`)

**Current Issues:**

- **Layout:** Dashboard feels like admin panel, not business tool
- **Colors:** Clinical white, no brand warmth
- **Typography:** Plain table headers, no hierarchy
- **UX:** Functional but not motivating - doesn't make vendor feel like partner

**Files:**

- `app/(vendor)/products.tsx` (product management)
- `app/(vendor)/orders.tsx` (order management)
- `app/create-store.tsx` (store setup)
- `app/add-product.tsx` (product creation)
- `app/edit-product.tsx` (product editing)

**Must Change:**

- Dashboard home with key metrics cards (orders today, revenue, top product)
- Metrics cards with gradient backgrounds (purple-to-gold)
- Product grid with hover states showing quick actions
- "Your Store" language instead of "Vendor Dashboard"
- Elegant empty states with illustrations

---

#### 🟡 **Driver Screens** (`app/(driver)/available.tsx`, `app/(driver)/active.tsx`, `app/(driver)/earnings.tsx`)

**Current Issues:**

- **Layout:** List-heavy, feels like task manager
- **Colors:** No differentiation from customer/vendor apps
- **Typography:** Functional, not motivating
- **UX:** Doesn't celebrate driver as key part of luxury experience

**Files:**

- `app/(driver)/available.tsx` (available orders)
- `app/(driver)/active.tsx` (active delivery)
- `app/(driver)/earnings.tsx` (earnings dashboard)

**Must Change:**

- Simplified, map-first interface for active deliveries
- Earnings dashboard with celebratory language ("Your Success This Week")
- Delivery cards with customer neighborhood (not full address) for privacy
- Accept button with gradient gold (make it feel rewarding)

---

#### 🟡 **Admin Web Dashboard** (`app/(admin)/dashboard.tsx`)

**Current Issues:**

- **Layout:** Generic admin table
- **Colors:** No brand integration
- **Typography:** System default
- **UX:** Functional but doesn't reflect GlamGo brand

**Files:**

- `app/(admin)/dashboard.tsx`

**Must Change:**

- Side navigation with GlamGo logo and gradient accent
- Metrics cards at top (total orders, revenue, active users)
- Clean table design with hover states
- Approval buttons with brand colors
- "Platform Health" dashboard feel

---

### Key Theme Across All Screens:

**Current:** Functional e-commerce app  
**Target:** Luxury beauty experience with emotional connection

**Color Issues:** Too much white, no warmth, no gradients  
**Typography Issues:** System fonts, no elegance, poor hierarchy  
**Spacing Issues:** Cramped, no breathing room  
**Component Issues:** Sharp corners, basic shadows, no refinement  
**Language Issues:** "Cart", "Order", "Vendor" - transactional, not experiential

---

## PART 2: LUXURY DESIGN SYSTEM FOR GLAMGO

### Color Palette (Aligned with Logo):

```typescript
// src/theme/glamgoTheme.ts

export const colors = {
  // Primary Brand Colors
  primary: {
    blush: "#F5E6E8", // Soft blush background (logo base)
    rose: "#D4A5A5", // Medium rose (accents)
    mauve: "#9B7C7C", // Deep mauve (text on light)
    plum: "#6B4C4C", // Rich plum (headings)
  },

  // Luxury Accent Colors
  accent: {
    gold: "#D4AF37", // Luxury gold (CTAs, prices)
    champagne: "#F7E7CE", // Soft champagne (highlights)
    bronze: "#CD7F32", // Bronze (secondary actions)
  },

  // Purple-to-Gold Gradient (Logo script)
  gradient: {
    purple: "#9B7C9B", // Gradient start
    gold: "#D4AF37", // Gradient end
    // Usage: linear-gradient(135deg, purple, gold)
  },

  // Neutrals
  neutral: {
    white: "#FFFFFF",
    cream: "#FAF8F6", // Warmer white for backgrounds
    linen: "#F0EBE3", // Card backgrounds
    stone: "#C8BDB1", // Borders, dividers
    charcoal: "#3D3D3D", // Body text
    onyx: "#1A1A1A", // Headings
  },

  // Semantic Colors
  semantic: {
    success: "#7CB342", // Muted green (not bright)
    warning: "#F9A825", // Soft amber
    error: "#D32F2F", // Elegant red
    info: "#8E7CC3", // Soft purple
  },

  // Surface & Background
  surface: {
    app: "#FAF8F6", // Main app background (warm cream)
    card: "#FFFFFF", // Card surfaces
    cardElevated: "#F5E6E8", // Elevated cards (blush tint)
    input: "#FFFFFF", // Input backgrounds
    overlay: "rgba(0,0,0,0.4)", // Modals, bottom sheets
  },

  // Text Colors
  text: {
    primary: "#1A1A1A", // Headings, important text
    secondary: "#3D3D3D", // Body text
    tertiary: "#8E8E8E", // Captions, labels
    inverse: "#FFFFFF", // Text on dark backgrounds
    accent: "#D4AF37", // Gold for prices, emphasis
  },
};

// Usage Guidelines:
// - primary.blush: Main app backgrounds, hero sections
// - accent.gold: Prices, CTAs, premium features
// - gradient.purple → gradient.gold: Buttons, headings, highlights
// - neutral.cream: Card backgrounds, surfaces
// - text.accent: Prices, "Add to Bag" CTAs
```

---

### Typography System:

```typescript
// src/theme/glamgoTheme.ts

export const typography = {
  // Font Families
  fonts: {
    heading: "Cormorant Garamond", // Elegant serif for headings (Google Font)
    // Fallback: 'Georgia', 'serif'

    body: "Avenir Next", // Clean sans-serif for body (system)
    // Fallback: 'SF Pro Text', 'Helvetica Neue', 'sans-serif'

    script: "Parisienne", // Flowing script for "GlamGo" (Google Font)
    // Fallback: 'Brush Script MT', 'cursive'

    mono: "SF Mono", // For order numbers, codes
    // Fallback: 'Courier New', 'monospace'
  },

  // Font Sizes (Mobile)
  sizes: {
    // Headings
    h1: 32, // Page titles ("Welcome to GlamGo")
    h2: 28, // Section titles ("Shop by Category")
    h3: 24, // Card titles ("Featured This Week")
    h4: 20, // Product names
    h5: 18, // Subsection headers
    h6: 16, // Labels, small headers

    // Body
    body: 16, // Main body text
    bodySmall: 14, // Secondary body text
    caption: 12, // Captions, helper text
    tiny: 10, // Micro text (disclaimers)

    // Special
    price: 22, // Product prices
    hero: 40, // Hero section text
  },

  // Font Weights
  weights: {
    thin: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Line Heights
  lineHeights: {
    tight: 1.2, // Headings
    normal: 1.5, // Body text
    relaxed: 1.8, // Comfortable reading
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5, // Large headings
    normal: 0, // Body text
    wide: 0.5, // Small caps, labels
    luxury: 1.5, // "SHOP NOW" CTAs
  },
};

// Usage Guidelines:
// - fonts.heading: All h1-h6, product names
// - fonts.body: All body text, buttons
// - fonts.script: Logo, hero section taglines only
// - weights.semibold: Headings
// - weights.regular: Body text
// - letterSpacing.luxury: Uppercase CTAs ("ADD TO BAG")
```

---

### Component Styles:

```typescript
// src/theme/glamgoTheme.ts

export const components = {
  // Buttons
  button: {
    primary: {
      // "Add to Bag", "Complete Purchase" - main CTAs
      background: "linear-gradient(135deg, #9B7C9B, #D4AF37)",
      textColor: colors.text.inverse,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 32,
      fontSize: typography.sizes.body,
      fontWeight: typography.weights.semibold,
      letterSpacing: typography.letterSpacing.wide,
      textTransform: "uppercase",
      shadow: {
        shadowColor: colors.gradient.purple,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      },
    },
    secondary: {
      // "Continue Shopping", "View Details"
      background: colors.neutral.cream,
      textColor: colors.text.primary,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 28,
      fontSize: typography.sizes.bodySmall,
      fontWeight: typography.weights.medium,
      border: `1px solid ${colors.neutral.stone}`,
    },
    tertiary: {
      // Text-only buttons "Skip", "Cancel"
      background: "transparent",
      textColor: colors.text.secondary,
      fontSize: typography.sizes.bodySmall,
      fontWeight: typography.weights.regular,
      textDecoration: "underline",
    },
  },

  // Cards
  card: {
    product: {
      // Product cards in browse grid
      background: colors.surface.card,
      borderRadius: 16,
      padding: 12,
      shadow: {
        shadowColor: colors.neutral.stone,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      },
      border: "none",
    },
    elevated: {
      // Hero cards, featured content
      background: colors.surface.cardElevated,
      borderRadius: 20,
      padding: 20,
      shadow: {
        shadowColor: colors.primary.mauve,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      },
    },
    flat: {
      // List items, order history
      background: colors.surface.card,
      borderRadius: 12,
      padding: 16,
      border: `1px solid ${colors.neutral.stone}`,
      shadow: "none",
    },
  },

  // Input Fields
  input: {
    default: {
      background: colors.surface.input,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 16,
      fontSize: typography.sizes.body,
      fontWeight: typography.weights.regular,
      borderWidth: 1,
      borderColor: colors.neutral.stone,
      focusBorderColor: colors.gradient.purple,
      placeholderColor: colors.text.tertiary,
    },
    floating: {
      // Floating label inputs (luxury feel)
      background: "transparent",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral.stone,
      paddingVertical: 12,
      paddingHorizontal: 0,
      labelColor: colors.text.tertiary,
      labelSize: typography.sizes.caption,
      focusBorderBottomColor: colors.accent.gold,
    },
  },

  // Chips/Tags
  chip: {
    default: {
      background: colors.neutral.linen,
      textColor: colors.text.secondary,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: typography.sizes.bodySmall,
      fontWeight: typography.weights.medium,
    },
    selected: {
      background: "linear-gradient(135deg, #9B7C9B, #D4AF37)",
      textColor: colors.text.inverse,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: typography.sizes.bodySmall,
      fontWeight: typography.weights.semibold,
    },
  },

  // Modals & Bottom Sheets
  modal: {
    overlay: {
      background: colors.surface.overlay,
    },
    container: {
      background: colors.surface.card,
      borderRadius: 24,
      padding: 24,
      maxWidth: 400,
    },
    bottomSheet: {
      background: colors.surface.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
    },
  },

  // Navigation
  navigation: {
    tabBar: {
      background: colors.surface.card,
      borderTopWidth: 1,
      borderTopColor: colors.neutral.stone,
      paddingVertical: 8,
      activeColor: colors.gradient.purple,
      inactiveColor: colors.text.tertiary,
    },
    header: {
      background: "linear-gradient(180deg, #FAF8F6, #FFFFFF)",
      titleColor: colors.text.primary,
      titleSize: typography.sizes.h4,
      titleWeight: typography.weights.semibold,
      titleFont: typography.fonts.heading,
    },
  },
};

// Elevation Scale (Shadows)
export const elevation = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: colors.neutral.stone,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.neutral.stone,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.primary.mauve,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Spacing Scale (Padding & Margins)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius Scale
export const radii = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999, // Fully rounded (pills)
};
```

---

### Complete Theme Object:

```typescript
// src/theme/glamgoTheme.ts

export const glamgoTheme = {
  colors,
  typography,
  components,
  elevation,
  spacing,
  radii,
};

export type GlamGoTheme = typeof glamgoTheme;

// Usage in components:
// import { glamgoTheme } from '@/theme/glamgoTheme';
// <Text style={{ color: glamgoTheme.colors.text.accent }}>$55.00</Text>
```

---

## PART 3: NEW IA AND FLOW LAYOUT

### Customer App Navigation:

```
┌─────────────────────────────────────┐
│   Welcome / Onboarding              │
│   - Hero with gradient background   │
│   - "Discover Your Glow" tagline    │
│   - Login / Sign Up                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Customer Home (Tab Navigator)     │
│   ├─ Discover (Browse)              │
│   ├─ Your Bag (Cart)                │
│   ├─ Orders (Order History)         │
│   └─ Profile                        │
└─────────────────────────────────────┘
              ↓
      [Discover Tab]
┌─────────────────────────────────────┐
│   Hero Section                      │
│   - Welcome message                 │
│   - Search bar                      │
│   - Curated categories carousel     │
│                                     │
│   Featured This Week                │
│   - 2-3 hero product cards          │
│                                     │
│   Shop by Category                  │
│   - Category chips (Makeup, etc.)   │
│   - Product grid (2 columns)        │
└─────────────────────────────────────┘
              ↓
      [Product Detail]
┌─────────────────────────────────────┐
│   Full-screen image carousel        │
│   Product name (serif, overlay)     │
│   Price (gold accent)               │
│   Description (expandable)          │
│   Ingredients / Benefits            │
│   "Add to Bag" (gradient button)    │
│   Related products carousel         │
└─────────────────────────────────────┘
              ↓
      [Your Bag Tab]
┌─────────────────────────────────────┐
│   Hero: "You're Almost There"       │
│   Bag items (elegant cards)         │
│   - Product image                   │
│   - Name, price, quantity           │
│   - Remove option                   │
│                                     │
│   Subtotal breakdown                │
│   "Complete Your Purchase" button   │
└─────────────────────────────────────┘
              ↓
      [Orders Tab]
┌─────────────────────────────────────┐
│   Hero: "Your Beauty Journey"       │
│   Order cards                       │
│   - Order # (subtle)                │
│   - Product thumbnails              │
│   - Status badge (colored)          │
│   - Timeline view                   │
│   - "Reorder" quick action          │
└─────────────────────────────────────┘
```

---

### Vendor App Navigation:

```
┌─────────────────────────────────────┐
│   Vendor Login / Onboarding         │
│   - "Your Store, Your Success"      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Vendor Dashboard Home             │
│   - Today's metrics cards           │
│     • Orders Today: 12              │
│     • Revenue Today: $1,240         │
│     • Active Orders: 5              │
│   - Quick actions                   │
│     • Add Product                   │
│     • View Orders                   │
│   - Top products list               │
└─────────────────────────────────────┘
              ↓
      [Your Products]
┌─────────────────────────────────────┐
│   Product grid (2 columns)          │
│   - Product card with image         │
│   - Quick edit/delete icons         │
│   + Add Product FAB (gradient)      │
└─────────────────────────────────────┘
              ↓
      [Incoming Orders]
┌─────────────────────────────────────┐
│   Order cards                       │
│   - Customer name (first name only) │
│   - Products list                   │
│   - Total, status                   │
│   - Accept / Decline buttons        │
└─────────────────────────────────────┘
```

---

### Driver App Navigation:

```
┌─────────────────────────────────────┐
│   Driver Login                      │
│   - "Earn with GlamGo"              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Driver Home (Map-First)           │
│   - Map view (top 60%)              │
│   - Available orders sheet (bottom) │
│   - Earnings today widget           │
└─────────────────────────────────────┘
              ↓
      [Active Delivery]
┌─────────────────────────────────────┐
│   Map with route                    │
│   - Pickup location                 │
│   - Dropoff location                │
│                                     │
│   Order card (bottom sheet)         │
│   - Customer name                   │
│   - Delivery address                │
│   - Status update buttons:          │
│     • Picked Up                     │
│     • On the Way                    │
│     • Delivered                     │
└─────────────────────────────────────┘
              ↓
      [Earnings]
┌─────────────────────────────────────┐
│   Hero: "Your Success This Week"    │
│   Week total (large, gold)          │
│   Chart (deliveries per day)        │
│   Completed orders list             │
└─────────────────────────────────────┘
```

---

### Admin Web Dashboard:

```
┌───────────────────────────────────────────────────┐
│  ┌─────────────────┐  Platform Health Dashboard  │
│  │  GlamGo Logo    │                              │
│  │  (Gradient)     │  ┌──────────────────────┐   │
│  ├─────────────────┤  │  Total Orders: 1,234 │   │
│  │ 📊 Overview     │  │  Revenue: $45,678    │   │
│  │ 👥 Users        │  │  Active Users: 567   │   │
│  │ 📦 Orders       │  └──────────────────────┘   │
│  │ 📈 Analytics    │                              │
│  └─────────────────┘  Users Pending Approval     │
│                        ┌──────────────────────┐  │
│                        │ Name  | Role | Date  │  │
│                        │ John  | Vendor| 3/12│  │
│                        │ [Approve] [Suspend]  │  │
│                        └──────────────────────┘  │
└───────────────────────────────────────────────────┘
```

---

### Screen Decisions:

**Keep & Restyle:**

- All auth screens (add branding)
- Customer browse, product detail, cart, orders (full redesign)
- Vendor products screen (add metrics dashboard home)
- Admin dashboard (add side nav, metrics cards)

**Create From Scratch:**

- Customer home hero section (new welcoming entry point)
- Vendor dashboard home (currently jumps straight to products)
- Driver map-first interface (current is list-only)
- Checkout screen (currently just cart with "Place Order" button)

---

## PART 4: CONCRETE REFACTOR PLAN

### Wave 1: Foundation + Customer Core (This Week - 3-4 days)

#### Day 1-2: Theme + Shared Components

**Create:**

```
src/
├── theme/
│   ├── glamgoTheme.ts          [NEW] - Complete theme object
│   ├── ThemeProvider.tsx       [NEW] - Context provider
│   └── useTheme.ts             [NEW] - Hook for accessing theme
├── components/
│   ├── shared/
│   │   ├── GlamButton.tsx      [NEW] - Primary/secondary/tertiary button
│   │   ├── GlamCard.tsx        [NEW] - Product/elevated/flat card variants
│   │   ├── GlamInput.tsx       [NEW] - Default/floating label inputs
│   │   ├── GlamChip.tsx        [NEW] - Category/filter chips
│   │   ├── GlamPrice.tsx       [NEW] - Formatted price with gold accent
│   │   ├── GlamHeader.tsx      [NEW] - Screen headers with gradient
│   │   └── GlamTabs.tsx        [NEW] - Tab bar with brand colors
```

**Implementation Details:**

**1. Theme Setup:**

```typescript
// src/theme/ThemeProvider.tsx
import React, { createContext, useContext } from 'react';
import { glamgoTheme, GlamGoTheme } from './glamgoTheme';

const ThemeContext = createContext<GlamGoTheme>(glamgoTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={glamgoTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return theme;
}
```

```typescript
// app/_layout.tsx - Wrap entire app
import { ThemeProvider } from '@/theme/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppErrorBoundary>
        <Stack>
          {/* ...screens */}
        </Stack>
      </AppErrorBoundary>
    </ThemeProvider>
  );
}
```

**2. GlamButton Component:**

```typescript
// components/shared/GlamButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/useTheme';

interface GlamButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function GlamButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  style
}: GlamButtonProps) {
  const theme = useTheme();
  const buttonConfig = theme.components.button[variant];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.container, fullWidth && styles.fullWidth, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.colors.gradient.purple, theme.colors.gradient.gold]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            {
              borderRadius: buttonConfig.borderRadius,
              paddingVertical: buttonConfig.paddingVertical,
              paddingHorizontal: buttonConfig.paddingHorizontal,
            },
            disabled && styles.disabled
          ]}
        >
          <Text style={[
            styles.text,
            {
              color: buttonConfig.textColor,
              fontSize: buttonConfig.fontSize,
              fontWeight: buttonConfig.fontWeight,
              letterSpacing: buttonConfig.letterSpacing,
            }
          ]}>
            {title.toUpperCase()}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Secondary/tertiary variants (non-gradient)
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        {
          backgroundColor: buttonConfig.background,
          borderRadius: buttonConfig.borderRadius,
          paddingVertical: buttonConfig.paddingVertical,
          paddingHorizontal: buttonConfig.paddingHorizontal,
          ...(buttonConfig.border && { borderWidth: 1, borderColor: theme.colors.neutral.stone }),
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.text,
        {
          color: buttonConfig.textColor,
          fontSize: buttonConfig.fontSize,
          fontWeight: buttonConfig.fontWeight,
        }
      ]}>
        {variant === 'primary' ? title.toUpperCase() : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir Next',
  },
  disabled: {
    opacity: 0.5,
  },
});
```

**3. GlamCard Component:**

```typescript
// components/shared/GlamCard.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/useTheme';

interface GlamCardProps {
  children: React.ReactNode;
  variant?: 'product' | 'elevated' | 'flat';
  style?: ViewStyle;
}

export function GlamCard({ children, variant = 'product', style }: GlamCardProps) {
  const theme = useTheme();
  const cardConfig = theme.components.card[variant];

  return (
    <View style={[
      styles.card,
      {
        backgroundColor: cardConfig.background,
        borderRadius: cardConfig.borderRadius,
        padding: cardConfig.padding,
        ...cardConfig.shadow,
        ...(cardConfig.border && {
          borderWidth: 1,
          borderColor: cardConfig.border.split(' ')[2] // Extract color from '1px solid #...'
        }),
      },
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // Base styles
  },
});
```

**4. GlamPrice Component:**

```typescript
// components/shared/GlamPrice.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';

interface GlamPriceProps {
  amount: number;
  size?: 'small' | 'medium' | 'large';
  showCurrency?: boolean;
}

export function GlamPrice({ amount, size = 'medium', showCurrency = true }: GlamPriceProps) {
  const theme = useTheme();

  const fontSize = {
    small: 14,
    medium: theme.typography.sizes.price,
    large: 28,
  }[size];

  return (
    <Text style={[
      styles.price,
      {
        color: theme.colors.accent.gold,
        fontSize,
        fontWeight: theme.typography.weights.semibold,
      }
    ]}>
      {showCurrency && '$'}{amount.toFixed(2)}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: 'Avenir Next',
  },
});
```

**Install Required Packages:**

```bash
npm install expo-linear-gradient
npx expo install expo-font @expo-google-fonts/cormorant-garamond
```

---

#### Day 3-4: Auth & Customer Browse

**Update Files:**

```
app/
├── index.tsx                   [REDESIGN] - Welcome/login with hero
├── browse.tsx                  [REDESIGN] - Luxury browse with categories
└── product-detail.tsx          [REDESIGN] - Full-screen product experience
```

**Auth Screen Redesign:**

```typescript
// app/index.tsx - Luxury welcome screen
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/useTheme';
import { GlamButton } from '@/components/shared/GlamButton';
import { GlamInput } from '@/components/shared/GlamInput';

export default function WelcomeScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {/* Hero Background */}
      <LinearGradient
        colors={[theme.colors.primary.blush, theme.colors.neutral.cream]}
        style={styles.heroGradient}
      >
        {/* Logo */}
        <Text style={[styles.logo, {
          fontFamily: theme.typography.fonts.script,
          fontSize: theme.typography.sizes.hero,
          color: theme.colors.gradient.purple,
        }]}>
          GlamGo
        </Text>

        {/* Tagline */}
        <Text style={[styles.tagline, {
          fontFamily: theme.typography.fonts.body,
          fontSize: theme.typography.sizes.h5,
          color: theme.colors.text.secondary,
        }]}>
          Discover Your Glow
        </Text>
      </LinearGradient>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={[styles.formTitle, {
          fontFamily: theme.typography.fonts.heading,
          fontSize: theme.typography.sizes.h3,
          color: theme.colors.text.primary,
        }]}>
          Welcome Back
        </Text>

        <GlamInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          variant="floating"
        />

        <GlamInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          variant="floating"
          secureTextEntry
        />

        <GlamButton
          title="Sign In"
          onPress={handleLogin}
          variant="primary"
          fullWidth
          style={{ marginTop: 24 }}
        />

        <GlamButton
          title="Create Account"
          onPress={handleSignup}
          variant="secondary"
          fullWidth
          style={{ marginTop: 12 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroGradient: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 8,
  },
  tagline: {
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  formTitle: {
    marginBottom: 32,
    textAlign: 'center',
  },
});
```

**Browse Screen Redesign:**

```typescript
// app/browse.tsx - Luxury product grid
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import { GlamCard } from '@/components/shared/GlamCard';
import { GlamButton } from '@/components/shared/GlamButton';
import { GlamPrice } from '@/components/shared/GlamPrice';
import { GlamChip } from '@/components/shared/GlamChip';

export default function BrowseScreen() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Makeup', 'Skincare', 'Hair', 'Fragrance', 'Accessories'];

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.surface.app }}
      contentContainerStyle={styles.container}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={[styles.heroTitle, {
          fontFamily: theme.typography.fonts.heading,
          fontSize: theme.typography.sizes.h2,
          color: theme.colors.text.primary,
        }]}>
          Discover
        </Text>
        <Text style={[styles.heroSubtitle, {
          fontFamily: theme.typography.fonts.body,
          fontSize: theme.typography.sizes.body,
          color: theme.colors.text.secondary,
        }]}>
          Curated luxury beauty for you
        </Text>
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((cat) => (
          <GlamChip
            key={cat}
            label={cat}
            selected={selectedCategory === cat}
            onPress={() => setSelectedCategory(cat)}
          />
        ))}
      </ScrollView>

      {/* Product Grid */}
      <View style={styles.gridContainer}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <GlamCard variant="product" style={styles.productCard}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={[styles.productName, {
                fontFamily: theme.typography.fonts.heading,
                fontSize: theme.typography.sizes.h6,
                color: theme.colors.text.primary,
              }]} numberOfLines={2}>
                {item.name}
              </Text>
              <GlamPrice amount={item.price} size="small" />
              <GlamButton
                title="Add to Bag"
                onPress={() => handleAddToCart(item)}
                variant="secondary"
                style={{ marginTop: 8 }}
              />
            </GlamCard>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  hero: {
    marginBottom: 24,
  },
  heroTitle: {
    marginBottom: 4,
  },
  heroSubtitle: {
    // ...
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 4,
  },
  gridContainer: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  productName: {
    marginBottom: 8,
    height: 40, // Fixed height for consistency
  },
});
```

---

### Wave 2: Cart/Checkout + Vendor Dashboard (Next 1-2 Weeks)

**Update Files:**

```
app/(customer)/
├── cart.tsx                    [REDESIGN] - "Your Bag" luxury checkout
└── orders.tsx                  [REDESIGN] - "Your Beauty Journey" order tracking

app/(vendor)/
├── dashboard-home.tsx          [NEW] - Metrics dashboard entry
├── products.tsx                [REDESIGN] - Elegant product grid
└── orders.tsx                  [REDESIGN] - Clean order cards
```

**Tasks:**

1. Redesign cart with "Your Bag" hero, elegant item cards
2. Create checkout flow with trust badges and gradient CTA
3. Redesign order history with timeline view and status badges
4. Create vendor dashboard home with metrics cards
5. Restyle vendor product grid with hover states
6. Restyle vendor order cards with accept/decline gradient buttons

---

### Wave 3: Driver + Admin + Final Polish (Following 1-2 Weeks)

**Update Files:**

```
app/(driver)/
├── available.tsx               [REDESIGN] - Map-first with bottom sheet
├── active.tsx                  [REDESIGN] - Large map with delivery card
└── earnings.tsx                [REDESIGN] - "Your Success" hero with chart

app/(admin)/
├── dashboard.tsx               [REDESIGN] - Side nav + metrics cards
└── orders.tsx                  [NEW] - Admin order monitoring

components/
├── EmptyState.tsx              [NEW] - Elegant empty states with illustrations
├── Skeleton.tsx                [NEW] - Luxury loading skeletons
└── ErrorModal.tsx              [ENHANCE] - Match brand styling
```

**Tasks:**

1. Implement map-first driver interface with React Native Maps
2. Create admin side navigation with GlamGo logo
3. Add metrics cards to admin dashboard
4. Create empty state illustrations (shopping bag, orders, etc.)
5. Add skeleton loaders matching card styles
6. Polish all micro-interactions (button press states, transitions)

---

## PART 5: EXAMPLE REWRITES FOR KEY SCREENS

### Example 1: Product Detail Screen (Full Luxury Experience)

```typescript
// app/product-detail.tsx - Complete rewrite
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/theme/useTheme';
import { GlamButton } from '@/components/shared/GlamButton';
import { GlamPrice } from '@/components/shared/GlamPrice';
import { GlamCard } from '@/components/shared/GlamCard';
import { useCartStore } from '@/stores/cartStore';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const theme = useTheme();
  const params = useLocalSearchParams();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState(null); // Fetch from backend

  const handleAddToBag = () => {
    addItem(product);
    // Show success toast
  };

  if (!product) return null; // Loading skeleton

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.surface.app }}
      contentContainerStyle={styles.container}
    >
      {/* Hero Image with Gradient Overlay */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', theme.colors.surface.app]}
          style={styles.imageGradient}
        />
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Product Name */}
        <Text style={[styles.productName, {
          fontFamily: theme.typography.fonts.heading,
          fontSize: theme.typography.sizes.h2,
          color: theme.colors.text.primary,
          lineHeight: theme.typography.sizes.h2 * theme.typography.lineHeights.tight,
        }]}>
          {product.name}
        </Text>

        {/* Price with Investment Language */}
        <View style={styles.priceContainer}>
          <GlamPrice amount={product.price} size="large" />
          <Text style={[styles.priceLabel, {
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.caption,
            color: theme.colors.text.tertiary,
          }]}>
            Invest in your beauty
          </Text>
        </View>

        {/* Description */}
        <Text style={[styles.description, {
          fontFamily: theme.typography.fonts.body,
          fontSize: theme.typography.sizes.body,
          color: theme.colors.text.secondary,
          lineHeight: theme.typography.sizes.body * theme.typography.lineHeights.relaxed,
        }]}>
          {product.description}
        </Text>

        {/* Benefits Section */}
        <GlamCard variant="elevated" style={styles.benefitsCard}>
          <Text style={[styles.sectionTitle, {
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes.h5,
            color: theme.colors.text.primary,
          }]}>
            What Makes It Special
          </Text>

          {product.benefits?.map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <Text style={styles.benefitIcon}>✨</Text>
              <Text style={[styles.benefitText, {
                fontFamily: theme.typography.fonts.body,
                fontSize: theme.typography.sizes.bodySmall,
                color: theme.colors.text.secondary,
              }]}>
                {benefit}
              </Text>
            </View>
          ))}
        </GlamCard>

        {/* Ingredient Highlights */}
        <View style={styles.ingredientsContainer}>
          <Text style={[styles.sectionTitle, {
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes.h5,
            color: theme.colors.text.primary,
          }]}>
            Key Ingredients
          </Text>

          <View style={styles.ingredientChips}>
            {product.ingredients?.slice(0, 5).map((ingredient, index) => (
              <View key={index} style={[styles.ingredientChip, {
                backgroundColor: theme.colors.neutral.linen,
                borderRadius: theme.radii.round,
              }]}>
                <Text style={[styles.ingredientText, {
                  fontFamily: theme.typography.fonts.body,
                  fontSize: theme.typography.sizes.caption,
                  color: theme.colors.text.secondary,
                }]}>
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Trust Badges */}
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🌱</Text>
            <Text style={[styles.badgeText, {
              fontFamily: theme.typography.fonts.body,
              fontSize: theme.typography.sizes.caption,
              color: theme.colors.text.tertiary,
            }]}>
              Vegan
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🐰</Text>
            <Text style={[styles.badgeText, {
              fontFamily: theme.typography.fonts.body,
              fontSize: theme.typography.sizes.caption,
              color: theme.colors.text.tertiary,
            }]}>
              Cruelty-Free
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>♻️</Text>
            <Text style={[styles.badgeText, {
              fontFamily: theme.typography.fonts.body,
              fontSize: theme.typography.sizes.caption,
              color: theme.colors.text.tertiary,
            }]}>
              Sustainable
            </Text>
          </View>
        </View>
      </View>

      {/* Fixed Bottom CTA */}
      <View style={[styles.bottomCTA, {
        backgroundColor: theme.colors.surface.card,
        borderTopColor: theme.colors.neutral.stone,
      }]}>
        <GlamButton
          title="Add to Bag"
          onPress={handleAddToBag}
          variant="primary"
          fullWidth
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100, // Space for fixed CTA
  },
  imageContainer: {
    width: width,
    height: width * 1.2,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  infoContainer: {
    padding: 24,
  },
  productName: {
    marginBottom: 16,
  },
  priceContainer: {
    marginBottom: 24,
  },
  priceLabel: {
    marginTop: 4,
  },
  description: {
    marginBottom: 24,
  },
  benefitsCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  benefitText: {
    flex: 1,
  },
  ingredientsContainer: {
    marginBottom: 24,
  },
  ingredientChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ingredientText: {
    // ...
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  badge: {
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  badgeText: {
    // ...
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
});
```

---

### Example 2: Vendor Dashboard Home (New Metrics Entry)

```typescript
// app/(vendor)/dashboard-home.tsx - NEW FILE
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/theme/useTheme';
import { GlamCard } from '@/components/shared/GlamCard';
import { getVendorMetrics } from '@/services/vendorService';

export default function VendorDashboardHome() {
  const theme = useTheme();
  const [metrics, setMetrics] = useState({
    ordersToday: 0,
    revenueToday: 0,
    activeOrders: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    const data = await getVendorMetrics();
    setMetrics(data);
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.surface.app }}
      contentContainerStyle={styles.container}
    >
      {/* Welcome Hero */}
      <View style={styles.hero}>
        <Text style={[styles.heroTitle, {
          fontFamily: theme.typography.fonts.heading,
          fontSize: theme.typography.sizes.h2,
          color: theme.colors.text.primary,
        }]}>
          Your Store
        </Text>
        <Text style={[styles.heroSubtitle, {
          fontFamily: theme.typography.fonts.body,
          fontSize: theme.typography.sizes.body,
          color: theme.colors.text.secondary,
        }]}>
          Today's snapshot
        </Text>
      </View>

      {/* Metrics Cards */}
      <View style={styles.metricsGrid}>
        {/* Orders Today */}
        <TouchableOpacity
          style={styles.metricCard}
          onPress={() => router.push('/vendor/orders')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[theme.colors.gradient.purple, theme.colors.gradient.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.metricGradient}
          >
            <Text style={[styles.metricValue, {
              fontFamily: theme.typography.fonts.heading,
              fontSize: theme.typography.sizes.hero,
              color: theme.colors.text.inverse,
            }]}>
              {metrics.ordersToday}
            </Text>
            <Text style={[styles.metricLabel, {
              fontFamily: theme.typography.fonts.body,
              fontSize: theme.typography.sizes.bodySmall,
              color: theme.colors.text.inverse,
            }]}>
              Orders Today
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Revenue Today */}
        <GlamCard variant="elevated" style={styles.metricCard}>
          <Text style={[styles.metricValue, {
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes.hero,
            color: theme.colors.accent.gold,
          }]}>
            ${metrics.revenueToday.toLocaleString()}
          </Text>
          <Text style={[styles.metricLabel, {
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.bodySmall,
            color: theme.colors.text.secondary,
          }]}>
            Revenue Today
          </Text>
        </GlamCard>

        {/* Active Orders */}
        <GlamCard variant="flat" style={styles.metricCard}>
          <Text style={[styles.metricValue, {
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes.hero,
            color: theme.colors.text.primary,
          }]}>
            {metrics.activeOrders}
          </Text>
          <Text style={[styles.metricLabel, {
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.bodySmall,
            color: theme.colors.text.secondary,
          }]}>
            Active Orders
          </Text>
        </GlamCard>

        {/* Total Products */}
        <GlamCard variant="flat" style={styles.metricCard}>
          <Text style={[styles.metricValue, {
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes.hero,
            color: theme.colors.text.primary,
          }]}>
            {metrics.totalProducts}
          </Text>
          <Text style={[styles.metricLabel, {
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.bodySmall,
            color: theme.colors.text.secondary,
          }]}>
            Total Products
          </Text>
        </GlamCard>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={[styles.sectionTitle, {
          fontFamily: theme.typography.fonts.heading,
          fontSize: theme.typography.sizes.h4,
          color: theme.colors.text.primary,
        }]}>
          Quick Actions
        </Text>

        <TouchableOpacity
          style={[styles.actionCard, {
            backgroundColor: theme.colors.surface.card,
            borderColor: theme.colors.neutral.stone,
          }]}
          onPress={() => router.push('/add-product')}
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={[styles.actionLabel, {
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.body,
            color: theme.colors.text.primary,
          }]}>
            Add New Product
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, {
            backgroundColor: theme.colors.surface.card,
            borderColor: theme.colors.neutral.stone,
          }]}
          onPress={() => router.push('/vendor/orders')}
        >
          <Text style={styles.actionIcon}>📦</Text>
          <Text style={[styles.actionLabel, {
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.body,
            color: theme.colors.text.primary,
          }]}>
            Manage Orders
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  hero: {
    marginBottom: 32,
  },
  heroTitle: {
    marginBottom: 4,
  },
  heroSubtitle: {
    // ...
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  metricCard: {
    width: '47%',
    minHeight: 120,
    justifyContent: 'center',
  },
  metricGradient: {
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  metricValue: {
    marginBottom: 8,
  },
  metricLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickActions: {
    // ...
  },
  sectionTitle: {
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  actionLabel: {
    // ...
  },
});
```

---

### Example 3: Customer Order History ("Your Beauty Journey")

```typescript
// app/(customer)/orders.tsx - Redesigned with timeline
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import { GlamCard } from '@/components/shared/GlamCard';
import { getMyOrders } from '@/services/orderService';

export default function OrdersScreen() {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await getMyOrders();
    setOrders(data);
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      PENDING: theme.colors.semantic.warning,
      ACCEPTED: theme.colors.gradient.purple,
      DRIVER_ASSIGNED: theme.colors.accent.gold,
      PICKED_UP: theme.colors.gradient.gold,
      DELIVERED: theme.colors.semantic.success,
    };
    return statusColors[status] || theme.colors.text.tertiary;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface.app }]}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={[styles.heroTitle, {
          fontFamily: theme.typography.fonts.heading,
          fontSize: theme.typography.sizes.h2,
          color: theme.colors.text.primary,
        }]}>
          Your Beauty Journey
        </Text>
        <Text style={[styles.heroSubtitle, {
          fontFamily: theme.typography.fonts.body,
          fontSize: theme.typography.sizes.body,
          color: theme.colors.text.secondary,
        }]}>
          Track your orders
        </Text>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <GlamCard variant="flat" style={styles.orderCard}>
            {/* Order Header */}
            <View style={styles.orderHeader}>
              <View>
                <Text style={[styles.orderNumber, {
                  fontFamily: theme.typography.fonts.mono,
                  fontSize: theme.typography.sizes.caption,
                  color: theme.colors.text.tertiary,
                }]}>
                  Order #{item.id.slice(-8)}
                </Text>
                <Text style={[styles.orderDate, {
                  fontFamily: theme.typography.fonts.body,
                  fontSize: theme.typography.sizes.bodySmall,
                  color: theme.colors.text.secondary,
                }]}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <View style={[styles.statusBadge, {
                backgroundColor: getStatusColor(item.status) + '20',
                borderRadius: theme.radii.round,
              }]}>
                <Text style={[styles.statusText, {
                  fontFamily: theme.typography.fonts.body,
                  fontSize: theme.typography.sizes.caption,
                  color: getStatusColor(item.status),
                  fontWeight: theme.typography.weights.semibold,
                }]}>
                  {item.status.replace('_', ' ')}
                </Text>
              </View>
            </View>

            {/* Product Thumbnails */}
            <View style={styles.productThumbnails}>
              {item.products?.slice(0, 3).map((product, index) => (
                <Image
                  key={index}
                  source={{ uri: product.imageUrl }}
                  style={styles.thumbnail}
                />
              ))}
              {item.products?.length > 3 && (
                <View style={[styles.moreBadge, {
                  backgroundColor: theme.colors.neutral.linen,
                }]}>
                  <Text style={[styles.moreText, {
                    fontFamily: theme.typography.fonts.body,
                    fontSize: theme.typography.sizes.caption,
                    color: theme.colors.text.secondary,
                  }]}>
                    +{item.products.length - 3}
                  </Text>
                </View>
              )}
            </View>

            {/* Timeline (if status > PENDING) */}
            {item.status !== 'PENDING' && (
              <View style={styles.timeline}>
                <View style={styles.timelineItem}>
                  <View style={[styles.timelineDot, {
                    backgroundColor: theme.colors.semantic.success
                  }]} />
                  <Text style={[styles.timelineText, {
                    fontFamily: theme.typography.fonts.body,
                    fontSize: theme.typography.sizes.caption,
                    color: theme.colors.text.secondary,
                  }]}>
                    Order Placed
                  </Text>
                </View>

                {item.status !== 'PENDING' && (
                  <View style={styles.timelineItem}>
                    <View style={[styles.timelineDot, {
                      backgroundColor: theme.colors.gradient.purple
                    }]} />
                    <Text style={[styles.timelineText, {
                      fontFamily: theme.typography.fonts.body,
                      fontSize: theme.typography.sizes.caption,
                      color: theme.colors.text.secondary,
                    }]}>
                      Vendor Accepted
                    </Text>
                  </View>
                )}

                {['DRIVER_ASSIGNED', 'PICKED_UP', 'DELIVERED'].includes(item.status) && (
                  <View style={styles.timelineItem}>
                    <View style={[styles.timelineDot, {
                      backgroundColor: theme.colors.accent.gold
                    }]} />
                    <Text style={[styles.timelineText, {
                      fontFamily: theme.typography.fonts.body,
                      fontSize: theme.typography.sizes.caption,
                      color: theme.colors.text.secondary,
                    }]}>
                      Driver Assigned
                    </Text>
                  </View>
                )}

                {item.status === 'DELIVERED' && (
                  <View style={styles.timelineItem}>
                    <View style={[styles.timelineDot, {
                      backgroundColor: theme.colors.semantic.success
                    }]} />
                    <Text style={[styles.timelineText, {
                      fontFamily: theme.typography.fonts.body,
                      fontSize: theme.typography.sizes.caption,
                      color: theme.colors.text.secondary,
                    }]}>
                      Delivered
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Order Total */}
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, {
                fontFamily: theme.typography.fonts.body,
                fontSize: theme.typography.sizes.bodySmall,
                color: theme.colors.text.secondary,
              }]}>
                Total:
              </Text>
              <Text style={[styles.totalAmount, {
                fontFamily: theme.typography.fonts.body,
                fontSize: theme.typography.sizes.h6,
                fontWeight: theme.typography.weights.semibold,
                color: theme.colors.accent.gold,
              }]}>
                ${item.totalAmount.toFixed(2)}
              </Text>
            </View>
          </GlamCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 20,
    paddingTop: 32,
  },
  heroTitle: {
    marginBottom: 4,
  },
  heroSubtitle: {
    // ...
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  orderCard: {
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderNumber: {
    marginBottom: 4,
  },
  orderDate: {
    // ...
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productThumbnails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
  moreBadge: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    fontWeight: '600',
  },
  timeline: {
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  timelineText: {
    // ...
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    // ...
  },
  totalAmount: {
    // ...
  },
});
```

---

## PART 6: TODAY VS LATER (PRIORITY BOARD)

### ✅ MUST-DO BEFORE NEXT DEMO (This Week - 3-4 Days)

#### Day 1: Theme Foundation (4-5 hours)

1. **Create `src/theme/glamgoTheme.ts`** (2 hours)
   - Define color palette, typography, components, spacing, radii
   - Export complete theme object

2. **Create `ThemeProvider` and `useTheme` hook** (30 min)
   - Context provider wrapping entire app
   - Hook for accessing theme in components

3. **Install fonts and gradient package** (30 min)

   ```bash
   npm install expo-linear-gradient
   npx expo install expo-font @expo-google-fonts/cormorant-garamond
   ```

4. **Create core shared components** (1-2 hours)
   - `GlamButton` (primary/secondary/tertiary variants)
   - `GlamCard` (product/elevated/flat variants)
   - `GlamPrice` (formatted with gold accent)

#### Day 2: Auth + Welcome Screen (3-4 hours)

1. **Redesign `app/index.tsx`** (2-3 hours)
   - Hero gradient background with logo
   - "Discover Your Glow" tagline
   - Elegant floating-label inputs
   - Gradient "Sign In" button

2. **Update `app/pending-approval.tsx`** (1 hour)
   - Match new brand styling
   - Add encouraging messaging ("We're reviewing your application")

#### Day 3: Customer Browse + Product Detail (4-5 hours)

1. **Redesign `app/browse.tsx`** (2-3 hours)
   - Hero section with "Discover" heading
   - Category chips with gradient selected state
   - Product grid with soft shadows
   - "Add to Bag" buttons on cards

2. **Redesign `app/product-detail.tsx`** (2 hours)
   - Full-screen hero image
   - Product name in elegant serif
   - Gold price with "Invest in your beauty" label
   - "Add to Bag" gradient button

#### Day 4: Vendor Dashboard Entry (2-3 hours)

1. **Create `app/(vendor)/dashboard-home.tsx`** (NEW FILE) (2-3 hours)
   - "Your Store" hero
   - 4 metrics cards (orders today, revenue, active orders, products)
   - Gradient card for orders today
   - Quick action buttons

**Total: 13-17 hours (3-4 days with other tasks)**

---

### 🟡 SAFE FOR FOLLOWING 1-2 WEEKS (Nice to Have)

#### Week 2: Cart/Checkout + Orders

1. **Redesign `app/(customer)/cart.tsx`** (3 hours)
   - "Your Bag" hero
   - Elegant item cards with product images
   - "Complete Your Purchase" gradient button

2. **Redesign `app/(customer)/orders.tsx`** (3 hours)
   - "Your Beauty Journey" hero
   - Timeline view for order progression
   - Status badges with color coding
   - Product thumbnail carousel

3. **Create checkout screen** (if needed) (2 hours)
   - Trust badges (secure payment, fast shipping)
   - Gradient submit button

#### Week 3: Vendor Products + Driver Polish

1. **Redesign `app/(vendor)/products.tsx`** (2 hours)
   - Product grid with hover states
   - Elegant empty state ("Add your first product")

2. **Redesign `app/(driver)/available.tsx`** (3 hours)
   - Map-first interface (top 60%)
   - Available orders bottom sheet
   - Accept button with gradient

3. **Create `app/(driver)/earnings.tsx` enhancement** (2 hours)
   - "Your Success This Week" hero
   - Week total in large gold text
   - Simple bar chart

#### Week 4: Admin Dashboard + Final Polish

1. **Redesign `app/(admin)/dashboard.tsx`** (3 hours)
   - Side navigation with GlamGo logo
   - Metrics cards at top
   - Clean approval table

2. **Create empty states** (2 hours)
   - `components/EmptyState.tsx`
   - Elegant illustrations for empty cart, orders, products

3. **Add skeleton loaders** (2 hours)
   - `components/Skeleton.tsx`
   - Match card styling (soft shadows, rounded corners)

4. **Polish micro-interactions** (2 hours)
   - Button press states
   - Card hover effects (web)
   - Smooth transitions

---

### 🔴 NOT BEFORE DEMO (4-6 Weeks Out)

- Custom app icon and splash screen (Week 4)
- Map integration for driver app (Week 3)
- Charts for analytics (Week 3)
- Advanced animations (Week 4+)
- Web admin responsive design (Week 4)

---

## IMPLEMENTATION SEQUENCE

**TODAY (March 12):** Backend fixes (error boundary, vendor wiring, driver assignment) - **5-6 hours**

**TOMORROW (March 13):** Demo with functional backend but old UI - **PAYMENT MILESTONE**

**NEXT WEEK (March 14-18):** UI redesign Wave 1 (theme + auth + browse) - **3-4 days**

**WEEK OF March 21:** UI redesign Wave 2 (cart/orders + vendor dashboard) - **1-2 weeks**

**WEEK OF April 4:** UI redesign Wave 3 (driver + admin + polish) - **1-2 weeks**

**LATE APRIL:** Store submission prep (assets, testing, legal) - **1-2 weeks**

---

## SUCCESS METRICS

**After Wave 1 (Next Week):**

- [ ] App opens to beautiful gradient hero, not plain login
- [ ] Browse feels like boutique, not warehouse
- [ ] Product detail creates desire, not just information
- [ ] Typography is elegant and readable

**After Wave 2 (2-3 Weeks):**

- [ ] Cart/checkout feels celebratory, not transactional
- [ ] Order history tells story, not just data
- [ ] Vendor dashboard motivates, not just informs

**After Wave 3 (3-4 Weeks):**

- [ ] All screens match luxury beauty brand
- [ ] No sharp corners or basic shadows anywhere
- [ ] Consistent spacing and elevation throughout
- [ ] Professional empty/loading states

**Store Submission:**

- [ ] App looks like Sephora/Ulta quality
- [ ] Brand is cohesive from login to checkout
- [ ] Screenshots look premium in App Store listing

---

**END OF LUXURY UI/UX REDESIGN PLAN**
