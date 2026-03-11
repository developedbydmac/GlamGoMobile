/**
 * Catalog Service
 * Handles fetching stores, products, and search functionality
 */

import { apiClient } from './apiClient';

export interface Store {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  rating?: number;
  isOpen?: boolean;
  ownerId: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stockQuantity?: number;
  isAvailable?: boolean;
  rating?: number;
  storeName?: string;
}

export interface CatalogResponse {
  stores: Store[];
  products: Product[];
}

/**
 * Get all stores
 * Fetches from GET /customer/stores
 */
export async function getStores(): Promise<Store[]> {
  try {
    const response = await apiClient.get<{ stores: Store[] }>('/customer/stores');
    return response.stores || [];
  } catch (error) {
    console.error('Error fetching stores:', error);
    // Return empty array on error to prevent app crashes
    return [];
  }
}

/**
 * Get products for a specific store
 * Fetches from GET /customer/stores/{storeId}/products
 */
export async function getStoreProducts(storeId: string): Promise<Product[]> {
  try {
    const response = await apiClient.get<{ products: Product[] }>(
      `/customer/stores/${storeId}/products`
    );
    return response.products || [];
  } catch (error) {
    console.error(`Error fetching products for store ${storeId}:`, error);
    return [];
  }
}

/**
 * Search products across all stores
 * This could be implemented as:
 * 1. Client-side search (fetch all products, filter locally)
 * 2. Server-side search (dedicated search endpoint)
 * 
 * For now, implementing client-side search by fetching all stores
 * and their products, then filtering by query
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    // Get all stores first
    const stores = await getStores();
    
    if (stores.length === 0) {
      return [];
    }

    // Fetch products from all stores in parallel
    const productsPromises = stores.map(store => getStoreProducts(store.id));
    const productsArrays = await Promise.all(productsPromises);
    
    // Flatten all products into single array
    const allProducts = productsArrays.flat();
    
    // If no query, return all products
    if (!query || query.trim() === '') {
      return allProducts;
    }

    // Search by name, description, or category (case-insensitive)
    const lowercaseQuery = query.toLowerCase().trim();
    return allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(lowercaseQuery);
      const descriptionMatch = product.description?.toLowerCase().includes(lowercaseQuery);
      const categoryMatch = product.category?.toLowerCase().includes(lowercaseQuery);
      
      return nameMatch || descriptionMatch || categoryMatch;
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

/**
 * Get all products from all stores
 * Useful for browse/catalog screens
 */
export async function getAllProducts(): Promise<Product[]> {
  return searchProducts(''); // Empty query returns all products
}

/**
 * Get a specific product by ID
 * Searches across all stores to find the product
 */
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const allProducts = await getAllProducts();
    return allProducts.find(product => product.id === productId) || null;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
}

/**
 * Get featured or popular products
 * Can be customized with more logic (rating, sales, etc.)
 */
export async function getFeaturedProducts(limit: number = 10): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts();
    
    // Filter available products and sort by rating
    const availableProducts = allProducts
      .filter(product => product.isAvailable !== false)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return availableProducts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}
