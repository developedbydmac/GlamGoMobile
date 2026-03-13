# Action 2 Complete - Testing Guide

**Date:** March 11, 2026  
**Status:** Ready for End-to-End Testing

---

## 🎉 What We Built

Action 2 implements the complete approval workflow with:

1. ✅ **Pending Approval Screen** - Blocks vendors/drivers until approved
2. ✅ **Status Check in Navigation** - Fetches UserProfile.status from DynamoDB
3. ✅ **Admin Dashboard** - Lists pending users with approve/suspend buttons
4. ✅ **GraphQL Service Layer** - CRUD operations for UserProfile
5. ✅ **Navigation Guards** - Redirects based on approval status

---

## 📋 Prerequisites

Before testing, ensure:

- [ ] AWS Amplify sandbox is running (`npx ampx sandbox`)
- [ ] Expo dev server is running (`npm start`)
- [ ] Backend deployed successfully (Action 1 complete)
- [ ] You have access to AWS Console

---

## 🔧 Step 1: Create Admin User Manually

Since we don't have an admin user yet, we need to create one manually in AWS:

### Option A: AWS Console (Recommended)

1. **Go to AWS Cognito Console**
   - Navigate to: https://console.aws.amazon.com/cognito
   - Select your region: `us-east-1`
   - Click on your User Pool: `us-east-1_ZMKLKcE8r`

2. **Create Admin User**
   - Click "Users" tab
   - Click "Create user"
   - Fill in:
     ```
     Email: admin@glamgo.com
     Password: AdminPass123!
     Mark email as verified: ✅ YES
     Send invitation: ❌ NO
     ```
   - Click "Create user"

3. **Add to ADMIN Group**
   - Find the user you just created
   - Click on the user
   - Scroll to "Group memberships"
   - Click "Add user to group"
   - Select "ADMIN"
   - Click "Add"

4. **Create UserProfile in DynamoDB**
   - Go to DynamoDB Console
   - Find table: `UserProfile-*` (matches your Amplify environment)
   - Click "Create item"
   - Use JSON view and paste:
     ```json
     {
       "id": "admin-001",
       "userId": "<COPY_COGNITO_SUB_FROM_USER>",
       "email": "admin@glamgo.com",
       "name": "System Admin",
       "role": "ADMIN",
       "status": "APPROVED",
       "createdAt": "2026-03-11T00:00:00.000Z",
       "updatedAt": "2026-03-11T00:00:00.000Z"
     }
     ```
   - **IMPORTANT:** Replace `<COPY_COGNITO_SUB_FROM_USER>` with the actual `sub` value from the Cognito user (found in "User attributes")

### Option B: AWS CLI (Faster)

```bash
# Set your Cognito User Pool ID
USER_POOL_ID="us-east-1_ZMKLKcE8r"

# Create admin user
aws cognito-idp admin-create-user \
  --user-pool-id $USER_POOL_ID \
  --username "admin@glamgo.com" \
  --user-attributes Name=email,Value="admin@glamgo.com" Name=email_verified,Value=true Name=name,Value="System Admin" Name=custom:role,Value=ADMIN \
  --temporary-password "AdminPass123!" \
  --message-action SUPPRESS

# Add to ADMIN group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id $USER_POOL_ID \
  --username "admin@glamgo.com" \
  --group-name "ADMIN"

# Set permanent password
aws cognito-idp admin-set-user-password \
  --user-pool-id $USER_POOL_ID \
  --username "admin@glamgo.com" \
  --password "AdminPass123!" \
  --permanent
```

---

## 🧪 Step 2: Test Approval Workflow

### Test A: Sign Up as Vendor (Should See Pending Screen)

1. **Sign Out** (if currently signed in)
   - Tap user profile icon → Sign Out

2. **Sign Up as Vendor**

   ```
   Role: Vendor (💅)
   Name: Test Vendor
   Email: vendor-test@glamgo.com
   Password: TestPass123!
   ```

3. **Expected Flow:**
   - ✅ Signup succeeds
   - ✅ Email verification sent (enter code)
   - ✅ Auto-signed in
   - ✅ **Redirected to Pending Approval Screen** 🎯
   - Screen shows:
     - ⏳ Icon
     - "Application Under Review"
     - "Thanks for signing up as a Vendor!"
     - "This usually takes 1-2 business days"
     - Sign Out button

4. **Verify Backend:**
   - Check DynamoDB → UserProfile table
   - Should see new entry:
     ```
     email: vendor-test@glamgo.com
     role: VENDOR
     status: PENDING ← KEY FIELD
     ```

---

### Test B: Admin Approves Vendor

1. **Sign Out** from vendor account

2. **Sign In as Admin**

   ```
   Email: admin@glamgo.com
   Password: AdminPass123!
   ```

3. **Expected Flow:**
   - ✅ Auto-redirected to Admin Dashboard
   - ✅ See list of pending users
   - ✅ Should see "Test Vendor" card with:
     - 💅 Vendor icon
     - Email: vendor-test@glamgo.com
     - Role: VENDOR
     - Applied date
     - ✓ Approve button (green)
     - ✕ Suspend button (red)

4. **Approve Vendor:**
   - Tap "✓ Approve" button
   - Confirm in alert dialog
   - ✅ Success message: "Test Vendor has been approved!"
   - ✅ User card disappears from list
   - ✅ If no more pending users, see "✅ All Caught Up!"

5. **Verify Backend:**
   - Check DynamoDB → UserProfile table
   - Vendor entry should now show:
     ```
     status: APPROVED ← UPDATED
     approvedBy: <admin-user-id>
     approvedAt: <timestamp>
     ```

---

### Test C: Vendor Can Now Access Dashboard

1. **Sign Out** from admin account

2. **Sign In as Vendor** again

   ```
   Email: vendor-test@glamgo.com
   Password: TestPass123!
   ```

3. **Expected Flow:**
   - ✅ Sign in succeeds
   - ✅ **NO pending screen** (because status is APPROVED)
   - ✅ Redirected to Vendor Dashboard
   - ✅ Full access to vendor features

---

### Test D: Sign Up as Driver (Should See Pending Screen)

1. **Sign Out**

2. **Sign Up as Driver**

   ```
   Role: Driver (🚗)
   Name: Test Driver
   Email: driver-test@glamgo.com
   Password: TestPass123!
   ```

3. **Expected Flow:**
   - ✅ After verification, see Pending Approval Screen
   - Screen shows "Thanks for signing up as a Driver!"

---

### Test E: Admin Suspends Driver

1. **Sign Out**, then **Sign In as Admin**

2. **In Admin Dashboard:**
   - ✅ See "Test Driver" in pending list
   - Tap "✕ Suspend" button
   - Confirm suspension

3. **Expected:**
   - ✅ Driver removed from pending list
   - ✅ DynamoDB shows `status: SUSPENDED`

4. **Test Suspended User:**
   - Sign Out → Sign In as driver-test@glamgo.com
   - ✅ Should see error or be redirected to browse
   - ❌ Cannot access driver dashboard

---

### Test F: Customer Auto-Approval (No Pending Screen)

1. **Sign Up as Customer**

   ```
   Role: Customer (✨)
   Name: Test Customer 2
   Email: customer2@test.com
   Password: TestPass123!
   ```

2. **Expected Flow:**
   - ✅ After verification, sign in succeeds
   - ✅ **NO pending screen** (customers auto-approved)
   - ✅ Redirected directly to Customer Shop
   - ✅ Full access immediately

3. **Verify Backend:**
   - DynamoDB shows:
     ```
     role: CUSTOMER
     status: APPROVED ← Automatic
     ```

---

## ✅ Success Criteria Checklist

- [ ] Admin user created successfully
- [ ] Admin can sign in and see dashboard
- [ ] Vendor signup creates PENDING status
- [ ] Vendor sees Pending Approval Screen
- [ ] Admin dashboard shows pending vendor
- [ ] Admin can approve vendor
- [ ] Approved vendor can access dashboard
- [ ] Driver signup creates PENDING status
- [ ] Admin can suspend driver
- [ ] Suspended driver cannot access platform
- [ ] Customer signup creates APPROVED status (automatic)
- [ ] Customer never sees pending screen
- [ ] All navigation guards working correctly

---

## 🐛 Troubleshooting

### Admin Dashboard Shows "All Caught Up" But Users Are Pending

**Cause:** GraphQL query not finding pending users  
**Fix:**

1. Check Amplify sandbox is running
2. Verify DynamoDB table has `status: PENDING` entries
3. Check browser/app console for GraphQL errors
4. Try pull-to-refresh on admin dashboard

### Vendor Still Sees Pending Screen After Approval

**Cause:** Cached status in memory  
**Fix:**

1. Sign out completely
2. Sign back in
3. Status should refresh on login

### Cannot Create UserProfile in DynamoDB

**Cause:** Missing permissions or wrong table name  
**Fix:**

1. Ensure you're using the correct table name (includes environment suffix)
2. Check IAM permissions for admin user
3. Verify Amplify auth is configured correctly

### Admin User Cannot Sign In

**Cause:** Password not set correctly or user not in ADMIN group  
**Fix:**

1. Reset password in Cognito Console
2. Verify user is in ADMIN group
3. Check custom:role attribute is set to "ADMIN"
4. Ensure UserProfile exists in DynamoDB

---

## 📊 What to Check in AWS Console

### Cognito User Pool

**Users Tab:**

- admin@glamgo.com (ADMIN group) - APPROVED
- vendor-test@glamgo.com (VENDOR group) - PENDING → APPROVED
- driver-test@glamgo.com (DRIVER group) - PENDING → SUSPENDED
- customer2@test.com (CUSTOMER group) - APPROVED

### DynamoDB UserProfile Table

**Expected Entries:**
| userId | email | role | status | approvedBy | approvedAt |
|--------|-------|------|--------|------------|------------|
| admin-sub | admin@glamgo.com | ADMIN | APPROVED | - | - |
| vendor-sub | vendor-test@glamgo.com | VENDOR | APPROVED | admin-sub | timestamp |
| driver-sub | driver-test@glamgo.com | DRIVER | SUSPENDED | admin-sub | timestamp |
| customer-sub | customer2@test.com | CUSTOMER | APPROVED | - | - |

---

## 🎬 Demo Script for Stakeholders

1. **Show Vendor Signup → Pending Screen**
   - "When a vendor signs up, they see this approval screen"
   - "They cannot access the platform until an admin approves them"

2. **Show Admin Dashboard**
   - "Admins see all pending applications here"
   - "Each card shows user info and application date"

3. **Approve Vendor**
   - "Admin taps Approve → instant approval"
   - "User disappears from pending list"

4. **Show Vendor Dashboard**
   - "Now the approved vendor can access their full dashboard"
   - "They can add products, manage store, etc."

5. **Show Customer Auto-Approval**
   - "Customers are automatically approved"
   - "No waiting period - instant access"

---

## 🚀 Next Steps After Testing

Once all tests pass:

1. **Action 3: Business Onboarding**
   - Collect business details during vendor signup
   - Store business verification documents
   - Enhanced approval with document review

2. **Email Notifications**
   - Send email when user approved
   - Send email when user suspended
   - Reminder emails for pending applications

3. **Admin Analytics**
   - Approval metrics (time to approve, rejection rate)
   - User growth charts
   - Revenue tracking per vendor

---

**Ready to Test?** Start with creating the admin user, then follow Test A! 🎉
