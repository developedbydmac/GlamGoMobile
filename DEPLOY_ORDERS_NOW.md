# 🚀 Deploy Orders & Dispatch Endpoints - Quick Guide

## ✅ What's Ready to Deploy

1. **Create Order Lambda** - `POST /customer/orders`
2. **Find Nearby Drivers Lambda** - `GET /driver/nearby`
3. **Driver Model** - Added to DynamoDB schema
4. **Order Updates** - Added lat/lng/deliveryFee fields

---

## 🏃 Quick Start (5 minutes)

### Step 1: Deploy Everything
```bash
npx ampx sandbox
```

Wait 3-5 minutes. Look for:
```
✅ Deployed: create-order
✅ Deployed: find-nearby-drivers
✅ API Gateway URL: https://xxx.execute-api.us-east-1.amazonaws.com/prod/
```

### Step 2: Get API Gateway URL
```bash
# After deployment completes, note the API Gateway URL
# Example: https://abc123.execute-api.us-east-1.amazonaws.com/prod/
```

### Step 3: Test Create Order (as Customer)
```bash
# Get your customer JWT token from Expo app
# Then test the endpoint:

curl -X POST https://YOUR-API-URL/prod/customer/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR-JWT-TOKEN" \
  -d '{
    "customerId": "user-123",
    "customerName": "Test Customer",
    "customerEmail": "customer@test.com",
    "deliveryAddress": "123 Main St, LA, CA 90001",
    "deliveryLat": 34.0522,
    "deliveryLng": -118.2437,
    "items": [
      {
        "productId": "prod-1",
        "productName": "Test Product",
        "quantity": 2,
        "price": 25.99
      }
    ]
  }'
```

**Expected Response:**
```json
{
  "orderId": "order-xxx",
  "status": "PENDING",
  "totalAmount": 51.98,
  "deliveryFee": 5.20,
  "grandTotal": 57.18,
  "itemCount": 2,
  "message": "Order created successfully"
}
```

### Step 4: Test Find Nearby Drivers (as Driver)
```bash
# Sign in as driver user (driver@test.com)
# Get JWT token, then:

curl -X GET "https://YOUR-API-URL/prod/driver/nearby?lat=34.0522&lng=-118.2437" \
  -H "Authorization: Bearer YOUR-DRIVER-JWT-TOKEN"
```

**Expected Response:**
```json
{
  "deliveryLocation": {
    "lat": 34.0522,
    "lng": -118.2437
  },
  "searchRadius": 10,
  "nearbyDriversCount": 2,
  "drivers": [
    {
      "driverId": "driver1",
      "name": "John Driver",
      "distance": 1.23,
      "rating": 4.8
    }
  ]
}
```

---

## 🧪 Quick Test Matrix

| Test | User | Endpoint | Expected |
|------|------|----------|----------|
| Create Order | Customer | POST /customer/orders | 200 OK ✅ |
| Create Order | Driver | POST /customer/orders | 403 Forbidden ❌ |
| Find Drivers | Driver | GET /driver/nearby | 200 OK ✅ |
| Find Drivers | Customer | GET /driver/nearby | 403 Forbidden ❌ |
| Missing JWT | Anyone | Any endpoint | 401 Unauthorized ❌ |

---

## 🎯 What Each Endpoint Does

### POST /customer/orders
- ✅ Validates customer data
- ✅ Checks inventory (mock data currently)
- ✅ Calculates 10% delivery fee (min $5)
- ✅ Creates order with status PENDING
- ✅ Returns orderId and totals

### GET /driver/nearby?lat=X&lng=Y
- ✅ Finds available drivers
- ✅ Calculates haversine distance
- ✅ Filters within 10 miles (configurable)
- ✅ Sorts by nearest first
- ✅ Returns top 10 drivers

---

## 📱 Test from Expo App

### Create Order (Customer Screen)
```typescript
import { customerApi } from '../services/apiClient';

async function createTestOrder() {
  try {
    const result = await customerApi.createOrder({
      customerId: "user-123",
      customerName: "Test Customer",
      customerEmail: "customer@test.com",
      deliveryAddress: "123 Main St, LA, CA 90001",
      deliveryLat: 34.0522,
      deliveryLng: -118.2437,
      items: [
        {
          productId: "prod-1",
          productName: "Test Product",
          quantity: 2,
          price: 25.99
        }
      ]
    });
    
    console.log('Order created:', result);
  } catch (error) {
    console.error('Order failed:', error);
  }
}
```

### Find Nearby Drivers (Driver Screen)
```typescript
import { driverApi } from '../services/apiClient';

async function findDrivers() {
  try {
    const result = await driverApi.findNearbyDrivers(
      34.0522,  // lat
      -118.2437, // lng
      10         // max distance in miles
    );
    
    console.log('Found drivers:', result.drivers);
  } catch (error) {
    console.error('Driver search failed:', error);
  }
}
```

---

## 🔧 Need to Update API Client?

Add these methods to `services/apiClient.ts`:

```typescript
// Customer API
export const customerApi = {
  // ...existing methods...
  
  createOrder: async (orderData: any) => {
    return apiClient.post("/customer/orders", orderData);
  },
};

// Driver API
export const driverApi = {
  // ...existing methods...
  
  findNearbyDrivers: async (lat: number, lng: number, maxDistance: number = 10) => {
    return apiClient.get(`/driver/nearby?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`);
  },
};
```

---

## ⚡ Troubleshooting

### Order creation returns 400
- Check all required fields present
- Verify items array not empty
- Check lat/lng are valid numbers

### Driver search returns 400
- Verify lat/lng query parameters
- Check coordinates valid range
- Example: `?lat=34.0522&lng=-118.2437`

### Get 403 Forbidden
- Check JWT token in Authorization header
- Verify user in correct Cognito group
- Customer can't access /driver/* routes
- Driver can't access /customer/* routes

### Get 401 Unauthorized
- JWT token missing or invalid
- Re-authenticate and get new token
- Check token format: `Bearer <token>`

---

## 📊 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| create-order Lambda | ✅ Complete | Using mock data |
| find-nearby-drivers Lambda | ✅ Complete | Using mock data |
| Driver model | ✅ Complete | In data/resource.ts |
| Order updates | ✅ Complete | Added lat/lng/deliveryFee |
| API Gateway routes | ✅ Complete | Integrated in backend.ts |
| TypeScript errors | ✅ Fixed | All files clean |
| DynamoDB integration | 🟡 Pending | Need to replace mocks |

---

## 🎯 Next Steps

1. ✅ **Deploy** - `npx ampx sandbox`
2. ✅ **Test** - Try both endpoints with curl
3. 🟡 **Integrate DynamoDB** - Replace mock data
4. 🟡 **Build UI** - Create React Native screens
5. 🟡 **Add Real Drivers** - Seed driver data

---

## 📚 Full Documentation

See [ORDERS_DISPATCH_COMPLETE.md](./ORDERS_DISPATCH_COMPLETE.md) for:
- Detailed API documentation
- Full request/response examples
- DynamoDB integration guide
- React Native UI examples
- Comprehensive troubleshooting

---

**Ready to deploy?** 🚀
```bash
npx ampx sandbox
```
