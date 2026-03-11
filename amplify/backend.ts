import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { lambdaAuthorizer } from './functions/authorizer/resource';
import { createOrder } from './functions/orders/resource';
import { findNearbyDrivers } from './functions/dispatch/resource';
import { ApiGatewayStack } from './functions/api-gateway/stack';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  lambdaAuthorizer,
  createOrder,
  findNearbyDrivers,
});

// Create API Gateway stack with Lambda authorizer
const apiGatewayStack = new ApiGatewayStack(
  backend.createStack('ApiGatewayStack'),
  'GlamGoApiGateway',
  {
    authorizerFunction: backend.lambdaAuthorizer.resources.lambda,
    userPoolId: backend.auth.resources.userPool.userPoolId,
    region: process.env.AWS_REGION || 'us-east-1',
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
