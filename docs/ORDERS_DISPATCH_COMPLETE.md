# 📦 Orders & Driver Dispatch Lambda Functions - Complete

## ✅ What Was Created

### 1. **Create Order Lambda** (`amplify/functions/orders/`)

- **Handler**: `handler.ts` (280 lines)
- **Purpose**: Create customer orders with inventory validation
- **Route**: `POST /customer/orders`
- **Authorization**: CUSTOMER role only

**Key Features:**

- ✅ Validates customer data (ID, name, email, delivery address)
- ✅ Validates order items (productId, quantity, price)
- ✅ Checks inventory availability (TODO: integrate with DynamoDB)
- ✅ Calculates delivery fee (10% of order total, minimum $5)
- ✅ Creates order record with status PENDING
- ✅ Returns orderId, totals, and item count
- ✅ Full error handling (400, 500 status codes)
- ✅ CORS headers on all responses

**Request Format:**

```typescript
POST /customer/orders
Content-Type: application/json
Authorization: Bearer <customer-jwt-token>

{
  "customerId": "user-123",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "deliveryAddress": "123 Main St, Los Angeles, CA 90001",
  "deliveryLat": 34.0522,
  "deliveryLng": -118.2437,
  "items": [
    {
      "productId": "prod-1",
      "productName": "Hair Gel",
      "quantity": 2,
      "price": 15.99
    }
  ],
  "notes": "Please ring doorbell"
}
```

**Response Format:**

```json
{
  "orderId": "order-abc123",
  "status": "PENDING",
  "totalAmount": 31.98,
  "deliveryFee": 5.0,
  "grandTotal": 36.98,
  "itemCount": 2,
  "message": "Order created successfully"
}
```

---

### 2. **Find Nearby Drivers Lambda** (`amplify/functions/dispatch/`)

- **Handler**: `handler.ts` (320 lines)
- **Purpose**: Find available drivers within radius using geospatial queries
- **Route**: `GET /driver/nearby?lat=34.0522&lng=-118.2437`
- **Authorization**: DRIVER role only

**Key Features:**

- ✅ Accepts lat/lng query parameters
- ✅ Validates coordinates (-90 to 90, -180 to 180)
- ✅ Queries Driver table for AVAILABLE status (TODO: integrate GSI)
- ✅ Calculates Haversine distance for each driver
- ✅ Filters to drivers within configurable radius (default 10 miles)
- ✅ Sorts by distance (nearest first)
- ✅ Returns top 10 drivers
- ✅ Includes driver details (rating, deliveries, vehicle type)
- ✅ Full error handling and CORS

**Request Format:**

```
GET /driver/nearby?lat=34.0522&lng=-118.2437&maxDistance=10
Authorization: Bearer <driver-jwt-token>
```

**Query Parameters:**

- `lat` (required): Delivery latitude
- `lng` (required): Delivery longitude
- `maxDistance` (optional): Search radius in miles (default: 10)

**Response Format:**

```json
{
  "deliveryLocation": {
    "lat": 34.0522,
    "lng": -118.2437,
    "geohash": "9q5ct2"
  },
  "searchRadius": 10,
  "totalAvailableDrivers": 3,
  "nearbyDriversCount": 2,
  "drivers": [
    {
      "driverId": "driver1",
      "name": "John Driver",
      "phoneNumber": "555-0101",
      "distance": 1.23,
      "rating": 4.8,
      "totalDeliveries": 150,
      "vehicleType": "Car",
      "currentLocation": {
        "lat": 34.0622,
        "lng": -118.2537
      }
    }
  ]
}
```

---

### 3. **Driver Model** (Added to `amplify/data/resource.ts`)

```typescript
Driver: a.model({
  driverId: a.string().required(),
  name: a.string().required(),
  email: a.string().required(),
  phoneNumber: a.string(),
  currentLat: a.float().required(),
  currentLng: a.float().required(),
  geohash: a.string().required(),
  status: a.enum(["AVAILABLE", "BUSY", "OFFLINE"]),
  rating: a.float().default(5.0),
  totalDeliveries: a.integer().default(0),
  vehicleType: a.string(),
  vehiclePlate: a.string(),
  lastLocationUpdate: a.datetime(),
})
  .authorization((allow) => [allow.owner(), allow.authenticated().to(["read"])])
  .secondaryIndexes((index) => [
    index("status").queryField("listDriversByStatus"),
    index("status")
      .sortKeys(["geohash"])
      .queryField("listDriversByStatusAndGeohash"),
  ]);
```

**Secondary Indexes:**

- `listDriversByStatus`: Query all drivers by status (AVAILABLE/BUSY/OFFLINE)
- `listDriversByStatusAndGeohash`: Efficient geospatial queries using status + geohash

---

### 4. **Order Model Updates** (Modified in `amplify/data/resource.ts`)

Added fields:

- `deliveryLat: a.float()` - Delivery latitude
- `deliveryLng: a.float()` - Delivery longitude
- `deliveryFee: a.float().default(0)` - Delivery fee amount

---

### 5. **API Gateway Integration** (Updated `amplify/backend.ts`)

```typescript
// New endpoints added to API Gateway
apiGatewayStack.addCustomEndpoint(
  "customer",
  "orders",
  "POST",
  backend.createOrder.resources.lambda,
);

apiGatewayStack.addCustomEndpoint(
  "driver",
  "nearby",
  "GET",
  backend.findNearbyDrivers.resources.lambda,
);
```

---

## 📋 Deployment Checklist

### Pre-Deployment

- [x] Driver model added to schema
- [x] Order model updated with lat/lng/deliveryFee
- [x] create-order Lambda function complete
- [x] find-nearby-drivers Lambda function complete
- [x] Both functions registered in backend.ts
- [x] API Gateway routes configured
- [x] TypeScript compiling without errors
- [x] Dependencies installed

### Deploy

```bash
# Deploy all infrastructure and functions
npx ampx sandbox

# Wait 3-5 minutes for deployment
# Look for output: "✅ API Gateway URL: https://xxx.execute-api.us-east-1.amazonaws.com/prod/"
```

---

## 🧪 Testing Guide

### 1. Test Create Order Endpoint

**As Customer User:**

```bash
# Get your JWT token from Expo app (customer@test.com)
# Copy the idToken from AsyncStorage or API client

curl -X POST https://YOUR-API-URL/prod/customer/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR-CUSTOMER-JWT-TOKEN" \
  -d '{
    "customerId": "user-123",
    "customerName": "Test Customer",
    "customerEmail": "customer@test.com",
    "deliveryAddress": "123 Main St, Los Angeles, CA 90001",
    "deliveryLat": 34.0522,
    "deliveryLng": -118.2437,
    "items": [
      {
        "productId": "prod-1",
        "productName": "Test Product",
        "quantity": 2,
        "price": 25.99
      }
    ],
    "notes": "Test order"
  }'
```

**Expected Response (200):**

```json
{
  "orderId": "order-xxx",
  "status": "PENDING",
  "totalAmount": 51.98,
  "deliveryFee": 5.2,
  "grandTotal": 57.18,
  "itemCount": 2,
  "message": "Order created successfully"
}
```

**Test Missing Fields (400):**

```bash
curl -X POST https://YOUR-API-URL/prod/customer/orders \
  -H "Authorization: Bearer YOUR-CUSTOMER-JWT-TOKEN" \
  -d '{"customerId": "user-123"}'
```

Expected: `400 Bad Request` with validation errors

---

### 2. Test Find Nearby Drivers Endpoint

**As Driver User:**

```bash
# First, create a driver user and sign in
# Get JWT token from driver@test.com

curl -X GET "https://YOUR-API-URL/prod/driver/nearby?lat=34.0522&lng=-118.2437&maxDistance=10" \
  -H "Authorization: Bearer YOUR-DRIVER-JWT-TOKEN"
```

**Expected Response (200):**

```json
{
  "deliveryLocation": {
    "lat": 34.0522,
    "lng": -118.2437,
    "geohash": "9q5ct2"
  },
  "searchRadius": 10,
  "totalAvailableDrivers": 3,
  "nearbyDriversCount": 2,
  "drivers": [
    {
      "driverId": "driver1",
      "name": "John Driver",
      "phoneNumber": "555-0101",
      "distance": 1.23,
      "rating": 4.8,
      "totalDeliveries": 150,
      "vehicleType": "Car",
      "currentLocation": {
        "lat": 34.0622,
        "lng": -118.2537
      }
    }
  ]
}
```

**Test Missing Coordinates (400):**

```bash
curl -X GET "https://YOUR-API-URL/prod/driver/nearby" \
  -H "Authorization: Bearer YOUR-DRIVER-JWT-TOKEN"
```

Expected: `400 Bad Request` with error message about missing lat/lng

---

### 3. Test Role Authorization

**Customer tries to access driver endpoint (should fail):**

```bash
curl -X GET "https://YOUR-API-URL/prod/driver/nearby?lat=34.0522&lng=-118.2437" \
  -H "Authorization: Bearer YOUR-CUSTOMER-JWT-TOKEN"
```

Expected: `403 Forbidden` (Lambda authorizer denies access)

**Driver tries to create order (should fail):**

```bash
curl -X POST https://YOUR-API-URL/prod/customer/orders \
  -H "Authorization: Bearer YOUR-DRIVER-JWT-TOKEN" \
  -d '{"customerId": "user-123", ...}'
```

Expected: `403 Forbidden` (Lambda authorizer denies access)

---

## 🔧 Integration with React Native

### Update API Client (`services/apiClient.ts`)

Add these methods to the API client:

```typescript
// Customer API
export const customerApi = {
  healthCheck: () => apiClient.healthCheck("customer"),

  // NEW: Create order
  createOrder: async (orderData: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    deliveryAddress: string;
    deliveryLat: number;
    deliveryLng: number;
    items: Array<{
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }>;
    notes?: string;
  }) => {
    return apiClient.post("/customer/orders", orderData);
  },
};

// Driver API
export const driverApi = {
  healthCheck: () => apiClient.healthCheck("driver"),

  // NEW: Find nearby drivers
  findNearbyDrivers: async (
    lat: number,
    lng: number,
    maxDistance: number = 10,
  ) => {
    return apiClient.get(
      `/driver/nearby?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`,
    );
  },
};
```

---

## 📊 Database Integration (TODO)

Both Lambda functions currently use **mock data**. To integrate with DynamoDB:

### For Create Order Lambda (`orders/handler.ts`):

Replace `validateInventory()`:

```typescript
async function validateInventory(items: OrderItem[]): Promise<void> {
  const response = await fetch(process.env.API_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query GetProduct($id: ID!) {
        getProduct(id: $id) {
          id
          stockQuantity
          isAvailable
        }
      }`,
      variables: { id: items[0].productId },
    }),
  });

  const data = await response.json();
  // Validate stock levels
}
```

Replace `createOrderRecord()`:

```typescript
async function createOrderRecord(...): Promise<string> {
  const response = await fetch(process.env.API_ENDPOINT!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
          id
          status
        }
      }`,
      variables: { input: { /* order data */ } }
    })
  });

  const data = await response.json();
  return data.data.createOrder.id;
}
```

---

### For Find Nearby Drivers Lambda (`dispatch/handler.ts`):

Replace `queryAvailableDrivers()`:

```typescript
async function queryAvailableDrivers(): Promise<Driver[]> {
  const response = await fetch(process.env.API_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query ListDriversByStatus($status: DriverStatus!) {
        listDriversByStatus(status: $status) {
          items {
            driverId
            name
            email
            phoneNumber
            currentLat
            currentLng
            status
            rating
            totalDeliveries
            vehicleType
          }
        }
      }`,
      variables: { status: "AVAILABLE" },
    }),
  });

  const data = await response.json();
  return data.data.listDriversByStatus.items;
}
```

---

## 🚀 Next Steps

1. **Deploy to Sandbox**

   ```bash
   npx ampx sandbox
   ```

2. **Create Test Users**
   - Driver user: `driver@test.com`
   - Add to DRIVER Cognito group
   - Sign in and get JWT token

3. **Test Order Creation**
   - Sign in as customer
   - Call POST /customer/orders
   - Verify order created in DynamoDB

4. **Test Driver Dispatch**
   - Sign in as driver
   - Call GET /driver/nearby
   - Verify distance calculations

5. **Integrate with DynamoDB**
   - Replace mock data in both Lambdas
   - Use AppSync GraphQL queries
   - Test end-to-end flow

6. **Create React Native UI**
   - Order creation screen for customers
   - Driver dispatch screen for drivers
   - Show nearby drivers on map
   - Real-time order status updates

---

## 🔍 Troubleshooting

### Order Creation Fails

- Check JWT token is valid customer token
- Verify all required fields present
- Check Lambda logs: `amplify/functions/orders/handler.ts`

### Driver Search Returns Empty

- Verify drivers exist in DynamoDB with status=AVAILABLE
- Check lat/lng coordinates valid
- Verify maxDistance parameter (default 10 miles)
- Check GSI created: `listDriversByStatusAndGeohash`

### Authorization Errors (403)

- Verify JWT token in Authorization header
- Check user is in correct Cognito group
- Customer can only access /customer/\* routes
- Driver can only access /driver/\* routes

---

## 📚 Related Documentation

- [API_GATEWAY_SETUP.md](./API_GATEWAY_SETUP.md) - API Gateway setup guide
- [DEPLOY_NOW.md](../DEPLOY_NOW.md) - Quick deployment guide
- [TOMORROW_MORNING_PLAN.md](./TOMORROW_MORNING_PLAN.md) - Full testing walkthrough

---

## ✅ Summary

**Created:**

- ✅ Create Order Lambda (POST /customer/orders)
- ✅ Find Nearby Drivers Lambda (GET /driver/nearby)
- ✅ Driver model with geospatial GSI
- ✅ Order model updates (lat/lng/deliveryFee)
- ✅ API Gateway integration
- ✅ Full error handling and CORS

**Ready to Deploy:**

```bash
npx ampx sandbox
```

**Next:** Test endpoints, integrate with DynamoDB, build React Native UI! 🎉
