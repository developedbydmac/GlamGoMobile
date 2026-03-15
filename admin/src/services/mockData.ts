import { UserProfile, Order, Driver, ApprovalStatus, OrderStatus } from '@/types'

// Mock Users - Mix of all roles and statuses
export const MOCK_USERS: UserProfile[] = [
  // PENDING VENDORS
  {
    id: 'user-001',
    userId: 'auth-001',
    email: 'vendor-pending-1@test.com',
    name: 'Glam Beauty Boutique',
    role: 'VENDOR',
    status: 'PENDING',
    phoneNumber: '555-0101',
    address: '123 Main St, New York, NY',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user-002',
    userId: 'auth-002',
    email: 'vendor-pending-2@test.com',
    name: 'Luxury Cosmetics Co',
    role: 'VENDOR',
    status: 'PENDING',
    phoneNumber: '555-0102',
    address: '456 Oak Ave, Los Angeles, CA',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // PENDING DRIVERS
  {
    id: 'user-003',
    userId: 'auth-003',
    email: 'driver-pending-1@test.com',
    name: 'John Smith',
    role: 'DRIVER',
    status: 'PENDING',
    phoneNumber: '555-0201',
    address: '789 Pine Rd, Chicago, IL',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user-004',
    userId: 'auth-004',
    email: 'driver-pending-2@test.com',
    name: 'Maria Garcia',
    role: 'DRIVER',
    status: 'PENDING',
    phoneNumber: '555-0202',
    address: '321 Elm St, Houston, TX',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // APPROVED VENDORS
  {
    id: 'user-005',
    userId: 'auth-005',
    email: 'vendor-approved-1@test.com',
    name: 'Premium Beauty Store',
    role: 'VENDOR',
    status: 'APPROVED',
    phoneNumber: '555-0301',
    address: '555 Maple Dr, Miami, FL',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    approvedBy: 'admin@glamgo.com',
  },
  {
    id: 'user-006',
    userId: 'auth-006',
    email: 'vendor-approved-2@test.com',
    name: 'Skincare Specialists',
    role: 'VENDOR',
    status: 'APPROVED',
    phoneNumber: '555-0302',
    address: '888 Cedar Ln, Phoenix, AZ',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    approvedBy: 'admin@glamgo.com',
  },

  // APPROVED DRIVERS
  {
    id: 'user-007',
    userId: 'auth-007',
    email: 'driver-approved-1@test.com',
    name: 'Alex Johnson',
    role: 'DRIVER',
    status: 'APPROVED',
    phoneNumber: '555-0401',
    address: '999 Birch Ave, Seattle, WA',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    approvedBy: 'admin@glamgo.com',
  },
  {
    id: 'user-008',
    userId: 'auth-008',
    email: 'driver-approved-2@test.com',
    name: 'Sophie Brown',
    role: 'DRIVER',
    status: 'APPROVED',
    phoneNumber: '555-0402',
    address: '111 Walnut St, Denver, CO',
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    approvedBy: 'admin@glamgo.com',
  },

  // CUSTOMERS
  {
    id: 'user-009',
    userId: 'auth-009',
    email: 'customer-1@test.com',
    name: 'Emma Wilson',
    role: 'CUSTOMER',
    status: 'APPROVED',
    phoneNumber: '555-0501',
    address: '222 Oak St, Austin, TX',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user-010',
    userId: 'auth-010',
    email: 'customer-2@test.com',
    name: 'Jessica Martinez',
    role: 'CUSTOMER',
    status: 'APPROVED',
    phoneNumber: '555-0502',
    address: '333 Pine Ave, Boston, MA',
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // SUSPENDED USER
  {
    id: 'user-011',
    userId: 'auth-011',
    email: 'vendor-suspended@test.com',
    name: 'Problematic Beauty',
    role: 'VENDOR',
    status: 'SUSPENDED',
    phoneNumber: '555-0601',
    address: '444 Spruce Rd, Portland, OR',
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    suspendedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    suspendedBy: 'admin@glamgo.com',
  },
]

// Mock Orders
export const MOCK_ORDERS: Order[] = [
  {
    id: 'order-001',
    customerId: 'user-009',
    customerName: 'Emma Wilson',
    customerEmail: 'customer-1@test.com',
    vendorId: 'user-005',
    vendorName: 'Premium Beauty Store',
    driverId: 'user-007',
    driverName: 'Alex Johnson',
    items: [
      { productId: 'p1', productName: 'Luxury Face Serum', quantity: 1, price: 79.99 },
      { productId: 'p2', productName: 'Night Cream', quantity: 1, price: 59.99 },
    ],
    totalAmount: 139.98,
    status: 'DELIVERED',
    deliveryAddress: '222 Oak St, Austin, TX',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-002',
    customerId: 'user-010',
    customerName: 'Jessica Martinez',
    customerEmail: 'customer-2@test.com',
    vendorId: 'user-006',
    vendorName: 'Skincare Specialists',
    driverId: 'user-008',
    driverName: 'Sophie Brown',
    items: [
      { productId: 'p3', productName: 'Cleanser Bundle', quantity: 2, price: 45.99 },
    ],
    totalAmount: 91.98,
    status: 'IN_PROGRESS',
    deliveryAddress: '333 Pine Ave, Boston, MA',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-003',
    customerId: 'user-009',
    customerName: 'Emma Wilson',
    customerEmail: 'customer-1@test.com',
    vendorId: 'user-005',
    vendorName: 'Premium Beauty Store',
    items: [
      { productId: 'p4', productName: 'Premium Lipstick', quantity: 3, price: 35.00 },
    ],
    totalAmount: 105.00,
    status: 'CONFIRMED',
    deliveryAddress: '222 Oak St, Austin, TX',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-004',
    customerId: 'user-010',
    customerName: 'Jessica Martinez',
    customerEmail: 'customer-2@test.com',
    vendorId: 'user-006',
    vendorName: 'Skincare Specialists',
    items: [
      { productId: 'p5', productName: 'Sunscreen SPF50', quantity: 1, price: 49.99 },
    ],
    totalAmount: 49.99,
    status: 'PENDING',
    deliveryAddress: '333 Pine Ave, Boston, MA',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock Drivers
export const MOCK_DRIVERS: Driver[] = [
  {
    id: 'driver-001',
    userId: 'user-007',
    name: 'Alex Johnson',
    email: 'driver-approved-1@test.com',
    phoneNumber: '555-0401',
    status: 'APPROVED',
    isAvailable: false,
    currentOrderId: 'order-002',
    rating: 4.8,
    completedDeliveries: 124,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'driver-002',
    userId: 'user-008',
    name: 'Sophie Brown',
    email: 'driver-approved-2@test.com',
    phoneNumber: '555-0402',
    status: 'APPROVED',
    isAvailable: true,
    rating: 4.9,
    completedDeliveries: 156,
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Simulate API delay
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// User services
export const userServices = {
  async listPendingUsers(): Promise<UserProfile[]> {
    await delay(500)
    return MOCK_USERS.filter((u) => u.status === 'PENDING')
  },

  async listAllUsers(): Promise<UserProfile[]> {
    await delay(500)
    return MOCK_USERS
  },

  async getUsersByRole(role: string): Promise<UserProfile[]> {
    await delay(500)
    return MOCK_USERS.filter((u) => u.role === role)
  },

  async approveUser(userId: string): Promise<UserProfile> {
    await delay(300)
    const user = MOCK_USERS.find((u) => u.id === userId)
    if (user) {
      user.status = 'APPROVED'
      user.approvedAt = new Date().toISOString()
      user.approvedBy = 'admin@glamgo.com'
    }
    return user!
  },

  async suspendUser(userId: string): Promise<UserProfile> {
    await delay(300)
    const user = MOCK_USERS.find((u) => u.id === userId)
    if (user) {
      user.status = 'SUSPENDED'
      user.suspendedAt = new Date().toISOString()
      user.suspendedBy = 'admin@glamgo.com'
    }
    return user!
  },
}

// Order services
export const orderServices = {
  async listOrders(): Promise<Order[]> {
    await delay(500)
    return MOCK_ORDERS
  },

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    await delay(500)
    return MOCK_ORDERS.filter((o) => o.status === status)
  },

  async assignDriver(orderId: string, driverId: string): Promise<Order> {
    await delay(300)
    const order = MOCK_ORDERS.find((o) => o.id === orderId)
    const driver = MOCK_DRIVERS.find((d) => d.id === driverId)

    if (order && driver) {
      order.driverId = driver.userId
      order.driverName = driver.name
      order.status = 'ASSIGNED'
      order.updatedAt = new Date().toISOString()
      driver.isAvailable = false
      driver.currentOrderId = orderId
    }
    return order!
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    await delay(300)
    const order = MOCK_ORDERS.find((o) => o.id === orderId)
    if (order) {
      order.status = status
      order.updatedAt = new Date().toISOString()

      // Free up driver when delivered/cancelled
      if ((status === 'DELIVERED' || status === 'CANCELLED') && order.driverId) {
        const driver = MOCK_DRIVERS.find((d) => d.userId === order.driverId)
        if (driver) {
          driver.isAvailable = true
          driver.currentOrderId = undefined
          if (status === 'DELIVERED') {
            driver.completedDeliveries++
          }
        }
      }
    }
    return order!
  },
}

// Driver services
export const driverServices = {
  async listDrivers(): Promise<Driver[]> {
    await delay(500)
    return MOCK_DRIVERS
  },

  async getAvailableDrivers(): Promise<Driver[]> {
    await delay(500)
    return MOCK_DRIVERS.filter((d) => d.isAvailable && d.status === 'APPROVED')
  },
}

// Dashboard stats
export const statsServices = {
  async getDashboardStats() {
    await delay(500)
    return {
      totalUsers: MOCK_USERS.length,
      pendingUsers: MOCK_USERS.filter((u) => u.status === 'PENDING').length,
      approvedVendors: MOCK_USERS.filter((u) => u.role === 'VENDOR' && u.status === 'APPROVED').length,
      approvedDrivers: MOCK_USERS.filter((u) => u.role === 'DRIVER' && u.status === 'APPROVED').length,
      totalOrders: MOCK_ORDERS.length,
      pendingOrders: MOCK_ORDERS.filter((o) => o.status === 'PENDING').length,
      assignedOrders: MOCK_ORDERS.filter((o) => o.status === 'ASSIGNED').length,
      deliveredOrders: MOCK_ORDERS.filter((o) => o.status === 'DELIVERED').length,
      activeDrivers: MOCK_DRIVERS.filter((d) => !d.isAvailable).length,
    }
  },
}
