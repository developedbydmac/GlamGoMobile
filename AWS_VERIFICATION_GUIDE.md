# 🔍 AWS Resource Verification Guide

**Date:** March 11, 2026  
**User Pool:** `us-east-1_ZMKLKcE8r`  
**Region:** `us-east-1`  
**AppSync API:** `https://tef6izps3zbwldy2yqlsgripv4.appsync-api.us-east-1.amazonaws.com/graphql`

---

## ✅ Resources to Verify in AWS Console

### 1. **Cognito User Pool** (5 min)

**Navigate to:** AWS Console → Cognito → User Pools → `us-east-1_ZMKLKcE8r`

**Check:**

- [ ] **Groups tab** → Should see 4 groups:
  - `CUSTOMER` (precedence 0)
  - `VENDOR` (precedence 1)
  - `DRIVER` (precedence 2)
  - `ADMIN` (precedence 3)

- [ ] **Lambda triggers tab** → Should see:
  - Post confirmation trigger assigned to `postconfirmation-*` Lambda

- [ ] **Users tab** → Currently empty (will populate after signup tests)

---

### 2. **DynamoDB Tables** (3 min)

**Navigate to:** AWS Console → DynamoDB → Tables

**Find table:** `UserProfile-*` (name includes random suffix)

**Check Schema:**

- [ ] **Partition Key:** `userId` (String)
- [ ] **Attributes:** Should include:
  - `userId`, `email`, `name`, `phone`
  - `role`, `status`
  - `approvedBy`, `approvedAt`
  - `createdAt`, `updatedAt`

- [ ] **Items tab:** Currently empty (will populate after signup tests)

---

### 3. **Lambda Function** (5 min)

**Navigate to:** AWS Console → Lambda → Functions

**Find function:** `postconfirmation-*` (name includes random suffix)

**Check:**

- [ ] **Code source:** Should see handler logic with:
  - Cognito group assignment (lines ~40-50)
  - UserProfile creation logic (lines ~60-80)
  - ADMIN role support

- [ ] **Environment variables:** Check if any required vars are set

- [ ] **CloudWatch Logs:** Will check logs after signup test

---

### 4. **AppSync API** (3 min)

**Navigate to:** AWS Console → AppSync → APIs

**Find API:** Look for `amplify-glamgomobile-*`

**Check:**

- [ ] **Schema:** Should include:
  - `UserProfile` type with all fields
  - Queries: `getUserProfile`, `listUserProfiles`
  - Mutations: `createUserProfile`, `updateUserProfile`, `deleteUserProfile`

- [ ] **Authorization:** Should use Cognito User Pools

- [ ] **Data sources:** Should have DynamoDB UserProfile table connected

---

## 🎯 Quick Verification Checklist

Before proceeding to signup tests, confirm:

| Resource                   | Expected State                             | Status |
| -------------------------- | ------------------------------------------ | ------ |
| Cognito Groups             | 4 groups (CUSTOMER, VENDOR, DRIVER, ADMIN) | ⬜     |
| Cognito Lambda Trigger     | Post-confirmation assigned                 | ⬜     |
| DynamoDB UserProfile Table | Created with correct schema                | ⬜     |
| Lambda Function            | Deployed with updated code                 | ⬜     |
| AppSync API                | Schema includes UserProfile                | ⬜     |

---

## 🧪 Ready for Signup Tests?

Once you've verified the resources above, you're ready to:

1. **Test Customer Signup** → Should get APPROVED status immediately
2. **Test Vendor Signup** → Should get PENDING status (needs approval)
3. **Test Driver Signup** → Should get PENDING status (needs approval)

**Next:** See `TESTING_GUIDE_ACTION_1.md` Step 2 for detailed signup test instructions.

---

## 🔧 Troubleshooting

### If AWS CLI didn't work:

```bash
# Configure AWS CLI
aws configure

# Enter your credentials:
# AWS Access Key ID: <your-key>
# AWS Secret Access Key: <your-secret>
# Default region: us-east-1
# Default output format: json

# Then re-run verification
./verify-deployment.sh
```

### If you can't access AWS Console:

- You can proceed directly to signup tests
- App will fail if resources aren't deployed correctly
- Check your terminal where `npx ampx sandbox` is running for deployment status

---

**Status:** ✅ Deployment active, ready for testing  
**Next Step:** Test signup flows in your app
