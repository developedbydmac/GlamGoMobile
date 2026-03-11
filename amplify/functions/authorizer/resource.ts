import { defineFunction } from "@aws-amplify/backend";

export const lambdaAuthorizer = defineFunction({
  name: "lambda-authorizer",
  entry: "./handler.ts",
  timeoutSeconds: 10,
  memoryMB: 256,
});
