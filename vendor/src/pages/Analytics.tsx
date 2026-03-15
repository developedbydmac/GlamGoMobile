import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { VendorLoadingSpinner } from '@/components/VendorLoadingSpinner';
import { useAnalytics } from '@/hooks/useAnalytics';

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const { analytics, loading, error } = useAnalytics();

  const sidebarItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'Products', path: '/products', icon: '📦' },
    { label: 'Orders', path: '/orders', icon: '🛒' },
    { label: 'Analytics', path: '/analytics', icon: '📈' },
    { label: 'Profile', path: '/profile', icon: '👤' },
  ];

  if (loading) return <VendorLoadingSpinner />;

  const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
  const totalClicks = analytics.reduce((sum, a) => sum + a.clicks, 0);
  const totalOrders = analytics.reduce((sum, a) => sum + a.orders, 0);
  const totalRevenue = analytics.reduce((sum, a) => sum + a.revenue, 0);

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Analytics">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-600 mt-2">Track your sales and performance metrics</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">{error}</div>}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <p className="text-gray-600 text-sm font-medium">Total Views</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalViews.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <p className="text-gray-600 text-sm font-medium">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalClicks.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <p className="text-gray-600 text-sm font-medium">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Analytics Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Clicks</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((entry, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{entry.views}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{entry.clicks}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{entry.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${entry.revenue}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{entry.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
