import React from "react";
import {
    ErrorBoundary as ReactErrorBoundary,
    type FallbackProps,
} from "react-error-boundary";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops! Something went wrong</Text>
      <Text style={styles.message}>{errorMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={resetErrorBoundary}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state if needed
      }}
      onError={(error, errorInfo) => {
        // Log to error tracking service (Sentry, etc.)
        console.error("ErrorBoundary caught:", error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#B8860B",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
