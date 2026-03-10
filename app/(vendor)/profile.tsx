import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signOutFromCognito } from '@/services/cognitoAuth';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/DesignSystem';

export default function VendorProfileScreen() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutFromCognito();
      // Use push instead of replace so navigation history is maintained
      router.push('/browse' as any);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleSwitchRole = async () => {
    try {
      await signOutFromCognito();
      // Navigate to sign-in to choose a different role
      router.push('/(auth)/sign-in' as any);
    } catch (error) {
      console.error('Switch role error:', error);
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

          {/* Switch Role Button */}
          <TouchableOpacity style={[styles.menuItem, styles.switchRoleButton]} onPress={handleSwitchRole}>
            <Ionicons name="swap-horizontal" size={24} color={Colors.primary.deepPlum} />
            <Text style={[styles.menuText, styles.switchRoleText]}>Switch Role</Text>
            <Ionicons name="arrow-forward" size={24} color={Colors.primary.deepPlum} />
          </TouchableOpacity>

          {/* Sign Out Button */}
          <TouchableOpacity style={[styles.menuItem, styles.signOutButton]} onPress={handleSignOut}>
            <Ionicons name="log-out" size={24} color={Colors.semantic.error} />
            <Text style={[styles.menuText, styles.signOutText]}>Sign Out & Browse</Text>
          </TouchableOpacity>
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
    color: Colors.neutral.darkText,
  },
  signOutButton: {
    marginTop: Spacing.xl,
  },
  signOutText: {
    color: Colors.semantic.error,
  },
  switchRoleButton: {
    marginTop: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.primary.deepPlum,
    backgroundColor: Colors.neutral.blushCream,
  },
  switchRoleText: {
    color: Colors.primary.deepPlum,
  },
});
