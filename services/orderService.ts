/**
 * Order Service Layer
 * Manages customer orders, vendor fulfillment, and driver delivery
 */

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient<Schema>();

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZipCode: string;
  deliveryPhoneNumber?: string | null;
  status: OrderStatus;
  totalAmount: number;
  driverId?: string | null;
  driverName?: string | null;
  notes?: string | null;
  confirmedAt?: string | null;
  pickedUpAt?: string | null;
  deliveredAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create a new order (customer action)
 */
export const createOrder = async (
  orderData: Omit<Order, 'id' | 'customerId' | 'status' | 'createdAt' | 'updatedAt'> & {
    customerName?: string;
  }
): Promise<Order> => {
  try {
    const user = await getCurrentUser();
    const userEmail = user.signInDetails?.loginId || user.userId;

    const { data: newOrder, errors } = await client.models.Order.create({
      customerId: user.userId,
      customerName: orderData.customerName || 'Customer',
      customerEmail: userEmail,
      deliveryAddress: orderData.deliveryAddress,
      deliveryCity: orderData.deliveryCity,
      deliveryState: orderData.deliveryState,
      deliveryZipCode: orderData.deliveryZipCode,
      deliveryPhoneNumber: orderData.deliveryPhoneNumber || '',
      status: 'PENDING',
      totalAmount: orderData.totalAmount,
      notes: orderData.notes || '',
    });

    if (errors || !newOrder) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to create order');
    }

    return {
      id: newOrder.id,
      customerId: newOrder.customerId,
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail,
      deliveryAddress: newOrder.deliveryAddress,
      deliveryCity: newOrder.deliveryCity,
      deliveryState: newOrder.deliveryState,
      deliveryZipCode: newOrder.deliveryZipCode,
      deliveryPhoneNumber: newOrder.deliveryPhoneNumber,
      status: newOrder.status as OrderStatus,
      totalAmount: newOrder.totalAmount,
      driverId: newOrder.driverId,
      driverName: newOrder.driverName,
      notes: newOrder.notes,
      confirmedAt: newOrder.confirmedAt,
      pickedUpAt: newOrder.pickedUpAt,
      deliveredAt: newOrder.deliveredAt,
      createdAt: newOrder.createdAt,
      updatedAt: newOrder.updatedAt,
    };
  } catch (error) {
    console.error('❌ Error creating order:', error);
    throw error;
  }
};

/**
 * Get customer's orders
 */
export const getMyOrders = async (): Promise<Order[]> => {
  try {
    const { data: orders, errors } = await client.models.Order.list();

    if (errors) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to fetch orders');
    }

    return orders.map(order => ({
      id: order.id,
      customerId: order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      deliveryAddress: order.deliveryAddress,
      deliveryCity: order.deliveryCity,
      deliveryState: order.deliveryState,
      deliveryZipCode: order.deliveryZipCode,
      deliveryPhoneNumber: order.deliveryPhoneNumber,
      status: order.status as OrderStatus,
      totalAmount: order.totalAmount,
      driverId: order.driverId,
      driverName: order.driverName,
      notes: order.notes,
      confirmedAt: order.confirmedAt,
      pickedUpAt: order.pickedUpAt,
      deliveredAt: order.deliveredAt,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    throw error;
  }
};

/**
 * Update order status (vendor/driver action)
 */
export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  additionalData?: { driverId?: string; driverName?: string }
): Promise<Order> => {
  try {
    const updateData: any = {
      id: orderId,
      status,
    };

    if (status === 'CONFIRMED') {
      updateData.confirmedAt = new Date().toISOString();
    } else if (status === 'PICKED_UP') {
      updateData.pickedUpAt = new Date().toISOString();
      if (additionalData?.driverId) {
        updateData.driverId = additionalData.driverId;
        updateData.driverName = additionalData.driverName || 'Driver';
      }
    } else if (status === 'DELIVERED') {
      updateData.deliveredAt = new Date().toISOString();
    }

    const { data: updatedOrder, errors } = await client.models.Order.update(updateData);

    if (errors || !updatedOrder) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to update order');
    }

    return {
      id: updatedOrder.id,
      customerId: updatedOrder.customerId,
      customerName: updatedOrder.customerName,
      customerEmail: updatedOrder.customerEmail,
      deliveryAddress: updatedOrder.deliveryAddress,
      deliveryCity: updatedOrder.deliveryCity,
      deliveryState: updatedOrder.deliveryState,
      deliveryZipCode: updatedOrder.deliveryZipCode,
      deliveryPhoneNumber: updatedOrder.deliveryPhoneNumber,
      status: updatedOrder.status as OrderStatus,
      totalAmount: updatedOrder.totalAmount,
      driverId: updatedOrder.driverId,
      driverName: updatedOrder.driverName,
      notes: updatedOrder.notes,
      confirmedAt: updatedOrder.confirmedAt,
      pickedUpAt: updatedOrder.pickedUpAt,
      deliveredAt: updatedOrder.deliveredAt,
      createdAt: updatedOrder.createdAt,
      updatedAt: updatedOrder.updatedAt,
    };
  } catch (error) {
    console.error('❌ Error updating order:', error);
    throw error;
  }
};

/**
 * Get available orders for drivers (PENDING or CONFIRMED status)
 */
export const getAvailableOrders = async (): Promise<Order[]> => {
  try {
    const { data: orders, errors } = await client.models.Order.list({
      filter: {
        or: [
          { status: { eq: 'PENDING' } },
          { status: { eq: 'CONFIRMED' } },
        ],
      },
    });

    if (errors) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to fetch available orders');
    }

    return orders.map(order => ({
      id: order.id,
      customerId: order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      deliveryAddress: order.deliveryAddress,
      deliveryCity: order.deliveryCity,
      deliveryState: order.deliveryState,
      deliveryZipCode: order.deliveryZipCode,
      deliveryPhoneNumber: order.deliveryPhoneNumber,
      status: order.status as OrderStatus,
      totalAmount: order.totalAmount,
      driverId: order.driverId,
      driverName: order.driverName,
      notes: order.notes,
      confirmedAt: order.confirmedAt,
      pickedUpAt: order.pickedUpAt,
      deliveredAt: order.deliveredAt,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  } catch (error) {
    console.error('❌ Error fetching available orders:', error);
    throw error;
  }
};

/**
 * Get driver's active deliveries
 */
export const getMyDeliveries = async (): Promise<Order[]> => {
  try {
    const user = await getCurrentUser();
    
    const { data: orders, errors } = await client.models.Order.list({
      filter: {
        and: [
          { driverId: { eq: user.userId } },
          { status: { eq: 'PICKED_UP' } },
        ],
      },
    });

    if (errors) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error('Failed to fetch deliveries');
    }

    return orders.map(order => ({
      id: order.id,
      customerId: order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      deliveryAddress: order.deliveryAddress,
      deliveryCity: order.deliveryCity,
      deliveryState: order.deliveryState,
      deliveryZipCode: order.deliveryZipCode,
      deliveryPhoneNumber: order.deliveryPhoneNumber,
      status: order.status as OrderStatus,
      totalAmount: order.totalAmount,
      driverId: order.driverId,
      driverName: order.driverName,
      notes: order.notes,
      confirmedAt: order.confirmedAt,
      pickedUpAt: order.pickedUpAt,
      deliveredAt: order.deliveredAt,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  } catch (error) {
    console.error('❌ Error fetching deliveries:', error);
    throw error;
  }
};
