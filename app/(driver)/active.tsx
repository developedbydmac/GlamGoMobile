import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
} from "@/constants/DesignSystem";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { getMyDeliveries, updateOrderStatus } from '@/services/orderService';

interface ActiveDelivery {
  id: string;
  status: "PICKED_UP" | "DELIVERED";
  storeName: string;
  storeAddress: string;
  customerName: string;
  deliveryAddress: string;
  deliveryFee: number;
  pickedUpAt?: string;
  items: string[];
}

export default function DriverActiveScreen() {
  const [deliveries, setDeliveries] = useState<ActiveDelivery[]>([
    // Mock data - will replace with getMyDeliveries()
    {
      id: "1",
      status: "PICKED_UP",
      storeName: "Glam Studio",
      storeAddress: "123 Sunset Blvd, Los Angeles",
      customerName: "Sarah Johnson",
      deliveryAddress: "456 Palm Ave, Los Angeles, CA 90001",
      deliveryFee: 12.5,
      pickedUpAt: "2024-03-05T14:15:00",
      items: ["Classic Blowout", "Gel Manicure"],
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const loadDeliveries = async () => {
    try {
      // TODO: Replace with real API call
      // const result = await getMyDeliveries();
      // Filter for only PICKED_UP status
      // setDeliveries(result.filter(d => d.status === 'PICKED_UP'));
    } catch (error) {
      // Error loading deliveries
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeliveries();
    setRefreshing(false);
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  const handleCompleteDelivery = (delivery: ActiveDelivery) => {
    Alert.alert(
      "Mark as delivered?",
      `Confirm delivery to ${delivery.customerName}`,
      [
        { text: "Not yet", style: "cancel" },
        {
          text: "Delivered! ✓",
          onPress: async () => {
            try {
              // TODO: Replace with real API call
              // await updateOrderStatus(delivery.id, 'DELIVERED');

              // Remove from active list (simulate completion)
              setDeliveries((prev) => prev.filter((d) => d.id !== delivery.id));

              Alert.alert(
                "Nice work! 🎉",
                `You earned $${delivery.deliveryFee.toFixed(2)}`,
              );
            } catch (error) {
              Alert.alert("Oops!", "Something went wrong. Try again?");
            }
          },
        },
      ],
    );
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const renderDelivery = ({ item }: { item: ActiveDelivery }) => (
    <View style={styles.deliveryCard}>
      {/* Status Badge */}
      <View style={styles.statusBadge}>
        <View style={styles.pulseDot} />
        <Text style={styles.statusText}>On the road</Text>
      </View>

      {/* Timeline */}
      <View style={styles.timeline}>
        {/* Pickup (Complete) */}
        <View style={styles.timelineStep}>
          <View style={styles.timelineIconComplete}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>Picked up from</Text>
            <Text style={styles.timelineName}>{item.storeName}</Text>
            <Text style={styles.timelineAddress}>{item.storeAddress}</Text>
            {item.pickedUpAt && (
              <Text style={styles.timelineTime}>
                at {formatTime(item.pickedUpAt)}
              </Text>
            )}
          </View>
        </View>

        {/* Connecting Line */}
        <View style={styles.timelineLine} />

        {/* Delivery (In Progress) */}
        <View style={styles.timelineStep}>
          <View style={styles.timelineIconActive}>
            <Ionicons name="navigate" size={16} color={Colors.semantic.info} />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>Heading to</Text>
            <Text style={styles.timelineName}>{item.customerName}</Text>
            <Text style={styles.timelineAddress}>{item.deliveryAddress}</Text>
          </View>
        </View>
      </View>

      {/* Items */}
      <View style={styles.itemsSection}>
        <Text style={styles.itemsTitle}>
          Delivering ({item.items.length} items)
        </Text>
        {item.items.map((itemName, index) => (
          <View key={index} style={styles.itemRow}>
            <Ionicons
              name="ellipse"
              size={6}
              color={Colors.neutral.mediumGrey}
            />
            <Text style={styles.itemText}>{itemName}</Text>
          </View>
        ))}
      </View>

      {/* Earning */}
      <View style={styles.earningRow}>
        <Text style={styles.earningLabel}>Delivery fee</Text>
        <Text style={styles.earningAmount}>${item.deliveryFee.toFixed(2)}</Text>
      </View>

      {/* Complete Button */}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => handleCompleteDelivery(item)}
      >
        <Ionicons name="checkmark-done" size={20} color="#fff" />
        <Text style={styles.completeButtonText}>Mark as Delivered</Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call" size={20} color={Colors.semantic.info} />
          <Text style={styles.actionText}>Call Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="navigate" size={20} color={Colors.semantic.info} />
          <Text style={styles.actionText}>Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="bicycle-outline"
        size={80}
        color={Colors.neutral.mediumGrey}
      />
      <Text style={styles.emptyTitle}>No active deliveries</Text>
      <Text style={styles.emptyText}>
        Head to Available tab to find delivery opportunities!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>On the Road</Text>
        <Text style={styles.headerSubtitle}>
          {deliveries.length}{" "}
          {deliveries.length === 1 ? "delivery" : "deliveries"} in progress
        </Text>
      </View>

      {/* Deliveries List */}
      <FlatList
        data={deliveries}
        renderItem={renderDelivery}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  listContent: {
    padding: Spacing.lg,
  },
  deliveryCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#E3F2FD",
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.pill,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.semantic.info,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.semantic.info,
  },
  timeline: {
    marginBottom: Spacing.lg,
  },
  timelineStep: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  timelineIconComplete: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.semantic.success,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineIconActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Spacing.md,
  },
  timelineLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.mediumGrey,
    textTransform: "uppercase" as const,
    marginBottom: Spacing.xs,
  },
  timelineName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.xs,
  },
  timelineAddress: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  timelineTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    fontStyle: "italic" as const,
  },
  timelineLine: {
    width: 2,
    height: 24,
    backgroundColor: Colors.neutral.lightGrey,
    marginLeft: 15,
    marginVertical: Spacing.xs,
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
    color: Colors.neutral.darkText,
    marginBottom: Spacing.sm,
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
  earningRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
    backgroundColor: "#F0FDF4",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  earningLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
  },
  earningAmount: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.semantic.success,
  },
  completeButton: {
    backgroundColor: Colors.semantic.success,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  completeButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold as any,
  },
  quickActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.semantic.info,
  },
  actionText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.semantic.info,
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
    textAlign: "center" as const,
    lineHeight: 22,
  },
});
