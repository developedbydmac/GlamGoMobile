# GlamGo Mobile - Quick Start Guide

## 🚀 Quick Setup

### 1. Backend Deployment

The Amplify sandbox should be running in your terminal. Wait until you see:

```
✅ Deployment succeeded!
Deployed resources are available to use
```

### 2. Start the App

In a new terminal, run:

```bash
npm start
```

Then:

- Press `w` for web browser
- Press `i` for iOS simulator (requires Xcode)
- Press `a` for Android emulator
- Or scan the QR code with Expo Go on your phone

## 📱 Testing on Mobile Web Browser

### Option 1: Desktop Browser (Mobile Simulation)

1. Open `http://localhost:8081` in your browser
2. Open DevTools (F12 or Cmd+Option+I)
3. Toggle device toolbar (Cmd+Shift+M or Ctrl+Shift+M)
4. Select iPhone/Android device from dropdown
5. The app is now mobile-responsive!

### Option 2: Your Phone's Browser (Same WiFi)

1. Find your local IP in the terminal (e.g., `exp://192.168.200.3:8081`)
2. Open your phone's browser (Safari/Chrome)
3. Navigate to: `http://192.168.200.3:8081` (use your IP)
4. The app will load mobile-optimized with the GlamGo logo!

## 📱 Testing the Complete Flow

### Test 1: Sign Up as CUSTOMER

1. Open the app → Select **Customer** ✨ role
2. Fill in details:
   - Name: `Test Customer`
   - Email: `customer@test.com` (use your real email)
   - Password: `Test@1234`
3. Check email → Enter verification code
4. ✅ You should see your profile with "Role: CUSTOMER"

### Test 2: Sign Up as VENDOR

1. Sign Out → Select **Vendor** 💅 role
2. Use different email: `vendor@test.com`
3. Complete verification
4. ✅ Check AWS Console → You'll see "custom:role = VENDOR"

### Test 3: Sign Up as DRIVER

1. Sign Out → Select **Driver** 🚗 role
2. Use different email: `driver@test.com`
3. Complete verification
4. ✅ Verify in AWS Console

## 🔍 Verify in AWS Console

1. Open: https://console.aws.amazon.com/cognito/
2. Find user pool: `amplify-glamgomobile-*-sandbox-*`
3. Click **Users** → Select a user
4. **Check Attributes tab** for:
   - ✅ `email`
   - ✅ `name`
   - ✅ `custom:role` (CUSTOMER/VENDOR/DRIVER)

## 🎯 Acceptance Criteria Status

✅ User can sign up on phone  
✅ User can choose role during sign-up  
✅ Role stored as `custom:role` in Cognito  
✅ User visible in AWS Cognito Console with role  
✅ High-fidelity UI with modern design  
✅ Uses Amplify UI components where applicable  
✅ Email verification flow  
✅ Sign in/out functionality

## 🐛 Common Issues

### "Network request failed"

- Ensure sandbox is running and deployed
- Check your internet connection
- Try restarting the Expo dev server

### "Invalid verification code"

- Check spam folder for email
- Request a new code
- Ensure you're using the latest code

### Password validation error

Password must have:

- ✅ 8+ characters
- ✅ Uppercase (A-Z)
- ✅ Lowercase (a-z)
- ✅ Number (0-9)
- ✅ Special char (!@#$%^&\*)

Example valid password: `Test@1234`

## 📸 Screenshots to Take

1. Role selection screen
2. Sign-up form with role indicator
3. Verification code screen
4. Home screen showing user info with role
5. AWS Console showing user with custom:role attribute

## 🎉 Success!

If you can:

1. ✅ Sign up with each role
2. ✅ See users in AWS Console
3. ✅ Verify `custom:role` attribute is set correctly

**You've successfully completed the implementation!**

## 📚 Next Steps

See `AUTH_README.md` for:

- Auto-assign users to groups via Lambda
- Implement role-based access control
- Add group-based API authorization
