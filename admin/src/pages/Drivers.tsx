import React from 'react'
import { Navbar } from '@/components/Navbar'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useDrivers } from '@/hooks/useDrivers'

const Drivers: React.FC = () => {
  const { drivers, availableDrivers, loading, error } = useDrivers()

  const getStatusColor = (status: string, isAvailable: boolean) => {
    if (status === 'SUSPENDED') return 'bg-red-100 text-red-800'
    if (status === 'PENDING') return 'bg-yellow-100 text-yellow-800'
    if (!isAvailable) return 'bg-blue-100 text-blue-800'
    return 'bg-green-100 text-green-800'
  }

  const getStatusText = (status: string, isAvailable: boolean, currentOrderId?: string) => {
    if (status === 'SUSPENDED') return 'Suspended'
    if (status === 'PENDING') return 'Pending Approval'
    if (!isAvailable && currentOrderId) return `On Delivery (${currentOrderId})`
    if (!isAvailable) return 'Busy'
    return 'Available'
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Driver Fleet</h1>
            <p className="text-gray-600 mt-2">
              Available: {availableDrivers.length} | Total: {drivers.length}
            </p>
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
              {/* Available Drivers Alert */}
              {availableDrivers.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-800">
                  <strong>{availableDrivers.length}</strong> drivers available for assignment
                </div>
              )}

              {/* Drivers List */}
              {drivers.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-600 text-lg">No drivers found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drivers.map((driver) => (
                    <div
                      key={driver.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                          <p className="text-sm text-gray-600">{driver.email}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            driver.status,
                            driver.isAvailable
                          )}`}
                        >
                          {getStatusText(driver.status, driver.isAvailable, driver.currentOrderId)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                          <p className="text-gray-600 text-sm">Rating</p>
                          <p className="text-lg font-bold text-yellow-500">★ {driver.rating}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Deliveries</p>
                          <p className="text-lg font-bold">{driver.completedDeliveries}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-600 text-sm">Phone</p>
                        <p className="font-medium">{driver.phoneNumber}</p>
                      </div>

                      <div className="text-xs text-gray-500">
                        Joined {new Date(driver.createdAt).toLocaleDateString()}
                      </div>

                      {driver.isAvailable && driver.status === 'APPROVED' && (
                        <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                          <p className="text-xs text-green-700 font-medium">
                            ✓ Ready for assignment
                          </p>
                        </div>
                      )}
                    </div>
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

export default Drivers
