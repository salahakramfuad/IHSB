# Differential Security Review — Phase 1 (security hardening)

Produced with the `differential-review` skill against the Phase 1 diff (base `1f870b4`).
Strategy: MEDIUM codebase → FOCUSED. Every changed server file was read; HIGH-risk files
(auth, data layer, uploads, public POST routes) got adversarial analysis.

## Executive Summary

| Severity | Found in review | Fixed | Open (needs a manual step) |
|----------|-----------------|-------|----------------------------|
| HIGH     | 1 | 0 | 1 |
| MEDIUM   | 4 | 4 | 0 |
| LOW      | 4 | 2 | 2 |

**Overall risk of the change:** LOW — it only adds controls; no validation or access check was removed.
**Recommendation:** CONDITIONAL — safe to ship once the manual steps at the end are done.

**Key metrics**
- Files analysed: all 60 changed/added server-side files.
- Test coverage: none (the project has no tests and the brief excludes writing them). Every
  finding below was checked by reading the code path, not by execution against live Firebase.
- Blast radius: `lib/auth/middleware.ts` → 27 route handlers; `lib/database/*` → all routes,
  5 services and 6 server-rendered pages; `lib/utils/http.ts` → every route.
- Security regressions: 0.

## Findings

### R1 (HIGH, open — manual step) Admin identity relies on the e-mail claim
`lib/auth/roles.ts` grants access when the token e-mail is in `SUPERADMIN_EMAILS` or matches an
active `admins` document. Firebase e-mail/password **self sign-up is enabled by default** and can
be called with the public web API key. Attack: an address listed in `SUPERADMIN_EMAILS` (or left
in an `admins` document) that has **no Firebase Auth account** can be registered by anyone, who
then passes `requireAdmin`. This rule predates the change (same logic as `/api/auth/me`) and the
brief requires reusing it, so it is not changed in code.
**Required:** Firebase console → Authentication → Settings → User actions → disable
"Enable create (sign-up)"; make sure every address in `SUPERADMIN_EMAILS` already has an account;
delete `admins` documents of removed users.

### R2 (MEDIUM, fixed) Wire format of timestamps changed with the Admin SDK
Admin-SDK `Timestamp` serialises as `{_seconds,_nanoseconds}`; the dashboard reads
`{seconds,nanoseconds}`. Dates in admin tables/forms would silently break and edit forms could
write invalid dates back. Fix: `serialize()` in `lib/utils/http.ts` (used by every `json()`
response) restores the old shape; `dateInput` in `lib/validation/common.ts` accepts both shapes.

### R3 (MEDIUM, fixed) Admission documents could point at any Cloudinary account
The schema only required host `res.cloudinary.com`, so an applicant could store links to files in
an attacker-controlled cloud that staff later open. Fix: `isOwnCloudinaryUrl()` requires the
project's own cloud name (`app/api/admissions/route.ts`).

### R4 (MEDIUM, fixed) Emulator variables would disable token verification
With `FIREBASE_AUTH_EMULATOR_HOST` set, the Admin SDK accepts unsigned ID tokens. Fix:
`lib/integrations/firebase/admin.ts` refuses to initialise in production when an emulator host is set.

### R5 (MEDIUM, fixed) Public reads leaked drafts and staff e-mail addresses
`GET /api/alumni/stories` returned unpublished stories, and all public GET routes returned
`createdByEmail` / `updatedByEmail`. Fix: drafts are admin-only; `toPublic()` strips audit fields
for unauthenticated callers (admins with a valid token still receive them).

### R6 (LOW, fixed) Deactivated admins kept working until token expiry
Fix: `verifyIdToken(token, true)` checks revocation and `PATCH /api/admins/[id]` revokes refresh
tokens on deactivation. The `admins` document is also re-read on every request.

### R7 (LOW, fixed) Client-supplied values trusted on public routes
`applicationNumber` was accepted from the applicant and uploads trusted the browser MIME type.
Fix: the number is generated server-side; file type comes from magic bytes; Cloudinary public ids
are random.

### R8 (LOW, open — accepted) Rate limiter is per server instance
`lib/security/rateLimit.ts` keeps its window in process memory as specified. On serverless
hosting each instance has its own counters, so the effective limit is higher under load.
reCAPTCHA is the primary control; move to a shared store (e.g. Upstash Redis) if abuse is seen.
The client IP comes from proxy headers and is only trustworthy behind the hosting platform's proxy.

### R9 (LOW, open — accepted) CSP allows inline scripts
`script-src` contains `'unsafe-inline'` because statically rendered Next.js pages cannot carry a
per-request nonce. A nonce-based policy would force every page to render dynamically.

## Not changed / out of scope
- `uuid` (moderate advisory) remains via `firebase-admin`; forcing v11 breaks its CommonJS consumers.
- The contact form still sends an acknowledgement e-mail to the address typed by the visitor
  (now rate limited and behind reCAPTCHA).

## Coverage limits
No request was replayed against a live Firebase project or Cloudinary account; Firestore rules
were not deployed from this environment.
