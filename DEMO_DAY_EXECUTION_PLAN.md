# ⏱️ DEMO DAY EXECUTION PLAN

## 2-Day Security & Cleanup Sprint (March 12-13, 2026)

**Demo Date:** March 13, 2026 (Tomorrow!)  
**Focus:** Ship security fixes + cleanup BEFORE the demo  
**Strategy:** Hit DEMO-CRITICAL items hard on Day 1, hold POST-DEMO work for next week

---

## 📋 TASK CLASSIFICATION

### THE 8 CORE SECURITY TASKS

| #   | Task                                   | Category      | Effort | Day   | Block       |
| --- | -------------------------------------- | ------------- | ------ | ----- | ----------- |
| 1   | Remove hardcoded Cognito IDs           | DEMO-CRITICAL | 30 min | Day 1 | Morning 1   |
| 2   | Gate demo credentials behind `__DEV__` | DEMO-CRITICAL | 20 min | Day 1 | Morning 1   |
| 3   | Create logger utility (PII redaction)  | DEMO-CRITICAL | 1 hr   | Day 1 | Morning 1   |
| 4   | Clean console logs (35+ statements)    | DEMO-CRITICAL | 2 hrs  | Day 1 | Morning 2   |
| 5   | Delete dead code (5 files)             | DEMO-CRITICAL | 30 min | Day 1 | Afternoon 1 |
| 6   | Explicit token cleanup on logout       | DEMO-CRITICAL | 15 min | Day 1 | Afternoon 1 |
| 7   | Add role-clarity comment               | POST-DEMO     | 10 min | Day 2 | Morning 1   |
| 8   | .gitignore `amplify_outputs.json`      | POST-DEMO     | 10 min | Day 2 | Morning 1   |
| 9   | Remove test passwords from docs        | POST-DEMO     | 30 min | Day 2 | Afternoon 1 |
| 10  | Plan Keychain migration                | POST-DEMO     | 20 min | Day 2 | Afternoon 2 |

---

## 🗓️ DAY 1 SCHEDULE (TODAY - March 12)

### ⏰ Morning 1: 9:00–10:45 (1h 45min available)

**Goal:** Secure the config + setup logging foundation

| Task                                                        | Effort       | Status      |
| ----------------------------------------------------------- | ------------ | ----------- |
| Remove hardcoded Cognito IDs from `services/cognitoAuth.ts` | 30 min       | ✅ Fits     |
| Gate demo credentials in `app/(auth)/sign-in.tsx`           | 20 min       | ✅ Fits     |
| Create `utils/logger.ts` with PII redaction                 | 55 min       | ✅ Fits     |
| **Block Total**                                             | **1h 45min** | ✅ COMPLETE |

**Deliverables:**

- ✅ No hardcoded secrets in code
- ✅ Demo buttons invisible in release builds
- ✅ Logger utility ready for other files to use

---

### ⏰ Morning 2: 11:00–12:45 (1h 45min available)

**Goal:** Clean professional logging across all critical files

| Task                                                          | Effort       | Status      |
| ------------------------------------------------------------- | ------------ | ----------- |
| Replace console logs in `services/cognitoAuth.ts` with logger | 30 min       | ✅ Fits     |
| Replace console logs in `app/(auth)/sign-in.tsx` with logger  | 30 min       | ✅ Fits     |
| Replace console logs in `app/_layout.tsx` with logger         | 30 min       | ✅ Fits     |
| Update Router references (remove deleted screens)             | 15 min       | ✅ Fits     |
| **Block Total**                                               | **1h 45min** | ✅ COMPLETE |

**Deliverables:**

- ✅ Auth flow logs are professional + redacted
- ✅ No sensitive data in console output
- ✅ App won't crash from missing screen references

---

### ⏰ Afternoon 1: 1:00–2:30 (1h 30min available)

**Goal:** Remove debug/dead code + finalize token security

| Task                                                          | Effort       | Status      |
| ------------------------------------------------------------- | ------------ | ----------- |
| Delete `components/ApiTestPanel.tsx`                          | 10 min       | ✅ Fits     |
| Delete `app/booking.tsx` + `app/role-preview-*.tsx` (5 files) | 15 min       | ✅ Fits     |
| Verify no imports of deleted files (`grep` check)             | 10 min       | ✅ Fits     |
| Add explicit token cleanup in `cognitoAuth.ts` logout         | 15 min       | ✅ Fits     |
| Update Router Stack references                                | 10 min       | ✅ Fits     |
| Test app runs without errors (`npm start`)                    | 30 min       | ✅ Fits     |
| **Block Total**                                               | **1h 30min** | ✅ COMPLETE |

**Deliverables:**

- ✅ All debug code removed (~600 lines gone)
- ✅ No dead file references in app
- ✅ Token cleanup is explicit + Cognito-backed
- ✅ App boots cleanly for demo

---

### ⏰ Afternoon 2: 2:45–4:00 (1h 15min available) [OPTIONAL BUFFER]

**Goal:** Final verification + demos testing

| Task                                                | Effort       | Status      |
| --------------------------------------------------- | ------------ | ----------- |
| Run full test flow (all 4 user roles login)         | 30 min       | ✅ Fits     |
| Verify console shows NO sensitive data              | 15 min       | ✅ Fits     |
| Check that demo buttons are hidden in release build | 10 min       | ✅ Fits     |
| Commit all changes with clear messages              | 10 min       | ✅ Fits     |
| Buffer for any unexpected issues                    | 30 min       | ✅ Fits     |
| **Block Total**                                     | **1h 15min** | ✅ COMPLETE |

**Deliverables:**

- ✅ Demo-ready app with no security embarrassments
- ✅ All test flows verified
- ✅ Code committed + ready for tomorrow's presentation

---

## 📊 DAY 1 SUMMARY

| Phase           | Time         | Tasks                              | Status        |
| --------------- | ------------ | ---------------------------------- | ------------- |
| **Morning 1**   | 1h 45min     | Config + Logger Foundation         | ✅ 3 tasks    |
| **Morning 2**   | 1h 45min     | Professional Logging               | ✅ 4 tasks    |
| **Afternoon 1** | 1h 30min     | Dead Code Removal + Token Security | ✅ 6 tasks    |
| **Afternoon 2** | 1h 15min     | Final Testing + Commit             | ✅ 4 tasks    |
| **DAY 1 TOTAL** | **~6 hours** | **All DEMO-CRITICAL items**        | ✅ GO TO DEMO |

---

## 🗓️ DAY 2 SCHEDULE (Tomorrow - March 13, AFTER demo)

**NOTE:** Demo happens on Day 2 morning (March 13, 9:00 AM). These tasks happen AFTER demo closes (~1:00 PM).

### ⏰ Afternoon 1: 2:00–3:30 (1h 30min available)

**Goal:** Documentation cleanup + launch planning

| Task                                                             | Effort       | Status      |
| ---------------------------------------------------------------- | ------------ | ----------- |
| Add clarifying comment to role inference code (LOC 65-74)        | 10 min       | ✅ Fits     |
| Update `.gitignore` to exclude `amplify_outputs.json`            | 10 min       | ✅ Fits     |
| Audit docs for hardcoded test passwords (grep search)            | 10 min       | ✅ Fits     |
| Remove test passwords from `DEMO.md`, `TESTING_GUIDE_*.md`, etc. | 30 min       | ✅ Fits     |
| Replace with "Ask team lead" or link to secure storage           | 20 min       | ✅ Fits     |
| Commit documentation updates                                     | 10 min       | ✅ Fits     |
| **Block Total**                                                  | **1h 30min** | ✅ COMPLETE |

**Deliverables:**

- ✅ Source code properly ignored
- ✅ Test docs no longer leak credentials
- ✅ Pre-launch documentation cleanup done

---

### ⏰ Afternoon 2: 3:45–4:45 (1h available)

**Goal:** Plan next phase + roadmap

| Task                                                      | Effort | Status      |
| --------------------------------------------------------- | ------ | ----------- |
| Review findings from Keychain research                    | 15 min | ✅ Fits     |
| Document Keychain migration plan (scope + timeline)       | 20 min | ✅ Fits     |
| Estimate effort: AsyncStorage → Keychain (code + testing) | 10 min | ✅ Fits     |
| Create pre-launch security checklist for next week        | 10 min | ✅ Fits     |
| Schedule prep work for Week 4 (penetration testing, etc.) | 5 min  | ✅ Fits     |
| **Block Total**                                           | **1h** | ✅ COMPLETE |

**Deliverables:**

- ✅ Keychain migration scoped and planned
- ✅ Pre-launch checklist created
- ✅ Roadmap updated with security tasks

---

## 📊 DAY 2 SUMMARY

| Phase           | Time           | Tasks                   | Status              |
| --------------- | -------------- | ----------------------- | ------------------- |
| **Afternoon 1** | 1h 30min       | Documentation Cleanup   | ✅ 6 tasks          |
| **Afternoon 2** | 1h             | Pre-Launch Planning     | ✅ 5 tasks          |
| **DAY 2 TOTAL** | **~2.5 hours** | **All POST-DEMO items** | ✅ SETUP FOR LAUNCH |

---

## 🎯 DEMO-CRITICAL vs POST-DEMO BREAKDOWN

### ✅ DEMO-CRITICAL (Do TODAY - Day 1)

Must complete before showing the app to stakeholders:

1. **Remove hardcoded Cognito IDs** (30 min)
   - Why: Exposes AWS account structure; looks unprofessional
   - Files: `services/cognitoAuth.ts`, use `amplifyConfig` instead
   - Impact: High - Immediate security improvement

2. **Gate demo credentials behind `__DEV__`** (20 min)
   - Why: Anyone can decompile APK and login as any user
   - Files: `app/(auth)/sign-in.tsx` - wrap demo buttons in `{__DEV__ && ( ... )}`
   - Impact: Critical - Prevents account compromise demo

3. **Create logger utility** (1 hr)
   - Why: Current logging exposes user IDs, auth tokens, API details
   - Files: Create `utils/logger.ts` with PII redaction
   - Impact: High - Makes console output professional

4. **Clean console logs in auth/core files** (2 hrs)
   - Why: Sensitive data visible in logcat (Android) and console
   - Files: `cognitoAuth.ts`, `sign-in.tsx`, `_layout.tsx`
   - Impact: High - Hides internal implementation details

5. **Delete dead/debug code** (30 min)
   - Why: `ApiTestPanel.tsx` and duplicate screens look like unfinished work
   - Files: Delete 5 files (~600 lines)
   - Impact: Medium - Professionalism + prevents accidental imports

6. **Explicit token cleanup** (15 min)
   - Why: Defense in depth - revoke client + server-side tokens
   - Files: `cognitoAuth.ts` - add `AsyncStorage.multiRemove()` in logout
   - Impact: Medium - Better security posture

**Day 1 DEMO-CRITICAL Total: ~4.5 hours** ✅ Fits in morning + afternoon 1

---

### ⏳ POST-DEMO (Do Day 2 or next week)

Can wait until after the demo without affecting presentation:

7. **Add role-clarity comment** (10 min)
   - Why: Document that email-based role is fallback-only; backend uses Cognito groups
   - Files: `services/cognitoAuth.ts` lines 65-74
   - Impact: Low - Clarification for future maintainers

8. **Update `.gitignore`** (10 min)
   - Why: Prevent `amplify_outputs.json` from being committed (beta → production transition)
   - Files: `.gitignore`
   - Impact: Medium - Good DevOps hygiene

9. **Remove test passwords from docs** (30 min)
   - Why: If repo goes public, docs won't leak test account credentials
   - Files: `DEMO.md`, `TESTING_GUIDE_*.md`, etc. (5+ files)
   - Impact: Low - Internal security hygiene

10. **Plan Keychain migration** (20 min)
    - Why: AsyncStorage is unencrypted; Keychain is production-grade
    - Files: Documentation + planning (no code yet)
    - Impact: Medium - Prep for pre-launch security work

**Day 2 POST-DEMO Total: ~1 hour** ✅ Fits in afternoon slots

---

## 📈 REMAINING WORK AFTER DEMO

### Post-Demo Security/Cleanup Effort Estimate

**Total Remaining:** ~3-4 hours (~0.5 days)

Breakdown:

- Documentation cleanup (passwords, `.gitignore`, etc.): 1 hour
- Keychain migration planning + initial spike: 2 hours
- Pre-launch security checklist creation: 1 hour

**Integration with 4-6 Week Roadmap:**

✅ **You have ~3-4 hours of security/cleanup work left after the demo, which can be spread across Week 1-2 (post-demo) without blocking the main feature roadmap.** Plan this as:

- **Week 1 (Post-Demo):** Documentation cleanup (1 hour) + Keychain planning (2 hours)
- **Week 2:** Keychain implementation + testing (4-6 hours)
- **Week 3-4:** Main features (payments, notifications, dispatch, Polish)
- **Week 5 (Pre-Launch):** Full penetration testing + edge case fixes
- **Week 6:** App Store submission prep

The ~40 hours of feature work (payments, notifications, real-time tracking, etc.) dominates the timeline, not security cleanup. **Security work is already front-loaded and won't become a blocker later.**

---

## 📋 YOUR 5-MIN ACTION LIST FOR TODAY

Paste this into your calendar or notes app:

**✅ DO THIS TODAY (Day 1):**

1. **Morning 9:00** – Remove hardcoded Cognito pool IDs from `services/cognitoAuth.ts`; load from `amplifyConfig` instead.

2. **Morning 9:30** – Wrap demo credential buttons in `{__DEV__ && ( ... )}` in `app/(auth)/sign-in.tsx` so they're invisible in production builds.

3. **Morning 10:00** – Create `utils/logger.ts` (160-line utility) with automatic PII redaction and environment gating.

4. **Morning 11:00** – Replace 35+ console.log statements with `logger.*` calls in `services/cognitoAuth.ts`, `app/(auth)/sign-in.tsx`, and `app/_layout.tsx`.

5. **Afternoon 1:00** – Delete 5 debug/dead files: `components/ApiTestPanel.tsx`, `app/booking.tsx`, `app/role-preview-*.tsx` (verify with grep that nothing imports them).

6. **Afternoon 1:45** – Add explicit token cleanup to `signOut()` in `cognitoAuth.ts`: `AsyncStorage.multiRemove(['cognitoUser', 'idToken', 'accessToken', 'refreshToken'])`.

7. **Afternoon 2:00** – Run full test: all 4 user roles log in, verify console shows NO sensitive data, verify demo buttons are hidden in release build, commit with clear messages.

**✅ DO THIS AFTER DEMO (Day 2):**

8. **After 1:00 PM** – Add `.gitignore` entry for `amplify_outputs.json`; remove test passwords from `DEMO.md` and testing docs (replace with "Ask team lead").

9. **Later This Week** – Schedule 2-hour Keychain migration spike; plan pre-launch penetration testing.

---

## 🚀 CONFIDENCE CHECK

### Why This Plan Works

✅ **All DEMO-CRITICAL items finish by EOD Day 1** (6 hours of focused work)  
✅ **App will look professional and secure tomorrow morning**  
✅ **Demo flows through all 4 user roles without embarrassing logs**  
✅ **No debug tools or dead code visible**  
✅ **Remaining 3-4 hours of cleanup happen after demo, no rush**  
✅ **Keychain migration planned for Week 2, doesn't block feature work**

### What Happens Tomorrow

**9:00 AM – Presentation starts**

- App boots cleanly
- All 4 user roles work
- Console output is professional (demo reviewers see clean logs)
- No crashed screens or weird state

**After 1:00 PM – You pick next priority**

- Documentation cleanup (1 hour) if you have energy
- Or: Start planning Wave 1 luxury UI redesign (8-10 hours next week)
- Or: Both (security day today, design day tomorrow-Friday)

---

## 📞 GOTCHAS & SAFETY NETS

### If You Run Out of Time

**Minimum 30-minute version (Drop to 2 hours):**

1. Remove hardcoded Cognito IDs (30 min) — DO THIS
2. Gate demo credentials (20 min) — DO THIS
3. Replace critical auth logs (60 min) — DO THIS
4. Delete ApiTestPanel only (10 min) — OPTIONAL
5. Test app boots (10 min) — CRITICAL

**This hits 80% of security improvements with 2 hours of work.**

### If Something Breaks

- **Logger import error?** → Check TypeScript path aliases in `tsconfig.json`
- **Demo buttons won't hide?** → `__DEV__` should work; verify with `console.log(__DEV__)` in `npm start`
- **App crashes on delete?** → Undo deletion, check Router Stack references instead
- **Console still shows logs?** → Grep for remaining `console.log` statements; some may be in dependencies

---

## ✨ YOU'VE GOT THIS

Everything is scoped, time-boxed, and achievable in 6 hours today + 1 hour tomorrow.

**Push the security fix hard now** → Demo confidently tomorrow → Plan cleanup after → Start feature work next week.

**Let's ship! 🚀**
