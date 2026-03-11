# 🌐 API Gateway Setup & Testing Guide

**Date:** March 11, 2026  
**Status:** Ready to deploy

---

## 📋 What Was Created

### 1. Lambda Authorizer (`amplify/functions/authorizer/`)
- **Purpose:** Validates Cognito JWT tokens and enforces role-based access
- **How it works:**
  1. Extracts JWT from `Authorization: Bearer <token>` header
  2. Verifies JWT signature using Cognito's public keys (JWKS)
  3. Extracts `cognito:groups` claim from token
  4. Matches route prefix to required role:
     - `/customer/*` → Requires `CUSTOMER` group
     - `/vendor/*` → Requires `VENDOR` group
     - `/driver/*` → Requires `DRIVER` group
     - `/admin/*` → Requires `ADMIN` group
  5. Returns `Allow` or `Deny` IAM policy

### 2. API Gateway Stack (`amplify/functions/api-gateway/`)
- **Purpose:** CDK infrastructure for REST API with role-based routes
- **Features:**
  - Four route prefixes: `/customer`, `/vendor`, `/driver`, `/admin`
  - CORS enabled for Expo app
  - Health check endpoints for each role
  - Token-based authorizer on all routes
  - CloudWatch logging and metrics
  - Request throttling (100 req/s, burst 200)

### 3. API Client Service (`services/apiClient.ts`)
- **Purpose:** React Native service to call API Gateway endpoints
- **Features:**
  - Automatically adds JWT token to all requests
  - Axios-based HTTP client
  - Request/response interceptors
  - Error handling (401, 403, network errors)
  - TypeScript types for responses

---

## 🚀 Deployment Steps

### Step 1: Install Dependencies

```bash
# In amplify/functions/authorizer/
cd amplify/functions/authorizer
npm install

# In amplify/functions/api-gateway/
cd ../api-gateway
npm install

# Back to root
cd ../../..

# Install axios for API client
npm install axios
```

### Step 2: Deploy to AWS

```bash
# Redeploy Amplify sandbox with new functions
npx ampx sandbox --once

# This will:
# - Deploy Lambda authorizer function
# - Deploy API Gateway stack
# - Create health check endpoints
# - Output API Gateway URL
```

### Step 3: Get API Gateway URL

After deployment, check the terminal output for:

```
✅ Deployment Complete!

Outputs:
  GlamGoApiUrl: https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/
  GlamGoApiId: abc123xyz
```

Copy this URL - you'll need it for testing!

### Step 4: Update Expo App

Add the API URL to your `.env` file (create if it doesn't exist):

```bash
# .env
EXPO_PUBLIC_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod
```

Or set it programmatically after Amplify configures:

```typescript
// In app/_layout.tsx or App.tsx, after Amplify.configure()
import { apiClient } from "@/services/apiClient";

// Get API URL from amplify_outputs.json custom section
const apiUrl = amplifyOutputs.custom?.apiGatewayUrl;
if (apiUrl) {
  apiClient.setBaseURL(apiUrl);
  console.log("✅ API Gateway configured:", apiUrl);
}
```

---

## 🧪 Testing the API Gateway

### Test 1: Sign In and Call Health Check

**As Customer:**

```typescript
// In any customer screen
import { customerApi } from "@/services/apiClient";

const testCustomerApi = async () => {
  try {
    const result = await customerApi.healthCheck();
    console.log("✅ Customer API working:", result);
    // Expected: { message: "OK", role: "CUSTOMER", timestamp: "...", authorizer: {...} }
  } catch (error) {
    console.error("❌ Customer API failed:", error);
  }
};
```

**As Vendor:**

```typescript
import { vendorApi } from "@/services/apiClient";

const testVendorApi = async () => {
  try {
    const result = await vendorApi.healthCheck();
    console.log("✅ Vendor API working:", result);
  } catch (error) {
    console.error("❌ Vendor API failed:", error);
  }
};
```

### Test 2: Verify Role Enforcement

**Test: Customer tries to access vendor route (should fail)**

```typescript
import { apiClient } from "@/services/apiClient";

const testRoleEnforcement = async () => {
  try {
    // Customer is signed in, trying to call vendor endpoint
    await apiClient.get("/vendor/health");
    console.log("❌ SECURITY ISSUE: Customer accessed vendor route!");
  } catch (error) {
    if (error.response?.status === 403) {
      console.log("✅ Role enforcement working - 403 Forbidden");
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
};
```

### Test 3: All Roles Health Check

Create a test screen or add to existing dashboard:

```typescript
import { useState } from "react";
import { View, Button, Text } from "react-native";
import { customerApi, vendorApi, driverApi, adminApi } from "@/services/apiClient";

export default function ApiTestScreen() {
  const [results, setResults] = useState<any>({});

  const testAllEndpoints = async () => {
    const tests = [
      { name: "Customer", fn: customerApi.healthCheck },
      { name: "Vendor", fn: vendorApi.healthCheck },
      { name: "Driver", fn: driverApi.healthCheck },
      { name: "Admin", fn: adminApi.healthCheck },
    ];

    for (const test of tests) {
      try {
        const result = await test.fn();
        setResults((prev: any) => ({ ...prev, [test.name]: "✅ " + JSON.stringify(result) }));
      } catch (error: any) {
        setResults((prev: any) => ({
          ...prev,
          [test.name]: `❌ ${error.response?.status || error.message}`,
        }));
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Test All Endpoints" onPress={testAllEndpoints} />
      {Object.entries(results).map(([role, result]) => (
        <Text key={role}>{role}: {result as string}</Text>
      ))}
    </View>
  );
}
```

---

## 🔍 Verification Checklist

After deployment, verify:

### In AWS Console - API Gateway:

1. Go to **API Gateway** → Find "GlamGo Marketplace API"
2. Check **Resources**:
   - ✅ `/customer/health` exists
   - ✅ `/vendor/health` exists
   - ✅ `/driver/health` exists
   - ✅ `/admin/health` exists
3. Check **Authorizers**:
   - ✅ "GlamGoJWTAuthorizer" is attached
   - ✅ Identity source: `method.request.header.Authorization`
4. Check **Stages**:
   - ✅ "prod" stage deployed
   - ✅ CloudWatch logging enabled

### In AWS Console - Lambda:

1. Go to **Lambda** → Find "lambda-authorizer-..."
2. Check **Configuration**:
   - ✅ Environment variables: `USER_POOL_ID`, `AWS_REGION`
   - ✅ Timeout: 10 seconds
   - ✅ Memory: 256 MB
3. Check **Monitoring**:
   - ✅ No errors in CloudWatch Logs

### In Expo App:

1. Sign in as **customer@test.com**
2. Call `customerApi.healthCheck()`
   - ✅ Should return `{ message: "OK", role: "CUSTOMER", ... }`
3. Try `vendorApi.healthCheck()`
   - ✅ Should fail with 403 Forbidden
4. Sign out, sign in as **vendor** (once approved)
5. Call `vendorApi.healthCheck()`
   - ✅ Should return `{ message: "OK", role: "VENDOR", ... }`

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'axios'"

**Solution:**
```bash
npm install axios
```

### Issue: "API Gateway URL not found"

**Solution:**
1. Check `amplify_outputs.json` → `custom.apiGatewayUrl`
2. If missing, redeploy: `npx ampx sandbox --once`
3. Manually set URL: `apiClient.setBaseURL("https://your-api-url.com/prod")`

### Issue: Health check returns 401 Unauthorized

**Causes:**
- JWT token expired (re-sign in)
- No token in request (check `fetchAuthSession()` is working)
- User not authenticated

**Solution:**
```typescript
// Check if user is authenticated
import { fetchAuthSession } from "aws-amplify/auth";

const session = await fetchAuthSession();
console.log("Token:", session.tokens?.idToken?.toString());
```

### Issue: Health check returns 403 Forbidden

**Causes:**
- User doesn't have required Cognito group
- Trying to access wrong route (e.g., customer accessing `/vendor`)

**Solution:**
1. Check Cognito user has correct group:
   - AWS Console → Cognito → Users → Select user → Group memberships
2. Verify route matches user role
3. Check authorizer logs in CloudWatch

### Issue: Lambda authorizer times out

**Causes:**
- JWKS fetch failing (network issue)
- JWT verification taking too long

**Solution:**
1. Check Lambda CloudWatch logs
2. Increase timeout: Edit `resource.ts` → `timeoutSeconds: 15`
3. Check network connectivity from Lambda to Cognito

---

## 📊 Expected Test Results

### Customer User Tests:

| Endpoint | Expected Result |
|----------|----------------|
| `GET /customer/health` | ✅ 200 OK - "role": "CUSTOMER" |
| `GET /vendor/health` | ❌ 403 Forbidden |
| `GET /driver/health` | ❌ 403 Forbidden |
| `GET /admin/health` | ❌ 403 Forbidden |

### Vendor User Tests:

| Endpoint | Expected Result |
|----------|----------------|
| `GET /customer/health` | ❌ 403 Forbidden |
| `GET /vendor/health` | ✅ 200 OK - "role": "VENDOR" |
| `GET /driver/health` | ❌ 403 Forbidden |
| `GET /admin/health` | ❌ 403 Forbidden |

### Admin User Tests:

| Endpoint | Expected Result |
|----------|----------------|
| `GET /customer/health` | ❌ 403 Forbidden |
| `GET /vendor/health` | ❌ 403 Forbidden |
| `GET /driver/health` | ❌ 403 Forbidden |
| `GET /admin/health` | ✅ 200 OK - "role": "ADMIN" |

---

## 🎯 What This Enables

Now that you have role-based API Gateway:

1. ✅ **Secure Backend APIs:** All endpoints protected by JWT
2. ✅ **Role Enforcement:** Users can only access their routes
3. ✅ **Foundation for Features:** Ready to add:
   - Customer: Browse stores, search products, place orders
   - Vendor: Manage products, view orders, update inventory
   - Driver: View deliveries, update status, navigation
   - Admin: Approve users, view analytics, manage platform

---

## 📝 Next Steps

### Option 1: Test Action 2 with APIs (Recommended)

1. Deploy API Gateway
2. Sign in as admin → Call `adminApi.healthCheck()`
3. Sign up as vendor → Test pending screen
4. Admin approves vendor → Vendor calls `vendorApi.healthCheck()`
5. Verify approved vendor can access vendor routes

### Option 2: Add Catalog Service (Next Feature)

1. Create Lambda functions:
   - `GET /customer/stores` - List stores
   - `GET /customer/stores/{id}/products` - Store products
   - `GET /customer/products/search?q=...` - Search
2. Update `browse.tsx` to fetch real data
3. Add loading states and error handling

### Option 3: Create Admin Endpoints

1. Create Lambda functions:
   - `GET /admin/users/pending` - List pending users
   - `POST /admin/users/{id}/approve` - Approve user
   - `POST /admin/users/{id}/suspend` - Suspend user
2. Update admin dashboard to use real APIs instead of GraphQL

---

## 🚀 Ready to Deploy?

Run this command to deploy everything:

```bash
# Deploy Amplify with new functions
npx ampx sandbox --once

# Install frontend dependencies
npm install axios

# Restart Expo
npm start -- --clear
```

Then follow the testing guide above! 🎉
