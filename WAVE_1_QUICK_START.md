# 🚀 WAVE 1 QUICK START GUIDE

## Get Luxury Redesign Started TODAY

**Estimated Time:** 8-10 hours (spread across this week)  
**Feasibility:** High (all prep done, just execute)  
**Target:** Luxury app ready for March 13 demo

---

## STEP 1: Foundation (1 hour - DO THIS FIRST)

### Create `constants/DesignSystem.ts`

```bash
# In your project root:
touch constants/DesignSystem.ts
```

Copy this template:

```typescript
// constants/DesignSystem.ts
/**
 * GlamGo Design System
 * All design tokens in one place for consistency across the app
 */

export const Colors = {
  // Primary: Deep Purple (luxury, sophisticated)
  primary: {
    deepPlum: "#522888",
    lightPlum: "#7B4FA1",
    paleAmethyst: "#D4C5E2",
  },

  // Secondary: Soft Gold (warmth, elegance)
  secondary: {
    softGold: "#BF9553",
    richGold: "#A0804D",
    paleMint: "#F5E6D3",
  },

  // Neutrals: Blush + Cream
  neutral: {
    blushCream: "#FFF8F5",
    softBlush: "#FBF0EC",
    warmWhite: "#FEFDFB",
    white: "#FFFFFF",
    lightGrey: "#F0EAE6",
    mediumGrey: "#A89A92",
    mutedText: "#8C7A9A",
    darkText: "#3D2E42",
  },

  // Semantic: Status
  semantic: {
    success: "#6BB088",
    warning: "#E8A869",
    error: "#D67C7C",
    info: "#7B9BD1",
  },

  // Gradients
  gradient: {
    primary: ["#522888", "#7B4FA1"],
    accent: ["#BF9553", "#D4C5E2"],
    sunset: ["#BF9553", "#E8A869"],
    soft: ["#FBF0EC", "#FFF8F5"],
  },
};

export const Typography = {
  fontFamily: {
    heading: "PlayfairDisplay-Bold",
    body: "Inter-Regular",
    bodyMedium: "Inter-Medium",
    bodySemibold: "Inter-SemiBold",
  },

  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 19,
    "2xl": 22,
    "3xl": 26,
    "4xl": 32,
    "5xl": 40,
  },

  fontWeight: {
    light: "300" as any,
    normal: "400" as any,
    medium: "500" as any,
    semibold: "600" as any,
    bold: "700" as any,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    relaxed: 0.3,
    wide: 0.6,
    wider: 1.0,
  },
};

export const Spacing = {
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

export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  subtle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  strong: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  deep: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
};
```

**Status:** ✅ Done (15 min)

---

## STEP 2: Core Components (2 hours)

### Create `components/GlamButton.tsx`

```bash
touch components/GlamButton.tsx
```

```typescript
// components/GlamButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

interface GlamButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function GlamButton({
  variant = 'primary',
  size = 'md',
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
}: GlamButtonProps) {
  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    const baseStyle = {
      paddingHorizontal: size === 'sm' ? Spacing.md : size === 'lg' ? Spacing.xl : Spacing.lg,
      paddingVertical: size === 'sm' ? Spacing.sm : size === 'lg' ? Spacing.lg : Spacing.md,
      borderRadius: BorderRadius.sm,
      alignItems: 'center' as any,
      justifyContent: 'center' as any,
      flexDirection: 'row' as any,
      opacity: isDisabled ? 0.6 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: Colors.primary.deepPlum,
          ...Shadows.medium,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: Colors.secondary.softGold,
          ...Shadows.medium,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: Colors.primary.deepPlum,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const color =
      variant === 'ghost' || variant === 'outline' ? Colors.primary.deepPlum : Colors.neutral.white;
    const fontSize = size === 'sm' ? Typography.fontSize.xs : size === 'lg' ? Typography.fontSize.base : Typography.fontSize.sm;

    return {
      color,
      fontSize,
      fontWeight: Typography.fontWeight.semibold,
      textAlign: 'center' as any,
      fontFamily: Typography.fontFamily.bodySemibold,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? Colors.primary.deepPlum : Colors.neutral.white} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
```

**Status:** ✅ Done (30 min)

### Create `components/GlamCard.tsx`

```bash
touch components/GlamCard.tsx
```

```typescript
// components/GlamCard.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

interface GlamCardProps {
  variant?: 'default' | 'elevated' | 'flat';
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function GlamCard({
  variant = 'default',
  children,
  style,
}: GlamCardProps) {
  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: BorderRadius.md,
      padding: Spacing.lg,
      overflow: 'hidden' as any,
    };

    switch (variant) {
      case 'default':
        return {
          ...baseStyle,
          backgroundColor: Colors.neutral.softBlush,
          ...Shadows.subtle,
        };
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: Colors.neutral.white,
          ...Shadows.medium,
        };
      case 'flat':
        return {
          ...baseStyle,
          backgroundColor: Colors.neutral.blushCream,
        };
      default:
        return baseStyle;
    }
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
}
```

**Status:** ✅ Done (20 min)

### Create `components/GlamInput.tsx`

```bash
touch components/GlamInput.tsx
```

```typescript
// components/GlamInput.tsx
import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/DesignSystem';

interface GlamInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  variant?: 'standard' | 'outlined' | 'underline';
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
}

export default function GlamInput({
  label,
  placeholder,
  value,
  onChangeText,
  variant = 'standard',
  error,
  leftIcon,
  rightIcon,
  style,
  ...props
}: GlamInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyle = () => {
    const baseStyle = {
      flex: 1,
      fontSize: Typography.fontSize.base,
      color: Colors.neutral.darkText,
      fontFamily: Typography.fontFamily.body,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
    };

    switch (variant) {
      case 'standard':
        return {
          ...baseStyle,
          backgroundColor: isFocused ? Colors.neutral.warmWhite : Colors.neutral.softBlush,
          borderRadius: BorderRadius.sm,
          borderWidth: 0,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: Colors.neutral.white,
          borderRadius: BorderRadius.sm,
          borderWidth: 1,
          borderColor: isFocused ? Colors.primary.deepPlum : Colors.neutral.lightGrey,
        };
      case 'underline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: isFocused ? Colors.primary.deepPlum : Colors.neutral.lightGrey,
          borderRadius: 0,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <View style={style}>
      {label && (
        <Text
          style={{
            fontSize: Typography.fontSize.sm,
            fontWeight: Typography.fontWeight.medium,
            color: Colors.primary.deepPlum,
            marginBottom: Spacing.sm,
            fontFamily: Typography.fontFamily.body,
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: variant === 'standard' ? Colors.neutral.softBlush : 'transparent',
          borderRadius: variant === 'standard' ? BorderRadius.sm : 0,
          borderWidth: variant === 'outlined' ? 1 : 0,
          borderColor: variant === 'outlined' ? Colors.neutral.lightGrey : 'transparent',
          borderBottomWidth: variant === 'underline' ? 1 : 0,
          borderBottomColor: variant === 'underline' ? Colors.neutral.lightGrey : 'transparent',
        }}
      >
        {leftIcon && <View style={{ marginLeft: Spacing.md, marginRight: Spacing.sm }}>{leftIcon}</View>}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral.mediumGrey}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={getInputStyle()}
          {...props}
        />

        {rightIcon && <View style={{ marginRight: Spacing.md, marginLeft: Spacing.sm }}>{rightIcon}</View>}
      </View>

      {error && (
        <Text
          style={{
            fontSize: Typography.fontSize.xs,
            color: Colors.semantic.error,
            marginTop: Spacing.sm,
            fontFamily: Typography.fontFamily.body,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
```

**Status:** ✅ Done (30 min)

### Create `components/GlamGradient.tsx`

```bash
touch components/GlamGradient.tsx
```

```typescript
// components/GlamGradient.tsx
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlamGradientProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  children?: React.ReactNode;
}

export default function GlamGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
}: GlamGradientProps) {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
```

**Status:** ✅ Done (10 min)

**Total Step 2:** 1.5 hours

---

## STEP 3: Update Welcome Screen (1 hour)

### Redesign `app/index.tsx`

Replace with luxury welcome:

```typescript
// app/index.tsx (Welcome screen)
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import GlamGoLogo from '@/components/GlamGoLogo';
import GlamButton from '@/components/GlamButton';
import GlamGradient from '@/components/GlamGradient';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/DesignSystem';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Background Gradient */}
      <GlamGradient
        colors={[Colors.neutral.softBlush, Colors.neutral.blushCream]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoSection}>
            <GlamGoLogo size="large" />
            <Text style={styles.tagline}>BEAUTY DELIVERED</Text>
          </View>

          {/* Hero Text */}
          <View style={styles.heroText}>
            <Text style={styles.mainTitle}>Discover Premium Beauty</Text>
            <Text style={styles.subtitle}>
              Experience luxury beauty products delivered to your door in hours, not days.
            </Text>
          </View>

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* CTA Buttons */}
          <View style={styles.buttons}>
            <GlamButton
              variant="primary"
              size="lg"
              title="Start Shopping"
              onPress={() => router.push('/browse')}
              style={styles.button}
            />

            <GlamButton
              variant="secondary"
              size="lg"
              title="Become a Vendor"
              onPress={() => router.push('/(auth)/role-selection?role=vendor')}
              style={styles.button}
            />

            <GlamButton
              variant="ghost"
              size="lg"
              title="Sign In"
              onPress={() => router.push('/(auth)/sign-in')}
              style={styles.button}
            />
          </View>
        </View>
      </GlamGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  tagline: {
    fontSize: Typography.fontSize.xs,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
    color: Colors.secondary.softGold,
    marginTop: Spacing.md,
    fontFamily: Typography.fontFamily.body,
    fontWeight: Typography.fontWeight.semibold,
  },
  heroText: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  mainTitle: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontFamily: Typography.fontFamily.heading,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mutedText,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed,
    fontFamily: Typography.fontFamily.body,
  },
  buttons: {
    gap: Spacing.md,
  },
  button: {
    width: '100%',
  },
});
```

**Status:** ✅ Done (60 min)

---

## STEP 4: Update Browse/Shop Screen (2 hours)

See `LUXURY_UI_REDESIGN_PLAN.md` section **5.1** for complete code.

Key points:

- Hero section with gradient background
- Search input using GlamInput
- Featured products horizontal scroll
- Category buttons
- Products grid (2 columns)
- Empty state + skeleton loaders

**Status:** Reference document for implementation

---

## ⏱️ TIMELINE BREAKDOWN

| Task           | Time         | Status                  |
| -------------- | ------------ | ----------------------- |
| Design System  | 15 min       | ✅ Ready                |
| GlamButton     | 30 min       | ✅ Ready                |
| GlamCard       | 20 min       | ✅ Ready                |
| GlamInput      | 30 min       | ✅ Ready                |
| GlamGradient   | 10 min       | ✅ Ready                |
| Welcome Screen | 60 min       | ✅ Ready                |
| Browse Screen  | 120 min      | 📖 Reference provided   |
| Product Detail | 120 min      | 📖 Reference provided   |
| **TOTAL**      | **~8 hours** | ✅ Achievable this week |

---

## 🎯 NEXT IMMEDIATE ACTIONS

### TODAY

1. ✅ Create `constants/DesignSystem.ts` (15 min)
2. ✅ Create 4 components (Button, Card, Input, Gradient) (1.5 hours)
3. ✅ Update `app/index.tsx` (Welcome) (1 hour)
4. Start `browse.tsx` OR
5. Plan tomorrow's work

### TOMORROW + THIS WEEK

6. Complete `browse.tsx` (2 hours)
7. Update `product-detail.tsx` (1.5 hours)
8. Verify all 6 screens look professional
9. Test on device (iOS + Android)

### BY MARCH 13 (DEMO DAY)

✅ All 6 screens redesigned + professional
✅ App feels luxury, cohesive, premium
✅ Ready to wow stakeholders

---

## ✅ VERIFICATION

After each step:

```bash
# Check for TypeScript errors
npm run type-check

# Run the app
npm start

# Verify:
# [ ] Design tokens imported correctly
# [ ] Components render without errors
# [ ] Colors match design system
# [ ] Spacing is generous (not cramped)
# [ ] No console errors
```

---

## 💡 TIPS FOR SUCCESS

1. **Work in order:** Design System → Components → Screens
2. **Test frequently:** Run app after each component
3. **Reference the full code:** Copy-paste from `LUXURY_UI_REDESIGN_PLAN.md` (sections 5.1 + 5.2)
4. **Use correct imports:** `import { ... } from '@/constants/DesignSystem'`
5. **Commit often:** Make small git commits as you complete pieces
6. **Take breaks:** Pacing helps quality

---

## 🚀 YOU'VE GOT THIS!

All the planning is done. This guide is executable **TODAY**.

Start with Step 1 (Design System) → Takes 15 min → Unlocks everything else.

By this weekend, you'll have a luxury-looking app ready for March 13 demo.

**LET'S BUILD! 🎨✨**
