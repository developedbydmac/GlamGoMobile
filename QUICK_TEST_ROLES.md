# 🎯 Quick Test Guide - Role-Based Navigation

## Test Accounts

### Customer Account
```
Email: [Create new customer]
Role: CUSTOMER
Screens: Shop, Cart, Orders, Profile
Color: Purple (#4A2C82)
```

### Vendor Account ✅
```
Email: daquanmac@gmail.com
Role: VENDOR
Screens: Dashboard, Products, Orders, Profile
Color: Gold (#D4AF37)
```

### Driver Account ✅
```
Email: dmcda28@wgu.edu
Role: DRIVER
Screens: Available, Active, Earnings, Profile
Color: Blue (#2196F3)
```

---

## Quick Test Steps

1. **Start Expo:**
   ```bash
   kill 16401  # Kill old process
   npx expo start --tunnel
   ```

2. **Sign In with Each Role:**
   - Customer → Should see Shop tab first
   - Vendor → Should see Dashboard tab first
   - Driver → Should see Available tab first

3. **Verify Tabs:**
   - Each role sees 4 different tabs
   - Colors match role theme
   - Icons are role-appropriate
   - Sign out works from Profile

---

## Expected Behavior

### ✅ CUSTOMER sees:
- 🛍️ Shop (purple icon)
- 🛒 Cart (purple icon)
- 📦 Orders (purple icon)
- 👤 Profile (purple icon)

### ✅ VENDOR sees:
- 📊 Dashboard (gold icon)
- 📦 Products (gold icon)
- 📋 Orders (gold icon)
- 👤 Profile (gold icon)

### ✅ DRIVER sees:
- 🗺️ Available (blue icon)
- 📍 Active (blue icon)
- 💰 Earnings (blue icon)
- 👤 Profile (blue icon)

---

## If Something's Wrong

### User sees wrong tabs:
```bash
# Check console for role value
# Should see: "✅ User role: CUSTOMER/VENDOR/DRIVER"
```

### Role is null/undefined:
```bash
# Verify custom:role attribute exists in Cognito
aws cognito-idp admin-get-user \
  --user-pool-id us-east-1_ZMKLKcE8r \
  --username [email]
```

### Navigation doesn't work:
```bash
# Check expo output for errors
# Look for route not found errors
```

---

**Status:** ✅ Ready to Test  
**Est. Time:** 5 min per role = 15 min total
