import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
// TEMPORARY FIX: Commenting out Lambda functions to resolve circular dependency
// Will re-enable in Week 9 after refactoring API Gateway architecture
// import { lambdaAuthorizer } from './functions/authorizer/resource';
// import { createOrder } from './functions/orders/resource';
// import { findNearbyDrivers } from './functions/dispatch/resource';
// import { ApiGatewayStack } from './functions/api-gateway/stack';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 *
 * DEMO MODE: Backend simplified to resolve deployment issues
 * - Data API (GraphQL) is fully functional for products, orders, user profiles
 * - Custom Lambda functions temporarily disabled (circular dependency)
 * - Frontend uses mock data fallbacks for demo
 * - Full Lambda integration launching Week 9
 */
const backend = defineBackend({
  auth,
  data,
  // TEMPORARY: Commented out to fix circular dependency
  // lambdaAuthorizer,
  // createOrder,
  // findNearbyDrivers,
});

// TEMPORARY FIX: API Gateway stack commented out to resolve circular dependency
// Will refactor in Week 9 to use proper architecture without circular deps
/*
// Create API Gateway stack with Lambda authorizer
const apiGatewayStack = new ApiGatewayStack(
  backend.createStack('ApiGatewayStack'),
  'GlamGoApiGateway',
  {
    authorizerFunction: backend.lambdaAuthorizer.resources.lambda,
    userPoolId: backend.auth.resources.userPool.userPoolId,
  }
);

// Add custom endpoints for orders and driver dispatch
apiGatewayStack.addCustomEndpoint(
  'customer',
  'orders',
  'POST',
  backend.createOrder.resources.lambda
);

apiGatewayStack.addCustomEndpoint(
  'driver',
  'nearby',
  'GET',
  backend.findNearbyDrivers.resources.lambda
);

// Export API Gateway URL for frontend
backend.addOutput({
  custom: {
    apiGatewayUrl: apiGatewayStack.api.url,
    apiGatewayId: apiGatewayStack.api.restApiId,
  },
});
*/

// DEMO MODE: Export placeholder for API Gateway URL
// Frontend will use mock data when this is empty
backend.addOutput({
  custom: {
    apiGatewayUrl: "",
    apiGatewayId: "",
    demoMode: true,
    message:
      "Backend deployed successfully - Lambda functions launching Week 9",
  },
});
