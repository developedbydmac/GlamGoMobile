// Vendor Types
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'DELIVERED' | 'CANCELLED';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'SUSPENDED';

export interface VendorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessDescription: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: ApprovalStatus;
  approvedAt?: string;
  suspendedAt?: string;
  createdAt: string;
  updatedAt: string;
  logo?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  rating: number;
  totalReviews: number;
  totalProducts: number;
  totalSales: number;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  status: ProductStatus;
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface VendorOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  notes?: string;
  driver?: {
    id: string;
    name: string;
    phone: string;
    rating: number;
  };
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface VendorDashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  completedOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageRating: number;
  totalReviews: number;
  conversionRate: number;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Analytics {
  date: string;
  views: number;
  clicks: number;
  orders: number;
  revenue: number;
  conversionRate: number;
}
