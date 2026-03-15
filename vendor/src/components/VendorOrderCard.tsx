import React from 'react';
import { VendorOrder } from '@/types';

interface OrderCardProps {
  order: VendorOrder;
  onStatusChange?: (orderId: string, newStatus: string) => void;
}

export const VendorOrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    IN_PROGRESS: 'bg-purple-100 text-purple-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };

  const paymentColors = {
    PENDING: 'text-yellow-600',
    COMPLETED: 'text-green-600',
    FAILED: 'text-red-600',
    REFUNDED: 'text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
          <p className="text-sm text-gray-600">{order.customerName}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>{order.status}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 ${paymentColors[order.paymentStatus]}`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900 mb-2">Items:</p>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm text-gray-600">
            <span>
              {item.productName} x{item.quantity}
            </span>
            <span className="font-medium text-gray-900">${item.subtotal.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Customer Info */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900 mb-2">Customer:</p>
        <p className="text-sm text-gray-600">{order.customerEmail}</p>
        <p className="text-sm text-gray-600">{order.customerPhone}</p>
      </div>

      {/* Shipping Address */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900 mb-2">Shipping Address:</p>
        <p className="text-sm text-gray-600">{order.shippingAddress}</p>
        <p className="text-sm text-gray-600">{order.shippingCity}, {order.shippingState} {order.shippingZip}</p>
      </div>

      {/* Total and Driver */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
        </div>
        {order.driver && (
          <div className="text-right">
            <p className="text-sm text-gray-600">Driver</p>
            <p className="font-medium text-gray-900">{order.driver.name}</p>
            <p className="text-xs text-gray-600">★ {order.driver.rating}</p>
          </div>
        )}
      </div>

      {/* Status Update */}
      {onStatusChange && (
        <select
          onChange={(e) => onStatusChange(order.id, e.target.value)}
          value={order.status}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:border-purple-400 focus:outline-none focus:border-purple-600"
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      )}
    </div>
  );
};
