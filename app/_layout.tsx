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
import "react-native-get-random-values";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { getCurrentCognitoUser } from "@/services/cognitoAuth";

// NOTE: Using direct AWS Cognito SDK instead of Amplify to avoid storage adapter issues

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
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
  const [isNavigatingFromSignIn, setIsNavigatingFromSignIn] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Re-check auth when segments change (navigation happens)
  useEffect(() => {
    checkAuthStatus();
  }, [segments]);

  const checkAuthStatus = async () => {
    try {
      // Check if user is authenticated using direct Cognito
      const user = await getCurrentCognitoUser();
      
      if (user) {
        console.log("✅ User is authenticated");
        console.log("✅ User role:", user.role);
        setIsAuthenticated(true);
        setUserRole(user.role.toUpperCase() as "CUSTOMER" | "VENDOR" | "DRIVER");
      } else {
        console.log("👤 User is not authenticated (normal for logged out state)");
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } catch (error) {
      // User is not authenticated - this is normal for logged out state
      console.log("👤 User is not authenticated (normal for logged out state)");
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  // Handle navigation based on auth state
  useEffect(() => {
    if (isAuthenticated === null || !loaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inBrowse = segments[0] === "browse";
    const inProductDetail = segments[0] === "product-detail";
    const inRolePreview = String(segments[0] || '').startsWith("role-preview-");
    const inVendorGroup = segments[0] === "(vendor)";
    const inCustomerGroup = segments[0] === "(customer)";
    const inTabsGroup = segments[0] === "(tabs)";
    const inDriverGroup = segments[0] === "(driver)";

    // If we just signed in, give a brief window for navigation to complete
    if (inAuthGroup && segments[1] === "sign-in") {
      setIsNavigatingFromSignIn(true);
      // Clear the flag after a short delay
      setTimeout(() => setIsNavigatingFromSignIn(false), 500);
      return;
    }

    // Role-based access control - prevent cross-role navigation
    // Only block if trying to access OTHER roles' screens
    if (isAuthenticated && userRole) {
      // Vendor trying to access customer/driver screens
      if (userRole === "VENDOR" && (inCustomerGroup || inTabsGroup || inDriverGroup)) {
        console.log("⛔ Vendor cannot access customer/driver screens");
        router.replace("/(vendor)/products" as any);
        return;
      }
      // Customer trying to access vendor/driver screens
      if (userRole === "CUSTOMER" && (inVendorGroup || inDriverGroup)) {
        console.log("⛔ Customer cannot access vendor/driver screens");
        router.replace("/(customer)/shop" as any);
        return;
      }
      // Driver trying to access vendor/customer screens
      if (userRole === "DRIVER" && (inVendorGroup || inCustomerGroup || inTabsGroup)) {
        console.log("⛔ Driver cannot access vendor/customer screens");
        router.replace("/(driver)/available" as any);
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
        <Stack.Screen name="(customer)" options={{ headerShown: false }} />
        <Stack.Screen name="(vendor)" options={{ headerShown: false }} />
        <Stack.Screen name="(driver)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
