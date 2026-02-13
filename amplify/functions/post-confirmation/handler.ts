import {
    AdminAddUserToGroupCommand,
    CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import type { PostConfirmationTriggerHandler } from "aws-lambda";

const client = new CognitoIdentityProviderClient();

/**
 * This Lambda function is triggered after a user confirms their account.
 * It automatically assigns the user to a group based on their custom:role attribute.
 */
export const handler: PostConfirmationTriggerHandler = async (event) => {
  console.log(
    "Post confirmation trigger event:",
    JSON.stringify(event, null, 2),
  );

  const role = event.request.userAttributes["custom:role"];
  const userPoolId = event.userPoolId;
  const username = event.userName;

  console.log(`User ${username} has role: ${role}`);

  // Only assign to group if role is valid
  if (role && ["CUSTOMER", "VENDOR", "DRIVER"].includes(role)) {
    try {
      const command = new AdminAddUserToGroupCommand({
        UserPoolId: userPoolId,
        Username: username,
        GroupName: role,
      });

      await client.send(command);
      console.log(`Successfully added user ${username} to group ${role}`);
    } catch (error) {
      console.error(`Error adding user to group ${role}:`, error);
      // Don't throw error - we don't want to block user confirmation
      // if group assignment fails
    }
  } else {
    console.warn(`Invalid or missing role for user ${username}: ${role}`);
  }

  return event;
};
