/**
 * Inventory Service Layer
 * 
 * Wraps AWS AppSync GraphQL API calls for vendor product management.
 * Uses your existing Amplify DataStore schema from amplify/data/resource.ts
 */

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  inventoryCount: number;
  isAvailable: boolean | null;
  category: string;
  imageKey?: string | null;
  storeId: string;
  vendorId: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all products for the current vendor
 * Uses AppSync API with owner-based authorization
 */
export const getInventory = async (): Promise<Product[]> => {
  try {
    console.log('📦 Fetching vendor inventory from AppSync...');
    
    const { data: products, errors } = await client.models.Product.list({
      // This will automatically filter by owner (current authenticated user)
      // due to the authorization rules in your schema
    });

    if (errors) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to fetch inventory');
    }

    console.log(`✅ Fetched ${products.length} products`);
    
    return products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      inventoryCount: p.inventoryCount,
      isAvailable: p.isAvailable,
      category: p.category,
      imageKey: p.imageKey,
      storeId: p.storeId,
      vendorId: p.vendorId,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  } catch (error) {
    console.error('❌ Error fetching inventory:', error);
    throw error;
  }
};

/**
 * Add a new product to inventory
 * Requires storeId - vendor must have a store first
 */
export const addProduct = async (
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'vendorId' | 'storeId'> & { storeId: string; vendorId: string }
): Promise<Product> => {
  try {
    console.log('➕ Adding product to AppSync:', product.name);

    const { data: newProduct, errors } = await client.models.Product.create({
      name: product.name,
      price: product.price,
      description: product.description || '',
      inventoryCount: product.inventoryCount,
      isAvailable: product.isAvailable,
      category: product.category,
      imageKey: product.imageKey || '',
      storeId: product.storeId,
      vendorId: product.vendorId,
    });

    if (errors || !newProduct) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to create product');
    }

    console.log('✅ Product created:', newProduct.id);
    
    return {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      inventoryCount: newProduct.inventoryCount,
      isAvailable: newProduct.isAvailable,
      category: newProduct.category,
      imageKey: newProduct.imageKey,
      storeId: newProduct.storeId,
      vendorId: newProduct.vendorId,
      createdAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt,
    };
  } catch (error) {
    console.error('❌ Error adding product:', error);
    throw error;
  }
};

/**
 * Update an existing product
 * Owner-based authorization ensures vendors can only update their own products
 */
export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    console.log('✏️ Updating product in AppSync:', product.id);

    const { data: updatedProduct, errors } = await client.models.Product.update({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description || '',
      inventoryCount: product.inventoryCount,
      isAvailable: product.isAvailable,
      category: product.category,
      imageKey: product.imageKey || '',
    });

    if (errors || !updatedProduct) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to update product');
    }

    console.log('✅ Product updated:', updatedProduct.id);
    
    return {
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      inventoryCount: updatedProduct.inventoryCount,
      isAvailable: updatedProduct.isAvailable,
      category: updatedProduct.category,
      imageKey: updatedProduct.imageKey,
      storeId: updatedProduct.storeId,
      vendorId: updatedProduct.vendorId,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    };
  } catch (error) {
    console.error('❌ Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product from inventory
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    console.log('🗑️ Deleting product from AppSync:', productId);

    const { data, errors } = await client.models.Product.delete({
      id: productId,
    });

    if (errors) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to delete product');
    }

    console.log('✅ Product deleted');
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    throw error;
  }
};

/**
 * Get vendor's store (needed for creating products)
 * Returns the first store owned by the vendor
 */
export const getVendorStore = async (): Promise<any> => {
  try {
    const { data: stores, errors } = await client.models.Store.list();

    if (errors) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to fetch store');
    }

    if (stores.length === 0) {
      throw new Error('NO_STORE_FOUND');
    }

    return stores[0];
  } catch (error) {
    console.error('❌ Error fetching store:', error);
    throw error;
  }
};
