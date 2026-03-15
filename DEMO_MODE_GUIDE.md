# 🎬 GLAMGO Demo Mode Setup & Testing Guide

## ✅ What's Ready for Demo NOW

You have **full UI/UX working with mock data** - no backend deployment needed for initial demo:

- ✅ Sign-in with test credentials
- ✅ Browse products (mock data)
- ✅ Add to cart
- ✅ Pending approval flow
- ✅ Admin dashboard with approval workflow
- ✅ Driver order assignment
- ✅ RBAC navigation guards

---

## 🚀 Quick Start Demo (2 minutes)

### 1. Start the App in Mock Mode

```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile

# Start Expo tunnel (generates QR code)
npm run tunnel
```

**Expected Output:**
```
›   Tunnel ready. Listening on URL: exp://xxxxx.ngrok.io

📱 Open this URL in Expo Go or browser:
exp://xxxxx.ngrok.io
```

### 2. Test Credentials (All Mock Data)

Use these email/password combos to test different roles:

| Email | Password | Role | Status | Notes |
|-------|----------|------|--------|-------|
| `vendor@test.com` | `password` | VENDOR | APPROVED | Can access vendor dashboard |
| `vendor-pending@test.com` | `password` | VENDOR | PENDING | Redirects to pending-approval screen |
| `driver@test.com` | `password` | DRIVER | APPROVED | Can view assigned orders |
| `admin@test.com` | `password` | ADMIN | APPROVED | Access admin dashboard |
| `user@test.com` | `password` | CUSTOMER | APPROVED | Can browse & buy |

**Note:** Any password works in mock mode

---

## 🧪 Demo Test Flows

### Flow 1: Browse as Customer
```
1. Sign in as: user@test.com
2. Tap "Browse" tab
3. See mock products (Makeup Set, Hair Serum, etc.)
4. Tap product → see details
5. Add to cart
6. Tap cart icon → see checkout
```

### Flow 2: Pending Approval (Vendor)
```
1. Sign in as: vendor-pending@test.com
2. App redirects to: /pending-approval
3. See "⏳ Application Under Review" message
4. See "Estimated wait time: 1-2 business days"
5. Tap "Sign Out" and try another account
```

### Flow 3: Admin Approval Workflow
```
1. Sign in as: admin@test.com
2. Navigate to: /admin/dashboard
3. See "Pending Users" section with vendors
4. Tap "Approve" on pending vendor
5. Confirm in dialog
6. See success message
7. Vendor removed from pending list

// Back as vendor:
8. Sign in as: vendor-pending@test.com
9. Now has access to dashboard (status auto-updated)
```

### Flow 4: Driver Orders
```
1. Sign in as: driver@test.com
2. Tap "Orders" tab
3. See list of orders assigned to this driver
4. Tap order → see details (mock data: Makeup Set order)
5. Tap "Picked Up" button
6. See status change to IN_TRANSIT
7. Tap "Delivered" button
8. See status change to DELIVERED
```

### Flow 5: Vendor Dashboard
```
1. Sign in as: vendor@test.com
2. Tap "My Store" tab
3. See mock products owned by this vendor
4. Tap product → edit details
5. See "Add Product" button
6. See mock orders from customers
```

---

## 🔄 Switching from Mock to Real Backend

When your backend is deployed, the app **automatically switches** to real API calls:

### Option A: Deploy Backend Later
```bash
# Currently running with mock data
npm run tunnel

# Later, when backend is ready:
# 1. Deploy backend
# 2. Get API_URL from deployment output
# 3. Create .env.local with:
EXPO_PUBLIC_API_URL=https://your-api-gateway-url.amazonaws.com

# 4. Restart the app
npm run tunnel

# ✅ App now uses real backend instead of mock data
```

### Option B: Keep Mock Mode for Demo
```bash
# If you just want to demo the UI/UX without backend:
# Leave EXPO_PUBLIC_API_URL unset
# App stays in mock mode indefinitely
```

---

## 📱 Running on Actual Devices

### iOS/Android Simulator
```bash
# Make sure simulator is running, then:
npm run tunnel
# Scan QR code or paste URL into Expo Go
```

### Real Device
```bash
1. Install "Expo Go" app from App Store or Play Store
2. Run: npm run tunnel
3. Scan QR code with Expo Go
4. App opens on your device
```

---

## 🎨 What You'll See in Demo

### Mock Data Provided:
- **5 Products**: Luxury Makeup Set, Hair Serum, Nail Polish, Skincare Bundle, Lip Balm Pack
- **3 Orders**: Some DELIVERED, some PENDING (driver-ready)
- **3 Drivers**: John, Maria, Alex with mock locations & ratings
- **5 Users**: Vendors, drivers, admin with different statuses

### UI Features Working:
- ✅ Beautiful gradient buttons (matching design system)
- ✅ Tab navigation (Browse, Cart, Orders, My Store, Admin)
- ✅ Approval workflow with visual feedback
- ✅ Role-based routing (RBAC guards)
- ✅ Toast notifications for actions
- ✅ Loading states & error handling
- ✅ Admin dashboard with approval buttons
- ✅ Order assignment workflow

---

## 🐛 Troubleshooting Demo

### Problem: "API URL is undefined"
**Solution:** This is expected! Mock mode is active.
- Check console logs for: `📱 API Mode: MOCK`
- This means the app is using mock data ✅

### Problem: "Sign in not working"
**Solution:** 
- Use any of the test credentials above
- Any password works in mock mode
- Check that Amplify is configured (should auto-detect mock mode)

### Problem: "App crashes on approval"
**Solution:**
- Check that `userProfileHybrid.ts` is installed
- This file enables mock mode support
- Restart the app with: `npm run tunnel`

### Problem: "Can't see mock products"
**Solution:**
- Verify `mockData.ts` exists in `/services`
- Check console for: `✅ API Mode: MOCK`
- Restart tunnel: `Ctrl+C` then `npm run tunnel`

---

## 📊 Demo Checkpoint Checklist

Before showing to stakeholders:

- [ ] App starts without errors
- [ ] Can sign in with test credentials
- [ ] Browse tab shows 5 mock products
- [ ] Product details page loads
- [ ] Add to cart works
- [ ] Admin can see pending users
- [ ] Admin approval updates status
- [ ] Vendor sees pending screen when PENDING status
- [ ] Driver can view assigned orders
- [ ] Delivery status updates work
- [ ] Navigation guards prevent unauthorized access
- [ ] Toast notifications appear on actions
- [ ] Loading states are smooth
- [ ] No console errors (check via React Native debugger)

---

## 🎯 Next Steps After Demo

### Immediate (After Demo)
1. Collect feedback on UI/UX from demo
2. Note any bugs or desired changes
3. Update design based on feedback

### Then: Switch to Real Backend
```bash
# Deploy backend (Week 1-2)
npx amplify deploy

# Get API endpoint from deployment
# Set EXPO_PUBLIC_API_URL environment variable
# Restart app - should use real backend

# Run live testing with real data
```

### Then: Finish Admin Panel (Week 2)
- Admin web dashboard (separate React app or Next.js)
- User management interface
- Vendor approval system
- Order management

### Then: Driver App Tightening (Week 2)
- Replace mock orders with real GraphQL queries
- Wire delivery status updates to real mutations
- Add real-time order assignment via WebSockets
- Geolocation integration for driver tracking

---

## 🎁 Bonus: Manual Demo Testing

If you want to manually test with your Cognito users:

```bash
# 1. Sign in with a real Cognito user
npm run tunnel
# Scan QR code and sign in with real credentials

# 2. If user exists in mock data, will behave same as mock
# 3. If user is new, will try AppSync - but that won't work
#    until backend is deployed

# 4. To add your test user to mock data:
# Edit services/mockData.ts:
// Add your email to MOCK_USERS array

# 5. Restart: Ctrl+C then npm run tunnel
```

---

## 💡 Pro Tips for Demo

- **Slow down the interactions** - Let people see the UI transitions
- **Explain the approval workflow** - Show pending → approved flow
- **Highlight RBAC** - Switch between admin/vendor/driver roles
- **Show the design system** - Point out the gradient buttons, consistent spacing
- **Mention mock mode** - Explain this is pre-backend demo UX
- **Collect feedback** - Ask which features are most important

---

## 📞 Support

If something breaks during demo:
1. Check console for error messages
2. Verify all mock files exist: `services/mockData.ts`, `services/apiMode.ts`, `services/userProfileHybrid.ts`
3. Restart tunnel: `Ctrl+C` then `npm run tunnel`
4. Clear Expo cache: `expo-cli clear --project`
5. Hard reset: `rm -rf node_modules .next .expo && npm install && npm run tunnel`

---

**Demo Mode Status:** ✅ Ready to Go! 🚀
