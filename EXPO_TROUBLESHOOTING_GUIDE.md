# Expo Troubleshooting Guide - Get Running NOW

**Problem:** Can't get into Expo Go or having terminal issues  
**Solution:** Step-by-step fixes below

---

## 🚀 METHOD 1: Fresh Start (RECOMMENDED - 5 min)

### **Step 1: Close Everything**

1. Close ALL terminal windows
2. Close Expo Go app on phone (swipe up to quit)
3. Quit VS Code completely

### **Step 2: Open Fresh Terminal**

```bash
# Open new terminal (Command + Space → type "Terminal")
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
```

### **Step 3: Start Amplify Sandbox**

```bash
npx ampx sandbox
```

**Wait for this message:**

```
[Sandbox] Watching for file changes...
```

**If you see errors, note them and skip to Troubleshooting section below**

### **Step 4: Open SECOND Terminal Window**

```bash
# Command + T for new tab, or open new terminal window
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
```

### **Step 5: Start Expo (Choose ONE method)**

**Option A: Tunnel Mode (works anywhere)**

```bash
npx expo start --tunnel
```

**Option B: Local Mode (faster, requires same WiFi)**

```bash
npx expo start
```

**Option C: iOS Simulator (if you have Xcode)**

```bash
npx expo start
# Then press 'i' for iOS simulator
```

---

## 📱 CONNECTING YOUR PHONE

### **iPhone/iPad:**

1. **Make sure Expo Go is installed:**
   - App Store → Search "Expo Go" → Install
2. **Open Camera app** (built-in iOS camera)

3. **Point at QR code** in terminal

4. **Tap notification** "Open in Expo Go"

5. **App should load** (takes 30-60 seconds first time)

**If notification doesn't appear:**

- Open Expo Go app directly
- Tap "Enter URL manually"
- Copy URL from terminal (looks like: `exp://192.168.x.x:8081`)
- Paste and Go

### **Android:**

1. **Make sure Expo Go is installed:**
   - Google Play Store → Search "Expo Go" → Install

2. **Open Expo Go app**

3. **Tap "Scan QR Code"**

4. **Point at QR code** in terminal

5. **App should load**

---

## 🚨 COMMON ERRORS & FIXES

### **Error: "Metro bundler failed to start"**

```bash
# Fix: Clear cache and restart
npx expo start --clear
```

### **Error: "Unable to resolve module"**

```bash
# Fix: Reinstall dependencies
rm -rf node_modules
npm install
npx expo start --clear
```

### **Error: "Command not found: expo"**

```bash
# Fix: Install Expo CLI
npm install -g expo-cli

# Or use npx (no install needed)
npx expo start
```

### **Error: "Tunnel connection failed"**

```bash
# Fix: Use local mode instead
npx expo start

# Make sure phone and computer on same WiFi
```

### **Error: "Port 8081 already in use"**

```bash
# Fix: Kill existing Metro process
lsof -ti:8081 | xargs kill -9

# Then restart
npx expo start
```

### **Error: QR code shows but phone won't connect**

**Fix for iPhone:**

```bash
# 1. Stop expo (Ctrl+C)
# 2. Restart with tunnel
npx expo start --tunnel

# 3. Or get direct URL
npx expo start
# Look for line that says: "exp://192.168.x.x:8081"
# Open Expo Go → Enter URL manually → Paste URL
```

**Fix for Android:**

```bash
# Same as above, use tunnel mode
npx expo start --tunnel
```

### **Error: "Expo Go installed but app won't load"**

**Check these:**

1. Phone and computer on same WiFi? (if not using tunnel)
2. Firewall blocking? (try tunnel mode: `npx expo start --tunnel`)
3. VPN enabled? (disable VPN on computer)
4. Corporate network? (use tunnel mode or hotspot)

---

## 🔧 NUCLEAR OPTION: Complete Reset

**If nothing works, do this:**

```bash
# 1. Stop all terminals (Ctrl+C multiple times)

# 2. Kill all node processes
killall node

# 3. Clear all caches
rm -rf node_modules
rm -rf .expo
rm -rf ios/build
npm cache clean --force

# 4. Reinstall everything
npm install

# 5. Start fresh
npx expo start --tunnel --clear
```

---

## ✅ SUCCESS CHECKLIST

**You know Expo is working when:**

- [ ] Terminal shows QR code
- [ ] Terminal shows: `› Metro waiting on exp://...`
- [ ] Terminal shows: `› Press ? │ show all commands`
- [ ] Phone can scan QR or enter URL
- [ ] Expo Go opens on phone
- [ ] "Downloading JavaScript bundle" appears
- [ ] App loads (shows login/signup screen)

---

## 🎯 QUICK TEST

**Once app loads:**

1. Tap "Get Started"
2. Should see signup form
3. Try typing in email field
4. If keyboard works → ✅ Expo is working!

**Don't create accounts yet - just verify it loads**

---

## 📞 STILL STUCK? Try This:

### **Option 1: iOS Simulator (No Phone Needed)**

```bash
# Install Xcode from App Store (takes 1 hour, 12GB)
# Then:
npx expo start
# Press 'i' for iOS simulator
```

### **Option 2: Android Emulator**

```bash
# Install Android Studio first
# Create virtual device
# Then:
npx expo start
# Press 'a' for Android emulator
```

### **Option 3: Web Browser (Quick Test)**

```bash
npx expo start
# Press 'w' for web browser
# Limited functionality but works for testing
```

---

## 🆘 WHAT TO TELL ME

**If still not working, send me:**

1. **Error message from terminal** (copy/paste exact text)

2. **What command you ran:**

   ```
   Example: "I ran: npx expo start --tunnel"
   ```

3. **What you see:**
   - [ ] QR code appears?
   - [ ] Error message?
   - [ ] Terminal stuck/frozen?
   - [ ] Phone can't scan?

4. **Your setup:**
   - Phone: iPhone or Android?
   - Computer: Mac (you have this) ✅
   - Same WiFi: Yes or No?
   - Expo Go installed: Yes or No?

---

## 📱 ALTERNATIVE: Use Simulator Instead

**If phone connection is too problematic:**

### **For iOS (Mac only):**

```bash
# 1. Install Xcode from App Store (if not installed)
# Takes ~1 hour, ~12GB

# 2. Install Xcode Command Line Tools
xcode-select --install

# 3. Start Expo
npx expo start

# 4. Press 'i' to open iOS simulator
# Simulator will launch automatically
```

**Advantage:** No phone needed, faster for testing

---

## 🎬 STEP-BY-STEP VIDEO WALKTHROUGH

**Terminal 1 (Amplify):**

```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npx ampx sandbox
# Wait 30 seconds...
# See: "[Sandbox] Watching for file changes..."
# ✅ Leave this running
```

**Terminal 2 (Expo):**

```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npx expo start --tunnel
# Wait 30 seconds...
# See: QR code appear
# ✅ Scan with phone
```

**Phone:**

1. Camera app → Point at QR
2. Tap notification
3. Wait 60 seconds for download
4. See login screen
5. ✅ Success!

---

## 💡 PRO TIPS

**Fastest method:**

```bash
# Skip Amplify for now, just test Expo
npx expo start --tunnel
```

**If you can get Expo working, you can:**

1. Test if app loads
2. See login/signup screen
3. Test basic navigation
4. Create test accounts

**Then later, start Amplify for backend**

---

**Last Updated:** March 12, 2026  
**Let me know what error you're seeing and I'll help fix it!** 🚀
