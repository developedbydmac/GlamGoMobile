import { defineFunction } from "@aws-amplify/backend";

export const apiGateway = defineFunction({
  name: "api-gateway",
  entry: "./handler.ts",
  timeoutSeconds: 30,
  memoryMB: 512,
});
