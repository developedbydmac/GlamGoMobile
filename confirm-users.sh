#!/bin/bash

# Script to manually confirm test users in AWS Cognito
# Run this if you didn't receive/click verification emails

USER_POOL_ID="us-east-1_ZMKLKcE8r"
REGION="us-east-1"

echo "🔍 Checking user status..."

# Check daquanmac@gmail.com
echo ""
echo "📧 User: daquanmac@gmail.com"
aws cognito-idp admin-get-user \
  --user-pool-id $USER_POOL_ID \
  --username daquanmac@gmail.com \
  --region $REGION \
  2>&1 | grep -E "UserStatus|Username|custom:role" || echo "User not found or error"

# Check developedbydmac@gmail.com
echo ""
echo "📧 User: developedbydmac@gmail.com"
aws cognito-idp admin-get-user \
  --user-pool-id $USER_POOL_ID \
  --username developedbydmac@gmail.com \
  --region $REGION \
  2>&1 | grep -E "UserStatus|Username|custom:role" || echo "User not found or error"

echo ""
echo "---"
echo "If UserStatus shows 'UNCONFIRMED', run these commands to confirm:"
echo ""
echo "# Confirm daquanmac@gmail.com:"
echo "aws cognito-idp admin-confirm-sign-up --user-pool-id $USER_POOL_ID --username daquanmac@gmail.com --region $REGION"
echo ""
echo "# Confirm developedbydmac@gmail.com:"
echo "aws cognito-idp admin-confirm-sign-up --user-pool-id $USER_POOL_ID --username developedbydmac@gmail.com --region $REGION"
echo ""
echo "After confirming, try signing in again!"
