# 💅 GlamGo — Client Demo Guide

## 🚀 Quick Start

```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npm run tunnel
```

Share the **QR code** or **tunnel URL** with your client. They open it in the **Expo Go** app:
- **iOS**: Download "Expo Go" from App Store → Scan QR with Camera app
- **Android**: Download "Expo Go" from Play Store → Scan QR within app

---

## 🧪 Test Accounts

| Role     | Email             | Password  | Dashboard Color |
|----------|-------------------|-----------|-----------------|
| Customer | customer@test.com | Test1234! | Purple          |
| Vendor   | vendor@test.com   | Test1234! | Purple          |
| Driver   | driver@test.com   | Test1234! | Green           |

---

## 📱 Full Demo Flow

### 1. **Customer Experience** 👩‍🦱
1. Launch app → Click "**Sign In**" at bottom
2. Tap "**Customer**" quick-fill button (or manually enter credentials)
3. Tap "**Sign In**"
4. **Customer Dashboard** appears with:
   - Welcome message with email
   - "CUSTOMER" role badge
   - "Book a Service" card
   - "My Orders" card
5. Navigate to "Shop" tab → Browse products
6. Tap any product → View details
7. Sign out → Returns to browse page

### 2. **Vendor Experience** 🏪 (FULL INVENTORY MANAGEMENT)
1. Launch app → Click "**Sign In**"
2. Tap "**Vendor**" quick-fill button
3. Tap "**Sign In**"
4. **Vendor Dashboard** appears
5. Navigate to "**Products**" tab:
   - View all your inventory products
   - See stock status (green = in stock, red = out)
   - Inventory counts displayed
6. Tap "**+ Add New Product**":
   - Enter product name (e.g. "Edge Control 4oz")
   - Set price (e.g. 12.99)
   - Select category from horizontal scroll
   - Set inventory count
   - Add description
   - Toggle "Available for Sale" switch
   - Tap "Save Product" → Returns to list with new product
7. Tap "**Edit Product**" on any item:
   - Update name, price, inventory
   - Toggle availability on/off
   - Save changes → List updates in real-time
8. Pull down to refresh inventory
9. Sign out

### 3. **Driver Experience** 🚗
1. Launch app → Click "**Sign In**"
2. Tap "**Driver**" quick-fill button
3. Tap "**Sign In**"
4. **Driver Hub** appears with:
   - "DRIVER" role badge (green)
   - "View Active Deliveries" card
   - "Available" tab for new delivery opportunities
   - "Earnings" tab (placeholder)
5. Sign out

---

## 🔄 Quick Role Switching (For Live Demos)

1. Sign out from any dashboard (button at top or in profile)
2. Returns to **Browse** page
3. Tap "Sign In" button
4. Tap any **Demo Account** quick-fill button (Customer/Vendor/Driver)
5. Tap "Sign In" → Auto-routes to correct dashboard

**Pro Tip**: Keep 3 devices/simulators running with different roles for impressive multi-user demos!

---

## ✨ Key Features to Highlight

### ✅ **Authentication & Security**
- AWS Cognito production authentication
- Role-based access control (3 user types)
- Automatic role routing after login
- Persistent sessions (stays logged in on app restart)

### ✅ **Vendor Inventory Management** (Phase 1 Complete)
- **Full CRUD operations**:
  - ✅ Create new products
  - ✅ Read/view inventory list
  - ✅ Update product details
  - ✅ Delete products (backend ready, UI not shown in demo)
- **Real-time stock tracking**:
  - Inventory counts
  - Availability toggle
  - Visual stock badges
- **Product categorization**:
  - 7 categories (Hair Care, Nails, Makeup, etc.)
  - Horizontal scroll selector
- **Rich product details**:
  - Name, price, description
  - Category, inventory count
  - Availability status

### ✅ **Technical Excellence**
- **Cross-platform**: iOS + Android optimized
- **Backend**: AWS AppSync + DynamoDB (GraphQL API)
- **Offline-ready**: Pull-to-refresh, error handling
- **Modern UI**: Platform-specific shadows, smooth animations
- **Design system**: Consistent colors, spacing, typography

---

## 📊 Current Status

| Feature | Status |
|---------|--------|
| **Auth System** | ✅ Production-ready (AWS Cognito) |
| **Role-based Routing** | ✅ Automatic per role |
| **Customer Dashboard** | ✅ Basic UI complete |
| **Vendor Dashboard** | ✅ Complete with inventory CRUD |
| **Driver Dashboard** | ✅ Basic UI complete |
| **Product Management** | ✅ Full CRUD via AWS AppSync |
| **Browse/Explore** | ✅ Pre-auth marketplace view |
| **Backend API** | ✅ GraphQL with DynamoDB |

---

## 🛠️ What's Next (Phase 2 & 3)

**Coming Soon:**
- 📅 **Customer booking calendar** with real-time availability
- 💳 **Payment processing** (Stripe integration)
- 🚚 **Live delivery tracking** with driver location
- 💬 **In-app chat** (customer ↔ vendor ↔ driver)
- 📸 **Image uploads** for products/stores (S3)
- 📊 **Analytics dashboard** for vendors
- 🔔 **Push notifications** for order updates
- ⭐ **Rating & reviews** system
- 🎯 **Advanced search & filters**

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "No Store Found" error for vendor | This is expected in demo - vendors need a store to add products. In production, stores are created during onboarding. |
| Stuck on loading screen | Check console logs - likely AWS Amplify config issue. Verify `amplify_outputs.json` exists. |
| Can't sign in | Ensure test users were created (run AWS CLI commands from setup docs). Verify internet connection. |
| Products not appearing | Pull down to refresh. Check AWS console that AppSync API is deployed. |
| Expo tunnel not working | Try `npx expo start --tunnel --clear`. Ensure network allows tunnel connections. |

---

## 📞 Support

**Developer**: Daquan McDaniel  
**Tech Stack**: React Native + Expo + AWS Amplify + AppSync + DynamoDB  
**Repository**: GlamGoMobile  

---

## 🎬 Demo Script (30-Second Pitch)

> "GlamGo is a beauty supply delivery marketplace with three user types. Watch as I switch between roles:
> 
> As a **Customer**, I can browse services and products [tap around shop tab].
> 
> As a **Vendor**, I manage my inventory in real-time [show add product, edit, toggle stock].
> 
> As a **Driver**, I see active deliveries to fulfill [show driver hub].
> 
> All powered by AWS with production-grade authentication, GraphQL API, and DynamoDB backend. This is Phase 1 - fully functional inventory management. Phase 2 adds booking, payments, and live tracking."

---

**🎉 Ready to impress your client! This demo shows production-quality code, not prototypes.**
