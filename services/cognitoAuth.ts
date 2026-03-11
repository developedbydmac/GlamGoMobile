/**
 * Direct AWS Cognito Authentication Service
 * Bypasses Amplify to avoid storage adapter issues
 */

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, UserRole } from '@/types/user';
import { normalizeRole } from '@/types/user';

// Cognito User Pool Configuration
const poolData = {
  UserPoolId: 'us-east-1_ZMKLKcE8r',
  ClientId: '7gn4qd0rl40ddb132l7g72c2sl',
};

const userPool = new CognitoUserPool(poolData);

// Legacy AuthUser interface for backward compatibility
export interface AuthUser {
  username: string;
  email: string;
  role: UserRole;
  userId: string;
  attributes: any;
}

/**
 * Sign in with email and password
 */
export const signInWithCognito = (
  email: string,
  password: string
): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async (session) => {
        // Get user attributes to determine role
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
            return;
          }

          const attrs: any = {};
          attributes?.forEach((attr) => {
            attrs[attr.Name] = attr.Value;
          });

          // Determine role from custom attribute or email - ALWAYS UPPERCASE
          let role: UserRole = 'CUSTOMER';
          if (attrs['custom:role']) {
            role = normalizeRole(attrs['custom:role']);
          } else if (email.includes('vendor')) {
            role = 'VENDOR';
          } else if (email.includes('driver')) {
            role = 'DRIVER';
          } else if (email.includes('admin')) {
            role = 'ADMIN';
          }

          const user: AuthUser = {
            username: email,
            email: attrs.email || email,
            role, // Now always uppercase
            userId: attrs.sub || '',
            attributes: attrs,
          };

          // Store session tokens
          AsyncStorage.setItem('cognitoUser', JSON.stringify(user));
          AsyncStorage.setItem('idToken', session.getIdToken().getJwtToken());
          AsyncStorage.setItem('accessToken', session.getAccessToken().getJwtToken());
          AsyncStorage.setItem('refreshToken', session.getRefreshToken().getToken());

          resolve(user);
        });
      },
      onFailure: (err) => {
        console.error('Cognito Sign In Error:', err);
        reject(err);
      },
    });
  });
};

/**
 * Sign out current user
 */
export const signOutFromCognito = async (): Promise<void> => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }

  // Clear AsyncStorage
  await AsyncStorage.multiRemove([
    'cognitoUser',
    'idToken',
    'accessToken',
    'refreshToken',
  ]);
};

/**
 * Get current authenticated user
 * Returns user with UPPERCASE role
 */
export const getCurrentCognitoUser = async (): Promise<AuthUser | null> => {
  try {
    const userJson = await AsyncStorage.getItem('cognitoUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      // Ensure role is always uppercase for consistency
      if (user.role) {
        user.role = normalizeRole(user.role);
      }
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if user session is valid
 */
export const isSessionValid = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      resolve(false);
      return;
    }

    cognitoUser.getSession((err: any, session: any) => {
      if (err || !session.isValid()) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
};

/**
 * Get current session tokens
 */
export const getSessionTokens = async () => {
  return {
    idToken: await AsyncStorage.getItem('idToken'),
    accessToken: await AsyncStorage.getItem('accessToken'),
    refreshToken: await AsyncStorage.getItem('refreshToken'),
  };
};
