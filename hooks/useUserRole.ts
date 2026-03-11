/**
 * useUserRole Hook
 * 
 * Provides cached access to the current user's role and profile
 * Wraps getCurrentCognitoUser() with AuthContext caching to avoid repeated async calls
 */

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/user';
import type { AuthUser } from '@/services/cognitoAuth';

export interface UseUserRoleReturn {
  /**
   * Current user's role (CUSTOMER, VENDOR, DRIVER, ADMIN)
   * null if not authenticated
   */
  role: UserRole | null;
  
  /**
   * Cached user profile data
   * null if not authenticated
   */
  user: AuthUser | null;
  
  /**
   * Whether user data is currently being loaded
   */
  isLoading: boolean;
  
  /**
   * Refresh user role and profile from storage
   * Call this after sign-in/sign-out or when user data may have changed
   */
  refresh: () => Promise<void>;
  
  /**
   * Helper functions for role checking
   */
  isCustomer: boolean;
  isVendor: boolean;
  isDriver: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

/**
 * Hook to access current user role with caching
 * 
 * @example
 * ```tsx
 * const { role, user, isAdmin, refresh } = useUserRole();
 * 
 * if (isAdmin) {
 *   return <AdminDashboard />;
 * }
 * ```
 */
export function useUserRole(): UseUserRoleReturn {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useUserRole must be used within AuthProvider');
  }
  
  const { userRole, isLoading, refreshUserRole, cachedUser } = context;
  
  return {
    role: userRole,
    user: cachedUser,
    isLoading,
    refresh: refreshUserRole,
    
    // Helper booleans
    isCustomer: userRole === 'CUSTOMER',
    isVendor: userRole === 'VENDOR',
    isDriver: userRole === 'DRIVER',
    isAdmin: userRole === 'ADMIN',
    isAuthenticated: userRole !== null,
  };
}
