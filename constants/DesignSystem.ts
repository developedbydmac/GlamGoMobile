/**
 * GlamGo Professional Design System
 * 
 * A comprehensive design system following iOS Human Interface Guidelines
 * and modern mobile design best practices.
 */

import { Platform } from 'react-native';

/**
 * Color Palette
 * Carefully selected for accessibility and premium feel
 */
export const Colors = {
  // Primary Colors
  primary: {
    royalPurple: '#4A2C82',      // Main brand color - buttons, headers
    deepPurple: '#3A1F6B',       // Darker variant for gradients
    lightPurple: '#6A4CA2',      // Lighter variant for hover states
    violet: '#7C5FC5',           // Gradient end color
  },
  
  // Secondary Colors
  secondary: {
    champagneGold: '#D4AF37',    // Accents, links, premium indicators
    darkGold: '#B8961F',         // Darker gold for text contrast
    lightGold: '#E8C96B',        // Lighter gold for backgrounds
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    softWhite: '#FAFAFA',        // Background to avoid harsh pure white
    lightGrey: '#E5E5E5',        // Borders
    mediumGrey: '#9E9E9E',       // Secondary text
    darkGrey: '#424242',         // Primary text
    black: '#000000',
  },
  
  // Semantic Colors
  semantic: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  
  // Dark Mode Support
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#BB86FC',
    secondary: '#03DAC6',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
  },
};

/**
 * Typography System
 * Following iOS system font sizes and weights
 */
export const Typography = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,      // Base size - prevents iOS auto-zoom on inputs
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Font Weights
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

/**
 * Spacing System
 * Consistent 8px grid system
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

/**
 * Border Radius
 * Modern, soft corners
 */
export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,     // Modern standard
  lg: 16,
  xl: 20,
  full: 9999,
};

/**
 * Shadows
 * Platform-specific elevation
 */
export const Shadows = {
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
};

/**
 * Component Styles
 * Reusable component styling rules
 */
export const Components = {
  // Modern Input Field
  input: {
    height: 56,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
    paddingHorizontal: Spacing.base,
    fontSize: Typography.fontSize.base,    // 16pt to prevent iOS zoom
    backgroundColor: Colors.neutral.white,
    ...Shadows.subtle,
  },
  
  // Premium Button
  button: {
    height: 56,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...Shadows.light,
  },
  
  // Card Container
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
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
    top: Platform.OS === 'ios' ? 44 : 0,
    bottom: Platform.OS === 'ios' ? 34 : 0,
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
 * User Role Colors
 * Distinct colors for each user type
 */
export const RoleColors = {
  CUSTOMER: {
    primary: '#4A2C82',
    light: '#6A4CA2',
    icon: 'person.fill',
  },
  VENDOR: {
    primary: '#D4AF37',
    light: '#E8C96B',
    icon: 'handbag.fill',
  },
  DRIVER: {
    primary: '#2196F3',
    light: '#64B5F6',
    icon: 'car.fill',
  },
};

/**
 * Gradient Definitions
 * Premium gradients for buttons and backgrounds
 */
export const Gradients = {
  primary: [Colors.primary.deepPurple, Colors.primary.violet],
  gold: [Colors.secondary.darkGold, Colors.secondary.champagneGold],
  dark: ['#1a1a1a', '#2d2d2d'],
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
