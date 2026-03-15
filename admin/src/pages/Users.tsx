import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { UserCard } from '@/components/UserCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useUsers } from '@/hooks/useUsers';

type FilterType = 'all' | 'pending' | 'vendor' | 'driver' | 'customer';

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('pending');

  const sidebarItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'Users', path: '/users', icon: '👥' },
    { label: 'Orders', path: '/orders', icon: '📦' },
    { label: 'Drivers', path: '/drivers', icon: '🚗' },
  ];

  const getFilterConfig = () => {
    if (filter === 'pending') return { filter: 'pending' as const };
    if (filter === 'vendor') return { filter: 'role' as const, filterValue: 'VENDOR' };
    if (filter === 'driver') return { filter: 'role' as const, filterValue: 'DRIVER' };
    if (filter === 'customer') return { filter: 'role' as const, filterValue: 'CUSTOMER' };
    return { filter: undefined, filterValue: undefined };
  };

  const config = getFilterConfig();
  const { users, loading, error, approveUser, suspendUser } = useUsers(
    config.filter,
    config.filterValue
  );

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="User Management">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-600 mt-2">Approve vendors, drivers, and manage users</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {['pending', 'vendor', 'driver', 'customer', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as FilterType)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                filter === f
                  ? 'bg-purple-600 text-white'
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
            {/* Users Grid */}
            {users.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">No users found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onApprove={approveUser}
                    onSuspend={suspendUser}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Users;