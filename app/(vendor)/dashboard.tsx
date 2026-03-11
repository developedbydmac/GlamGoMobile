import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing.xl * 3) / 2;

export default function VendorDashboardScreen() {
  const router = useRouter();

  const stats = [
    { label: "Today's Revenue", value: '$0', change: '+0%', icon: 'cash', color: Colors.semantic.success },
    { label: 'Active Orders', value: '0', change: '+0%', icon: 'cart', color: Colors.primary.deepPlum },
    { label: 'Total Products', value: '0', change: '+0%', icon: 'cube', color: Colors.secondary.softGold },
    { label: 'New Customers', value: '0', change: '+0%', icon: 'people', color: Colors.primary.lavender },
  ];

  const quickActions = [
    { title: 'Add Product', icon: 'add-circle', route: '/add-product', gradient: [Colors.primary.lightPlum, Colors.primary.deepPlum] as const },
    { title: 'View Orders', icon: 'receipt', route: '/(vendor)/orders', gradient: [Colors.secondary.darkGold, Colors.secondary.champagneGold] as const },
    { title: 'Inventory', icon: 'layers', route: '/(vendor)/products', gradient: [Colors.primary.lavender, Colors.primary.deepPlum] as const },
    { title: 'Analytics', icon: 'analytics', route: '/(vendor)/dashboard', gradient: [Colors.secondary.softGold, Colors.secondary.darkGold] as const },
  ];

  const recentActivity = [
    { id: '1', text: 'New order #1234 received', time: '2 min ago', icon: 'notifications', color: Colors.semantic.success },
    { id: '2', text: 'Product "Luxury Serum" is low on stock', time: '1 hour ago', icon: 'warning', color: Colors.semantic.warning },
    { id: '3', text: 'Payment of $250 processed', time: '3 hours ago', icon: 'checkmark-circle', color: Colors.semantic.success },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome Back</Text>
            <Text style={styles.title}>Your Beauty Business</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={Colors.primary.deepPlum} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? Colors.semantic.success : Colors.semantic.error }]}>
                {stat.change}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={action.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionGradient}
                >
                  <Ionicons name={action.icon as any} size={32} color={Colors.neutral.white} />
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                  <Ionicons name={activity.icon as any} size={20} color={activity.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Performance Chart Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales Overview</Text>
          <View style={styles.chartCard}>
            <MaterialCommunityIcons name="chart-line" size={48} color={Colors.neutral.mediumGrey} />
            <Text style={styles.chartText}>No sales data yet</Text>
            <Text style={styles.chartSubtext}>Start selling to see your performance</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mutedText,
    fontFamily: Typography.fontFamily.body,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.deepPlum,
    fontFamily: Typography.fontFamily.heading,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.subtle,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.semantic.error,
    borderWidth: 2,
    borderColor: Colors.neutral.white,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.base,
    marginBottom: Spacing.xl,
  },
  statCard: {
    width: cardWidth,
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadows.subtle,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.darkText,
    fontFamily: Typography.fontFamily.bodySemiBold,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mutedText,
    fontFamily: Typography.fontFamily.body,
    marginBottom: Spacing.xs,
  },
  statChange: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.bodyMedium,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
    fontFamily: Typography.fontFamily.heading,
    marginBottom: Spacing.base,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
  },
  actionCard: {
    width: cardWidth,
    height: 120,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.subtle,
  },
  actionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.base,
  },
  actionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.white,
    fontFamily: Typography.fontFamily.bodySemiBold,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadows.subtle,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.darkText,
    fontFamily: Typography.fontFamily.body,
    marginBottom: Spacing.xs,
  },
  activityTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mutedText,
    fontFamily: Typography.fontFamily.body,
  },
  chartCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    ...Shadows.subtle,
  },
  chartText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.mutedText,
    fontFamily: Typography.fontFamily.bodyMedium,
    marginTop: Spacing.base,
  },
  chartSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    fontFamily: Typography.fontFamily.body,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
});
