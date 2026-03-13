/**
 * GlamGo Professional Design System
 *
 * A comprehensive design system following iOS Human Interface Guidelines
 * and modern mobile design best practices.
 */

import { Platform } from "react-native";

/**
 * GlamGo Luxury Color Palette
 * Refined to match logo: soft purple, muted gold, blush warmth
 * High-end beauty brand aesthetic with breathing room
 */
export const Colors = {
  // Primary Colors - Refined Plum (softer, more elegant)
  primary: {
    deepPlum: "#522888", // Main brand - refined purple
    darkPlum: "#3B1B64", // Gradient end / shadows
    lightPlum: "#5E2C91", // Gradient start / hover
    lavender: "#8C7A9A", // Muted text variant
  },

  // Secondary Colors - Soft Gold (muted, not metallic)
  secondary: {
    softGold: "#BF9553", // Primary gold accent (refined)
    champagneGold: "#D4AF37", // Warmer variant
    darkGold: "#9A7843", // Darker for contrast
    paleGold: "#E8D4A0", // Subtle backgrounds
  },

  // Neutral Colors - Blush & Warm Tones
  neutral: {
    white: "#FFFFFF",
    surface: "#FFFDFC", // Near-white with blush hint
    blushCream: "#FFF8F5", // Soft blush background (lighter)
    softBlush: "#F5EDE8", // Card backgrounds
    lightGrey: "#E7D9EA", // Borders (purple-tinted)
    mediumGrey: "#B7A8C5", // Placeholder text (purple-tinted)
    mutedText: "#8C7A9A", // Secondary text
    darkText: "#2E2335", // Primary text (plum-tinted)
    black: "#000000",
  },

  // Semantic Colors
  semantic: {
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#D9534F", // Softer red
    info: "#6B9BD1",
  },

  // Dark Mode Support
  dark: {
    background: "#1A1416",
    surface: "#2C2229",
    primary: "#8C7A9A",
    secondary: "#BF9553",
    text: "#FFF8F5",
    textSecondary: "#B7A8C5",
  },
};

/**
 * Typography System - Luxury GlamGo
 * Display serif for headings (Playfair Display or similar)
 * Clean sans for body text (Inter/SF Pro)
 */
export const Typography = {
  fontFamily: {
    // Heading fonts - elegant display serif (Playfair Display)
    heading: Platform.select({
      ios: "PlayfairDisplay-SemiBold",
      android: "PlayfairDisplay-SemiBold",
      default: "Georgia",
    }),
    // Body fonts - refined sans serif (Inter)
    body: Platform.select({
      ios: "Inter-Regular",
      android: "Inter-Regular",
      default: "System",
    }),
    bodyMedium: Platform.select({
      ios: "Inter-Medium",
      android: "Inter-Medium",
      default: "System",
    }),
    bodySemiBold: Platform.select({
      ios: "Inter-SemiBold",
      android: "Inter-SemiBold",
      default: "System",
    }),
    bodyBold: Platform.select({
      ios: "Inter-Bold",
      android: "Inter-Bold",
      default: "System",
    }),
  },

  // Font Sizes - More hierarchy for luxury feel
  fontSize: {
    xs: 12,
    sm: 13,
    base: 16, // Base size - prevents iOS auto-zoom on inputs
    md: 17,
    lg: 19,
    xl: 22,
    "2xl": 28,
    "3xl": 34,
    "4xl": 42,
    "5xl": 52,
  },

  // Font Weights
  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    heavy: "800" as const,
  },

  // Letter Spacing - Refined tracking
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    relaxed: 0.5,
    wide: 1,
    wider: 1.5,
    widest: 2,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

/**
 * Spacing System - Luxury breathing room
 * 4px base unit for consistent rhythm
 */
export const Spacing = {
  xs: 4, // 1 unit
  sm: 8, // 2 units
  md: 12, // 3 units
  base: 16, // 4 units
  lg: 24, // 6 units
  xl: 32, // 8 units
  "2xl": 40, // 10 units
  "3xl": 48, // 12 units
  "4xl": 64, // 16 units
  "5xl": 80, // 20 units
};

/**
 * Spacing helper function (like your reference)
 * Usage: spacing(3) = 12px, spacing(6) = 24px
 */
export const spacing = (n: number) => n * 4;

/**
 * Border Radius - Refined luxury
 * Matching your reference theme
 */
export const BorderRadius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 24,
  pill: 999, // Full pill shape
};

/**
 * Shadows - Refined elevation
 * Purple-tinted shadows for brand consistency
 */
export const Shadows = {
  subtle: {
    shadowColor: Colors.primary.darkPlum, // #3B1B64
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  light: {
    shadowColor: Colors.primary.darkPlum,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },

  medium: {
    shadowColor: Colors.primary.darkPlum,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },

  heavy: {
    shadowColor: Colors.primary.darkPlum,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
};

/**
 * Component Styles - Luxury GlamGo
 * Reusable component styling rules with refined aesthetics
 */
export const Components = {
  // Luxury Input Field
  input: {
    height: 58,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral.lightGrey,
    paddingHorizontal: Spacing.base,
    fontSize: Typography.fontSize.base,
    backgroundColor: Colors.neutral.white,
    ...Shadows.subtle,
  },

  // Premium Pill Button
  button: {
    height: 56,
    borderRadius: BorderRadius.pill, // Full pill shape
    paddingHorizontal: Spacing.xl,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    ...Shadows.light,
  },

  // Elevated Card Container
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.subtle,
  },
};

/**
 * Layout Constants
 * Safe areas and responsive breakpoints
 */
export const Layout = {
  // Safe Area Padding
  safeArea: {
    top: Platform.OS === "ios" ? 44 : 0,
    bottom: Platform.OS === "ios" ? 34 : 0,
  },

  // Screen Padding
  screenPadding: Spacing.lg,

  // Breakpoints
  breakpoints: {
    sm: 375,
    md: 768,
    lg: 1024,
  },

  // Maximum Width for Content
  maxWidth: 600,
};

/**
 * Animation Timings
 * Consistent animation durations
 */
export const Animation = {
  fast: 150,
  normal: 300,
  slow: 500,
};

/**
 * User Role Colors - Luxury variants
 * Distinct colors for each user type with refined palette
 */
export const RoleColors = {
  CUSTOMER: {
    primary: "#4A1C6B", // Deep plum
    light: "#7B4C9E",
    icon: "person.fill",
  },
  VENDOR: {
    primary: "#C9A961", // Metallic gold
    light: "#E8D4A0",
    icon: "handbag.fill",
  },
  DRIVER: {
    primary: "#6B9BD1", // Softer blue
    light: "#A2C4E8",
    icon: "car.fill",
  },
};

/**
 * Gradient Definitions - Luxury GlamGo
 * Refined gradients matching the softer aesthetic
 */
export const Gradients = {
  primary: [Colors.primary.lightPlum, Colors.primary.darkPlum] as const, // #5E2C91 → #3B1B64
  gold: [Colors.secondary.darkGold, Colors.secondary.softGold] as const,
  dark: ["#1A1416", "#2C2229"] as const,
};

/**
 * Toast/Notification Styles
 */
export const Toast = {
  success: {
    backgroundColor: Colors.semantic.success,
    textColor: Colors.neutral.white,
  },
  error: {
    backgroundColor: Colors.semantic.error,
    textColor: Colors.neutral.white,
  },
  info: {
    backgroundColor: Colors.semantic.info,
    textColor: Colors.neutral.white,
  },
  warning: {
    backgroundColor: Colors.semantic.warning,
    textColor: Colors.neutral.white,
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Components,
  Layout,
  Animation,
  RoleColors,
  Gradients,
  Toast,
};
