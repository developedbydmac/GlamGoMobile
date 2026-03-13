# 🎨 GlamGo Luxury Color Palette & Quick Reference

## Color Swatches

### Primary - Deep Plum Spectrum

```
████ #4A1C6B  deepPlum       - Main brand color (buttons, headings)
████ #5C2D7F  royalPurple    - Gradient middle
████ #7B4C9E  lightPlum      - Hover states
████ #9366BD  violet         - Lightest backgrounds
```

### Secondary - Metallic Gold Spectrum

```
████ #A58943  darkGold       - Rich contrast
████ #C9A961  metallicGold   - Primary gold (logo match)
████ #D4AF37  champagneGold  - Warm variant
████ #E8D4A0  lightGold      - Subtle backgrounds
```

### Neutral - Blush & Warm Greys

```
████ #FFFFFF  white          - Input backgrounds
████ #FAF7F5  blushCream     - Main screen background
████ #F5EDE8  softBlush      - Card backgrounds
████ #E8E0DB  lightGrey      - Borders
████ #9A8F88  mediumGrey     - Secondary text
████ #4A3F3A  warmGrey       - Primary text
```

---

## Quick Copy-Paste Snippets

### Screen Background

```typescript
backgroundColor: Colors.neutral.blushCream; // #FAF7F5
```

### Card/Modal Background

```typescript
backgroundColor: Colors.neutral.softBlush; // #F5EDE8
```

### Primary Button

```typescript
// Gradient from deep plum to light plum
colors={[Colors.primary.deepPlum, Colors.primary.lightPlum]}
borderRadius: BorderRadius.pill  // Full rounded
```

### Input Field (Normal)

```typescript
backgroundColor: Colors.neutral.white;
borderColor: Colors.neutral.lightGrey;
borderWidth: 1.5;
borderRadius: BorderRadius.md; // 14px
```

### Input Field (Focused)

```typescript
borderColor: Colors.primary.deepPlum
borderWidth: 2
...Shadows.light  // Lift on focus
```

### Heading Text

```typescript
fontSize: Typography.fontSize["4xl"]; // 42px
fontWeight: Typography.fontWeight.light; // '300'
fontFamily: Typography.fontFamily.heading; // Georgia/serif
color: Colors.primary.deepPlum;
letterSpacing: Typography.letterSpacing.normal;
```

### Body Text

```typescript
fontSize: Typography.fontSize.md; // 17px
fontWeight: Typography.fontWeight.normal; // '400'
fontFamily: Typography.fontFamily.body; // System/Roboto
color: Colors.neutral.warmGrey;
```

### Label Text (Small Caps Style)

```typescript
fontSize: Typography.fontSize.xs; // 12px
fontWeight: Typography.fontWeight.semibold; // '600'
color: Colors.neutral.mediumGrey;
letterSpacing: Typography.letterSpacing.wider; // 1.5
textTransform: "uppercase";
```

### Gold Accent Links

```typescript
color: Colors.secondary.metallicGold;
fontWeight: Typography.fontWeight.bold;
// No underline for cleaner look
```

### Subtle Shadow (Cards, Inputs)

```typescript
...Shadows.subtle
// shadowColor: Colors.primary.deepPlum
// shadowOffset: { width: 0, height: 2 }
// shadowOpacity: 0.06
// shadowRadius: 6
// elevation: 2
```

### Light Shadow (Buttons, Focus)

```typescript
...Shadows.light
// shadowColor: Colors.primary.deepPlum
// shadowOffset: { width: 0, height: 4 }
// shadowOpacity: 0.1
// shadowRadius: 12
// elevation: 4
```

---

## Typography Scale

### Font Sizes

```typescript
xs:   12px  // Labels, hints
sm:   13px  // Small text
base: 16px  // Body text, input text
md:   17px  // Subtitles
lg:   19px  // Section headers
xl:   22px  // Card titles
2xl:  28px  // Screen titles
3xl:  34px  // Hero titles
4xl:  42px  // Main auth headings
5xl:  52px  // Landing page hero
```

### Letter Spacing

```typescript
tight: -0.5; // Rarely used
normal: 0; // Default
relaxed: 0.5; // Body text
wide: 1; // Buttons
wider: 1.5; // Labels (small caps)
widest: 2; // Display headers
```

### Line Heights

```typescript
tight: 1.2; // Headings
snug: 1.375; // Tight paragraphs
normal: 1.5; // Body text
relaxed: 1.75; // Comfortable reading
loose: 2; // Spacious sections
```

---

## Border Radius Scale

```typescript
none:  0      // Sharp corners
sm:    6px    // Subtle rounding
base:  10px   // Standard
md:    14px   // Inputs, cards
lg:    18px   // Large cards
xl:    24px   // Hero sections
pill:  9999px // Full rounded (buttons)
```

---

## Spacing Scale

```typescript
xs:   6px   // Minimal gap
sm:   10px  // Tight spacing
md:   14px  // Component spacing
base: 18px  // Standard gap
lg:   24px  // Section padding
xl:   32px  // Screen padding
2xl:  40px  // Between sections
3xl:  48px  // Major sections
4xl:  64px  // Hero spacing
5xl:  80px  // Landing page sections
```

---

## Common Patterns

### Auth Screen Container

```typescript
<SafeAreaView style={{
  flex: 1,
  backgroundColor: Colors.neutral.blushCream,
}}>
  <KeyboardAvoidingView behavior="padding">
    <ScrollView contentContainerStyle={{
      paddingHorizontal: Spacing.xl,      // 32px
      paddingTop: Spacing['2xl'],         // 40px
    }}>
      {/* Content */}
    </ScrollView>
  </KeyboardAvoidingView>
</SafeAreaView>
```

### Section Header

```typescript
<View style={{ marginBottom: Spacing['3xl'] }}>  {/* 48px */}
  <Text style={{
    fontSize: Typography.fontSize['4xl'],           // 42px
    fontWeight: Typography.fontWeight.light,        // '300'
    fontFamily: Typography.fontFamily.heading,      // Georgia
    color: Colors.primary.deepPlum,
    marginBottom: Spacing.md,                       // 14px
  }}>
    Welcome Back
  </Text>
  <Text style={{
    fontSize: Typography.fontSize.md,               // 17px
    color: Colors.neutral.mediumGrey,
    lineHeight: Typography.lineHeight.relaxed,      // 1.75
  }}>
    Good to see you again
  </Text>
</View>
```

### Input Field with Label

```typescript
<View style={{ marginBottom: Spacing.lg }}>  {/* 24px */}
  <Text style={{
    fontSize: Typography.fontSize.xs,              // 12px
    fontWeight: Typography.fontWeight.semibold,    // '600'
    color: Colors.neutral.mediumGrey,
    marginBottom: Spacing.sm,                      // 10px
    letterSpacing: Typography.letterSpacing.wider, // 1.5
    textTransform: 'uppercase',
  }}>
    EMAIL
  </Text>
  <TextInput
    style={{
      backgroundColor: Colors.neutral.white,
      borderRadius: BorderRadius.md,               // 14px
      paddingHorizontal: Spacing.base,             // 18px
      paddingVertical: Spacing.base,               // 18px
      fontSize: Typography.fontSize.base,          // 16px
      borderWidth: 1.5,
      borderColor: Colors.neutral.lightGrey,
      ...Shadows.subtle,
    }}
    placeholder="your@email.com"
    placeholderTextColor={Colors.neutral.mediumGrey}
  />
</View>
```

### Pill Button

```typescript
<TouchableOpacity
  style={{
    height: 56,
    borderRadius: BorderRadius.pill,               // 9999px
    ...Shadows.light,
  }}
>
  <LinearGradient
    colors={[Colors.primary.deepPlum, Colors.primary.lightPlum]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: BorderRadius.pill,
      paddingHorizontal: Spacing.xl,               // 32px
    }}
  >
    <Text style={{
      color: Colors.neutral.white,
      fontSize: Typography.fontSize.md,            // 17px
      fontWeight: Typography.fontWeight.bold,      // '700'
      letterSpacing: Typography.letterSpacing.wide, // 1
    }}>
      SIGN IN
    </Text>
  </LinearGradient>
</TouchableOpacity>
```

### Gold Link

```typescript
<TouchableOpacity onPress={handlePress}>
  <Text style={{
    fontSize: Typography.fontSize.sm,              // 13px
    color: Colors.secondary.metallicGold,
    fontWeight: Typography.fontWeight.bold,        // '700'
    letterSpacing: Typography.letterSpacing.relaxed, // 0.5
  }}>
    Forgot Password?
  </Text>
</TouchableOpacity>
```

### Elevated Card

```typescript
<View style={{
  backgroundColor: Colors.neutral.softBlush,
  borderRadius: BorderRadius.lg,                   // 18px
  padding: Spacing.lg,                             // 24px
  marginVertical: Spacing.xl,                      // 32px
  ...Shadows.subtle,
}}>
  {/* Card content */}
</View>
```

---

## Gradient Combinations

### Primary Button Gradient

```typescript
colors={[Colors.primary.deepPlum, Colors.primary.lightPlum]}
// #4A1C6B → #7B4C9E
```

### Gold Accent Gradient

```typescript
colors={[Colors.secondary.darkGold, Colors.secondary.metallicGold]}
// #A58943 → #C9A961
```

### Subtle Background Gradient

```typescript
colors={[Colors.neutral.blushCream, Colors.neutral.softBlush]}
// #FAF7F5 → #F5EDE8
```

---

## Icon Colors

### Default State

```typescript
color={Colors.neutral.mediumGrey}  // #9A8F88
```

### Active/Selected State

```typescript
color={Colors.primary.deepPlum}    // #4A1C6B
```

### Gold Accent Icons

```typescript
color={Colors.secondary.metallicGold}  // #C9A961
```

### Error State

```typescript
color={Colors.semantic.error}      // #D84339
```

### Success State

```typescript
color={Colors.semantic.success}    // #4CAF50
```

---

## Accessibility Notes

### Contrast Ratios

- **Deep Plum on Blush Cream:** 8.2:1 ✅ (AAA)
- **Warm Grey on Blush Cream:** 7.5:1 ✅ (AAA)
- **Metallic Gold on Deep Plum:** 4.8:1 ✅ (AA)
- **White on Deep Plum:** 12.1:1 ✅ (AAA)

### Touch Targets

- **Minimum:** 44x44px (iOS HIG)
- **Buttons:** 56px height (comfortable)
- **Links:** 32px+ tap area

### Font Sizes

- **Body text:** 16px+ (prevents zoom on iOS)
- **Labels:** 12px+ (minimum readable)
- **Headings:** 22px+ (clear hierarchy)

---

## Migration Tips

### Replacing Old Colors

```typescript
// OLD → NEW
Colors.primary.royalPurple    → Colors.primary.deepPlum
Colors.neutral.softWhite      → Colors.neutral.blushCream
Colors.secondary.champagneGold → Colors.secondary.metallicGold
Colors.neutral.darkGrey       → Colors.neutral.warmGrey
```

### Updating Shadows

```typescript
// OLD
shadowColor: "#000";

// NEW
shadowColor: Colors.primary.deepPlum;
```

### Button Border Radius

```typescript
// OLD
borderRadius: BorderRadius.md; // 12px

// NEW
borderRadius: BorderRadius.pill; // 9999px
```

---

_Quick reference for maintaining GlamGo's luxury design system_ ✨
