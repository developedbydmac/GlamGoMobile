import { useEffect, useState } from 'react';
import { VendorProfile } from '@/types';
import { vendorServices } from '@/services/mockData';

export const useVendorProfile = () => {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await vendorServices.getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (updates: Partial<VendorProfile>) => {
    try {
      setLoading(true);
      const updated = await vendorServices.updateProfile(updates);
      setProfile(updated);
      setError(null);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refetch: fetchProfile, updateProfile };
};
