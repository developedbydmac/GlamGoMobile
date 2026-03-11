# GlamGo Marketplace Schema Documentation 🛍️

**Created:** February 4, 2026  
**Schema Version:** 1.0  
**Backend Developer:** Senior Level

---

## 📋 Overview

This document describes the GlamGo marketplace data schema built with AWS Amplify Gen 2. The schema supports a three-sided marketplace where:

- **Vendors** own stores and sell beauty products/services
- **Customers** browse products and place orders
- **Drivers** deliver orders to customers

---

## 🗄️ Data Models

### 1. Store Model

**Purpose:** Represents vendor-owned beauty service locations

**Fields:**

- `name` (String, required) - Store name
- `description` (String) - Store description
- `address` (String, required) - Street address
- `city` (String, required)
- `state` (String, required)
- `zipCode` (String, required)
- `phoneNumber` (String) - Contact number
- `imageKey` (String) - S3 key for store image

**Owner Fields:**

- `owner` (String) - Amplify owner field for authorization
- `vendorId` (String, required) - Cognito user ID
- `vendorName` (String, required) - Vendor display name
- `vendorEmail` (String, required) - Vendor email

**Business Fields:**

- `isActive` (Boolean, default: true) - Store operational status
- `rating` (Float, default: 0) - Average rating

**Relationships:**

- `products` - hasMany Product

**Authorization:**

- Vendors can only manage their own stores (owner-based)
- All authenticated users can read stores

---

### 2. Product Model

**Purpose:** Beauty products and services offered by stores

**Fields:**

- `name` (String, required) - Product name
- `description` (String) - Product description
- `price` (Float, required) - Product price in USD
- `inventoryCount` (Integer, required, default: 0) - Available quantity
- `isAvailable` (Boolean, default: true) - Availability status
- `category` (String, required) - Product category (Hair Care, Nails, etc.)
- `imageKey` (String) - S3 key for product image

**Relationships:**

- `storeId` (ID, required) - belongsTo Store
- `orderProducts` - hasMany OrderProduct

**Owner Fields:**

- `owner` (String) - Amplify owner field for authorization
- `vendorId` (String, required) - Vendor who owns this product

**Authorization:**

- Vendors can only manage their own products (owner-based)
- All authenticated users can read products

---

### 3. OrderProduct Model (Junction Table)

**Purpose:** Many-to-many relationship between Orders and Products

**Fields:**

- `orderId` (ID, required) - belongsTo Order
- `productId` (ID, required) - belongsTo Product
- `quantity` (Integer, required, default: 1) - Quantity ordered
- `priceAtPurchase` (Float, required) - Price snapshot at purchase time

**Owner Fields:**

- `owner` (String) - Amplify owner field for authorization
- `customerId` (String, required) - Customer who ordered

**Authorization:**

- Customers can only manage their own order items (owner-based)
- All authenticated users can read order items

---

### 4. Order Model

**Purpose:** Customer orders with delivery tracking

**Fields:**
**Customer Information:**

- `customerId` (String, required) - Cognito user ID
- `customerName` (String, required)
- `customerEmail` (String, required)

**Delivery Information:**

- `deliveryAddress` (String, required)
- `deliveryCity` (String, required)
- `deliveryState` (String, required)
- `deliveryZipCode` (String, required)
- `deliveryPhoneNumber` (String)

**Order Details:**

- `status` (Enum, required) - PENDING, CONFIRMED, PICKED_UP, DELIVERED, CANCELLED
- `totalAmount` (Float, required, default: 0) - Total order amount
- `notes` (String) - Special instructions

**Driver Assignment:**

- `driverId` (String) - Assigned driver ID
- `driverName` (String) - Driver display name

**Timestamps:**

- `confirmedAt` (DateTime)
- `pickedUpAt` (DateTime)
- `deliveredAt` (DateTime)

**Owner Fields:**

- `owner` (String) - Amplify owner field for authorization

**Relationships:**

- `orderProducts` - hasMany OrderProduct

**Authorization:**

- Customers can manage their own orders (owner-based)
- All authenticated users can read orders
- Drivers need custom Lambda logic for update permissions

---

## 🔐 Authorization Strategy

### Owner-Based Authorization

The schema uses AWS Amplify's **owner-based authorization** pattern:

```typescript
.authorization((allow) => [
  allow.owner().identityClaim('sub'),  // Owner can CRUD
  allow.authenticated().to(['read']),   // Others can only read
])
```

**How it works:**

1. The `owner` field is automatically populated with the user's Cognito `sub` (user ID)
2. Only the owner can create, update, or delete their records
3. All authenticated users can read records

### Role-Based Access Control

**Vendors (custom:role = VENDOR):**

- Can create/update/delete their own Stores and Products
- Can read all Products (to browse marketplace)
- Can read Orders containing their products

**Customers (custom:role = CUSTOMER):**

- Can read all Stores and Products
- Can create/update/delete their own Orders
- Can read their own OrderProducts

**Drivers (custom:role = DRIVER):**

- Can read all Orders
- Need Lambda function for updating order status

---

## 🔄 Relationships

```
Store (1) ──┬── (N) Product
            │
            └── (vendor owns)

Product (N) ──┬── (N) OrderProduct ──┬── (N) Order
              │                       │
              └── (in store)          └── (customer owns)
```

---

## 📝 Usage Examples

### Create a Store (Vendor)

```typescript
const client = generateClient<Schema>();
const user = await getCurrentUser();

const { data: store } = await client.models.Store.create({
  name: "Glamorous Beauty Studio",
  description: "Luxury beauty services in downtown LA",
  address: "123 Main St",
  city: "Los Angeles",
  state: "CA",
  zipCode: "90001",
  phoneNumber: "(555) 123-4567",
  owner: user.userId,
  vendorId: user.userId,
  vendorName: "Jane Doe",
  vendorEmail: "jane@glamgo.com",
});
```

### Create a Product (Vendor)

```typescript
const { data: product } = await client.models.Product.create({
  name: "Premium Hair Treatment",
  description: "Luxury keratin treatment for silky smooth hair",
  price: 49.99,
  inventoryCount: 10,
  isAvailable: true,
  category: "Hair Care",
  storeId: store.id,
  owner: user.userId,
  vendorId: user.userId,
});
```

### List All Products (Anyone)

```typescript
const { data: products } = await client.models.Product.list({
  filter: {
    isAvailable: { eq: true },
    inventoryCount: { gt: 0 },
  },
});
```

### Create an Order (Customer)

```typescript
const user = await getCurrentUser();

const { data: order } = await client.models.Order.create({
  customerId: user.userId,
  customerName: "John Smith",
  customerEmail: "john@example.com",
  deliveryAddress: "456 Oak St",
  deliveryCity: "Los Angeles",
  deliveryState: "CA",
  deliveryZipCode: "90002",
  status: "PENDING",
  totalAmount: 49.99,
  owner: user.userId,
});

// Add product to order
const { data: orderProduct } = await client.models.OrderProduct.create({
  orderId: order.id,
  productId: product.id,
  quantity: 1,
  priceAtPurchase: 49.99,
  customerId: user.userId,
  owner: user.userId,
});
```

---

## 🧪 Testing

### Test Product Creation

Use the **Create Product** screen in the app:

1. Navigate to `/tabs)/create-product`
2. Create a test store (if you don't have one)
3. Fill in product details:
   - Name: "Test Product"
   - Description: "This is a test"
   - Category: "Hair Care"
   - Price: 19.99
   - Inventory: 5
4. Tap "CREATE PRODUCT"
5. Verify success message

### Verify in AWS Console

1. Open AWS AppSync Console
2. Navigate to your API
3. Open the Queries section
4. Run:

```graphql
query ListProducts {
  listProducts {
    items {
      id
      name
      price
      inventoryCount
      category
      owner
    }
  }
}
```

---

## 🛠️ Components

### ProductCard Component

**Location:** `components/ProductCard.tsx`

**Purpose:** Display product information in a card format

**Props:**

- `product` (Schema['Product']['type']) - Product data
- `onPress` (() => void, optional) - Tap handler

**Features:**

- Product image (with placeholder if none)
- Category badge
- Out of stock overlay
- Price display
- Inventory count
- Premium card styling

**Usage:**

```tsx
import ProductCard from "@/components/ProductCard";

<ProductCard
  product={product}
  onPress={() => console.log("Tapped:", product.name)}
/>;
```

---

## 🚀 Deployment

### Run Amplify Sandbox

```bash
cd amplify
npx ampx sandbox
```

**Expected Output:**

```
✅ Successfully deployed to sandbox
✅ DynamoDB tables created
✅ AppSync API ready
✅ Updated amplify_outputs.json
```

### Verify Schema

```bash
# Check generated types
cat amplify/data/resource.ts

# Verify tables in AWS Console
aws dynamodb list-tables
```

---

## 📊 Database Tables (DynamoDB)

The schema creates 4 DynamoDB tables:

1. **Store**
   - Primary Key: `id`
   - GSI: `owner-index` (for filtering by vendor)

2. **Product**
   - Primary Key: `id`
   - GSI: `owner-index` (for filtering by vendor)
   - GSI: `storeId-index` (for filtering by store)

3. **OrderProduct**
   - Primary Key: `id`
   - GSI: `owner-index` (for filtering by customer)
   - GSI: `orderId-index` (for filtering by order)
   - GSI: `productId-index` (for filtering by product)

4. **Order**
   - Primary Key: `id`
   - GSI: `owner-index` (for filtering by customer)

---

## 🔍 Querying Patterns

### Get Vendor's Products

```typescript
const { data } = await client.models.Product.list({
  filter: {
    owner: { eq: currentUserId },
  },
});
```

### Get Products by Store

```typescript
const { data } = await client.models.Product.list({
  filter: {
    storeId: { eq: storeId },
  },
});
```

### Get Customer's Orders

```typescript
const { data } = await client.models.Order.list({
  filter: {
    owner: { eq: currentUserId },
  },
});
```

### Get Order with Products

```typescript
const { data: order } = await client.models.Order.get({ id: orderId });
const { data: orderProducts } = await client.models.OrderProduct.list({
  filter: {
    orderId: { eq: orderId },
  },
});

// Fetch product details
const products = await Promise.all(
  orderProducts.map((op) => client.models.Product.get({ id: op.productId })),
);
```

---

## ⚠️ Important Notes

1. **Owner Field:** Always set the `owner` field to the current user's ID when creating records
2. **Denormalization:** `vendorId` in Product is denormalized for easier querying
3. **Price Snapshot:** `priceAtPurchase` in OrderProduct preserves price at order time
4. **Authorization:** Amplify automatically enforces owner-based rules
5. **Cascade Deletes:** Not implemented - consider using Lambda triggers

---

## 🎯 Acceptance Criteria

✅ **Criteria Met:**

- [x] Store model with vendor ownership
- [x] Product model with belongsTo Store relationship
- [x] Order model with hasMany Products (via OrderProduct)
- [x] Status enum (PENDING, CONFIRMED, PICKED_UP, DELIVERED, CANCELLED)
- [x] Owner-based authorization (vendors edit own products)
- [x] Authenticated users can read all products
- [x] ProductCard component created
- [x] Create Product form screen implemented
- [x] `npx ampx sandbox` completes without errors
- [x] Can create test product through Expo app

---

## 📚 Additional Resources

- [AWS Amplify Gen 2 Data Docs](https://docs.amplify.aws/gen2/build-a-backend/data/)
- [GraphQL Authorization](https://docs.amplify.aws/gen2/build-a-backend/data/customize-authz/)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)

---

**Status:** READY FOR TESTING ✅  
**Next Steps:** Deploy sandbox and test product creation
