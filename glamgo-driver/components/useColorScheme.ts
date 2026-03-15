/**
 * useColorScheme Hook
 * Provides color scheme detection for light/dark mode
 */

import { useColorScheme as useNativeColorScheme } from "react-native";

export function useColorScheme() {
  return useNativeColorScheme();
}
