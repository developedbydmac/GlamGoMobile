import { defineFunction } from "@aws-amplify/backend";

export const findNearbyDrivers = defineFunction({
  name: "find-nearby-drivers",
  entry: "./handler.ts",
  timeoutSeconds: 30,
  memoryMB: 512,
  environment: {
    API_ENDPOINT: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT || "",
  },
});
