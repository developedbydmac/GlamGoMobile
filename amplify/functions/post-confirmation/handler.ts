import {
    AdminAddUserToGroupCommand,
    CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import type { PostConfirmationTriggerHandler } from "aws-lambda";

const cognitoClient = new CognitoIdentityProviderClient();

/**
 * This Lambda function is triggered after a user confirms their account.
 * It:
 * 1. Assigns the user to a Cognito group based on their custom:role attribute
 * 2. Creates a UserProfile record in DynamoDB with approval workflow
 */
export const handler: PostConfirmationTriggerHandler = async (event) => {
  console.log(
    "Post confirmation trigger event:",
    JSON.stringify(event, null, 2),
  );

  const role = event.request.userAttributes["custom:role"];
  const userPoolId = event.userPoolId;
  const username = event.userName;
  const email = event.request.userAttributes.email;
  const name = event.request.userAttributes.name || "";
  const userId = event.request.userAttributes.sub; // Cognito user ID

  console.log(`User ${username} (${userId}) has role: ${role}`);

  // Step 1: Assign to Cognito group
  if (role && ["CUSTOMER", "VENDOR", "DRIVER", "ADMIN"].includes(role)) {
    try {
      const command = new AdminAddUserToGroupCommand({
        UserPoolId: userPoolId,
        Username: username,
        GroupName: role,
      });

      await cognitoClient.send(command);
      console.log(`✅ Successfully added user ${username} to group ${role}`);
    } catch (error) {
      console.error(`❌ Error adding user to group ${role}:`, error);
      // Don't throw error - we don't want to block user confirmation
    }

    // Step 2: Create UserProfile record with approval workflow
    try {
      // Determine initial status based on role
      // CUSTOMER: Auto-approved (immediate access)
      // VENDOR/DRIVER: Pending approval (admin must approve)
      // ADMIN: Auto-approved (rarely created, needs existing admin)
      const initialStatus = role === "CUSTOMER" || role === "ADMIN" 
        ? "APPROVED" 
        : "PENDING";

      // Create UserProfile using Amplify Data API
      // Note: This requires the Lambda to have permissions to write to DynamoDB
      const userProfile = {
        userId: userId,
        email: email,
        name: name,
        role: role,
        status: initialStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // TODO: Add DynamoDB client to create UserProfile record
      // For now, log the profile that should be created
      console.log(`📝 UserProfile to create:`, JSON.stringify(userProfile, null, 2));
      console.log(`ℹ️  Status: ${initialStatus} (${role === "CUSTOMER" ? "auto-approved" : role === "ADMIN" ? "auto-approved" : "pending admin approval"})`);

      // Note: You'll need to add @aws-sdk/client-dynamodb and create the record
      // Example implementation:
      // const dynamoClient = new DynamoDBClient();
      // await dynamoClient.send(new PutItemCommand({
      //   TableName: process.env.USER_PROFILE_TABLE_NAME,
      //   Item: marshall(userProfile)
      // }));

    } catch (error) {
      console.error(`❌ Error creating UserProfile:`, error);
      // Don't throw - allow signup to complete even if profile creation fails
    }
  } else {
    console.warn(`⚠️  Invalid or missing role for user ${username}: ${role}`);
  }

  return event;
};
