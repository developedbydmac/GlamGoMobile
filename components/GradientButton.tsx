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
        return [Colors.primary.deepPurple, Colors.primary.violet] as const;
      case 'secondary':
        return [Colors.secondary.darkGold, Colors.secondary.champagneGold] as const;
      default:
        return [Colors.primary.deepPurple, Colors.primary.violet] as const;
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
          <ActivityIndicator color={Colors.primary.royalPurple} />
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
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  
  fullWidth: {
    width: '100%',
  },
  
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.xl,
    ...Shadows.light,
  },
  
  buttonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily,
    textAlign: 'center',
  },
  
  outlineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary.royalPurple,
    borderRadius: BorderRadius.md,
    backgroundColor: 'transparent',
    paddingHorizontal: Spacing.xl,
  },
  
  outlineButtonDark: {
    borderColor: Colors.dark.primary,
  },
  
  outlineButtonText: {
    color: Colors.primary.royalPurple,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily,
  },
  
  outlineButtonTextDark: {
    color: Colors.dark.primary,
  },
  
  disabled: {
    opacity: 0.5,
  },
});
