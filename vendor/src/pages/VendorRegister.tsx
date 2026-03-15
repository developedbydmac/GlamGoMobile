import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const VendorRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.businessName || !formData.email || !formData.password || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock registration - create vendor account
    localStorage.setItem('vendorAuthToken', `vendor-token-${Date.now()}`);
    localStorage.setItem('vendorEmail', formData.email);
    localStorage.setItem('vendorBusinessName', formData.businessName);

    setLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blush-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blush-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">G</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Join GlamGo</h1>
        <p className="text-gray-600 text-center mb-8">Create your vendor account</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              placeholder="Your Beauty Business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              placeholder="vendor@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blush-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 transition"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>

        <p className="text-center text-gray-500 text-xs mt-4">
          Demo mode: All registrations use mock authentication
        </p>
      </div>
    </div>
  );
};

export default VendorRegister;
