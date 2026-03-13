# Tomorrow Morning Workflow - Demo Day March 13, 2026

**Goal:** Get demo-ready in 30-45 minutes before client presentation  
**Status:** Phase A complete, testing needed

---

## 🚀 OPTION 1: Quick Test & Demo (Recommended for Tonight)

### **Step 1: Start Amplify Sandbox (5 min)**

```bash
# Terminal 1 - Keep this running
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npx ampx sandbox
```

Wait for: `[Sandbox] Watching for file changes...`

---

### **Step 2: Start Expo in Tunnel Mode (5 min)**

```bash
# Terminal 2 - New terminal window
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npx expo start --tunnel
```

**What to expect:**

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Using Expo Go
› Press s │ switch to development build
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› Press o │ open project code in your editor

› Press ? │ show all commands
```

**Scan QR code with:**

- iOS: Camera app → Opens in Expo Go
- Android: Expo Go app → Scan QR

---

### **Step 3: Sign Up Test Accounts (15 min)**

#### **A. Create Admin Account (Already exists? Skip if yes)**

1. App opens → "Get Started" button
2. Fill form:
   - Email: admin@test.com
   - Password: Test123!
   - Full Name: Admin User
   - Phone: +1234567890
   - Role: **ADMIN**
3. Sign Up → Should auto-approve (admins bypass approval)
4. Log out

#### **B. Create Vendor Account**

1. Sign Up:
   - Email: vendor@test.com
   - Password: Test123!
   - Full Name: Vendor User
   - Phone: +1234567891
   - Role: **VENDOR**
2. Sign Up → "Pending Approval" screen appears ✅
3. Log out

#### **C. Create Customer Account**

1. Sign Up:
   - Email: customer@test.com
   - Password: Test123!
   - Full Name: Customer User
   - Phone: +1234567892
   - Role: **CUSTOMER**
2. Sign Up → "Pending Approval" screen appears ✅
3. Log out

#### **D. Create Driver Account**

1. Sign Up:
   - Email: driver@test.com
   - Password: Test123!
   - Full Name: Driver User
   - Phone: +1234567893
   - Role: **DRIVER**
2. Sign Up → "Pending Approval" screen appears ✅
3. Log out

---

### **Step 4: Admin Approves All Users (10 min)**

1. **Login as Admin**
   - Email: admin@test.com
   - Password: Test123!

2. **Approve Vendor**
   - Dashboard shows "Pending Users"
   - Find: vendor@test.com (Vendor User)
   - Click: **Approve** button
   - Confirm: Success toast appears
   - Status changes to "Active" ✅

3. **Approve Customer**
   - Find: customer@test.com (Customer User)
   - Click: **Approve** button
   - Status changes to "Active" ✅

4. **Approve Driver**
   - Find: driver@test.com (Driver User)
   - Click: **Approve** button
   - Status changes to "Active" ✅

5. **Log out**

---

### **Step 5: Vendor Seeds Products (10 min)**

1. **Login as Vendor**
   - Email: vendor@test.com
   - Password: Test123!

2. **Create Store (if prompted)**
   - Store Name: Glam Beauty Boutique
   - Description: Luxury beauty products
   - Address: 123 Beauty Lane, Los Angeles, CA 90001
   - Phone: (310) 555-0100

3. **Add Product #1 - Makeup**
   - Navigate: Products tab → Add Product
   - Name: Luxury Matte Lipstick
   - Price: 35.00
   - Category: Makeup
   - Description: Long-lasting luxury lipstick with rich pigmentation
   - Image URL: https://images.unsplash.com/photo-1586495777744-4413f21062fa
   - Stock: 50
   - Click: **Save**

4. **Add Product #2 - Skincare**
   - Name: Anti-Aging Night Serum
   - Price: 65.00
   - Category: Skincare
   - Description: Premium night serum with retinol and hyaluronic acid
   - Image URL: https://images.unsplash.com/photo-1620916566398-39f1143ab7be
   - Stock: 30
   - Click: **Save**

5. **Add Product #3 - Haircare**
   - Name: Volumizing Shampoo
   - Price: 28.00
   - Category: Haircare
   - Description: Sulfate-free volumizing shampoo for all hair types
   - Image URL: https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388
   - Stock: 40
   - Click: **Save**

6. **Add Product #4 - Fragrance**
   - Name: Midnight Musk Perfume
   - Price: 85.00
   - Category: Fragrance
   - Description: Sophisticated evening fragrance with woody notes
   - Image URL: https://images.unsplash.com/photo-1541643600914-78b084683601
   - Stock: 20
   - Click: **Save**

7. **Add Product #5 - Accessories**
   - Name: Gold Hoop Earrings
   - Price: 45.00
   - Category: Accessories
   - Description: 18k gold-plated statement hoop earrings
   - Image URL: https://images.unsplash.com/photo-1535632066927-ab7c9ab60908
   - Stock: 25
   - Click: **Save**

8. **Verify: Products tab shows 5 products** ✅
9. **Log out**

---

### **Step 6: Test Customer Flow (10 min)**

1. **Login as Customer**
   - Email: customer@test.com
   - Password: Test123!

2. **Test Browse**
   - Navigate: Browse tab
   - Verify: 5 products display ✅
   - Test filter: Category → Makeup → Shows lipstick ✅
   - Test search: Type "serum" → Shows night serum ✅

3. **Test Add to Cart**
   - Click: "Add to Cart" on Lipstick → Success alert ✅
   - Click: "Add to Cart" on Serum → Success alert ✅
   - Click: "Add to Cart" on Perfume → Success alert ✅

4. **Test Cart**
   - Navigate: Cart tab
   - Verify: 3 items show (Lipstick $35, Serum $65, Perfume $85) ✅
   - Total: $185.00 ✅
   - Update: Lipstick quantity to 2 → Total becomes $220 ✅
   - Remove: Perfume → Total becomes $135 ✅

5. **Test Checkout**
   - Click: "Place Order • $135.00" button
   - Wait: Loading spinner appears
   - Verify: Success alert "Order placed successfully!" ✅
   - Verify: Cart clears (empty) ✅
   - Verify: Redirects to Orders tab ✅

6. **Test Order History**
   - Verify: Order appears with:
     - Order # (e.g., "Order #abc123")
     - Date (today's date)
     - Status: PENDING (coral badge)
     - Total: $135.00
     - Address: 123 Demo Street, Los Angeles, CA
   - ✅ CUSTOMER FLOW COMPLETE

7. **Log out**

---

### **Step 7: Final Verification (5 min)**

**✅ Checklist:**

- [ ] Admin can login and see dashboard
- [ ] Admin can approve users
- [ ] Vendor can login and see 5 products
- [ ] Vendor can add/edit products
- [ ] Customer can browse and see 5 products
- [ ] Customer can add to cart (success alerts)
- [ ] Customer can place order
- [ ] Customer can see order in history
- [ ] Driver can login (just verify, don't test deeply)

**If all ✅ → YOU'RE DEMO READY! 🎉**

---

## 📝 Demo Day Checklist (Tomorrow Morning)

### **30 Minutes Before Demo:**

1. **Charge Device to 100%** 🔋
2. **Start Backend**

   ```bash
   cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
   npx ampx sandbox
   ```

   Wait for: `[Sandbox] Watching for file changes...`

3. **Start Expo**

   ```bash
   npx expo start --tunnel
   ```

   Scan QR code with device

4. **Quick Test (5 min)**
   - Login as customer@test.com
   - Browse → Verify 5 products show
   - Add 1 to cart → Verify works
   - Navigate to Cart → Verify item appears
   - **DO NOT PLACE ORDER** (save for demo)
   - Log out

5. **Prep Talking Points**
   - Open: `DEMO_SCRIPT_MARCH_13.md`
   - Review: Admin → Vendor → Customer → Driver flow
   - Memorize: Stripe gap explanation
   - Memorize: Driver UI gap explanation

6. **Device Setup**
   - Close all other apps
   - Turn on Do Not Disturb
   - Brightness: 80%
   - Keep charger nearby

---

## 🚨 TROUBLESHOOTING

### **Issue: "Pending Approval" screen stuck**

**Fix:** Login as admin → Approve the user → Log back in as that user

### **Issue: Browse shows no products**

**Fix:** Login as vendor@test.com → Add products manually (see Step 5)

### **Issue: "Add to Cart" button doesn't work**

**Fix:** Check console for errors. Verify cart store is imported in browse.tsx

### **Issue: Place Order fails**

**Fix:**

- Check Amplify sandbox is running
- Verify orders Lambda exists
- Check console for error message

### **Issue: Expo won't connect in tunnel mode**

**Fix:**

```bash
# Stop expo (Ctrl+C)
# Clear cache and restart
npx expo start --tunnel --clear
```

### **Issue: App crashes on startup**

**Fix:**

```bash
# Clear everything and rebuild
rm -rf node_modules
npm install
npx expo start --clear
```

---

## 🎯 DEMO FLOW QUICK REFERENCE

**15-20 Minute Demo Structure:**

1. **Admin (3 min):** Login → Show pending users → Approve vendor
2. **Vendor (4 min):** Login → Show products → Add new product → Edit product
3. **Customer (6 min):** Login → Browse → Add to cart (3 items) → Cart → Checkout → Order history
4. **Driver (2 min):** Login → Show available orders screen → Explain backend ready
5. **Architecture (3 min):** Show API test panel → Explain security
6. **Wrap-up (2 min):** Summary of completion, discuss gaps

---

## 💡 TALKING POINTS FOR GAPS

**When asked about Stripe:**
_"The order creation flow you just saw demonstrates our backend Lambda processing orders in real-time. Stripe payment capture is the next layer - we're integrating it Week 9. The foundation is complete."_

**When asked about Driver:**
_"The driver geospatial backend is live - we have a Lambda function finding nearby drivers using DynamoDB geohashing. The UI screens for accepting and completing deliveries launch Week 9, completing our Week 8 milestone."_

**When asked about Vendor Orders:**
_"Vendors have complete control over their product catalog, which drives the business model. The order management screen connects to the same backend processing customer orders - launching Week 9 as part of Phase 3 completion."_

---

**Last Updated:** March 12, 2026  
**Next Review:** Tomorrow morning before demo  
**Good luck! You've got this! 🚀**
