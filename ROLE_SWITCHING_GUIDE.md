# 🔄 Role Switching Guide

**How to test multiple roles without restarting the app**

---

## ✅ Complete Flow (Updated)

### **Step 1: Sign In**

1. Start at Browse page
2. Scroll down to "Choose Your Experience" section
3. Tap role card (Customer / Vendor / Driver)
4. See preview screen with features
5. Tap "Try as [Role]" button
6. Enter credentials and sign in

### **Step 2: Test Features**

- Explore the role-specific screens
- Navigate between tabs
- Test the workflows
- Validate UI/UX

### **Step 3: Sign Out & Switch** ✨ **NEW!**

1. Navigate to **Profile tab** (bottom right)
2. Scroll down and tap **"Sign Out"** button
3. **Automatically returns to Browse page** 🎉
4. Repeat from Step 1 with different role!

---

## 🎭 Testing All 3 Roles

### Round 1: Vendor

```
Browse → Vendor Card → Preview → Sign In
Test: Products, Orders, Profile
Profile → Sign Out → Browse ✅
```

### Round 2: Customer

```
Browse → Customer Card → Preview → Sign In
Test: Cart, Booking, Profile
Profile → Sign Out → Browse ✅
```

### Round 3: Driver

```
Browse → Driver Card → Preview → Sign In
Test: Available, Active, Profile
Profile → Sign Out → Browse ✅
```

---

## 🚀 Quick Test Credentials

**Copy-paste ready:**

```
Vendor:
vendor@test.com
Test123!

Customer:
customer@test.com
Test123!

Driver:
driver@test.com
Test123!
```

---

## 🎯 What Changed

**Before:**

- ❌ Sign out → Sign-in page → Had to tap "Back to Browse"
- ❌ Extra step to switch roles

**After:**

- ✅ Sign out → Browse page (automatic)
- ✅ Role selection cards immediately visible
- ✅ One-tap to switch to new role preview

---

## 📱 Demo Flow (2-Minute All Roles)

### Speed Run:

1. **Vendor (30 sec):**
   - Browse → Vendor → Sign In
   - Show Products tab (3 mock services)
   - Profile → Sign Out

2. **Customer (30 sec):**
   - Customer Card → Sign In
   - Show Cart (2 items, booking flow)
   - Profile → Sign Out

3. **Driver (30 sec):**
   - Driver Card → Sign In
   - Show Available (3 deliveries)
   - Accept one → Show Active
   - Profile → Sign Out

**Total:** 90 seconds to demo all 3 roles! 🎉

---

## 🎨 Browse Page Features

When you land on Browse page, you'll see:

1. **Search Bar** - Search beauty services
2. **Categories** - Hair, Nails, Skincare, etc.
3. **Featured Products** - Mock marketplace items
4. **Role Selection Cards** ⭐
   - Customer (purple heart icon)
   - Vendor (store icon)
   - Driver (car icon)
5. **"Already have an account?" link** - Direct to sign-in

---

## ✅ Success Checklist

After following this guide, you should be able to:

- [x] Sign in as any role from Browse page
- [x] Test role-specific features
- [x] Sign out with one tap
- [x] Return to Browse page automatically
- [x] Switch to different role in <5 seconds
- [x] Complete 3-role demo in <2 minutes

---

## 💡 Pro Tips

1. **Bookmark Credentials:** Keep the testing guide open with credentials
2. **Clear Flow:** Always sign out before switching (don't force-quit app)
3. **Reload If Needed:** If navigation feels stuck, shake device → Reload
4. **Terminal Logs:** Watch terminal for "✅ Sign-in successful!" messages

---

**Ready to test? Open the app and scroll down on Browse page!** 📱
