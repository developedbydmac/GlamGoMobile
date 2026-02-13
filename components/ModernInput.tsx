/**
 * Modern Text Input Component
 * Follows iOS design guidelines with premium styling
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Platform,
  useColorScheme,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

interface ModernInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function ModernInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  style,
  ...props
}: ModernInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, isDark && styles.labelDark]}>{label}</Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          isDark && styles.inputContainerDark,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          {...props}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            isDark && styles.inputDark,
            style,
          ]}
          placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.neutral.mediumGrey}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && (
        <Text style={[styles.helperText, isDark && styles.helperTextDark]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
  },
  
  labelDark: {
    color: Colors.dark.text,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
    ...Shadows.subtle,
  },
  
  inputContainerFocused: {
    borderColor: Colors.primary.royalPurple,
    borderWidth: 2,
  },
  
  inputContainerError: {
    borderColor: Colors.semantic.error,
  },
  
  inputContainerDark: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.dark.textSecondary,
  },
  
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: Spacing.base,
    fontSize: Typography.fontSize.base,  // 16pt to prevent iOS auto-zoom
    fontFamily: Typography.fontFamily,
    color: Colors.neutral.darkGrey,
  },
  
  inputDark: {
    color: Colors.dark.text,
  },
  
  inputWithLeftIcon: {
    paddingLeft: Spacing.xs,
  },
  
  inputWithRightIcon: {
    paddingRight: Spacing.xs,
  },
  
  leftIcon: {
    paddingLeft: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  rightIcon: {
    paddingRight: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  errorText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.semantic.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  
  helperText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  
  helperTextDark: {
    color: Colors.dark.textSecondary,
  },
});
