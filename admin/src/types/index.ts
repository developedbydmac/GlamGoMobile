// User Types
export type UserRole = 'VENDOR' | 'DRIVER' | 'CUSTOMER' | 'ADMIN'
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'SUSPENDED'

export interface UserProfile {
  id: string
  userId: string
  email: string
  name: string
  role: UserRole
  status: ApprovalStatus
  profileImage?: string
  phoneNumber?: string
  address?: string
  createdAt: string
  approvedAt?: string
  approvedBy?: string
  suspendedAt?: string
  suspendedBy?: string
}

// Order Types
export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  image?: string
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_PROGRESS' | 'DELIVERED' | 'CANCELLED'

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  vendorId: string
  vendorName: string
  driverId?: string
  driverName?: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  deliveryAddress: string
  createdAt: string
  updatedAt: string
}

// Driver Types
export interface Driver {
  id: string
  userId: string
  name: string
  email: string
  phoneNumber: string
  status: ApprovalStatus
  isAvailable: boolean
  currentOrderId?: string
  rating: number
  completedDeliveries: number
  createdAt: string
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number
  pendingUsers: number
  approvedVendors: number
  approvedDrivers: number
  totalOrders: number
  pendingOrders: number
  assignedOrders: number
  deliveredOrders: number
  activeDrivers: number
}
