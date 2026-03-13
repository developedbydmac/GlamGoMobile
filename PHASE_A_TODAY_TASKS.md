# Phase A - TODAY'S WORK (6-8 Hours)

**Date:** March 12, 2026  
**Goal:** Make demo flows work smoothly for tomorrow

---

## ✅ TASK CHECKLIST (Complete in Order)

### **TASK A2: Seed Test Data** ⏱️ 30 minutes 🔥 CRITICAL

**Why First:** Nothing works without data

**What to Create:**

```typescript
// 1 Store Record
{
  name: "Glam Beauty Boutique",
  ownerId: "vendor-user-id", // Get from Cognito
  description: "Luxury beauty products",
  isOpen: true
}

// 5 Product Records
1. {
  name: "Luxury Lipstick",
  category: "Makeup",
  price: 35.00,
  imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
  storeId: "store-id-from-above",
  inStock: true,
  quantity: 50
}

2. {
  name: "Anti-Aging Serum",
  category: "Skincare",
  price: 65.00,
  imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
  storeId: "store-id-from-above",
  inStock: true,
  quantity: 30
}

3. {
  name: "Volumizing Shampoo",
  category: "Haircare",
  price: 28.00,
  imageUrl: "https://images.unsplash.com/photo-1571875257727-256c39da42af",
  storeId: "store-id-from-above",
  inStock: true,
  quantity: 40
}

4. {
  name: "Midnight Musk Perfume",
  category: "Fragrance",
  price: 85.00,
  imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601",
  storeId: "store-id-from-above",
  inStock: true,
  quantity: 25
}

5. {
  name: "Gold Hoop Earrings",
  category: "Accessories",
  price: 45.00,
  imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
  storeId: "store-id-from-above",
  inStock: true,
  quantity: 20
}
```

**How to Seed:**

**Option 1: Use Amplify Console (Recommended)**

```typescript
// Navigate to Amplify console → Data → Run query
// Execute GraphQL mutations:

mutation CreateStore {
  createStore(input: {
    name: "Glam Beauty Boutique"
    ownerId: "YOUR_VENDOR_USER_ID"
    description: "Luxury beauty products"
    isOpen: true
  }) {
    id
    name
  }
}

mutation CreateProduct {
  createProduct(input: {
    name: "Luxury Lipstick"
    category: "Makeup"
    price: 35.00
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa"
    storeId: "STORE_ID_FROM_ABOVE"
    inStock: true
    quantity: 50
  }) {
    id
    name
  }
}

// Repeat for all 5 products
```

**Option 2: Create Script**
Create `scripts/seed-demo-data.ts` with client.models.Store.create() calls

**Verification:**

- Login as customer@test.com
- Navigate to Browse screen
- Should see 5 products

---

### **TASK A1: Add "Add to Cart" Buttons** ⏱️ 45 minutes 🔥 CRITICAL

**File:** `app/browse.tsx`

**Changes Needed:**

1. Import cart context at top:

```typescript
import useCartStore from "@/contexts/CartContext";
```

2. Get addItem function:

```typescript
const { addItem } = useCartStore();
```

3. Find the product card rendering (around line 400-500)
4. Add button inside each product card:

```typescript
<TouchableOpacity
  style={styles.addToCartButton}
  onPress={() => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || product.image,
      storeName: product.storeName,
      storeId: product.storeId,
    });
    Alert.alert('Added to Cart', `${product.name} added successfully!`);
  }}
>
  <Ionicons name="cart-outline" size={20} color={Colors.neutral.white} />
  <Text style={styles.addToCartText}>Add to Cart</Text>
</TouchableOpacity>
```

5. Add styles at bottom:

```typescript
addToCartButton: {
  flexDirection: 'row',
  backgroundColor: Colors.primary.royalPurple,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: BorderRadius.md,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: Spacing.sm,
  gap: 6,
},
addToCartText: {
  color: Colors.neutral.white,
  fontSize: Typography.fontSize.sm,
  fontWeight: Typography.fontWeight.semibold,
},
```

**Test:** Browse → Click "Add to Cart" → See alert → Navigate to Cart → Item appears

---

### **TASK A6: Fix Loading States** ⏱️ 20 minutes ⚡ POLISH

**File:** `app/browse.tsx`

**Changes Needed:**

1. Verify `loading` state exists (should be around line 80-100)
2. Ensure `loading` is set to `true` before fetching products:

```typescript
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadProducts();
}, []);

const loadProducts = async () => {
  try {
    setLoading(true);
    const products = await getAllProducts();
    setAllProducts(products);
    setFilteredProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  } finally {
    setLoading(false);
  }
};
```

3. Verify skeleton loaders render when `loading === true` (should already exist around line 300-400)

**Test:** Refresh browse screen → See skeleton animation briefly → Products load

---

### **TASK A4: Add Checkout Button** ⏱️ 1.5 hours 🔥 CRITICAL

**File:** `app/(customer)/cart.tsx`

**Changes Needed:**

1. Import order service at top:

```typescript
import { createOrder } from "@/services/orderService";
import { getCurrentUser } from "aws-amplify/auth";
```

2. Add loading state:

```typescript
const [placingOrder, setPlacingOrder] = useState(false);
```

3. Replace current `handleCheckout` function (around line 50):

```typescript
const handleCheckout = async () => {
  if (items.length === 0) {
    Alert.alert("Cart Empty", "Add items to your cart first");
    return;
  }

  try {
    setPlacingOrder(true);

    // Get current user
    const user = await getCurrentUser();

    // Create order with items
    const order = await createOrder({
      customerEmail: user.signInDetails?.loginId || "",
      deliveryAddress: "123 Demo St", // TODO: Get from user profile
      deliveryCity: "Los Angeles",
      deliveryState: "CA",
      deliveryZipCode: "90001",
      totalAmount: total,
    });

    // Show success
    Alert.alert(
      "Order Placed!",
      `Order #${order.id.slice(0, 8)} created successfully`,
      [
        {
          text: "View Orders",
          onPress: () => {
            clearCart();
            router.push("/(customer)/orders");
          },
        },
      ],
    );
  } catch (error) {
    console.error("Error placing order:", error);
    Alert.alert("Error", "Failed to place order. Please try again.");
  } finally {
    setPlacingOrder(false);
  }
};
```

4. Update checkout button (find the button around line 200-250):

```typescript
<TouchableOpacity
  style={[styles.checkoutButton, placingOrder && styles.checkoutButtonDisabled]}
  onPress={handleCheckout}
  disabled={placingOrder || items.length === 0}
>
  <Text style={styles.checkoutButtonText}>
    {placingOrder ? 'Placing Order...' : `Place Order • $${total.toFixed(2)}`}
  </Text>
</TouchableOpacity>
```

5. Add disabled style:

```typescript
checkoutButtonDisabled: {
  opacity: 0.6,
},
```

**Test:** Cart with items → Click "Place Order" → See success alert → Cart clears → Navigate to orders

---

### **TASK A5: Populate Order History** ⏱️ 1 hour 🔥 CRITICAL

**File:** `app/(customer)/orders.tsx`

**Replace entire file with:**

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/DesignSystem';
import { getMyOrders, Order } from '@/services/orderService';

export default function CustomerOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const customerOrders = await getMyOrders();
      // Sort by newest first
      const sorted = customerOrders.sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
      setOrders(sorted);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return Colors.accent.coral;
      case 'CONFIRMED':
        return Colors.secondary.mintGreen;
      case 'PICKED_UP':
        return Colors.primary.royalPurple;
      case 'DELIVERED':
        return Colors.secondary.mintGreen;
      case 'CANCELLED':
        return Colors.neutral.ashGray;
      default:
        return Colors.neutral.charcoal;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>Order #{item.id.slice(0, 8).toUpperCase()}</Text>
          <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color={Colors.neutral.charcoal} />
          <Text style={styles.detailText} numberOfLines={1}>
            {item.deliveryAddress}, {item.deliveryCity}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color={Colors.neutral.charcoal} />
          <Text style={styles.detailText}>${item.totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.primary.royalPurple} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Ionicons name="receipt" size={32} color={Colors.primary.deepPlum} />
        <Text style={styles.title}>My Orders</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="receipt-outline" size={64} color={Colors.neutral.ashGray} />
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubtext}>Your orders will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.deepPlum,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.charcoal,
  },
  emptyText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.charcoal,
    marginTop: Spacing.lg,
  },
  emptySubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.ashGray,
    marginTop: Spacing.sm,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  orderCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: Colors.neutral.deepCharcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  orderNumber: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.deepPlum,
  },
  orderDate: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.ashGray,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.white,
    textTransform: 'uppercase',
  },
  orderDetails: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.charcoal,
    flex: 1,
  },
});
```

**Test:** Place order from cart → Navigate to orders → See order with status badge and details

---

### **TASK A3: Connect Vendor Orders (OPTIONAL - If Time)** ⏱️ 2 hours ⚡ NICE TO HAVE

**File:** `app/(vendor)/orders.tsx`

**Only do this if Tasks A1-A6 are complete and working!**

**Changes Needed:**

1. Import order service:

```typescript
import { getMyOrders, updateOrderStatus } from "@/services/orderService";
```

2. Replace mock data loading with real API (around line 48-60):

```typescript
const loadOrders = async () => {
  try {
    setLoading(true);
    const vendorOrders = await getMyOrders();
    // Filter based on current filter
    let filtered = vendorOrders;
    if (filter !== "ALL") {
      filtered = vendorOrders.filter((o) => o.status === filter);
    }
    setOrders(filtered);
  } catch (error) {
    console.error("Error loading orders:", error);
  } finally {
    setLoading(false);
  }
};
```

3. Update handleAcceptOrder and handleDeclineOrder to call real API

**Test:** Login as vendor → Orders tab → See real orders → Accept one → Status changes

---

### **TASK A7: Test Complete Flow** ⏱️ 45 minutes 🔥 CRITICAL

**Test Script:**

1. **Start fresh:**
   - Kill app
   - Restart Amplify sandbox
   - Restart Expo
   - Clear app data if needed

2. **Customer Flow:**
   - [ ] Login as customer@test.com
   - [ ] Navigate to Browse
   - [ ] See 5 products load (from A2 seed data)
   - [ ] Filter by "Makeup" category
   - [ ] Search for "lipstick"
   - [ ] Click "Add to Cart" on 3 different products
   - [ ] See success alerts
   - [ ] Navigate to Cart tab
   - [ ] See 3 items with correct prices
   - [ ] Update quantity on one item
   - [ ] Remove one item
   - [ ] Click "Place Order"
   - [ ] See success alert
   - [ ] Cart clears
   - [ ] Navigate to Orders tab
   - [ ] See order with PENDING status
   - [ ] Log out

3. **Vendor Flow:**
   - [ ] Login as vendor@test.com
   - [ ] Navigate to Products
   - [ ] See seeded products
   - [ ] Click Add Product
   - [ ] Fill in details
   - [ ] Save successfully
   - [ ] Edit existing product
   - [ ] Change price
   - [ ] Save successfully
   - [ ] Log out

4. **Admin Flow:**
   - [ ] Login as admin@test.com
   - [ ] See pending users
   - [ ] Approve one vendor
   - [ ] See success message
   - [ ] Log out

5. **Record Issues:**
   - [ ] Any crashes?
   - [ ] Any blank screens?
   - [ ] Any error messages?
   - [ ] Anything not working as expected?

**Fix issues immediately before moving to A8**

---

### **TASK A8: Create Demo Script** ⏱️ 30 minutes 🔥 CRITICAL

**Already done!** See `DEMO_SCRIPT_MARCH_13.md`

**Your job:**

1. Read it 3 times
2. Practice talking points out loud
3. Add notes based on what you learned in A7 testing
4. Print the quick reference card: `DEMO_QUICK_REFERENCE_CARD.md`

---

## 🎯 END OF DAY CHECKLIST

- [ ] A2: Database has 1 store + 5 products ✅
- [ ] A1: Browse has "Add to Cart" buttons ✅
- [ ] A6: Browse shows loading states ✅
- [ ] A4: Cart has "Place Order" button working ✅
- [ ] A5: Orders screen shows order history ✅
- [ ] A7: Complete customer flow tested (no crashes) ✅
- [ ] A8: Demo script read 3 times ✅
- [ ] Git commit: "Phase A complete - demo ready" ✅
- [ ] Git push to GitHub ✅

**Optional:**

- [ ] A3: Vendor orders connected to backend ✅

---

## 📋 TOMORROW MORNING PREP (30 min before demo)

- [ ] Device charged 100%
- [ ] `npx ampx sandbox` running
- [ ] `npm start` running
- [ ] App loaded on device
- [ ] Test login as each role
- [ ] Verify products visible
- [ ] Do Not Disturb mode ON
- [ ] Demo script open on laptop
- [ ] Water/coffee ready

---

## 🚀 YOU'RE READY!

**What you'll have after Phase A:**

- Working customer browse → cart → checkout → history flow ✅
- Working vendor product management ✅
- Working admin approval ✅
- Polished loading states ✅
- Test data in database ✅
- Confidence for tomorrow's demo ✅

**Now execute. You got this!** 💪

---

**Estimated Total Time:** 6.5 hours (realistic)  
**Start Time:** ****\_****  
**End Time:** ****\_****  
**Actual Time:** ****\_****
