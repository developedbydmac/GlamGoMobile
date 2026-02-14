import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserRole = "CUSTOMER" | "VENDOR" | "DRIVER" | null;

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

      // First check if user is authenticated
      try {
        await getCurrentUser();
      } catch (authError) {
        // User is not authenticated - this is normal, not an error
        console.log("👤 No user authenticated (normal for logged out state)");
        setUserRole(null);
        setIsLoading(false);
        return;
      }

      // User is authenticated, fetch attributes
      const attributes = await fetchUserAttributes();
      const role = attributes["custom:role"] as UserRole;
      console.log("✅ User role fetched:", role);
      setUserRole(role);
    } catch (error) {
      console.log("❌ Failed to fetch user role:", error);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserRole();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userRole, setUserRole, isLoading, refreshUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
