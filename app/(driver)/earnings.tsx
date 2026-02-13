import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '@/constants/DesignSystem';

export default function DriverEarningsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="cash" size={48} color="#2196F3" />
          <Text style={styles.title}>Earnings</Text>
          <Text style={styles.subtitle}>Track your income</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsValue}>$0.00</Text>
            <Text style={styles.earningsLabel}>Today's Earnings</Text>
          </View>

          <View style={styles.earningsCard}>
            <Text style={styles.earningsValue}>$0.00</Text>
            <Text style={styles.earningsLabel}>This Week</Text>
          </View>

          <View style={styles.earningsCard}>
            <Text style={styles.earningsValue}>0</Text>
            <Text style={styles.earningsLabel}>Completed Deliveries</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.softWhite,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: '#2196F3',
    marginTop: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  earningsCard: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.xl,
    borderRadius: 12,
    alignItems: 'center',
  },
  earningsValue: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: '#2196F3',
  },
  earningsLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
});
