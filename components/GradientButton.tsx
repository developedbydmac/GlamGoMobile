/**
 * Premium Gradient Button Component
 * Features linear gradients, loading states, and accessibility
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function GradientButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'large',
  fullWidth = true,
  style,
  textStyle,
}: GradientButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const isDisabled = disabled || loading;

  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 48;
      case 'large':
        return 56;
      default:
        return 56;
    }
  };

  const getGradientColors = (): readonly [string, string] => {
    if (isDisabled) {
      return [Colors.neutral.lightGrey, Colors.neutral.mediumGrey] as const;
    }
    
    switch (variant) {
      case 'primary':
        return ['#5E2C91', '#3B1B64'] as const;  // Light plum → Dark plum
      case 'secondary':
        return [Colors.secondary.darkGold, Colors.secondary.softGold] as const;
      default:
        return ['#5E2C91', '#3B1B64'] as const;
    }
  };

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[
          styles.button,
          styles.outlineButton,
          { height: getButtonHeight() },
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          isDark && styles.outlineButtonDark,
          style,
        ]}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={Colors.neutral.blushCream} />
        ) : (
          <Text style={[styles.outlineButtonText, isDark && styles.outlineButtonTextDark, textStyle]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        { height: getButtonHeight() },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { height: getButtonHeight() }]}
      >
        {loading ? (
          <ActivityIndicator color={Colors.neutral.white} />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.pill,  // 999
    overflow: 'hidden',
  },
  
  fullWidth: {
    width: '100%',
  },
  
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,  // 12px
    shadowColor: '#3B1B64',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  
  buttonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.body,
    textAlign: 'center',
    letterSpacing: Typography.letterSpacing.relaxed,
  },
  
  outlineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary.deepPlum,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'transparent',
    paddingHorizontal: Spacing.xl,
  },
  
  outlineButtonDark: {
    borderColor: Colors.dark.primary,
  },
  
  outlineButtonText: {
    color: Colors.primary.deepPlum,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.body,
    letterSpacing: Typography.letterSpacing.relaxed,
  },
  
  outlineButtonTextDark: {
    color: Colors.dark.primary,
  },
  
  disabled: {
    opacity: 0.5,
  },
});
