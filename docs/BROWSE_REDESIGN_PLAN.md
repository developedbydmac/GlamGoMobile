# Browse Page Redesign - Lead Architect Plan

## Current Issues
1. ❌ No GlamGoLogo component (using plain text "GlamGo")
2. ❌ Hardcoded colors instead of Design System
3. ❌ Inconsistent typography (not using Typography constants)
4. ❌ No gradient buttons like sign-up/role pages
5. ❌ Plain styling vs luxury aesthetic
6. ❌ No SafeAreaView wrapper
7. ❌ Missing proper spacing/shadows from design system

## Design System Compliance Required
- ✅ Use `GlamGoLogo` component (already created, used in sign-up)
- ✅ Use `Colors.*` from DesignSystem
- ✅ Use `Typography.*` for all fonts
- ✅ Use `Spacing.*` for all margins/padding
- ✅ Use `BorderRadius.*` for rounded corners
- ✅ Use `Shadows.*` for elevations
- ✅ Use `LinearGradient` for buttons (like role-selection page)
- ✅ Use proper font families (heading serif, body sans)

## Components to Redesign

### 1. Header Section
**BEFORE:**
```tsx
<Text style={styles.logo}>GlamGo</Text>
```

**AFTER:**
```tsx
<View style={styles.headerTop}>
  <GlamGoLogo size="small" />
  <Text style={styles.tagline}>BEAUTY DELIVERED</Text>
</View>
```

### 2. Auth Buttons
**BEFORE:**
```tsx
<TouchableOpacity style={styles.joinButton}>
  <Text>Join Free</Text>
</TouchableOpacity>
```

**AFTER:**
```tsx
<TouchableOpacity style={styles.joinButton}>
  <LinearGradient
    colors={[Colors.primary.lightPlum, Colors.primary.deepPlum]}
    style={styles.joinGradient}
  >
    <Text style={styles.joinText}>Join Free</Text>
  </LinearGradient>
</TouchableOpacity>
```

### 3. Category Cards
**BEFORE:** Hardcoded colors, plain background
**AFTER:** Gradient on selected, proper Design System colors, shadows

### 4. Product Cards
**BEFORE:** Basic styling
**AFTER:** Luxury cards with proper shadows, typography, colors

### 5. CTA Section
**BEFORE:** Basic button
**AFTER:** Gradient button with proper styling

## Color Palette (from DesignSystem.ts)
```typescript
Primary: deepPlum (#522888), lightPlum (#7B4FA0)
Secondary: softGold (#BF9553), champagneGold (#E8C78A)
Neutral: blushCream (#FFF8F5), white, darkText (#2E2335)
```

## Typography Scale
- Hero: fontSize.4xl (48px), fontFamily.heading (serif)
- Section: fontSize.2xl (24px), fontWeight.semibold
- Body: fontSize.base (16px), fontFamily.body
- Labels: fontSize.xs (12px), letterSpacing.wide

## Spacing System
- xs: 4, sm: 8, base: 12, md: 16, lg: 20, xl: 24, 2xl: 32, 3xl: 48, 4xl: 64

## Implementation Priority
1. Replace hardcoded colors → Design System colors
2. Add GlamGoLogo to header
3. Update all typography to use Typography constants
4. Add LinearGradient to buttons
5. Update spacing to use Spacing constants
6. Add proper shadows using Shadows constants
7. Wrap in SafeAreaView
8. Add font families to all text

## Files to Update
- ✅ app/browse.tsx (main file - 829 lines)
- ⏳ Ensure imports match sign-up.tsx style
- ⏳ Match layout structure of role-selection.tsx

## Expected Outcome
A browse page that looks like it was designed by the same luxury brand designer who did the sign-up and role-selection pages, with perfect design system compliance and professional mobile app architecture.
