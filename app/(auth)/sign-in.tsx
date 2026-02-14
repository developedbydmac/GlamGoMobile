import GlamGoLogo from "@/components/GlamGoLogo";
import GradientButton from "@/components/GradientButton";
import ModernInput from "@/components/ModernInput";
import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
} from "@/constants/DesignSystem";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUser, signIn } from "aws-amplify/auth";
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
      console.log("=== SIGN-IN DEBUG START ===");
      console.log("Attempting sign-in for:", email.trim().toLowerCase());

      const { isSignedIn, nextStep } = await signIn({
        username: email.trim().toLowerCase(),
        password,
      });

      console.log(
        "Sign-in result:",
        JSON.stringify({ isSignedIn, nextStep }, null, 2),
      );

      if (isSignedIn) {
        // Get user info to verify
        const user = await getCurrentUser();
        console.log("Current user:", user.userId);

        // Navigate to home without alert (smoother UX)
        router.replace("/(tabs)");
      } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        setError(
          "Your account isn't verified yet. Please check your email for the verification code.",
        );
      } else {
        setError(
          "Additional verification steps required. Please check your email.",
        );
      }
      console.log("=== SIGN-IN DEBUG END ===");
    } catch (error: any) {
      console.error("=== SIGN-IN ERROR START ===");
      console.error("Error type:", typeof error);
      console.error("Error name:", error?.name);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      console.error("Error toString:", error?.toString());

      // Try to stringify the entire error object
      try {
        console.error("Full error (JSON):", JSON.stringify(error, null, 2));
      } catch (e) {
        console.error("Could not stringify error, using direct log:");
        console.error("Full error:", error);
      }

      // Check if it's an AWS Amplify error with underscoreCase
      if (error?.__type) {
        console.error("AWS Error Type (__type):", error.__type);
      }

      console.error("=== SIGN-IN ERROR END ===");

      // User-friendly error messages
      let errorMessage = "Something went wrong. Please try again.";

      if (error.name === "UserNotFoundException") {
        errorMessage =
          "We couldn't find an account with that email. Did you sign up yet?";
      } else if (error.name === "NotAuthorizedException") {
        errorMessage =
          "The password you entered is incorrect. Please try again.";
      } else if (error.name === "UserNotConfirmedException") {
        errorMessage =
          "Please check your email and verify your account first. Check your spam folder if you don't see it.";
        // Optionally navigate to verification screen
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

            {/* Header */}
            <TouchableOpacity
              onPress={() => router.push("/browse")}
              style={styles.backButton}
            >
              <View style={styles.backButtonContent}>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={Colors.primary.royalPurple}
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

            {/* Sign Up Link */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/role-selection")}
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
    backgroundColor: Colors.neutral.softWhite,
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
    paddingTop: Platform.OS === "ios" ? Spacing.xl : Spacing["2xl"],
  },
  contentMobileWeb: {
    maxWidth: 480,
    alignSelf: "center",
    width: "100%",
  },
  backButton: {
    marginBottom: Spacing.xl,
    marginTop: Spacing.xs,
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  backButtonText: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary.royalPurple,
    fontWeight: Typography.fontWeight.semibold,
  },
  header: {
    marginBottom: Spacing["3xl"],
  },
  errorContainer: {
    backgroundColor: "#FFF5F5",
    borderWidth: 1.5,
    borderColor: Colors.semantic.error,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  errorText: {
    color: Colors.semantic.error,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.normal,
    fontWeight: Typography.fontWeight.medium,
  },
  title: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.royalPurple,
    marginBottom: Spacing.md,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.neutral.mediumGrey,
    lineHeight: Typography.lineHeight.relaxed,
    fontWeight: Typography.fontWeight.normal,
  },
  form: {
    gap: Spacing.lg,
    marginBottom: Spacing["2xl"],
  },
  signUpContainer: {
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? Spacing["3xl"] : Spacing.xl,
    marginTop: Spacing.xl,
  },
  signUpText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    fontWeight: Typography.fontWeight.normal,
  },
  signUpLink: {
    color: Colors.primary.royalPurple,
    fontWeight: Typography.fontWeight.bold,
    textDecorationLine: "underline",
  },
});
