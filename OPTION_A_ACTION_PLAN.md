# Option A: Fix & Test Phase - Action Plan

**Start Date:** February 11, 2026  
**Goal:** Fix authentication, test product creation, connect real data  
**Timeline:** 2-3 days

---

## Priority 1: Fix Sign-In Authentication 🔴

### Current Status
- ✅ amplify_outputs.json exists and is valid
- ✅ Cognito User Pool: `us-east-1_ZMKLKcE8r`
- ✅ User Pool Client: `7gn4qd0rl40ddb132l7g72c2sl`
- ✅ Email-based authentication configured
- ✅ Custom role attribute defined
- ✅ Sign-up works perfectly
- ❌ Sign-in throws unknown error

### Diagnosis Steps

#### Step 1: Check Cognito User Pool Client Settings
```bash
aws cognito-idp describe-user-pool-client \
  --user-pool-id us-east-1_ZMKLKcE8r \
  --client-id 7gn4qd0rl40ddb132l7g72c2sl \
  --region us-east-1
```

**Look for:**
- `ExplicitAuthFlows` should include `ALLOW_USER_SRP_AUTH`
- `PreventUserExistenceErrors` setting
- Any app client secret (shouldn't have one for mobile)

#### Step 2: Test with AWS CLI
```bash
# Try to authenticate directly
aws cognito-idp initiate-auth \
  --auth-flow USER_SRP_AUTH \
  --client-id 7gn4qd0rl40ddb132l7g72c2sl \
  --auth-parameters USERNAME=<test-email>,SRP_A=<srp-value> \
  --region us-east-1
```

#### Step 3: Check User Status
```bash
# List users to verify account status
aws cognito-idp list-users \
  --user-pool-id us-east-1_ZMKLKcE8r \
  --region us-east-1
```

**Verify:**
- User status is `CONFIRMED` not `UNCONFIRMED`
- Email is verified
- custom:role attribute is set

#### Step 4: Add Enhanced Logging
Update `app/(auth)/sign-in.tsx` with detailed error logging:

```typescript
try {
  console.log("=== SIGN-IN DEBUG START ===");
  console.log("Email:", email.trim().toLowerCase());
  console.log("Password length:", password.length);
  
  const result = await signIn({
    username: email.trim().toLowerCase(),
    password,
  });
  
  console.log("Sign-in result:", JSON.stringify(result, null, 2));
  console.log("=== SIGN-IN DEBUG END ===");
  
  // ... rest of code
} catch (error: any) {
  console.error("=== SIGN-IN ERROR START ===");
  console.error("Error name:", error.name);
  console.error("Error code:", error.code);
  console.error("Error message:", error.message);
  console.error("Full error:", JSON.stringify(error, null, 2));
  console.error("=== SIGN-IN ERROR END ===");
  
  // ... rest of error handling
}
```

### Common Causes & Solutions

#### Issue: USER_SRP_AUTH not enabled
**Symptom:** "Auth flow not enabled for this client"  
**Solution:** Update Cognito client to enable SRP auth flow

#### Issue: User not confirmed
**Symptom:** "UserNotConfirmedException"  
**Solution:** Ensure verification code was entered correctly

#### Issue: Wrong password policy
**Symptom:** Password doesn't meet requirements  
**Solution:** Check password requirements match sign-up validation

#### Issue: Client secret exists
**Symptom:** "Unable to verify secret hash for client"  
**Solution:** Remove client secret (mobile apps shouldn't have secrets)

#### Issue: Amplify version mismatch
**Symptom:** Random errors  
**Solution:** Check package versions are compatible

### Implementation Plan

**Action 1:** Run AWS CLI commands to inspect configuration ✅ (Next)
**Action 2:** Add enhanced logging to sign-in screen
**Action 3:** Test sign-in with detailed logs
**Action 4:** Apply fix based on diagnosis
**Action 5:** Verify fix with multiple test accounts
**Action 6:** Remove debug logging (keep essential logs)

---

## Priority 2: Test Product Creation Flow 🧪

### Pre-requisites
- [ ] Sign-in authentication working
- [ ] Test vendor account created
- [ ] Sandbox running

### Testing Protocol

#### Test Case 1: Create First Product
```
1. Sign in as vendor
2. Navigate to "Create Product" tab
3. Click "Select Store" → "Create New Store"
4. Enter store name: "Glam Beauty Bar"
5. Fill product form:
   - Name: "Premium Hair Treatment"
   - Description: "Luxury keratin treatment"
   - Category: Hair Care
   - Price: 125.00
   - Inventory: 10
6. Submit
7. Expected: Success message + product ID
8. Verify: Check DynamoDB for product record
```

#### Test Case 2: Verify Owner Authorization
```
1. Create product as Vendor A
2. Sign out
3. Sign in as Vendor B
4. Try to edit Vendor A's product
5. Expected: Authorization error or hidden from UI
```

#### Test Case 3: Multiple Products
```
1. Sign in as vendor
2. Create 5 different products
3. Verify all appear in product list
4. Check inventory counts are correct
```

#### Verification Queries

**Check products in DynamoDB:**
```bash
aws dynamodb scan \
  --table-name Product-<sandbox-id> \
  --region us-east-1
```

**Check owner field is set:**
```bash
aws dynamodb query \
  --table-name Product-<sandbox-id> \
  --key-condition-expression "owner = :owner" \
  --expression-attribute-values '{":owner":{"S":"<user-sub>"}}' \
  --region us-east-1
```

### Expected Results
- ✅ Product saves to database
- ✅ owner field matches user.sub
- ✅ Store association correct
- ✅ All fields properly formatted
- ✅ Timestamps accurate

---

## Priority 3: Connect Browse to Real Data 📡

### Current State
- Browse screen shows mock data
- ProductCard component ready
- GraphQL API live

### Implementation Steps

#### Step 1: Create GraphQL Query Hook

Create `hooks/useProducts.ts`:
```typescript
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { useState, useEffect } from 'react';

const client = generateClient<Schema>();

export function useProducts() {
  const [products, setProducts] = useState<Schema['Product']['type'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, errors } = await client.models.Product.list({
        filter: { isAvailable: { eq: true } }
      });
      
      if (errors) {
        console.error('GraphQL errors:', errors);
        setError('Failed to load products');
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
}
```

#### Step 2: Update Browse Screen

Replace mock data in `app/browse.tsx`:
```typescript
import { useProducts } from '@/hooks/useProducts';

// Inside component:
const { products, loading, error } = useProducts();

// Replace mock products section with:
{loading ? (
  <ActivityIndicator size="large" color="#4A2B7C" />
) : error ? (
  <Text style={styles.error}>{error}</Text>
) : products.length === 0 ? (
  <Text style={styles.emptyState}>No products available yet</Text>
) : (
  <FlatList
    data={products}
    renderItem={({ item }) => <ProductCard product={item} />}
    keyExtractor={(item) => item.id}
    numColumns={2}
  />
)}
```

#### Step 3: Add Category Filtering

```typescript
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

const filteredProducts = selectedCategory
  ? products.filter(p => p.category === selectedCategory)
  : products;
```

#### Step 4: Add Search

```typescript
const [searchQuery, setSearchQuery] = useState('');

const searchedProducts = filteredProducts.filter(p =>
  p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  p.description?.toLowerCase().includes(searchQuery.toLowerCase())
);
```

### Testing
- [ ] Products load on browse screen
- [ ] ProductCard displays real data correctly
- [ ] Category filtering works
- [ ] Search returns relevant results
- [ ] Loading states display properly
- [ ] Empty state shows when no products

---

## Priority 4: Build Product Listing Screen 📱

### Requirements
- Show authenticated users their products
- Vendor sees their products only
- Customers see all available products
- Search and filter functionality

### File: `app/(tabs)/products.tsx`

```typescript
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

export default function ProductsScreen() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => router.push(`/products/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}
```

### Add to Tab Navigation

Update `app/(tabs)/_layout.tsx`:
```typescript
<Tabs.Screen
  name="products"
  options={{
    title: 'Products',
    tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-bag" color={color} />,
  }}
/>
```

---

## Timeline & Milestones

### Day 1 (Today) - Authentication Fix
**Morning:**
- [x] Review current setup
- [x] Create action plan
- [ ] Run AWS CLI diagnostics
- [ ] Identify root cause

**Afternoon:**
- [ ] Implement fix
- [ ] Test with multiple accounts
- [ ] Verify sign-in works consistently

**Evening:**
- [ ] Update documentation
- [ ] Push fix to GitHub

### Day 2 - Product Creation Testing
**Morning:**
- [ ] Create test vendor accounts
- [ ] Test product creation flow
- [ ] Verify database writes

**Afternoon:**
- [ ] Test authorization rules
- [ ] Create 10-20 test products
- [ ] Verify owner field enforcement

**Evening:**
- [ ] Document test results
- [ ] Fix any issues found

### Day 3 - Real Data Integration
**Morning:**
- [ ] Create useProducts hook
- [ ] Update browse screen
- [ ] Test data fetching

**Afternoon:**
- [ ] Add filtering and search
- [ ] Build products tab
- [ ] Test on iOS/Android/Web

**Evening:**
- [ ] Polish UI/UX
- [ ] Performance testing
- [ ] Client demo prep

---

## Success Criteria

### Authentication ✅
- [ ] Users can sign in with email/password
- [ ] Session persists across app restarts
- [ ] Error messages are clear and helpful
- [ ] No console errors

### Product Creation ✅
- [ ] Vendors can create products
- [ ] Products save to database correctly
- [ ] Owner field populated automatically
- [ ] Form validation works
- [ ] Success/error states clear

### Real Data ✅
- [ ] Browse shows real products
- [ ] Products load quickly (<2s)
- [ ] Images display or fallback to placeholder
- [ ] Category filtering works
- [ ] Search returns relevant results

### User Experience ✅
- [ ] Smooth navigation between screens
- [ ] Loading states display appropriately
- [ ] Empty states are helpful
- [ ] Error states suggest solutions
- [ ] Professional appearance throughout

---

## Risk Mitigation

**Risk:** Sign-in fix takes longer than expected  
**Mitigation:** Can test product creation manually via AWS CLI/Console

**Risk:** Authorization rules don't work as expected  
**Mitigation:** Comprehensive testing with multiple user accounts

**Risk:** Performance issues with many products  
**Mitigation:** Implement pagination and lazy loading

**Risk:** Images don't load  
**Mitigation:** Graceful fallbacks with placeholder images

---

## Tools & Commands

### Start Development
```bash
# Terminal 1: Expo
npx expo start --tunnel

# Terminal 2: Sandbox
cd amplify && npx ampx sandbox

# Terminal 3: Logs
npx expo start --tunnel | grep -E "(error|ERROR|Error)"
```

### AWS Debugging
```bash
# Check Cognito config
aws cognito-idp describe-user-pool --user-pool-id us-east-1_ZMKLKcE8r

# List users
aws cognito-idp list-users --user-pool-id us-east-1_ZMKLKcE8r

# Check products
aws dynamodb scan --table-name <Product-table-name>
```

### Testing
```bash
# Run TypeScript checks
npx tsc --noEmit

# Check for errors
npx eslint .
```

---

**Next Action:** Run AWS CLI diagnostics on Cognito User Pool Client
