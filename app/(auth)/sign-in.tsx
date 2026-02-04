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
import { useRouter } from 'expo-router';
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import GlamGoLogo from '@/components/GlamGoLogo';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobileWeb = isWeb && width < 768;

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSignIn = async () => {
    // Clear previous errors
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password');
      return;
    }

    setLoading(true);

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email.trim().toLowerCase(),
        password,
      });

      console.log('Sign in successful:', { isSignedIn, nextStep });

      if (isSignedIn) {
        // Get user info to verify
        const user = await getCurrentUser();
        console.log('Current user:', user);
        
        // Navigate to home without alert (smoother UX)
        router.replace('/(tabs)');
      } else {
        setError('Additional verification steps required. Please check your email.');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // User-friendly error messages
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.name === 'UserNotFoundException' || error.name === 'NotAuthorizedException') {
        errorMessage = "We couldn't find an account with that email and password.";
      } else if (error.name === 'UserNotConfirmedException') {
        errorMessage = 'Please check your email and verify your account first.';
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
            <GlamGoLogo size={isMobileWeb ? 'small' : 'medium'} />

            {/* Header */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back</Text>
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
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError(''); // Clear error on input
                  }}
                  placeholder="john@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError(''); // Clear error on input
                  }}
                  placeholder="••••••••"
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                style={[styles.signInButton, loading && styles.signInButtonDisabled]}
                onPress={handleSignIn}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.signInButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <TouchableOpacity
              onPress={() => router.push('/(auth)/role-selection')}
              style={styles.signUpContainer}
            >
              <Text style={styles.signUpText}>
                New to GlamGo?{' '}
                <Text style={styles.signUpLink}>Sign Up</Text>
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
    marginBottom: 48,
  },
  errorContainer: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1.5,
    borderColor: '#FEB2B2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  errorText: {
    color: '#C53030',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
  },
  title: {
    fontSize: 34,
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
  signInButton: {
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
  signInButtonDisabled: {
    backgroundColor: '#B8B8D8',
    shadowOpacity: 0,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  signUpContainer: {
    alignItems: 'center',
    paddingBottom: 32,
    marginTop: 24,
  },
  signUpText: {
    fontSize: 15,
    color: '#6B6B6B',
    fontWeight: '400',
  },
  signUpLink: {
    color: '#4A2B7C', // GlamGo Purple
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
