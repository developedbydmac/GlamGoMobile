import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/DesignSystem';
// import { getAvailableOrders, updateOrderStatus } from '@/services/orderService';

interface AvailableOrder {
  id: string;
  storeName: string;
  storeAddress: string;
  customerName: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryFee: number;
  distance: string;
  pickupTime: string;
  items: string[];
}

export default function DriverAvailableScreen() {
  const [orders, setOrders] = useState<AvailableOrder[]>([
    // Mock data - will replace with getAvailableOrders()
    {
      id: '1',
      storeName: 'Glam Studio',
      storeAddress: '123 Sunset Blvd, Los Angeles',
      customerName: 'Sarah Johnson',
      deliveryAddress: '456 Palm Ave, Los Angeles, CA 90001',
      deliveryCity: 'Los Angeles',
      deliveryFee: 12.50,
      distance: '2.3 mi',
      pickupTime: '2024-03-05T14:00:00',
      items: ['Classic Blowout', 'Gel Manicure'],
    },
    {
      id: '2',
      storeName: 'Luxe Hair Bar',
      storeAddress: '789 Beverly Dr, Los Angeles',
      customerName: 'Emily Davis',
      deliveryAddress: '321 Ocean Ave, Santa Monica, CA 90401',
      deliveryCity: 'Santa Monica',
      deliveryFee: 15.00,
      distance: '4.1 mi',
      pickupTime: '2024-03-05T15:30:00',
      items: ['Hair Extensions', 'Styling Products'],
    },
    {
      id: '3',
      storeName: 'Beauty Box',
      storeAddress: '555 Main St, Los Angeles',
      customerName: 'Jessica Williams',
      deliveryAddress: '888 Wilshire Blvd, Los Angeles, CA 90017',
      deliveryCity: 'Los Angeles',
      deliveryFee: 10.00,
      distance: '1.8 mi',
      pickupTime: '2024-03-05T16:00:00',
      items: ['Makeup Kit', 'Brushes Set'],
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    try {
      // TODO: Replace with real API call
      // const result = await getAvailableOrders();
      // setOrders(result);
      console.log('Loading available orders...');
    } catch (error) {
      console.error('Load orders error:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAcceptOrder = (order: AvailableOrder) => {
    Alert.alert(
      'Take this delivery?',
      `Pickup from ${order.storeName}\nDeliver to ${order.customerName}`,
      [
        { text: 'Not now', style: 'cancel' },
        {
          text: "I'll take it!",
          onPress: async () => {
            try {
              // TODO: Replace with real API call
              // await updateOrderStatus(order.id, 'PICKED_UP');
              
              // Remove from available list (simulate accept)
              setOrders(prev => prev.filter(o => o.id !== order.id));
              
              Alert.alert(
                'You got it! 🚗',
                `Head to ${order.storeName} to pick up the order`,
              );
            } catch (error) {
              console.error('Accept order error:', error);
              Alert.alert('Oops!', 'Something went wrong. Try again?');
            }
          },
        },
      ]
    );
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const renderOrder = ({ item }: { item: AvailableOrder }) => (
    <View style={styles.orderCard}>
      {/* Distance Badge */}
      <View style={styles.distanceBadge}>
        <Ionicons name="location" size={14} color={Colors.semantic.info} />
        <Text style={styles.distanceText}>{item.distance} away</Text>
      </View>

      {/* Store Info */}
      <View style={styles.section}>
        <View style={styles.iconRow}>
          <Ionicons name="storefront" size={20} color={Colors.primary.royalPurple} />
          <Text style={styles.sectionTitle}>Pickup</Text>
        </View>
        <Text style={styles.storeName}>{item.storeName}</Text>
        <Text style={styles.address}>{item.storeAddress}</Text>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={16} color={Colors.neutral.mediumGrey} />
          <Text style={styles.timeText}>Ready at {formatTime(item.pickupTime)}</Text>
        </View>
      </View>

      {/* Delivery Info */}
      <View style={styles.section}>
        <View style={styles.iconRow}>
          <Ionicons name="home" size={20} color={Colors.secondary.champagneGold} />
          <Text style={styles.sectionTitle}>Deliver to</Text>
        </View>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.address}>{item.deliveryAddress}</Text>
      </View>

      {/* Items List */}
      <View style={styles.itemsSection}>
        <Text style={styles.itemsTitle}>Items ({item.items.length})</Text>
        {item.items.map((itemName, index) => (
          <View key={index} style={styles.itemRow}>
            <Ionicons name="ellipse" size={6} color={Colors.neutral.mediumGrey} />
            <Text style={styles.itemText}>{itemName}</Text>
          </View>
        ))}
      </View>

      {/* Earning */}
      <View style={styles.earningRow}>
        <Text style={styles.earningLabel}>You'll earn</Text>
        <Text style={styles.earningAmount}>${item.deliveryFee.toFixed(2)}</Text>
      </View>

      {/* Accept Button */}
      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() => handleAcceptOrder(item)}
      >
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.acceptButtonText}>I'll Take This One</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="map-outline" size={80} color={Colors.neutral.mediumGrey} />
      <Text style={styles.emptyTitle}>All quiet right now</Text>
      <Text style={styles.emptyText}>
        We'll notify you when new deliveries pop up nearby!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Deliveries Near You</Text>
        <Text style={styles.headerSubtitle}>
          {orders.length} {orders.length === 1 ? 'opportunity' : 'opportunities'} available
        </Text>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.softWhite,
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
    color: Colors.neutral.darkGrey,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  listContent: {
    padding: Spacing.lg,
  },
  orderCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  distanceText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.semantic.info,
  },
  section: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.mediumGrey,
    textTransform: 'uppercase' as const,
  },
  storeName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
  },
  customerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
  },
  address: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  timeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  itemsSection: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  itemsTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  itemText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  earningRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    backgroundColor: '#F3F4F6',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  earningLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkGrey,
  },
  earningAmount: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.semantic.success,
  },
  acceptButton: {
    backgroundColor: Colors.semantic.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  acceptButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold as any,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkGrey,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    textAlign: 'center' as const,
    lineHeight: 22,
  },
});
