import { fetchAuthSession } from "aws-amplify/auth";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * API Gateway Client for GlamGo
 * Automatically adds JWT tokens and handles authentication
 */
class ApiGatewayClient {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor() {
    // This will be populated from amplify_outputs.json after deployment
    this.baseURL = process.env.EXPO_PUBLIC_API_URL || "";

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          // Get current auth session
          const session = await fetchAuthSession();
          const token = session.tokens?.idToken?.toString();

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("🔑 Added auth token to request:", {
              url: config.url,
              method: config.method,
            });
          } else {
            console.warn("⚠️ No auth token available");
          }
        } catch (error) {
          console.error("❌ Failed to get auth session:", error);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log("✅ API Response:", {
          url: response.config.url,
          status: response.status,
        });
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          console.error("❌ API Error Response:", {
            url: error.config?.url,
            status: error.response.status,
            data: error.response.data,
          });

          // Handle specific error codes
          if (error.response.status === 401) {
            console.error("🔒 Unauthorized - Invalid or expired token");
          } else if (error.response.status === 403) {
            console.error("🚫 Forbidden - Insufficient permissions");
          }
        } else if (error.request) {
          console.error("❌ API Network Error:", error.message);
        } else {
          console.error("❌ API Request Error:", error.message);
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * Set the base URL for the API Gateway
   * Call this after Amplify is configured with the API URL from amplify_outputs.json
   */
  setBaseURL(url: string): void {
    this.baseURL = url;
    this.axiosInstance.defaults.baseURL = url;
    console.log("🌐 API Gateway URL set to:", url);
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * Health check for a specific role route
   */
  async healthCheck(role: "customer" | "vendor" | "driver" | "admin"): Promise<{
    message: string;
    role: string;
    timestamp: string;
    authorizer: any;
  }> {
    return this.get(`/${role}/health`);
  }
}

// Export singleton instance
export const apiClient = new ApiGatewayClient();

/**
 * Role-specific API clients
 */
export const customerApi = {
  healthCheck: () => apiClient.healthCheck("customer"),

  /**
   * Create a new order
   */
  createOrder: async (orderData: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    deliveryAddress: string;
    deliveryLat: number;
    deliveryLng: number;
    items: Array<{
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }>;
    notes?: string;
  }) => {
    return apiClient.post("/customer/orders", orderData);
  },

  /**
   * Get all stores
   */
  getStores: async () => {
    return apiClient.get("/customer/stores");
  },

  /**
   * Get products for a specific store
   */
  getStoreProducts: async (storeId: string) => {
    return apiClient.get(`/customer/stores/${storeId}/products`);
  },
};

export const vendorApi = {
  healthCheck: () => apiClient.healthCheck("vendor"),
  // Add more vendor endpoints here
};

export const driverApi = {
  healthCheck: () => apiClient.healthCheck("driver"),

  /**
   * Find nearby available drivers
   */
  findNearbyDrivers: async (
    lat: number,
    lng: number,
    maxDistance: number = 10,
  ) => {
    return apiClient.get(
      `/driver/nearby?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`,
    );
  },
};

export const adminApi = {
  healthCheck: () => apiClient.healthCheck("admin"),
  // Add more admin endpoints here
};
