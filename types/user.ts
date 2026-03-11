/**
 * User Types - Centralized type definitions for user roles and profiles
 * 
 * Design Decision: All roles in UPPERCASE to match AWS Cognito groups
 * and ensure consistency across the application
 */

/**
 * Unified user role type
 * Matches Cognito groups exactly
 */
export type UserRole = 'CUSTOMER' | 'VENDOR' | 'DRIVER' | 'ADMIN';

/**
 * User approval status
 * Determines access to role-specific features
 */
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'SUSPENDED';

/**
 * User profile from Cognito and DynamoDB
 */
export interface User {
  userId: string;
  email: string;
  name?: string;
  role: UserRole;
  status?: ApprovalStatus;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Cached user data for AuthContext
 */
export interface CachedUserData {
  user: User;
  timestamp: number;
  expiresAt: number;
}

/**
 * Type guard to check if a string is a valid UserRole
 */
export function isValidUserRole(role: string): role is UserRole {
  return ['CUSTOMER', 'VENDOR', 'DRIVER', 'ADMIN'].includes(role.toUpperCase());
}

/**
 * Type guard to check if a status is valid
 */
export function isValidApprovalStatus(status: string): status is ApprovalStatus {
  return ['PENDING', 'APPROVED', 'SUSPENDED'].includes(status.toUpperCase());
}

/**
 * Helper to normalize role to uppercase
 */
export function normalizeRole(role: string): UserRole {
  const normalized = role.toUpperCase();
  if (!isValidUserRole(normalized)) {
    throw new Error(`Invalid user role: ${role}`);
  }
  return normalized;
}
