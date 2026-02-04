import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import GlamGoLogo from '@/components/GlamGoLogo';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobileWeb = isWeb && width < 768;

type UserRole = 'CUSTOMER' | 'VENDOR' | 'DRIVER';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
  gradient: [string, string];
}

const roleOptions: RoleOption[] = [
  {
    id: 'CUSTOMER',
    title: 'I need beauty services',
    description: 'Book appointments and discover talented stylists near you',
    icon: '✨',
    gradient: ['#4A2B7C', '#6B4FA0'], // GlamGo Purple
  },
  {
    id: 'VENDOR',
    title: 'I am a beauty professional',
    description: 'Grow your business and connect with new clients',
    icon: '💅',
    gradient: ['#C9A961', '#E8C78A'], // GlamGo Gold
  },
  {
    id: 'DRIVER',
    title: 'I want to deliver',
    description: 'Earn money delivering beauty products on your schedule',
    icon: '🚗',
    gradient: ['#4A2B7C', '#C9A961'], // Purple to Gold
  },
];

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      router.push({
        pathname: '/(auth)/sign-up',
        params: { role: selectedRole },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, isMobileWeb && styles.contentMobileWeb]}>
          {/* Logo */}
          <GlamGoLogo size={isMobileWeb ? 'small' : 'medium'} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to GlamGo</Text>
            <Text style={styles.subtitle}>How would you like to use GlamGo?</Text>
          </View>

          {/* Role Cards */}
          <View style={styles.rolesContainer}>
            {roleOptions.map((role) => (
              <TouchableOpacity
                key={role.id}
                activeOpacity={0.8}
                onPress={() => handleRoleSelect(role.id)}
              >
                <View
                  style={[
                    styles.roleCard,
                    selectedRole === role.id && styles.roleCardSelected,
                    isMobileWeb && styles.roleCardMobileWeb,
                  ]}
                >
                  <View style={styles.roleCardContent}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.icon}>{role.icon}</Text>
                    </View>
                    <View style={styles.roleInfo}>
                      <Text style={styles.roleTitle}>{role.title}</Text>
                      <Text style={styles.roleDescription}>
                        {role.description}
                      </Text>
                    </View>
                  </View>
                  {selectedRole === role.id && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedRole && styles.continueButtonDisabled,
              isMobileWeb && styles.continueButtonMobileWeb,
            ]}
            onPress={handleContinue}
            disabled={!selectedRole}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.continueButtonText,
                !selectedRole && styles.continueButtonTextDisabled,
              ]}
            >
              Let's Go
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity
            onPress={() => router.push('/(auth)/sign-in')}
            style={styles.signInContainer}
          >
            <Text style={styles.signInText}>
              Already have an account?{' '}
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
    backgroundColor: '#FAF9F7', // Soft cream background for luxury feel
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
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
  header: {
    marginBottom: 48,
    marginTop: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#4A2B7C', // GlamGo Purple
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#6B6B6B',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  rolesContainer: {
    flex: 1,
    gap: 20,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    shadowColor: '#4A2B7C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  roleCardMobileWeb: {
    padding: 20,
  },
  roleCardSelected: {
    borderColor: '#4A2B7C', // GlamGo Purple
    borderWidth: 2.5,
    backgroundColor: '#FEFEFE',
    shadowColor: '#4A2B7C',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  roleCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F6F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  icon: {
    fontSize: 28,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  roleDescription: {
    fontSize: 15,
    color: '#6B6B6B',
    lineHeight: 21,
    fontWeight: '400',
  },
  checkmark: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A2B7C', // GlamGo Purple
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C9A961', // Gold accent border
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#4A2B7C', // GlamGo Purple
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
    shadowColor: '#4A2B7C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonMobileWeb: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#D8D8D8',
    shadowOpacity: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  continueButtonTextDisabled: {
    color: '#A0A0A0',
  },
  signInContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 16,
  },
  signInText: {
    fontSize: 15,
    color: '#6B6B6B',
    fontWeight: '400',
  },
  signInLink: {
    color: '#4A2B7C', // GlamGo Purple (changed from gold for better accessibility)
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
