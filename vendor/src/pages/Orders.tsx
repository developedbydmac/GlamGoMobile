import React, { useState } from 'react';
import { VendorNavbar } from '@/components/VendorNavbar';
import { VendorOrderCard } from '@/components/VendorOrderCard';
import { VendorLoadingSpinner } from '@/components/VendorLoadingSpinner';
import { useVendorOrders } from '@/hooks/useVendorOrders';
import { OrderStatus } from '@/types';

const Orders: React.FC = () => {
  const [filter, setFilter] = useState<OrderStatus | undefined>(undefined);
  const { orders, loading, error, updateStatus } = useVendorOrders(filter);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateStatus(orderId, newStatus as OrderStatus);
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  return (
    <>
      <VendorNavbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600 mt-2">Manage and track your orders</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {[
              { label: 'All', value: undefined },
              { label: 'Pending', value: 'PENDING' as OrderStatus },
              { label: 'Confirmed', value: 'CONFIRMED' as OrderStatus },
              { label: 'In Progress', value: 'IN_PROGRESS' as OrderStatus },
              { label: 'Delivered', value: 'DELIVERED' as OrderStatus },
              { label: 'Cancelled', value: 'CANCELLED' as OrderStatus },
            ].map((f) => (
              <button
                key={f.label}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  filter === f.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">{error}</div>}

          {loading ? (
            <VendorLoadingSpinner />
          ) : (
            <>
              {orders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-600 text-lg">No orders found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {orders.map((order) => (
                    <VendorOrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
