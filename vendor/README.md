# GlamGo Vendor Portal

Complete vendor management portal for GlamGo beauty and cosmetics platform.

## Features

- **Dashboard**: Real-time sales analytics, revenue tracking, and key metrics
- **Product Management**: Create, edit, and manage your product catalog
- **Order Management**: Track and manage customer orders with status updates
- **Analytics**: Detailed analytics with views, clicks, conversion rates, and revenue tracking
- **Vendor Profile**: Manage your business information and online presence

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the portal**:
   - Open http://localhost:5174 in your browser
   - Demo credentials: vendor@glamgo.com / any password

4. **Build for production**:
   ```bash
   npm run build
   ```

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router DOM 6.20
- **HTTP Client**: Axios 1.6

## Project Structure

```
vendor/
├── src/
│   ├── components/          # Reusable components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API and mock data services
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── tailwind.config.js      # Tailwind config
└── README.md               # This file
```

## Pages

- **Login** (`/login`): Vendor authentication
- **Dashboard** (`/`): Overview of sales, products, and orders
- **Products** (`/products`): Product catalog management
- **Orders** (`/orders`): Customer orders and fulfillment
- **Analytics** (`/analytics`): Detailed sales and performance metrics
- **Profile** (`/profile`): Vendor business information

## Components

- `VendorNavbar`: Top navigation bar with links and sign out
- `VendorStatCard`: Reusable stat display component
- `ProductCard`: Product display with edit/delete actions
- `VendorOrderCard`: Order display with status management
- `VendorLoadingSpinner`: Loading indicator

## Custom Hooks

- `useVendorProfile()`: Fetch and manage vendor profile
- `useProducts()`: Fetch and manage products with CRUD operations
- `useVendorOrders()`: Fetch and manage orders with status updates
- `useVendorDashboard()`: Fetch dashboard stats (auto-refreshes)
- `useProductReviews()`: Fetch product reviews
- `useAnalytics()`: Fetch analytics data

## Mock Data

The portal includes comprehensive mock data for testing:

- **4 Products**: Various statuses (ACTIVE, DRAFT) with pricing and inventory
- **4 Orders**: Different statuses (PENDING, CONFIRMED, IN_PROGRESS, DELIVERED)
- **30 Days Analytics**: Daily views, clicks, orders, and revenue data
- **Multiple Reviews**: Customer feedback for products

## Authentication

Currently uses mock authentication (localStorage-based). Ready for integration with:
- AWS Cognito
- Custom backend authentication
- OAuth providers

## Deployment

The vendor portal can be deployed to:

- **AWS Amplify**: `amplify publish`
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`

## Environment Variables

Create `.env.local` and `.env.production` files:

```
VITE_API_URL=http://localhost:3001        # Backend API URL
VITE_AUTH_DOMAIN=us-east-1_ZMKLKcE8r     # Cognito domain
VITE_CLIENT_ID=7gn4qd0rl40ddb132l7g72c2sl # Cognito client ID
```

## Week 1 & 2 Completions

### Week 1
- ✅ Project setup and configuration
- ✅ TypeScript type definitions
- ✅ Mock data infrastructure
- ✅ Custom React hooks
- ✅ Reusable components
- ✅ Page structure

### Week 2
- ✅ Authentication flow (mock)
- ✅ Dashboard with real-time stats
- ✅ Product management interface
- ✅ Order management system
- ✅ Analytics tracking
- ✅ Vendor profile management

## Next Steps

- [ ] Connect to real backend API
- [ ] Integrate AWS Cognito authentication
- [ ] Add product image uploads
- [ ] Implement order tracking notifications
- [ ] Add inventory alerts
- [ ] Create analytics charts
- [ ] Add export functionality
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] Production deployment
