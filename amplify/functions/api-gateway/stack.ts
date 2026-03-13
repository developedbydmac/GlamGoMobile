import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export interface ApiGatewayStackProps {
  authorizerFunction: lambda.IFunction;
  userPoolId: string;
}

export class ApiGatewayStack extends Construct {
  public readonly api: apigateway.RestApi;
  public readonly authorizer: apigateway.TokenAuthorizer;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id);

    // Create REST API
    this.api = new apigateway.RestApi(this, "GlamGoApi", {
      restApiName: "GlamGo Marketplace API",
      description: "Role-based API Gateway for GlamGo mobile marketplace",
      deployOptions: {
        stageName: "prod",
        throttlingRateLimit: 100,
        throttlingBurstLimit: 200,
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        metricsEnabled: true,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
          "X-Amz-Security-Token",
          "X-Amz-User-Agent",
        ],
        allowCredentials: true,
      },
      cloudWatchRole: true,
    });

    // Create Lambda Token Authorizer
    this.authorizer = new apigateway.TokenAuthorizer(this, "GlamGoAuthorizer", {
      handler: props.authorizerFunction,
      identitySource: "method.request.header.Authorization",
      authorizerName: "GlamGoJWTAuthorizer",
      resultsCacheTtl: cdk.Duration.minutes(5),
      validationRegex: "^Bearer [-0-9a-zA-Z._]*$",
    });

    // Pass environment variables to authorizer
    const authorizerFn = props.authorizerFunction as lambda.Function;
    authorizerFn.addEnvironment("USER_POOL_ID", props.userPoolId);
    // AWS_REGION is automatically provided by Lambda runtime - don't set it manually

    // Create route prefixes
    const customerResource = this.api.root.addResource("customer");
    const vendorResource = this.api.root.addResource("vendor");
    const driverResource = this.api.root.addResource("driver");
    const adminResource = this.api.root.addResource("admin");

    // Create health check endpoints for each role
    this.addHealthCheckEndpoint(customerResource, "CUSTOMER");
    this.addHealthCheckEndpoint(vendorResource, "VENDOR");
    this.addHealthCheckEndpoint(driverResource, "DRIVER");
    this.addHealthCheckEndpoint(adminResource, "ADMIN");

    // Output API URL
    new cdk.CfnOutput(this, "ApiUrl", {
      value: this.api.url,
      description: "GlamGo API Gateway URL",
      exportName: "GlamGoApiUrl",
    });

    new cdk.CfnOutput(this, "ApiId", {
      value: this.api.restApiId,
      description: "GlamGo API Gateway ID",
      exportName: "GlamGoApiId",
    });
  }

  private addHealthCheckEndpoint(
    resource: apigateway.Resource,
    role: string,
  ): void {
    // Create /health endpoint under each role prefix
    const healthResource = resource.addResource("health");

    // Create a simple Lambda function for health check
    const healthCheckFn = new lambda.Function(this, `${role}HealthCheck`, {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Health check called for ${role}', {
            requestContext: event.requestContext,
            headers: event.headers,
          });
          
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              message: 'OK',
              role: '${role}',
              timestamp: new Date().toISOString(),
              authorizer: event.requestContext?.authorizer || {},
            }),
          };
        };
      `),
      description: `Health check endpoint for ${role} routes`,
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
    });

    // Add GET method with authorizer
    healthResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(healthCheckFn),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.CUSTOM,
      },
    );

    // CORS is handled by defaultCorsPreflightOptions on the API - no need to add manually
  }

  // Helper method to add custom endpoints later
  public addCustomEndpoint(
    routePrefix: "customer" | "vendor" | "driver" | "admin",
    path: string,
    method: string,
    handler: lambda.IFunction,
  ): void {
    const rootResource = this.api.root.getResource(routePrefix);
    if (!rootResource) {
      throw new Error(`Route prefix ${routePrefix} not found`);
    }

    const resource = rootResource.resourceForPath(path);
    resource.addMethod(method, new apigateway.LambdaIntegration(handler), {
      authorizer: this.authorizer,
      authorizationType: apigateway.AuthorizationType.CUSTOM,
    });
  }
}
