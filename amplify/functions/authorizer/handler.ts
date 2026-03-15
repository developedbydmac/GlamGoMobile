import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";
import * as jwt from "jsonwebtoken";
import * as jwksClient from "jwks-rsa";

// JWKS client to fetch public keys from Cognito
const client = jwksClient.default({
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`,
  cache: true,
  cacheMaxAge: 600000, // 10 minutes
});

// Get signing key from JWKS
function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback): void {
  client.getSigningKey(header.kid, (err: Error | null, key: any) => {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

// Verify JWT token
async function verifyToken(token: string): Promise<jwt.JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USER_POOL_ID}`,
        algorithms: ["RS256"],
      },
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as jwt.JwtPayload);
        }
      },
    );
  });
}

// Extract route prefix from methodArn
// Example: "arn:aws:execute-api:us-east-1:123456789012:abcdef123/prod/GET/customer/health"
function getRoutePrefix(methodArn: string): string | null {
  const parts = methodArn.split("/");
  if (parts.length < 4) return null;

  // parts[3] is the first path segment after the stage
  const firstSegment = parts[3];

  // Valid route prefixes
  const validPrefixes = ["customer", "vendor", "driver", "admin"];
  return validPrefixes.includes(firstSegment) ? firstSegment : null;
}

// Map route prefix to required Cognito group
function getRequiredGroup(routePrefix: string): string {
  const mapping: Record<string, string> = {
    customer: "CUSTOMER",
    vendor: "VENDOR",
    driver: "DRIVER",
    admin: "ADMIN",
  };
  return mapping[routePrefix] || "";
}

// Generate IAM policy
function generatePolicy(
  principalId: string,
  effect: "Allow" | "Deny",
  resource: string,
  context?: Record<string, any>,
): APIGatewayAuthorizerResult {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };
}

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent,
): Promise<APIGatewayAuthorizerResult> => {
  console.log("🔐 Authorizer invoked", {
    methodArn: event.methodArn,
    authorizationToken: event.authorizationToken ? "Present" : "Missing",
  });

  try {
    // Extract token from Authorization header
    const token = event.authorizationToken?.replace("Bearer ", "").trim();

    if (!token) {
      console.error("❌ No token provided");
      throw new Error("Unauthorized");
    }

    // Verify and decode JWT
    const decoded = await verifyToken(token);
    console.log("✅ Token verified", {
      sub: decoded.sub,
      email: decoded.email,
      groups: decoded["cognito:groups"],
    });

    // Extract user's Cognito groups
    const userGroups: string[] = decoded["cognito:groups"] || [];
    console.log("👥 User groups:", userGroups);

    // Get the route prefix from the methodArn
    const routePrefix = getRoutePrefix(event.methodArn);
    console.log("🛣️ Route prefix:", routePrefix);

    if (!routePrefix) {
      console.error("❌ Invalid route - no recognized prefix");
      throw new Error("Unauthorized");
    }

    // Get required group for this route
    const requiredGroup = getRequiredGroup(routePrefix);
    console.log("🎯 Required group:", requiredGroup);

    // Check if user has the required group
    const hasAccess = userGroups.includes(requiredGroup);
    console.log(
      `${hasAccess ? "✅" : "❌"} Access ${hasAccess ? "granted" : "denied"}`,
    );

    if (!hasAccess) {
      // User doesn't have required role - deny access
      return generatePolicy(decoded.sub || "unknown", "Deny", event.methodArn, {
        error: "Forbidden",
        message: `This route requires ${requiredGroup} role`,
        userGroups: JSON.stringify(userGroups),
      });
    }

    // User has required role - allow access
    return generatePolicy(decoded.sub || "unknown", "Allow", event.methodArn, {
      userId: decoded.sub,
      email: decoded.email,
      groups: JSON.stringify(userGroups),
      routePrefix,
      requiredGroup,
    });
  } catch (error) {
    console.error("❌ Authorization failed:", error);
    throw new Error("Unauthorized"); // API Gateway will return 401
  }
};
