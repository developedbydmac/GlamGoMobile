# 🛣️ **BACKEND IMPLEMENTATION ROADMAP**
## **6-Week Sprint to MVP**

**Start Date:** March 10, 2026  
**Target Launch:** April 21, 2026 (Beta)  
**Team:** 1-2 Full-Stack Developers  
**Stack:** AWS Amplify Gen 2, Expo, React Native, Stripe

---

## 📅 **WEEK 1: Foundation (March 10-16)**

### **Goal:** Database operational, mock data eliminated

#### **Monday (March 10) - Database Schema**
- [ ] Review `amplify/data/resource.ts` current schema
- [ ] Add missing models: Rating, ChatThread, Message, UserProfile
- [ ] Define relationships (Order → OrderItems, User → Orders)
- [ ] Add indexes for common queries (userId, vendorId, status)
- [ ] Deploy sandbox: `npx ampx sandbox`

**Code Example:**
```typescript
// amplify/data/resource.ts
const schema = a.schema({
  UserProfile: a.model({
    userId: a.id().required(),
    email: a.string().required(),
    name: a.string().required(),
    role: a.enum(['CUSTOMER', 'VENDOR', 'DRIVER']),
    phone: a.string(),
    address: a.string(),
    lat: a.float(),
    lng: a.float(),
    pushToken: a.string(),
    averageRating: a.float().default(0),
    totalRatings: a.integer().default(0),
  }).authorization(allow => [allow.owner()]),
  
  Product: a.model({
    id: a.id(),
    vendorId: a.id().required(),
    name: a.string().required(),
    description: a.string(),
    price: a.float().required(),
    category: a.string().required(),
    images: a.string().array(),
    inStock: a.boolean().default(true),
    rating: a.float().default(0),
  }).authorization(allow => [
    allow.owner(),
    allow.authenticated().to(['read'])
  ])
});
```

#### **Tuesday (March 11) - Service Layer Refactor**
- [ ] Create `services/productService.ts` (replace mock)
- [ ] Create `services/orderService.ts` (replace mock)
- [ ] Create `services/userService.ts` (replace mock)
- [ ] Add error handling and loading states

**Code Example:**
```typescript
// services/productService.ts
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export const productService = {
  async getAll(filters?: { category?: string }) {
    const { data, errors } = await client.models.Product.list({
      filter: filters?.category 
        ? { category: { eq: filters.category } }
        : undefined
    });
    
    if (errors) throw new Error(errors[0].message);
    return data;
  },
  
  async getById(id: string) {
    const { data, errors } = await client.models.Product.get({ id });
    if (errors) throw new Error(errors[0].message);
    return data;
  },
  
  async create(product: ProductInput) {
    const { data, errors } = await client.models.Product.create(product);
    if (errors) throw new Error(errors[0].message);
    return data;
  },
  
  async update(id: string, updates: Partial<ProductInput>) {
    const { data, errors } = await client.models.Product.update({
      id,
      ...updates
    });
    if (errors) throw new Error(errors[0].message);
    return data;
  },
  
  async delete(id: string) {
    const { data, errors } = await client.models.Product.delete({ id });
    if (errors) throw new Error(errors[0].message);
    return data;
  }
};
```

#### **Wednesday (March 12) - Browse Screen Integration**
- [ ] Update `app/browse.tsx` to use `productService.getAll()`
- [ ] Add loading spinner while fetching
- [ ] Add error boundary for failed requests
- [ ] Test filtering and search

**Code Example:**
```typescript
// app/browse.tsx (update)
import { productService } from '@/services/productService';

export default function BrowseScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);
  
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll({
        category: selectedCategory || undefined
      });
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message={error} onRetry={loadProducts} />;
  
  return (
    // ...existing JSX
  );
}
```

#### **Thursday (March 13) - Vendor Dashboard Integration**
- [ ] Update `app/(vendor)/dashboard.tsx` with real data
- [ ] Fetch vendor's products from database
- [ ] Fetch vendor's orders from database
- [ ] Calculate real revenue metrics

#### **Friday (March 14) - Customer Dashboard Integration**
- [ ] Update `app/(customer)/dashboard.tsx` with real data
- [ ] Fetch customer's orders from database
- [ ] Show order history
- [ ] Calculate spending metrics

#### **Saturday-Sunday (March 15-16) - Testing & Bug Fixes**
- [ ] Test all CRUD operations
- [ ] Verify data syncs across roles
- [ ] Fix any TypeScript errors
- [ ] Deploy to Amplify production: `npx ampx deploy`

**✅ Week 1 Deliverable:** App reads/writes to real database, no more mock data

---

## 📅 **WEEK 2: Payments (March 17-23)**

### **Goal:** Customers can place orders and pay

#### **Monday (March 17) - Stripe Setup**
- [ ] Create Stripe account (stripe.com)
- [ ] Get publishable and secret keys
- [ ] Install dependencies:
  ```bash
  npm install @stripe/stripe-react-native
  cd amplify/functions && npm install stripe
  ```
- [ ] Add keys to environment variables (`.env`)

#### **Tuesday (March 18) - Payment Intent Lambda**
- [ ] Create `amplify/functions/create-payment-intent/handler.ts`
- [ ] Create `amplify/functions/confirm-payment/handler.ts`
- [ ] Test Lambda locally with sample data

**Code Example:**
```typescript
// amplify/functions/create-payment-intent/handler.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const handler = async (event: any) => {
  const { orderId, amount } = JSON.parse(event.body);
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: { orderId },
      automatic_payment_methods: { enabled: true }
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

#### **Wednesday (March 19) - Checkout Screen**
- [ ] Create `app/checkout.tsx`
- [ ] Add Stripe CardField component
- [ ] Implement payment confirmation flow
- [ ] Show success/error states

**Code Example:**
```typescript
// app/checkout.tsx
import { CardField, confirmPayment } from '@stripe/stripe-react-native';

export default function CheckoutScreen() {
  const [loading, setLoading] = useState(false);
  const { cart, total } = useCart();
  
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // 1. Create payment intent (backend)
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        body: JSON.stringify({ orderId: 'temp-id', amount: total })
      });
      const { clientSecret } = await response.json();
      
      // 2. Confirm payment (Stripe)
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card'
      });
      
      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent?.status === 'Succeeded') {
        Alert.alert('Success!', 'Order placed');
        router.push('/order-confirmation');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View>
      <Text>Total: ${total.toFixed(2)}</Text>
      <CardField onCardChange={...} />
      <Button title="Pay Now" onPress={handlePayment} loading={loading} />
    </View>
  );
}
```

#### **Thursday (March 20) - Order Creation**
- [ ] Update `services/orderService.ts` to create orders
- [ ] Link payment to order in database
- [ ] Update order status: PENDING → CONFIRMED

#### **Friday (March 21) - Refund System**
- [ ] Create `amplify/functions/refund-payment/handler.ts`
- [ ] Add refund button to admin panel (future)
- [ ] Test refund flow

#### **Saturday-Sunday (March 22-23) - Testing**
- [ ] Test with Stripe test cards
- [ ] Verify money flow (platform fee calculation)
- [ ] Test edge cases (declined cards, network errors)

**✅ Week 2 Deliverable:** End-to-end payments working

---

## 📅 **WEEK 3: Real-time Tracking (March 24-30)**

### **Goal:** Live order tracking like Uber Eats

#### **Monday (March 24) - AWS AppSync Setup**
- [ ] Enable GraphQL subscriptions in Amplify
- [ ] Define subscription schema for Order updates
- [ ] Test subscription from React Native

**Code Example:**
```graphql
# amplify/data/resource.ts (GraphQL schema)
type Order @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  status: OrderStatus!
  driverLocation: LocationInput
  estimatedArrival: AWSDateTime
}

type Subscription {
  onOrderUpdate(id: ID!): Order @aws_subscribe(mutations: ["updateOrder"])
}
```

#### **Tuesday (March 25) - React Native Subscription**
- [ ] Install `@aws-amplify/api-graphql`
- [ ] Subscribe to order updates in order detail screen
- [ ] Show live status changes

**Code Example:**
```typescript
// app/order/[id].tsx
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    // Subscribe to real-time updates
    const subscription = client.graphql({
      query: /* GraphQL */ `
        subscription OnOrderUpdate($id: ID!) {
          onUpdateOrder(filter: { id: { eq: $id } }) {
            id
            status
            driverLocation
            estimatedArrival
          }
        }
      `,
      variables: { id }
    }).subscribe({
      next: ({ data }) => {
        setOrder(data.onUpdateOrder);
      },
      error: (error) => console.error(error)
    });
    
    return () => subscription.unsubscribe();
  }, [id]);
  
  return (
    <View>
      <Text>Status: {order?.status}</Text>
      {order?.driverLocation && (
        <MapView region={order.driverLocation} />
      )}
    </View>
  );
}
```

#### **Wednesday (March 26) - Push Notifications Setup**
- [ ] Install `expo-notifications`
- [ ] Request permissions
- [ ] Save push tokens to database
- [ ] Create `amplify/functions/send-notification/handler.ts`

**Code Example:**
```typescript
// services/notificationService.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export const registerForPushNotifications = async () => {
  if (!Device.isDevice) return null;
  
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission required', 'Enable notifications in Settings');
    return null;
  }
  
  const token = await Notifications.getExpoPushTokenAsync();
  
  // Save to database
  await client.models.UserProfile.update({
    id: currentUser.id,
    pushToken: token.data
  });
  
  return token.data;
};

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});
```

#### **Thursday (March 27) - Notification Triggers**
- [ ] Create DynamoDB Stream → Lambda trigger
- [ ] Send notification on order status change
- [ ] Test notification delivery

**Code Example:**
```typescript
// amplify/functions/order-status-changed/handler.ts
import { DynamoDBStreamEvent } from 'aws-lambda';
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

export const handler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    if (record.eventName === 'MODIFY') {
      const oldStatus = record.dynamodb?.OldImage?.status?.S;
      const newStatus = record.dynamodb?.NewImage?.status?.S;
      const customerId = record.dynamodb?.NewImage?.customerId?.S;
      
      if (oldStatus !== newStatus) {
        // Get customer push token
        const customer = await getUser(customerId);
        
        // Send notification
        await expo.sendPushNotificationsAsync([{
          to: customer.pushToken,
          sound: 'default',
          title: 'Order Update',
          body: `Your order is now ${newStatus}`,
          data: { orderId: record.dynamodb?.NewImage?.id?.S }
        }]);
      }
    }
  }
};
```

#### **Friday (March 28) - Maps Integration**
- [ ] Install `react-native-maps`
- [ ] Add Google Maps API key
- [ ] Show order route on map
- [ ] Show driver marker

#### **Saturday-Sunday (March 29-30) - Testing**
- [ ] Test real-time updates across devices
- [ ] Test push notifications (iOS + Android)
- [ ] Test map rendering and GPS

**✅ Week 3 Deliverable:** Live tracking + push notifications working

---

## 📅 **WEEK 4: Driver Matching (March 31 - April 6)**

### **Goal:** Intelligent driver-order matching

#### **Monday (March 31) - Geospatial Queries**
- [ ] Add geohash to driver location
- [ ] Create Lambda to find nearby drivers
- [ ] Test proximity search

**Code Example:**
```typescript
// amplify/functions/find-nearby-drivers/handler.ts
import { haversine } from './utils/geo';

export const handler = async (event: any) => {
  const { lat, lng, radiusMiles } = JSON.parse(event.body);
  
  // Get all available drivers
  const drivers = await getAllDrivers({ status: 'AVAILABLE' });
  
  // Filter by distance
  const nearby = drivers.filter(driver => {
    const distance = haversine(
      { lat, lng },
      { lat: driver.lat, lng: driver.lng }
    );
    return distance <= radiusMiles;
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify(nearby)
  };
};

// utils/geo.ts
export function haversine(point1, point2) {
  const R = 3959; // Earth radius in miles
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);
  
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(point1.lat)) *
            Math.cos(toRad(point2.lat)) *
            Math.sin(dLng / 2) ** 2;
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
```

#### **Tuesday (April 1) - Scoring Algorithm**
- [ ] Create `calculateMatchScore` function
- [ ] Factor in: distance, rating, acceptance rate
- [ ] Sort drivers by score

#### **Wednesday (April 2) - Auto-Assignment**
- [ ] Send push notification to top 3 drivers
- [ ] Implement 30-second timeout
- [ ] Re-assign if no acceptance

#### **Thursday (April 3) - Driver Acceptance**
- [ ] Add "Accept Order" button to driver app
- [ ] Handle race conditions (2 drivers accept same order)
- [ ] Update order status to ACCEPTED

#### **Friday (April 4) - Testing**
- [ ] Simulate multiple drivers
- [ ] Test timeout and re-assignment
- [ ] Verify only one driver gets order

#### **Saturday-Sunday (April 5-6) - Polish**
- [ ] Add loading states
- [ ] Improve error messages
- [ ] Test edge cases

**✅ Week 4 Deliverable:** Smart driver matching working

---

## 📅 **WEEK 5: Ratings & Chat (April 7-13)**

### **Goal:** Customer can rate and message driver

#### **Monday-Tuesday (April 7-8) - Ratings System**
- [ ] Create Rating model in database
- [ ] Build rating modal (stars + text)
- [ ] Auto-show after delivery
- [ ] Calculate average ratings

#### **Wednesday-Friday (April 9-11) - In-App Chat**
- [ ] Create ChatThread and Message models
- [ ] Build chat UI (react-native-gifted-chat)
- [ ] Real-time messaging via AppSync subscriptions
- [ ] Push notification on new message

#### **Saturday-Sunday (April 12-13) - Testing**
- [ ] Test rating submission
- [ ] Test chat across users
- [ ] Verify push notifications

**✅ Week 5 Deliverable:** Ratings and chat functional

---

## 📅 **WEEK 6: Admin Panel (April 14-20)**

### **Goal:** Basic admin dashboard

#### **Monday-Wednesday (April 14-16) - Admin Web App**
- [ ] Create Next.js admin app
- [ ] Add admin authentication
- [ ] Build user management page
- [ ] Build order monitoring page

#### **Thursday-Friday (April 17-18) - Analytics**
- [ ] Calculate KPIs (revenue, orders, users)
- [ ] Build analytics dashboard with charts
- [ ] Export data as CSV

#### **Saturday-Sunday (April 19-20) - Polish & Launch Prep**
- [ ] Final testing
- [ ] Fix critical bugs
- [ ] Write deployment docs
- [ ] Prepare for beta launch

**✅ Week 6 Deliverable:** MVP ready for beta testing

---

## 🚀 **LAUNCH CHECKLIST (April 21)**

### **Pre-Launch:**
- [ ] All critical features working
- [ ] Database backed up
- [ ] Stripe in production mode
- [ ] Push notifications tested
- [ ] 10 beta users recruited
- [ ] Support email set up
- [ ] Privacy policy published
- [ ] Terms of service published

### **Launch Day:**
- [ ] Send beta invites
- [ ] Monitor error logs
- [ ] Respond to user feedback
- [ ] Fix urgent bugs within 24 hours

### **Post-Launch (Week 7+):**
- [ ] Collect user feedback
- [ ] Iterate on UX issues
- [ ] Add missing features
- [ ] Optimize performance
- [ ] Prepare for Series A pitch

---

## 📊 **PROGRESS TRACKER**

| Week | Goal | Status | Completion |
|------|------|--------|------------|
| **Week 1** | Database operational | 🔄 | 0% |
| **Week 2** | Payments working | ⏳ | 0% |
| **Week 3** | Real-time tracking | ⏳ | 0% |
| **Week 4** | Driver matching | ⏳ | 0% |
| **Week 5** | Ratings & chat | ⏳ | 0% |
| **Week 6** | Admin panel | ⏳ | 0% |

**Update this daily to track progress!**

---

## 💡 **DAILY STANDUP TEMPLATE**

Copy this format for daily updates:

```markdown
### Date: [MM/DD/YYYY]

**Yesterday:**
- [ ] Task 1
- [ ] Task 2

**Today:**
- [ ] Task 3
- [ ] Task 4

**Blockers:**
- None / [Describe issue]

**Notes:**
- [Any observations or decisions made]
```

---

**Let's build this! 🚀**

*Created: March 10, 2026*  
*Last Updated: March 10, 2026*
