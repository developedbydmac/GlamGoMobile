import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
} from "@/constants/DesignSystem";
import {
    assignDriverToOrder,
    getAllDrivers,
    type Driver,
} from "@/services/driverService";
import { getAllPendingOrders, type Order } from "@/services/orderService";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Admin Orders Screen
 * Allows admins to view pending orders and assign drivers
 */
export default function AdminOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrivers, setSelectedDrivers] = useState<{
    [orderId: string]: string;
  }>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, driversData] = await Promise.all([
        getAllPendingOrders(),
        getAllDrivers(),
      ]);
      setOrders(ordersData);
      setDrivers(driversData);
    } catch (error) {
      Alert.alert("Error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignDriver = async (orderId: string) => {
    const driverId = selectedDrivers[orderId];
    if (!driverId) {
      Alert.alert("Error", "Please select a driver first");
      return;
    }

    const driver = drivers.find((d) => d.userId === driverId);
    if (!driver) {
      Alert.alert("Error", "Driver not found");
      return;
    }

    Alert.alert("Assign Driver", `Assign ${driver.name} to this order?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Assign",
        onPress: async () => {
          try {
            await assignDriverToOrder(orderId, driver.userId, driver.name);
            Alert.alert("Success", "Driver assigned successfully");
            await loadData(); // Refresh
          } catch (error) {
            Alert.alert("Error", "Failed to assign driver");
          }
        },
      },
    ]);
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>Order #{item.id.slice(-6)}</Text>
        <Text style={styles.orderAmount}>${item.totalAmount.toFixed(2)}</Text>
      </View>

      <View style={styles.orderDetail}>
        <Ionicons
          name="person-outline"
          size={16}
          color={Colors.neutral.mediumGrey}
        />
        <Text style={styles.detailText}>{item.customerName}</Text>
      </View>

      <View style={styles.orderDetail}>
        <Ionicons
          name="location-outline"
          size={16}
          color={Colors.neutral.mediumGrey}
        />
        <Text style={styles.detailText}>
          {item.deliveryCity}, {item.deliveryState}
        </Text>
      </View>

      <View style={styles.driverSection}>
        <Text style={styles.driverLabel}>Assign Driver:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDrivers[item.id] || ""}
            onValueChange={(value) =>
              setSelectedDrivers((prev) => ({ ...prev, [item.id]: value }))
            }
            style={styles.picker}
          >
            <Picker.Item label="Select a driver..." value="" />
            {drivers.map((driver) => (
              <Picker.Item
                key={driver.userId}
                label={driver.name}
                value={driver.userId}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={[
            styles.assignButton,
            !selectedDrivers[item.id] && styles.assignButtonDisabled,
          ]}
          onPress={() => handleAssignDriver(item.id)}
          disabled={!selectedDrivers[item.id]}
        >
          <Text style={styles.assignButtonText}>Assign</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="checkmark-circle-outline"
        size={80}
        color={Colors.neutral.mediumGrey}
      />
      <Text style={styles.emptyText}>No pending orders</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.deepPlum} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Management</Text>
        <Text style={styles.headerSubtitle}>
          {orders.length} pending {orders.length === 1 ? "order" : "orders"}
        </Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
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
  listContent: {
    padding: Spacing.lg,
  },
  orderCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  orderTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
  },
  orderAmount: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
  },
  orderDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  driverSection: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lightGrey,
  },
  driverLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.sm,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  assignButton: {
    backgroundColor: Colors.primary.deepPlum,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  assignButtonDisabled: {
    backgroundColor: Colors.neutral.mediumGrey,
    opacity: 0.5,
  },
  assignButtonText: {
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
  emptyText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.lg,
  },
});
