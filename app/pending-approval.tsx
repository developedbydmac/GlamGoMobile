import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Shadows } from '@/constants/DesignSystem';
import { signOutFromCognito } from '@/services/cognitoAuth';
import { useUserRole } from '@/hooks/useUserRole';

/**
 * Pending Approval Screen
 * 
 * Shown to VENDOR and DRIVER users with PENDING status.
 * Blocks access to role dashboards until admin approves.
 */
export default function PendingApprovalScreen() {
  const router = useRouter();
  const { role, user } = useUserRole();

  const handleSignOut = async () => {
    try {
      await signOutFromCognito();
      router.replace('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getRoleDisplay = () => {
    if (role === 'VENDOR') return 'Vendor';
    if (role === 'DRIVER') return 'Driver';
    return role;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary.lightPlum, Colors.primary.deepPlum]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⏳</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Application Under Review</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Thanks for signing up as a <Text style={styles.bold}>{getRoleDisplay()}</Text>!
          </Text>

          {/* Message Card */}
          <View style={styles.messageCard}>
            <Text style={styles.message}>
              Our team is reviewing your application.
            </Text>
            <Text style={styles.message}>
              You'll receive an email when you're approved.
            </Text>
          </View>

          {/* Timeline */}
          <View style={styles.timelineCard}>
            <Text style={styles.timelineText}>
              ⏱️ This usually takes <Text style={styles.bold}>1-2 business days</Text>
            </Text>
          </View>

          {/* User Info */}
          {user?.email && (
            <View style={styles.userInfo}>
              <Text style={styles.userInfoText}>Signed in as:</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          )}

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            activeOpacity={0.7}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          {/* Help Text */}
          <Text style={styles.helpText}>
            Questions? Contact support@glamgo.com
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.deepPlum,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.heavy,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.neutral.white,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  subtitle: {
    fontSize: Typography.fontSize["lg"],
    color: Colors.neutral.white,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    opacity: 0.9,
  },
  bold: {
    fontWeight: "700",
  },
  messageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    width: '100%',
    ...Shadows.medium,
  },
  message: {
    fontSize: Typography.fontSize["base"],
    color: Colors.neutral.white,
    textAlign: 'center',
    lineHeight: 24,
  },
  timelineCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: Spacing.base,
    marginBottom: Spacing.xl,
    width: '100%',
  },
  timelineText: {
    fontSize: Typography.fontSize["base"],
    color: Colors.neutral.white,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: Typography.fontSize["sm"],
    color: Colors.neutral.white,
    opacity: 0.7,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.fontSize["base"],
    color: Colors.neutral.white,
    fontWeight: "600",
  },
  signOutButton: {
    backgroundColor: Colors.neutral.white,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl * 2,
    borderRadius: 25,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  signOutText: {
    fontSize: Typography.fontSize["base"],
    fontWeight: "700",
    color: Colors.primary.deepPlum,
  },
  helpText: {
    fontSize: Typography.fontSize["sm"],
    color: Colors.neutral.white,
    opacity: 0.6,
    textAlign: 'center',
  },
});
