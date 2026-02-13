/**
 * Toast Notification Component
 * Auto-dismissing notifications with animations
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';
import { Ionicons } from '@expo/vector-icons';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onDismiss: () => void;
}

export default function Toast({
  message,
  type = 'info',
  duration = 3000,
  onDismiss,
}: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    // Slide in animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    const timer = setTimeout(() => {
      dismissToast();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return Colors.semantic.success;
      case 'error':
        return Colors.semantic.error;
      case 'warning':
        return Colors.semantic.warning;
      case 'info':
      default:
        return Colors.semantic.info;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'information-circle';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor: getBackgroundColor(),
        },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={dismissToast}
        activeOpacity={0.9}
      >
        <Ionicons
          name={getIcon()}
          size={24}
          color={Colors.neutral.white}
          style={styles.icon}
        />
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
        <TouchableOpacity onPress={dismissToast} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close" size={20} color={Colors.neutral.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60, // Below status bar
    left: Spacing.base,
    right: Spacing.base,
    borderRadius: BorderRadius.md,
    ...Shadows.medium,
    zIndex: 9999,
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
  },
  
  icon: {
    marginRight: Spacing.sm,
  },
  
  message: {
    flex: 1,
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily,
  },
});
