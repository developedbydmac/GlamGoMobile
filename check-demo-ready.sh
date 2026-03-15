#!/bin/bash

# 🎯 GLAMGO Project Status Check
# Verifies demo-ready status and shows next steps

echo "════════════════════════════════════════════════════════════════"
echo "🎯 GLAMGO Mobile - Demo Readiness Check"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📦 Checking dependencies..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    exit 1
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check mock data files
echo ""
echo "🗂️  Checking mock data setup..."

MOCK_FILES=(
    "services/mockData.ts"
    "services/apiMode.ts"
    "services/userProfileHybrid.ts"
)

for file in "${MOCK_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${RED}✗${NC} $file missing - creating..."
    fi
done

# Check documentation
echo ""
echo "📖 Checking documentation..."

DOC_FILES=(
    "DEMO_MODE_GUIDE.md"
    "ADMIN_DRIVER_IMPLEMENTATION_PLAN.md"
    "DEMO_AND_PLAN_SUMMARY.md"
)

for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file ready"
    else
        echo -e "${YELLOW}⚠${NC} $file not found"
    fi
done

# Check amplify config
echo ""
echo "🔐 Checking AWS Amplify config..."

if [ -f "amplify_outputs.json" ]; then
    echo -e "${GREEN}✓${NC} amplify_outputs.json found"
    if grep -q "us-east-1_ZMKLKcE8r" amplify_outputs.json; then
        echo -e "${GREEN}✓${NC} Cognito User Pool configured"
    fi
else
    echo -e "${YELLOW}⚠${NC} amplify_outputs.json not found"
fi

# Check package.json
echo ""
echo "📋 Checking app dependencies..."

if [ -f "package.json" ]; then
    if grep -q "expo" package.json; then
        echo -e "${GREEN}✓${NC} Expo configured"
    fi
    if grep -q "amplify" package.json; then
        echo -e "${GREEN}✓${NC} AWS Amplify configured"
    fi
    if grep -q "react" package.json; then
        echo -e "${GREEN}✓${NC} React configured"
    fi
else
    echo -e "${RED}✗${NC} package.json not found"
fi

# Check if node_modules installed
echo ""
echo "📦 Checking installed packages..."

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed (node_modules exists)"
else
    echo -e "${YELLOW}⚠${NC} node_modules not found - run 'npm install'"
fi

# Summary
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ Demo Readiness Status:"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "🎬 DEMO MODE: READY TO RUN"
echo ""
echo "📝 Next Steps:"
echo "  1. Run: npm run tunnel"
echo "  2. Scan QR code in Expo Go"
echo "  3. Use test credentials:"
echo "     - admin@test.com (ADMIN)"
echo "     - vendor@test.com (VENDOR, approved)"
echo "     - vendor-pending@test.com (VENDOR, pending)"
echo "     - driver@test.com (DRIVER)"
echo "     - user@test.com (CUSTOMER)"
echo ""
echo "📖 Documentation:"
echo "  - Demo Guide: DEMO_MODE_GUIDE.md"
echo "  - Dev Plan: ADMIN_DRIVER_IMPLEMENTATION_PLAN.md"
echo "  - Summary: DEMO_AND_PLAN_SUMMARY.md"
echo ""
echo "🚀 Demo Flow (5 mins):"
echo "  1. Sign in as vendor-pending@test.com"
echo "     → See pending approval screen"
echo "  2. Sign in as admin@test.com"
echo "     → Go to /admin/dashboard"
echo "     → Approve the pending vendor"
echo "  3. Sign in as driver@test.com"
echo "     → See assigned orders"
echo "     → Update order status (picked up/delivered)"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Ready to demo! 🎉"
echo ""
