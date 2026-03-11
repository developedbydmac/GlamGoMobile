import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/DesignSystem';
import useCartStore, { CartItem } from '@/contexts/CartContext';

export default function CustomerCartScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotal, getItemCount, clearCart } = useCartStore();

  const handleUpdateQuantity = (productId: string, change: number) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      } else {
        handleRemoveItem(productId);
      }
    }
  };

  const handleRemoveItem = (productId: string) => {
    Alert.alert(
      'Remove from cart?',
      'This will remove the item',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeItem(productId),
        },
      ]
    );
  };

  const subtotal = getTotal();
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + serviceFee;
  const itemCount = getItemCount();

  const handleCheckout = () => {
    router.push('../booking');
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        {item.product.imageUrl ? (
          <Image source={{ uri: item.product.imageUrl }} style={styles.itemImage} />
        ) : (
          <View style={[styles.itemImage, styles.placeholderImage]}>
            <Ionicons name="sparkles" size={24} color={Colors.secondary.champagneGold} />
          </View>
        )}
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.storeName}>from {item.product.storeName || 'Store'}</Text>
        <Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.product.id, -1)}
          >
            <Ionicons name="remove" size={16} color={Colors.primary.deepPlum} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.product.id, 1)}
          >
            <Ionicons name="add" size={16} color={Colors.primary.deepPlum} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleRemoveItem(item.product.id)}>
          <Ionicons name="trash-outline" size={20} color={Colors.semantic.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color={Colors.neutral.mediumGrey} />
      <Text style={styles.emptyTitle}>Your cart's looking lonely</Text>
      <Text style={styles.emptyText}>
        Browse our beauty pros and add services you love
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => router.push('../browse')}
      >
        <Text style={styles.browseButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
        {renderEmptyCart()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <Text style={styles.itemCount}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={item => item.product.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Checkout Summary */}
      <View style={styles.checkoutContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service fee</Text>
          <Text style={styles.summaryValue}>${serviceFee.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Pick a Time</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  header: {
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
  },
  itemCount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  listContent: {
    padding: Spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  itemImageContainer: {
    marginRight: Spacing.md,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
  },
  placeholderImage: {
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.xs,
  },
  storeName: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginBottom: Spacing.xs,
  },
  itemPrice: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
  },
  itemActions: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: Colors.primary.deepPlum,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
    minWidth: 24,
    textAlign: 'center',
  },
  separator: {
    height: Spacing.md,
  },
  checkoutContainer: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lightGrey,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
  },
  summaryValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.darkText,
  },
  totalRow: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lightGrey,
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
  },
  totalValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
  },
  checkoutButton: {
    backgroundColor: Colors.primary.deepPlum,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  checkoutButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    textAlign: 'center' as const,
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  browseButton: {
    backgroundColor: Colors.primary.deepPlum,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  browseButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold as any,
  },
});
