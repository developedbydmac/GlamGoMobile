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
    gradient: [Colors.primary.lightPlum, Colors.primary.deepPlum],
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
        pathname: "/(auth)/sign-up" as any,
        params: { role: selectedRole },
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark] as any}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ScrollView
        contentContainerStyle={styles.scrollContent as any}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, isMobileWeb && styles.contentMobileWeb] as any}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push('/browse' as any)}
            style={styles.backButton as any}
          >
            <View style={styles.backButtonContent as any}>
              <Ionicons name="chevron-back" size={24} color={Colors.primary.deepPlum} />
              <Text style={styles.backButtonText as any}>Back to Browse</Text>
            </View>
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer as any}>
            <GlamGoLogo size="large" />
          </View>

          {/* Header */}
          <View style={styles.header as any}>
            <Text style={[styles.title, isDark && styles.titleDark] as any}>
              Choose Your Path
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark] as any}>
              Select how you'd like to use GlamGo
            </Text>
          </View>

          {/* Role Cards */}
          <View style={styles.rolesContainer as any}>
            {roleOptions.map((role) => (
              <TouchableOpacity
                key={role.id}
                onPress={() => handleRoleSelect(role.id)}
                style={styles.roleCardWrapper as any}
              >
                <View
                  style={[
                    styles.roleCard,
                    isDark && styles.roleCardDark,
                    selectedRole === role.id && styles.roleCardSelected,
                  ] as any}
                >
                  <LinearGradient
                    colors={role.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.iconGradient as any}
                  >
                    <Ionicons
                      name={role.icon}
                      size={32}
                      color="#FFFFFF"
                    />
                  </LinearGradient>
                  
                  <View style={styles.roleInfo as any}>
                    <Text style={[styles.roleTitle, isDark && styles.roleTitleDark] as any}>
                      {role.title}
                    </Text>
                    <Text style={[styles.roleDescription, isDark && styles.roleDescriptionDark] as any}>
                      {role.description}
                    </Text>
                    
                    <View style={styles.featuresContainer as any}>
                      {role.features.map((feature, index) => (
                        <View key={index} style={styles.featureRow as any}>
                          <Ionicons
                            name="checkmark-circle"
                            size={16}
                            color={role.gradient[0]}
                            style={styles.featureIcon as any}
                          />
                          <Text style={[styles.featureText, isDark && styles.featureTextDark] as any}>
                            {feature}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {selectedRole === role.id && (
                    <View style={[styles.selectedBadge, { backgroundColor: role.gradient[0] }] as any}>
                      <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer as any}>
            <GradientButton
              title="Continue"
              onPress={handleContinue}
              disabled={!selectedRole}
            />
          </View>

          {/* Sign In Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-in" as any)}
            style={styles.signInContainer as any}
          >
            <Text style={[styles.signInText, isDark && styles.signInTextDark] as any}>
              Already have an account?{" "}
              <Text style={styles.signInLink as any}>Sign In</Text>
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
    backgroundColor: Colors.neutral.blushCream,
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
    color: Colors.primary.deepPlum,
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
    color: Colors.primary.deepPlum,
    marginBottom: Spacing.md,
    textAlign: "center",
    fontFamily: Typography.fontFamily.heading,
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
    fontFamily: Typography.fontFamily.body,
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
    borderColor: Colors.primary.deepPlum,
    borderWidth: 2,
    ...Shadows.light,
  },
  
  iconGradient: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.pill,
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
    color: Colors.neutral.darkText,
    marginBottom: Spacing.xs,
    fontFamily: Typography.fontFamily.bodySemiBold,
  },
  
  roleTitleDark: {
    color: Colors.dark.text,
  },
  
  roleDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
    marginBottom: Spacing.md,
    fontFamily: Typography.fontFamily.body,
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
    fontFamily: Typography.fontFamily.body,
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
    borderRadius: BorderRadius.pill,
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
    fontFamily: Typography.fontFamily.body,
  },
  
  signInTextDark: {
    color: Colors.dark.textSecondary,
  },
  
  signInLink: {
    color: Colors.secondary.champagneGold,
    fontWeight: Typography.fontWeight.semibold,
  },
});
