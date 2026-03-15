import React from 'react';
import { VendorNavbar } from '@/components/VendorNavbar';
import { VendorLoadingSpinner } from '@/components/VendorLoadingSpinner';
import { useVendorProfile } from '@/hooks/useVendorProfile';

const VendorProfile: React.FC = () => {
  const { profile, loading, error } = useVendorProfile();

  if (loading) return <VendorLoadingSpinner />;

  return (
    <>
      <VendorNavbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Vendor Profile</h1>
            <p className="text-gray-600 mt-2">Manage your business information</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">{error}</div>}

          {profile && (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-purple-600 to-blush-600 px-6 py-8">
                <div className="flex items-start gap-6">
                  {profile.logo && (
                    <img src={profile.logo} alt={profile.businessName} className="w-20 h-20 rounded-lg object-cover" />
                  )}
                  <div className="text-white flex-1">
                    <h2 className="text-3xl font-bold">{profile.businessName}</h2>
                    <p className="text-purple-100 mt-2">{profile.businessDescription}</p>
                    <div className="flex gap-4 mt-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">★ {profile.rating.toFixed(1)} Rating</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{profile.totalReviews} Reviews</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">${profile.totalSales.toLocaleString()} Sales</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="text-gray-900 font-medium">{profile.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <p className="text-gray-900 font-medium">{profile.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Business Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Street Address</label>
                      <p className="text-gray-900 font-medium">{profile.address}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">City</label>
                      <p className="text-gray-900 font-medium">{profile.city}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">State</label>
                      <p className="text-gray-900 font-medium">{profile.state}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">ZIP Code</label>
                      <p className="text-gray-900 font-medium">{profile.zipCode}</p>
                    </div>
                  </div>
                </div>

                {/* Online Presence */}
                {profile.website && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Online Presence</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.website && (
                        <div>
                          <label className="text-sm text-gray-600">Website</label>
                          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 font-medium hover:underline">
                            {profile.website}
                          </a>
                        </div>
                      )}
                      {profile.socialLinks?.instagram && (
                        <div>
                          <label className="text-sm text-gray-600">Instagram</label>
                          <p className="text-gray-900 font-medium">{profile.socialLinks.instagram}</p>
                        </div>
                      )}
                      {profile.socialLinks?.facebook && (
                        <div>
                          <label className="text-sm text-gray-600">Facebook</label>
                          <p className="text-gray-900 font-medium">{profile.socialLinks.facebook}</p>
                        </div>
                      )}
                      {profile.socialLinks?.tiktok && (
                        <div>
                          <label className="text-sm text-gray-600">TikTok</label>
                          <p className="text-gray-900 font-medium">{profile.socialLinks.tiktok}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Status */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        profile.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : profile.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {profile.status}
                    </span>
                    {profile.approvedAt && (
                      <span className="text-gray-600">
                        Approved on {new Date(profile.approvedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
