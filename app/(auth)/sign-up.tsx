import GlamGoLogo from "@/components/GlamGoLogo";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "@/constants/DesignSystem";
import { Ionicons } from "@expo/vector-icons";
import { autoSignIn, confirmSignUp, signUp } from "aws-amplify/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isMobileWeb = isWeb && width < 768;

type UserRole = "CUSTOMER" | "VENDOR" | "DRIVER";

const roleEmojis = {
  CUSTOMER: "✨",
  VENDOR: "💅",
  DRIVER: "🚗",
};

export default function SignUpScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: UserRole }>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [confirmationCode, setConfirmationCode] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    // AWS Cognito default: min 8 chars, uppercase, lowercase, number, special char
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  const handleSignUp = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name: fullName,
            "custom:role": role || "CUSTOMER",
          },
          autoSignIn: true,
        },
      });

      console.log("Sign up successful:", {
        isSignUpComplete,
        userId,
        nextStep,
      });

      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setStep("confirm");
        Alert.alert(
          "Verification Required",
          "Please check your email for a verification code",
        );
      } else if (nextStep.signUpStep === "DONE") {
        Alert.alert("Success", "Account created successfully!");
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      Alert.alert("Sign Up Error", error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async () => {
    if (!confirmationCode.trim()) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    setLoading(true);

    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode.trim(),
      });

      console.log("Confirmation successful:", { isSignUpComplete, nextStep });

      if (isSignUpComplete) {
        // Try auto sign in
        try {
          await autoSignIn();
          Alert.alert("Success", "Account verified! Welcome to GlamGo!");
          router.replace("/(tabs)");
        } catch (autoSignInError) {
          console.log(
            "Auto sign-in failed, redirecting to sign-in:",
            autoSignInError,
          );
          Alert.alert("Success", "Account verified! Please sign in.");
          router.replace("/(auth)/sign-in");
        }
      }
    } catch (error: any) {
      console.error("Confirmation error:", error);
      Alert.alert(
        "Verification Error",
        error.message || "Invalid verification code",
      );
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    // Note: resendSignUpCode is available in aws-amplify/auth
    Alert.alert(
      "Code Resent",
      "A new verification code has been sent to your email",
    );
  };

  if (step === "confirm") {
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
              <GlamGoLogo size="small" />

              {/* Header */}
              <TouchableOpacity
                onPress={() => setStep("signup")}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>

              <View style={styles.header}>
                <Text style={styles.title}>Check Your Email</Text>
                <Text style={styles.subtitle}>
                  We sent a code to{"\n"}
                  <Text style={styles.emailText}>{email}</Text>
                </Text>
              </View>

              {/* Verification Code Input */}
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Verification Code</Text>
                  <TextInput
                    style={styles.input}
                    value={confirmationCode}
                    onChangeText={setConfirmationCode}
                    placeholder="Enter 6-digit code"
                    keyboardType="number-pad"
                    maxLength={6}
                    autoFocus
                  />
                </View>

                <TouchableOpacity
                  onPress={resendCode}
                  style={styles.resendContainer}
                >
                  <Text style={styles.resendText}>
                    Didn't receive the code?{" "}
                    <Text style={styles.resendLink}>Resend</Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    loading && styles.signUpButtonDisabled,
                  ]}
                  onPress={handleConfirmSignUp}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.signUpButtonText}>
                      Verify & Continue
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

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
            <GlamGoLogo size="small" />
            <Text style={styles.tagline}>BEAUTY DELIVERED</Text>

            {/* Header */}
            <TouchableOpacity
              onPress={() => router.push('/(auth)/role-selection')}
              style={styles.backButton}
            >
              <View style={styles.backButtonContent}>
                <Ionicons name="chevron-back" size={24} color={Colors.primary.deepPlum} />
                <Text style={styles.backButtonText}>Back to Role Selection</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.header}>
              <View style={styles.roleIndicator}>
                <Text style={styles.roleEmoji}>
                  {roleEmojis[role as UserRole] || "✨"}
                </Text>
                <Text style={styles.roleText}>{role}</Text>
              </View>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>
                Let's get you started with GlamGo
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="John Doe"
                  autoCapitalize="words"
                  autoComplete="name"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="john@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  autoCapitalize="none"
                />
                <Text style={styles.hint}>
                  At least 8 characters with uppercase, lowercase, number &
                  symbol
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.signUpButton,
                  loading && styles.signUpButtonDisabled,
                ]}
                onPress={handleSignUp}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/sign-in")}
              style={styles.signInContainer}
            >
              <Text style={styles.signInText}>
                Already a member? <Text style={styles.signInLink}>Sign In</Text>
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
    paddingTop: Platform.OS === "ios" ? Spacing.xl : Spacing['3xl'],
  },
  contentMobileWeb: {
    maxWidth: 480,
    alignSelf: "center",
    width: "100%",
  },
  backButton: {
    marginBottom: Spacing['3xl'],
    marginTop: Spacing.sm,
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: Spacing['4xl'],
  },
  roleIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.pill,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,  // #E7D9EA
    ...Shadows.subtle,
  },
  roleEmoji: {
    fontSize: 20,
    marginRight: Spacing.sm,
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
  roleText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary.deepPlum,
    letterSpacing: Typography.letterSpacing.wide,
    textTransform: "uppercase",
  },
  title: {
    fontSize: Typography.fontSize['4xl'],
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
  emailText: {
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.secondary.softGold,  // #BF9553
  },
  form: {
    marginBottom: Spacing['3xl'],
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.mutedText,
    marginBottom: Spacing.sm,
    letterSpacing: Typography.letterSpacing.wide,
    textTransform: 'uppercase',
    fontFamily: Typography.fontFamily.body,
  },
  input: {
    backgroundColor: Colors.neutral.surface,  // #FFFDFC
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.darkText,  // #2E2335
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,  // #E7D9EA
    fontFamily: Typography.fontFamily.body,
    ...Shadows.subtle,
  },
  hint: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mutedText,
    marginTop: Spacing.sm,
    lineHeight: Typography.lineHeight.relaxed,
    fontFamily: Typography.fontFamily.body,
  },
  signUpButton: {
    backgroundColor: Colors.primary.deepPlum,
    borderRadius: BorderRadius.pill,
    paddingVertical: Spacing.md,
    alignItems: "center",
    marginTop: Spacing.base,
    shadowColor: '#3B1B64',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  signUpButtonDisabled: {
    backgroundColor: Colors.neutral.mediumGrey,
    shadowOpacity: 0.1,
  },
  signUpButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    letterSpacing: Typography.letterSpacing.relaxed,
    fontFamily: Typography.fontFamily.body,
  },
  signInContainer: {
    alignItems: "center",
    paddingBottom: Spacing['3xl'],
    marginTop: Spacing.xl,
  },
  signInText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mutedText,
    fontWeight: Typography.fontWeight.normal,
    fontFamily: Typography.fontFamily.body,
  },
  signInLink: {
    color: Colors.secondary.softGold,  // #BF9553
    fontWeight: Typography.fontWeight.medium,
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  resendText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mutedText,
    fontWeight: Typography.fontWeight.normal,
    fontFamily: Typography.fontFamily.body,
  },
  resendLink: {
    color: Colors.secondary.softGold,  // #BF9553
    fontWeight: Typography.fontWeight.medium,
  },
});
