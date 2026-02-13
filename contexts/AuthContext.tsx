import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';

type UserRole = 'CUSTOMER' | 'VENDOR' | 'DRIVER' | null;

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isLoading: boolean;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserRole = async () => {
    try {
      setIsLoading(true);
      const attributes = await fetchUserAttributes();
      const role = attributes['custom:role'] as UserRole;
      console.log('✅ User role fetched:', role);
      setUserRole(role);
    } catch (error) {
      console.log('❌ Failed to fetch user role:', error);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserRole();
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, isLoading, refreshUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
