import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import "react-native-get-random-values";
import "react-native-reanimated";

import { AuthProvider } from "@/contexts/AuthContext";
import { getCurrentCognitoUser } from "@/services/cognitoAuth";
import { getUserProfile } from "@/services/userProfile";
import type { ApprovalStatus } from "@/types/user";

// Configure Amplify with amplify_outputs.json
import "@/amplifyConfig";

// NOTE: Using direct AWS Cognito SDK with Amplify configuration

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/browse` keeps a back button present.
  initialRouteName: "browse",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<ApprovalStatus | null>(null);
  const [isNavigatingFromSignIn, setIsNavigatingFromSignIn] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  // Check authentication status ONLY on mount (not on every navigation)
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user is authenticated using direct Cognito
      const user = await getCurrentCognitoUser();

      if (user) {
        console.log("✅ Session restored - User is authenticated");
        console.log("✅ User role:", user.role);
        setIsAuthenticated(true);
        setUserRole(
          user.role.toUpperCase() as "CUSTOMER" | "VENDOR" | "DRIVER",
        );
        
        // Fetch UserProfile from DynamoDB to check approval status
        const profile = await getUserProfile(user.userId);
        if (profile) {
          console.log("✅ UserProfile status:", profile.status);
          setUserStatus(profile.status);
        } else {
          console.log("⚠️ No UserProfile found in DynamoDB");
          // Default to PENDING if no profile found
          setUserStatus('PENDING');
        }
        
        // Don't auto-navigate - let user explore the landing page
      } else {
        console.log(
          "👤 No cached session - User is not authenticated (normal for logged out state)",
        );
        setIsAuthenticated(false);
        setUserRole(null);
        setUserStatus(null);
      }
    } catch (error) {
      // User is not authenticated - this is normal for logged out state
      console.log("👤 User is not authenticated (normal for logged out state)");
      setIsAuthenticated(false);
      setUserRole(null);
      setUserStatus(null);
    }
  };

  // Handle navigation based on auth state
  useEffect(() => {
    if (isAuthenticated === null || !loaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inBrowse = segments[0] === "browse";
    const inProductDetail = segments[0] === "product-detail";
    const inRolePreview = String(segments[0] || "").startsWith("role-preview-");
    const inVendorGroup = segments[0] === "(vendor)";
    const inCustomerGroup = segments[0] === "(customer)";
    const inDriverGroup = segments[0] === "(driver)";
    const inAdminGroup = segments[0] === "(admin)";
    const inPendingApproval = segments[0] === "pending-approval";

    // If we just signed in, give a brief window for navigation to complete
    if (inAuthGroup && segments[1] === "sign-in") {
      setIsNavigatingFromSignIn(true);
      // Clear the flag after a short delay
      setTimeout(() => setIsNavigatingFromSignIn(false), 500);
      return;
    }

    // CHECK 1: Block PENDING users (except customers who are auto-approved)
    if (isAuthenticated && userRole && userStatus === 'PENDING') {
      // Vendors and Drivers with PENDING status should see approval screen
      if ((userRole === 'VENDOR' || userRole === 'DRIVER') && !inPendingApproval) {
        console.log(`⏳ ${userRole} has PENDING status - redirecting to approval screen`);
        router.replace("/pending-approval" as any);
        return;
      }
    }

    // CHECK 2: Block SUSPENDED users
    if (isAuthenticated && userStatus === 'SUSPENDED') {
      console.log("🚫 User is SUSPENDED - redirecting to suspended screen");
      // TODO: Create suspended screen or redirect to browse with message
      router.replace("/browse" as any);
      return;
    }

    // Role-based access control - prevent cross-role navigation
    // Only block if trying to access OTHER roles' screens
    if (isAuthenticated && userRole) {
      // Admin can access everything (no restrictions)
      if (userRole === "ADMIN") {
        // Admin has no restrictions
        // But if on public pages, redirect to admin dashboard
        if ((inBrowse || inProductDetail) && !isNavigatingFromSignIn) {
          console.log("✅ Admin on public page, redirecting to admin dashboard");
          router.replace("/(admin)/dashboard" as any);
        }
        return;
      }
      
      // Vendor trying to access customer/driver/admin screens
      if (userRole === "VENDOR" && (inCustomerGroup || inDriverGroup || inAdminGroup)) {
        console.log("⛔ Vendor cannot access customer/driver/admin screens");
        router.replace("/(vendor)/dashboard" as any);
        return;
      }
      // Customer trying to access vendor/driver/admin screens
      if (userRole === "CUSTOMER" && (inVendorGroup || inDriverGroup || inAdminGroup)) {
        console.log("⛔ Customer cannot access vendor/driver/admin screens");
        router.replace("/(customer)/shop" as any);
        return;
      }
      // Driver trying to access vendor/customer/admin screens
      if (userRole === "DRIVER" && (inVendorGroup || inCustomerGroup || inAdminGroup)) {
        console.log("⛔ Driver cannot access vendor/customer/admin screens");
        router.replace("/(driver)/dashboard" as any);
        return;
      }

      // If authenticated user is on browse or other public pages, redirect to their dashboard
      if ((inBrowse || inProductDetail) && !isNavigatingFromSignIn) {
        console.log(`✅ Authenticated ${userRole} on public page, redirecting to dashboard`);
        if (userRole === "VENDOR") {
          router.replace("/(vendor)/dashboard" as any);
        } else if (userRole === "CUSTOMER") {
          router.replace("/(customer)/shop" as any);
        } else if (userRole === "DRIVER") {
          router.replace("/(driver)/dashboard" as any);
        }
        return;
      }
    }

    // Redirect unauthenticated users to browse (unless they're in allowed public areas)
    // IMPORTANT: Don't redirect if we're in the middle of signing in
    if (
      !isAuthenticated &&
      !inAuthGroup &&
      !inBrowse &&
      !inProductDetail &&
      !inRolePreview &&
      !isNavigatingFromSignIn
    ) {
      router.replace("/browse" as any);
      return;
    }
  }, [isAuthenticated, userRole, segments, loaded, isNavigatingFromSignIn]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isAuthenticated !== null) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isAuthenticated]);

  if (!loaded || isAuthenticated === null) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="browse" options={{ headerShown: false }} />
        <Stack.Screen name="product-detail" options={{ headerShown: false }} />
        <Stack.Screen
          name="role-preview-customer"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="role-preview-vendor"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="role-preview-driver"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="pending-approval" options={{ headerShown: false }} />
        <Stack.Screen name="(customer)" options={{ headerShown: false }} />
        <Stack.Screen name="(vendor)" options={{ headerShown: false }} />
        <Stack.Screen name="(driver)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
