# 🎬 DEMO 2_TEST - Complete Setup & Submission Guide

**Date Created**: March 14, 2026  
**Purpose**: Deploy admin portal, vendor portal, and mobile app for client demo  
**Status**: Ready to commit and submit

---

## 📋 TABLE OF CONTENTS

1. [Quick Summary](#quick-summary)
2. [Pre-Submission Checklist](#pre-submission-checklist)
3. [Step 1: Commit Changes to Git](#step-1-commit-changes-to-git)
4. [Step 2: Verify All Services Running](#step-2-verify-all-services-running)
5. [Step 3: Test All Three Apps](#step-3-test-all-three-apps)
6. [Step 4: Open Demo Tomorrow](#step-4-open-demo-tomorrow)
7. [Demo Flow for Client](#demo-flow-for-client)
8. [Credentials Reference](#credentials-reference)
9. [Troubleshooting](#troubleshooting)

---

## 📊 QUICK SUMMARY

**What You've Built This Session:**

✅ **Admin Web Portal** (React + Vite, port 5173)
- User management (approve vendors, drivers, customers)
- Order management with driver assignment
- Driver fleet tracking
- Real-time dashboard stats
- 11 mock users, 4 orders, 2 drivers

✅ **Vendor Web Portal** (React + Vite, port 5174)
- Complete folder structure (25 files)
- Product catalog management
- Order fulfillment center
- Analytics dashboard
- Vendor profile management
- 4 mock products, 4 orders, 30-day analytics

✅ **Mobile App** (Expo React Native)
- Customer dashboard with mock orders
- Driver available orders ("Deliveries Near You")
- Driver active deliveries tracking
- Public browse screen (no login required)
- Mock data integration

---

## ✅ PRE-SUBMISSION CHECKLIST

Before submitting, verify:

- [ ] All npm packages installed for admin, vendor, mobile
- [ ] Admin portal runs without errors on localhost:5173
- [ ] Vendor portal runs without errors on localhost:5174
- [ ] Mobile app runs via Expo tunnel
- [ ] No console errors in any app
- [ ] Git status is clean (all files committed or staged)
- [ ] `.env` files are properly configured

---

## 🔄 STEP 1: COMMIT CHANGES TO GIT

### 1.1 Check Git Status
```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
git status
```

**Expected Output**: Shows modified files and new vendor folder

### 1.2 Add All Changes
```bash
git add .
```

### 1.3 Verify Staging
```bash
git status
```

**Expected**: All changes should show as "Changes to be committed"

### 1.4 Commit with Message
```bash
git commit -m "DEMO 2: Complete admin + vendor portals, ready for client demo

- ✅ Admin Web Portal (Week 1-2 complete)
  - User management (11 mock users)
  - Order management (4 mock orders)
  - Driver fleet tracking (2 mock drivers)
  - Dashboard with real-time stats
  - Protected routes with localStorage auth
  
- ✅ Vendor Web Portal (25 files created)
  - Product catalog (4 mock products)
  - Order fulfillment center (4 mock orders)
  - Analytics (30-day data)
  - Vendor profile management
  - Same architecture as admin portal
  
- ✅ Mobile App Updates
  - Customer + Driver flows working
  - Mock data integrated
  - Cognito authentication ready
  
- ✅ Configuration
  - Vite + Tailwind for both portals
  - TypeScript strict mode
  - GlamGo color palette applied
  - Environment variables configured

Ready to deploy to staging and connect to real backend."
```

### 1.5 Verify Commit
```bash
git log --oneline -5
```

**Expected**: Your commit message appears at the top

---

## ⚙️ STEP 2: VERIFY ALL SERVICES RUNNING

### 2.1 Terminal 1 - Mobile App (Expo Tunnel)
```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npm run tunnel
```

**Expected Output**:
```
iOS:   press i
Android: press a
Reset cache: press c
Quit: press q
```

**Keep this running**

### 2.2 Terminal 2 - Admin Portal
```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile/admin
npm run dev
```

**Expected Output**:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Keep this running**

### 2.3 Terminal 3 - Vendor Portal
```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile/vendor
npm install  # Only needed first time
npm run dev
```

**Expected Output**:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5174/
  ➜  press h to show help
```

**Keep this running**

### 2.4 Verify All Ports Open
```bash
# In a new terminal
lsof -i :5173  # Admin portal
lsof -i :5174  # Vendor portal
lsof -i :19000 # Expo tunnel
```

**Expected**: All three ports show as LISTEN

---

## 🧪 STEP 3: TEST ALL THREE APPS

### 3.1 Test Admin Portal (localhost:5173)

**Visit**: http://localhost:5173

| Test | Expected Result |
|------|---|
| Login page loads | Green checkmark icon, login form visible |
| Email field | admin@test.com (pre-filled) |
| Password field | Any password accepted |
| Submit login | Redirects to dashboard |
| Dashboard loads | 4 stat cards visible (pending users, vendors, etc.) |
| Users tab | Filter tabs working (Pending, Vendor, Driver, Customer, All) |
| Click Pending | Shows 3+ pending users |
| User card | Shows name, email, phone, approve button |
| Click approve | Button changes, user appears as approved |
| Orders tab | Shows 4 orders with status |
| Assign driver | Dropdown shows available drivers |
| Drivers tab | Shows 2 drivers with ratings |
| Sign out | Returns to login page |

**Troubleshoot If Error**:
- Clear browser cache: `Cmd + Shift + R`
- Check console: `F12 → Console tab`
- Restart: `Ctrl + C` in admin terminal, then `npm run dev`

### 3.2 Test Vendor Portal (localhost:5174)

**Visit**: http://localhost:5174/login

| Test | Expected Result |
|------|---|
| Login page loads | GlamGo Vendor logo, login form |
| Email field | vendor@glamgo.com (pre-filled) |
| Password field | Any password accepted |
| Submit login | Redirects to dashboard |
| Dashboard loads | Stat cards: Active Products, Pending Orders, etc. |
| Products tab | 4 products displayed (Active, Draft, etc.) |
| Filter tabs | All, Active, Draft, Inactive, Discontinued |
| Product card | Shows image, name, price, stock, rating |
| Orders tab | Shows 4 orders |
| Order card | Customer name, items, total, status dropdown |
| Analytics tab | 30-day data table with views, clicks, revenue |
| Profile tab | Vendor info, logo, business description |
| Sign out | Returns to login page |

**Troubleshoot If Error**:
- Same as admin: cache clear, restart dev server

### 3.3 Test Mobile App (Expo Tunnel)

**Open QR Code**: Press `i` or `a` in Expo terminal to see QR

| Test | Expected Result |
|------|---|
| App loads | Browse screen visible |
| Search bar | Can type product names |
| Search "Hair" | Shows matching products |
| Category filter | Filters work (Hair Care, Makeup, etc.) |
| Tap product | Goes to product detail page |
| Back button | Returns to browse |
| Sign in button | Goes to login screen |
| **Test Customer**: customer@test.com | |
| After login | Redirects to Customer Shop |
| Products visible | Shows beauty supplies (not services) |
| Add to cart | Cart updates |
| View cart | Shows mock order |
| **Test Driver**: driver@test.com | |
| After login | Redirects to Driver Dashboard |
| Available Orders | Click tab → shows "Deliveries Near You" |
| Order list | 3+ mock deliveries visible |
| Tap order | Shows pickup, delivery, items, fee |
| Accept button | Can accept order (triggers alert) |
| Active tab | Shows in-progress delivery |
| Earnings tab | Shows earnings stats |

---

## 🔄 STEP 4: OPEN DEMO TOMORROW

### 4.1 Morning - Reopen All Services

**In 3 separate terminals**, run these commands in order:

**Terminal 1 (Mobile)**:
```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npm run tunnel
```

**Terminal 2 (Admin)**:
```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile/admin
npm run dev
```

**Terminal 3 (Vendor)**:
```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile/vendor
npm run dev
```

### 4.2 Open Browser Windows

**Window 1 - Mobile**:
- Expo terminal: Press `i` (iOS) or `a` (Android)
- Scan QR with phone
- Keep QR code visible for client

**Window 2 - Admin Portal**:
```
http://localhost:5173
```

**Window 3 - Vendor Portal**:
```
http://localhost:5174
```

### 4.3 Pre-Demo Verification (5 min)

Run this script to verify everything is working:

```bash
# Save this as ~/verify-demo.sh
#!/bin/bash

echo "🔍 Checking Demo 2 Services..."
echo ""

# Check ports
echo "1️⃣  Checking ports..."
lsof -i :5173 > /dev/null && echo "✅ Admin portal (5173)" || echo "❌ Admin portal (5173) - NOT RUNNING"
lsof -i :5174 > /dev/null && echo "✅ Vendor portal (5174)" || echo "❌ Vendor portal (5174) - NOT RUNNING"
lsof -i :19000 > /dev/null && echo "✅ Expo tunnel (19000)" || echo "❌ Expo tunnel (19000) - NOT RUNNING"

echo ""
echo "2️⃣  Quick connectivity test..."

# Admin portal
if curl -s http://localhost:5173 > /dev/null; then
  echo "✅ Admin portal responding"
else
  echo "❌ Admin portal not responding"
fi

# Vendor portal
if curl -s http://localhost:5174 > /dev/null; then
  echo "✅ Vendor portal responding"
else
  echo "❌ Vendor portal not responding"
fi

echo ""
echo "3️⃣  Ready for demo!"
echo "   📱 Mobile: Scan Expo QR"
echo "   💼 Admin:  http://localhost:5173"
echo "   🏪 Vendor: http://localhost:5174"
```

**Run it**:
```bash
chmod +x ~/verify-demo.sh
~/verify-demo.sh
```

---

## 🎬 DEMO FLOW FOR CLIENT

**Total Time**: 15-20 minutes

### Part 1: Mobile App (8 minutes)

**"Let me show you the customer and driver experience on mobile..."**

1. **Public Browse** (2 min)
   - Show search functionality
   - Filter by category
   - "No login required - anyone can browse"
   - Tap product → show detail page

2. **Customer Flow** (3 min)
   - Login: customer@test.com
   - "They land in the shop"
   - Add product to cart
   - Show cart page with mock order
   - "Checkout → receive delivery"

3. **Driver Flow** (3 min)
   - Sign out, login: driver@test.com
   - "Driver sees their dashboard"
   - Click "Available Orders" tab
   - Show "Deliveries Near You" with 3 orders
   - Tap order → show pickup + delivery details
   - "They can accept orders and earn"

### Part 2: Admin Web Portal (5 minutes)

**"Now let me show you the admin backend..."**

1. **Login & Dashboard** (1 min)
   - Login: admin@test.com / any password
   - Show dashboard stats
   - "Real-time overview of business"

2. **User Management** (2 min)
   - Go to Users tab
   - Filter: Pending
   - "Show a pending vendor"
   - Click approve
   - "Instant approval - no backend needed yet, using mock data"

3. **Order Management** (2 min)
   - Go to Orders tab
   - Show pending order
   - Assign driver from dropdown
   - "Admin controls the entire order flow"

### Part 3: Vendor Web Portal (3 minutes)

**"Finally, let me show you the vendor side..."**

1. **Login** (1 min)
   - Login: vendor@glamgo.com / any password
   - Show dashboard

2. **Products** (1 min)
   - Click Products tab
   - Show 4 mock products
   - "Vendors manage their own catalog"

3. **Orders** (1 min)
   - Click Orders tab
   - Show order fulfillment
   - "Separate portal for vendor to manage their business"

### Closing Statement

> "So we have a complete 3-app platform:
> - **Mobile**: Customers browse and buy, drivers earn money
> - **Admin Web**: Your team manages everything
> - **Vendor Web**: Vendors run their own shops
> 
> Everything is working with mock data. Next week we'll connect it to real AWS backend and you'll be able to go live."

---

## 🔐 CREDENTIALS REFERENCE

### Admin Portal
```
URL: http://localhost:5173
Email: admin@test.com
Password: (any password - mock auth)
Role: ADMIN
```

### Vendor Portal
```
URL: http://localhost:5174
Email: vendor@glamgo.com
Password: (any password - mock auth)
Role: VENDOR
```

### Mobile App - Customer
```
Email: customer@test.com
Password: Test123!
Role: CUSTOMER
```

### Mobile App - Driver
```
Email: driver@test.com
Password: Test123!
Role: DRIVER
```

### Real Cognito (for future reference)
```
User Pool: us-east-1_ZMKLKcE8r
Client ID: 7gn4qd0rl40ddb132l7g72c2sl
Region: us-east-1
Groups: CUSTOMER, VENDOR, DRIVER, ADMIN
```

---

## 🆘 TROUBLESHOOTING

### Admin Portal Won't Start

**Error**: `Module not found`

**Fix**:
```bash
cd admin
rm -rf node_modules
npm install
npm run dev
```

### Vendor Portal Won't Start

**Error**: `Port 5174 already in use`

**Fix**:
```bash
# Kill process using port 5174
lsof -ti:5174 | xargs kill -9

# Restart
cd vendor
npm run dev
```

### Mobile App Crashes

**Error**: `Bundle error`

**Fix**:
```bash
# In Expo terminal
press c  # Clear cache
press r  # Reload
```

### Users.tsx Still Showing Errors

**Error**: Syntax errors in browser

**Fix**:
```bash
cd admin
npm run dev
# Then press: r to reload in terminal
```

**Browser**: Clear cache with Cmd+Shift+R

### Can't Access Localhost Ports

**Error**: `Connection refused`

**Check if running**:
```bash
# Terminal should still be showing:
# "ready in XXX ms"
# "Local: http://localhost:XXXX"

# If not, restart all three services
```

### All Services Running but Pages Blank

**Error**: Pages load but no content

**Fix**:
1. Check browser console: F12 → Console
2. Look for API/network errors
3. Clear browser cache: Cmd+Shift+R
4. Reload page: Cmd+R

---

## 📁 FILE STRUCTURE REFERENCE

```
GlamGoMobile/
├── admin/                          (Week 1-2 complete)
│   ├── src/
│   │   ├── components/            (6 components)
│   │   ├── hooks/                 (4 hooks)
│   │   ├── pages/                 (5 pages)
│   │   ├── services/              (mock data)
│   │   ├── types/                 (interfaces)
│   │   └── App.tsx                (router)
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── vendor/                         (Week 1-2 complete)
│   ├── src/
│   │   ├── components/            (5 components)
│   │   ├── hooks/                 (6 hooks)
│   │   ├── pages/                 (6 pages)
│   │   ├── services/              (mock data)
│   │   ├── types/                 (interfaces)
│   │   └── App.tsx                (router)
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── app/                            (Mobile - Expo)
│   ├── (customer)/                (customer screens)
│   ├── (driver)/                  (driver screens)
│   ├── (vendor)/                  (vendor screens)
│   ├── (admin)/                   (admin screens)
│   ├── browse.tsx                 (public)
│   ├── product-detail.tsx
│   └── _layout.tsx
│
└── DEMO_2_TEST.md                 (this file)
```

---

## ✨ NEXT STEPS (Week 3+)

After demo is approved, next phase:

1. **Connect Real Cognito** (2-3 hours)
   - Replace mock auth with real Cognito
   - Test with real user pool groups

2. **Wire AppSync** (3-4 hours)
   - Replace mock data with GraphQL queries
   - Connect to DynamoDB
   - Test full CRUD operations

3. **Deploy to Staging** (2-3 hours)
   - Admin → Amplify or Vercel
   - Vendor → Amplify or Vercel
   - Mobile → EAS Build

4. **E2E Testing** (1-2 hours)
   - Full user journey testing
   - All role scenarios

5. **Production Deploy** (1-2 hours)
   - Final configuration
   - Go live

---

## 📝 NOTES

- All apps use **mock data** with localStorage auth
- No backend calls yet - everything is local
- Perfect for demo and client feedback
- Easy to upgrade to real backend later

---

## ✅ FINAL CHECKLIST BEFORE DEMO

- [ ] Commit all changes: `git add . && git commit -m "DEMO 2: Complete portals"`
- [ ] Admin portal: `npm run dev` ✅
- [ ] Vendor portal: `npm run dev` ✅
- [ ] Mobile app: `npm run tunnel` ✅
- [ ] All 3 ports responding
- [ ] Test each role login
- [ ] Test at least 1 action per app
- [ ] Close demo, document any issues
- [ ] Ready for morning presentation

---

**Document Created**: March 14, 2026  
**For**: GlamGo Platform Demo 2  
**Status**: 🟢 Ready to Submit  

---

**Next Action**: Morning, run the 3 terminal commands in STEP 4.1, then follow DEMO FLOW FOR CLIENT section. ✨
