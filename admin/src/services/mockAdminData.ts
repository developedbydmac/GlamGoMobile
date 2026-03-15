// Mock data for admin portal - Week 1 & 2 complete

interface User {
  id: string
  name: string
  email: string
  role: 'VENDOR' | 'DRIVER' | 'CUSTOMER'
  status: 'PENDING' | 'APPROVED' | 'SUSPENDED'
  appliedAt: string
  approvedBy?: string
  approvedAt?: string
}

interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  status: 'PENDING' | 'ASSIGNED' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED'
  items: { productName: string; quantity: number; price: number }[]
  total: number
  createdAt: string
  assignedDriver?: string
  deliveryAddress: string
}

interface Driver {
  id: string
  name: string
  email: string
  phone: string
  rating: number
  completedDeliveries: number
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED'
  joinedAt: string
  averageDeliveryTime: number
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah\'s Boutique',
    email: 'vendor-pending@test.com',
    role: 'VENDOR',
    status: 'PENDING',
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user-2',
    name: 'Marcus Fashion Store',
    email: 'vendor@test.com',
    role: 'VENDOR',
    status: 'APPROVED',
    appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    approvedBy: 'admin@test.com',
    approvedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user-3',
    name: 'John Delivery',
    email: 'driver@test.com',
    role: 'DRIVER',
    status: 'APPROVED',
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    approvedBy: 'admin@test.com',
    approvedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user-4',
    name: 'Maria Express',
    email: 'driver-pending@test.com',
    role: 'DRIVER',
    status: 'PENDING',
    appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user-5',
    name: 'Alex Customer',
    email: 'customer@test.com',
    role: 'CUSTOMER',
    status: 'APPROVED',
    appliedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    approvedBy: 'system',
    approvedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user-6',
    name: 'Premium Vendor',
    email: 'vendor-premium@test.com',
    role: 'VENDOR',
    status: 'SUSPENDED',
    appliedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    approvedBy: 'admin@test.com',
    approvedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock Drivers
export const MOCK_DRIVERS: Driver[] = [
  {
    id: 'driver-1',
    name: 'John Delivery',
    email: 'driver@test.com',
    phone: '(555) 123-4567',
    rating: 4.8,
    completedDeliveries: 287,
    status: 'ACTIVE',
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    averageDeliveryTime: 28,
  },
  {
    id: 'driver-2',
    name: 'Maria Express',
    email: 'driver-premium@test.com',
    phone: '(555) 234-5678',
    rating: 4.9,
    completedDeliveries: 342,
    status: 'ACTIVE',
    joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    averageDeliveryTime: 24,
  },
  {
    id: 'driver-3',
    name: 'Carlos Delivery',
    email: 'driver-carlos@test.com',
    phone: '(555) 345-6789',
    rating: 4.5,
    completedDeliveries: 156,
    status: 'ACTIVE',
    joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    averageDeliveryTime: 32,
  },
  {
    id: 'driver-4',
    name: 'Priya Singh',
    email: 'driver-priya@test.com',
    phone: '(555) 456-7890',
    rating: 4.7,
    completedDeliveries: 203,
    status: 'INACTIVE',
    joinedAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    averageDeliveryTime: 26,
  },
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: '#ORD-001',
    customerId: 'cust-1',
    customerName: 'Emily Johnson',
    status: 'PENDING',
    items: [
      { productName: 'Elegant Handbag', quantity: 1, price: 89.99 },
      { productName: 'Designer Scarf', quantity: 2, price: 35.00 },
    ],
    total: 159.99,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    deliveryAddress: '123 Oak Street, San Francisco, CA 94102',
  },
  {
    id: 'order-2',
    orderNumber: '#ORD-002',
    customerId: 'cust-2',
    customerName: 'Robert Chen',
    status: 'ASSIGNED',
    items: [
      { productName: 'Premium Watch', quantity: 1, price: 249.00 },
    ],
    total: 249.00,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    assignedDriver: 'John Delivery',
    deliveryAddress: '456 Pine Avenue, San Francisco, CA 94103',
  },
  {
    id: 'order-3',
    orderNumber: '#ORD-003',
    customerId: 'cust-3',
    customerName: 'Lisa Martinez',
    status: 'PICKED_UP',
    items: [
      { productName: 'Silk Dress', quantity: 1, price: 179.00 },
      { productName: 'Shoes', quantity: 1, price: 99.99 },
    ],
    total: 278.99,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    assignedDriver: 'Maria Express',
    deliveryAddress: '789 Elm Road, San Francisco, CA 94104',
  },
  {
    id: 'order-4',
    orderNumber: '#ORD-004',
    customerId: 'cust-4',
    customerName: 'James Wilson',
    status: 'DELIVERED',
    items: [
      { productName: 'Gold Earrings', quantity: 1, price: 129.99 },
      { productName: 'Diamond Ring', quantity: 1, price: 399.00 },
    ],
    total: 528.99,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    assignedDriver: 'Carlos Delivery',
    deliveryAddress: '321 Maple Lane, San Francisco, CA 94105',
  },
  {
    id: 'order-5',
    orderNumber: '#ORD-005',
    customerId: 'cust-5',
    customerName: 'Angela Davis',
    status: 'PENDING',
    items: [
      { productName: 'Jacket', quantity: 1, price: 199.99 },
    ],
    total: 199.99,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    deliveryAddress: '654 Cedar Street, San Francisco, CA 94106',
  },
  {
    id: 'order-6',
    orderNumber: '#ORD-006',
    customerId: 'cust-6',
    customerName: 'David Kim',
    status: 'ASSIGNED',
    items: [
      { productName: 'Sunglasses', quantity: 1, price: 189.00 },
      { productName: 'Hat', quantity: 1, price: 45.00 },
    ],
    total: 234.00,
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    assignedDriver: 'John Delivery',
    deliveryAddress: '987 Birch Way, San Francisco, CA 94107',
  },
]

// Update User Status
export const updateUserStatus = (userId: string, status: 'APPROVED' | 'SUSPENDED', adminEmail: string): User => {
  const userIndex = mockUsers.findIndex(u => u.id === userId)
  if (userIndex !== -1) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      status,
      approvedBy: adminEmail,
      approvedAt: new Date().toISOString(),
    }
  }
  return mockUsers[userIndex]
}

// Update Order Status
export const updateOrderStatus = (orderId: string, status: string): Order => {
  const orderIndex = mockOrders.findIndex(o => o.id === orderId)
  if (orderIndex !== -1) {
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status: status as Order['status'],
    }
  }
  return mockOrders[orderIndex]
}

// Assign Driver to Order
export const assignDriver = (orderId: string, driverName: string): Order => {
  const orderIndex = mockOrders.findIndex(o => o.id === orderId)
  if (orderIndex !== -1) {
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      assignedDriver: driverName,
      status: 'ASSIGNED',
    }
  }
  return mockOrders[orderIndex]
}
