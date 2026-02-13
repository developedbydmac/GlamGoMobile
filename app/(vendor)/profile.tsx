import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/DesignSystem';

export default function VendorProfileScreen() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/browse');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="business" size={80} color={Colors.secondary.champagneGold} />
          <Text style={styles.title}>Store Profile</Text>
          <Text style={styles.subtitle}>Manage your business</Text>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="storefront" size={24} color={Colors.secondary.champagneGold} />
            <Text style={styles.menuText}>Store Details</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.neutral.mediumGrey} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="time" size={24} color={Colors.secondary.champagneGold} />
            <Text style={styles.menuText}>Business Hours</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.neutral.mediumGrey} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card" size={24} color={Colors.secondary.champagneGold} />
            <Text style={styles.menuText}>Payment Settings</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.neutral.mediumGrey} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications" size={24} color={Colors.secondary.champagneGold} />
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.neutral.mediumGrey} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.signOutButton]} onPress={handleSignOut}>
            <Ionicons name="log-out" size={24} color={Colors.semantic.error} />
            <Text style={[styles.menuText, styles.signOutText]}>Sign Out</Text>
          </TouchableOpacity>
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
    color: Colors.secondary.champagneGold,
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
    gap: Spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  menuText: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.darkGrey,
  },
  signOutButton: {
    marginTop: Spacing.xl,
  },
  signOutText: {
    color: Colors.semantic.error,
  },
});
