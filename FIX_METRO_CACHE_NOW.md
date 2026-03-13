# METRO CACHE FIX - Do This Now!

**The error is Metro bundler cache showing old code**

---

## 🔥 DO THIS NOW (2 minutes):

### **Step 1: Go to your Expo terminal**

The terminal showing the QR code

### **Step 2: Press Ctrl + C**

This stops Expo

### **Step 3: Run this command:**

```bash
npx expo start --tunnel --clear
```

**The `--clear` is critical** - it clears the cache!

### **Step 4: Wait 30 seconds**

QR code will appear

### **Step 5: Scan QR code**

App should load! ✅

---

## ✅ What the Fix Does:

The file `app/(customer)/orders.tsx` was fixed (removed duplicate `});`), but Metro bundler cached the old broken version. The `--clear` flag forces a fresh rebuild.

---

## 🚨 If That Doesn't Work:

### **Full Cache Clear:**

```bash
# Stop Expo (Ctrl+C)

# Clear everything
rm -rf .expo
rm -rf node_modules/.cache
killall -9 node

# Restart fresh
npx expo start --tunnel --clear
```

---

**Just do: Ctrl+C, then `npx expo start --tunnel --clear`**

That's it! Should work in 30 seconds! 🚀
