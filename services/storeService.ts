/**
 * Store Service Layer
 * Vendor store management
 */

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient<Schema>();

export interface Store {
  id: string;
  name: string;
  description?: string | null;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber?: string | null;
  imageKey?: string | null;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  isActive: boolean | null;
  rating: number | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get current vendor's store
 */
export const getMyStore = async (): Promise<Store | null> => {
  try {
    const { data: stores, errors } = await client.models.Store.list();

    if (errors) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to fetch store');
    }

    if (stores.length === 0) {
      return null;
    }

    const store = stores[0];
    return {
      id: store.id,
      name: store.name,
      description: store.description,
      address: store.address,
      city: store.city,
      state: store.state,
      zipCode: store.zipCode,
      phoneNumber: store.phoneNumber,
      imageKey: store.imageKey,
      vendorId: store.vendorId,
      vendorName: store.vendorName,
      vendorEmail: store.vendorEmail,
      isActive: store.isActive,
      rating: store.rating,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    };
  } catch (error) {
    console.error('❌ Error fetching store:', error);
    throw error;
  }
};

/**
 * Create a new store
 */
export const createStore = async (
  storeData: Omit<Store, 'id' | 'vendorId' | 'vendorName' | 'vendorEmail' | 'isActive' | 'rating' | 'createdAt' | 'updatedAt'>
): Promise<Store> => {
  try {
    const user = await getCurrentUser();
    const userAttributes = user.signInDetails?.loginId || user.userId;

    const { data: newStore, errors } = await client.models.Store.create({
      name: storeData.name,
      description: storeData.description || '',
      address: storeData.address,
      city: storeData.city,
      state: storeData.state,
      zipCode: storeData.zipCode,
      phoneNumber: storeData.phoneNumber || '',
      imageKey: storeData.imageKey || '',
      vendorId: user.userId,
      vendorName: storeData.name, // Will be updated with real name later
      vendorEmail: userAttributes,
      isActive: true,
      rating: 0,
    });

    if (errors || !newStore) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to create store');
    }

    return {
      id: newStore.id,
      name: newStore.name,
      description: newStore.description,
      address: newStore.address,
      city: newStore.city,
      state: newStore.state,
      zipCode: newStore.zipCode,
      phoneNumber: newStore.phoneNumber,
      imageKey: newStore.imageKey,
      vendorId: newStore.vendorId,
      vendorName: newStore.vendorName,
      vendorEmail: newStore.vendorEmail,
      isActive: newStore.isActive,
      rating: newStore.rating,
      createdAt: newStore.createdAt,
      updatedAt: newStore.updatedAt,
    };
  } catch (error) {
    console.error('❌ Error creating store:', error);
    throw error;
  }
};

/**
 * Update store details
 */
export const updateStore = async (store: Store): Promise<Store> => {
  try {
    const { data: updatedStore, errors } = await client.models.Store.update({
      id: store.id,
      name: store.name,
      description: store.description || '',
      address: store.address,
      city: store.city,
      state: store.state,
      zipCode: store.zipCode,
      phoneNumber: store.phoneNumber || '',
      imageKey: store.imageKey || '',
      isActive: store.isActive,
    });

    if (errors || !updatedStore) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to update store');
    }

    return {
      id: updatedStore.id,
      name: updatedStore.name,
      description: updatedStore.description,
      address: updatedStore.address,
      city: updatedStore.city,
      state: updatedStore.state,
      zipCode: updatedStore.zipCode,
      phoneNumber: updatedStore.phoneNumber,
      imageKey: updatedStore.imageKey,
      vendorId: updatedStore.vendorId,
      vendorName: updatedStore.vendorName,
      vendorEmail: updatedStore.vendorEmail,
      isActive: updatedStore.isActive,
      rating: updatedStore.rating,
      createdAt: updatedStore.createdAt,
      updatedAt: updatedStore.updatedAt,
    };
  } catch (error) {
    console.error('❌ Error updating store:', error);
    throw error;
  }
};

/**
 * Get all stores (for customer browsing)
 */
export const getAllStores = async (): Promise<Store[]> => {
  try {
    const { data: stores, errors } = await client.models.Store.list({
      filter: { isActive: { eq: true } },
    });

    if (errors) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to fetch stores');
    }

    return stores.map(store => ({
      id: store.id,
      name: store.name,
      description: store.description,
      address: store.address,
      city: store.city,
      state: store.state,
      zipCode: store.zipCode,
      phoneNumber: store.phoneNumber,
      imageKey: store.imageKey,
      vendorId: store.vendorId,
      vendorName: store.vendorName,
      vendorEmail: store.vendorEmail,
      isActive: store.isActive,
      rating: store.rating,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    }));
  } catch (error) {
    console.error('❌ Error fetching stores:', error);
    throw error;
  }
};
