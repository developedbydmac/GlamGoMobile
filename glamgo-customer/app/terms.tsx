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
 * Terms of Service Screen
 * Displays the app's terms of service
 */
export default function TermsOfServiceScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>Last Updated: March 2026</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing and using GlamGo, you accept and agree to be bound by
            these Terms of Service. If you do not agree to these terms, please
            do not use the platform.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Service Description</Text>
          <Text style={styles.paragraph}>
            GlamGo is a marketplace platform connecting customers with beauty
            product vendors and delivery drivers. We facilitate transactions but
            are not directly responsible for product quality, vendor actions, or
            driver performance.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Accounts</Text>
          <Text style={styles.paragraph}>
            You must create an account to use GlamGo. You are responsible for
            maintaining the confidentiality of your account credentials and for
            all activities under your account. You must provide accurate and
            complete information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            4. User Roles and Responsibilities
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Customers:</Text> Must provide accurate
            delivery information and be available to receive orders.{"\n\n"}
            <Text style={styles.bold}>Vendors:</Text> Must accurately represent
            products, maintain inventory, and fulfill orders promptly.{"\n\n"}
            <Text style={styles.bold}>Drivers:</Text> Must deliver orders
            safely, maintain valid licenses, and follow all traffic laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Orders and Payments</Text>
          <Text style={styles.paragraph}>
            All orders are subject to acceptance by vendors. Prices are set by
            vendors and may change without notice. Payment is due at the time of
            order placement. Refunds are subject to our refund policy and vendor
            discretion.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Cancellations and Refunds</Text>
          <Text style={styles.paragraph}>
            Customers may cancel orders before vendor acceptance without
            penalty. After acceptance, cancellations are subject to vendor
            approval. Refunds for defective or incorrect items are handled on a
            case-by-case basis.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Prohibited Conduct</Text>
          <Text style={styles.paragraph}>
            You may not use GlamGo to:{"\n\n"}• Violate any laws or regulations
            {"\n"}• Infringe on intellectual property rights{"\n"}• Harass,
            abuse, or harm others{"\n"}• Distribute malware or spam{"\n"}•
            Manipulate reviews or ratings{"\n"}• Resell or transfer accounts
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, trademarks, and data on GlamGo are owned by GlamGo or
            its licensors. You may not copy, modify, or distribute any content
            without express permission.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            GlamGo is provided "as is" without warranties. We are not liable for
            indirect, incidental, or consequential damages. Our total liability
            shall not exceed the amount paid by you in the past 12 months.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Dispute Resolution</Text>
          <Text style={styles.paragraph}>
            Disputes should first be addressed through our customer support. If
            unresolved, disputes will be subject to binding arbitration in
            accordance with applicable laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Modifications to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these terms at any time. Continued
            use after changes constitutes acceptance. We will notify users of
            significant changes via email or in-app notification.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Termination</Text>
          <Text style={styles.paragraph}>
            We may suspend or terminate your account for violations of these
            terms. You may close your account at any time through app settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Contact Information</Text>
          <Text style={styles.paragraph}>
            For questions about these Terms of Service, contact us at:{"\n\n"}
            Email: legal@glamgo.com{"\n"}
            Address: [Company Address - To Be Added]{"\n"}
            Phone: [Company Phone - To Be Added]
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This is a placeholder terms of service for demonstration purposes.
            Complete, legally reviewed terms should be provided by your legal
            team before app store submission.
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
  bold: {
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
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
