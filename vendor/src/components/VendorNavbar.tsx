import React from 'react';

export const VendorNavbar: React.FC = () => {
  const handleSignOut = () => {
    localStorage.removeItem('vendorAuthToken');
    window.location.href = '/login';
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blush-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">GlamGo Vendor</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8">
            <a href="/" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Dashboard
            </a>
            <a href="/products" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Products
            </a>
            <a href="/orders" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Orders
            </a>
            <a href="/analytics" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Analytics
            </a>
            <a href="/profile" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Profile
            </a>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};
