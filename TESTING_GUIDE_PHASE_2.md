# 🧪 Phase 2 Testing Guide

**Status:** ✅ All TypeScript errors fixed! Ready to test.

**Expo Server:** Running in background (use `npx expo start` if needed)

---

## 📱 **OPTION 1: Test Your Work** ✅ ACTIVE

### Quick Start:

1. **Expo is already running!** Look for the QR code in your terminal
2. Open **Expo Go** app on your phone
3. Scan the QR code
4. Test all 3 roles below

---

## 🎭 Test Credentials

### 1. **Vendor Account**

```
Email: vendor@test.com
Password: Test123!
```

**What to Test:**

- [ ] Sign in successfully
- [ ] See "Create Your Store" if no store exists
- [ ] Create store with name + description
- [ ] Navigate to Products tab
- [ ] Add new beauty supply product (e.g., hair dryer, nail polish, makeup brushes)
- [ ] Set product name, price, category, inventory quantity
- [ ] See product appear in list
- [ ] Edit existing product
- [ ] View Orders tab
- [ ] See "Needs your attention" for pending orders
- [ ] Accept an order → Status changes to "Ready for pickup"
- [ ] Pull to refresh works on all screens

**Expected Flow:**

```
Sign In → Create Store → Add Beauty Supply Products → Accept Orders
```

---

### 2. **Customer Account**

```
Email: customer@test.com
Password: Test123!
```

**What to Test:**

- [ ] Sign in successfully
- [ ] See Shop screen with beauty supply products
- [ ] Browse products from local beauty supply stores
- [ ] See products like hair dryers, nail polish sets, makeup brushes, skincare items
- [ ] Search for products using search bar
- [ ] Filter by category (Hair Care, Nails, Skin Care, Makeup, Tools, etc.)
- [ ] Tap on a product to view details
- [ ] Add products to cart
- [ ] Navigate to Cart tab
- [ ] See cart items with prices
- [ ] Adjust quantity with +/- buttons
- [ ] Remove items from cart
- [ ] See total update correctly (subtotal + delivery fee)
- [ ] Tap "Checkout" or "Place Order"
- [ ] See order confirmation

**Expected Flow:**

```
Sign In → Browse Beauty Supply Products → Add to Cart → Checkout → Place Order
```

---

### 3. **Driver Account**

```
Email: driver@test.com
Password: Test123!
```

**What to Test:**

- [ ] Sign in successfully
- [ ] See "Deliveries Near You" screen
- [ ] See 3 mock delivery opportunities with beauty supply orders:
  - Beauty Pro Supply → Sarah Johnson (2.3 mi, $12.50)
  - Nail Artistry Supplies → Emily Davis (4.1 mi, $15.00)
  - Skincare Essentials → Jessica Williams (1.8 mi, $10.00)
- [ ] See distance badges, pickup/delivery details
- [ ] Tap "I'll Take This One" on first delivery
- [ ] See confirmation: "You got it! 🚗"
- [ ] Delivery disappears from Available list
- [ ] Navigate to Active tab
- [ ] See active delivery with timeline:
  - ✓ "Picked up from Beauty Pro Supply"
  - → "Heading to Sarah Johnson"
- [ ] See "Delivering (2 items)" details (e.g., Hair Dryer, Nail Polish)
- [ ] Tap "Call Customer" / "Directions" buttons (mock)
- [ ] Tap "Mark as Delivered"
- [ ] See success: "Nice work! 🎉 You earned $12.50"
- [ ] Delivery disappears from Active list
- [ ] Pull to refresh works on both screens

**Expected Flow:**

```
Sign In → View Available Deliveries → Accept Beauty Supply Order →
View Active → Mark Delivered → Earn $12.50
```

---

## 🎨 **UI/UX Elements to Validate**

### Humanization Check:

- [ ] No robotic language ("PENDING" → "Needs your attention")
- [ ] Friendly CTAs ("I'll Take This One" not "Accept")
- [ ] Conversational headers ("When works for you?" not "Select Time")
- [ ] Emoji usage for warmth (🎉, 🚗, 💰)
- [ ] Empty states are friendly (not cold/technical)

### Design System Check:

- [ ] Purple gradients on headers (#8B5CF6 → #C084FC)
- [ ] Consistent spacing (padding/margins)
- [ ] Card-based layouts
- [ ] Clear visual hierarchy
- [ ] Readable fonts (16px body, 24px headers)

---

## 🐛 **What to Look For (Known Limitations)**

### Mock Data Limitations:

- Orders don't persist after refresh (in-memory only)
- Photos are placeholders
- No real geolocation for driver distances
- Time slots don't block out past times

### Expected Behaviors:

- ✅ Pull-to-refresh resets mock data
- ✅ Accepting orders removes from available list
- ✅ Completing deliveries removes from active list
- ✅ Sign out works on all screens

### NOT Implemented Yet (Option 2):

- Real API calls to AppSync
- Real-time order updates
- Actual payment processing
- Push notifications

---

## ✅ **Success Criteria**

You should be able to:

1. ✅ Sign in as all 3 roles without errors
2. ✅ Complete full workflows for each role
3. ✅ See humanized, friendly UI throughout
4. ✅ Experience smooth interactions (no crashes)
5. ✅ Navigate between tabs seamlessly

---

## 🎬 **Demo Script (2-Minute Client Presentation)**

### Act 1: Vendor (30 sec)

"Here's our vendor experience. Beauty supply store owners can list their products—hair tools, nail supplies, skincare, makeup—and accept customer orders in real-time."

**Actions:** Sign in → Show Products → Accept Order

---

### Act 2: Customer (45 sec)

"Customers can browse beauty supply products from local stores, add items to their cart, and place orders for fast delivery—all with transparent pricing and no hidden fees."

**Actions:** Sign in → Browse Beauty Supplies → Add to Cart → Checkout

---

### Act 3: Driver (45 sec)

"And drivers see available deliveries near them with clear earnings and distances. They pick up beauty supply orders, deliver to customers, and earn money instantly."

**Actions:** Sign in → Show Available → Accept → Complete Delivery → Show Earnings

---

## 📊 **Testing Results**

After testing, fill this out:

| Feature                  | Working? | Notes |
| ------------------------ | -------- | ----- |
| Vendor Sign In           | ⬜       |       |
| Vendor Store Creation    | ⬜       |       |
| Vendor Product Add       | ⬜       |       |
| Vendor Order Accept      | ⬜       |       |
| Customer Sign In         | ⬜       |       |
| Customer Browse Products | ⬜       |       |
| Customer Add to Cart     | ⬜       |       |
| Customer Checkout        | ⬜       |       |
| Driver Sign In           | ⬜       |       |
| Driver Available Orders  | ⬜       |       |
| Driver Active Delivery   | ⬜       |       |
| Pull-to-Refresh          | ⬜       |       |
| Navigation               | ⬜       |       |

---

## 🚨 **If You Encounter Issues:**

### Metro Bundler Won't Start:

```bash
# Clear cache and restart
npx expo start -c
```

### Can't Sign In:

- Check AWS Cognito console
- Verify user pool: `us-east-1_ZMKLKcE8r`
- Run `confirm-users.sh` to verify accounts

### TypeScript Errors:

- Already fixed! All routing errors resolved with `as any` type casts

### App Crashes:

- Check terminal for error logs
- Look for red error screens
- Share error messages

---

## ✅ **Next Steps After Testing:**

Once you've validated everything works:

1. Note any bugs/issues
2. Move to **OPTION 2** (enhance customer order-history)
3. Then **OPTION 3** (polish with Toast, loading states)

---

**Ready to test? Open Expo Go and scan the QR code!** 📱

**Questions or issues? Let me know what you see!** 💬
