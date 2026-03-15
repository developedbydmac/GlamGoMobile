import { useState, useEffect } from 'react'
import { Order, OrderStatus } from '@/types'
import { orderServices } from '@/services/mockData'

interface UseOrdersReturn {
  orders: Order[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  assignDriver: (orderId: string, driverId: string) => Promise<void>
  updateStatus: (orderId: string, status: OrderStatus) => Promise<void>
}

export function useOrders(statusFilter?: OrderStatus): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      let data: Order[]

      if (statusFilter) {
        data = await orderServices.getOrdersByStatus(statusFilter)
      } else {
        data = await orderServices.listOrders()
      }

      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  const assignDriver = async (orderId: string, driverId: string) => {
    try {
      await orderServices.assignDriver(orderId, driverId)
      await fetchOrders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign driver')
    }
  }

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await orderServices.updateOrderStatus(orderId, status)
      await fetchOrders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status')
    }
  }

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    assignDriver,
    updateStatus,
  }
}
