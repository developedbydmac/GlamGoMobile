# 🚀 Quick Reference - Orders & Dispatch

## 📋 What Was Built

### New Lambda Functions

1. **create-order** - `POST /customer/orders`
2. **find-nearby-drivers** - `GET /driver/nearby`

### Database Changes

- ✅ Driver model added with geohash GSI
- ✅ Order model updated (lat/lng/deliveryFee)

---

## ⚡ Quick Deploy

```bash
npx ampx sandbox
# Wait 3-5 minutes
```

---

## 🧪 Quick Test

### Test Create Order

```bash
curl -X POST https://YOUR-API/prod/customer/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"customerId":"user-123","customerName":"Test","customerEmail":"test@test.com","deliveryAddress":"123 Main","deliveryLat":34.0522,"deliveryLng":-118.2437,"items":[{"productId":"prod-1","productName":"Test","quantity":2,"price":25.99}]}'
```

### Test Find Drivers

```bash
curl -X GET "https://YOUR-API/prod/driver/nearby?lat=34.0522&lng=-118.2437" \
  -H "Authorization: Bearer TOKEN"
```

---

## 📱 React Native Usage

### Create Order

```typescript
import { customerApi } from "../services/apiClient";

const result = await customerApi.createOrder({
  customerId: "user-123",
  customerName: "Test",
  customerEmail: "test@test.com",
  deliveryAddress: "123 Main St",
  deliveryLat: 34.0522,
  deliveryLng: -118.2437,
  items: [
    {
      productId: "prod-1",
      productName: "Test Product",
      quantity: 2,
      price: 25.99,
    },
  ],
});
```

### Find Drivers

```typescript
import { driverApi } from "../services/apiClient";

const result = await driverApi.findNearbyDrivers(
  34.0522, // lat
  -118.2437, // lng
  10, // radius in miles
);
```

---

## 📊 Expected Responses

### Create Order ✅

```json
{
  "orderId": "order-abc123",
  "status": "PENDING",
  "totalAmount": 51.98,
  "deliveryFee": 5.2,
  "grandTotal": 57.18,
  "itemCount": 2
}
```

### Find Drivers ✅

```json
{
  "nearbyDriversCount": 2,
  "drivers": [
    {
      "driverId": "driver1",
      "name": "John Driver",
      "distance": 1.23,
      "rating": 4.8,
      "totalDeliveries": 150
    }
  ]
}
```

---

## 🔐 Authorization

| Endpoint              | Role Required | Status |
| --------------------- | ------------- | ------ |
| POST /customer/orders | CUSTOMER      | ✅     |
| GET /driver/nearby    | DRIVER        | ✅     |

---

## 📚 Full Docs

- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Complete overview
- [ORDERS_DISPATCH_COMPLETE.md](./docs/ORDERS_DISPATCH_COMPLETE.md) - Detailed API docs
- [DEPLOY_ORDERS_NOW.md](./DEPLOY_ORDERS_NOW.md) - Deployment guide

---

## ✅ Status

- ✅ All code complete
- ✅ TypeScript no errors
- ✅ API client updated
- ✅ Ready to deploy
- 🟡 Using mock data (DynamoDB integration pending)

---

**Deploy now:** `npx ampx sandbox` 🚀
