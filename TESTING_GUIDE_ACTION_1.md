# 🧪 Testing Guide: Action 1 - Admin Role & User Profile System

**Date:** March 11, 2026  
**Purpose:** Step-by-step guide to verify deployment and test signup flows

---

## 📋 Table of Contents
1. [Verify Deployment Completion](#1-verify-deployment-completion)
2. [Check AWS Resources](#2-check-aws-resources)
3. [Test Signup Flows](#3-test-signup-flows)
4. [Verify Lambda Logs](#4-verify-lambda-logs)
5. [Test GraphQL Queries](#5-test-graphql-queries)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Verify Deployment Completion

### ✅ Check Terminal Output

**Look for this success message in your terminal:**
```
✔ Deployment complete

[Amplify] Generated GraphQL operations successfully.
```

**What this means:**
- ✅ CloudFormation stack updated successfully
- ✅ Cognito User Pool updated with ADMIN group
- ✅ DynamoDB UserProfile table created
- ✅ Lambda post-confirmation function updated
- ✅ amplify_outputs.json file regenerated

### 📊 Deployment Status Indicators

| Status | Message | Action |
|--------|---------|--------|
| ✅ **Success** | `✔ Deployment complete` | Proceed to testing |
| ⏳ **In Progress** | `⠋ Deployment in progress...` | Wait 2-4 more minutes |
| ❌ **Failed** | Error message with stack trace | Check [Troubleshooting](#6-troubleshooting) |

---

## 2. Check AWS Resources

### Option A: AWS Console (Recommended for beginners)

#### 🔐 **Cognito User Pool - Verify ADMIN Group**

1. Open **AWS Console** → Navigate to **Cognito**
2. Click **User pools** → Select your pool (should be named like `glamgomobile-*`)
3. Go to **Groups** tab
4. **Verify:** You should see 4 groups:
   - ✅ CUSTOMER
   - ✅ VENDOR
   - ✅ DRIVER
   - ✅ **ADMIN** ← New group added in Action 1

#### 🗄️ **DynamoDB - Verify UserProfile Table**

1. Open **AWS Console** → Navigate to **DynamoDB**
2. Click **Tables** in the left sidebar
3. **Look for:** A table with name like `UserProfile-*` (e.g., `UserProfile-dcb6f50055-sandbox`)
4. Click on the table
5. **Verify Schema:**
   - Partition key: `userId` (String)
   - **Fields:** userId, email, name, phone, role, status, approvedBy, approvedAt, createdAt, updatedAt

#### ⚡ **Lambda - Verify Post-Confirmation Function**

1. Open **AWS Console** → Navigate to **Lambda**
2. Look for function named like `postconfirmation-*`
3. Click on the function
4. **Code tab:** Verify the function code includes:
   - ADMIN role in valid roles array
   - UserProfile creation logic
   - Approval workflow (CUSTOMER/ADMIN → APPROVED, VENDOR/DRIVER → PENDING)

### Option B: AWS CLI

```bash
# List Cognito groups (replace YOUR_POOL_ID with actual ID)
aws cognito-idp list-groups --user-pool-id YOUR_POOL_ID --region us-east-1

# List DynamoDB tables
aws dynamodb list-tables --region us-east-1

# Get Lambda function
aws lambda get-function --function-name postconfirmation-XXXXX --region us-east-1
```

---

## 3. Test Signup Flows

### 🧪 Test Plan Overview

| Role | Expected Status | Expected Behavior |
|------|----------------|-------------------|
| **CUSTOMER** | `APPROVED` | Immediate access to app |
| **VENDOR** | `PENDING` | See "pending approval" screen (Action 2) |
| **DRIVER** | `PENDING` | See "pending approval" screen (Action 2) |
| **ADMIN** | `APPROVED` | Immediate access to admin features |

---

### 📱 Test 1: Sign Up as CUSTOMER

**Steps:**
1. Open the GlamGo app (Expo Go or iOS Simulator)
2. Tap **Sign Up**
3. Fill in:
   - **Email:** `customer1@test.com`
   - **Password:** `Test1234!`
   - **Name:** `Test Customer`
   - **Role:** Select **Customer**
4. Tap **Create Account**
5. **Verify email** (check spam folder)
6. **Confirm account** via verification code

**Expected Result:**
- ✅ Account created successfully
- ✅ User assigned to CUSTOMER Cognito group
- ✅ UserProfile created with `status: "APPROVED"`
- ✅ User can immediately access customer dashboard

**Verification Steps:**
1. Go to **AWS Console → Cognito → Users**
2. Find `customer1@test.com`
3. Check **Group memberships:** Should show `CUSTOMER`
4. Go to **DynamoDB → UserProfile table → Items**
5. Find record with `email: customer1@test.com`
6. Verify:
   ```json
   {
     "userId": "cognito-user-id",
     "email": "customer1@test.com",
     "role": "CUSTOMER",
     "status": "APPROVED",  ← Should be APPROVED
     "createdAt": "timestamp",
     "updatedAt": "timestamp"
   }
   ```

---

### 🏪 Test 2: Sign Up as VENDOR

**Steps:**
1. Open the GlamGo app
2. Tap **Sign Up**
3. Fill in:
   - **Email:** `vendor1@test.com`
   - **Password:** `Test1234!`
   - **Name:** `Test Vendor`
   - **Role:** Select **Vendor**
4. Tap **Create Account**
5. **Verify email** and confirm account

**Expected Result:**
- ✅ Account created successfully
- ✅ User assigned to VENDOR Cognito group
- ✅ UserProfile created with `status: "PENDING"`
- ⚠️ User currently can access vendor screens (Action 2 will block this)
- 📋 **Future (Action 2):** User should see "Waiting for admin approval" screen

**Verification Steps:**
1. Go to **AWS Console → Cognito → Users**
2. Find `vendor1@test.com`
3. Check **Group memberships:** Should show `VENDOR`
4. Go to **DynamoDB → UserProfile table → Items**
5. Find record with `email: vendor1@test.com`
6. Verify:
   ```json
   {
     "userId": "cognito-user-id",
     "email": "vendor1@test.com",
     "role": "VENDOR",
     "status": "PENDING",  ← Should be PENDING
     "approvedBy": null,    ← Not approved yet
     "approvedAt": null,
     "createdAt": "timestamp",
     "updatedAt": "timestamp"
   }
   ```

---

### 🚗 Test 3: Sign Up as DRIVER

**Steps:**
1. Open the GlamGo app
2. Tap **Sign Up**
3. Fill in:
   - **Email:** `driver1@test.com`
   - **Password:** `Test1234!`
   - **Name:** `Test Driver`
   - **Role:** Select **Driver**
4. Tap **Create Account**
5. **Verify email** and confirm account

**Expected Result:**
- ✅ Account created successfully
- ✅ User assigned to DRIVER Cognito group
- ✅ UserProfile created with `status: "PENDING"`
- ⚠️ User currently can access driver screens (Action 2 will block this)

**Verification Steps:** Same as Vendor test, but check for `DRIVER` group and role.

---

### 👨‍💼 Test 4: Manually Assign ADMIN Role (via AWS Console)

**Note:** Currently no UI to sign up as ADMIN. Must be assigned manually.

**Steps:**
1. Go to **AWS Console → Cognito → Users**
2. Find an existing test user (e.g., `customer1@test.com`)
3. Click on the user
4. Go to **Group memberships** tab
5. Click **Add user to group**
6. Select **ADMIN**
7. Click **Add**

**Expected Result:**
- ✅ User now has both CUSTOMER and ADMIN groups
- ✅ Can access admin features when implemented

**Future Enhancement:** Create admin signup screen (not in current scope)

---

## 4. Verify Lambda Logs

### 📊 Check CloudWatch Logs

**Why check logs?**
- Confirm Lambda is executing on signup
- Verify UserProfile creation logic runs
- See which status was assigned (APPROVED vs PENDING)

**Steps:**

1. **Open AWS Console → CloudWatch → Logs**
2. **Find log group:** `/aws/lambda/postconfirmation-*`
3. **Click** on the most recent log stream
4. **Look for these messages:**

```
[INFO] PostConfirmation triggered for user: <userId>
[INFO] Role from custom:role attribute: CUSTOMER (or VENDOR/DRIVER)
[INFO] User successfully added to group: CUSTOMER
[INFO] 📝 UserProfile to create: {
  "userId": "...",
  "email": "customer1@test.com",
  "name": "Test Customer",
  "role": "CUSTOMER",
  "status": "APPROVED",  ← Check this matches expected status
  "createdAt": "...",
  "updatedAt": "..."
}
```

### 🔍 What to Look For:

| Role | Expected Log Message |
|------|---------------------|
| **CUSTOMER** | `"status": "APPROVED"` |
| **ADMIN** | `"status": "APPROVED"` |
| **VENDOR** | `"status": "PENDING"` |
| **DRIVER** | `"status": "PENDING"` |

### ⚠️ Note About UserProfile Persistence

Currently, the Lambda **logs** UserProfile data but doesn't persist to DynamoDB yet. You'll see:
```
[INFO] 📝 UserProfile to create: {...}
```

This is **intentional** for Action 1. The actual database write will be added in a future enhancement when implementing the Admin Dashboard.

**For now:** You can manually create UserProfile records via AWS Console or Amplify CLI for testing purposes.

---

## 5. Test GraphQL Queries

### 🛠️ Option A: AWS AppSync Console

1. Open **AWS Console → AppSync**
2. Click on your API (e.g., `glamgomobile-api`)
3. Go to **Queries** tab
4. **Authenticate** with a test user token
5. Run these queries:

#### Query 1: List All UserProfiles (Admin Only)

```graphql
query ListUserProfiles {
  listUserProfiles {
    items {
      userId
      email
      name
      role
      status
      approvedBy
      approvedAt
      createdAt
    }
  }
}
```

**Expected Result:**
- Admin users can see all profiles
- Non-admin users get authorization error

#### Query 2: Get Own UserProfile

```graphql
query GetMyProfile {
  getUserProfile(userId: "your-user-id") {
    userId
    email
    name
    role
    status
    approvedBy
    approvedAt
  }
}
```

**Expected Result:**
- ✅ User can see their own profile
- ✅ Returns correct status (APPROVED or PENDING)

#### Query 3: List Pending Approvals (Admin Only)

```graphql
query ListPendingApprovals {
  listUserProfiles(filter: { status: { eq: "PENDING" } }) {
    items {
      userId
      email
      name
      role
      status
      createdAt
    }
  }
}
```

**Expected Result:**
- Shows all vendors and drivers with PENDING status
- Only accessible by ADMIN group

---

### 🛠️ Option B: Test in React Native App

Add this code temporarily to test queries:

```typescript
// Example: Check current user's profile
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient();

async function checkMyProfile() {
  try {
    const user = await getCurrentUser();
    const profile = await client.graphql({
      query: `
        query GetUserProfile($userId: ID!) {
          getUserProfile(userId: $userId) {
            userId
            email
            role
            status
            approvedBy
            approvedAt
          }
        }
      `,
      variables: { userId: user.userId }
    });
    
    console.log('My Profile:', profile.data.getUserProfile);
    
    if (profile.data.getUserProfile.status === 'PENDING') {
      // Show "waiting for approval" screen (Action 2)
      console.log('⚠️ Account pending approval');
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}
```

---

## 6. Troubleshooting

### ❌ Issue: Deployment Failed

**Symptoms:**
- Error message in terminal
- Stack trace showing CloudFormation errors

**Solutions:**
1. **Check AWS credentials:** Run `aws sts get-caller-identity`
2. **Check region:** Ensure you're deploying to correct region (us-east-1)
3. **Re-run deployment:** `npx ampx sandbox --once`
4. **Check CloudFormation events:** AWS Console → CloudFormation → View stack events

---

### ❌ Issue: ADMIN Group Not Showing

**Symptoms:**
- Only 3 groups in Cognito (CUSTOMER, VENDOR, DRIVER)
- ADMIN missing

**Solutions:**
1. **Verify deployment completed:** Check terminal for success message
2. **Refresh AWS Console:** Hard refresh browser (Cmd+Shift+R)
3. **Check amplify/auth/resource.ts:** Ensure ADMIN is in groups array
4. **Re-deploy:** Run `npx ampx sandbox` again

---

### ❌ Issue: UserProfile Table Not Created

**Symptoms:**
- No UserProfile table in DynamoDB
- GraphQL queries fail with "Table not found"

**Solutions:**
1. **Check deployment:** Verify CloudFormation stack completed
2. **Check region:** Tables created in us-east-1 by default
3. **View CloudFormation outputs:** Look for UserProfile table name
4. **Re-deploy schema:** Run `npx ampx sandbox` again

---

### ❌ Issue: Lambda Not Creating UserProfile

**Symptoms:**
- Signup succeeds but no UserProfile in DynamoDB
- Lambda logs show errors

**Solutions:**
1. **Check Lambda logs:** CloudWatch → /aws/lambda/postconfirmation-*
2. **Verify IAM permissions:** Lambda needs DynamoDB access (will add in future)
3. **Check Lambda environment variables:** Should have table name
4. **For now:** This is expected! Lambda logs UserProfile but doesn't persist yet

**Workaround:**
Manually create UserProfile via AWS Console:
1. Go to DynamoDB → UserProfile table
2. Click **Create item**
3. Add:
   ```json
   {
     "userId": "cognito-user-sub",
     "email": "user@test.com",
     "role": "VENDOR",
     "status": "PENDING",
     "createdAt": "2026-03-11T20:00:00Z",
     "updatedAt": "2026-03-11T20:00:00Z"
   }
   ```

---

### ❌ Issue: Users Can't Sign Up

**Symptoms:**
- Signup form errors
- "User already exists" message

**Solutions:**
1. **Delete existing test users:** AWS Console → Cognito → Users → Delete
2. **Use different email:** Try `customer2@test.com`
3. **Check Cognito settings:** Ensure email verification is enabled
4. **Check app configuration:** Verify amplify_outputs.json is up to date

---

## 📋 Post-Testing Checklist

Once all tests pass, verify:

- [ ] ✅ Deployment completed successfully
- [ ] ✅ ADMIN group exists in Cognito (4 total groups)
- [ ] ✅ UserProfile table exists in DynamoDB
- [ ] ✅ Lambda updated with approval workflow
- [ ] ✅ Signed up as CUSTOMER → Status: APPROVED
- [ ] ✅ Signed up as VENDOR → Status: PENDING
- [ ] ✅ Signed up as DRIVER → Status: PENDING
- [ ] ✅ Lambda logs show correct status assignment
- [ ] ✅ GraphQL queries work for authorized users
- [ ] ✅ Authorization rules block unauthorized access
- [ ] 📝 Documented any issues found

---

## 🚀 Ready for Action 2?

Once all tests pass, you're ready to proceed to **Action 2: Role-Aware Root Navigator**!

**What Action 2 will add:**
- Unified TypeScript types (`types/user.ts`)
- Admin routing in `app/_layout.tsx`
- Approval status checks on navigation
- "Waiting for approval" screen for pending users
- Block pending vendors/drivers from accessing dashboards

**Next Steps:**
1. ✅ Confirm all Action 1 tests pass
2. 📋 Review Action 2 requirements
3. 🛠️ Begin implementing role-aware navigation

---

**Last Updated:** March 11, 2026  
**Status:** ✅ Ready for Testing  
**Related Docs:** [ACTION_1_COMPLETE.md](./ACTION_1_COMPLETE.md)
