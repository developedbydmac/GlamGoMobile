# 🚀 Quick Test Reference Card

## Test Credentials

| Role     | Email              | Password     | Expected Status |
| -------- | ------------------ | ------------ | --------------- |
| CUSTOMER | customer1@test.com | TestPass123! | ✅ APPROVED     |
| VENDOR   | vendor1@test.com   | TestPass123! | ⏳ PENDING      |
| DRIVER   | driver1@test.com   | TestPass123! | ⏳ PENDING      |

## Quick Commands

```bash
# Start app
npm start

# View Lambda logs (if AWS CLI configured)
aws logs tail /aws/lambda/postconfirmation-* --follow --region us-east-1

# Check DynamoDB items (if AWS CLI configured)
aws dynamodb scan --table-name UserProfile-<suffix> --region us-east-1
```

## AWS Console Quick Links

- **Cognito Users:** Console → Cognito → User Pools → `us-east-1_ZMKLKcE8r` → Users
- **DynamoDB:** Console → DynamoDB → Tables → Search "UserProfile"
- **Lambda Logs:** Console → CloudWatch → Log groups → `/aws/lambda/postconfirmation-*`
- **AppSync:** Console → AppSync → APIs → `amplify-glamgomobile-*`

## What to Look For

### ✅ Success Indicators:

- Email verification code arrives
- No error alerts during signup
- User redirected to appropriate dashboard
- Lambda logs show UserProfile creation
- DynamoDB table populated (if persistence enabled)

### ❌ Failure Indicators:

- "User already exists" error → Email already used
- "Invalid password" → Check password requirements
- "Network error" → Check Amplify Sandbox is running
- No Lambda logs → Post-confirmation trigger not configured
- TypeScript errors → Run `npx tsc --noEmit`

## Current Known Behavior

### Action 1 (Current State):

- ✅ Users can sign up
- ✅ Cognito groups assigned correctly
- ✅ Lambda creates UserProfile logic (logs only)
- ⚠️ Vendors/Drivers can access dashboards even with PENDING status

### Action 2 (Coming Next):

- 🎯 Block pending users from dashboard access
- 🎯 Show "Waiting for Approval" screen
- 🎯 Admin dashboard to approve users

## Testing Order

1. **Customer** (should work fully) ✅
2. **Vendor** (should get PENDING but still access dashboard) ⏳
3. **Driver** (should get PENDING but still access dashboard) ⏳

## After Testing

- [ ] Screenshot Cognito Users tab (3 users)
- [ ] Screenshot DynamoDB table (3 records)
- [ ] Copy Lambda log entries
- [ ] Note any errors encountered
- [ ] Ready for Action 2 implementation
