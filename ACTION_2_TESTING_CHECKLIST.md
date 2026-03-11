# 🧪 Action 2 Testing Checklist

**Date:** March 11, 2026  
**Admin User Created:** ✅ admin@glamgo.com

---

## ✅ Pre-Testing Setup Complete

- [x] Admin user created in Cognito
- [x] Admin added to ADMIN group
- [x] Password set to: `AdminPass123!`
- [x] Expo server running in tunnel mode
- [x] Amplify sandbox deployed

---

## 📝 Testing Sequence

### Test 1: Sign In as Admin (First Time)

**Goal:** Verify admin can sign in and see admin dashboard

**Steps:**
1. Open Expo Go app on your device
2. If signed in as customer, tap profile → Sign Out
3. Go to Sign In screen
4. Enter credentials:
   - Email: `admin@glamgo.com`
   - Password: `AdminPass123!`
5. Tap "Sign In"

**Expected Results:**
- ✅ Sign in succeeds
- ✅ Redirected to Admin Dashboard
- ✅ See "User Approval Management" header
- ✅ See "All Caught Up!" (no pending users yet)

**If it fails:**
- Check error message in app
- Try signing out completely first
- Verify Amplify sandbox is running

---

### Test 2: Sign Up as Vendor (Create Pending User)

**Goal:** Create a vendor with PENDING status

**Steps:**
1. Sign out from admin account
2. Tap "Sign Up"
3. Select role: **Vendor (💅)**
4. Fill form:
   ```
   Name: Test Vendor
   Email: vendor-test@glamgo.com
   Password: TestPass123!
   ```
5. Complete email verification
6. Sign in

**Expected Results:**
- ✅ Sign up succeeds
- ✅ Email verification sent
- ✅ After verification, see **Pending Approval Screen** ⏳
- ✅ Screen shows "Application Under Review"
- ✅ Screen shows "Thanks for signing up as a Vendor!"
- ✅ Cannot access vendor dashboard
- ✅ Can only sign out

**If you see vendor dashboard instead:**
- This means navigation guard isn't working
- Check that getUserProfile service is being called
- Check terminal logs for errors

---

### Test 3: Admin Approves Vendor

**Goal:** Admin reviews and approves the pending vendor

**Steps:**
1. Sign out from vendor account
2. Sign in as admin@glamgo.com
3. Should see Admin Dashboard
4. Pull down to refresh (if needed)
5. See "Test Vendor" card in pending list
6. Tap "✓ Approve" button
7. Confirm in dialog

**Expected Results:**
- ✅ See vendor card with:
  - 💅 Icon
  - Name: Test Vendor
  - Email: vendor-test@glamgo.com
  - Role: VENDOR
  - Applied date
- ✅ Tap Approve → Confirmation dialog appears
- ✅ After confirm → Success message
- ✅ Vendor disappears from pending list
- ✅ See "All Caught Up!" message

**If vendor doesn't appear:**
- Check DynamoDB - vendor profile should exist with status: PENDING
- Pull to refresh on admin dashboard
- Check terminal logs for GraphQL errors

---

### Test 4: Approved Vendor Can Access Dashboard

**Goal:** Verify approved vendor can now use the platform

**Steps:**
1. Sign out from admin account
2. Sign in as vendor-test@glamgo.com
3. Enter password: TestPass123!

**Expected Results:**
- ✅ Sign in succeeds
- ✅ **NO pending screen shown** (because status is APPROVED)
- ✅ Redirected to Vendor Dashboard
- ✅ Can see "Dashboard" tab
- ✅ Can see "Products" tab
- ✅ Can add products (if implemented)

---

### Test 5: Sign Up as Driver (Another Pending User)

**Goal:** Test driver signup → pending flow

**Steps:**
1. Sign out
2. Sign up as Driver (🚗)
3. Fill form:
   ```
   Name: Test Driver
   Email: driver-test@glamgo.com
   Password: TestPass123!
   ```
4. Complete verification
5. Sign in

**Expected Results:**
- ✅ After verification, see **Pending Approval Screen** ⏳
- ✅ Screen shows "Thanks for signing up as a Driver!"
- ✅ Cannot access driver dashboard

---

### Test 6: Admin Suspends Driver

**Goal:** Test suspension workflow

**Steps:**
1. Sign out, sign in as admin
2. See "Test Driver" in pending list
3. Tap "✕ Suspend" button
4. Confirm in dialog

**Expected Results:**
- ✅ Confirmation dialog with warning message
- ✅ After confirm → "User suspended" message
- ✅ Driver disappears from pending list

**Then test suspended user:**
1. Sign out, try to sign in as driver-test@glamgo.com
2. **Expected:** Should be blocked or redirected to browse
3. Cannot access driver dashboard

---

### Test 7: Customer Auto-Approval (No Pending)

**Goal:** Verify customers don't see pending screen

**Steps:**
1. Sign out
2. Sign up as Customer (✨)
3. Fill form:
   ```
   Name: Test Customer 2
   Email: customer2-test@glamgo.com
   Password: TestPass123!
   ```
4. Complete verification
5. Sign in

**Expected Results:**
- ✅ **NO pending screen shown**
- ✅ Immediately redirected to Customer Shop
- ✅ Can browse products
- ✅ Can access cart, orders, profile

---

## 📊 Final Verification

After all tests, sign in as admin and verify:

**In Admin Dashboard:**
- [ ] No pending users (all approved/suspended)
- [ ] Can pull to refresh successfully

**In AWS Console → Cognito:**
- [ ] 4 users exist: admin, vendor-test, driver-test, customer2-test
- [ ] All in correct groups
- [ ] All have "Confirmed" status

**In AWS Console → DynamoDB → UserProfile table:**
- [ ] 4 records exist
- [ ] customer2-test: status = APPROVED
- [ ] vendor-test: status = APPROVED, approvedBy = <admin-sub>
- [ ] driver-test: status = SUSPENDED, approvedBy = <admin-sub>

---

## 🐛 Common Issues & Solutions

### Issue: Admin doesn't see pending users
**Solution:** 
- Check Amplify sandbox is running
- Pull to refresh
- Check terminal for GraphQL errors
- Verify DynamoDB table exists and has PENDING records

### Issue: Vendor can access dashboard even with PENDING status
**Solution:**
- Sign out completely and back in
- Check `_layout.tsx` navigation guard is checking status
- Verify `getUserProfile` is being called on sign-in
- Check terminal logs: should see "⏳ VENDOR has PENDING status"

### Issue: Admin approval doesn't work
**Solution:**
- Check admin user has ADMIN group membership
- Verify GraphQL mutation permissions
- Check terminal for permission errors
- Ensure UserProfile record has an `id` field

### Issue: Can't sign in as admin
**Solution:**
- Password is: `AdminPass123!` (case-sensitive)
- Username is: `admin@glamgo.com`
- If locked out, reset in AWS Console
- Verify user exists in Cognito

---

## 🎬 Testing Complete!

Once all tests pass:
1. Take screenshots of:
   - Pending approval screen
   - Admin dashboard with pending users
   - Admin dashboard after approval (empty state)
2. Document any issues found
3. Ready for Action 3: Business Onboarding!

---

**Current Status:** Ready to test!  
**Start with:** Test 1 (Sign in as admin)
