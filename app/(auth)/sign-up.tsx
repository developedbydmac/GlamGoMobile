import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth';
import GlamGoLogo from '@/components/GlamGoLogo';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobileWeb = isWeb && width < 768;

type UserRole = 'CUSTOMER' | 'VENDOR' | 'DRIVER';

const roleEmojis = {
  CUSTOMER: '✨',
  VENDOR: '💅',
  DRIVER: '🚗',
};

export default function SignUpScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: UserRole }>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');
  const [confirmationCode, setConfirmationCode] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    // AWS Cognito default: min 8 chars, uppercase, lowercase, number, special char
    return password.length >= 8 &&
           /[a-z]/.test(password) &&
           /[A-Z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^A-Za-z0-9]/.test(password);
  };

  const handleSignUp = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
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
            'custom:role': role || 'CUSTOMER',
          },
          autoSignIn: true,
        },
      });

      console.log('Sign up successful:', { isSignUpComplete, userId, nextStep });

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setStep('confirm');
        Alert.alert(
          'Verification Required',
          'Please check your email for a verification code'
        );
      } else if (nextStep.signUpStep === 'DONE') {
        Alert.alert('Success', 'Account created successfully!');
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      Alert.alert('Sign Up Error', error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async () => {
    if (!confirmationCode.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setLoading(true);

    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode.trim(),
      });

      console.log('Confirmation successful:', { isSignUpComplete, nextStep });

      if (isSignUpComplete) {
        // Try auto sign in
        try {
          await autoSignIn();
          Alert.alert('Success', 'Account verified! Welcome to GlamGo!');
          router.replace('/(tabs)');
        } catch (autoSignInError) {
          console.log('Auto sign-in failed, redirecting to sign-in:', autoSignInError);
          Alert.alert('Success', 'Account verified! Please sign in.');
          router.replace('/(auth)/sign-in');
        }
      }
    } catch (error: any) {
      console.error('Confirmation error:', error);
      Alert.alert('Verification Error', error.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    // Note: resendSignUpCode is available in aws-amplify/auth
    Alert.alert('Code Resent', 'A new verification code has been sent to your email');
  };

  if (step === 'confirm') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.content, isMobileWeb && styles.contentMobileWeb]}>
              {/* Logo */}
              <GlamGoLogo size="small" />

              {/* Header */}
              <TouchableOpacity
                onPress={() => setStep('signup')}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>

              <View style={styles.header}>
                <Text style={styles.title}>Check Your Email</Text>
                <Text style={styles.subtitle}>
                  We sent a code to{'\n'}
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

                <TouchableOpacity onPress={resendCode} style={styles.resendContainer}>
                  <Text style={styles.resendText}>
                    Didn't receive the code?{' '}
                    <Text style={styles.resendLink}>Resend</Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
                  onPress={handleConfirmSignUp}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.signUpButtonText}>Verify & Continue</Text>
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, isMobileWeb && styles.contentMobileWeb]}>
            {/* Logo */}
            <GlamGoLogo size="small" />

            {/* Header */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <View style={styles.roleIndicator}>
                <Text style={styles.roleEmoji}>
                  {roleEmojis[role as UserRole] || '✨'}
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
                  At least 8 characters with uppercase, lowercase, number & symbol
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
                style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
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
              onPress={() => router.push('/(auth)/sign-in')}
              style={styles.signInContainer}
            >
              <Text style={styles.signInText}>
                Already a member?{' '}
                <Text style={styles.signInLink}>Sign In</Text>
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
    backgroundColor: '#FAF9F7', // Soft cream background for luxury feel
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  contentMobileWeb: {
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    marginBottom: 24,
    marginTop: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A2B7C', // GlamGo Purple
    fontWeight: '600',
  },
  header: {
    marginBottom: 40,
  },
  roleIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    shadowColor: '#4A2B7C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  roleEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  roleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4A2B7C', // GlamGo Purple
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4A2B7C', // GlamGo Purple
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 17,
    color: '#6B6B6B',
    lineHeight: 24,
    fontWeight: '400',
  },
  emailText: {
    fontWeight: '700',
    color: '#C9A961', // GlamGo Gold
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2C2C2C',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  hint: {
    fontSize: 13,
    color: '#999999',
    marginTop: 8,
    lineHeight: 18,
  },
  signUpButton: {
    backgroundColor: '#4A2B7C', // GlamGo Purple
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#4A2B7C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signUpButtonDisabled: {
    backgroundColor: '#B8B8D8',
    shadowOpacity: 0,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  signInContainer: {
    alignItems: 'center',
    paddingBottom: 32,
    marginTop: 24,
  },
  signInText: {
    fontSize: 15,
    color: '#6B6B6B',
    fontWeight: '400',
  },
  signInLink: {
    color: '#4A2B7C', // GlamGo Purple
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  resendText: {
    fontSize: 15,
    color: '#6B6B6B',
    fontWeight: '400',
  },
  resendLink: {
    color: '#C9A961', // GlamGo Gold
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
