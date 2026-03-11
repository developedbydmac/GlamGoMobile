# 🧪 Signup Flow Testing Walkthrough

**Date:** March 11, 2026  
**Status:** Ready to test with deployed backend

---

## 🎯 Test Plan Overview

We'll test 3 different user roles to verify the approval workflow:

1. **CUSTOMER** → Should get `APPROVED` status immediately ✅
2. **VENDOR** → Should get `PENDING` status (needs admin approval) ⏳
3. **DRIVER** → Should get `PENDING` status (needs admin approval) ⏳

---

## 📱 Test A: Customer Signup (Immediate Access)

### Expected Outcome: ✅ APPROVED Status

### Steps:

1. **Start your app:**
   ```bash
   npm start
   ```

2. **Navigate to signup:**
   - Launch app in iOS Simulator or Android Emulator
   - On welcome screen → "Sign Up"
   - Select role → **"Customer" (✨ emoji)**

3. **Fill out form:**
   ```
   Full Name: Test Customer
   Email: customer1@test.com
   Password: TestPass123!
   Confirm Password: TestPass123!
   ```

4. **Submit & Verify:**
   - Tap "Create Account"
   - Check email for verification code
   - Enter 6-digit code
   - Tap "Verify"

5. **Expected Result:**
   - ✅ Auto-signed in
   - ✅ Redirected to customer dashboard
   - ✅ No approval screen shown
   - ✅ Full access to customer features

### Verify in Backend:

**Check Lambda Logs:**
```bash
# In AWS Console → CloudWatch → Logs
# Find log group: /aws/lambda/postconfirmation-*
# Look for latest log stream
# Should see:
{
  "userId": "...",
  "email": "customer1@test.com",
  "name": "Test Customer",
  "role": "CUSTOMER",
  "status": "APPROVED",  ← Should be APPROVED
  "createdAt": "2026-03-11T..."
}
```

**Check DynamoDB:**
```bash
# In AWS Console → DynamoDB → Tables → UserProfile-*
# Should see 1 item:
userId: <cognito-sub>
email: customer1@test.com
role: CUSTOMER
status: APPROVED  ← Key field
```

---

## 📱 Test B: Vendor Signup (Needs Approval)

### Expected Outcome: ⏳ PENDING Status

### Steps:

1. **Sign out from customer account:**
   - Go to Profile → Sign Out

2. **Navigate to signup:**
   - On welcome screen → "Sign Up"
   - Select role → **"Vendor" (💅 emoji)**

3. **Fill out form:**
   ```
   Full Name: Test Vendor
   Email: vendor1@test.com
   Password: TestPass123!
   Confirm Password: TestPass123!
   ```

4. **Submit & Verify:**
   - Tap "Create Account"
   - Check email for verification code
   - Enter 6-digit code
   - Tap "Verify"

5. **Expected Result:**
   - ✅ Auto-signed in
   - ⚠️ Currently: Can access vendor dashboard (Action 2 will fix)
   - 🎯 Action 2 Goal: Show "Waiting for Approval" screen

### Verify in Backend:

**Check Lambda Logs:**
```bash
# In CloudWatch → /aws/lambda/postconfirmation-*
# Should see:
{
  "userId": "...",
  "email": "vendor1@test.com",
  "name": "Test Vendor",
  "role": "VENDOR",
  "status": "PENDING",  ← Should be PENDING
  "createdAt": "2026-03-11T..."
}
```

**Check DynamoDB:**
```bash
# In DynamoDB → UserProfile-* table
# Should see 2 items now:
1. customer1@test.com (APPROVED)
2. vendor1@test.com (PENDING)  ← Key field
```

---

## 📱 Test C: Driver Signup (Needs Approval)

### Expected Outcome: ⏳ PENDING Status

### Steps:

1. **Sign out from vendor account**

2. **Navigate to signup:**
   - Select role → **"Driver" (🚗 emoji)**

3. **Fill out form:**
   ```
   Full Name: Test Driver
   Email: driver1@test.com
   Password: TestPass123!
   Confirm Password: TestPass123!
   ```

4. **Submit & Verify:**
   - Follow same email verification flow

5. **Expected Result:**
   - ✅ Auto-signed in
   - ⚠️ Currently: Can access driver dashboard (Action 2 will fix)
   - 🎯 Action 2 Goal: Show "Waiting for Approval" screen

### Verify in Backend:

**Check DynamoDB:**
```bash
# Should see 3 items:
1. customer1@test.com (APPROVED)
2. vendor1@test.com (PENDING)
3. driver1@test.com (PENDING)  ← Key field
```

---

## 🔍 Verification Summary

### After all 3 tests, you should see:

**In Cognito User Pool (AWS Console → Cognito → Users tab):**
- ✅ 3 users registered
- ✅ All users have "Confirmed" status
- ✅ Each user assigned to correct group:
  - customer1@test.com → CUSTOMER group
  - vendor1@test.com → VENDOR group
  - driver1@test.com → DRIVER group

**In DynamoDB UserProfile Table:**
| userId | email | name | role | status |
|--------|-------|------|------|--------|
| sub-123... | customer1@test.com | Test Customer | CUSTOMER | ✅ APPROVED |
| sub-456... | vendor1@test.com | Test Vendor | VENDOR | ⏳ PENDING |
| sub-789... | driver1@test.com | Test Driver | DRIVER | ⏳ PENDING |

**In CloudWatch Lambda Logs:**
- ✅ 3 log entries showing UserProfile creation
- ✅ Correct status assigned based on role
- ✅ No errors

---

## 🎯 What This Proves

### ✅ Working Now:
1. Post-confirmation Lambda triggers on signup
2. Users automatically assigned to correct Cognito group
3. UserProfile created with correct role
4. Approval status logic works:
   - CUSTOMER → APPROVED
   - VENDOR → PENDING
   - DRIVER → PENDING

### ⚠️ Known Limitations (Will be fixed in Action 2):
1. Vendors/Drivers with PENDING status can currently access their dashboards
2. No "Waiting for Approval" screen shown
3. No UI to block pending users from navigating

### 🚀 Action 2 Will Add:
1. Navigation guard to check UserProfile.status
2. Redirect pending users to approval screen
3. Block all dashboard access until admin approves
4. Admin dashboard to approve/reject users

---

## 🔧 Troubleshooting

### If signup fails:
1. Check Amplify Sandbox is running (`npx ampx sandbox`)
2. Check `amplify_outputs.json` exists and has correct Cognito pool ID
3. Check password meets requirements (8+ chars, uppercase, lowercase, number, special)

### If Lambda doesn't trigger:
1. Go to AWS Console → Cognito → User Pool → Lambda triggers
2. Verify "Post confirmation" trigger is assigned
3. Check Lambda function logs for errors

### If UserProfile not created:
1. Check Lambda logs for errors
2. Lambda currently only LOGS UserProfile (doesn't persist to DynamoDB)
3. This is expected - persistence will be added with Admin Dashboard

### If email verification code doesn't arrive:
1. Check spam folder
2. Check Cognito → User Pool → Messaging → Email settings
3. Verify email address is valid

---

## 📊 Quick Test Checklist

- [ ] Customer signup → Gets APPROVED status
- [ ] Vendor signup → Gets PENDING status
- [ ] Driver signup → Gets PENDING status
- [ ] All users visible in Cognito Users tab
- [ ] All users assigned to correct Cognito group
- [ ] Lambda logs show UserProfile creation
- [ ] DynamoDB has 3 UserProfile records (if persistence added)

---

**Next Steps After Testing:**
1. If tests pass → Ready for Action 2 (Role-Aware Navigation)
2. If tests fail → Debug using troubleshooting section above
3. Take screenshots of DynamoDB table for reference

**Ready?** Let's start with Test A (Customer Signup)!
