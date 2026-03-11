/**
 * Driver Dashboard - Professional Overview
 * Shows earnings, stats, quick actions, and recent deliveries
 */

import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function DriverDashboardScreen() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const cardWidth = (width - Spacing.xl * 3) / 2;

  // Stats data
  const stats = [
    { label: "Today's Earnings", value: '$124', change: '+12%', icon: 'cash', color: Colors.semantic.success },
    { label: 'Completed', value: '8', change: 'Deliveries', icon: 'checkmark-circle', color: Colors.primary.deepPlum },
    { label: 'Active Delivery', value: '1', change: 'In Progress', icon: 'bicycle', color: Colors.secondary.softGold },
    { label: 'Rating', value: '4.9', change: '⭐ Excellent', icon: 'star', color: '#7C3AED' },
  ];

  // Quick actions
  const quickActions = [
    { title: 'Available Orders', icon: 'list', route: '/(driver)/available', gradient: [Colors.primary.lightPlum, Colors.primary.deepPlum] as const },
    { title: 'Earnings', icon: 'wallet', route: '/(driver)/earnings', gradient: [Colors.semantic.success, '#10B981'] as const },
    { title: 'Support', icon: 'help-circle', route: '/(driver)/support', gradient: [Colors.secondary.softGold, Colors.secondary.champagneGold] as const },
    { title: 'Settings', icon: 'settings', route: '/(driver)/settings', gradient: ['#7C3AED', '#6D28D9'] as const },
  ];

  // Recent deliveries
  const recentDeliveries = [
    { id: '1', text: 'Completed delivery to West LA', time: '15 min ago', icon: 'checkmark-circle', color: Colors.semantic.success },
    { id: '2', text: 'Earned $15.00 delivery fee', time: '15 min ago', icon: 'cash', color: Colors.semantic.success },
    { id: '3', text: '2 new orders available nearby', time: '1 hour ago', icon: 'notifications', color: Colors.secondary.softGold },
  ];

  return (
    <SafeAreaView style={styles.container as any} edges={['top']}>
      <ScrollView style={styles.scrollView as any} contentContainerStyle={styles.scrollContent as any}>
        {/* Header with Online Toggle */}
        <View style={styles.header as any}>
          <View>
            <Text style={styles.greeting as any}>Welcome Back</Text>
            <Text style={styles.title as any}>Ready to Drive?</Text>
          </View>
          <View style={styles.onlineToggleContainer as any}>
            <Text style={[styles.onlineText, isOnline && styles.onlineTextActive] as any}>{isOnline ? 'Online' : 'Offline'}</Text>
            <Switch value={isOnline} onValueChange={setIsOnline} trackColor={{ false: Colors.neutral.mediumGrey, true: Colors.semantic.success }} thumbColor={Colors.neutral.white} ios_backgroundColor={Colors.neutral.mediumGrey} />
          </View>
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
            {recentDeliveries.map((delivery) => (
              <View key={delivery.id} style={styles.activityItem as any}>
                <View style={[styles.activityIcon, { backgroundColor: delivery.color + '15' }] as any}>
                  <Ionicons name={delivery.icon as any} size={18} color={delivery.color} />
                </View>
                <View style={styles.activityContent as any}>
                  <Text style={styles.activityText as any}>{delivery.text}</Text>
                  <Text style={styles.activityTime as any}>{delivery.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Map Placeholder */}
        <View style={styles.section as any}>
          <Text style={styles.sectionTitle as any}>Delivery Zones</Text>
          <View style={styles.mapCard as any}>
            <MaterialCommunityIcons name="map-marker-radius" size={48} color={Colors.neutral.mediumGrey} />
            <Text style={styles.mapText as any}>Your Active Zones</Text>
            <Text style={styles.mapSubtext as any}>Deliveries available within 5 miles</Text>
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
  onlineToggleContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.neutral.white, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.base, borderRadius: BorderRadius.pill, gap: Spacing.sm, ...Shadows.subtle },
  onlineText: { fontSize: Typography.fontSize.sm, fontFamily: Typography.fontFamily.bodySemiBold, color: Colors.neutral.mutedText },
  onlineTextActive: { color: Colors.semantic.success },
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
  mapCard: { backgroundColor: Colors.neutral.white, borderRadius: BorderRadius.lg, padding: Spacing.xl, alignItems: 'center', ...Shadows.subtle },
  mapText: { fontSize: Typography.fontSize.base, fontFamily: Typography.fontFamily.heading, color: Colors.primary.deepPlum, marginTop: Spacing.base, marginBottom: Spacing.xs },
  mapSubtext: { fontSize: Typography.fontSize.sm, fontFamily: Typography.fontFamily.body, color: Colors.neutral.mutedText, textAlign: 'center' },
});
