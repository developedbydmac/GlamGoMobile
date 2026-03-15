import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUsers, mockOrders, MOCK_DRIVERS } from '@/services/mockAdminData'
import DashboardLayout from '@/components/DashboardLayout'
import DashboardCard from '@/components/DashboardCard'

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

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Users', path: '/users', icon: '👥' },
    { label: 'Orders', path: '/orders', icon: '📦' },
    { label: 'Drivers', path: '/drivers', icon: '🚗' },
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Dashboard">
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome back, Admin</h2>
        <p className="text-gray-600 mt-1">Real-time platform overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
        <DashboardCard 
          title="Pending Users" 
          value={pendingUsers} 
          icon="⏳" 
          color="yellow"
          onClick={() => navigate('/users')}
        />
        <DashboardCard 
          title="Total Orders" 
          value={totalOrders} 
          icon="📦" 
          color="blue"
          onClick={() => navigate('/orders')}
        />
        <DashboardCard 
          title="Active Drivers" 
          value={activeDrivers} 
          icon="🚗" 
          color="green"
          onClick={() => navigate('/drivers')}
        />
        <DashboardCard 
          title="Total Revenue" 
          value={`$${revenue.toFixed(2)}`} 
          icon="💰" 
          color="rose"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {mockOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.status}</p>
                </div>
                <p className="font-bold text-gray-900">${order.total}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            {mockUsers.filter(u => u.status === 'PENDING').slice(0, 3).map((user) => (
              <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
                <button
                  onClick={() => navigate('/users')}
                  className="px-3 py-1 bg-primary-rose text-white rounded text-sm hover:bg-primary-rose/90 transition"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <p className="text-blue-700 text-sm">
          <strong>💡 Tip:</strong> Click on any stat card to see more details. Use the sidebar to navigate between sections.
        </p>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard