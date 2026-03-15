/**
 * API Test Component
 * Add this to any dashboard to test API Gateway health checks
 */

import { Colors, Typography } from "@/constants/DesignSystem";
import {
    adminApi,
    customerApi,
    driverApi,
    vendorApi
} from "@/services/apiClient";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TestResult {
  endpoint: string;
  status: "pending" | "success" | "error";
  message: string;
  statusCode?: number;
}

export default function ApiTestPanel() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);

  const addResult = (result: TestResult) => {
    setResults((prev) => [...prev, result]);
  };

  const clearResults = () => {
    setResults([]);
  };

  const testHealthCheck = async (
    endpoint: string,
    apiFn: () => Promise<any>,
  ) => {
    addResult({ endpoint, status: "pending", message: "Testing..." });

    try {
      const result = await apiFn();
      addResult({
        endpoint,
        status: "success",
        message: `✅ ${result.role} - ${result.message}`,
        statusCode: 200,
      });
      return true;
    } catch (error: any) {
      const statusCode = error.response?.status;
      const message =
        statusCode === 403
          ? "🚫 Forbidden (Expected - wrong role)"
          : statusCode === 401
            ? "🔒 Unauthorized (No token)"
            : `❌ ${error.message}`;

      addResult({
        endpoint,
        status: statusCode === 403 ? "success" : "error",
        message,
        statusCode,
      });
      return false;
    }
  };

  const runAllTests = async () => {
    setTesting(true);
    clearResults();

    // Test current user's endpoint (should succeed)
    await testHealthCheck("Customer Health", customerApi.healthCheck);

    // Test wrong endpoints (should fail with 403)
    await testHealthCheck("Vendor Health (Should Fail)", vendorApi.healthCheck);
    await testHealthCheck("Driver Health (Should Fail)", driverApi.healthCheck);
    await testHealthCheck("Admin Health (Should Fail)", adminApi.healthCheck);

    setTesting(false);

    // Summary alert
    Alert.alert("Tests Complete", "Check results below. ✅ = Pass, ❌ = Fail", [
      { text: "OK" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 API Gateway Test</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={runAllTests}
          disabled={testing}
        >
          <Text style={styles.buttonText}>
            {testing ? "Testing..." : "Run All Tests"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={clearResults}
          disabled={testing}
        >
          <Text style={[styles.buttonText, styles.secondaryText]}>Clear</Text>
        </TouchableOpacity>
      </View>

      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results:</Text>
          {results.map((result, index) => (
            <View
              key={index}
              style={[
                styles.resultRow,
                result.status === "success" && styles.successRow,
                result.status === "error" && styles.errorRow,
              ]}
            >
              <Text style={styles.resultEndpoint}>{result.endpoint}</Text>
              <Text style={styles.resultMessage}>{result.message}</Text>
              {result.statusCode && (
                <Text style={styles.resultCode}>{result.statusCode}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      <Text style={styles.infoText}>
        💡 Expected: Your role's endpoint succeeds (200), others fail (403)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: Colors.neutral.deepCharcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.deepCharcoal,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: Colors.primary.royalPurple,
  },
  secondaryButton: {
    backgroundColor: Colors.neutral.blushCream,
    borderWidth: 1,
    borderColor: Colors.neutral.ashGray,
  },
  buttonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.white,
  },
  secondaryText: {
    color: Colors.neutral.deepCharcoal,
  },
  resultsContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.neutral.blushCream,
    borderRadius: 12,
  },
  resultsTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.deepCharcoal,
    marginBottom: 12,
  },
  resultRow: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: Colors.neutral.white,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.neutral.ashGray,
  },
  successRow: {
    borderLeftColor: Colors.secondary.mintGreen,
  },
  errorRow: {
    borderLeftColor: Colors.accent.coralPink,
  },
  resultEndpoint: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.deepCharcoal,
    marginBottom: 4,
  },
  resultMessage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.charcoal,
  },
  resultCode: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.ashGray,
    marginTop: 4,
  },
  infoText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.ashGray,
    marginTop: 12,
    fontStyle: "italic",
  },
});
