import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Spacing, Typography, BorderRadius } from '@/constants/DesignSystem';

interface StockBadgeProps {
  inStock: boolean;
}

export default function StockBadge({ inStock }: StockBadgeProps) {
  return (
    <View style={[styles.badge, inStock ? styles.inStock : styles.outOfStock]}>
      <View style={[styles.dot, inStock ? styles.dotGreen : styles.dotRed]} />
      <Text style={[styles.text, inStock ? styles.textGreen : styles.textRed]}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
    gap: Spacing.xs,
  },
  inStock: {
    backgroundColor: '#D5F4E6',
  },
  outOfStock: {
    backgroundColor: '#FFE5E5',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotGreen: {
    backgroundColor: '#2ECC71',
  },
  dotRed: {
    backgroundColor: '#E74C3C',
  },
  text: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold as any,
  },
  textGreen: {
    color: '#2ECC71',
  },
  textRed: {
    color: '#E74C3C',
  },
});
