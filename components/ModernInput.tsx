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
          ] as any}
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
    marginBottom: Spacing.lg,
  },
  
  label: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.mutedText,
    marginBottom: Spacing.sm,
    letterSpacing: Typography.letterSpacing.wide,
    textTransform: 'uppercase',
    fontFamily: Typography.fontFamily.body,
  },
  
  labelDark: {
    color: Colors.dark.text,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    backgroundColor: Colors.neutral.surface,  // #FFFDFC
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,  // #E7D9EA
    ...Shadows.subtle,
  },
  
  inputContainerFocused: {
    borderColor: Colors.primary.deepPlum,
    borderWidth: 1.5,
  },
  
  inputContainerError: {
    borderColor: Colors.semantic.error,
    backgroundColor: '#FFF9F9',
  },
  
  inputContainerDark: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.dark.textSecondary,
  },
  
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.body,
    color: Colors.neutral.darkText,
    letterSpacing: Typography.letterSpacing.normal,
  },
  
  inputDark: {
    color: Colors.dark.text,
  },
  
  inputWithLeftIcon: {
    paddingLeft: Spacing.xs as number,
  },
  
  inputWithRightIcon: {
    paddingRight: Spacing.xs as number,
  },
  
  leftIcon: {
    paddingLeft: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  rightIcon: {
    paddingRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  errorText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.semantic.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  
  helperText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mutedText,
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
    letterSpacing: Typography.letterSpacing.normal,
  },
  
  helperTextDark: {
    color: Colors.dark.textSecondary,
  },
});
