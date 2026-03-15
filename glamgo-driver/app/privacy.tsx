import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
} from "@/constants/DesignSystem";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Privacy Policy Screen
 * Displays the app's privacy policy
 */
export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last Updated: March 2026</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            GlamGo collects information you provide when creating an account,
            including your name, email address, phone number, and location
            information. We also collect information about your orders, store
            interactions, and delivery preferences.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. How We Use Your Information
          </Text>
          <Text style={styles.paragraph}>
            We use your information to provide and improve our beauty product
            delivery services, process orders, connect customers with vendors
            and drivers, and send important notifications about your orders and
            account.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Information Sharing</Text>
          <Text style={styles.paragraph}>
            We share necessary information with vendors and drivers to fulfill
            your orders. We do not sell your personal information to third
            parties. We may share aggregated, non-personally identifiable
            information for analytics purposes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement industry-standard security measures to protect your
            information. Your account is password-protected, and we use
            encryption for sensitive data transmission. However, no method of
            electronic storage is 100% secure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Location Services</Text>
          <Text style={styles.paragraph}>
            GlamGo may collect location data to provide delivery services, show
            nearby stores, and estimate delivery times. You can manage location
            permissions in your device settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to access, update, or delete your personal
            information. You can also opt out of marketing communications.
            Contact us at privacy@glamgo.com to exercise these rights.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
          <Text style={styles.paragraph}>
            GlamGo is not intended for users under 18 years of age. We do not
            knowingly collect information from children under 18.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update this privacy policy from time to time. We will notify
            you of significant changes via email or in-app notification.
            Continued use of GlamGo after changes constitutes acceptance of the
            updated policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions about this privacy policy, please contact us
            at:{"\n\n"}
            Email: privacy@glamgo.com{"\n"}
            Address: [Company Address - To Be Added]{"\n"}
            Phone: [Company Phone - To Be Added]
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This is a placeholder privacy policy for demonstration purposes. A
            complete, legally reviewed privacy policy should be provided by your
            legal team before app store submission.
          </Text>
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
  content: {
    padding: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.sm,
  },
  lastUpdated: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.md,
  },
  paragraph: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    lineHeight: 24,
  },
  disclaimer: {
    backgroundColor: Colors.semantic.warning,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xl,
  },
  disclaimerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.darkText,
    fontWeight: Typography.fontWeight.semibold as any,
    textAlign: "center",
  },
});
