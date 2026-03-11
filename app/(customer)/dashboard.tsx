/**
 * Customer Dashboard - Professional Overview
 * Shows personalized shopping experience, orders, favorites, and recommendations
 */

import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CustomerDashboardScreen() {
  const router = useRouter();
  const cardWidth = (width - Spacing.xl * 3) / 2;

  // Stats data
  const stats = [
    { label: 'Active Orders', value: '2', change: 'In Transit', icon: 'cart', color: Colors.primary.deepPlum },
    { label: 'Cart Items', value: '5', change: '$127.45', icon: 'bag-handle', color: Colors.secondary.softGold },
    { label: 'Saved Items', value: '12', change: 'Favorites', icon: 'heart', color: '#E94B8B' },
    { label: 'Points Balance', value: '850', change: '$8.50 Value', icon: 'star', color: '#7C3AED' },
  ];

  // Quick actions
  const quickActions = [
    { title: 'Shop Now', icon: 'storefront', route: '/(customer)/shop', gradient: [Colors.primary.lightPlum, Colors.primary.deepPlum] as const },
    { title: 'Track Order', icon: 'location', route: '/(customer)/orders', gradient: [Colors.secondary.softGold, Colors.secondary.champagneGold] as const },
    { title: 'Favorites', icon: 'heart', route: '/(customer)/favorites', gradient: ['#E94B8B', '#D63384'] as const },
    { title: 'Rewards', icon: 'gift', route: '/(customer)/rewards', gradient: [Colors.secondary.softGold, '#D4AF37'] as const },
  ];

  // Recent orders
  const recentOrders = [
    { id: '1', text: 'Order #ORD-1234 delivered', time: '2 hours ago', icon: 'checkmark-circle', color: Colors.semantic.success },
    { id: '2', text: 'Order #ORD-1235 out for delivery', time: '5 hours ago', icon: 'bicycle', color: Colors.secondary.softGold },
    { id: '3', text: '3 items added to favorites', time: '1 day ago', icon: 'heart', color: '#E94B8B' },
  ];

  return (
    <SafeAreaView style={styles.container as any} edges={['top']}>
      <ScrollView style={styles.scrollView as any} contentContainerStyle={styles.scrollContent as any}>
        {/* Header */}
        <View style={styles.header as any}>
          <View>
            <Text style={styles.greeting as any}>Welcome Back</Text>
            <Text style={styles.title as any}>Your Beauty Journey</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton as any}>
            <Ionicons name="notifications-outline" size={24} color={Colors.primary.deepPlum} />
            <View style={styles.notificationBadge as any} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer as any}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { width: cardWidth }] as any}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + '15' }] as any}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue as any}>{stat.value}</Text>
              <Text style={styles.statLabel as any}>{stat.label}</Text>
              <Text style={[styles.statChange, { color: stat.color }] as any}>{stat.change}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section as any}>
          <Text style={styles.sectionTitle as any}>Quick Actions</Text>
          <View style={styles.actionsGrid as any}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(action.route as any)} activeOpacity={0.8} style={styles.actionCard as any}>
                <LinearGradient colors={action.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.actionGradient as any}>
                  <Ionicons name={action.icon as any} size={24} color={Colors.neutral.white} />
                  <Text style={styles.actionTitle as any}>{action.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section as any}>
          <Text style={styles.sectionTitle as any}>Recent Activity</Text>
          <View style={styles.activityContainer as any}>
            {recentOrders.map((order) => (
              <View key={order.id} style={styles.activityItem as any}>
                <View style={[styles.activityIcon, { backgroundColor: order.color + '15' }] as any}>
                  <Ionicons name={order.icon as any} size={18} color={order.color} />
                </View>
                <View style={styles.activityContent as any}>
                  <Text style={styles.activityText as any}>{order.text}</Text>
                  <Text style={styles.activityTime as any}>{order.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Products */}
        <View style={styles.section as any}>
          <Text style={styles.sectionTitle as any}>Recommended for You</Text>
          <View style={styles.chartCard as any}>
            <MaterialCommunityIcons name="star-box-multiple" size={48} color={Colors.neutral.mediumGrey} />
            <Text style={styles.chartText as any}>Personalized Picks</Text>
            <Text style={styles.chartSubtext as any}>Shop to see recommendations based on your preferences</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.blushCream },
  scrollView: { flex: 1 },
  scrollContent: { padding: Spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.xl },
  greeting: { fontSize: Typography.fontSize.sm, color: Colors.secondary.softGold, fontFamily: Typography.fontFamily.bodyMedium, letterSpacing: Typography.letterSpacing.wide, textTransform: 'uppercase' },
  title: { fontSize: Typography.fontSize['3xl'], fontFamily: Typography.fontFamily.heading, color: Colors.primary.deepPlum, marginTop: Spacing.xs, letterSpacing: Typography.letterSpacing.tight },
  notificationButton: { width: 40, height: 40, borderRadius: BorderRadius.pill, backgroundColor: Colors.neutral.white, justifyContent: 'center', alignItems: 'center', ...Shadows.subtle },
  notificationBadge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: BorderRadius.pill, backgroundColor: Colors.semantic.error },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.base, marginBottom: Spacing.xl },
  statCard: { backgroundColor: Colors.neutral.white, borderRadius: BorderRadius.lg, padding: Spacing.base, ...Shadows.subtle },
  statIconContainer: { width: 40, height: 40, borderRadius: BorderRadius.pill, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.sm },
  statValue: { fontSize: Typography.fontSize['2xl'], fontFamily: Typography.fontFamily.heading, color: Colors.neutral.darkText, marginBottom: Spacing.xs },
  statLabel: { fontSize: Typography.fontSize.xs, fontFamily: Typography.fontFamily.body, color: Colors.neutral.mutedText, marginBottom: Spacing.xs },
  statChange: { fontSize: Typography.fontSize.xs, fontFamily: Typography.fontFamily.bodySemiBold },
  section: { marginBottom: Spacing.xl },
  sectionTitle: { fontSize: Typography.fontSize.lg, fontFamily: Typography.fontFamily.heading, color: Colors.primary.deepPlum, marginBottom: Spacing.base, letterSpacing: Typography.letterSpacing.tight },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.base },
  actionCard: { width: (width - Spacing.xl * 3) / 2, borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadows.subtle },
  actionGradient: { padding: Spacing.lg, alignItems: 'center', gap: Spacing.sm },
  actionTitle: { fontSize: Typography.fontSize.sm, fontFamily: Typography.fontFamily.bodySemiBold, color: Colors.neutral.white, textAlign: 'center' },
  activityContainer: { backgroundColor: Colors.neutral.white, borderRadius: BorderRadius.lg, padding: Spacing.base, gap: Spacing.base, ...Shadows.subtle },
  activityItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  activityIcon: { width: 36, height: 36, borderRadius: BorderRadius.pill, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: Typography.fontSize.sm, fontFamily: Typography.fontFamily.body, color: Colors.neutral.darkText, marginBottom: Spacing.xs / 2 },
  activityTime: { fontSize: Typography.fontSize.xs, fontFamily: Typography.fontFamily.body, color: Colors.neutral.mutedText },
  chartCard: { backgroundColor: Colors.neutral.white, borderRadius: BorderRadius.lg, padding: Spacing.xl, alignItems: 'center', ...Shadows.subtle },
  chartText: { fontSize: Typography.fontSize.base, fontFamily: Typography.fontFamily.heading, color: Colors.primary.deepPlum, marginTop: Spacing.base, marginBottom: Spacing.xs },
  chartSubtext: { fontSize: Typography.fontSize.sm, fontFamily: Typography.fontFamily.body, color: Colors.neutral.mutedText, textAlign: 'center' },
});
