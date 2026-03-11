# 🔧 Backend & Infrastructure Tasks - Week of March 9, 2026

## 📋 Critical Backend Issues (Must Fix This Week)

### 1. AWS Lambda Post-Confirmation Function ⚠️ CRITICAL
**File:** `amplify/functions/post-confirmation/handler.ts`
**Issue:** Missing AWS SDK dependency
**Error:** `Cannot find module '@aws-sdk/client-cognito-identity-provider'`

**Fix:**
```bash
cd amplify/functions/post-confirmation
npm install @aws-sdk/client-cognito-identity-provider
```

**What it does:** This Lambda function runs after user sign-up to add custom attributes to Cognito user profile (like role assignment).

**Testing:** 
- Sign up a new user
- Check AWS CloudWatch logs to verify Lambda executes without errors
- Verify user role is properly set in Cognito

---

### 2. Driver Available Screen TypeScript Errors 🐛
**File:** `app/(driver)/available.tsx`
**Issues:** 
- Duplicate variable declarations (`refreshing`, `setRefreshing`)
- Missing `Platform` import

**Fix:**
```typescript
// Add to imports at top:
import { Platform } from 'react-native';

// Remove duplicate useState declarations around lines 43 and 146
```

**Testing:**
- Open driver available orders screen
- Verify pull-to-refresh works
- Check that order cards render properly

---

### 3. Vendor Dashboard Gradient Type Error 🎨
**File:** `app/(vendor)/dashboard.tsx` line 81
**Issue:** LinearGradient colors type mismatch

**Fix:** Already applied `as const` to gradient arrays, but verify:
```typescript
const quickActions = [
  { gradient: [color1, color2] as const },
  // ...
];
```

**Testing:**
- Open vendor dashboard
- Verify all gradient cards render correctly
- No console warnings

---

### 4. Index Route Type Error 🔀
**File:** `app/index.tsx` line 9
**Issue:** Expo Router strict typing on href

**Fix:**
```typescript
<Redirect href="/browse" as any />
```

**Testing:**
- Open app fresh (clear cache)
- Should redirect to browse page
- No TypeScript errors

---

## 📊 Database & API Issues (Backend Infrastructure)

### 5. Amplify Data Schema Implementation 📝 MEDIUM PRIORITY
**Files:** `amplify/data/resource.ts`, `services/*.ts`

**Current State:**
- Schema is defined but not fully implemented
- Mock data is being used everywhere (DEMO_MODE = true)
- No real database CRUD operations

**Tasks:**
1. **Review Current Schema** (`amplify/data/resource.ts`)
   - Product model
   - Order model  
   - Store model
   - User relationships

2. **Deploy Amplify Backend**
   ```bash
   npx ampx sandbox
   # OR for production:
   npx ampx pipeline-deploy --branch main
   ```

3. **Replace Mock Data with Real API Calls**
   - `app/(customer)/shop.tsx` - Replace `mockServices` with real data fetch
   - `app/(vendor)/products-full.tsx` - Replace mock products
   - `app/(driver)/available.tsx` - Replace mock orders
   - Update all `DEMO_MODE` flags to `false`

4. **Test CRUD Operations**
   - Create product (vendor)
   - Browse products (customer)
   - Create order (customer)
   - Accept order (driver)
   - Update order status

**Estimated Time:** 4-6 hours

---

### 6. Inventory Service Implementation 📦 MEDIUM PRIORITY
**File:** `services/inventoryService.ts`

**Current State:** Service file exists but functions are not implemented

**Tasks:**
1. Implement `getProducts()` - fetch all products for a vendor
2. Implement `createProduct()` - add new product
3. Implement `updateProduct()` - edit existing product
4. Implement `deleteProduct()` - remove product
5. Implement `updateStock()` - adjust inventory levels

**Dependencies:** Requires Amplify backend deployed (#5)

**Estimated Time:** 2-3 hours

---

### 7. Order Service Implementation 📋 MEDIUM PRIORITY
**File:** `services/orderService.ts`

**Current State:** Service file exists with basic structure

**Tasks:**
1. Implement `createOrder()` - customer places order
2. Implement `getCustomerOrders()` - fetch customer's order history
3. Implement `getVendorOrders()` - fetch vendor's orders
4. Implement `getAvailableOrders()` - driver sees available deliveries
5. Implement `acceptOrder()` - driver accepts delivery
6. Implement `updateOrderStatus()` - track order lifecycle
7. Add real-time order status updates (Amplify subscriptions)

**Dependencies:** Requires Amplify backend deployed (#5)

**Estimated Time:** 3-4 hours

---

### 8. Store Service Implementation 🏪 MEDIUM PRIORITY
**File:** `services/storeService.ts`

**Current State:** Service file exists but minimal implementation

**Tasks:**
1. Implement `createStore()` - vendor creates store profile
2. Implement `updateStore()` - edit store details
3. Implement `getStoreProfile()` - fetch store information
4. Implement `getStoreProducts()` - fetch products for a store
5. Add store image upload functionality

**Dependencies:** Requires Amplify backend deployed (#5)

**Estimated Time:** 2-3 hours

---

## 🔐 Authentication & Security Issues

### 9. Cognito User Pool Configuration ✅ ALREADY DONE (Verify)
**What to Check:**
- Custom attribute `custom:role` is defined in user pool
- Email verification is enabled
- Password policy matches app requirements (8 chars, uppercase, lowercase, number, symbol)
- Lambda trigger is connected to post-confirmation function

**Verification:**
```bash
# Check Cognito configuration
aws cognito-idp describe-user-pool --user-pool-id us-east-1_ZMKLKcE8r
```

---

### 10. Secure Token Storage 🔒 LOW PRIORITY (Enhancement)
**Current:** Using AsyncStorage (works but not most secure on Android)

**Enhancement:** Consider using secure storage for tokens
```bash
npm install expo-secure-store
```

**Update:** `services/cognitoAuth.ts` to use SecureStore instead of AsyncStorage

**Estimated Time:** 1 hour

---

## 🚀 Deployment & DevOps Issues

### 11. Environment Variables Setup 🔧 HIGH PRIORITY
**Missing:** Proper environment configuration for different stages

**Tasks:**
1. Create `.env.development`
2. Create `.env.production`
3. Configure variables:
   ```
   COGNITO_USER_POOL_ID=
   COGNITO_CLIENT_ID=
   AMPLIFY_API_ENDPOINT=
   AWS_REGION=
   ```
4. Update `amplifyConfig.ts` to use environment variables
5. Add `.env` files to `.gitignore` (if not already)

**Estimated Time:** 1 hour

---

### 12. API Error Handling & Retry Logic 🔄 MEDIUM PRIORITY
**Files:** All `services/*.ts` files

**Current:** Basic try/catch blocks, no retry logic

**Enhancement:**
1. Add exponential backoff for failed API calls
2. Implement network error detection
3. Add user-friendly error messages
4. Log errors to monitoring service (Sentry, CloudWatch)

**Estimated Time:** 2-3 hours

---

## 📊 Analytics & Monitoring Setup

### 13. AWS CloudWatch Integration ☁️ LOW PRIORITY
**Tasks:**
1. Set up CloudWatch log groups for each Lambda function
2. Create CloudWatch dashboard for key metrics:
   - User sign-ups per day
   - Orders created per day
   - Average order value
   - Driver acceptance rate
3. Set up alarms for critical errors

**Estimated Time:** 2-3 hours

---

### 14. Analytics Events Tracking 📈 LOW PRIORITY
**Tasks:**
1. Install analytics library (Amplitude, Mixpanel, or AWS Pinpoint)
2. Track key events:
   - User sign-up (by role)
   - Product view
   - Add to cart
   - Order placed
   - Order delivered
3. Set up conversion funnels

**Estimated Time:** 2-3 hours

---

## 🧪 Testing Infrastructure

### 15. Backend Unit Tests ✅ LOW PRIORITY
**Missing:** No tests for backend functions

**Tasks:**
1. Set up Jest for Lambda functions
2. Write tests for:
   - User creation flow
   - Order CRUD operations
   - Product CRUD operations
3. Mock AWS SDK calls
4. Aim for 80% code coverage

**Estimated Time:** 4-6 hours

---

### 16. Integration Tests 🔗 LOW PRIORITY
**Tasks:**
1. Test complete user flows:
   - Customer: Browse → Add to Cart → Checkout → Track Order
   - Vendor: Create Product → Manage Inventory → View Orders
   - Driver: View Available → Accept → Deliver → Complete
2. Use Amplify sandbox for testing

**Estimated Time:** 3-4 hours

---

## 📱 Mobile App Polish (Related to Backend)

### 17. Offline Support 📴 MEDIUM PRIORITY
**Enhancement:** App should work partially offline

**Tasks:**
1. Cache product catalog locally
2. Queue orders when offline
3. Sync when back online
4. Show offline indicator to user

**Libraries:** Use AWS Amplify DataStore for offline-first

**Estimated Time:** 4-6 hours

---

### 18. Push Notifications Setup 🔔 HIGH PRIORITY
**Required for real-world use**

**Tasks:**
1. Set up AWS SNS or Firebase Cloud Messaging
2. Configure Expo push notification tokens
3. Send notifications for:
   - Order status changes (customer)
   - New order received (vendor)
   - New delivery available (driver)
   - Order accepted (customer & vendor)
4. Handle notification taps to navigate to relevant screen

**Estimated Time:** 3-4 hours

---

## 🎯 Priority Breakdown

### This Week (Must Fix):
1. ✅ **Task #1**: Lambda dependency (15 min)
2. ✅ **Task #2**: Driver screen errors (30 min)
3. ✅ **Task #11**: Environment variables setup (1 hour)

### Next Week (High Priority):
4. **Task #5**: Deploy Amplify backend + implement real data (6 hours)
5. **Task #18**: Push notifications (4 hours)
6. **Task #6-8**: Implement all service files (8 hours total)

### Month 1 (Medium Priority):
7. **Task #12**: Error handling (3 hours)
8. **Task #17**: Offline support (6 hours)
9. **Task #10**: Secure storage (1 hour)

### Future (Low Priority):
10. **Tasks #13-16**: Analytics, monitoring, testing (15+ hours)

---

## 🛠️ Quick Fix Commands

```bash
# Fix Lambda dependency
cd amplify/functions/post-confirmation && npm install @aws-sdk/client-cognito-identity-provider && cd ../../..

# Deploy Amplify sandbox (when ready)
npx ampx sandbox

# Run TypeScript check
npx tsc --noEmit

# Clear all caches
npx expo start --clear

# Check Cognito users
aws cognito-idp list-users --user-pool-id us-east-1_ZMKLKcE8r
```

---

## 📝 Notes

- **All mock data** is currently using `DEMO_MODE = true` flags
- **Authentication** works but backend Lambda needs dependency fix
- **Real-time features** require Amplify subscriptions setup
- **File uploads** (product images, store images) need S3 bucket configuration
- **Payment processing** not yet implemented (future task)

**Total Estimated Time for Critical + High Priority Tasks:** ~20-25 hours
