/**
 * Mock Data Service for Demo Mode
 * When EXPO_PUBLIC_API_URL is not set, use mock data instead of API calls
 * This allows full UI/UX testing without backend deployment
 */

export const MOCK_ORDERS = [
  {
    id: "order-1",
    userId: "user-1",
    vendorId: "vendor-1",
    driverId: "driver-1",
    status: "DELIVERED",
    items: [
      { productId: "prod-1", name: "Luxury Makeup Set", quantity: 1, price: 45.99 },
      { productId: "prod-2", name: "Hair Serum", quantity: 2, price: 28.50 },
    ],
    totalAmount: 102.99,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "order-2",
    userId: "user-2",
    vendorId: "vendor-1",
    driverId: null,
    status: "PENDING",
    items: [{ productId: "prod-3", name: "Nail Polish Collection", quantity: 1, price: 34.99 }],
    totalAmount: 34.99,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "order-3",
    userId: "user-3",
    vendorId: "vendor-2",
    driverId: "driver-2",
    status: "IN_TRANSIT",
    items: [
      { productId: "prod-4", name: "Skincare Bundle", quantity: 1, price: 89.99 },
    ],
    totalAmount: 89.99,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    vendorId: "vendor-1",
    name: "Luxury Makeup Set",
    description: "Complete makeup collection with foundation, lipstick, and more",
    price: 45.99,
    image: "https://via.placeholder.com/400?text=Makeup+Set",
    category: "Makeup",
    stock: 15,
    status: "ACTIVE",
  },
  {
    id: "prod-2",
    vendorId: "vendor-1",
    name: "Hair Serum",
    description: "Premium silk-infused hair serum for shine and protection",
    price: 28.50,
    image: "https://via.placeholder.com/400?text=Hair+Serum",
    category: "Hair Care",
    stock: 42,
    status: "ACTIVE",
  },
  {
    id: "prod-3",
    vendorId: "vendor-1",
    name: "Nail Polish Collection",
    description: "10-piece nail polish set with vibrant colors",
    price: 34.99,
    image: "https://via.placeholder.com/400?text=Nail+Polish",
    category: "Nails",
    stock: 8,
    status: "ACTIVE",
  },
  {
    id: "prod-4",
    vendorId: "vendor-2",
    name: "Skincare Bundle",
    description: "Face cleanser, toner, and moisturizer set",
    price: 89.99,
    image: "https://via.placeholder.com/400?text=Skincare",
    category: "Skincare",
    stock: 25,
    status: "ACTIVE",
  },
  {
    id: "prod-5",
    vendorId: "vendor-2",
    name: "Lip Balm Pack",
    description: "Organic lip balm in 5 flavors",
    price: 12.99,
    image: "https://via.placeholder.com/400?text=Lip+Balm",
    category: "Lip Care",
    stock: 60,
    status: "ACTIVE",
  },
];

export const MOCK_USERS = [
  {
    id: "vendor-1",
    email: "vendor@test.com",
    name: "GlamGo Cosmetics",
    role: "VENDOR",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
  },
  {
    id: "vendor-2",
    email: "vendor2@test.com",
    name: "Beauty Paradise",
    role: "VENDOR",
    status: "PENDING",
    createdAt: new Date(Date.now() - 1296000000).toISOString(),
  },
  {
    id: "driver-1",
    email: "driver@test.com",
    name: "John Driver",
    role: "DRIVER",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
  },
  {
    id: "driver-2",
    email: "driver2@test.com",
    name: "Maria Driver",
    role: "DRIVER",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 1296000000).toISOString(),
  },
  {
    id: "admin-1",
    email: "admin@test.com",
    name: "Admin User",
    role: "ADMIN",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
  },
];

export const MOCK_DRIVERS = [
  {
    id: "driver-1",
    name: "John Driver",
    email: "driver@test.com",
    phone: "+1-555-0001",
    status: "ACTIVE",
    currentLocation: { lat: 40.7128, lng: -74.006 },
    totalDeliveries: 127,
    rating: 4.8,
  },
  {
    id: "driver-2",
    name: "Maria Driver",
    email: "driver2@test.com",
    phone: "+1-555-0002",
    status: "ACTIVE",
    currentLocation: { lat: 40.758, lng: -73.9855 },
    totalDeliveries: 94,
    rating: 4.9,
  },
  {
    id: "driver-3",
    name: "Alex Delivery",
    email: "driver3@test.com",
    phone: "+1-555-0003",
    status: "OFFLINE",
    currentLocation: { lat: 40.6892, lng: -74.0445 },
    totalDeliveries: 45,
    rating: 4.6,
  },
];

export const MOCK_PENDING_USERS = [
  {
    id: "user-pending-1",
    email: "vendor-pending@test.com",
    name: "Pending Vendor Inc",
    role: "VENDOR",
    status: "PENDING",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "user-pending-2",
    email: "driver-pending@test.com",
    name: "John Pending",
    role: "DRIVER",
    status: "PENDING",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

/**
 * Simulates API delay
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock implementation of common API operations
 */
export const mockApiOperations = {
  // Auth
  async signIn(email: string, password: string) {
    await delay(1000); // Simulate network delay
    const user = MOCK_USERS.find((u) => u.email === email);
    if (user) {
      return {
        success: true,
        user,
        token: `mock-jwt-token-${Date.now()}`,
      };
    }
    throw new Error("Invalid credentials");
  },

  async signUp(email: string, name: string, role: string) {
    await delay(1000);
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
    MOCK_USERS.push(newUser);
    return { success: true, user: newUser };
  },

  // Orders
  async listOrders(filters?: { status?: string; driverId?: string; vendorId?: string }) {
    await delay(500);
    let orders = [...MOCK_ORDERS];
    if (filters?.status) {
      orders = orders.filter((o) => o.status === filters.status);
    }
    if (filters?.driverId) {
      orders = orders.filter((o) => o.driverId === filters.driverId);
    }
    if (filters?.vendorId) {
      orders = orders.filter((o) => o.vendorId === filters.vendorId);
    }
    return { success: true, data: orders };
  },

  async getOrder(orderId: string) {
    await delay(300);
    const order = MOCK_ORDERS.find((o) => o.id === orderId);
    if (order) {
      return { success: true, data: order };
    }
    throw new Error("Order not found");
  },

  async updateOrderStatus(orderId: string, status: string, driverId?: string) {
    await delay(500);
    const order = MOCK_ORDERS.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      if (driverId) {
        order.driverId = driverId;
      }
      order.updatedAt = new Date().toISOString();
      return { success: true, data: order };
    }
    throw new Error("Order not found");
  },

  // Products
  async listProducts(vendorId?: string) {
    await delay(500);
    if (vendorId) {
      return { success: true, data: MOCK_PRODUCTS.filter((p) => p.vendorId === vendorId) };
    }
    return { success: true, data: MOCK_PRODUCTS };
  },

  async getProduct(productId: string) {
    await delay(300);
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      return { success: true, data: product };
    }
    throw new Error("Product not found");
  },

  // Users
  async listUsers(role?: string) {
    await delay(500);
    if (role) {
      return { success: true, data: MOCK_USERS.filter((u) => u.role === role) };
    }
    return { success: true, data: MOCK_USERS };
  },

  async listPendingUsers() {
    await delay(500);
    return { success: true, data: MOCK_PENDING_USERS };
  },

  async approveUser(userId: string) {
    await delay(500);
    const user = [...MOCK_USERS, ...MOCK_PENDING_USERS].find((u) => u.id === userId);
    if (user) {
      user.status = "APPROVED";
      return { success: true, data: user };
    }
    throw new Error("User not found");
  },

  // Drivers
  async listDrivers() {
    await delay(500);
    return { success: true, data: MOCK_DRIVERS };
  },

  async getDriver(driverId: string) {
    await delay(300);
    const driver = MOCK_DRIVERS.find((d) => d.id === driverId);
    if (driver) {
      return { success: true, data: driver };
    }
    throw new Error("Driver not found");
  },
};
