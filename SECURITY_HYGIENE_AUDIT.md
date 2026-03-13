# GLAMGO Security & Hygiene Audit Report

**Date:** March 12, 2026  
**Auditor:** Senior Security Engineer  
**Project Stage:** Internal Beta (Auth + GraphQL deployed, some flows use mocks)  
**Overall Risk Level:** MEDIUM (fixable in 1-2 days)

---

## Executive Summary

GLAMGO has solid architectural foundations with real AWS backend (Cognito + AppSync + DynamoDB), but contains **security gaps and code clutter** that must be cleaned up before production:

### ✅ What's Good

- Real authentication via AWS Cognito (strong password policy enforced)
- GraphQL API secured by custom authorizer with role-based access
- ErrorBoundary for graceful crash handling
- Role isolation at app navigation layer and backend
- AsyncStorage for token persistence (Amplify v6 auto-manages)

### ⚠️ What Needs Fixing

1. **Hardcoded test credentials** in sign-in UI (quick-fill demo buttons)
2. **Cognito IDs exposed** in both `cognitoAuth.ts` and `amplifyConfig.ts`
3. **Excessive console logging** (~200+ log statements) exposing auth flow, user data, backend details
4. **Tokens stored in AsyncStorage** (works, but less secure than Secure Enclave)
5. **Test/demo screens not removed** (booking, role-preview duplicates)
6. **ApiTestPanel component** left in production (debug tool)
7. **Mock data and spikes** scattered throughout, not clearly labeled
8. **Dead legacy code** in `/legacy` folder but not fully archived

---

# SECTION 1: SECURITY SCAN & FINDINGS

## 1.1 Secrets & Configuration Exposure

### CRITICAL: Cognito Pool IDs Hardcoded

**File:** `services/cognitoAuth.ts` (Lines 16-18)

```typescript
const poolData = {
  UserPoolId: "us-east-1_ZMKLKcE8r",
  ClientId: "7gn4qd0rl40ddb132l7g72c2sl",
};
```

**File:** `amplify_outputs.json` (Lines 1-10)

```json
{
  "auth": {
    "user_pool_id": "us-east-1_ZMKLKcE8r",
    "aws_region": "us-east-1",
    "user_pool_client_id": "7gn4qd0rl40ddb132l7g72c2sl",
    "identity_pool_id": "us-east-1:57890a5a-ee61-47f2-800d-5fa3a685aa34",
```

**Risk:**

- **Public Client ID:** Not secret (public clients can't authenticate users without password), but exposes which AWS account and region you're using.
- **User Pool ID:** Semi-public (unauthenticated users need it to call certain Cognito APIs), but helps attackers identify your account.
- **Identity Pool ID:** Even less sensitive for public apps, but reveals your AWS infrastructure.

**Why It Matters:**

- Attackers can enumerate your Cognito setup, test for weak password resets, perform account takeovers if MFA is disabled (it is).
- `amplify_outputs.json` should be .gitignored (currently it's committed).

**Fix:**

- ✅ **For now (beta):** Acceptable since Cognito is properly configured (strong passwords, email verification required).
- ✅ **Pre-launch:** Ensure `amplify_outputs.json` is in `.gitignore`.
- ✅ **Pre-launch:** Migrate to environment-based config (Amplify handles this via `aws-exports.js` in CI/CD).

**Action:** Move to environment configuration before production release.

---

### HIGH: Demo Credentials Hardcoded in UI

**File:** `app/(auth)/sign-in.tsx` (Lines 244-270)

```typescript
<TouchableOpacity
  onPress={() => {
    setEmail('customer@test.com');
    setPassword('Test1234!');
  }}
>
  <Text>Customer</Text>
</TouchableOpacity>
// ... repeats for vendor@test.com, driver@test.com with password 'Test1234!'
```

**Risk:**

- **Instant account compromise:** Anyone with the app source code (or decompiled APK) can instantly login as any demo user.
- **Demo data not private:** Any sensitive test data in those accounts is exposed.
- **Production liability:** If accidentally left in production build, becomes massive security hole.

**Why It Matters:**

- **During beta:** Acceptable for internal testing.
- **Before App Store:** Must remove or gate behind feature flag that's disabled in release builds.

**Fix:**

```typescript
// Option 1: Feature flag (recommended)
const DEMO_MODE = __DEV__; // or from BuildConfig

{DEMO_MODE && (
  <View style={styles.demoSection}>
    {/* Demo quick-fill buttons */}
  </View>
)}

// Option 2: Completely remove (after internal beta)
// Delete lines 237-272 entirely
```

**Action:** Add feature flag (1 commit). Remove completely pre-release (1 commit).

---

### MEDIUM: Test Passwords in Documentation

**Files:**

- `DEMO.md` (Line 18)
- `TESTING_GUIDE_PHASE_2.md` (Lines 24, 51, 81)
- `SIGNUP_TESTING_WALKTHROUGH.md` (Lines 38-39, 101-102)
- `OPTION_2_CONTINUE_PHASE_B.md` (Line 282)

**Example:**

```markdown
| Role | Email | Password |
| Customer | customer@test.com | Test123! |
```

**Risk:**

- **Low/Medium:** Docs are in private repo. But if repo is ever made public or forked, credentials are exposed.
- **Operational:** Anyone with repo access can login (good for team testing, bad for accounts you want to restrict).

**Fix:**

```markdown
# Before release, change to:

| Role | Email | Password |
| Customer | customer@test.com | [Ask team lead] |

# Or better: Don't store passwords at all

See Amplify Sandbox: `npx amplify sandbox` auto-creates test users with temp passwords.
```

**Action:**

- During beta: Mark docs as "INTERNAL - DO NOT SHARE"
- Pre-release: Remove hardcoded passwords, link to secure password manager or 1Password

---

## 1.2 Authentication & Token Handling

### MEDIUM: JWT Tokens Stored in AsyncStorage

**File:** `services/cognitoAuth.ts` (Lines 88-90)

```typescript
AsyncStorage.setItem("idToken", session.getIdToken().getJwtToken());
AsyncStorage.setItem("accessToken", session.getAccessToken().getJwtToken());
AsyncStorage.setItem("refreshToken", session.getRefreshToken().getToken());
```

**Risk:**

- **AsyncStorage is unencrypted:** On Android, stored as plain text in `/data/data/com.glamgo/shared_prefs/`. On iOS, stored in app's Documents folder (encrypted by OS, but less secure than Keychain).
- **Token leakage:** If device is compromised, attacker can extract tokens and impersonate user.
- **Better alternative:** React Native Keychain or Secure Enclave.

**Why Amplify v6 Does This:**

- Amplify v6 auto-detects AsyncStorage and uses it for React Native.
- It's acceptable for beta, but not production-grade.

**Current Mitigation:**

- ✅ Cognito tokens are short-lived (1 hour access, refresh tokens rotate).
- ✅ All requests go through HTTPS (enforced by Amplify + AppSync).
- ✅ Role-based access control on backend (can't access other users' data even with leaked token).

**Fix (Pre-Launch):**

```bash
npm install react-native-keychain
```

```typescript
import * as Keychain from "react-native-keychain";

// Store (more secure)
Keychain.setGenericPassword("token", session.getAccessToken().getJwtToken());

// Retrieve
const credentials = await Keychain.getGenericPassword();
const accessToken = credentials?.password;
```

**Action:**

- **Now:** Acceptable (beta + OAuth flow mitigates risk).
- **Month before launch:** Implement Keychain storage.
- **Pre-launch:** Test with security scanner.

---

### MEDIUM: Tokens Not Cleared on Logout

**File:** `services/cognitoAuth.ts` (Lines 104-115) - `signOut()` function

```typescript
export const signOut = async () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCognitoUser(...);
    cognitoUser.globalSignOut((err) => {
      if (err) reject(err);
      // ✅ Cognito clears session server-side
      resolve(true);
    });
  });
};
```

**Risk:**

- ✅ **Cognito handles it correctly:** `globalSignOut()` invalidates sessions server-side.
- ⚠️ **But:** AsyncStorage tokens aren't explicitly deleted (they timeout after 1 hour anyway).

**Fix (Minor Improvement):**

```typescript
export const signOut = async () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCognitoUser(...);
    cognitoUser.globalSignOut((err) => {
      if (err) reject(err);

      // Explicitly clear tokens
      AsyncStorage.multiRemove(['idToken', 'accessToken', 'refreshToken', 'cognitoUser']);

      resolve(true);
    });
  });
};
```

**Action:** Add explicit token cleanup (5 min fix).

---

### LOW: Role Inferred from Email String

**File:** `services/cognitoAuth.ts` (Lines 65-74)

```typescript
// Determine role from custom attribute or email - ALWAYS UPPERCASE
let role: UserRole = "CUSTOMER";
if (attrs["custom:role"]) {
  role = normalizeRole(attrs["custom:role"]);
} else if (email.includes("vendor")) {
  role = "VENDOR";
} else if (email.includes("driver")) {
  role = "DRIVER";
} else if (email.includes("admin")) {
  role = "ADMIN";
}
```

**Risk:**

- **Privilege escalation:** User could create account `admin+anything@gmail.com` and get admin role.
- **But:** This is a fallback; `custom:role` attribute is the source of truth (stored in Cognito, verified by backend).

**Why It's OK:**

- ✅ Post-confirmation Lambda function (`amplify/functions/post-confirmation/handler.ts`) sets the real role in Cognito custom attributes.
- ✅ Backend authorizer checks Cognito groups (set via Lambda), not email parsing.

**Verification:** Role is only used for **client-side routing**. Server-side authorization uses Cognito groups:

```typescript
// Backend: amplify/functions/authorizer/handler.ts (Line 120)
const userGroups = decodedToken["cognito:groups"] || [];
const requiredGroup = routePrefixToGroupMap[routePrefix];
const hasAccess = userGroups.includes(requiredGroup);
```

✅ **Secure:** Backend doesn't trust client role, only trusts Cognito groups.

**Action:** No fix needed. But add comment clarifying this is fallback-only.

---

## 1.3 Logging & Error Handling

### HIGH: Excessive Console Logging Exposing Sensitive Data

**Scope:** ~200+ `console.log/error/warn/info` statements across codebase.

**Dangerous Logs Found:**

1. **Auth Flow Logs** (`app/(auth)/sign-in.tsx` lines 64-100)

```typescript
console.log("=== DIRECT COGNITO SIGN-IN START ===");
console.log("Attempting sign-in for:", email.trim().toLowerCase());
console.log("✅ Sign-in successful!");
console.log("User ID:", user.userId);
console.log("Role:", user.role);
```

**Risk:** User IDs, roles, and login attempts logged to console (visible in logcat on Android).

2. **Backend Error Details** (`services/orderService.ts`, `services/inventoryService.ts`, etc.)

```typescript
console.error("❌ GraphQL errors:", errors);
console.log("✅ Fetched ${products.length} products");
```

**Risk:** Full GraphQL error objects expose schema, field names, backend implementation.

3. **API Gateway Logs** (`services/apiClient.ts` lines 34-78)

```typescript
console.log("🔑 Added auth token to request:", {
  Authorization: `Bearer ${token}`,
  // ... potentially shows full token
});
```

**Risk:** Auth tokens in console (even partial) is dangerous.

4. **User Profile Logs** (`app/_layout.tsx` lines 63-92)

```typescript
console.log("✅ Session restored - User is authenticated");
console.log("✅ User role:", user.role);
console.log("✅ UserProfile status:", profile.status);
```

**Risk:** User status leaks to console (can infer approval flow, suspension states).

**Why This Matters:**

- **Development:** Helpful for debugging.
- **Production:** Logcat/console available via USB debugging (on Android) or device console (on iOS during development).
- **CI/CD:** Logs might be captured in crash reports or uploaded to analytics services.
- **Third-Party SDKs:** Some SDKs (Sentry, DataDog, etc.) capture console logs if enabled.

**Overall Impact:**

- ⚠️ **Medium risk now (beta):** Useful for testing team, logs aren't sent to servers.
- 🔴 **Critical before release:** Must remove or gate by environment.

**Fix Strategy:**

**Option 1: Environment-Gated Logging (Recommended)**

```typescript
// utils/logger.ts
const DEBUG = __DEV__; // or from process.env.NODE_ENV

export const log = {
  info: (...args: any[]) => DEBUG && console.log("[INFO]", ...args),
  error: (...args: any[]) => console.error("[ERROR]", ...args), // Always log errors for support
  warn: (...args: any[]) => DEBUG && console.warn("[WARN]", ...args),
  debug: (...args: any[]) => DEBUG && console.log("[DEBUG]", ...args),
};

// Usage:
// ✅ log.error('Order creation failed:', error); // Always logged
// ✅ log.info('User:', user); // Only in dev
// ✅ log.debug('Auth flow:', details); // Only in dev
```

**Option 2: Remove Specific Dangerous Logs**

```typescript
// ❌ REMOVE:
console.log("User ID:", user.userId);
console.log("Attempting sign-in for:", email);
console.log("🔑 Added auth token to request:", headers);

// ✅ KEEP (non-sensitive, helps support):
console.error("Order creation failed:", error.message);
console.error("API call failed:", statusCode);
```

**Option 3: Redact Sensitive Values**

```typescript
const redactToken = (token: string) => token.substring(0, 10) + "...[REDACTED]";
console.log("Token:", redactToken(token)); // Safer
```

**Logs to Review & Remove/Gate:**
| File | Lines | Action |
|------|-------|--------|
| `app/(auth)/sign-in.tsx` | 64-100 | Remove (dev only) |
| `services/cognitoAuth.ts` | 95 | Gate by DEBUG |
| `services/apiClient.ts` | 34-78 | Gate by DEBUG, redact tokens |
| `app/_layout.tsx` | 63-174 | Gate by DEBUG (except errors) |
| `services/orderService.ts` | 65, 91, 127, etc. | Keep errors, gate info logs |
| `services/inventoryService.ts` | 34, 42, 46, etc. | Gate by DEBUG |
| `amplify/functions/authorizer/handler.ts` | 96-157 | Gate, don't log tokens |
| `amplify/functions/post-confirmation/handler.ts` | 16, 28, 70-71 | Gate by DEBUG |

**Action:** Create `utils/logger.ts` and systematically replace `console.*` calls (1-2 hours).

---

### MEDIUM: Unhandled Promise Rejections

**File:** `services/apiClient.ts` (Lines 76-78)

```typescript
} catch (error: any) {
  console.error('API Network Error:', error.message);
  throw error; // Silently re-throws
}
```

**Risk:**

- ✅ Error is thrown and caught at call-site (good).
- ⚠️ If not caught by caller, causes "unhandled rejection" and app crash.

**Audit Result:**

- ✅ **Most services properly catch errors** in their try/catch blocks.
- ⚠️ **A few screens don't catch errors** (they log and show Alert).

**Example - Good:**

```typescript
try {
  await updateUserProfileStatus(profile.id, "APPROVED", user.userId);
  Alert.alert("Success", "User approved");
} catch (error) {
  Alert.alert("Error", "Failed to approve user");
}
```

**Example - Could Improve:**

```typescript
// services/catalogService.ts
const getAllStores = async (): Promise<Store[]> => {
  // ... graphql call ...
  if (errors) {
    console.error("Error fetching stores:", error);
    throw error; // If not caught, crashes app
  }
};
```

**Fix:** Add global unhandled rejection handler:

```typescript
// app/_layout.tsx
import { setJSExceptionHandler } from "react-native-exception-handler";

setJSExceptionHandler((error, isFatal) => {
  console.error("Unhandled error:", error);
  if (isFatal) {
    Alert.alert("App Error", "The app encountered an error and will restart.");
  }
});
```

**Action:** Already have ErrorBoundary; add unhandled rejection handler (optional, nice-to-have).

---

## 1.4 Network & API Security

### MEDIUM: Hardcoded API Gateway URL (in Future Implementation)

**File:** `services/apiClient.ts` (Lines 80-95)

```typescript
let apiGatewayUrl: string | null = null;

export const setApiGatewayUrl = (url: string) => {
  apiGatewayUrl = url;
  console.log("🌐 API Gateway URL set to:", url);
};
```

**Status:** ✅ **Not hardcoded yet.** URL is set dynamically, likely from environment or Amplify config.

**But:** Check where it's set...

**Finding:** Couldn't find where `setApiGatewayUrl()` is called in current code. Likely will be set from Amplify outputs or environment.

**Fix (For When Phase 4 Adds API Gateway):**

```typescript
// In amplifyConfig.ts or .env:
const API_GATEWAY_URL =
  process.env.REACT_APP_API_GATEWAY_URL ||
  process.env.EXPO_PUBLIC_API_GATEWAY_URL;

// Never hardcode. Use environment variables.
```

**Action:** Document this for Phase 4 implementation.

---

### LOW: HTTP Fallback Not Implemented

**Status:** ✅ **AppSync enforces HTTPS.** All requests to GraphQL endpoint are encrypted.

**Verification:**

- AppSync endpoint: `https://tef6izps3zbwldy2yqlsgripv4.appsync-api.us-east-1.amazonaws.com/graphql`
- Amplify doesn't allow downgrade to HTTP.

**Action:** None needed. ✅ Secure.

---

## 1.5 Storage & Data Protection

### LOW: PII Stored in AsyncStorage (Minimal)

**Checked Files:**

- `contexts/AuthContext.tsx` - Stores user role and userId (non-PII)
- `services/cognitoAuth.ts` - Stores user object with email (PII, but encrypted on iOS, on dev devices)

**Current Data in Storage:**

```typescript
AsyncStorage.setItem('cognitoUser', JSON.stringify(user));
// { username, email, role, userId, attributes }

AsyncStorage.setItem('idToken', ...); // JWT token
AsyncStorage.setItem('accessToken', ...); // JWT token
AsyncStorage.setItem('refreshToken', ...); // JWT token
```

**Risk Assessment:**

- ✅ **Tokens:** Short-lived, auto-refresh, revoked on logout.
- ⚠️ **Email:** PII, but only accessible if device is compromised.
- ✅ **User role/ID:** Non-sensitive (only identifies role, not customer data).

**Mitigation:**

- ✅ No credit cards, SSNs, or sensitive PII stored.
- ✅ Order details are fetched on-demand from AppSync (not cached locally).
- ✅ All data synced over HTTPS.

**Action:** None needed for beta. Pre-launch: implement Keychain for tokens (separate ticket).

---

## 1.6 Dependencies & Build

### MEDIUM: Debug/Test Libraries in Codebase

**Checked For:**

- ✅ No Storybook in production build
- ✅ No Jest/testing libraries in main bundle
- ✅ No debug tools mounted in UI (except intentional ApiTestPanel)

**Issue Found: ApiTestPanel Component**

**File:** `components/ApiTestPanel.tsx` (234 lines)

```typescript
export default function ApiTestPanel() {
  // ... tests all API endpoints, shows results in UI
  return (
    <View>
      {/* Renders test results for all roles */}
      {results.map(result => (
        <View>
          <Text>{result.endpoint}: {result.message}</Text>
        </View>
      ))}
    </View>
  );
}
```

**Risk:**

- 🟡 **Not mounted anywhere** (no imports found in app screens), so it's dead code, not a leak.
- 🔴 **If accidentally imported** to admin dashboard, would expose all API endpoints and health status.

**Action:** Delete or move to `/legacy` (clear intent that it's debug-only).

---

### LOW: Unused Dependencies?

**Checked For:**

- ✅ No obvious unused packages in `package.json`
- ✅ `react-error-boundary`, `@react-native-picker/picker` are actively used
- ✅ All main Amplify packages are used

**But:** Need to check for unused imports in code.

**Example of Potential Unused Import:**

```typescript
import { useColorScheme } from "react-native"; // Used
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "@/constants/DesignSystem"; // Used
// These files typically re-export everything, so hard to tell what's actually used
```

**Action:** Run `npm audit` regularly. No immediate issues found.

---

# SECTION 2: DEAD CODE & CLEANUP

## 2.1 Unused/Legacy Screens Checklist

### DELETE NOW

| Item                         | Path                                                                | Reason                                                                              | Effort                                               |
| ---------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Booking Screen**           | `app/booking.tsx`                                                   | Not connected to order flow; Phase 3+ feature; mock implementation                  | SMALL (delete file + remove from router if imported) |
| **Role Preview Screens**     | `app/role-preview-*.tsx` (3 files)                                  | Duplicates of `/legacy/screens/role-preview-*.tsx`; used only for marketing preview | SMALL                                                |
| **ApiTestPanel**             | `components/ApiTestPanel.tsx`                                       | Debug-only component; not imported; exposes API structure                           | SMALL                                                |
| **Duplicate Legacy Screens** | `/legacy/screens/role-preview-*.tsx`, `/legacy/screens/booking.tsx` | Old prototypes; no current imports                                                  | SMALL                                                |

### ARCHIVE

| Item                   | Path                                 | Reason                                        | Action                                  |
| ---------------------- | ------------------------------------ | --------------------------------------------- | --------------------------------------- |
| **Old Prototype Docs** | `legacy/docs/`                       | Reference material, might have insights       | Rename to `_ARCHIVE_OLD_DOCS_REFERENCE` |
| **Old useColorScheme** | `legacy/components/useColorScheme.*` | Superseded by modern version in `components/` | Already in legacy; keep as reference    |

### KEEP

| Item                       | Path                                                                    | Reason                          |
| -------------------------- | ----------------------------------------------------------------------- | ------------------------------- |
| **All active app screens** | `app/(customer)/*`, `app/(vendor)/*`, `app/(driver)/*`, `app/(admin)/*` | Currently used; part of roadmap |
| **All services**           | `services/*.ts`                                                         | Actively used by screens        |
| **All components**         | `components/*.tsx`                                                      | Actively used                   |

---

## 2.2 Mock Data & Test Fixtures Cleanup

### Mock Data Currently Scattered:

1. **Demo Accounts in Sign-In UI** (`app/(auth)/sign-in.tsx` lines 237-272)
   - Status: ⚠️ Hardcoded credentials visible
   - Action: Add feature flag `__DEV__` check
   - Effort: SMALL (5 min)

2. **Mock Order Fallbacks** (`services/orderService.ts`)
   - Status: ✅ Properly commented, recently disabled for backend testing
   - Action: Keep disabled until Phase 4 (auto-driver matching)
   - Effort: N/A (done)

3. **Demo Products Mock** (`app/browse.tsx` lines 186-350)
   - Status: ✅ Fallback only if API fails; has clear comment
   - Action: Keep for demo; gate by `__DEV__` if desired
   - Effort: SMALL (optional)

4. **Demo Store in Product Detail** (`app/product-detail.tsx`)
   - Status: ⚠️ Has test console logs (lines 95-97)
   - Action: Remove debug logs
   - Effort: SMALL

5. **Seed Script** (`scripts/seed-demo-data.ts`)
   - Status: ✅ Properly organized; used for demo data generation
   - Action: Keep; document in README
   - Effort: N/A

---

## 2.3 File Organization Recommendations

**Current Structure:**

```
GlamGoMobile/
├── app/                    # Active Expo Router app
├── legacy/                 # Old prototypes (good)
├── services/               # Active services (good)
├── components/             # Active components (good)
├── scripts/                # Seed script (good)
├── docs/                   # Documentation (could use cleanup)
└── [Many markdown files]   # Documentation (needs organization)
```

**Recommended Reorganization:**

```
GlamGoMobile/
├── app/                           # Expo Router (no change)
├── services/                      # Active services (no change)
├── components/                    # Active components (no change)
├── legacy/                        # Archive old prototypes (✓ already has this)
│   ├── screens/
│   ├── components/
│   └── docs/
├── scripts/                       # Keep seed script
├── docs/                          # NEW: Move user-facing docs here
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── SETUP.md
├── _archive/                      # NEW: Store completed milestones
│   ├── PHASE_A_COMPLETE/
│   ├── ACTION_1_COMPLETE.md
│   └── ...
├── README.md                      # Active project overview
├── ROADMAP.md                     # Active roadmap
└── SECURITY_HYGIENE_AUDIT.md      # THIS FILE
```

**Action:** Create `/docs` and `/_archive` folders; move docs accordingly (1 hour).

---

# SECTION 3: PRIORITIZED SECURITY & CLEANUP TASKS

## Top 8 Tasks This Week

### 🔴 TASK 1: Remove Hardcoded Demo Credentials (30 min) - HIGH PRIORITY

**What:** Gate demo account quick-fill buttons behind `__DEV__` flag.

**Files to Touch:**

- `app/(auth)/sign-in.tsx`

**Changes:**

```typescript
// Before (lines 237-272)
<View style={styles.demoSection}>
  <Text style={styles.demoTitle}>🧪 Demo Accounts</Text>
  {/* 3 quick-fill buttons */}
</View>

// After
{__DEV__ && (
  <View style={styles.demoSection}>
    <Text style={styles.demoTitle}>🧪 Demo Accounts (Dev Only)</Text>
    {/* 3 quick-fill buttons */}
  </View>
)}
```

**Why It Matters:** Prevents accidental credential leak in release builds.

**Effort:** SMALL (5 min)

**Verification:**

```bash
# Dev build: buttons visible
npm run start

# Release build: buttons hidden
npm run build
```

---

### 🔴 TASK 2: Create Environment-Gated Logger Utility (1 hour) - HIGH PRIORITY

**What:** Create `utils/logger.ts` to gate console logs by environment.

**Files to Touch:**

- `utils/logger.ts` (NEW)
- All `console.log/error/warn` calls (systematic replacement)

**Changes:**

```typescript
// utils/logger.ts
const DEBUG = __DEV__;

export const logger = {
  info: (...args: any[]) => {
    if (DEBUG) console.log("[INFO]", ...args);
  },
  warn: (...args: any[]) => {
    if (DEBUG) console.warn("[WARN]", ...args);
  },
  error: (...args: any[]) => {
    // Always log errors for debugging
    console.error("[ERROR]", ...args);
  },
  debug: (...args: any[]) => {
    if (DEBUG) console.log("[DEBUG]", ...args);
  },
};

// Usage: logger.info('User ID:', userId); // Only in dev
```

**Replacement Plan:**

1. High-priority (sensitive data): `app/(auth)/sign-in.tsx`, `services/apiClient.ts`, `services/cognitoAuth.ts`
2. Medium-priority: `services/orderService.ts`, `app/_layout.tsx`
3. Low-priority: Other services and screens

**Why It Matters:** Prevents user data, auth tokens, and internal errors from leaking to production logs.

**Effort:** MEDIUM (1-1.5 hours with search/replace)

**Verification:**

```bash
# Verify no sensitive logs visible in release build
npm run build && npm run preview
# Search console for user IDs, emails, tokens - should find none
```

---

### 🟡 TASK 3: Remove ApiTestPanel Component (15 min) - MEDIUM PRIORITY

**What:** Delete `components/ApiTestPanel.tsx` (or move to `/legacy/components`).

**Files to Touch:**

- `components/ApiTestPanel.tsx` (DELETE)
- Check all imports (should find zero)

**Why It Matters:** Prevents accidental exposure of all API endpoints and health status if someone imports it later.

**Effort:** SMALL (5 min)

**Verification:**

```bash
grep -r "ApiTestPanel" app/
# Should find zero results
```

---

### 🟡 TASK 4: Remove Hardcoded Cognito IDs from Direct Import (30 min) - MEDIUM PRIORITY

**What:** Replace hardcoded Cognito pool IDs in `services/cognitoAuth.ts` with Amplify config import.

**Files to Touch:**

- `services/cognitoAuth.ts`
- `amplifyConfig.ts`

**Changes:**

```typescript
// services/cognitoAuth.ts - BEFORE
const poolData = {
  UserPoolId: "us-east-1_ZMKLKcE8r",
  ClientId: "7gn4qd0rl40ddb132l7g72c2sl",
};

// AFTER
import amplifyConfig from "../amplify_outputs.json";

const poolData = {
  UserPoolId: amplifyConfig.auth.user_pool_id,
  ClientId: amplifyConfig.auth.user_pool_client_id,
};
```

**Why It Matters:** Single source of truth for config; easier to rotate in future.

**Effort:** SMALL (15 min)

**Verification:**

```bash
npm run start
# Login with customer@test.com / Test1234!
# Should work identically
```

---

### 🟡 TASK 5: Clean Up Debug Console Logs in Product Detail Screen (20 min) - MEDIUM PRIORITY

**What:** Remove debug logs from `app/product-detail.tsx`.

**Files to Touch:**

- `app/product-detail.tsx`

**Changes:**

```typescript
// Lines 95-97: REMOVE
console.log("🔍 Product Detail Screen loaded");
console.log("📦 Params:", params);
console.log("🆔 Product ID:", productId);

// Line 101: GATE OR REMOVE
console.log("✅ Product loaded:", product?.name);
// → if (DEBUG) logger.info('Product loaded:', product?.name);
```

**Why It Matters:** Reduces noise in production logs; follows logging best practices.

**Effort:** SMALL (10 min, after logger.ts created)

---

### 🟡 TASK 6: Delete or Archive Unused Screens (45 min) - MEDIUM PRIORITY

**What:** Remove booking screen and duplicate role-preview screens.

**Files to Touch:**

- `app/booking.tsx` (DELETE or ARCHIVE)
- `app/role-preview-customer.tsx` (DELETE or keep as reference)
- `app/role-preview-vendor.tsx` (DELETE or keep as reference)
- `app/role-preview-driver.tsx` (DELETE or keep as reference)
- `legacy/screens/` (already exists, already archived)

**Decisions:**

- **Option A (Recommended):** Archive to `/legacy/screens/` (they're already there; just verify current app files are same, then delete current)
- **Option B:** Delete entirely if confident they're not used

**Verification:**

```bash
# Confirm no imports
grep -r "booking\.tsx" app/
grep -r "role-preview" app/

# If zero results, safe to delete
```

**Why It Matters:** Reduces confusion; makes codebase clearer about what's actually in production.

**Effort:** SMALL (15 min)

---

### 🟢 TASK 7: Add Explicit Token Cleanup on Logout (15 min) - LOW PRIORITY

**What:** Explicitly clear AsyncStorage tokens on logout (already done by Cognito, but good practice).

**Files to Touch:**

- `services/cognitoAuth.ts`

**Changes:**

```typescript
export const signOut = async () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCognitoUser(...);
    cognitoUser.globalSignOut((err) => {
      if (err) reject(err);

      // Explicitly clear tokens
      AsyncStorage.multiRemove([
        'idToken',
        'accessToken',
        'refreshToken',
        'cognitoUser'
      ]);

      resolve(true);
    });
  });
};
```

**Why It Matters:** Defense in depth; ensures tokens can't be recovered after logout.

**Effort:** SMALL (5 min)

**Verification:**

```bash
# Test logout flow
# Verify AsyncStorage is cleared (use React Native debugger)
```

---

### 🟢 TASK 8: Document Security Best Practices for Future Development (1 hour) - LOW PRIORITY

**What:** Create `SECURITY_BEST_PRACTICES.md` to guide future development.

**Files to Touch:**

- `docs/SECURITY_BEST_PRACTICES.md` (NEW)

**Content:**

```markdown
# Security Best Practices for GlamGo Development

## Secrets & Configuration

- ✅ All secrets must be in environment variables or AWS Secrets Manager
- ✅ Never hardcode API keys, tokens, or credentials
- ✅ Use Amplify's environment management for config rotation

## Logging

- ✅ Use logger.ts utility (gates logs by **DEV**)
- ✅ Never log: auth tokens, emails, user IDs, full errors
- ✅ OK to log: error messages, non-sensitive operation status

## Authentication

- ✅ Always use Cognito for auth (managed service)
- ✅ Store tokens in Keychain (iOS) / Secure Enclave (Android)
- ✅ Tokens auto-refresh via Amplify
- ✅ Clear tokens explicitly on logout

## API Security

- ✅ All endpoints use HTTPS (AWS enforces)
- ✅ Backend authorizer validates Cognito groups (not client role)
- ✅ Never trust client-side role for server-side decisions

## Testing

- ✅ Demo credentials gate behind **DEV**
- ✅ Remove demo UI before release
- ✅ Use Amplify Sandbox for generating test users

## Code Review Checklist

- [ ] No hardcoded secrets
- [ ] No sensitive data in logs
- [ ] Errors caught and handled (not swallowed)
- [ ] Tokens only stored in Keychain/Secure Enclave
- [ ] Backend validates all auth (not trusting client)
```

**Why It Matters:** Sets standards for team; prevents future security regressions.

**Effort:** SMALL (45 min to write)

---

# SECTION 4: SAFE DEFAULTS & PATTERNS GOING FORWARD

## 4.1 Secrets & Configuration Management

### Rule 1: Never Hardcode Secrets

```typescript
// ❌ WRONG
const API_KEY = "sk_live_...";

// ✅ RIGHT
const API_KEY = process.env.REACT_APP_API_KEY;
```

### Rule 2: Environment Configuration

```typescript
// amplifyConfig.ts
import amplifyConfig from "./amplify_outputs.json";
// Amplify auto-manages this from AWS backend

// For Phase 4 custom API Gateway:
// Use environment-specific configs:
// - Dev: LOCAL_API_URL = 'http://localhost:3001'
// - Staging: STAGING_API_URL = 'https://staging-api.glamgo.com'
// - Prod: PROD_API_URL = 'https://api.glamgo.com'
```

### Rule 3: Credential Rotation

- ✅ Cognito credentials: AWS manages rotation
- ✅ API keys: Store in AWS Secrets Manager, rotate monthly
- ✅ Database credentials: Use IAM roles (never store creds)

---

## 4.2 Mock Data & Demo Mode Handling

### Rule 1: Gate Demo Features

```typescript
// ✅ Correct pattern
const DEMO_MODE = __DEV__;

if (DEMO_MODE) {
  // Demo quick-fill buttons, mock data fallbacks, etc.
}

// Production build: automatically strips this code
```

### Rule 2: Mock Data Naming Convention

```typescript
// ✅ Correct: Obviously a mock
const MOCK_ORDER = { id: "MOCK-ORDER-001", status: "PENDING" };

// ⚠️ Confusing: Unclear if mock or real
const TEST_ORDER = { id: "order-001", status: "PENDING" };
```

### Rule 3: Fallback Strategy

```typescript
// ✅ Correct: Tries real first, falls back gracefully
try {
  const orders = await getOrders();
} catch (error) {
  logger.error("Failed to fetch orders:", error);
  showEmptyState(); // Don't show mock data silently
}

// ❌ Wrong: Silent fallback hides errors
try {
  const orders = await getOrders();
} catch {
  setOrders(MOCK_ORDERS); // Silent fallback misleads user
}
```

---

## 4.3 Logging Standards

### Rule 1: Allowed Logs by Environment

**DEVELOPMENT (`__DEV__`):**

- ✅ User IDs, emails, auth flows (for debugging)
- ✅ API request/response details
- ✅ Component lifecycle events
- ✅ State changes

**PRODUCTION:**

- ✅ Error messages (non-sensitive)
- ✅ Operation status (e.g., "Order created successfully")
- ❌ User IDs, emails, tokens
- ❌ Full error stack traces
- ❌ API request/response bodies

### Rule 2: Logging Utility Pattern

```typescript
// utils/logger.ts
export const logger = {
  // Development-only logs
  debug: (msg: string, data?: any) => {
    if (__DEV__) console.log(`[DEBUG] ${msg}`, data);
  },

  // Always logged (but sanitized in production)
  error: (msg: string, err: any) => {
    const sanitized = __DEV__ ? err : { message: err.message, code: err.code };
    console.error(`[ERROR] ${msg}`, sanitized);
  },

  // Non-sensitive operation logs
  info: (msg: string) => {
    console.log(`[INFO] ${msg}`);
  },
};
```

### Rule 3: Sensitive Data Redaction

```typescript
// ✅ Redact before logging
const redactEmail = (email: string) => {
  const [name, domain] = email.split("@");
  return `${name[0]}***@${domain}`;
};

logger.debug("User login:", { email: redactEmail(user.email) });
// Output: { email: 'c***@gmail.com' }
```

---

## 4.4 Folder Conventions

### Experimental / Spike Code

```
/components
├── Button.tsx              # Production
├── Card.tsx                # Production
└── _EXPERIMENTAL/
    ├── NewDesignButton.tsx  # Not used yet
    └── AnimatedCard.tsx     # Testing new animation library
```

**Rule:** Code in `_EXPERIMENTAL/` folders is:

- Not imported by production screens
- Documented with TODOs
- Reviewed before moving to production
- Deleted if abandoned

### Legacy / Archived Code

```
/legacy
├── screens/
│   ├── role-preview-customer.tsx  # v1 of role demo
│   └── OldDashboard.tsx            # Replaced by new Customer
├── components/
│   └── OldColorScheme.ts           # Replaced by useColorScheme
└── docs/
    └── PHASE_1_SPIKE.md            # Reference material
```

**Rule:** Legacy code is:

- Never imported by active code
- Clearly labeled `_OLD_` or in `/legacy`
- Kept for reference (helpful for understanding design decisions)
- Deleted if unused for >3 months

### Test/Debug Components

```
/components
├── ErrorBoundary.tsx       # Production (error handling)
└── _DEBUG/
    ├── ApiTestPanel.tsx    # Debug-only, not imported
    └── DevMenu.tsx         # Debug-only menu
```

**Rule:** Debug components are:

- Stored in `_DEBUG/` subfolder
- Never imported in production code
- Deleted before release
- If needed long-term, gate by `__DEV__`

---

## 4.5 API Security Patterns

### Rule 1: Backend Validates All Auth

```typescript
// ❌ WRONG: Trust client role
const updateOrder = async (orderId, status) => {
  if (userRole !== "VENDOR") return; // Client-side check
  await api.updateOrder(orderId, status);
};

// ✅ RIGHT: Backend validates
const updateOrder = async (orderId, status) => {
  // Send request
  // Backend checks Cognito groups before updating
  // Client doesn't decide authorization
  await api.updateOrder(orderId, status);
};
```

### Rule 2: Never Pass Tokens in URLs

```typescript
// ❌ WRONG
fetch(`https://api.glamgo.com/orders?token=${accessToken}`);

// ✅ RIGHT
fetch("https://api.glamgo.com/orders", {
  headers: { Authorization: `Bearer ${accessToken}` },
});
```

### Rule 3: Error Messages Shouldn't Leak Details

```typescript
// ❌ WRONG (leaks schema)
Alert.alert(
  "Error",
  'GraphQL error: Field "vendorId" not found on type "Order"',
);

// ✅ RIGHT (generic message)
Alert.alert("Error", "Failed to update order. Please try again.");
logger.error("API error:", error); // Log full details dev-only
```

---

# SECTION 5: IMPLEMENTATION ROADMAP

## This Week (March 12-14)

| Task                               | Effort             | Owner | Status  |
| ---------------------------------- | ------------------ | ----- | ------- |
| Task 1: Gate demo credentials      | 30 min             | Dev   | 🟡 TODO |
| Task 2: Create logger utility      | 1 hr               | Dev   | 🟡 TODO |
| Task 3: Remove ApiTestPanel        | 15 min             | Dev   | 🟡 TODO |
| Task 4: Deduplicate Cognito config | 30 min             | Dev   | 🟡 TODO |
| Task 5: Remove debug logs          | 20 min             | Dev   | 🟡 TODO |
| Task 6: Archive unused screens     | 45 min             | Dev   | 🟡 TODO |
| **Subtotal**                       | **3 hours 20 min** |       |         |

## Next Week (March 17-21)

| Task                      | Effort             | Owner     | Status      |
| ------------------------- | ------------------ | --------- | ----------- |
| Task 7: Token cleanup     | 15 min             | Dev       | 🟢 OPTIONAL |
| Task 8: Security doc      | 1 hr               | Tech Lead | 🟢 OPTIONAL |
| Review & test             | 1 hr               | Dev       | 🟡 TODO     |
| Prepare release checklist | 30 min             | Tech Lead | 🟡 TODO     |
| **Subtotal**              | **2 hours 45 min** |           |             |

## Pre-App Store (March 24-31)

| Task                          | Effort      | Owner    | Status      |
| ----------------------------- | ----------- | -------- | ----------- |
| Implement Keychain for tokens | 2 hrs       | Dev      | 🔴 REQUIRED |
| Final security audit          | 1 hr        | Security | 🔴 REQUIRED |
| Penetration testing           | 4 hrs       | External | 🔴 REQUIRED |
| Compliance review             | 1 hr        | Legal    | 🔴 REQUIRED |
| **Subtotal**                  | **8 hours** |          |             |

---

# SECTION 6: RISK SUMMARY & SIGN-OFF

## Current Risk Level: MEDIUM ⚠️

**Acceptable for internal beta. Not acceptable for production without fixes.**

### Immediate Action Items (This Week)

1. ✅ Gate demo credentials (prevents accidental leak)
2. ✅ Create logger utility (prevents log leaks)
3. ✅ Remove debug components (reduces attack surface)

### Nice-to-Have (Next Week)

4. Deduplicate config
5. Clean up logs
6. Archive old code

### Before Release (March 24+)

7. Migrate tokens to Keychain
8. Final security audit
9. Penetration testing

---

## Sign-Off Checklist

- [ ] Team lead reviewed audit findings
- [ ] Security-critical issues documented
- [ ] Logging strategy agreed upon
- [ ] Cleanup tasks prioritized
- [ ] Timeline confirmed with team
- [ ] Pre-release checklist prepared

---

## Questions for Team Lead

1. **Demo Credentials:** Remove before release or gate with feature flag?
   - Recommend: Gate with `__DEV__` (simpler, keeps for demos)

2. **Logging:** Implement logger utility immediately or closer to release?
   - Recommend: This week (takes 1 hour, prevents future issues)

3. **Legacy Code:** Keep `/legacy` folder or delete entirely?
   - Recommend: Keep (useful reference for design decisions)

4. **Keychain Migration:** Phase 4 or critical before release?
   - Recommend: Phase 4 (current setup is acceptable, but flag for pre-release)

5. **Third-Party Analytics:** Planning to integrate Sentry/DataDog?
   - If yes: Ensure console logs are not auto-captured
   - If no: Plan for Phase 5 (monitoring post-launch)

---

**Report Prepared By:** Senior Security Engineer  
**Date:** March 12, 2026  
**Confidentiality:** INTERNAL - DO NOT SHARE  
**Review Frequency:** Monthly (during beta) → Quarterly (after launch)
