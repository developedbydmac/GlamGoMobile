# 📱 Running GlamGo on Xcode iOS Simulator

**Date:** February 12, 2026  
**Goal:** Test the app on iOS Simulator via Xcode

---

## 🚀 Quick Start (Easiest Method)

### **Option 1: Press 'i' in Expo** (Recommended)
```bash
# Make sure Xcode is open
# In your terminal where Expo is running:
npx expo start

# Then press 'i' when you see the QR code
# This will automatically:
# 1. Build the app
# 2. Launch iOS Simulator
# 3. Install and open the app
```

---

## 🔧 Option 2: Full Native Build with Xcode

If you want to build the native iOS project:

### **Step 1: Generate iOS Native Code**
```bash
# This creates the ios/ folder with Xcode project
npx expo run:ios
```

This will:
- ✅ Create `ios/` folder with `.xcworkspace`
- ✅ Install CocoaPods dependencies
- ✅ Build the app for iOS
- ✅ Launch iOS Simulator automatically
- ✅ Install the app on the simulator

### **Step 2: Choose Your Simulator**
Xcode will use the default simulator, but you can specify:
```bash
# List available simulators
xcrun simctl list devices available

# Run on specific device
npx expo run:ios --simulator="iPhone 15 Pro"
npx expo run:ios --simulator="iPhone 14"
```

### **Step 3: Open in Xcode** (Optional)
After running `npx expo run:ios`, you can open the project in Xcode:
```bash
# Open the workspace (NOT the .xcodeproj!)
open ios/GlamGoMobile.xcworkspace
```

In Xcode:
1. Select target device from top toolbar (e.g., iPhone 15 Pro)
2. Click ▶️ (Play button) to build and run
3. Wait for build to complete
4. Simulator will launch with your app

---

## 🎯 What to Test

### **1. Navigation Flow:**
- ✅ Browse screen loads with real photos
- ✅ Tap "Sign Up" → See role selection
- ✅ "Back to Browse" button works
- ✅ Select role → See sign-up screen
- ✅ "Back to Role Selection" works

### **2. Role-Based Tabs:**
Sign in with each role and verify correct tabs:

**Vendor Account** (daquanmac@gmail.com):
- ✅ Dashboard (gold theme)
- ✅ Products (gold theme)
- ✅ Orders (gold theme)
- ✅ Profile (gold theme)

**Driver Account** (dmcda28@wgu.edu):
- ✅ Available (blue theme)
- ✅ Active (blue theme)
- ✅ Earnings (blue theme)
- ✅ Profile (blue theme)

**Customer Account** (create new):
- ✅ Shop (purple theme) - Should see 6 services with photos
- ✅ Cart (purple theme)
- ✅ Orders (purple theme)
- ✅ Profile (purple theme)

### **3. Visual Polish:**
- ✅ Real beauty service photos load
- ✅ Safe area (iPhone notch/home indicator)
- ✅ Back buttons have chevron icons
- ✅ Colors match role (purple/gold/blue)
- ✅ Modern design system throughout

### **4. Performance:**
- ✅ Images load smoothly
- ✅ No flickering
- ✅ Smooth scrolling
- ✅ Quick navigation

---

## 🐛 Troubleshooting

### **Problem: "Command not found: pod"**
**Solution:** Install CocoaPods
```bash
sudo gem install cocoapods
```

### **Problem: "No devices available"**
**Solution:** Open Xcode and download iOS Simulator
```
Xcode → Settings → Platforms → iOS → Download
```

### **Problem: "Port 8081 already in use"**
**Solution:** Kill the old process
```bash
kill 16401
# Or use different port
npx expo start --port 8082
```

### **Problem: Build fails in Xcode**
**Solution:** Clean build folder
```
Xcode → Product → Clean Build Folder (Shift+Cmd+K)
Then: Product → Build (Cmd+B)
```

### **Problem: White screen on launch**
**Solution:** 
1. Check Metro bundler is running (`npx expo start`)
2. Shake device in simulator (Cmd+Ctrl+Z)
3. Select "Reload" from dev menu

---

## 📱 Simulator Controls

### **Useful Shortcuts:**
- **Cmd+R** - Reload app
- **Cmd+D** - Open dev menu
- **Cmd+Ctrl+Z** - Shake device (dev menu)
- **Cmd+K** - Toggle keyboard
- **Cmd+Shift+H** - Go to home screen
- **Cmd+L** - Simulate location
- **Cmd+1/2/3** - Resize simulator window

### **Navigate to Settings:**
1. Press **Cmd+Shift+H** (home screen)
2. Tap Settings app
3. Test notifications, permissions, etc.

---

## 🎬 Step-by-Step Demo Flow

### **Complete Test Run:**

1. **Start Fresh:**
   ```bash
   npx expo start
   # Press 'i' for iOS simulator
   ```

2. **Browse Screen (Unauthenticated):**
   - See 4 featured services with real photos ✅
   - Lock badges on cards ✅
   - Categories displayed ✅
   - Search bar visible ✅

3. **Navigate to Sign-Up:**
   - Tap "Create Free Account"
   - See role selection with modern design ✅
   - "Back to Browse" button works ✅

4. **Sign Up as Customer:**
   - Select "I need beauty services" ✅
   - Tap Continue ✅
   - Fill in email/password ✅
   - Enter verification code ✅

5. **Customer Experience:**
   - Auto-routed to Shop tab ✅
   - See 6 services in 2-column grid ✅
   - Real photos loaded ✅
   - Purple theme throughout ✅
   - Try Cart, Orders, Profile tabs ✅

6. **Sign Out & Test Vendor:**
   - Profile → Sign Out ✅
   - Sign in as vendor (daquanmac@gmail.com) ✅
   - See Dashboard, Products, Orders tabs ✅
   - Gold theme ✅

7. **Sign Out & Test Driver:**
   - Sign in as driver (dmcda28@wgu.edu) ✅
   - See Available, Active, Earnings tabs ✅
   - Blue theme ✅

---

## 🎯 What You Should See

### **On First Launch:**
```
[Splash Screen]
     ↓
[Browse Screen]
├─ Real photos: Hair, Nails, Facial, Makeup
├─ Categories with icons
├─ Search bar
├─ "Create Free Account" button
└─ "Sign in" link
```

### **After Sign-In (Customer):**
```
[Shop Tab] - Purple Theme
├─ "Discover Services" header
├─ Search bar
└─ 6 service cards in 2 columns:
    ├─ Luxury Hair Styling ($85) [Photo]
    ├─ Premium Manicure ($45) [Photo]
    ├─ Facial Treatment ($120) [Photo]
    ├─ Makeup Application ($95) [Photo]
    ├─ Massage Therapy ($110) [Photo]
    └─ Eyelash Extensions ($150) [Photo]
```

---

## ✅ Success Checklist

- [ ] iOS Simulator launched
- [ ] App installed and opens
- [ ] Browse screen shows real photos
- [ ] Navigation back buttons work
- [ ] Role selection looks modern
- [ ] Sign-up flow works
- [ ] Customer sees 6 services with photos
- [ ] Vendor sees dashboard with gold theme
- [ ] Driver sees jobs with blue theme
- [ ] Safe area handled properly
- [ ] No UI glitches or crashes

---

## 🚨 Known Issues to Expect

### **1. Sign-In May Fail**
- Some users report sign-in errors
- Workaround: Use new sign-up instead
- Root cause: Unconfirmed Cognito users

### **2. Images Load from Internet**
- Requires internet connection
- Using Unsplash CDN
- May see grey background while loading

### **3. Mock Data Only**
- Products are hardcoded
- Not fetching from database yet
- Phase 3 will connect real data

---

## 📸 Screenshot Checklist

Take screenshots of:
1. ✅ Browse screen with real photos
2. ✅ Role selection modern design
3. ✅ Customer Shop with 6 services
4. ✅ Vendor Dashboard gold theme
5. ✅ Driver Available blue theme

Share these to show progress! 🎉

---

## 🎉 You're Ready!

Run this command and watch your app come to life on the iOS Simulator:

```bash
npx expo start
# Then press 'i'
```

The simulator should launch automatically, and your app will install and open. Enjoy testing! 🚀
