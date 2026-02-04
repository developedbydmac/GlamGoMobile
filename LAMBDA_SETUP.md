# Lambda Trigger Setup (Optional Enhancement)

## Overview
The Lambda trigger automatically assigns users to their corresponding Cognito group based on their `custom:role` attribute after they confirm their email.

## What's Included

### Files Created:
1. `amplify/functions/post-confirmation/resource.ts` - Function definition
2. `amplify/functions/post-confirmation/handler.ts` - Lambda handler logic
3. `amplify/functions/post-confirmation/package.json` - Dependencies

## How to Enable

### Step 1: Update Auth Resource
Update `amplify/auth/resource.ts` to include the trigger:

```typescript
import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from '../functions/post-confirmation/resource';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    'custom:role': {
      dataType: 'String',
      mutable: true,
    },
  },
  groups: ['CUSTOMER', 'VENDOR', 'DRIVER'],
  triggers: {
    postConfirmation,
  },
});
```

### Step 2: Grant Permissions
Update `amplify/backend.ts` to grant the Lambda permission to add users to groups:

```typescript
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { postConfirmation } from './functions/post-confirmation/resource';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  postConfirmation,
});

// Grant the post-confirmation Lambda permission to add users to groups
const postConfirmationLambda = backend.postConfirmation.resources.lambda;
const authResource = backend.auth.resources.userPool;

postConfirmationLambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['cognito-idp:AdminAddUserToGroup'],
    resources: [authResource.userPoolArn],
  })
);
```

### Step 3: Redeploy
The sandbox will automatically detect changes and redeploy.

## Testing

### 1. Sign Up a New User
1. Complete the sign-up flow with role selection
2. Verify your email with the code
3. Sign in

### 2. Verify in AWS Console
1. Go to Cognito → Your User Pool
2. Click on "Groups" in the left sidebar
3. Click on the group (CUSTOMER, VENDOR, or DRIVER)
4. You should see your user listed as a member

### 3. Check CloudWatch Logs
1. Go to CloudWatch → Log groups
2. Find `/aws/lambda/amplify-glamgomobile-*-postConfirmation-*`
3. View logs to see:
   - "User X has role: Y"
   - "Successfully added user X to group Y"

## Benefits

✅ **Automatic Group Assignment** - No manual intervention needed  
✅ **Consistent** - Every user gets assigned to their role group  
✅ **Scalable** - Works for any number of users  
✅ **Auditable** - CloudWatch logs track all assignments  

## How It Works

```
User Signs Up
     ↓
User Confirms Email (enters code)
     ↓
Cognito triggers postConfirmation Lambda
     ↓
Lambda reads custom:role attribute
     ↓
Lambda adds user to corresponding group
     ↓
User is now in their role group!
```

## Use Cases for Groups

Once users are in groups, you can:

### 1. API Authorization
```typescript
// In your Amplify Data schema
const schema = a.schema({
  Service: a.model({
    name: a.string(),
    price: a.float(),
  })
  .authorization((allow) => [
    allow.group('VENDOR').to(['create', 'update', 'delete']),
    allow.group('CUSTOMER').to(['read']),
    allow.group('DRIVER').to(['read']),
  ]),
});
```

### 2. Conditional UI
```typescript
import { fetchAuthSession } from 'aws-amplify/auth';

const session = await fetchAuthSession();
const groups = session.tokens?.accessToken.payload['cognito:groups'] as string[];

if (groups?.includes('VENDOR')) {
  // Show vendor-specific features
} else if (groups?.includes('CUSTOMER')) {
  // Show customer-specific features
}
```

### 3. Route Protection
```typescript
const userGroups = await getUserGroups();

if (userGroups.includes('VENDOR')) {
  router.push('/vendor-dashboard');
} else if (userGroups.includes('CUSTOMER')) {
  router.push('/customer-dashboard');
}
```

## Troubleshooting

### Lambda not triggering
- Check that the trigger is configured in `amplify/auth/resource.ts`
- Verify the sandbox has redeployed successfully
- Check CloudWatch logs for errors

### Permission denied errors
- Ensure the IAM policy is added in `amplify/backend.ts`
- Check that the policy includes `AdminAddUserToGroup` action
- Verify the resource ARN matches your user pool

### User not in group
- Check CloudWatch logs to see if Lambda executed
- Verify the `custom:role` attribute was set during sign-up
- Ensure the role value matches: CUSTOMER, VENDOR, or DRIVER (case-sensitive)

## Without Lambda (Manual Alternative)

If you don't want to use Lambda, you can manually add users to groups:

1. AWS Console → Cognito → User Pool → Users
2. Click on a user
3. Click "Add user to group"
4. Select the appropriate group

Or use AWS CLI:
```bash
aws cognito-idp admin-add-user-to-group \
  --user-pool-id <pool-id> \
  --username <email> \
  --group-name CUSTOMER
```

## Next Steps

After enabling Lambda triggers:
1. Test the complete flow
2. Verify users appear in groups
3. Implement group-based authorization in your API
4. Add conditional UI based on user groups
