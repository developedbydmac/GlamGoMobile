import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/DesignSystem';
import { Ionicons } from '@expo/vector-icons';
import StockBadge from './StockBadge';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description?: string | null;
    inventoryCount: number;
    isAvailable: boolean;
  };
  onEdit: () => void;
}

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
          <StockBadge inStock={product.isAvailable} />
        </View>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>

      <View style={styles.inventoryRow}>
        <Ionicons name="cube-outline" size={16} color={Colors.neutral.mediumGrey} />
        <Text style={styles.inventoryText}>
          {product.inventoryCount} unit{product.inventoryCount !== 1 ? 's' : ''} in stock
        </Text>
      </View>

      {product.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Ionicons name="create-outline" size={18} color={Colors.primary.deepPlum} />
        <Text style={styles.editButtonText}>Edit Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  titleRow: {
    flex: 1,
    marginRight: Spacing.md,
  },
  name: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.xs,
  },
  price: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
  },
  inventoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  inventoryText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary.deepPlum,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.primary.deepPlum,
  },
});
