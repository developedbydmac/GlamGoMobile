import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
} from "@/constants/DesignSystem";
import {
    getVendorOrders,
    updateOrderStatus,
    type OrderStatus,
    type Order as VendorOrder,
} from "@/services/orderService";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: "PENDING" | "CONFIRMED" | "PICKED_UP" | "DELIVERED" | "CANCELLED";
  scheduledFor: string;
  createdAt: string;
}

export default function VendorOrdersScreen() {
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "CONFIRMED">("ALL");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const result = await getVendorOrders();
      setOrders(result);
    } catch (error) {
      Alert.alert("Error", "Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
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
      "Accept this order?",
      "The customer will be notified right away",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept",
          onPress: async () => {
            try {
              await updateOrderStatus(orderId, "CONFIRMED");
              await loadOrders(); // Reload to show updated status
              Alert.alert("Done! ✅", "Customer has been notified");
            } catch (error) {
              Alert.alert("Oops!", "Something went wrong. Try again?");
            }
          },
        },
      ],
    );
  };

  const handleDeclineOrder = async (orderId: string) => {
    Alert.alert("Decline this order?", "Are you sure you want to decline?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Decline",
        style: "destructive",
        onPress: async () => {
          try {
            await updateOrderStatus(orderId, "CANCELLED");
            await loadOrders(); // Reload to show updated status
            Alert.alert("Order Declined", "The order has been cancelled");
          } catch (error) {
            Alert.alert("Oops!", "Something went wrong. Try again?");
          }
        },
      },
    ]);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return Colors.semantic.warning;
      case "CONFIRMED":
        return Colors.primary.deepPlum;
      case "PICKED_UP":
        return Colors.semantic.info;
      case "DELIVERED":
        return Colors.semantic.success;
      case "CANCELLED":
        return Colors.semantic.error;
      default:
        return Colors.neutral.mediumGrey;
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "Needs your attention";
      case "CONFIRMED":
        return "Ready for pickup";
      case "PICKED_UP":
        return "Out for delivery";
      case "DELIVERED":
        return "Completed";
      case "CANCELLED":
        return "Cancelled";
      default:
        return status;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "ALL") return true;
    return order.status === filter;
  });

  const renderOrder = ({ item }: { item: VendorOrder }) => (
    <View style={styles.orderCard}>
      {/* Status Badge */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      >
        <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
      </View>

      {/* Order Info */}
      <View style={styles.orderHeader}>
        <View style={styles.customerInfo}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={Colors.neutral.mediumGrey}
          />
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <Text style={styles.orderTotal}>${item.totalAmount.toFixed(2)}</Text>
      </View>

      {/* Delivery Address */}
      <View style={styles.addressContainer}>
        <Ionicons
          name="location-outline"
          size={16}
          color={Colors.neutral.mediumGrey}
        />
        <Text style={styles.addressText}>
          {item.deliveryAddress}, {item.deliveryCity}, {item.deliveryState}{" "}
          {item.deliveryZipCode}
        </Text>
      </View>

      {/* Notes */}
      {item.notes && (
        <View style={styles.notesContainer}>
          <Ionicons
            name="document-text-outline"
            size={16}
            color={Colors.neutral.mediumGrey}
          />
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      {/* Created Time */}
      <View style={styles.timeRow}>
        <Ionicons
          name="time-outline"
          size={16}
          color={Colors.neutral.mediumGrey}
        />
        <Text style={styles.timeText}>
          Ordered {formatDateTime(item.createdAt || "")}
        </Text>
      </View>

      {/* Action Buttons */}
      {item.status === "PENDING" && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => handleDeclineOrder(item.id)}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={Colors.semantic.error}
            />
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => handleConfirmOrder(item.id)}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.confirmButtonText}>Accept Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="receipt-outline"
        size={80}
        color={Colors.neutral.mediumGrey}
      />
      <Text style={styles.emptyTitle}>
        {filter === "PENDING" ? "All caught up!" : "No orders yet"}
      </Text>
      <Text style={styles.emptyText}>
        {filter === "PENDING"
          ? "You don't have any pending orders right now"
          : "New orders will show up here"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <Text style={styles.headerSubtitle}>
          {orders.filter((o) => o.status === "PENDING").length} waiting for you
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, filter === "ALL" && styles.filterTabActive]}
          onPress={() => setFilter("ALL")}
        >
          <Text
            style={[
              styles.filterTabText,
              filter === "ALL" && styles.filterTabTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === "PENDING" && styles.filterTabActive,
          ]}
          onPress={() => setFilter("PENDING")}
        >
          <Text
            style={[
              styles.filterTabText,
              filter === "PENDING" && styles.filterTabTextActive,
            ]}
          >
            Pending
          </Text>
          {orders.filter((o) => o.status === "PENDING").length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {orders.filter((o) => o.status === "PENDING").length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === "CONFIRMED" && styles.filterTabActive,
          ]}
          onPress={() => setFilter("CONFIRMED")}
        >
          <Text
            style={[
              styles.filterTabText,
              filter === "CONFIRMED" && styles.filterTabTextActive,
            ]}
          >
            Confirmed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.deepPlum} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      ) : (
        /* Orders List */
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}
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
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  filterTabs: {
    flexDirection: "row",
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
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
    alignSelf: "flex-start",
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.pill,
    marginBottom: Spacing.md,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.white,
    textTransform: "uppercase",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  itemText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  timeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  addressText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  notesContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.xs,
    marginBottom: Spacing.md,
    padding: Spacing.sm,
    backgroundColor: Colors.neutral.blushCream,
    borderRadius: BorderRadius.md,
  },
  notesText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.darkText,
    fontStyle: "italic",
  },
  actionButtons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  declineButton: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.semantic.error,
  },
  declineButtonText: {
    color: Colors.semantic.error,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold as any,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
  },
  confirmButton: {
    backgroundColor: Colors.primary.deepPlum,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
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
    textAlign: "center",
  },
});
