# 🧪 RBAC Testing Guide - What to Test

**Quick reference for testing the RBAC implementation**

---

## 🚀 Quick Start Testing (15 minutes)

### Test 1: Group Assignment Verification
**What:** Verify users are added to Cognito groups after signup

**Steps:**
1. Create new vendor account: `vendor-test@glamgo.app` / password: `Test123!@`
2. Open AWS Cognito console → User pool `us-east-1_ZMKLKcE8r`
3. Find user `vendor-test@glamgo.app`
4. Check "Groups" section → Should show `VENDOR`

**Expected:** User appears in VENDOR group  
**If Fails:** Post-confirmation Lambda may not have executed - check CloudWatch logs

---

### Test 2: Token Groups Extraction
**What:** Verify groups are extracted from ID token

**Steps:**
1. Sign in as vendor-test@glamgo.app
2. Open app console (Chrome DevTools)
3. Check for log: `✅ Groups extracted from ID token`
4. Should show: `{ groups: ["VENDOR"] }`

**Expected:** Console shows groups extracted  
**If Fails:** Token decoding failed - verify asyncStorage has idToken

---

### Test 3: Navigation Guard - Role Verification
**What:** Verify navigation guard blocks users without matching group

**Steps:**
1. Sign in as customer account
2. Try to manually navigate to `/vendor/dashboard` (type in URL bar)
3. App should redirect back to `/browse` or customer dashboard

**Expected:** Cross-role navigation blocked  
**If Fails:** `userGroups` state not being set - check AuthContext

---

### Test 4: GraphQL Authorization - Create Product Block
**What:** Verify customer can't create products (GraphQL @auth rule)

**Steps:**
1. Sign in as CUSTOMER user
2. Open Amplify DataStore client in console
3. Try: `await client.models.Product.create({ name: "Hack", price: 99 })`
4. Should get error: `Not authorized to access... on type Product`

**Expected:** 403 Forbidden error  
**If Fails:** @auth directives may not have deployed - re-run `ampx sandbox`

---

### Test 5: Admin Dashboard Access
**What:** Verify admin can access admin dashboard

**Steps:**
1. Sign in as ADMIN user
2. App should auto-redirect to `/admin/dashboard`
3. Should see approval workflow UI

**Expected:** Admin dashboard loads  
**If Fails:** Role routing in `_layout.tsx` not working - check logs

---

## 📋 Manual Test Scenarios (1 hour)

### Scenario A: Customer Workflow
```
1. Create account as CUSTOMER
   └─ Email: customer@glamgo.app
   └─ Password: Test123!@#
   └─ Role: CUSTOMER

2. Verify in Cognito
   ├─ Check groups: Should show ["CUSTOMER"]
   └─ Check custom:role: Should show "CUSTOMER"

3. Sign in with credentials
   ├─ Check AuthContext.userRole: Should be "CUSTOMER"
   ├─ Check AuthContext.userGroups: Should include "CUSTOMER"
   └─ Auto-redirect to: /customer/shop

4. Test blocked actions
   ├─ Try to create product: ❌ BLOCKED (GraphQL @auth)
   ├─ Try to access /vendor/dashboard: ❌ REDIRECTED
   ├─ Try to access /driver/dashboard: ❌ REDIRECTED
   └─ Try to access /admin/dashboard: ❌ REDIRECTED

5. Test allowed actions
   ├─ Browse products: ✅ WORKS
   ├─ Create order: ✅ WORKS
   ├─ View my orders: ✅ WORKS
   └─ Update order: ✅ WORKS (self-owned)
```

### Scenario B: Vendor Workflow
```
1. Create account as VENDOR
   └─ Email: vendor@glamgo.app
   └─ Password: Test123!@#
   └─ Role: VENDOR

2. Verify in Cognito
   ├─ Check groups: Should show ["VENDOR"]
   └─ Check status in UserProfile: Should be "PENDING"

3. Sign in with credentials
   ├─ Check AuthContext.userRole: Should be "VENDOR"
   ├─ Check AuthContext.userGroups: Should include "VENDOR"
   └─ Auto-redirect to: /pending-approval (PENDING status)

4. Wait for admin approval
   ├─ Admin signs in → /admin/dashboard
   ├─ Find your vendor card
   ├─ Click "Approve"
   └─ Confirm in dialog

5. Verify post-approval access
   ├─ Vendor signs out and back in
   ├─ Should auto-redirect to: /vendor/dashboard
   ├─ Should NOT see pending approval screen
   └─ Can now create products

6. Test blocked actions
   ├─ Try to create order: ❌ BLOCKED (GraphQL @auth)
   ├─ Try to access /customer/dashboard: ❌ REDIRECTED
   ├─ Try to access /driver/dashboard: ❌ REDIRECTED
   └─ Try to access /admin/dashboard: ❌ REDIRECTED

7. Test allowed actions
   ├─ Create store: ✅ WORKS
   ├─ Create product: ✅ WORKS
   ├─ Update own product: ✅ WORKS
   ├─ Delete own product: ✅ WORKS
   └─ Browse other vendors: ✅ WORKS (read-only)
```

### Scenario C: Driver Workflow
```
1. Create account as DRIVER
   └─ Email: driver@glamgo.app
   └─ Password: Test123!@#
   └─ Role: DRIVER

2. Verify in Cognito
   ├─ Check groups: Should show ["DRIVER"]
   └─ Check status in UserProfile: Should be "PENDING"

3. Wait for admin approval (see Scenario B step 4-5)

4. Verify post-approval access
   ├─ Driver signs in → /driver/dashboard
   ├─ Should show available orders/deliveries
   └─ Can update delivery status

5. Test blocked actions
   ├─ Try to create product: ❌ BLOCKED (GraphQL @auth)
   ├─ Try to create order: ❌ BLOCKED (GraphQL @auth)
   ├─ Try to access /vendor/dashboard: ❌ REDIRECTED
   └─ Try to access /admin/dashboard: ❌ REDIRECTED

6. Test allowed actions
   ├─ Accept delivery: ✅ WORKS
   ├─ Update delivery status: ✅ WORKS
   ├─ View order details: ✅ WORKS
   └─ Update current location: ✅ WORKS
```

### Scenario D: Admin Workflow
```
1. Create account as ADMIN
   └─ Email: admin@glamgo.app
   └─ Password: Test123!@#
   └─ Role: ADMIN

2. Verify in Cognito
   ├─ Check groups: Should show ["ADMIN"]
   └─ Check status in UserProfile: Should be "APPROVED" (auto)

3. Sign in with credentials
   ├─ Check AuthContext.userRole: Should be "ADMIN"
   ├─ Check AuthContext.userGroups: Should include "ADMIN"
   └─ Auto-redirect to: /admin/dashboard

4. Test admin capabilities
   ├─ View pending vendors: ✅ WORKS
   ├─ Approve vendor: ✅ WORKS
   ├─ Suspend user: ✅ WORKS
   ├─ View all users: ✅ WORKS
   └─ System statistics: ✅ WORKS

5. Test universal access
   ├─ Can read any user profile: ✅ WORKS
   ├─ Can read any order: ✅ WORKS
   ├─ Can read any product: ✅ WORKS
   ├─ Can browse any store: ✅ WORKS
   └─ Cannot create products: ❌ BLOCKED (admin, not vendor)
```

---

## 🧬 GraphQL Authorization Tests

### Test: Unauthorized Product Creation (Customer)
```graphql
mutation CreateProduct {
  createProduct(input: {
    name: "Hack Product"
    price: 99.99
    inventoryCount: 100
    category: "Nails"
    storeId: "store-123"
    vendorId: "hack-vendor-id"
  }) {
    id
    name
  }
}
```
**Expected:** Error - `Not authorized to access createProduct on type Product`  
**Customer Groups:** ["CUSTOMER"]  
**Requires Group:** ["VENDOR"]

---

### Test: Authorized Product Creation (Vendor)
```graphql
mutation CreateProduct {
  createProduct(input: {
    name: "Luxury Hair Treatment"
    price: 49.99
    inventoryCount: 50
    category: "Hair Care"
    storeId: "store-vendor-123"
    vendorId: "vendor-user-id"
  }) {
    id
    name
  }
}
```
**Expected:** Success - Product created  
**Vendor Groups:** ["VENDOR"]  
**Requires Group:** ["VENDOR"]

---

### Test: Unauthorized Order Creation (Driver)
```graphql
mutation CreateOrder {
  createOrder(input: {
    customerId: "driver-id"
    customerName: "Hack Driver"
    customerEmail: "driver@test.com"
    deliveryAddress: "123 Main St"
    deliveryCity: "NYC"
    deliveryState: "NY"
    deliveryZipCode: "10001"
    totalAmount: 99.99
  }) {
    id
    status
  }
}
```
**Expected:** Error - `Not authorized to access createOrder on type Order`  
**Driver Groups:** ["DRIVER"]  
**Requires Group:** ["CUSTOMER"]

---

### Test: Authorized Order Creation (Customer)
```graphql
mutation CreateOrder {
  createOrder(input: {
    customerId: "customer-user-id"
    customerName: "John Customer"
    customerEmail: "customer@test.com"
    deliveryAddress: "456 Oak Ave"
    deliveryCity: "NYC"
    deliveryState: "NY"
    deliveryZipCode: "10002"
    totalAmount: 149.99
  }) {
    id
    status
  }
}
```
**Expected:** Success - Order created  
**Customer Groups:** ["CUSTOMER"]  
**Requires Group:** ["CUSTOMER"]

---

### Test: Admin User Profile Update
```graphql
mutation UpdateUserProfile {
  updateUserProfile(input: {
    id: "profile-123"
    status: "APPROVED"
    approvedBy: "admin-user-id"
  }) {
    id
    status
    approvedBy
  }
}
```
**Expected:** Success - Status updated  
**Admin Groups:** ["ADMIN"]  
**Allowed:** ["ADMIN"]

---

## ⚠️ Common Issues & Fixes

### Issue 1: "User groups not showing in logs"
**Cause:** Post-confirmation Lambda not connected  
**Fix:** Check if `triggers: { postConfirmation }` is in `amplify/auth/resource.ts`  
**Verify:**
```bash
# Redeploy backend
npx ampx sandbox
# Watch for "Successfully added user to group CUSTOMER" in logs
```

---

### Issue 2: "GraphQL operations returning 403 for everyone"
**Cause:** @auth directives not deployed or incorrect  
**Fix:** Re-deploy GraphQL schema
```bash
npx ampx sandbox
# Wait for CloudFormation update to complete
```

---

### Issue 3: "Navigation guard not redirecting cross-role access"
**Cause:** `userGroups` state not being set  
**Fix:** Check `app/_layout.tsx` - verify `getGroupsFromIdToken()` is called in `checkAuthStatus()`  
**Verify:**
```bash
# Check browser console for: "Groups extracted from ID token"
# Should show actual groups like ["VENDOR"]
```

---

### Issue 4: "Groups not extracted from token"
**Cause:** Token decoding failed or token doesn't contain groups  
**Fix:** Verify post-confirmation Lambda executed successfully
```bash
# Check CloudWatch logs for post-confirmation Lambda
# Look for: "Successfully added user to group VENDOR"
# If missing: Lambda may not have permissions
```

---

## ✅ Checklist Before Deployment

- [ ] Test 1: Group Assignment Verification ✅ PASSED
- [ ] Test 2: Token Groups Extraction ✅ PASSED
- [ ] Test 3: Navigation Guard - Role Verification ✅ PASSED
- [ ] Test 4: GraphQL Authorization - Create Product Block ✅ PASSED
- [ ] Test 5: Admin Dashboard Access ✅ PASSED
- [ ] Scenario A: Customer Workflow ✅ PASSED
- [ ] Scenario B: Vendor Workflow ✅ PASSED
- [ ] Scenario C: Driver Workflow ✅ PASSED
- [ ] Scenario D: Admin Workflow ✅ PASSED
- [ ] GraphQL Authorization Tests ✅ PASSED
- [ ] No console errors in development
- [ ] No TypeScript errors
- [ ] All manual tests documented in TEST_RESULTS.md

---

## 📊 Results Template

Create `TEST_RESULTS.md` with format:

```markdown
# RBAC Testing Results - March 14, 2026

## Quick Tests (15 min)
- [x] Test 1: Group Assignment - ✅ PASSED
- [x] Test 2: Token Extraction - ✅ PASSED
- [x] Test 3: Navigation Guard - ✅ PASSED
- [x] Test 4: GraphQL Auth - ✅ PASSED
- [x] Test 5: Admin Dashboard - ✅ PASSED

## Scenarios (1 hour)
- [x] Scenario A: Customer - ✅ PASSED
- [x] Scenario B: Vendor - ✅ PASSED
- [x] Scenario C: Driver - ✅ PASSED
- [x] Scenario D: Admin - ✅ PASSED

## GraphQL Tests
- [x] Unauthorized Product Create - ✅ BLOCKED
- [x] Authorized Product Create - ✅ WORKS
- [x] Unauthorized Order Create - ✅ BLOCKED
- [x] Authorized Order Create - ✅ WORKS
- [x] Admin Profile Update - ✅ WORKS

## Issues Found: 0
## Issues Fixed: 0

**Status:** ✅ READY FOR DEPLOYMENT
```

---

**Next:** Run these tests, document results, then proceed to deployment. You've got this! 🚀
