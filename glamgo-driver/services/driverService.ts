/**
 * Driver Service Layer
 * Manages driver profiles and assignments
 */

import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export interface Driver {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  vehicleType?: string | null;
  licensePlate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all approved drivers
 */
export const getAllDrivers = async (): Promise<Driver[]> => {
  try {
    const { data: profiles, errors } = await client.models.UserProfile.list({
      filter: {
        and: [{ role: { eq: "DRIVER" } }, { status: { eq: "APPROVED" } }],
      },
    });

    if (errors) {
      console.error("❌ GraphQL errors:", errors);
      throw new Error("Failed to fetch drivers");
    }

    if (!profiles || profiles.length === 0) {
      return [];
    }

    return profiles.map((profile) => ({
      id: profile.id,
      userId: profile.userId,
      name: profile.name || "Unknown Driver",
      email: profile.email,
      role: profile.role,
      status: profile.status,
      vehicleType: profile.vehicleType,
      licensePlate: profile.licensePlate,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    }));
  } catch (error) {
    console.error("❌ Error fetching drivers:", error);
    throw error;
  }
};

/**
 * Assign a driver to an order
 */
export const assignDriverToOrder = async (
  orderId: string,
  driverId: string,
  driverName: string,
): Promise<boolean> => {
  try {
    const { data: updatedOrder, errors } = await client.models.Order.update({
      id: orderId,
      driverId,
      driverName,
      status: "CONFIRMED", // Auto-confirm when driver is assigned
      confirmedAt: new Date().toISOString(),
    });

    if (errors || !updatedOrder) {
      console.error("❌ GraphQL errors:", errors);
      throw new Error("Failed to assign driver");
    }

    return true;
  } catch (error) {
    console.error("❌ Error assigning driver:", error);
    throw error;
  }
};
