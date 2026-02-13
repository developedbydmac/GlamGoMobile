import GlamGoLogo from "@/components/GlamGoLogo";
import GradientButton from "@/components/GradientButton";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "@/constants/DesignSystem";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isMobileWeb = isWeb && width < 768;

type UserRole = "CUSTOMER" | "VENDOR" | "DRIVER";

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string];
  features: string[];
}

const roleOptions: RoleOption[] = [
  {
    id: "CUSTOMER",
    title: "I need beauty services",
    description: "Book appointments and discover talented stylists near you",
    icon: "person",
    gradient: [Colors.primary.deepPurple, Colors.primary.royalPurple],
    features: ["Browse services", "Book appointments", "Track orders"],
  },
  {
    id: "VENDOR",
    title: "I am a beauty professional",
    description: "Grow your business and connect with new clients",
    icon: "briefcase",
    gradient: [Colors.secondary.darkGold, Colors.secondary.champagneGold],
    features: ["Manage products", "Handle orders", "Grow revenue"],
  },
  {
    id: "DRIVER",
    title: "I want to deliver",
    description: "Earn money delivering beauty products on your schedule",
    icon: "car",
    gradient: ["#2196F3", "#64B5F6"],
    features: ["Flexible hours", "Track earnings", "Quick payouts"],
  },
];

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      router.push({
        pathname: "/(auth)/sign-up",
        params: { role: selectedRole },
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, isMobileWeb && styles.contentMobileWeb]}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push('/browse')}
            style={styles.backButton}
          >
            <View style={styles.backButtonContent}>
              <Ionicons name="chevron-back" size={24} color={Colors.primary.royalPurple} />
              <Text style={styles.backButtonText}>Back to Browse</Text>
            </View>
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <GlamGoLogo size={isMobileWeb ? "small" : "medium"} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, isDark && styles.titleDark]}>
              Welcome to GlamGo
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              How would you like to use GlamGo today?
            </Text>
          </View>

          {/* Role Cards */}
          <View style={styles.rolesContainer}>
            {roleOptions.map((role) => (
              <TouchableOpacity
                key={role.id}
                activeOpacity={0.7}
                onPress={() => handleRoleSelect(role.id)}
                style={styles.roleCardWrapper}
              >
                <View
                  style={[
                    styles.roleCard,
                    selectedRole === role.id && styles.roleCardSelected,
                    isDark && styles.roleCardDark,
                    isMobileWeb && styles.roleCardMobileWeb,
                  ]}
                >
                  {/* Icon Circle with Gradient */}
                  <LinearGradient
                    colors={role.gradient}
                    style={styles.iconGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons
                      name={role.icon}
                      size={32}
                      color={Colors.neutral.white}
                    />
                  </LinearGradient>

                  {/* Role Info */}
                  <View style={styles.roleInfo}>
                    <Text style={[styles.roleTitle, isDark && styles.roleTitleDark]}>
                      {role.title}
                    </Text>
                    <Text style={[styles.roleDescription, isDark && styles.roleDescriptionDark]}>
                      {role.description}
                    </Text>
                    
                    {/* Features */}
                    <View style={styles.featuresContainer}>
                      {role.features.map((feature, index) => (
                        <View key={index} style={styles.featureRow}>
                          <Ionicons
                            name="checkmark-circle"
                            size={16}
                            color={selectedRole === role.id ? role.gradient[0] : Colors.neutral.mediumGrey}
                            style={styles.featureIcon}
                          />
                          <Text style={[styles.featureText, isDark && styles.featureTextDark]}>
                            {feature}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Selection Indicator */}
                  {selectedRole === role.id && (
                    <View style={[styles.selectedBadge, { backgroundColor: role.gradient[0] }]}>
                      <Ionicons name="checkmark" size={20} color={Colors.neutral.white} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <GradientButton
              title="Continue"
              onPress={handleContinue}
              disabled={!selectedRole}
              fullWidth
            />
          </View>

          {/* Sign In Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-in")}
            style={styles.signInContainer}
          >
            <Text style={[styles.signInText, isDark && styles.signInTextDark]}>
              Already have an account?{" "}
              <Text style={styles.signInLink}>Sign In</Text>
            </Text>
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
  
  containerDark: {
    backgroundColor: Colors.dark.background,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing['3xl'],
  },
  
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === "ios" ? Spacing.lg : Spacing['2xl'],
  },
  
  contentMobileWeb: {
    maxWidth: 480,
    alignSelf: "center",
    width: "100%",
  },
  
  backButton: {
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
  },
  
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  
  backButtonText: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary.royalPurple,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.base,
  },
  
  header: {
    marginBottom: Spacing['3xl'],
    marginTop: Spacing.base,
  },
  
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.royalPurple,
    marginBottom: Spacing.md,
    textAlign: "center",
    fontFamily: Typography.fontFamily,
  },
  
  titleDark: {
    color: Colors.dark.primary,
  },
  
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.neutral.mediumGrey,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
    textAlign: "center",
    fontWeight: Typography.fontWeight.normal,
    fontFamily: Typography.fontFamily,
  },
  
  subtitleDark: {
    color: Colors.dark.textSecondary,
  },
  
  rolesContainer: {
    flex: 1,
    marginBottom: Spacing.lg,
  },
  
  roleCardWrapper: {
    marginBottom: Spacing.base,
  },
  
  roleCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
    ...Shadows.subtle,
  },
  
  roleCardDark: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.dark.textSecondary,
  },
  
  roleCardMobileWeb: {
    padding: Spacing.base,
  },
  
  roleCardSelected: {
    borderColor: Colors.primary.royalPurple,
    borderWidth: 2,
    ...Shadows.light,
  },
  
  iconGradient: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.base,
    ...Shadows.subtle,
  },
  
  roleInfo: {
    flex: 1,
  },
  
  roleTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
    fontFamily: Typography.fontFamily,
  },
  
  roleTitleDark: {
    color: Colors.dark.text,
  },
  
  roleDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
    marginBottom: Spacing.md,
    fontFamily: Typography.fontFamily,
  },
  
  roleDescriptionDark: {
    color: Colors.dark.textSecondary,
  },
  
  featuresContainer: {
    gap: Spacing.xs,
  },
  
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  featureIcon: {
    marginRight: Spacing.xs,
  },
  
  featureText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    fontFamily: Typography.fontFamily,
  },
  
  featureTextDark: {
    color: Colors.dark.textSecondary,
  },
  
  selectedBadge: {
    position: "absolute",
    top: Spacing.base,
    right: Spacing.base,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.subtle,
  },
  
  buttonContainer: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.base,
  },
  
  signInContainer: {
    alignItems: "center",
    paddingVertical: Spacing.base,
    paddingBottom: Platform.OS === "ios" ? Spacing.xl : Spacing.base, // Safe area for home indicator
  },
  
  signInText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    fontFamily: Typography.fontFamily,
  },
  
  signInTextDark: {
    color: Colors.dark.textSecondary,
  },
  
  signInLink: {
    color: Colors.secondary.champagneGold,
    fontWeight: Typography.fontWeight.semibold,
  },
});
