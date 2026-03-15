# 🏗️ GLAMGO Admin Panel + Driver App Tightening Plan
## Week 1-2 Implementation Roadmap

**Contract Deadline:** Week 8 - "All apps functional"
**Next Deliverables:** Admin web panel + Driver mobile tightening
**Timeline:** 1-2 weeks (March 14-28, 2026)

---

## 📋 Executive Summary

You currently have:
- ✅ Customer app (browse, cart, checkout)
- ✅ Vendor app (create products, manage orders)
- ❌ **Admin app:** Logic exists, UI missing
- ⚠️ **Driver app:** Mock data only, not wired to real backend

**Goal:**
- Build minimal admin web dashboard (login, orders list, manual driver assignment, user approvals)
- Tighten driver mobile app (real GraphQL queries, real delivery status updates)
- Manual driver dispatch (admin assigns driver to order, driver sees it immediately)

---

## 🎯 Part 1: Admin Web Dashboard Architecture

### Decision: Monorepo vs. Separate Repo?

**RECOMMENDATION: Monorepo style (add `/admin` folder to this repo)**

**Why:**
- Shared Cognito + AppSync backend (single `amplify_outputs.json`)
- Simpler deployment (same PR pipeline)
- Shared types/interfaces between mobile & web
- Least friction for Week 8 handoff
- Can split later if needed

**Structure:**
```
GlamGoMobile/
├── app/                      (Mobile app - Expo)
│   ├── (vendor)/
│   ├── (driver)/
│   ├── (customer)/
│   ├── (admin)/              (⚠️ Currently just auth)
│   └── ...
├── admin/                     (✨ NEW - Web dashboard)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.local
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── vite.config.ts        (Fast dev server)
├── amplify/                  (Shared backend)
│   ├── auth/
│   ├── data/
│   └── functions/
├── services/                 (Shared utilities)
│   ├── apiMode.ts
│   ├── mockData.ts
│   └── ...
└── types/                    (Shared types)
    └── user.ts
```

**Tech Stack for Admin:**
- **Framework:** React 18 + TypeScript
- **Build:** Vite (fast, simple)
- **UI:** TailwindCSS + custom components (share design system)
- **Data:** AWS AppSync (GraphQL client auto-generated from backend)
- **Auth:** AWS Amplify (Cognito)
- **State:** React Context or Zustand (minimal)

---

## 🗂️ Part 2: Folder Structure & File Plan

### Admin App Structure (Complete)

```
admin/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx               (Logo, user menu, sign out)
│   │   ├── Sidebar.tsx              (Nav: Orders, Users, Drivers, Settings)
│   │   ├── OrderCard.tsx            (Mini display of one order)
│   │   ├── DriverSelect.tsx         (Dropdown to pick driver for assignment)
│   │   ├── StatusBadge.tsx          (PENDING, APPROVED, SUSPENDED badges)
│   │   ├── LoadingSpinner.tsx       (Reusable loader)
│   │   └── ProtectedRoute.tsx       (Admin role check)
│   │
│   ├── pages/
│   │   ├── Login.tsx                (Cognito sign-in form)
│   │   ├── Dashboard.tsx            (Home/overview)
│   │   ├── Orders.tsx               (Orders list + filters + driver assignment)
│   │   ├── OrderDetail.tsx          (Single order view + actions)
│   │   ├── Users.tsx                (Vendors/Drivers list)
│   │   ├── UserDetail.tsx           (User profile + approval toggle)
│   │   ├── Drivers.tsx              (Active drivers list + status)
│   │   └── Settings.tsx             (Admin settings, if needed)
│   │
│   ├── hooks/
│   │   ├── useAuth.ts               (Cognito session)
│   │   ├── useOrders.ts             (Fetch + cache orders)
│   │   ├── useUsers.ts              (Fetch + filter users)
│   │   └── useDrivers.ts            (Fetch drivers)
│   │
│   ├── services/
│   │   ├── auth.ts                  (Sign in/out, check admin role)
│   │   ├── orders.ts                (GraphQL queries for orders)
│   │   ├── users.ts                 (List/filter/approve users)
│   │   ├── drivers.ts               (Driver management)
│   │   └── graphql.ts               (Apollo client setup)
│   │
│   ├── types/
│   │   ├── index.ts                 (Shared with mobile types/user.ts)
│   │   └── admin.ts                 (Admin-specific: filters, sorting)
│   │
│   ├── App.tsx                      (Main app routing)
│   ├── main.tsx                     (Entry point)
│   └── index.css                    (TailwindCSS + custom styles)
│
├── public/
│   └── favicon.ico
│
├── .env.local                       (Local development)
├── .env.production                  (Production - with VITE_ prefix)
├── vite.config.ts                   (Vite configuration)
├── tsconfig.json                    (TypeScript config)
├── package.json                     (Dependencies)
└── README.md                        (Admin setup guide)
```

---

## 🔌 Part 3: GraphQL Queries & Mutations Needed

Based on your existing GraphQL schema, here's what admin needs:

### 1. Orders Queries

```graphql
# Get all orders (admin can see everything)
query ListOrders(
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      vendorId
      driverId
      status
      totalAmount
      createdAt
      updatedAt
      items {
        productId
        name
        quantity
        price
      }
    }
    nextToken
  }
}

# Get single order with full details
query GetOrder($id: ID!) {
  getOrder(id: $id) {
    id
    userId
    vendorId
    driverId
    status
    totalAmount
    createdAt
    updatedAt
    items {
      productId
      name
      quantity
      price
    }
    user { id name email }
    vendor { id name }
    driver { id name phone }
  }
}
```

### 2. Orders Mutations

```graphql
# Update order status
mutation UpdateOrderStatus(
  $id: ID!
  $status: OrderStatus!
) {
  updateOrder(input: {
    id: $id
    status: $status
    updatedAt: true
  }) {
    id
    status
    updatedAt
  }
}

# Assign driver to order (Manual dispatch)
mutation AssignDriver(
  $orderId: ID!
  $driverId: ID!
) {
  updateOrder(input: {
    id: $orderId
    driverId: $driverId
    status: "ASSIGNED"
  }) {
    id
    driverId
    status
  }
}
```

### 3. Users Queries

```graphql
# List all users with optional role/status filter
query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $limit: Int
) {
  listUserProfiles(filter: $filter, limit: $limit) {
    items {
      id
      userId
      email
      name
      role
      status
      createdAt
      approvedAt
      approvedBy
    }
  }
}

# List pending users (vendors/drivers awaiting approval)
query ListPendingUsers {
  listUserProfiles(
    filter: { status: { eq: "PENDING" } }
  ) {
    items {
      id
      userId
      email
      name
      role
      status
      createdAt
    }
  }
}
```

### 4. Users Mutations

```graphql
# Approve user (update status to APPROVED)
mutation ApproveUser(
  $id: ID!
  $adminUserId: ID!
) {
  updateUserProfile(input: {
    id: $id
    status: "APPROVED"
    approvedBy: $adminUserId
    approvedAt: true
  }) {
    id
    status
    approvedBy
    approvedAt
  }
}

# Suspend user (set status to SUSPENDED)
mutation SuspendUser($id: ID!) {
  updateUserProfile(input: {
    id: $id
    status: "SUSPENDED"
  }) {
    id
    status
  }
}
```

### 5. Drivers Queries

```graphql
# List all drivers
query ListDrivers {
  listUserProfiles(
    filter: {
      role: { eq: "DRIVER" }
      status: { eq: "APPROVED" }
    }
  ) {
    items {
      id
      userId
      name
      email
      phone
      status
    }
  }
}
```

---

## 📱 Part 4: Driver App Tightening

### Current State
- ✅ Driver UI screens exist: `app/(driver)/...`
- ❌ Uses mock data / hardcoded orders
- ❌ Not connected to AppSync

### What Needs to Change

#### File: `app/(driver)/orders.tsx`
**Current:** Hardcoded mock orders
**Change:**
```typescript
// BEFORE:
const orders = [
  { id: "1", status: "PENDING", ... },
  { id: "2", status: "IN_TRANSIT", ... },
];

// AFTER:
const [orders, setOrders] = useState([]);

useEffect(() => {
  const fetchMyOrders = async () => {
    const driverId = await getCurrentDriverId(); // From Cognito
    
    // Real GraphQL query
    const { data } = await client.models.Order.list({
      filter: { driverId: { eq: driverId } }
    });
    
    setOrders(data);
  };
  
  fetchMyOrders();
}, []);
```

#### File: `app/(driver)/order-detail.tsx`
**Current:** Shows mock order details
**Change:**
- Fetch real order from AppSync using `orderId` param
- Wire "Picked Up" button → `updateOrder({ status: "PICKED_UP" })`
- Wire "Delivered" button → `updateOrder({ status: "DELIVERED" })`
- Add real-time updates (WebSocket subscription)

#### File: `services/driverService.ts`
**Current State:** Check if exists
**New Functions Needed:**
```typescript
// Get orders assigned to this driver
async function getAssignedOrders(driverId: string) { ... }

// Update delivery status
async function updateDeliveryStatus(orderId: string, status: "PICKED_UP" | "DELIVERED") { ... }

// Get single order details
async function getOrderDetails(orderId: string) { ... }

// Subscribe to new order assignments (real-time)
async function subscribeToNewOrders(driverId: string, callback: Function) { ... }
```

---

## 📅 Week 1 Implementation (Days 1-5)

### Day 1: Admin App Setup
**Deliverable:** Admin app skeleton ready for development

**Tasks:**
1. Create `/admin` folder with Vite + React + TypeScript
   ```bash
   npm create vite@latest admin -- --template react-ts
   cd admin && npm install
   ```

2. Add dependencies:
   ```bash
   npm install @aws-amplify/ui-react aws-amplify @aws-amplify/data
   npm install react-router-dom axios
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Create folder structure (as above)
4. Copy `amplify_outputs.json` to admin folder
5. Create `.env.local` with `VITE_AMPLIFY_REGION=us-east-1`

**Files to Create:**
- `admin/src/App.tsx` (Router setup)
- `admin/src/main.tsx` (Entry)
- `admin/src/services/auth.ts` (Cognito client)
- `admin/vite.config.ts`
- `admin/tsconfig.json`
- `admin/package.json`

**Test:** `cd admin && npm run dev` should start dev server

---

### Day 2: Admin Authentication & Protected Routes
**Deliverable:** Admin login screen + role check

**Tasks:**
1. Create `admin/src/pages/Login.tsx`
   - Cognito sign-in form (email/password)
   - Redirect to dashboard on success
   - Show error if not ADMIN role

2. Create `admin/src/components/ProtectedRoute.tsx`
   - Check Cognito groups include "ADMIN"
   - Redirect to login if not authorized

3. Create `admin/src/hooks/useAuth.ts`
   - Get current user from Cognito
   - Check admin role
   - Get user ID for later mutations

4. Create `admin/src/services/auth.ts`
   - Sign in function
   - Sign out function
   - Get current session

**Test Checklist:**
- [ ] Can navigate to `/admin/login`
- [ ] Can sign in with `admin@test.com`
- [ ] Redirects to `/admin/dashboard`
- [ ] Sign out works

---

### Day 3: Orders List Page
**Deliverable:** Admin sees all orders with filters

**Tasks:**
1. Create `admin/src/pages/Orders.tsx`
   - List all orders from AppSync
   - Show: Order ID, Customer, Vendor, Status, Driver, Total, Date
   - Add filters: Status (PENDING, ASSIGNED, IN_TRANSIT, DELIVERED)
   - Pagination or infinite scroll

2. Create `admin/src/services/orders.ts`
   - GraphQL query: `listOrders`
   - Filter by status
   - Format date/currency

3. Create `admin/src/components/OrderCard.tsx`
   - Display one order in list
   - Show status badge (color-coded)
   - Link to order detail page

4. Create `admin/src/hooks/useOrders.ts`
   - Fetch orders on page load
   - Handle loading/error states
   - Cache results

**Test Checklist:**
- [ ] Orders page loads
- [ ] Shows mock orders from AppSync
- [ ] Status filter works
- [ ] Pagination works (if >10 orders)
- [ ] Click order → goes to detail page

---

### Day 4: Manual Driver Assignment
**Deliverable:** Admin can assign driver to unassigned order

**Tasks:**
1. Update `admin/src/pages/Orders.tsx`
   - Add "Assign Driver" button (only for PENDING orders without driver)
   - Open modal/dropdown on click

2. Create `admin/src/components/DriverSelect.tsx`
   - Dropdown list of available drivers
   - Show driver name + phone
   - Select one → confirm

3. Create `admin/src/services/drivers.ts`
   - GraphQL query: List drivers with APPROVED status
   - Get driver details

4. Create mutation in `admin/src/services/orders.ts`
   - `assignDriverToOrder(orderId, driverId)`
   - Call AppSync mutation: `updateOrder`
   - Update order status to "ASSIGNED"

**Test Checklist:**
- [ ] Orders list shows "Assign Driver" button
- [ ] Click button opens driver selector
- [ ] Can pick driver from dropdown
- [ ] Confirm button updates order
- [ ] Order status changes to ASSIGNED
- [ ] Driver name now shows in order card
- [ ] Refresh page - driver assignment persists

---

### Day 5: User Approval Management
**Deliverable:** Admin can approve/suspend pending vendors & drivers

**Tasks:**
1. Create `admin/src/pages/Users.tsx`
   - Two tabs: PENDING users vs ALL users
   - Show: Name, Email, Role, Status, Apply Date
   - PENDING tab shows Approve/Suspend buttons

2. Create `admin/src/components/StatusBadge.tsx`
   - Color-coded: PENDING (yellow), APPROVED (green), SUSPENDED (red)

3. Create `admin/src/services/users.ts`
   - Query: `listUserProfiles` with role/status filters
   - Mutations: `approveUser`, `suspendUser`

4. Create approval workflow
   - Click "Approve" → confirmation dialog
   - On confirm → AppSync mutation
   - Update status in real-time
   - Remove from PENDING list

5. Create `admin/src/pages/UserDetail.tsx` (optional)
   - Single user profile view
   - Show all details
   - Approve/Suspend buttons
   - Edit name/phone if needed

**Test Checklist:**
- [ ] Users page shows pending vendors/drivers
- [ ] Can approve vendor
- [ ] Status changes to APPROVED
- [ ] Can suspend user
- [ ] Can filter by role
- [ ] Can filter by status

**End of Week 1:**
- ✅ Admin app fully functional (login, orders, driver assignment, approvals)
- ✅ Wired to real AppSync backend
- ✅ Manual driver dispatch working
- ✅ Can be deployed separately or with mobile app

---

## 📅 Week 2 Implementation (Days 6-10)

### Day 6: Tighten Driver App - Orders List
**Deliverable:** Driver sees real assigned orders (not mock)

**Tasks:**
1. Update `app/(driver)/orders.tsx`
   - Replace mock data with AppSync query
   - Filter orders by current driver's ID
   - Get driver ID from Cognito user

2. Create/update `services/driverService.ts`
   ```typescript
   export async function getMyAssignedOrders() {
     const driverId = await getCurrentDriverId();
     return client.models.Order.list({
       filter: { driverId: { eq: driverId } }
     });
   }
   ```

3. Add loading/error states
   - Show spinner while fetching
   - Show error message if query fails
   - Add retry button

4. Add real-time updates
   - Subscribe to order changes
   - Show "new order assigned" toast

**Test Checklist:**
- [ ] Driver logs in
- [ ] Sees real orders from AppSync (not mock)
- [ ] Orders show correct status
- [ ] Can see multiple orders
- [ ] Pull-to-refresh updates list

---

### Day 7: Tighten Driver App - Delivery Status Updates
**Deliverable:** Driver can update delivery status in real app

**Tasks:**
1. Update `app/(driver)/order-detail.tsx`
   - Fetch real order from AppSync
   - Show delivery status

2. Wire up buttons:
   - "Picked Up" → `updateDeliveryStatus(orderId, "PICKED_UP")`
   - "Delivered" → `updateDeliveryStatus(orderId, "DELIVERED")`

3. Create mutation in `services/driverService.ts`
   ```typescript
   export async function updateDeliveryStatus(orderId: string, status: string) {
     return client.models.Order.update({
       id: orderId,
       status: status
     });
   }
   ```

4. Add optimistic updates
   - Show status change immediately in UI
   - Confirm with server response
   - Rollback if error

5. Add confirmation dialogs
   - "Are you sure order is picked up?"
   - "Are you sure order is delivered?"

**Test Checklist:**
- [ ] Driver opens order detail
- [ ] Shows real order from AppSync
- [ ] Can click "Picked Up"
- [ ] Status changes to IN_TRANSIT
- [ ] Can click "Delivered"
- [ ] Status changes to DELIVERED
- [ ] Changes persist after refresh

---

### Day 8: Real-time Order Assignment
**Deliverable:** Driver gets instant notification of new order assignment

**Tasks:**
1. Add AppSync subscription in driver app
   ```typescript
   export function subscribeToMyOrders(driverId: string, callback: Function) {
     return client.models.Order.observeQuery({
       filter: { driverId: { eq: driverId } }
     }).subscribe({
       next: (data) => callback(data),
       error: (err) => console.error(err)
     });
   }
   ```

2. Use in `app/(driver)/orders.tsx`
   - Subscribe on component mount
   - Unsubscribe on unmount
   - Refetch list when new order comes in

3. Show notification when new order assigned
   - Toast message: "New order assigned!"
   - Tap to open order
   - Play sound (optional)

4. Update list in real-time
   - New order appears without refresh
   - Status updates live

**Test Checklist:**
- [ ] Driver app is running
- [ ] Admin assigns order to driver
- [ ] Driver sees new order appear in list (no refresh)
- [ ] Toast notification shows
- [ ] Can immediately open new order

---

### Day 9: UI Polish & Error Handling
**Deliverable:** Production-ready UX

**Tasks:**
1. Add error boundaries
   - Catch crashes gracefully
   - Show user-friendly error messages

2. Improve loading states
   - Skeleton screens while loading
   - Smooth transitions

3. Add offline support (optional)
   - Cache orders locally
   - Sync when back online

4. Improve performance
   - Lazy load order details
   - Debounce filters
   - Memoize components

5. Admin dashboard UX
   - Add dashboard home screen (overview stats)
   - Show pending orders count
   - Show pending users count
   - Quick action buttons

6. Driver app UX
   - Add driver location on order map (if possible)
   - Show estimated delivery time
   - Show customer phone/address

**Test Checklist:**
- [ ] Admin dashboard shows stats
- [ ] Error messages are helpful
- [ ] Loading states are smooth
- [ ] No crashes on bad data
- [ ] Mobile layout is responsive

---

### Day 10: Testing, Documentation & Deployment
**Deliverable:** Ready for Week 8 handoff

**Tasks:**
1. Manual testing across flows
   - Admin approve → vendor sign in → vendor has access
   - Admin assign driver → driver sees order → driver updates status
   - Customer places order → admin sees it → assigns driver → driver delivers

2. Create testing guide
   - Test credentials
   - Step-by-step flows
   - Expected outcomes

3. Create deployment guide
   - How to deploy admin app (Netlify, Vercel, AWS Amplify)
   - How to deploy driver tightening changes
   - Environment variables needed

4. Update README files
   - Admin app setup instructions
   - How to run locally
   - How to deploy

5. Git commits
   - Clean commit history
   - Clear commit messages

6. Deploy to staging
   - Push admin app to production build
   - Test live
   - Fix any issues

**Test Checklist:**
- [ ] All flows tested end-to-end
- [ ] No bugs found
- [ ] Deployed successfully
- [ ] Admin accessible at URL
- [ ] Driver app changes merged

---

## 🎯 Implementation Checklist

### Admin App (Week 1)
- [ ] Vite + React setup
- [ ] Cognito login page
- [ ] Protected routes with ADMIN role check
- [ ] Orders list page with filters
- [ ] Driver selection + assignment mutation
- [ ] Users list with approval/suspend
- [ ] Order detail page
- [ ] Dashboard overview page
- [ ] Error boundaries & loading states

### Driver App Tightening (Week 2)
- [ ] Replace mock orders with AppSync query
- [ ] Wire "Picked Up" button to mutation
- [ ] Wire "Delivered" button to mutation
- [ ] Add real-time order assignment
- [ ] Notification for new orders
- [ ] Optimistic updates
- [ ] Error handling

### Testing & Documentation
- [ ] Manual test flows documented
- [ ] Admin deployment guide
- [ ] Driver app testing guide
- [ ] All commits clean
- [ ] README updated

---

## 📊 Success Criteria

**By end of Week 2:**
- ✅ Admin can log in
- ✅ Admin can see all orders
- ✅ Admin can assign drivers manually
- ✅ Admin can approve/suspend users
- ✅ Driver app fetches real orders
- ✅ Driver can update delivery status
- ✅ Driver gets real-time notifications
- ✅ All changes persist in AppSync/DynamoDB
- ✅ No mock data in production code
- ✅ Fully deployed and tested

---

## 🚀 Deployment Strategy

### Admin App Deployment
```bash
# Build
cd admin && npm run build

# Deploy to Netlify (recommended for speed)
npm run build && netlify deploy --prod

# OR deploy to Vercel
vercel --prod

# OR deploy to AWS Amplify
amplify add hosting
amplify publish
```

### Mobile App Changes
```bash
# Just redeploy the driver screens
eas build --platform ios
eas build --platform android

# Or use Expo OTA update for faster testing
npx expo publish
```

---

## 📞 Questions Before Starting?

1. **Do you want the admin app in this repo or separate?**
   - Recommended: Same repo (`/admin` folder)
   - Answer: Helps with shared types, simpler CI/CD

2. **UI Framework preference?**
   - Recommended: TailwindCSS + shadcn/ui components
   - OR: Material-UI if you prefer

3. **Real-time vs. Polling?**
   - Recommended: AppSync subscriptions for real-time
   - Polling is simpler but less responsive

4. **Geolocation for drivers?**
   - V1: Not needed (manual assignment)
   - V2: Can add later if needed

5. **Email notifications?**
   - V1: Not needed (in-app notifications)
   - V2: Can add SES notifications later

---

## 📁 Summary: What Changes & What's New

### New Files (Admin App)
- `/admin/*` (entire new folder - Vite React app)

### Modified Files (Driver App Tightening)
- `app/(driver)/orders.tsx` - Real AppSync queries
- `app/(driver)/order-detail.tsx` - Real mutations
- `services/driverService.ts` - AppSync queries + mutations
- `services/userProfileHybrid.ts` - Already supports mock mode!

### Shared Resources (No Changes Needed)
- `amplify/data/resource.ts` - GraphQL schema (already has Order + UserProfile models)
- `types/user.ts` - User types
- `amplify_outputs.json` - Backend config (copy to admin folder)

---

**Ready to start? Pick a day and let me know which task you want to begin with! 🚀**
