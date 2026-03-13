import type { UserRole } from "@/types/user";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentCognitoUser, type AuthUser } from "../services/cognitoAuth";

interface AuthContextType {
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
  isLoading: boolean;
  refreshUserRole: () => Promise<void>;
  cachedUser: AuthUser | null;
  setCachedUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let roleCache: { role: UserRole; timestamp: number } | null = null;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [cachedUser, setCachedUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserRole = async () => {
    try {
      setIsLoading(true);

      // Check cache first (5 minute TTL)
      if (roleCache && Date.now() - roleCache.timestamp < CACHE_DURATION) {
        console.log("✅ Using cached user role:", roleCache.role);
        setUserRole(roleCache.role);
        setIsLoading(false);
        return;
      }

      // Check if user is authenticated using direct Cognito
      const user = await getCurrentCognitoUser();

      if (!user) {
        console.log("👤 No user authenticated (normal for logged out state)");
        setUserRole(null);
        setCachedUser(null);
        roleCache = null;
        setIsLoading(false);
        return;
      }

      // User is authenticated, cache the role and user
      console.log("✅ User role fetched and cached:", user.role);
      setUserRole(user.role);
      setCachedUser(user);
      roleCache = { role: user.role, timestamp: Date.now() };
    } catch (error) {
      console.log("❌ Failed to fetch user role:", error);
      setUserRole(null);
      setCachedUser(null);
      roleCache = null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserRole();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        isLoading,
        refreshUserRole,
        cachedUser,
        setCachedUser,
      }}
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
