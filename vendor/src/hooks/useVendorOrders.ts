import { useEffect, useState } from 'react';
import { VendorOrder, OrderStatus } from '@/types';
import { orderServices } from '@/services/mockData';

export const useVendorOrders = (status?: OrderStatus) => {
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderServices.getOrders(status);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const updateStatus = async (id: string, newStatus: OrderStatus) => {
    try {
      const updated = await orderServices.updateOrderStatus(id, newStatus);
      setOrders(orders.map((o) => (o.id === id ? updated : o)));
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update order status';
      setError(message);
      throw err;
    }
  };

  return { orders, loading, error, refetch: fetchOrders, updateStatus };
};
