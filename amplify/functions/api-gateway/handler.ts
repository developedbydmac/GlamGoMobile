import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

/**
 * This handler is a placeholder for the API Gateway stack.
 * The actual routing is handled by the CDK stack which creates
 * separate Lambda functions for each endpoint.
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("API Gateway handler invoked", {
    path: event.path,
    method: event.httpMethod,
    headers: event.headers,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message: "API Gateway Stack Deployed",
      timestamp: new Date().toISOString(),
    }),
  };
};
