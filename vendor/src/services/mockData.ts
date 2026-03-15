import {
  VendorProfile,
  Product,
  VendorOrder,
  VendorDashboardStats,
  Review,
  Analytics,
  ProductStatus,
  OrderStatus,
} from '@/types';

// Mock vendor data
const mockVendor: VendorProfile = {
  id: 'vendor-001',
  name: 'Glamorous Beauty Co',
  email: 'vendor@glamgo.com',
  phone: '555-0100',
  businessName: 'Glamorous Beauty Co',
  businessDescription: 'Premium beauty and cosmetics products',
  address: '123 Beauty Lane',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  status: 'APPROVED',
  approvedAt: '2024-01-15',
  createdAt: '2024-01-01',
  updatedAt: '2024-03-14',
  logo: 'https://via.placeholder.com/200?text=GlamBeauty',
  website: 'https://glambeauty.com',
  socialLinks: {
    instagram: '@glambeauty',
    facebook: 'glambeautyco',
    tiktok: '@glambeauty',
  },
  rating: 4.8,
  totalReviews: 342,
  totalProducts: 24,
  totalSales: 156800,
};

// Mock products
const mockProducts: Product[] = [
  {
    id: 'prod-001',
    vendorId: 'vendor-001',
    name: 'Luxury Lipstick Collection',
    description: 'Premium matte and satin finish lipsticks',
    price: 24.99,
    originalPrice: 34.99,
    category: 'Makeup',
    images: ['https://via.placeholder.com/300?text=Lipstick'],
    status: 'ACTIVE',
    stock: 150,
    sku: 'LIP-001',
    rating: 4.9,
    reviewCount: 89,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-14',
  },
  {
    id: 'prod-002',
    vendorId: 'vendor-001',
    name: 'Hydrating Face Serum',
    description: 'Vitamin C enriched hydrating serum',
    price: 45.99,
    category: 'Skincare',
    images: ['https://via.placeholder.com/300?text=Serum'],
    status: 'ACTIVE',
    stock: 78,
    sku: 'SER-001',
    rating: 4.7,
    reviewCount: 156,
    createdAt: '2024-02-05',
    updatedAt: '2024-03-14',
  },
  {
    id: 'prod-003',
    vendorId: 'vendor-001',
    name: 'Professional Makeup Brush Set',
    description: '15-piece professional brush collection',
    price: 59.99,
    originalPrice: 79.99,
    category: 'Tools',
    images: ['https://via.placeholder.com/300?text=Brushes'],
    status: 'ACTIVE',
    stock: 42,
    sku: 'BRUSH-001',
    rating: 4.8,
    reviewCount: 234,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-14',
  },
  {
    id: 'prod-004',
    vendorId: 'vendor-001',
    name: 'Eyeshadow Palette',
    description: 'Signature eyeshadow palette with 12 shades',
    price: 38.99,
    category: 'Makeup',
    images: ['https://via.placeholder.com/300?text=Eyeshadow'],
    status: 'DRAFT',
    stock: 0,
    sku: 'EYE-001',
    rating: 0,
    reviewCount: 0,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-14',
  },
];

// Mock orders
const mockOrders: VendorOrder[] = [
  {
    id: 'order-001',
    customerId: 'cust-001',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    customerPhone: '555-1234',
    items: [
      { productId: 'prod-001', productName: 'Luxury Lipstick Collection', quantity: 2, price: 24.99, subtotal: 49.98 },
    ],
    totalAmount: 49.98,
    status: 'DELIVERED',
    paymentStatus: 'COMPLETED',
    shippingAddress: '456 Oak Street',
    shippingCity: 'Boston',
    shippingState: 'MA',
    shippingZip: '02101',
    driver: { id: 'driver-001', name: 'John Driver', phone: '555-5678', rating: 4.9 },
    createdAt: '2024-03-10',
    updatedAt: '2024-03-12',
    estimatedDelivery: '2024-03-13',
  },
  {
    id: 'order-002',
    customerId: 'cust-002',
    customerName: 'Emma Davis',
    customerEmail: 'emma@example.com',
    customerPhone: '555-5678',
    items: [
      { productId: 'prod-002', productName: 'Hydrating Face Serum', quantity: 1, price: 45.99, subtotal: 45.99 },
      { productId: 'prod-003', productName: 'Professional Makeup Brush Set', quantity: 1, price: 59.99, subtotal: 59.99 },
    ],
    totalAmount: 105.98,
    status: 'IN_PROGRESS',
    paymentStatus: 'COMPLETED',
    shippingAddress: '789 Pine Avenue',
    shippingCity: 'Seattle',
    shippingState: 'WA',
    shippingZip: '98101',
    driver: { id: 'driver-002', name: 'Maria Delivery', phone: '555-9012', rating: 4.8 },
    createdAt: '2024-03-12',
    updatedAt: '2024-03-13',
    estimatedDelivery: '2024-03-15',
  },
  {
    id: 'order-003',
    customerId: 'cust-003',
    customerName: 'Jessica Martinez',
    customerEmail: 'jessica@example.com',
    customerPhone: '555-3456',
    items: [
      { productId: 'prod-001', productName: 'Luxury Lipstick Collection', quantity: 3, price: 24.99, subtotal: 74.97 },
    ],
    totalAmount: 74.97,
    status: 'CONFIRMED',
    paymentStatus: 'COMPLETED',
    shippingAddress: '321 Elm Drive',
    shippingCity: 'Denver',
    shippingState: 'CO',
    shippingZip: '80202',
    createdAt: '2024-03-13',
    updatedAt: '2024-03-13',
    estimatedDelivery: '2024-03-16',
  },
  {
    id: 'order-004',
    customerId: 'cust-004',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa@example.com',
    customerPhone: '555-7890',
    items: [
      { productId: 'prod-002', productName: 'Hydrating Face Serum', quantity: 2, price: 45.99, subtotal: 91.98 },
    ],
    totalAmount: 91.98,
    status: 'PENDING',
    paymentStatus: 'COMPLETED',
    shippingAddress: '654 Birch Road',
    shippingCity: 'Austin',
    shippingState: 'TX',
    shippingZip: '78701',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-14',
    estimatedDelivery: '2024-03-17',
    notes: 'Customer requested expedited shipping',
  },
];

// Mock reviews
const mockReviews: Review[] = [
  {
    id: 'review-001',
    productId: 'prod-001',
    customerId: 'cust-001',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing quality! The colors are so vibrant and long-lasting.',
    createdAt: '2024-03-12',
  },
  {
    id: 'review-002',
    productId: 'prod-002',
    customerId: 'cust-005',
    customerName: 'Michelle Lee',
    rating: 5,
    comment: 'This serum has transformed my skin. Highly recommend!',
    createdAt: '2024-03-11',
  },
  {
    id: 'review-003',
    productId: 'prod-003',
    customerId: 'cust-006',
    customerName: 'Rachel Green',
    rating: 4,
    comment: 'Great quality brushes, perfect for professional makeup.',
    createdAt: '2024-03-10',
  },
];

// Mock analytics
const mockAnalytics: Analytics[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2024, 2, i + 1).toISOString().split('T')[0],
  views: Math.floor(Math.random() * 500) + 100,
  clicks: Math.floor(Math.random() * 150) + 20,
  orders: Math.floor(Math.random() * 15) + 1,
  revenue: Math.floor(Math.random() * 2000) + 500,
  conversionRate: (Math.random() * 5 + 2).toFixed(2),
}));

// Vendor Services
export const vendorServices = {
  getProfile: async (): Promise<VendorProfile> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockVendor;
  },

  updateProfile: async (profile: Partial<VendorProfile>): Promise<VendorProfile> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...mockVendor, ...profile, updatedAt: new Date().toISOString() };
  },
};

// Product Services
export const productServices = {
  getProducts: async (status?: ProductStatus): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (status) {
      return mockProducts.filter((p) => p.status === status);
    }
    return mockProducts;
  },

  getProduct: async (id: string): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const existing = mockProducts.find((p) => p.id === id);
    if (!existing) throw new Error('Product not found');
    return { ...existing, ...product, updatedAt: new Date().toISOString() };
  },

  deleteProduct: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
};

// Order Services
export const orderServices = {
  getOrders: async (status?: OrderStatus): Promise<VendorOrder[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (status) {
      return mockOrders.filter((o) => o.status === status);
    }
    return mockOrders;
  },

  getOrder: async (id: string): Promise<VendorOrder> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<VendorOrder> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return { ...order, status, updatedAt: new Date().toISOString() };
  },
};

// Review Services
export const reviewServices = {
  getReviews: async (productId?: string): Promise<Review[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (productId) {
      return mockReviews.filter((r) => r.productId === productId);
    }
    return mockReviews;
  },
};

// Analytics Services
export const analyticsServices = {
  getAnalytics: async (): Promise<Analytics[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockAnalytics;
  },

  getDashboardStats: async (): Promise<VendorDashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      totalProducts: mockProducts.length,
      activeProducts: mockProducts.filter((p) => p.status === 'ACTIVE').length,
      totalOrders: mockOrders.length,
      pendingOrders: mockOrders.filter((o) => o.status === 'PENDING').length,
      confirmedOrders: mockOrders.filter((o) => o.status === 'CONFIRMED').length,
      completedOrders: mockOrders.filter((o) => o.status === 'DELIVERED').length,
      totalRevenue: mockOrders
        .filter((o) => o.paymentStatus === 'COMPLETED')
        .reduce((sum, o) => sum + o.totalAmount, 0),
      monthlyRevenue: mockOrders
        .filter((o) => o.paymentStatus === 'COMPLETED' && o.createdAt.startsWith('2024-03'))
        .reduce((sum, o) => sum + o.totalAmount, 0),
      averageRating: mockVendor.rating,
      totalReviews: mockVendor.totalReviews,
      conversionRate: 3.5,
    };
  },
};
