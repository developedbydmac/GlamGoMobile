import { StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import GlamGoLogo from '@/components/GlamGoLogo';

export default function TabOneScreen() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setUserInfo({ user, attributes });
      console.log('User Info:', { user, attributes });
    } catch (error: any) {
      // This is expected if user is not authenticated yet
      if (error.name === 'UserUnAuthenticatedException') {
        console.log('User is not authenticated:', error.message);
      } else {
        console.error('Error loading user info:', error);
      }
    }
  };

  const handleSignOut = async () => {
    // Use native confirm on web, Alert.alert on mobile
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to sign out?')) {
        try {
          await signOut();
          router.replace('/(auth)/role-selection');
        } catch (error) {
          console.error('Error signing out:', error);
          alert('Failed to sign out. Please try again.');
        }
      }
    } else {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: async () => {
              try {
                await signOut();
                router.replace('/(auth)/role-selection');
              } catch (error) {
                console.error('Error signing out:', error);
                Alert.alert('Error', 'Failed to sign out');
              }
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <GlamGoLogo size="medium" />
      
      <Text style={styles.title}>You're all set!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.infoLabel}>Email: {userInfo.attributes?.email}</Text>
          <Text style={styles.infoLabel}>Name: {userInfo.attributes?.name}</Text>
          <Text style={styles.infoLabel}>Role: {userInfo.attributes?.['custom:role']}</Text>
          <Text style={styles.infoLabel}>User ID: {userInfo.user.userId}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FAF9F7', // Soft cream background for luxury feel
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 20,
    color: '#4A2B7C', // GlamGo Purple
    letterSpacing: 0.3,
  },
  separator: {
    marginVertical: 32,
    height: 1,
    width: '80%',
    backgroundColor: '#E8E8E8',
  },
  userInfoContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 32,
    padding: 28,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#4A2B7C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  infoLabel: {
    fontSize: 16,
    marginBottom: 14,
    color: '#2C2C2C',
    lineHeight: 22,
    fontWeight: '500',
  },
  signOutButton: {
    backgroundColor: '#4A2B7C', // GlamGo Purple
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#4A2B7C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

