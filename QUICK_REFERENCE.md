# 🎯 Quick Reference - Demo + Development

## 🎬 TO DEMO THE APP RIGHT NOW

```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npm run tunnel
# → Open URL in Expo Go on phone or simulator
```

### Test Logins
```
vendor@test.com              (VENDOR, APPROVED - full access)
vendor-pending@test.com      (VENDOR, PENDING - sees pending screen)
driver@test.com              (DRIVER, APPROVED - sees orders)
admin@test.com               (ADMIN - can approve/assign)
user@test.com                (CUSTOMER - can browse)

Password: anything (mock mode)
```

### Demo Flow (5 min)
1. Sign in as `vendor-pending@test.com`
   - See pending approval screen ✅
2. Sign in as `admin@test.com`
   - Tap admin dashboard
   - Approve the pending vendor ✅
3. Sign in as `driver@test.com`
   - See assigned orders
   - Update delivery status ✅

---

## 🏗️ TO START ADMIN DEV (Week 1)

### Day 1: Project Setup
```bash
npm create vite@latest admin -- --template react-ts
cd admin && npm install
npm install @aws-amplify/ui-react aws-amplify react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

**Files to Create (See ADMIN_DRIVER_IMPLEMENTATION_PLAN.md for details):**
- `src/App.tsx` - Router
- `src/pages/Login.tsx` - Sign in
- `src/services/auth.ts` - Cognito
- `vite.config.ts` - Config

### Day 2-3: Authentication + Orders List
- Protected route component
- Admin login page
- Orders list with filters

### Day 4: Driver Assignment
- Add "Assign Driver" button
- Driver selector dropdown
- Update order status to "ASSIGNED"

### Day 5: User Approvals
- Pending users tab
- Approve/Suspend buttons
- Update user status mutations

---

## 📱 TO TIGHTEN DRIVER APP (Week 2)

### Day 6: Real Orders
Edit `app/(driver)/orders.tsx`:
```typescript
// Replace mock data with:
const driverId = await getCurrentDriverId();
const orders = await client.models.Order.list({
  filter: { driverId: { eq: driverId } }
});
```

### Day 7: Real Status Updates
Edit `app/(driver)/order-detail.tsx`:
```typescript
// Wire buttons to mutations:
await client.models.Order.update({
  id: orderId,
  status: "PICKED_UP" // or "DELIVERED"
});
```

### Day 8-10: Polish + Testing + Deploy
- Real-time updates (subscriptions)
- Error handling
- UI polish
- Testing
- Deployment

---

## 📁 KEY FILES

**Mock Data (Created Today):**
- `services/mockData.ts` - All fake data
- `services/apiMode.ts` - Real vs mock detection
- `services/userProfileHybrid.ts` - Hybrid service

**Documentation (Created Today):**
- `DEMO_MODE_GUIDE.md` - How to run demo
- `ADMIN_DRIVER_IMPLEMENTATION_PLAN.md` - Full roadmap
- `DEMO_AND_PLAN_SUMMARY.md` - Overview

**Existing Backend:**
- `amplify/data/resource.ts` - GraphQL schema
- `amplify/auth/resource.ts` - Cognito setup
- `amplify_outputs.json` - Live config

---

## 🔄 AUTO-SWITCHING (Mock → Real)

**Currently:** Mock mode active (because `EXPO_PUBLIC_API_URL` not set)

**To Switch to Real API:**
```bash
# 1. Deploy backend
npx amplify deploy

# 2. Get API URL from output
# Should be something like:
# https://your-id.us-east-1.amazonaws.com/graphql

# 3. Create .env.local
echo "EXPO_PUBLIC_API_URL=https://your-id.us-east-1.amazonaws.com" > .env.local

# 4. Restart app
npm run tunnel

# App now uses REAL API instead of mock data!
```

---

## ✅ BEFORE DEMOING

Run this to verify everything is ready:
```bash
bash check-demo-ready.sh
```

Should show:
- ✓ Node.js installed
- ✓ npm installed
- ✓ Mock data files exist
- ✓ Documentation files exist
- ✓ Amplify config loaded

---

## 📊 ARCHITECTURE DECISION

**Where should admin app live?**

| Option | Pros | Cons |
|--------|------|------|
| **Same repo** `/admin` | Shared backend, types, CI/CD | Slightly bigger repo |
| **Separate repo** | Clean separation | Duplicate config, harder to sync |

**RECOMMENDATION:** Same repo (`/admin` folder)

---

## 🎯 TIMELINE

### Today (March 14)
- ✅ Demo with mock data to stakeholders
- ⏳ Collect feedback

### Week 1 (March 17-21)
- [ ] Build admin dashboard
- [ ] Wire to AppSync
- [ ] Manual driver assignment working

### Week 2 (March 24-28)
- [ ] Tighten driver app
- [ ] Real AppSync queries
- [ ] Real-time updates

### Before Week 8 (April 11)
- [ ] Deploy everything
- [ ] Full testing
- [ ] Handoff ready

---

## 🚀 COMMANDS CHEATSHEET

```bash
# Start demo (mock data)
npm run tunnel

# Check demo ready
bash check-demo-ready.sh

# Install dependencies
npm install

# Deploy backend (when ready)
npx amplify deploy

# Clean up
rm -rf dist node_modules .expo
npm install

# Run on simulator
npm run ios    # macOS
npm run android

# Build for production
npm run build
eas build
```

---

## 📞 GETTING HELP

1. **Demo Issues:** See `DEMO_MODE_GUIDE.md` troubleshooting
2. **Development:** See `ADMIN_DRIVER_IMPLEMENTATION_PLAN.md` details
3. **Questions:** See `DEMO_AND_PLAN_SUMMARY.md` decisions

---

## ✨ WHAT'S READY TODAY

✅ Full app with mock data - no backend needed  
✅ All roles testable  
✅ Approval workflow  
✅ RBAC guards  
✅ Beautiful UI  

**Ready to show stakeholders!** 🎉
