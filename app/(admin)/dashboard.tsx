import { Colors, Shadows, Spacing, Typography } from "@/constants/DesignSystem";
import { useUserRole } from "@/hooks/useUserRole";
import {
    listPendingUsers,
    updateUserProfileStatus,
    type UserProfileData,
} from "@/services/userProfile";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Admin Dashboard
 *
 * Displays pending users and allows admin to approve/suspend them.
 * Only accessible by users with ADMIN role.
 */
export default function AdminDashboard() {
  const { user } = useUserRole();
  const [pendingUsers, setPendingUsers] = useState<UserProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    try {
      setLoading(true);
      const users = await listPendingUsers();
      // Sort by createdAt (newest first)
      const sorted = users.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
      setPendingUsers(sorted);
    } catch (error) {
      Alert.alert("Error", "Failed to load pending users");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPendingUsers();
    setRefreshing(false);
  };

  const handleApprove = async (profile: UserProfileData) => {
    if (!user?.userId) {
      Alert.alert("Error", "Admin user ID not found");
      return;
    }

    Alert.alert(
      "Approve User",
      `Approve ${profile.name || profile.email} as ${profile.role}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Approve",
          style: "default",
          onPress: async () => {
            try {
              setProcessingUserId(profile.userId);
              // @ts-ignore - id field exists on profile
              const success = await updateUserProfileStatus(
                profile.id,
                "APPROVED",
                user.userId,
              );

              if (success) {
                Alert.alert(
                  "Success",
                  `${profile.name || profile.email} has been approved!`,
                );
                await loadPendingUsers(); // Refresh list
              } else {
                Alert.alert("Error", "Failed to approve user");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to approve user");
            } finally {
              setProcessingUserId(null);
            }
          },
        },
      ],
    );
  };

  const handleSuspend = async (profile: UserProfileData) => {
    if (!user?.userId) {
      Alert.alert("Error", "Admin user ID not found");
      return;
    }

    Alert.alert(
      "Suspend User",
      `Suspend ${profile.name || profile.email}? They will not be able to access the platform.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Suspend",
          style: "destructive",
          onPress: async () => {
            try {
              setProcessingUserId(profile.userId);
              // @ts-ignore - id field exists on profile
              const success = await updateUserProfileStatus(
                profile.id,
                "SUSPENDED",
                user.userId,
              );

              if (success) {
                Alert.alert(
                  "Success",
                  `${profile.name || profile.email} has been suspended.`,
                );
                await loadPendingUsers(); // Refresh list
              } else {
                Alert.alert("Error", "Failed to suspend user");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to suspend user");
            } finally {
              setProcessingUserId(null);
            }
          },
        },
      ],
    );
  };

  const renderUserCard = ({ item }: { item: UserProfileData }) => {
    const isProcessing = processingUserId === item.userId;
    const roleEmoji =
      item.role === "VENDOR" ? "💅" : item.role === "DRIVER" ? "🚗" : "👤";
    const createdDate = item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "Unknown";

    return (
      <View style={styles.userCard}>
        <View style={styles.userHeader}>
          <View style={styles.userIconContainer}>
            <Text style={styles.userIcon}>{roleEmoji}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {item.name || "No name provided"}
            </Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userRole}>{item.role}</Text>
            <Text style={styles.userDate}>Applied: {createdDate}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.approveButton,
              isProcessing && styles.buttonDisabled,
            ]}
            onPress={() => handleApprove(item)}
            disabled={isProcessing}
            activeOpacity={0.7}
          >
            <Text style={styles.approveButtonText}>
              {isProcessing ? "..." : "✓ Approve"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.suspendButton,
              isProcessing && styles.buttonDisabled,
            ]}
            onPress={() => handleSuspend(item)}
            disabled={isProcessing}
            activeOpacity={0.7}
          >
            <Text style={styles.suspendButtonText}>
              {isProcessing ? "..." : "✕ Suspend"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary.lightPlum, Colors.primary.deepPlum]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>User Approval Management</Text>
      </LinearGradient>

      <View style={styles.content}>
        {loading && !refreshing ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Loading pending users...</Text>
          </View>
        ) : pendingUsers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptyText}>
              No pending approvals at the moment.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.statsBar}>
              <Text style={styles.statsText}>
                {pendingUsers.length} pending approval
                {pendingUsers.length !== 1 ? "s" : ""}
              </Text>
            </View>
            <FlatList
              data={pendingUsers}
              renderItem={renderUserCard}
              keyExtractor={(item) => item.userId}
              contentContainerStyle={styles.list}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={Colors.primary.deepPlum}
                />
              }
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    ...Shadows.medium,
  },
  title: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.white,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  statsBar: {
    backgroundColor: Colors.neutral.blushCream,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#E7D9EA",
  },
  statsText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
  },
  list: {
    padding: Spacing.base,
  },
  userCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    ...Shadows.light,
    borderWidth: 1,
    borderColor: "#E7D9EA",
  },
  userHeader: {
    flexDirection: "row",
    marginBottom: Spacing.base,
  },
  userIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.neutral.blushCream,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.base,
  },
  userIcon: {
    fontSize: 30,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.black,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: Typography.fontSize.sm,
    color: "#8C7A9A",
    marginBottom: 2,
  },
  userRole: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
    marginBottom: 2,
  },
  userDate: {
    fontSize: Typography.fontSize.xs,
    color: "#E7D9EA",
  },
  actionButtons: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  approveButton: {
    flex: 1,
    backgroundColor: "#10B981", // Green
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: "center",
    ...Shadows.light,
  },
  approveButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.white,
  },
  suspendButton: {
    flex: 1,
    backgroundColor: "#EF4444", // Red
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: "center",
    ...Shadows.light,
  },
  suspendButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.white,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: Spacing.base,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.black,
    marginBottom: Spacing.xs,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: "#8C7A9A",
    textAlign: "center",
  },
});
