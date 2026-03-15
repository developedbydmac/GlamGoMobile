/**
 * Hybrid UserProfile Service
 * Seamlessly switches between real AppSync and mock data based on API mode
 */

import { apiModeController } from "./apiMode";
import { mockApiOperations, MOCK_PENDING_USERS, MOCK_USERS, delay } from "./mockData";
import type { ApprovalStatus } from "@/types/user";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export interface UserProfileData {
  id?: string;
  userId: string;
  email: string;
  name?: string;
  phone?: string;
  role: "CUSTOMER" | "VENDOR" | "DRIVER" | "ADMIN";
  status: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get user profile - real or mock
 */
export async function getUserProfile(userId: string): Promise<UserProfileData | null> {
  if (apiModeController.isMockMode()) {
    await delay(500);
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role as any,
        status: user.status as ApprovalStatus,
        createdAt: user.createdAt,
        updatedAt: user.createdAt,
      };
    }
    return null;
  }

  // Real API call
  try {
    const { data: profiles } = await client.models.UserProfile.list({
      filter: { userId: { eq: userId } },
    });

    if (!profiles || profiles.length === 0) {
      console.log("No UserProfile found for userId:", userId);
      return null;
    }

    return profiles[0] as UserProfileData;
  } catch (error) {
    console.error("Error fetching UserProfile:", error);
    return null;
  }
}

/**
 * Create user profile - real or mock
 */
export async function createUserProfile(
  data: Omit<UserProfileData, "createdAt" | "updatedAt">,
): Promise<UserProfileData | null> {
  if (apiModeController.isMockMode()) {
    await delay(500);
    const newProfile: UserProfileData = {
      userId: data.userId,
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: data.role,
      status: data.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newProfile;
  }

  // Real API call
  try {
    const { data: profile, errors } = await client.models.UserProfile.create({
      userId: data.userId,
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: data.role,
      status: data.status,
    });

    if (errors) {
      console.error("Error creating UserProfile:", errors);
      return null;
    }

    return profile as UserProfileData;
  } catch (error) {
    console.error("Error creating UserProfile:", error);
    return null;
  }
}

/**
 * Update user profile status - real or mock
 */
export async function updateUserProfileStatus(
  profileId: string,
  status: ApprovalStatus,
  adminUserId: string,
): Promise<boolean> {
  if (apiModeController.isMockMode()) {
    await delay(500);
    // Find and update in mock data
    const user = [...MOCK_USERS, ...MOCK_PENDING_USERS].find((u) => u.id === profileId);
    if (user) {
      user.status = status;
      return true;
    }
    return false;
  }

  // Real API call
  try {
    const { data: profile, errors } = await client.models.UserProfile.update({
      id: profileId,
      status,
      approvedBy: adminUserId,
      approvedAt: new Date().toISOString(),
    });

    if (errors) {
      console.error("Error updating UserProfile status:", errors);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating UserProfile status:", error);
    return false;
  }
}

/**
 * List pending users - real or mock
 */
export async function listPendingUsers(): Promise<UserProfileData[]> {
  if (apiModeController.isMockMode()) {
    await delay(500);
    return MOCK_PENDING_USERS.map((user) => ({
      id: user.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      status: user.status as ApprovalStatus,
      createdAt: user.createdAt,
      updatedAt: user.createdAt,
    }));
  }

  // Real API call
  try {
    const { data: profiles } = await client.models.UserProfile.list({
      filter: { status: { eq: "PENDING" } },
    });

    if (!profiles || profiles.length === 0) {
      return [];
    }

    return profiles as UserProfileData[];
  } catch (error) {
    console.error("Error fetching pending users:", error);
    return [];
  }
}

/**
 * List all users - real or mock
 */
export async function listAllUsers(filters?: {
  role?: "CUSTOMER" | "VENDOR" | "DRIVER" | "ADMIN";
  status?: ApprovalStatus;
}): Promise<UserProfileData[]> {
  if (apiModeController.isMockMode()) {
    await delay(500);
    let results = MOCK_USERS;

    if (filters?.role) {
      results = results.filter((u) => u.role === filters.role);
    }
    if (filters?.status) {
      results = results.filter((u) => u.status === filters.status);
    }

    return results.map((user) => ({
      id: user.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      status: user.status as ApprovalStatus,
      createdAt: user.createdAt,
      updatedAt: user.createdAt,
    }));
  }

  // Real API call
  try {
    let filterConditions: any = {};

    if (filters?.role) {
      filterConditions.role = { eq: filters.role };
    }
    if (filters?.status) {
      filterConditions.status = { eq: filters.status };
    }

    const { data: profiles } = await client.models.UserProfile.list({
      filter: Object.keys(filterConditions).length > 0 ? filterConditions : undefined,
    });

    if (!profiles || profiles.length === 0) {
      return [];
    }

    return profiles as UserProfileData[];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
