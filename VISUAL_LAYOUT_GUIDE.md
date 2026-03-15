# 🎨 VISUAL LAYOUT GUIDE

## What You'll See When You Open the Portals

---

## Admin Portal: Dashboard Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  GlamGo      🔴 ☰  [Sidebar Toggle]          Dashboard    [Logout] │ ← TOP BAR (Sticky)
├────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard        │                                               │
│ 👥 Users          │  DASHBOARD                                     │
│ 📦 Orders         │  Real-time platform management                │
│ 🚗 Drivers        │                                               │
│                   │  ┌─────────┬─────────┬─────────┬─────────┐   │
│                   │  │ ⏳ Pending│ 🏪 Pending│ ✅ Approved│ 🚗 Available│
│                   │  │  Users   │ Vendors  │ Drivers │ Vehicles │
│                   │  │    12    │    8     │   5     │    3    │
│                   │  └─────────┴─────────┴─────────┴─────────┘   │
│                   │                                               │
│ [SIDEBAR]         │  Recent Orders                                │
│                   │  ┌─────────────────────────────────────────┐ │
│                   │  │ Order #001  $45.99  • In Progress      │ │
│                   │  │ Order #002  $32.50  • Pending Driver   │ │
│                   │  │ Order #003  $88.00  • Delivered        │ │
│                   │  └─────────────────────────────────────────┘ │
│                   │                                               │
│                   │  Pending Approvals                            │
│                   │  ┌─────────────────────────────────────────┐ │
│                   │  │ John Smith (Vendor) [APPROVE] [REJECT] │ │
│                   │  │ Jane Doe (Driver)   [APPROVE] [REJECT] │ │
│                   │  └─────────────────────────────────────────┘ │
│                   │                                               │
└────────────────────────────────────────────────────────────────────┘
```

**Colors**:
- Deep Plum sidebar (#5D3E61)
- Rose highlight on active item (#E87B7B)
- Yellow, Blue, Green, Purple stat cards
- White content area

---

## Admin Portal: Users Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  GlamGo      🔴 ☰                        User Management [Logout]   │
├────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard        │ User Management                             │
│ 👥 Users          │ Approve vendors, drivers, and manage users   │
│ 📦 Orders         │                                             │
│ 🚗 Drivers        │ [Pending] [Vendor] [Driver] [Customer] [All]│
│                   │                                             │
│ [SIDEBAR]         │ ┌──────────────────────────────────────────┐│
│                   │ │ John Smith (Pending)                   │ │
│                   │ │ john@test.com • 555-1234               │ │
│                   │ │ [APPROVE] [REJECT]                    │ │
│                   │ └──────────────────────────────────────────┘│
│                   │                                             │
│                   │ ┌──────────────────────────────────────────┐│
│                   │ │ Jane's Hair Studio (Vendor)            │ │
│                   │ │ jane@salon.com • 555-5678              │ │
│                   │ │ [APPROVE] [REJECT]                    │ │
│                   │ └──────────────────────────────────────────┘│
│                   │                                             │
│                   │ ┌──────────────────────────────────────────┐│
│                   │ │ Mike Johnson (Driver)                  │ │
│                   │ │ mike@deliver.com • 555-9999            │ │
│                   │ │ Rating: ★ 4.8 • Deliveries: 247       │ │
│                   │ │ [APPROVE] [REJECT]                    │ │
│                   │ └──────────────────────────────────────────┘│
│                   │                                             │
└────────────────────────────────────────────────────────────────────┘
```

---

## Admin Portal: Orders Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  GlamGo      🔴 ☰                        Order Management [Logout]  │
├────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard        │ Order Management                            │
│ 👥 Users          │ Manage orders, assign drivers                │
│ 📦 Orders         │                                             │
│ 🚗 Drivers        │ [All] [Pending] [Confirmed] [Assigned] [Done]│
│                   │                                             │
│ [SIDEBAR]         │ ┌──────────────────────────────────────────┐│
│                   │ │ Order #ORD001          Status: PENDING  │ │
│                   │ │ Customer: Maria Smith                  │ │
│                   │ │ Items: Hair serum $45.99               │ │
│                   │ │ Driver: [Select Driver ▼]             │ │
│                   │ │ [UPDATE STATUS]                       │ │
│                   │ └──────────────────────────────────────────┘│
│                   │                                             │
│                   │ ┌──────────────────────────────────────────┐│
│                   │ │ Order #ORD002     Status: IN_PROGRESS  │ │
│                   │ │ Customer: Tom Brown                    │ │
│                   │ │ Items: Nail polish $32.50              │ │
│                   │ │ Driver: Michael J. (★ 4.9)            │ │
│                   │ │ [MARK DELIVERED]                      │ │
│                   │ └──────────────────────────────────────────┘│
│                   │                                             │
└────────────────────────────────────────────────────────────────────┘
```

---

## Vendor Portal: Dashboard Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  GlamGo      🔴 ☰                          Dashboard    [Logout]    │
├────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard        │ Dashboard                                   │
│ 📦 Products         │ Welcome to your vendor dashboard             │
│ 🛒 Orders           │                                             │
│ 📈 Analytics        │ ┌──────┬──────┬──────┬──────┐               │
│ 👤 Profile          │ │Active │Total │Pending│Completed│          │
│                     │ │Prod.  │Prod. │Orders │Orders  │          │
│ [SIDEBAR]           │ │ 12    │ 18   │  3    │  247   │          │
│                     │ └──────┴──────┴──────┴──────┘               │
│                     │                                             │
│                     │ Monthly  Total    Conversion               │
│                     │ Revenue  Revenue  Rate                     │
│                     │ $8,450   $45,230  8.2%                    │
│                     │                                             │
│                     │ Rating        Reviews                      │
│                     │ ★ 4.8        247                          │
│                     │                                             │
│                     │ ┌─────────────┬──────────┬────────────────┐│
│                     │ │ + Add Product│ View     │ View Analytics│ │
│                     │ │              │ Orders   │               │ │
│                     │ └─────────────┴──────────┴────────────────┘│
│                     │                                             │
└────────────────────────────────────────────────────────────────────┘
```

---

## Vendor Portal: Products Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  GlamGo      🔴 ☰                         Products      [Logout]    │
├────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard        │ Products                                    │
│ 📦 Products         │ Manage your product catalog    [+ Add]      │
│ 🛒 Orders           │                                             │
│ 📈 Analytics        │ [All] [Active] [Draft] [Inactive] [Disc]   │
│ 👤 Profile          │                                             │
│                     │ ┌──────────────┬──────────────┬────────────┐│
│ [SIDEBAR]           │ │ Hair Serum   │ Face Cream   │ Nail Polish││
│                     │ │ $45.99       │ $32.99       │ $12.99     ││
│                     │ │ ★ 4.8        │ ★ 4.5        │ ★ 4.9      ││
│                     │ │ In Stock: 145 │ In Stock: 82 │ In Stock:60││
│                     │ │ [EDIT][DELETE]│ [EDIT][DELETE]│[EDIT][DEL]││
│                     │ └──────────────┴──────────────┴────────────┘│
│                     │                                             │
│                     │ ┌──────────────┬──────────────┐             │
│                     │ │ Lip Balm     │ Makeup Set   │             │
│                     │ │ $8.99        │ $62.99       │             │
│                     │ │ ★ 4.7        │ ★ 4.6        │             │
│                     │ │ In Stock: 200 │ In Stock: 15 │             │
│                     │ │ [EDIT][DELETE]│ [EDIT][DELETE]            │
│                     │ └──────────────┴──────────────┘             │
│                     │                                             │
└────────────────────────────────────────────────────────────────────┘
```

---

## Vendor Portal: Analytics Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  GlamGo      🔴 ☰                      Analytics       [Logout]     │
├────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard        │ Analytics                                   │
│ 📦 Products         │ Track your sales and performance            │
│ 🛒 Orders           │                                             │
│ 📈 Analytics        │ ┌─────────┬──────────┬────────┬──────────┐ │
│ 👤 Profile          │ │ 12,456  │ 3,284    │  847   │ $34,582  │ │
│                     │ │ Views   │ Clicks   │ Orders │ Revenue  │ │
│                     │ └─────────┴──────────┴────────┴──────────┘ │
│ [SIDEBAR]           │                                             │
│                     │ Date      Views  Clicks Orders Revenue Conv.│
│                     │ ─────────────────────────────────────────── │
│                     │ Mar 14    456    127    45    $1,280   9.8% │
│                     │ Mar 13    423    98     38    $1,145   8.9% │
│                     │ Mar 12    512    156    52    $1,560   10.1%│
│                     │ Mar 11    488    134    41    $1,230   8.4% │
│                     │ Mar 10    501    142    48    $1,440   9.6% │
│                     │ Mar 09    445    119    39    $1,175   8.7% │
│                     │ Mar 08    478    131    44    $1,320   9.2% │
│                     │                                             │
└────────────────────────────────────────────────────────────────────┘
```

---

## Vendor Portal: Profile Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  GlamGo      🔴 ☰                    Vendor Profile   [Logout]      │
├────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard        │ ┌─────────────────────────────────────────┐ │
│ 📦 Products         │ │ [LOGO] Jane's Hair Studio      ✅ APPR. │ │
│ 🛒 Orders           │ │ Premium beauty and cosmetics vendor    │ │
│ 📈 Analytics        │ │ ★ 4.8 Rating  247 Reviews  $145K Sales │ │
│ 👤 Profile          │ └─────────────────────────────────────────┘ │
│                     │                                             │
│ [SIDEBAR]           │ Contact Information                         │
│                     │ Email: jane@salon.com                      │
│                     │ Phone: (555) 123-4567                      │
│                     │ Address: 123 Beauty Ave, New York, NY      │
│                     │                                             │
│                     │ Business Metrics                            │
│                     │ Total Orders: 847  │ Completion: 98.2%    │
│                     │ Response Time: 2.5h│ Available: Yes       │
│                     │                                             │
│                     │ [EDIT PROFILE]                              │
│                     │                                             │
└────────────────────────────────────────────────────────────────────┘
```

---

## Color Reference

### Sidebar (Active)
```
Deep Plum (#5D3E61) → Rose (#E87B7B) on hover/active
```

### Stat Cards
```
🟡 YELLOW - Pending/Warning items
🔵 BLUE - Info/Default items  
🟢 GREEN - Success/Completed items
🟣 PURPLE - Important/Featured items
🔴 ROSE - Highlights/Attention
```

### Other Elements
```
White - Card backgrounds
Gray-50 - Page background
Gray-900 - Primary text
Gray-600 - Secondary text
Red - Logout button
```

---

## Interactive Elements

**Clickable**:
- ✅ Sidebar navigation items (navigate to page)
- ✅ Filter tabs (filter data)
- ✅ Buttons (approve, assign, update)
- ✅ Logout button (sign out)
- ✅ Quick action cards (navigate to page)

**Visual Feedback**:
- Hover effects on buttons
- Active page highlighted in rose
- Smooth transitions
- Scale animations on cards

---

## Responsive Breakpoints

```
Mobile (375px)       Tablet (768px)      Desktop (1200px+)
─────────────────────────────────────────────────────────
Sidebar: Hidden      Sidebar: Visible    Sidebar: Visible
Menu: Toggle btn     Full width          Full layout
Content: Full        2 columns           3-4 columns
Cards: Stack         Stack or 2x2        Grid layout
```

---

**This is what the client will see! 🎉**

---
