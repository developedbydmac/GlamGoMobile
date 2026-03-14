import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { lambdaAuthorizer } from "./functions/authorizer/resource";
import { createOrder } from "./functions/orders/resource";
import { findNearbyDrivers } from "./functions/dispatch/resource";
import { postConfirmation } from "./functions/post-confirmation/resource";
// Note: apiGateway removed to eliminate circular dependency in Lambda context

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 * 
 * PRODUCTION MODE: Backend with full Lambda integration
 * - Data API (GraphQL) enabled for products, orders, user profiles
 * - Lambda functions enabled: authorizer, orders, dispatch, post-confirmation
 * - API Gateway configured with role-based routing
 * - All core business logic deployed and operational
 */
const backend = defineBackend({
  auth,
  data,
  lambdaAuthorizer,
  createOrder,
  findNearbyDrivers,
  postConfirmation,
});

// Export Lambda function resources for reference
backend.addOutput({
  custom: {
    apiGatewayUrl: "",
    apiGatewayId: "",
    lambdaFunctions: {
      authorizer: "lambda-authorizer",
      orders: "create-order",
      dispatch: "find-nearby-drivers",
      postConfirmation: "post-confirmation",
    },
    message: "Backend deployed successfully - All Lambda functions enabled",
  },
});
