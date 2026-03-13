# 🎨 GlamGo Landing Page - Design System

## **Color Palette** (From Logo)

```
LOGO COLORS APPLIED:
┌─────────────────────────────────────┐
│ Purple: #6B4C8A (Logo text color)   │
│ Gold:   #C8A870 (Logo flourishes)   │
│ Accent: #B8985A (Darker gold)       │
└─────────────────────────────────────┘

BACKGROUND GRADIENT:
┌─────────────────────────────────────┐
│ Top:    #E8D5E8 (Soft purple)       │
│ Middle: #F5E6F5 (Lighter purple)    │
│ Bottom: #FFFFFF (Pure white)        │
└─────────────────────────────────────┘

TEXT COLORS:
┌─────────────────────────────────────┐
│ Headline:     #6B4C8A (Purple)      │
│ Body:         #5A5A5A (Gray)        │
│ Description:  #6A6A6A (Medium gray) │
│ Dark:         #2D2D2D (Near black)  │
└─────────────────────────────────────┘
```

---

## **Layout Structure**

```
┌───────────────────────────────────────┐
│         [Soft Purple Gradient]         │
│                                       │
│            ┌─────────────┐            │
│            │  GlamGo Logo │            │
│            │   160px      │            │
│            └─────────────┘            │
│                                       │
│        "Beauty Delivered"             │
│         (42px, Bold, Purple)          │
│                                       │
│    Premium beauty products and...     │
│      (18px, Gray, Line height 1.6)    │
│                                       │
├───────────────────────────────────────┤
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ 💎  Curated Selection           │  │
│  │     Premium beauty products...  │  │
│  └─────────────────────────────────┘  │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ ⚡  Fast Delivery               │  │
│  │     Get your beauty essentials..│  │
│  └─────────────────────────────────┘  │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ 🛡️  Quality Guaranteed          │  │
│  │     Every vendor is verified... │  │
│  └─────────────────────────────────┘  │
│                                       │
├───────────────────────────────────────┤
│                                       │
│  ┌─────────────────────────────────┐  │
│  │   Explore Products  →           │  │
│  │   [Gold Gradient Button]        │  │
│  └─────────────────────────────────┘  │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │   Create Account  👤            │  │
│  │   [Purple Outlined Button]      │  │
│  └─────────────────────────────────┘  │
│                                       │
│  Already have an account? Sign In →   │
│        (Purple link text)             │
│                                       │
└───────────────────────────────────────┘
```

---

## **Component Specifications**

### **Hero Section:**

```typescript
{
  paddingHorizontal: 32px,
  paddingTop: 48px,
  paddingBottom: 32px,
  alignItems: "center"
}
```

### **Main Tagline:**

```typescript
{
  fontSize: 42px,
  fontWeight: "bold",
  color: "#6B4C8A",
  letterSpacing: -0.5,
  textAlign: "center"
}
```

### **Feature Cards:**

```typescript
{
  backgroundColor: "#FFFFFF",
  borderRadius: 12px,
  padding: 24px,
  borderWidth: 1,
  borderColor: "#F0E6F5",
  shadow: "light",
  gap: 24px (between cards)
}
```

### **Feature Icons:**

```typescript
{
  width: 64px,
  height: 64px,
  borderRadius: 12px,
  backgroundColor: "#F5E6F5",
  iconSize: 32px,
  iconColor: "#6B4C8A"
}
```

### **Primary Button (Gold):**

```typescript
{
  gradient: ["#C8A870", "#B8985A"],
  borderRadius: 12px,
  paddingVertical: 18px,
  paddingHorizontal: 24px,
  fontSize: 20px,
  color: "#FFFFFF",
  shadow: "medium"
}
```

### **Secondary Button (Purple Outline):**

```typescript
{
  backgroundColor: "#FFFFFF",
  borderWidth: 2,
  borderColor: "#6B4C8A",
  borderRadius: 12px,
  paddingVertical: 18px,
  paddingHorizontal: 24px,
  fontSize: 20px,
  color: "#6B4C8A",
  shadow: "subtle"
}
```

---

## **Spacing Scale**

```
Extra Small: 4px
Small:       8px
Medium:      12px
Base:        16px
Large:       20px
XL:          24px
2XL:         32px
3XL:         48px
4XL:         64px
```

---

## **Typography Scale**

```
┌──────────────┬─────────┬──────────┐
│ Element      │ Size    │ Weight   │
├──────────────┼─────────┼──────────┤
│ Headline     │ 42px    │ Bold     │
│ Subtitle     │ 18px    │ Regular  │
│ Feature      │ 20px    │ Semibold │
│ Description  │ 16px    │ Regular  │
│ Button       │ 20px    │ Semibold │
│ Link         │ 18px    │ Regular  │
└──────────────┴─────────┴──────────┘
```

---

## **Animation Timing**

```typescript
{
  fadeIn: 1000ms,
  slideUp: {
    tension: 20,
    friction: 7
  },
  scale: {
    tension: 20,
    friction: 7
  }
}
```

---

## **Responsive Behavior**

### **Small Screens (< 375px):**

- Reduce padding to 24px
- Logo size: "medium" (120px)
- Headline: 36px

### **Medium Screens (375px - 414px):**

- Standard padding: 32px
- Logo size: "large" (160px)
- Headline: 42px

### **Large Screens (> 414px):**

- Increased padding: 40px
- Logo size: "large" (160px)
- Headline: 48px

---

## **Accessibility**

✅ **High Contrast:** Dark text on light backgrounds
✅ **Large Touch Targets:** Buttons are 56px+ tall
✅ **Clear Hierarchy:** Proper heading structure
✅ **Readable Fonts:** 16px minimum for body text
✅ **Focus States:** Clear button press feedback

---

## **Design Inspiration**

This design draws from:

- 💅 **Sephora**: Clean, luxury aesthetic
- 💎 **Ulta Beauty**: Accessible yet premium
- 🏨 **Luxury Spas**: Soft colors, spacious layout
- 📱 **Modern Apps**: Card-based UI, clear CTAs

---

**Key Principle:** The landing page should feel like stepping into a high-end beauty boutique - elegant, inviting, and effortless to navigate.
