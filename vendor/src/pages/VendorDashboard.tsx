import React from 'react';
import { VendorNavbar } from '@/components/VendorNavbar';
import { VendorStatCard } from '@/components/VendorStatCard';
import { VendorLoadingSpinner } from '@/components/VendorLoadingSpinner';
import { useVendorDashboard } from '@/hooks/useVendorDashboard';

const VendorDashboard: React.FC = () => {
  const { stats, loading, error } = useVendorDashboard();

  return (
    <>
      <VendorNavbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to your vendor dashboard</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">{error}</div>}

          {loading ? (
            <VendorLoadingSpinner />
          ) : (
            <>
              {/* Main Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <VendorStatCard label="Active Products" value={stats?.activeProducts || 0} color="purple" />
                <VendorStatCard label="Total Products" value={stats?.totalProducts || 0} color="blue" />
                <VendorStatCard label="Pending Orders" value={stats?.pendingOrders || 0} color="yellow" />
                <VendorStatCard label="Completed Orders" value={stats?.completedOrders || 0} color="green" />
              </div>

              {/* Revenue Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <VendorStatCard
                  label="Monthly Revenue"
                  value={`$${(stats?.monthlyRevenue || 0).toLocaleString()}`}
                  change={12}
                  color="green"
                />
                <VendorStatCard label="Total Revenue" value={`$${(stats?.totalRevenue || 0).toLocaleString()}`} color="purple" />
                <VendorStatCard label="Conversion Rate" value={`${stats?.conversionRate.toFixed(2)}%`} color="blue" />
              </div>

              {/* Reviews & Rating */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VendorStatCard
                  label="Average Rating"
                  value={`${stats?.averageRating.toFixed(1)} ★`}
                  color="yellow"
                />
                <VendorStatCard label="Total Reviews" value={stats?.totalReviews || 0} color="purple" />
              </div>

              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Product</h3>
                  <p className="text-gray-600 text-sm mb-4">Create and list a new product in your catalog</p>
                  <button className="text-purple-600 font-medium hover:text-purple-700">Get Started →</button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Orders</h3>
                  <p className="text-gray-600 text-sm mb-4">View and manage pending and completed orders</p>
                  <button className="text-purple-600 font-medium hover:text-purple-700">View Orders →</button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">View Analytics</h3>
                  <p className="text-gray-600 text-sm mb-4">Track sales, views, and customer insights</p>
                  <button className="text-purple-600 font-medium hover:text-purple-700">See Analytics →</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
