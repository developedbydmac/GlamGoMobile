/**
 * UserProfile Service
 * 
 * Handles CRUD operations for UserProfile data in DynamoDB via AppSync.
 * Used for approval workflow and status management.
 */

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import type { ApprovalStatus } from '@/types/user';

const client = generateClient<Schema>();

export interface UserProfileData {
  userId: string;
  email: string;
  name?: string;
  phone?: string;
  role: 'CUSTOMER' | 'VENDOR' | 'DRIVER' | 'ADMIN';
  status: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetch a user profile by userId (Cognito sub)
 */
export async function getUserProfile(userId: string): Promise<UserProfileData | null> {
  try {
    const { data: profiles } = await client.models.UserProfile.list({
      filter: { userId: { eq: userId } }
    });

    if (!profiles || profiles.length === 0) {
      console.log('No UserProfile found for userId:', userId);
      return null;
    }

    return profiles[0] as UserProfileData;
  } catch (error) {
    console.error('Error fetching UserProfile:', error);
    return null;
  }
}

/**
 * Create a new user profile
 * Called by Lambda post-confirmation trigger
 */
export async function createUserProfile(data: Omit<UserProfileData, 'createdAt' | 'updatedAt'>): Promise<UserProfileData | null> {
  try {
    const { data: profile, errors } = await client.models.UserProfile.create({
      userId: data.userId,
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: data.role,
      status: data.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (errors) {
      console.error('Error creating UserProfile:', errors);
      return null;
    }

    return profile as UserProfileData;
  } catch (error) {
    console.error('Error creating UserProfile:', error);
    return null;
  }
}

/**
 * Update user profile status (Admin only)
 */
export async function updateUserProfileStatus(
  profileId: string,
  status: ApprovalStatus,
  adminUserId: string
): Promise<boolean> {
  try {
    const { data: profile, errors } = await client.models.UserProfile.update({
      id: profileId,
      status,
      approvedBy: adminUserId,
      approvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (errors) {
      console.error('Error updating UserProfile status:', errors);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating UserProfile status:', error);
    return false;
  }
}

/**
 * List all pending user profiles (Admin only)
 * Used in admin dashboard for approval management
 */
export async function listPendingUsers(): Promise<UserProfileData[]> {
  try {
    const { data: profiles } = await client.models.UserProfile.list({
      filter: { status: { eq: 'PENDING' } }
    });

    if (!profiles || profiles.length === 0) {
      return [];
    }

    return profiles as UserProfileData[];
  } catch (error) {
    console.error('Error fetching pending users:', error);
    return [];
  }
}

/**
 * List all user profiles with optional filters (Admin only)
 */
export async function listAllUsers(filters?: {
  role?: 'CUSTOMER' | 'VENDOR' | 'DRIVER' | 'ADMIN';
  status?: ApprovalStatus;
}): Promise<UserProfileData[]> {
  try {
    let filterConditions: any = {};

    if (filters?.role) {
      filterConditions.role = { eq: filters.role };
    }
    if (filters?.status) {
      filterConditions.status = { eq: filters.status };
    }

    const { data: profiles } = await client.models.UserProfile.list({
      filter: Object.keys(filterConditions).length > 0 ? filterConditions : undefined
    });

    if (!profiles || profiles.length === 0) {
      return [];
    }

    return profiles as UserProfileData[];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
