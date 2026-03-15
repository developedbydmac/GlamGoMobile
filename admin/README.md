# GlamGo Admin Dashboard

React + Vite admin web application for managing GlamGo orders, users, and drivers.

## Getting Started

### Day 1: Setup (✅ Complete)

```bash
cd admin
npm install
npm run dev
```

Visit `http://localhost:5173`

### Day 2: Cognito Login
- Build login form in `src/pages/Login.tsx`
- Integrate AWS Amplify authentication
- Test with admin@test.com credentials

### Day 3: Orders List
- Create orders service
- Build orders page
- Add filters

### Day 4: Driver Assignment
- Add driver selector
- Implement assignment mutation
- Update order status

### Day 5: User Approvals
- Build users page
- Add approve/suspend actions
- Update user status

## Architecture

```
admin/
├── src/
│   ├── pages/       (Login, Dashboard, Orders, Users, etc.)
│   ├── components/  (Navbar, Sidebar, Cards, etc.)
│   ├── services/    (Auth, Orders, Users, API calls)
│   ├── hooks/       (useAuth, useOrders, useUsers)
│   ├── types/       (TypeScript interfaces)
│   ├── App.tsx      (Main routing)
│   └── main.tsx     (Entry point)
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **AWS Amplify** - Authentication + GraphQL
- **Axios** - HTTP client

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Week 1 Timeline

| Day | Task | Deliverable |
|-----|------|-------------|
| 1 | Setup Vite + React | Running dev server ✅ |
| 2 | Cognito login | Login page with auth |
| 3 | Orders list | Fetch and display orders |
| 4 | Driver assignment | Assign drivers to orders |
| 5 | User approvals | Approve/suspend users |

## Commands for Each Day

### Day 2 (Tomorrow)
```bash
cd admin
npm run dev
# Edit src/pages/Login.tsx
```

### Day 3
```bash
# Create src/pages/Orders.tsx
# Create src/services/orders.ts
# Create src/hooks/useOrders.ts
```

### Day 4
```bash
# Create src/components/DriverSelect.tsx
# Update Orders.tsx with assign button
```

### Day 5
```bash
# Create src/pages/Users.tsx
# Create src/services/users.ts
# Add approve/suspend mutations
```

## Testing

Use these test credentials:
- Email: `admin@test.com`
- Password: any (mock mode)
- Role: ADMIN

## Deployment

Will be documented in deployment guide once backend is ready.

---

**Start here:** `npm run dev` then read Day 2 tasks
