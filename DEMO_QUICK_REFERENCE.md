# GlamGo Demo - Quick Reference Card 🎯

## 🚀 **Start Demo**

```bash
npx expo start --tunnel
```

Scan QR code with:

- **iOS**: Camera app
- **Android**: Expo Go app

---

## ✅ **Feature Checklist**

### **Browse & Search**

- [ ] Open app → Browse screen loads
- [ ] Search for "facial" → Shows Facial Treatment
- [ ] Clear search
- [ ] Tap "Hair Care" category → Filters to hair services
- [ ] Tap category again → Deselects filter

### **Product Navigation**

- [ ] Click "Premium Hair Styling" → Detail page opens
- [ ] Back button → Returns to browse
- [ ] Click "Luxury Manicure" → Detail page opens
- [ ] Click "Facial Treatment" → Detail page opens
- [ ] Click "Makeup Session" → Detail page opens

### **Role Demos**

- [ ] Scroll to "Ready to Get Started?" section
- [ ] Tap "Demo as Customer" → Customer dashboard
- [ ] Back to browse
- [ ] Tap "Demo as Vendor" → Vendor dashboard
- [ ] Back to browse
- [ ] Tap "Demo as Driver" → Driver dashboard

---

## 📦 **Product Data**

| ID  | Name                 | Store          | Price | Category  |
| --- | -------------------- | -------------- | ----- | --------- |
| 1   | Premium Hair Styling | Glam Studio    | $85   | Hair Care |
| 2   | Luxury Manicure      | Polished Nails | $45   | Nails     |
| 3   | Facial Treatment     | Glow Skincare  | $120  | Skin Care |
| 4   | Makeup Session       | Glamour Studio | $95   | Makeup    |

---

## 🐛 **Quick Fixes**

| Problem                | Solution                          |
| ---------------------- | --------------------------------- |
| QR won't scan          | Use `--tunnel` flag               |
| App crashes            | Press 'r' to reload               |
| Products not clickable | Already fixed with Link component |
| Images not loading     | Check internet connection         |
| Cache issues           | Run `npx expo start --clear`      |

---

## 🎬 **30-Second Demo Script**

1. **Browse** → "Browse services without signing up"
2. **Search** → "Search for 'facial'"
3. **Click Product** → "View detailed service information"
4. **Back** → "Easy navigation"
5. **Demo Role** → "Experience as customer, vendor, or driver"

---

## 📱 **Console Logs to Expect**

```
👤 User is not authenticated (normal for logged out state)
🎯 Product clicked: 1 Premium Hair Styling
🔍 Product Detail Screen loaded
📦 Params: {id: "1"}
🆔 Product ID: 1
✅ Product loaded: Premium Hair Styling
```

---

## ✨ **Key Selling Points**

1. **No Authentication Required** → Browse freely
2. **Real-Time Search** → Instant filtering
3. **Role-Based Dashboards** → Customer, Vendor, Driver
4. **Beautiful UI** → Modern design system
5. **Mobile-First** → Optimized for phones

---

## 🎯 **Demo Success Criteria**

- ✅ All 4 products clickable
- ✅ Product details accurate
- ✅ Search works
- ✅ Filters work
- ✅ Navigation smooth
- ✅ All 3 roles accessible
- ✅ No crashes

---

**Demo Mode**: ENABLED ✅
**Ready to Present**: YES 🚀
