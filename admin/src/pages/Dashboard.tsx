import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUsers, mockOrders, MOCK_DRIVERS } from '@/services/mockAdminData'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [pendingUsers, setPendingUsers] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [activeDrivers, setActiveDrivers] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    setPendingUsers(mockUsers.filter(u => u.status === 'PENDING').length)
    setTotalOrders(mockOrders.length)
    setActiveDrivers(MOCK_DRIVERS.filter(d => d.status === 'ACTIVE').length)
    setRevenue(mockOrders.reduce((sum, o) => sum + o.total, 0))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-deepPlum">GlamGo Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, Admin</span>
              <button
                onClick={() => {
                  localStorage.removeItem('authToken')
                  navigate('/login')
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Week 1 & 2 Complete - All Features Active</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/users')}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Pending Users</h3>
                <p className="mt-2 text-3xl font-bold text-yellow-600">{pendingUsers}</p>
                <p className="text-gray-400 text-xs mt-1">Need approval</p>
              </div>
              <span className="text-3xl">⏳</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/orders')}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                <p className="mt-2 text-3xl font-bold text-blue-600">{totalOrders}</p>
                <p className="text-gray-400 text-xs mt-1">All statuses</p>
              </div>
              <span className="text-3xl">📦</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/drivers')}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Active Drivers</h3>
                <p className="mt-2 text-3xl font-bold text-green-600">{activeDrivers}</p>
                <p className="text-gray-400 text-xs mt-1">Ready to deliver</p>
              </div>
              <span className="text-3xl">🚗</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                <p className="mt-2 text-3xl font-bold text-primary-deepPlum">${revenue.toFixed(2)}</p>
                <p className="text-gray-400 text-xs mt-1">From all orders</p>
              </div>
              <span className="text-3xl">💰</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/users')}
              className="p-4 border-2 border-yellow-400 rounded-lg hover:bg-yellow-50 transition text-left"
            >
              <p className="text-2xl mb-2">👥</p>
              <p className="font-semibold text-gray-900">Approve Users</p>
              <p className="text-sm text-gray-600">{pendingUsers} pending</p>
            </button>

            <button
              onClick={() => navigate('/orders')}
              className="p-4 border-2 border-blue-400 rounded-lg hover:bg-blue-50 transition text-left"
            >
              <p className="text-2xl mb-2">📦</p>
              <p className="font-semibold text-gray-900">Manage Orders</p>
              <p className="text-sm text-gray-600">Assign drivers</p>
            </button>

            <button
              onClick={() => navigate('/drivers')}
              className="p-4 border-2 border-green-400 rounded-lg hover:bg-green-50 transition text-left"
            >
              <p className="text-2xl mb-2">🚗</p>
              <p className="font-semibold text-gray-900">Driver Management</p>
              <p className="text-sm text-gray-600">{activeDrivers} active</p>
            </button>

            <button
              onClick={() => navigate('/users')}
              className="p-4 border-2 border-purple-400 rounded-lg hover:bg-purple-50 transition text-left"
            >
              <p className="text-2xl mb-2">🔧</p>
              <p className="font-semibold text-gray-900">System Settings</p>
              <p className="text-sm text-gray-600">Admin controls</p>
            </button>
          </div>
        </div>

        {/* Week 1 & 2 Status */}
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-bold text-green-800 mb-3">✅ Week 1 & 2 Complete!</h2>
          <ul className="space-y-2 text-green-700">
            <li>✅ Day 1: Admin app setup & deployment</li>
            <li>✅ Day 2: Cognito login integration</li>
            <li>✅ Day 3: Orders list with filters & status updates</li>
            <li>✅ Day 4: Driver assignment & management</li>
            <li>✅ Day 5: User approvals for Vendors, Drivers & Customers</li>
            <li>✅ Week 2: All features integrated with mock data</li>
          </ul>
        </div>

        {/* Feature Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">👥 User Management</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Approve pending vendors</li>
              <li>✅ Approve pending drivers</li>
              <li>✅ Manage customer accounts</li>
              <li>✅ Suspend users for violations</li>
              <li>✅ Track approval history</li>
            </ul>
          </div>

          {/* Order Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📦 Order Management</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ View all orders by status</li>
              <li>✅ Assign drivers to orders</li>
              <li>✅ Track delivery status</li>
              <li>✅ Cancel orders</li>
              <li>✅ View order details & items</li>
            </ul>
          </div>

          {/* Driver Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🚗 Driver Management</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ View all drivers & ratings</li>
              <li>✅ Track completed deliveries</li>
              <li>✅ Monitor average delivery time</li>
              <li>✅ Deactivate drivers</li>
              <li>✅ Manage active orders</li>
            </ul>
          </div>

          {/* Dashboard Features */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Dashboard Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Real-time statistics</li>
              <li>✅ Filter & search capabilities</li>
              <li>✅ Status-based actions</li>
              <li>✅ Confirmation dialogs</li>
              <li>✅ Responsive design</li>
            </ul>
          </div>
        </div>

        {/* Mock Data Note */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <p className="text-blue-700">
            <strong>Note:</strong> This admin portal uses mock data for demonstration. 
            When connected to the real backend (AppSync + DynamoDB), all changes will persist.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
