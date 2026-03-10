import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/DesignSystem';
import { getMyOrders, updateOrderStatus } from '@/services/orderService';

interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';
  scheduledFor: string;
  createdAt: string;
}

export default function VendorOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([
    // Demo data
    {
      id: '1',
      customerName: 'Sarah Johnson',
      items: ['Classic Blowout', 'Gel Manicure'],
      total: 80.00,
      status: 'PENDING',
      scheduledFor: '2024-01-15T10:00:00',
      createdAt: '2024-01-14T15:30:00',
    },
    {
      id: '2',
      customerName: 'Emily Davis',
      items: ['Haircut & Style'],
      total: 65.00,
      status: 'CONFIRMED',
      scheduledFor: '2024-01-15T14:00:00',
      createdAt: '2024-01-14T12:15:00',
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'CONFIRMED'>('ALL');

  const loadOrders = async () => {
    try {
      // TODO: Replace with actual API call
      // const result = await getMyOrders();
      // setOrders(result);
      console.log('Loading orders...');
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

  const handleConfirmOrder = async (orderId: string) => {
    Alert.alert(
      'Accept this order?',
      'The customer will be notified right away',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              // TODO: Replace with actual API call
              // await updateOrderStatus(orderId, 'CONFIRMED');
              setOrders(prev =>
                prev.map(order =>
                  order.id === orderId ? { ...order, status: 'CONFIRMED' } : order
                )
              );
              Alert.alert('Done! ✅', 'Customer has been notified');
            } catch (error) {
              console.error('Confirm order error:', error);
              Alert.alert('Oops!', 'Something went wrong. Try again?');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return Colors.semantic.warning;
      case 'CONFIRMED':
        return Colors.primary.deepPlum;
      case 'PICKED_UP':
        return Colors.semantic.info;
      case 'DELIVERED':
        return Colors.semantic.success;
      case 'CANCELLED':
        return Colors.semantic.error;
      default:
        return Colors.neutral.mediumGrey;
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'Needs your attention';
      case 'CONFIRMED':
        return 'Ready for pickup';
      case 'PICKED_UP':
        return 'Out for delivery';
      case 'DELIVERED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'ALL') return true;
    return order.status === filter;
  });

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
      </View>

      {/* Order Info */}
      <View style={styles.orderHeader}>
        <View style={styles.customerInfo}>
          <Ionicons name="person-circle-outline" size={24} color={Colors.neutral.mediumGrey} />
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>

      {/* Items */}
      <View style={styles.itemsList}>
        {item.items.map((itemName, index) => (
          <View key={index} style={styles.itemRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.primary.deepPlum} />
            <Text style={styles.itemText}>{itemName}</Text>
          </View>
        ))}
      </View>

      {/* Scheduled Time */}
      <View style={styles.timeRow}>
        <Ionicons name="time-outline" size={16} color={Colors.neutral.mediumGrey} />
        <Text style={styles.timeText}>Scheduled for {formatDateTime(item.scheduledFor)}</Text>
      </View>

      {/* Action Button */}
      {item.status === 'PENDING' && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => handleConfirmOrder(item.id)}
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.confirmButtonText}>Accept Order</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={80} color={Colors.neutral.mediumGrey} />
      <Text style={styles.emptyTitle}>
        {filter === 'PENDING' ? 'All caught up!' : 'No orders yet'}
      </Text>
      <Text style={styles.emptyText}>
        {filter === 'PENDING'
          ? "You don't have any pending orders right now"
          : 'New orders will show up here'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <Text style={styles.headerSubtitle}>
          {orders.filter(o => o.status === 'PENDING').length} waiting for you
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'ALL' && styles.filterTabActive]}
          onPress={() => setFilter('ALL')}
        >
          <Text style={[styles.filterTabText, filter === 'ALL' && styles.filterTabTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'PENDING' && styles.filterTabActive]}
          onPress={() => setFilter('PENDING')}
        >
          <Text style={[styles.filterTabText, filter === 'PENDING' && styles.filterTabTextActive]}>
            Pending
          </Text>
          {orders.filter(o => o.status === 'PENDING').length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {orders.filter(o => o.status === 'PENDING').length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'CONFIRMED' && styles.filterTabActive]}
          onPress={() => setFilter('CONFIRMED')}
        >
          <Text style={[styles.filterTabText, filter === 'CONFIRMED' && styles.filterTabTextActive]}>
            Confirmed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
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
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.pill,
    gap: Spacing.xs,
  },
  filterTabActive: {
    backgroundColor: Colors.primary.deepPlum,
  },
  filterTabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.mediumGrey,
  },
  filterTabTextActive: {
    color: Colors.neutral.white,
  },
  badge: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.pill,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
  },
  listContent: {
    padding: Spacing.lg,
  },
  orderCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.pill,
    marginBottom: Spacing.md,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.white,
    textTransform: 'uppercase',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  customerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
  },
  orderTotal: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
  },
  itemsList: {
    marginBottom: Spacing.md,
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
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  timeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  confirmButton: {
    backgroundColor: Colors.primary.deepPlum,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  confirmButtonText: {
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
    color: Colors.neutral.darkText,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    textAlign: 'center',
  },
});
