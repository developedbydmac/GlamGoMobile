import React, { useState } from 'react'
import { Order, OrderStatus } from '@/types'
import { useDrivers } from '@/hooks/useDrivers'

interface OrderCardProps {
  order: Order
  onAssignDriver?: (orderId: string, driverId: string) => void
  onUpdateStatus?: (orderId: string, status: OrderStatus) => void
  isLoading?: boolean
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  ASSIGNED: 'bg-purple-100 text-purple-800',
  IN_PROGRESS: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onAssignDriver,
  onUpdateStatus,
  isLoading = false,
}) => {
  const { availableDrivers, loading: driversLoading } = useDrivers()
  const [showDriverSelect, setShowDriverSelect] = useState(false)
  const [showStatusSelect, setShowStatusSelect] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const handleAssignDriver = async (driverId: string) => {
    if (!onAssignDriver) return
    setActionLoading(true)
    try {
      await onAssignDriver(order.id, driverId)
    } finally {
      setActionLoading(false)
      setShowDriverSelect(false)
    }
  }

  const handleUpdateStatus = async (status: OrderStatus) => {
    if (!onUpdateStatus) return
    setActionLoading(true)
    try {
      await onUpdateStatus(order.id, status)
    } finally {
      setActionLoading(false)
      setShowStatusSelect(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600 text-sm">Customer</p>
          <p className="font-medium">{order.customerName}</p>
          <p className="text-gray-500 text-xs">{order.customerEmail}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Vendor</p>
          <p className="font-medium">{order.vendorName}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Driver</p>
          <p className="font-medium">{order.driverName || '—'}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Amount</p>
          <p className="font-bold text-lg text-purple-600">${order.totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-3 mb-4">
        <p className="text-gray-600 text-sm mb-1">Items:</p>
        <ul className="text-sm space-y-1">
          {order.items.map((item) => (
            <li key={item.productId} className="text-gray-700">
              {item.productName} x{item.quantity} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        <strong>Delivery:</strong> {order.deliveryAddress}
      </p>

      <div className="flex gap-2">
        {/* Assign Driver Button */}
        {!order.driverId && order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
          <div className="relative flex-1">
            <button
              onClick={() => setShowDriverSelect(!showDriverSelect)}
              className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition"
              disabled={driversLoading || actionLoading}
            >
              {actionLoading ? 'Assigning...' : 'Assign Driver'}
            </button>

            {showDriverSelect && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                {availableDrivers.length === 0 ? (
                  <p className="px-4 py-2 text-gray-500 text-sm">No available drivers</p>
                ) : (
                  availableDrivers.map((driver) => (
                    <button
                      key={driver.id}
                      onClick={() => handleAssignDriver(driver.id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-900 text-sm border-b last:border-b-0 transition"
                    >
                      {driver.name} (★ {driver.rating})
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Update Status Button */}
        <div className="relative flex-1">
          <button
            onClick={() => setShowStatusSelect(!showStatusSelect)}
            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition"
            disabled={actionLoading}
          >
            {actionLoading ? 'Updating...' : 'Change Status'}
          </button>

          {showStatusSelect && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
              {(['PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED'] as OrderStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(status)}
                  disabled={status === order.status}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-900 text-sm border-b last:border-b-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
