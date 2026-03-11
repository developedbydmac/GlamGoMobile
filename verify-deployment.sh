#!/bin/bash

# GlamGo Deployment Verification Script
# Run this to verify AWS resources are properly configured

echo "🔍 GlamGo Deployment Verification"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Extract from amplify_outputs.json
USER_POOL_ID=$(grep -o '"user_pool_id": "[^"]*"' amplify_outputs.json | cut -d'"' -f4)
REGION=$(grep -o '"aws_region": "[^"]*"' amplify_outputs.json | cut -d'"' -f4)
API_URL=$(grep -o '"url": "https://[^"]*"' amplify_outputs.json | head -1 | cut -d'"' -f3)

echo "📋 Configuration Found:"
echo "  User Pool: $USER_POOL_ID"
echo "  Region: $REGION"
echo "  API URL: $API_URL"
echo ""

# Check 1: Cognito User Pool Groups
echo "1️⃣  Checking Cognito Groups..."
GROUPS=$(aws cognito-idp list-groups --user-pool-id $USER_POOL_ID --region $REGION 2>/dev/null)

if [ $? -eq 0 ]; then
  CUSTOMER_GROUP=$(echo $GROUPS | grep -o "CUSTOMER")
  VENDOR_GROUP=$(echo $GROUPS | grep -o "VENDOR")
  DRIVER_GROUP=$(echo $GROUPS | grep -o "DRIVER")
  ADMIN_GROUP=$(echo $GROUPS | grep -o "ADMIN")
  
  if [ ! -z "$CUSTOMER_GROUP" ] && [ ! -z "$VENDOR_GROUP" ] && [ ! -z "$DRIVER_GROUP" ] && [ ! -z "$ADMIN_GROUP" ]; then
    echo -e "   ${GREEN}✅ All 4 groups found: CUSTOMER, VENDOR, DRIVER, ADMIN${NC}"
  else
    echo -e "   ${RED}❌ Missing groups. Found: $CUSTOMER_GROUP $VENDOR_GROUP $DRIVER_GROUP $ADMIN_GROUP${NC}"
  fi
else
  echo -e "   ${YELLOW}⚠️  Cannot verify groups (AWS CLI not configured or no permissions)${NC}"
fi
echo ""

# Check 2: DynamoDB Tables
echo "2️⃣  Checking DynamoDB Tables..."
TABLES=$(aws dynamodb list-tables --region $REGION 2>/dev/null)

if [ $? -eq 0 ]; then
  USERPROFILE_TABLE=$(echo $TABLES | grep -o "UserProfile-[a-z0-9]*")
  
  if [ ! -z "$USERPROFILE_TABLE" ]; then
    echo -e "   ${GREEN}✅ UserProfile table found: $USERPROFILE_TABLE${NC}"
    
    # Check table schema
    SCHEMA=$(aws dynamodb describe-table --table-name $USERPROFILE_TABLE --region $REGION 2>/dev/null)
    if [ $? -eq 0 ]; then
      echo "   📊 Table attributes:"
      echo "$SCHEMA" | grep -o '"AttributeName": "[^"]*"' | sed 's/"AttributeName": "//g' | sed 's/"//g' | while read attr; do
        echo "      - $attr"
      done
    fi
  else
    echo -e "   ${RED}❌ UserProfile table not found${NC}"
  fi
else
  echo -e "   ${YELLOW}⚠️  Cannot verify tables (AWS CLI not configured or no permissions)${NC}"
fi
echo ""

# Check 3: Lambda Functions
echo "3️⃣  Checking Lambda Functions..."
LAMBDA_FUNCTIONS=$(aws lambda list-functions --region $REGION 2>/dev/null)

if [ $? -eq 0 ]; then
  POST_CONFIRMATION=$(echo $LAMBDA_FUNCTIONS | grep -o "postconfirmation-[a-zA-Z0-9-]*")
  
  if [ ! -z "$POST_CONFIRMATION" ]; then
    echo -e "   ${GREEN}✅ Post-confirmation Lambda found: $POST_CONFIRMATION${NC}"
  else
    echo -e "   ${RED}❌ Post-confirmation Lambda not found${NC}"
  fi
else
  echo -e "   ${YELLOW}⚠️  Cannot verify Lambda (AWS CLI not configured or no permissions)${NC}"
fi
echo ""

# Check 4: AppSync API
echo "4️⃣  Checking AppSync API..."
if [ ! -z "$API_URL" ]; then
  echo -e "   ${GREEN}✅ AppSync API endpoint configured${NC}"
  echo "   🔗 $API_URL"
else
  echo -e "   ${RED}❌ AppSync API endpoint not found${NC}"
fi
echo ""

# Summary
echo "=================================="
echo "✅ Verification Complete!"
echo ""
echo "📝 Next Steps:"
echo "   1. If AWS CLI checks failed, verify AWS credentials are configured"
echo "   2. Proceed to test signup flows (see TESTING_GUIDE_ACTION_1.md)"
echo "   3. Check CloudWatch logs after signup attempts"
echo ""
