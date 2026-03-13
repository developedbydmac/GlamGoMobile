# 🌅 Tomorrow Morning: Action 2 + API Gateway Testing Plan

**Date:** March 12, 2026  
**Status:** ✅ Code Complete, Ready to Test  
**Estimated Time:** 1-2 hours

---

## 🎯 What We're Testing

### Action 2: User Approval Workflow

- Pending approval screen for vendors/drivers
- Admin dashboard for approvals
- Status-based navigation guards

### API Gateway: Role-Based APIs

- JWT authentication with Cognito
- Role enforcement (CUSTOMER, VENDOR, DRIVER, ADMIN)
- Health check endpoints

**Goal:** Prove both systems work together - approved vendors can access vendor APIs! 🎉

---

## ☕ Morning Routine (10 min)

### Step 1: Start Your Dev Environment

```bash
# Terminal 1: Start Amplify Sandbox
npx ampx sandbox

# Terminal 2: Start Expo (in new terminal)
npm start

# Wait for both to be running
```

### Step 2: Verify Everything is Running

**Check Amplify Sandbox:**

```
✅ Sandbox deployed and watching for changes...
✅ Auth resources deployed
✅ Data resources deployed
```

**Check Expo:**

```
✅ Metro bundling complete
✅ Scan QR code to open in Expo Go
```

---

## 🧪 Test Sequence (60 min)

### Test 1: Customer Health Check (10 min)

**Goal:** Verify customer can access customer API

**Steps:**

1. **Open app, sign in as customer:**
   - Email: `customer@test.com`
   - Password: [Your password]

2. **Add test button to customer dashboard:**

   Update `app/(customer)/dashboard.tsx`:

   ```typescript
   import { Alert, Button } from "react-native";
   import { customerApi } from "@/services/apiClient";

   // Add this button somewhere visible
   <Button
     title="🧪 Test API"
     onPress={async () => {
       try {
         const result = await customerApi.healthCheck();
         Alert.alert(
           "✅ Success!",
           `API Working!\nRole: ${result.role}\nTime: ${result.timestamp}`
         );
       } catch (error: any) {
         Alert.alert(
           "❌ Error",
           error.response?.data?.message || error.message
         );
       }
     }}
   />
   ```

3. **Tap "Test API" button**

**Expected Result:**

```
✅ Success!
API Working!
Role: CUSTOMER
Time: 2026-03-12T...
```

**If it fails:**

- Check terminal logs for errors
- Verify API Gateway URL is set: Look for "✅ API Gateway configured" log
- Check Amplify sandbox is running
- Re-sign in to get fresh JWT token

---

### Test 2: Role Enforcement (10 min)

**Goal:** Verify customer CANNOT access vendor routes

**Steps:**

1. **Still signed in as customer**

2. **Add this test:**

   ```typescript
   import { apiClient } from "@/services/apiClient";

   <Button
     title="🔒 Test Role Enforcement"
     onPress={async () => {
       try {
         // Customer tries to access vendor endpoint
         await apiClient.get("/vendor/health");
         Alert.alert("❌ SECURITY ISSUE", "Customer accessed vendor route!");
       } catch (error: any) {
         if (error.response?.status === 403) {
           Alert.alert("✅ Security Working", "403 Forbidden - Correct!");
         } else {
           Alert.alert("❌ Unexpected Error", JSON.stringify(error.response?.status));
         }
       }
     }}
   />
   ```

3. **Tap "Test Role Enforcement"**

**Expected Result:**

```
✅ Security Working
403 Forbidden - Correct!
```

---

### Test 3: Create Admin User (10 min)

**Goal:** Have an admin account to approve vendors

**Option A: AWS Console** (Easier)

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito)
2. Click on your User Pool: `amplify-glamgomobile-...`
3. Go to **Users** tab
4. Click **Create user**
5. Fill in:
   - Username: `admin@glamgo.com`
   - Email: `admin@glamgo.com`
   - Temporary password: `TempPass123!`
   - Uncheck "Send invitation"
6. Click **Create user**
7. Click on the new user
8. Go to **Group memberships** tab
9. Click **Add user to group**
10. Select **ADMIN** group
11. Click **Add**

**Option B: AWS CLI** (Faster if you have CLI configured)

```bash
aws cognito-idp admin-create-user \
  --user-pool-id us-east-1_ZMKLKcE8r \
  --username admin@glamgo.com \
  --user-attributes Name=email,Value=admin@glamgo.com Name=name,Value="Admin User" \
  --temporary-password "TempPass123!" \
  --region us-east-1

aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-1_ZMKLKcE8r \
  --username admin@glamgo.com \
  --group-name ADMIN \
  --region us-east-1

aws cognito-idp admin-set-user-password \
  --user-pool-id us-east-1_ZMKLKcE8r \
  --username admin@glamgo.com \
  --password "AdminPass123!" \
  --permanent \
  --region us-east-1
```

**Verify:**

- Admin user appears in Cognito Users
- User is in ADMIN group

---

### Test 4: Admin API Access (10 min)

**Goal:** Admin can access admin routes

**Steps:**

1. **Sign out from customer account**

2. **Sign in as admin:**
   - Email: `admin@glamgo.com`
   - Password: `TempPass123!` (first time) or `AdminPass123!`
   - If first time, you'll be prompted to change password

3. **Should see Admin Dashboard** ✅

4. **Test admin API:**

   Add to `app/(admin)/dashboard.tsx`:

   ```typescript
   import { adminApi } from "@/services/apiClient";

   <Button
     title="🧪 Test Admin API"
     onPress={async () => {
       try {
         const result = await adminApi.healthCheck();
         Alert.alert("✅ Admin API Working!", JSON.stringify(result, null, 2));
       } catch (error: any) {
         Alert.alert("❌ Error", error.message);
       }
     }}
   />
   ```

5. **Tap "Test Admin API"**

**Expected Result:**

```
✅ Admin API Working!
{
  "message": "OK",
  "role": "ADMIN",
  "timestamp": "..."
}
```

---

### Test 5: Vendor Signup → Pending Screen (10 min)

**Goal:** Vendor sees pending approval screen

**Steps:**

1. **Sign out from admin**

2. **Sign up as new vendor:**
   - Tap "Sign Up"
   - Select **Vendor (💅)**
   - Name: `Test Vendor 2`
   - Email: `vendor2@test.com`
   - Password: `TestPass123!`

3. **Complete email verification**

4. **Sign in**

**Expected Result:**

- ✅ See **Pending Approval Screen** ⏳
- ✅ Shows "Thanks for signing up as a Vendor!"
- ✅ Shows "Your application is under review"
- ✅ Cannot access vendor dashboard

**If you see vendor dashboard instead:**

- Action 2 navigation guard isn't working
- Check terminal logs for "⏳ VENDOR has PENDING status"
- Check that `getUserProfile` is being called

---

### Test 6: Admin Approves Vendor (10 min)

**Goal:** Admin can approve pending vendor

**Steps:**

1. **Sign out, sign in as admin**

2. **Should see Admin Dashboard with pending users**

3. **Pull down to refresh** (if list is empty)

4. **Should see "Test Vendor 2" card:**
   - 💅 Icon
   - Name: Test Vendor 2
   - Email: vendor2@test.com
   - Role: VENDOR

5. **Tap "✓ Approve" button**

6. **Confirm in dialog**

**Expected Result:**

- ✅ Success alert
- ✅ Vendor disappears from pending list
- ✅ See "All Caught Up!" if no more pending users

**Check DynamoDB:**

- Go to DynamoDB → UserProfile table
- Find vendor2@test.com record
- Verify `status` changed from `PENDING` to `APPROVED`

---

### Test 7: Approved Vendor → API Access (10 min)

**Goal:** Approved vendor can access vendor API

**Steps:**

1. **Sign out from admin**

2. **Sign in as vendor2@test.com**

**Expected Result:**

- ✅ **NO pending screen** (because status is APPROVED)
- ✅ Redirected to Vendor Dashboard
- ✅ Can see Dashboard and Products tabs

3. **Test vendor API:**

   Add to `app/(vendor)/dashboard.tsx`:

   ```typescript
   import { vendorApi } from "@/services/apiClient";

   <Button
     title="🧪 Test Vendor API"
     onPress={async () => {
       try {
         const result = await vendorApi.healthCheck();
         Alert.alert("✅ Vendor API Working!", JSON.stringify(result, null, 2));
       } catch (error: any) {
         Alert.alert("❌ Error", error.message);
       }
     }}
   />
   ```

4. **Tap "Test Vendor API"**

**Expected Result:**

```
✅ Vendor API Working!
{
  "message": "OK",
  "role": "VENDOR",
  "timestamp": "...",
  "authorizer": {
    "userId": "...",
    "email": "vendor2@test.com",
    "groups": "[\"VENDOR\"]"
  }
}
```

🎉 **THIS IS THE BIG WIN!** Approved vendor + API access working together!

---

## 📋 Success Checklist

After all tests, you should have:

### Action 2 Working:

- [x] Customer: Auto-approved, immediate access
- [x] Vendor: Pending screen shown
- [x] Admin: Can approve vendors
- [x] Approved vendor: Can access dashboard

### API Gateway Working:

- [x] Customer can call `/customer/health`
- [x] Customer CANNOT call `/vendor/health` (403)
- [x] Admin can call `/admin/health`
- [x] Approved vendor can call `/vendor/health`
- [x] JWT tokens automatically added to requests
- [x] Role enforcement working

### Integration Working:

- [x] Approval workflow + API access linked
- [x] Status checking happens on sign-in
- [x] Navigation guards work
- [x] DynamoDB records correct

---

## 📸 Screenshot Checklist

Take screenshots of:

1. ✅ Customer API health check success
2. ✅ Role enforcement 403 Forbidden
3. ✅ Admin API health check success
4. ✅ Pending approval screen (vendor)
5. ✅ Admin dashboard with pending user
6. ✅ Admin approval success
7. ✅ Approved vendor API health check
8. ✅ DynamoDB UserProfile table

---

## 🐛 Troubleshooting Guide

### Issue: "Cannot find API Gateway URL"

**Solution:**

1. Check `amplify_outputs.json` → Look for `custom.apiGatewayUrl`
2. If missing, redeploy: `npx ampx sandbox --once`
3. Check terminal output for API Gateway URL
4. Manually set: `apiClient.setBaseURL("https://...")`

### Issue: API returns 401 Unauthorized

**Causes:**

- JWT token expired
- User not signed in
- Token not being added to request

**Solution:**

```typescript
// Check if user is authenticated
import { fetchAuthSession } from "aws-amplify/auth";

const session = await fetchAuthSession();
console.log("Has token?", !!session.tokens?.idToken);
console.log("Token:", session.tokens?.idToken?.toString().substring(0, 50));
```

### Issue: API returns 403 Forbidden (when it shouldn't)

**Causes:**

- User doesn't have correct Cognito group
- Trying to access wrong route
- Authorizer not extracting groups correctly

**Solution:**

1. Check user's groups in Cognito Console
2. Check terminal logs for authorizer output
3. Look for: `"groups": ["CUSTOMER"]` in logs

### Issue: Pending screen not showing

**Causes:**

- Navigation guard not checking status
- UserProfile not being fetched
- Status not set correctly in DynamoDB

**Solution:**

1. Check terminal logs: Should see "⏳ VENDOR has PENDING status"
2. Check DynamoDB: Verify vendor has `status: PENDING`
3. Sign out completely and back in (refreshes status)

---

## 🎉 Victory Conditions

You'll know everything is working when:

1. ✅ Customer can shop, vendors/drivers wait for approval
2. ✅ Admin can approve/suspend users
3. ✅ Approved users can access their APIs
4. ✅ Role enforcement prevents unauthorized access
5. ✅ JWT authentication works automatically
6. ✅ All health checks return 200 OK for correct roles

---

## 📅 After Testing

Once all tests pass, create:

### Test Results Document

`docs/API_GATEWAY_TEST_RESULTS.md`:

```markdown
# Test Results - March 12, 2026

## ✅ All Tests Passed

- Customer API: PASS ✅
- Vendor API: PASS ✅
- Admin API: PASS ✅
- Role enforcement: PASS ✅
- Action 2 approval flow: PASS ✅

## Screenshots

[Attach screenshots]

## Next Steps

Ready to build:

1. Catalog service (stores, products, search)
2. Cart system (Zustand state management)
3. Order creation (inventory validation, delivery fees)
```

---

## 🚀 Afternoon Plan (After Tests Pass)

### Option 1: Build Catalog Service (3 hours)

Create real product browsing:

- `GET /customer/stores` - List stores
- `GET /customer/stores/{id}/products` - Store products
- `GET /customer/products/search` - Product search
- Update `browse.tsx` with real data

### Option 2: Build Admin Endpoints (2 hours)

Replace GraphQL with REST APIs:

- `GET /admin/users/pending` - List pending users
- `POST /admin/users/{id}/approve` - Approve user
- `POST /admin/users/{id}/suspend` - Suspend user
- Update admin dashboard to use REST instead of GraphQL

### Option 3: Both! (5 hours)

Do catalog service first (customers can shop), then admin endpoints (better UX for approvals).

---

## 💡 Pro Tips

1. **Keep terminals visible:** Watch for errors in real-time
2. **Use Alert.alert liberally:** Quick feedback for API calls
3. **Check CloudWatch logs:** Lambda authorizer logs are helpful
4. **Test both success and failure:** Proves security is working
5. **Take breaks:** Testing can be tedious, stay fresh!

---

## ✨ You've Got This!

Everything is set up and ready. Just follow the steps above and you'll have:

- ✅ Working approval workflow
- ✅ Secure role-based APIs
- ✅ Foundation for all future features

**Estimated time:** 1-2 hours  
**Difficulty:** Medium  
**Reward:** HUGE - everything else builds on this! 🎯

---

**Good luck! See you tomorrow morning! 🌅**
