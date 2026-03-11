# GlamGo Mobile - Authentication Implementation

## Overview

This implementation adds AWS Amplify Gen 2 authentication with custom role-based user management to the GlamGo mobile app.

## Features Implemented

### 1. **AWS Amplify Auth Configuration**

- Email-based authentication (username is email)
- Custom user attribute: `custom:role` (required at sign-up)
- Three user groups: `CUSTOMER`, `VENDOR`, `DRIVER`
- Password policy: min 8 chars with uppercase, lowercase, number, and special character

### 2. **User Interface Screens**

#### Role Selection Screen (`/(auth)/role-selection`)

- High-fidelity design with role cards
- Visual selection feedback
- Three roles with descriptions and emojis:
  - **Customer** ✨: Book beauty services at your convenience
  - **Vendor** 💅: Offer your beauty services to customers
  - **Driver** 🚗: Deliver beauty services to customers

#### Sign Up Screen (`/(auth)/sign-up`)

- Collects: Full Name, Email, Password, Confirm Password
- Displays selected role
- Real-time validation
- Two-step process:
  1. Sign up with credentials
  2. Email verification with 6-digit code
- Auto sign-in after verification

#### Sign In Screen (`/(auth)/sign-in`)

- Email and password login
- Error handling
- Redirects to main app after successful login

#### Home Tab (`/(tabs)/index`)

- Displays user information including:
  - Email
  - Name
  - Role (custom:role attribute)
  - User ID
- Sign out functionality

### 3. **Authentication Flow**

- Protected routes (authenticated users see tabs, unauthenticated see auth screens)
- Automatic navigation based on auth state
- Persistent sessions

## Testing Instructions

### Prerequisites

1. Ensure the Amplify sandbox is running:

   ```bash
   npx ampx sandbox
   ```

   Wait for the message: "Deployed resources are available to use"

2. Start the Expo development server:
   ```bash
   npm start
   ```

### Test Flow

#### 1. **Sign Up a New User**

1. Open the app on your phone or simulator
2. You should see the Role Selection screen
3. Select a role (e.g., CUSTOMER)
4. Click "Continue"
5. Fill in the sign-up form:
   - Full Name: John Doe
   - Email: john.doe@example.com (use a real email you can access)
   - Password: Must meet requirements (e.g., `Test@1234`)
   - Confirm Password: Same as above
6. Click "Sign Up"
7. Check your email for a verification code
8. Enter the 6-digit code
9. Click "Verify & Continue"
10. You should be redirected to the main app

#### 2. **Verify in AWS Console**

1. Open AWS Console: https://console.aws.amazon.com/
2. Navigate to Amazon Cognito
3. Select your User Pool (should start with "amplify-")
4. Click "Users" in the left sidebar
5. You should see your new user listed
6. Click on the user to view details
7. Check the "Attributes" section:
   - You should see `custom:role` with the value you selected (e.g., "CUSTOMER")
   - You should see `email` and `name` attributes

#### 3. **Verify User Groups** (Optional - groups require additional setup)

1. In the Cognito console, click "Groups" in the left sidebar
2. You may need to manually add users to groups or implement auto-assignment via Lambda triggers

#### 4. **Test Sign Out and Sign In**

1. In the app, click "Sign Out" on the home tab
2. Confirm sign out
3. You should be redirected to the Role Selection screen
4. Click "Already have an account? Sign In"
5. Enter your credentials
6. You should be signed in and redirected to the main app
7. Your user info should display your role

#### 5. **Test Multiple Roles**

Sign up multiple users with different roles to verify each role is stored correctly:

- User 1: customer@example.com → CUSTOMER role
- User 2: vendor@example.com → VENDOR role
- User 3: driver@example.com → DRIVER role

## File Structure

```
app/
├── (auth)/
│   ├── _layout.tsx           # Auth navigation layout
│   ├── role-selection.tsx    # Role selection screen
│   ├── sign-up.tsx           # Sign up form with verification
│   └── sign-in.tsx           # Sign in screen
├── (tabs)/
│   ├── index.tsx             # Home tab with user info and sign out
│   └── ...
├── _layout.tsx               # Root layout with Amplify config
amplify/
├── auth/
│   └── resource.ts           # Auth configuration with custom attributes
```

## Key Dependencies

```json
{
  "@aws-amplify/ui-react-native": "^3.4.7",
  "aws-amplify": "^6.16.0",
  "react-native-get-random-values": "^1.12.0",
  "amazon-cognito-identity-js": "^6.3.15",
  "@react-native-community/netinfo": "^12.0.2",
  "expo-linear-gradient": "~14.0.4"
}
```

## Troubleshooting

### Issue: "User is not authenticated"

- Make sure the Amplify sandbox is running
- Clear app cache and restart
- Check that `amplify_outputs.json` is up to date

### Issue: "Invalid verification code"

- Ensure you're using the latest code from your email
- Try resending the code
- Check email spam folder

### Issue: Password doesn't meet requirements

Password must have:

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&\*)

### Issue: Navigation not working

- Make sure all auth screens are in `(auth)` folder
- Verify Stack screens are properly configured in `_layout.tsx`

## Next Steps

### Implement Auto-Group Assignment

To automatically assign users to groups based on their role, create a post-confirmation Lambda trigger:

1. Create `amplify/functions/post-confirmation/handler.ts`:

```typescript
import { PostConfirmationTriggerHandler } from "aws-lambda";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({});

export const handler: PostConfirmationTriggerHandler = async (event) => {
  const role = event.request.userAttributes["custom:role"];

  if (role && ["CUSTOMER", "VENDOR", "DRIVER"].includes(role)) {
    try {
      await client.send(
        new AdminAddUserToGroupCommand({
          UserPoolId: event.userPoolId,
          Username: event.userName,
          GroupName: role,
        }),
      );
      console.log(`Added user ${event.userName} to group ${role}`);
    } catch (error) {
      console.error("Error adding user to group:", error);
    }
  }

  return event;
};
```

2. Update `amplify/auth/resource.ts` to add the trigger:

```typescript
import { defineAuth } from "@aws-amplify/backend";
import { postConfirmation } from "../functions/post-confirmation/resource";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    "custom:role": {
      dataType: "String",
      mutable: true,
      required: true,
    },
  },
  groups: ["CUSTOMER", "VENDOR", "DRIVER"],
  triggers: {
    postConfirmation,
  },
});
```

### Add Role-Based Access Control

Use the user's role to show/hide features:

```typescript
const { attributes } = await fetchUserAttributes();
const role = attributes["custom:role"];

if (role === "VENDOR") {
  // Show vendor-specific features
} else if (role === "CUSTOMER") {
  // Show customer-specific features
}
```

### Implement Group-Based Authorization in API

Update your Amplify Data schema to restrict access by group:

```typescript
.authorization((allow) => [
  allow.groups(['VENDOR']).to(['create', 'update', 'delete']),
  allow.groups(['CUSTOMER']).to(['read']),
])
```

## Success Criteria Checklist

✅ User can sign up on phone  
✅ User can choose a role during sign-up  
✅ Role is stored as `custom:role` attribute  
✅ User and role are visible in AWS Cognito Console  
✅ High-fidelity UI using modern design patterns  
✅ Email verification flow implemented  
✅ Sign in/out functionality working  
✅ Protected routes based on auth state

## Support

For issues or questions:

1. Check the Amplify Gen 2 documentation: https://docs.amplify.aws/
2. Review AWS Cognito custom attributes: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
3. Check Expo documentation: https://docs.expo.dev/
