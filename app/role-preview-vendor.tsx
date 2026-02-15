import { Colors, Spacing, Typography } from "@/constants/DesignSystem";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Vendor Role Preview Screen
 * Shows what vendors will see after creating an account
 */
export default function VendorPreviewScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.neutral.darkGrey}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendor Experience</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Ionicons
            name="storefront"
            size={80}
            color={Colors.primary.royalPurple}
            style={styles.heroIcon}
          />
          <Text style={styles.heroTitle}>Grow Your Business</Text>
          <Text style={styles.heroSubtitle}>
            Manage your beauty business, reach more customers, and increase your
            revenue
          </Text>
        </View>

        {/* Features Preview */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What You Can Do</Text>

          <View style={styles.featureCard}>
            <Ionicons
              name="add-circle"
              size={32}
              color={Colors.primary.royalPurple}
            />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>
                Create Services & Products
              </Text>
              <Text style={styles.featureDescription}>
                Add your beauty services and products with photos, pricing, and
                availability
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Ionicons
              name="calendar-outline"
              size={32}
              color={Colors.primary.royalPurple}
            />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Manage Appointments</Text>
              <Text style={styles.featureDescription}>
                View and manage customer bookings with a built-in calendar
                system
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Ionicons
              name="receipt"
              size={32}
              color={Colors.primary.royalPurple}
            />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Track Orders</Text>
              <Text style={styles.featureDescription}>
                Monitor product orders and appointment bookings in real-time
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Ionicons
              name="bar-chart"
              size={32}
              color={Colors.primary.royalPurple}
            />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Business Analytics</Text>
              <Text style={styles.featureDescription}>
                Track your revenue, popular services, and customer trends
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Ionicons
              name="cash"
              size={32}
              color={Colors.primary.royalPurple}
            />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Get Paid</Text>
              <Text style={styles.featureDescription}>
                Receive payments securely and track your earnings
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Ionicons
              name="people"
              size={32}
              color={Colors.primary.royalPurple}
            />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Customer Management</Text>
              <Text style={styles.featureDescription}>
                Build relationships with your customers and manage their
                profiles
              </Text>
            </View>
          </View>
        </View>

        {/* Screenshot Placeholder */}
        <View style={styles.screenshotSection}>
          <Text style={styles.sectionTitle}>Dashboard Preview</Text>
          <View style={styles.screenshotPlaceholder}>
            <Ionicons
              name="phone-portrait-outline"
              size={120}
              color="#D1D5DB"
            />
            <Text style={styles.placeholderText}>
              Vendor Dashboard Screenshot
            </Text>
            <Text style={styles.placeholderSubtext}>
              Coming soon after account creation
            </Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/(auth)/sign-up?role=VENDOR")}
          >
            <Text style={styles.primaryButtonText}>Create Vendor Account</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Back to Browse</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkGrey,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: Spacing["2xl"],
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.neutral.white,
  },
  heroIcon: {
    marginBottom: Spacing.lg,
  },
  heroTitle: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    textAlign: "center",
    lineHeight: 24,
  },
  featuresSection: {
    padding: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.lg,
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: Colors.neutral.white,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    lineHeight: 20,
  },
  screenshotSection: {
    padding: Spacing.xl,
  },
  screenshotPlaceholder: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: Spacing["2xl"],
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.neutral.lightGrey,
    borderStyle: "dashed",
  },
  placeholderText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.md,
  },
  placeholderSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  ctaSection: {
    padding: Spacing.xl,
    paddingBottom: Spacing["2xl"],
  },
  primaryButton: {
    backgroundColor: Colors.primary.royalPurple,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  primaryButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.white,
  },
  secondaryButton: {
    backgroundColor: Colors.neutral.white,
    paddingVertical: Spacing.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary.royalPurple,
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.royalPurple,
    textAlign: "center",
  },
});
