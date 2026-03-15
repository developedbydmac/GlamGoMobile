import React, { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { OrderCard } from '@/components/OrderCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useOrders } from '@/hooks/useOrders'
import { OrderStatus } from '@/types'

type FilterType = 'all' | 'pending' | 'confirmed' | 'assigned' | 'in-progress' | 'delivered'

const Orders: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all')

  const getOrderStatus = (f: FilterType): OrderStatus | undefined => {
    if (f === 'all') return undefined
    if (f === 'in-progress') return 'IN_PROGRESS'
    return f.toUpperCase() as OrderStatus
  }

  const { orders, loading, error, assignDriver, updateStatus } = useOrders(getOrderStatus(filter))

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-2">Manage orders, assign drivers, and track deliveries</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {['all', 'pending', 'confirmed', 'assigned', 'in-progress', 'delivered'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as FilterType)}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
              Error: {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Orders List */}
              {orders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-600 text-lg">No orders found</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onAssignDriver={assignDriver}
                      onUpdateStatus={updateStatus}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Orders
