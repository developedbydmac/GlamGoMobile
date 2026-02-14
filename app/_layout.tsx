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

import amplifyConfig from "@/amplify_outputs.json";
import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { Amplify } from "aws-amplify";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

// Configure Amplify
Amplify.configure(amplifyConfig);

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
  const router = useRouter();
  const segments = useSegments();

  // Check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user is authenticated first
      await getCurrentUser();
      // If we get here, user is authenticated
      const attributes = await fetchUserAttributes();
      const role = attributes["custom:role"];
      console.log("✅ User is authenticated");
      console.log("✅ User role:", role);
      setIsAuthenticated(true);
      setUserRole(role || null);
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

    if (!isAuthenticated && !inAuthGroup && !inBrowse) {
      // Redirect to browse page for unauthenticated users
      router.replace("/browse");
    } else if (isAuthenticated && (inAuthGroup || inBrowse)) {
      // Redirect based on user role
      if (userRole === "CUSTOMER") {
        router.replace("/(customer)/shop");
      } else if (userRole === "VENDOR") {
        router.replace("/(vendor)/dashboard");
      } else if (userRole === "DRIVER") {
        router.replace("/(driver)/available");
      } else {
        // Fallback for unknown roles
        router.replace("/browse");
      }
    }
  }, [isAuthenticated, userRole, segments, loaded]);

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
