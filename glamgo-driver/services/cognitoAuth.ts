/**
 * Direct AWS Cognito Authentication Service
 * Bypasses Amplify to avoid storage adapter issues
 *
 * Security: Cognito configuration is loaded from amplifyConfig.ts
 * and amplify_outputs.json (managed by AWS). Never hardcode secrets.
 */

import type { UserRole } from "@/types/user";
import { normalizeRole } from "@/types/user";
import { logger } from "@/utils/logger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool
} from "amazon-cognito-identity-js";

// Load Cognito configuration from Amplify outputs
// This ensures config is loaded from environment, not hardcoded
import amplifyConfig from "@/amplify_outputs.json";

const poolData = {
  UserPoolId: amplifyConfig.auth.user_pool_id,
  ClientId: amplifyConfig.auth.user_pool_client_id,
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
  password: string,
): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    // Log only in development
    logger.authDebug("Sign-in attempt", { email });

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
            logger.error("Failed to get user attributes", err);
            reject(err);
            return;
          }

          const attrs: any = {};
          attributes?.forEach((attr) => {
            attrs[attr.Name] = attr.Value;
          });

          // Determine role from custom attribute (source of truth from post-confirmation Lambda)
          // Fallback to email parsing is only for legacy compatibility
          let role: UserRole = "CUSTOMER";
          if (attrs["custom:role"]) {
            role = normalizeRole(attrs["custom:role"]);
          } else if (email.includes("vendor")) {
            role = "VENDOR";
          } else if (email.includes("driver")) {
            role = "DRIVER";
          } else if (email.includes("admin")) {
            role = "ADMIN";
          }

          const user: AuthUser = {
            username: email,
            email: attrs.email || email,
            role, // Now always uppercase
            userId: attrs.sub || "",
            attributes: attrs,
          };

          // Store session tokens
          AsyncStorage.setItem("cognitoUser", JSON.stringify(user));
          AsyncStorage.setItem("idToken", session.getIdToken().getJwtToken());
          AsyncStorage.setItem(
            "accessToken",
            session.getAccessToken().getJwtToken(),
          );
          AsyncStorage.setItem(
            "refreshToken",
            session.getRefreshToken().getToken(),
          );

          logger.authDebug("Sign-in successful", { email, role });
          resolve(user);
        });
      },
      onFailure: (err) => {
        logger.error("Cognito sign-in failed", err);
        reject(err);
      },
    });
  });
};

/**
 * Sign out current user
 * Clears session server-side and removes tokens from AsyncStorage
 */
export const signOutFromCognito = async (): Promise<void> => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }

  // Explicitly clear all tokens from AsyncStorage
  // This ensures tokens cannot be recovered after logout
  await AsyncStorage.multiRemove([
    "cognitoUser",
    "idToken",
    "accessToken",
    "refreshToken",
  ]);

  logger.debug("User signed out and tokens cleared");
};

/**
 * Get current authenticated user
 * Returns user with UPPERCASE role
 */
export const getCurrentCognitoUser = async (): Promise<AuthUser | null> => {
  try {
    const userJson = await AsyncStorage.getItem("cognitoUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      // Ensure role is always uppercase for consistency
      if (user.role) {
        user.role = normalizeRole(user.role);
      }
      logger.userDebug("Current user loaded", user);
      return user;
    }
    return null;
  } catch (error) {
    logger.error("Error getting current user", error);
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
        logger.debug("Session validation failed");
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
};

/**
 * Decode JWT token to extract claims
 * @param token JWT token string
 * @returns Decoded token payload
 */
const decodeToken = (token: string): Record<string, any> => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    logger.error("Error decoding token", error);
    return {};
  }
};

/**
 * Extract Cognito groups from ID token
 * Groups are assigned by post-confirmation Lambda and stored in token claims
 * @returns Array of group names (e.g., ["CUSTOMER"], ["VENDOR", "APPROVED"])
 */
export const getGroupsFromIdToken = async (): Promise<string[]> => {
  try {
    const idToken = await AsyncStorage.getItem("idToken");
    if (!idToken) {
      logger.debug("No ID token found");
      return [];
    }

    const decoded = decodeToken(idToken);
    const groups = decoded["cognito:groups"] || [];
    
    logger.authDebug("Groups extracted from ID token", { groups });
    return groups;
  } catch (error) {
    logger.error("Error extracting groups from token", error);
    return [];
  }
};

/**
 * Check if user has a specific group membership
 * @param groupName Group name to check (e.g., "VENDOR", "ADMIN")
 * @returns true if user is in the group
 */
export const hasGroup = async (groupName: string): Promise<boolean> => {
  const groups = await getGroupsFromIdToken();
  return groups.includes(groupName);
};

/**
 * Get current session tokens
 */
export const getSessionTokens = async () => {
  return {
    idToken: await AsyncStorage.getItem("idToken"),
    accessToken: await AsyncStorage.getItem("accessToken"),
    refreshToken: await AsyncStorage.getItem("refreshToken"),
  };
};
