import { getCurrentCognitoUser } from "../services/cognitoAuth";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserRole = "vendor" | "customer" | "driver" | null;

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

      // Check if user is authenticated using direct Cognito
      const user = await getCurrentCognitoUser();
      
      if (!user) {
        console.log("👤 No user authenticated (normal for logged out state)");
        setUserRole(null);
        setIsLoading(false);
        return;
      }

      // User is authenticated, set role
      console.log("✅ User role fetched:", user.role);
      setUserRole(user.role);
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
