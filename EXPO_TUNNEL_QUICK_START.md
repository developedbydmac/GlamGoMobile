# Quick Start Commands - Expo Tunnel Mode

**Use this for quick reference when starting your demo environment**

---

## 🚀 START EVERYTHING (2 Terminals)

### **Terminal 1: Amplify Sandbox**

```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npx ampx sandbox
```

**Wait for:**

```
[Sandbox] Watching for file changes...
Hosting endpoint: https://xxxxx.lambda-url.us-east-1.on.aws/
```

**Keep this terminal running** - Don't close it!

---

### **Terminal 2: Expo Tunnel Mode**

```bash
cd /Users/daquanmcdaniel/Documents/2026/GlamGoMobile/GlamGoMobile
npx expo start --tunnel
```

**What you'll see:**

```
Starting Metro Bundler
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ████ ████ ████ ████ ████ ████ ████ ████ ████ ████ ████   │
│   ████ ████ ████ ████ ████ ████ ████ ████ ████ ████ ████   │
│   ████ ████ ████ ████ ████ ████ ████ ████ ████ ████ ████   │
│   ████ ████ ████ ████ ████ ████ ████ ████ ████ ████ ████   │
│                                                              │
└──────────────────────────────────────────────────────────────┘

› Using Expo Go
› Press s │ switch to development build
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu

› Press ? │ show all commands
```

---

## 📱 CONNECT YOUR DEVICE

### **iPhone/iPad:**

1. Open **Camera** app (built-in iOS camera)
2. Point at QR code on screen
3. Notification appears: "Open in Expo Go"
4. Tap notification
5. App loads in Expo Go

### **Android:**

1. Open **Expo Go** app (download from Play Store if needed)
2. Tap "Scan QR Code" button
3. Point at QR code on screen
4. App loads automatically

---

## 🔧 USEFUL EXPO COMMANDS

**While Expo is running, press these keys:**

| Key | Action                          |
| --- | ------------------------------- |
| `r` | Reload app (refresh)            |
| `m` | Toggle developer menu           |
| `j` | Open debugger (Chrome DevTools) |
| `c` | Clear cache and reload          |
| `?` | Show all commands               |

**To reload app on device:**

- iOS: Shake device → Tap "Reload"
- Android: Shake device → Tap "Reload"

---

## 🚨 TROUBLESHOOTING

### **Issue: QR Code won't scan**

```bash
# Press 's' for expo-dev-client or try:
npx expo start --tunnel --clear
```

### **Issue: "Unable to resolve module"**

```bash
# Stop Expo (Ctrl+C), then:
rm -rf node_modules
npm install
npx expo start --tunnel --clear
```

### **Issue: Tunnel connection fails**

```bash
# Try without tunnel (local network):
npx expo start

# Or try LAN:
npx expo start --lan
```

### **Issue: Metro bundler error**

```bash
# Clear everything:
npx expo start --clear
watchman watch-del-all  # If watchman installed
```

### **Issue: App won't load/white screen**

```bash
# In Expo terminal, press 'r' to reload
# Or shake device → Reload
```

---

## 📋 DEMO DAY STARTUP CHECKLIST

**30 minutes before demo:**

- [ ] **Terminal 1:** Start Amplify sandbox

  ```bash
  npx ampx sandbox
  ```

  Wait for "Watching for file changes..."

- [ ] **Terminal 2:** Start Expo tunnel

  ```bash
  npx expo start --tunnel
  ```

  Wait for QR code

- [ ] **Device:** Scan QR code, open in Expo Go
- [ ] **Test login:** customer@test.com / Test123!
- [ ] **Verify:** Browse shows 5 products
- [ ] **Close:** All other apps on device
- [ ] **Enable:** Do Not Disturb mode
- [ ] **Check:** Device charged to 100%
- [ ] **Open:** DEMO_SCRIPT_MARCH_13.md on laptop

**✅ Ready to demo!**

---

## 💡 PRO TIPS

**Keep terminals visible:**

- Terminal 1 (Amplify): Check for Lambda errors
- Terminal 2 (Expo): Check for React errors

**If app crashes during demo:**

1. Press `r` in Expo terminal to reload
2. Or shake device → Reload
3. Fallback: Show screenshots/code

**Network requirements:**

- Tunnel mode works over any internet connection
- Device and laptop don't need same WiFi
- Good for presenting in client's office

**Performance:**

- Tunnel mode slightly slower than LAN
- If laggy, use: `npx expo start --lan` (requires same WiFi)

---

## 🎯 QUICK TEST COMMANDS

**Test if everything works:**

```bash
# Terminal 1
npx ampx sandbox

# Terminal 2
npx expo start --tunnel

# On device: Scan QR → Login → Browse → Should see products
```

**If products don't show:**

```bash
# Login as vendor@test.com
# Add products manually via app
# See TOMORROW_MORNING_WORKFLOW.md Step 5
```

---

**Last Updated:** March 12, 2026  
**Keep this document handy during demo!**
