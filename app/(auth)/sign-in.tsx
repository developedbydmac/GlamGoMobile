import GlamGoLogo from "@/components/GlamGoLogo";
import GradientButton from "@/components/GradientButton";
import ModernInput from "@/components/ModernInput";
import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
    Shadows,
} from "@/constants/DesignSystem";
import { Ionicons } from "@expo/vector-icons";
import { signInWithCognito } from "../../services/cognitoAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useColorScheme
} from "react-native";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isMobileWeb = isWeb && width < 768;

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSignIn = async () => {
    // Clear previous errors
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      console.log("=== DIRECT COGNITO SIGN-IN START ===");
      console.log("Attempting sign-in for:", email.trim().toLowerCase());

      // Use direct Cognito SDK
      const user = await signInWithCognito(
        email.trim().toLowerCase(),
        password
      );

      console.log("✅ Sign-in successful!");
      console.log("User ID:", user.userId);
      console.log("Role:", user.role);

      // Navigate based on role to correct dashboard
      const roleUpper = user.role?.toUpperCase();
      
      if (roleUpper === 'VENDOR') {
        console.log("🏪 Navigating to vendor dashboard...");
        router.replace("/(vendor)/dashboard" as any);
      } else if (roleUpper === 'DRIVER') {
        console.log("🚗 Navigating to driver dashboard...");
        router.replace("/(driver)/dashboard" as any);
      } else {
        console.log("🛍️ Navigating to customer dashboard...");
        router.replace("/(customer)/dashboard" as any);
      }

      console.log("✅ Navigation completed for role:", user.role);
      console.log("=== DIRECT COGNITO SIGN-IN END ===");
    } catch (error: any) {
      console.error("=== SIGN-IN ERROR START ===");
      console.error("Error type:", typeof error);
      console.error("Error name:", error?.name);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      console.error("Full error:", error);
      console.error("=== SIGN-IN ERROR END ===");

      // User-friendly error messages
      let errorMessage = "Something went wrong. Please try again.";

      if (error.code === "UserNotFoundException") {
        errorMessage =
          "We couldn't find an account with that email. Did you sign up yet?";
      } else if (error.code === "NotAuthorizedException") {
        errorMessage =
          "The password you entered is incorrect. Please try again.";
      } else if (error.code === "UserNotConfirmedException") {
        errorMessage =
          "Please check your email and verify your account first. Check your spam folder if you don't see it.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[styles.content, isMobileWeb && styles.contentMobileWeb]}
          >
            {/* Logo */}
            <GlamGoLogo size={isMobileWeb ? "small" : "medium"} />
            <Text style={styles.tagline}>BEAUTY DELIVERED</Text>

            {/* Header */}
            <TouchableOpacity
              onPress={() => router.push("/browse" as any)}
              style={styles.backButton}
            >
              <View style={styles.backButtonContent}>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={Colors.primary.deepPlum}
                />
                <Text style={styles.backButtonText}>Back to Browse</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Good to see you again</Text>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            ) : null}

            {/* Form */}
            <View style={styles.form}>
              <ModernInput
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!loading}
                leftIcon={
                  <Ionicons
                    name="mail"
                    size={20}
                    color={Colors.neutral.mediumGrey}
                  />
                }
                error={
                  error && error.toLowerCase().includes("email")
                    ? error
                    : undefined
                }
              />

              <ModernInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
                leftIcon={
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={Colors.neutral.mediumGrey}
                  />
                }
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color={Colors.neutral.mediumGrey}
                    />
                  </TouchableOpacity>
                }
                error={
                  error && error.toLowerCase().includes("password")
                    ? error
                    : undefined
                }
              />

              <GradientButton
                title="Sign In"
                onPress={handleSignIn}
                loading={loading}
                disabled={!email.trim() || !password.trim() || loading}
              />
            </View>

            {/* Demo Quick-Fill Buttons */}
            <View style={styles.demoSection}>
              <Text style={styles.demoTitle}>🧪 Demo Accounts</Text>
              <View style={styles.demoButtonsGrid}>
                <TouchableOpacity
                  style={[styles.demoButton, styles.demoButtonCustomer]}
                  onPress={() => {
                    setEmail('customer@test.com');
                    setPassword('Test1234!');
                  }}
                  disabled={loading}
                >
                  <Text style={styles.demoButtonText}>Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.demoButton, styles.demoButtonVendor]}
                  onPress={() => {
                    setEmail('vendor@test.com');
                    setPassword('Test1234!');
                  }}
                  disabled={loading}
                >
                  <Text style={styles.demoButtonText}>Vendor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.demoButton, styles.demoButtonDriver]}
                  onPress={() => {
                    setEmail('driver@test.com');
                    setPassword('Test1234!');
                  }}
                  disabled={loading}
                >
                  <Text style={styles.demoButtonText}>Driver</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Link */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/role-selection" as any)}
              style={styles.signUpContainer}
            >
              <Text style={styles.signUpText}>
                New to GlamGo? <Text style={styles.signUpLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,  // #FFF8F5
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Platform.OS === "ios" ? Spacing['3xl'] : Spacing['4xl'],
  },
  contentMobileWeb: {
    maxWidth: 480,
    alignSelf: "center",
    width: "100%",
  },
  tagline: {
    fontSize: Typography.fontSize.xs,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
    color: Colors.secondary.softGold,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    fontFamily: Typography.fontFamily.bodyMedium,
  },
  backButton: {
    marginBottom: Spacing['3xl'],
    marginTop: Spacing.sm,
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  backButtonText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary.softGold,  // #BF9553
    fontWeight: Typography.fontWeight.medium,
    letterSpacing: Typography.letterSpacing.relaxed,
    fontFamily: Typography.fontFamily.body,
  },
  header: {
    marginBottom: Spacing['4xl'],  // Generous breathing room
  },
  errorContainer: {
    backgroundColor: "#FFF9F9",
    borderWidth: 1.5,
    borderColor: Colors.semantic.error,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  errorText: {
    color: Colors.semantic.error,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.relaxed,
    fontWeight: Typography.fontWeight.medium,
  },
  title: {
    fontSize: Typography.fontSize['4xl'],  // 32px+
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,  // #522888
    marginBottom: Spacing.base,
    letterSpacing: Typography.letterSpacing.relaxed,
    fontFamily: Typography.fontFamily.heading,  // Serif
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mutedText,  // #8C7A9A
    lineHeight: Typography.lineHeight.relaxed,
    fontWeight: Typography.fontWeight.normal,
    fontFamily: Typography.fontFamily.body,
  },
  form: {
    gap: Spacing.lg,
    marginBottom: Spacing['3xl'],
  },
  signUpContainer: {
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? Spacing['3xl'] : Spacing.xl,
    marginTop: Spacing['3xl'],
  },
  signUpText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mutedText,
    fontWeight: Typography.fontWeight.normal,
    fontFamily: Typography.fontFamily.body,
  },
  signUpLink: {
    color: Colors.secondary.softGold,  // #BF9553
    fontWeight: Typography.fontWeight.medium,
  },
  demoSection: {
    marginTop: Spacing['3xl'],
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.softBlush,  // #F5EDE8
    borderRadius: BorderRadius.lg,
    ...Shadows.subtle,
  },
  demoTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium as any,
    color: Colors.primary.deepPlum,
    marginBottom: Spacing.md,
    textAlign: 'center',
    letterSpacing: Typography.letterSpacing.wide,
    textTransform: 'uppercase',
    fontFamily: Typography.fontFamily.body,
  },
  demoButtonsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  demoButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    ...Shadows.subtle,
  },
  demoButtonCustomer: {
    backgroundColor: Colors.primary.deepPlum,
  },
  demoButtonVendor: {
    backgroundColor: Colors.secondary.softGold,
  },
  demoButtonDriver: {
    backgroundColor: '#6B9BD1',
  },
  demoButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold as any,
    letterSpacing: Typography.letterSpacing.normal,
  },
});
