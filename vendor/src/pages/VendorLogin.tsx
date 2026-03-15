import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorLogin: React.FC = () => {
  const [email, setEmail] = useState('vendor@glamgo.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email && password) {
      localStorage.setItem('vendorAuthToken', `vendor-token-${Date.now()}`);
      navigate('/');
    } else {
      setError('Please enter both email and password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blush-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blush-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">G</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">GlamGo Vendor</h1>
        <p className="text-gray-600 text-center mb-8">Sign in to your vendor dashboard</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              placeholder="vendor@glamgo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blush-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">Demo credentials: vendor@glamgo.com / any password</p>
      </div>
    </div>
  );
};

export default VendorLogin;
