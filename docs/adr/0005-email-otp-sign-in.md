# 0005. Use email one-time code as the only sign-in method

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

Phase 1 needs sign-in. The candidates were email one-time code (OTP), Sign in with Apple, Google, and phone + SMS. We want the least setup, no passwords, and no extra personal data (see `safety-privacy-review`).

## Options

### Email OTP only
- For: works on any device; no OAuth setup with Apple or Google; no passwords to store or reset; Supabase supports it natively. Because we offer no third-party social sign-in, App Store rules don't require Sign in with Apple.
- Against: slower than a one-tap sign-in; users depend on the email arriving.

### Email OTP + Sign in with Apple
- For: one tap on iOS.
- Against: an extra provider to configure and test; we gain little before we have real users.

### Phone + SMS OTP
- For: familiar in Singapore.
- Against: every SMS costs money; it stores phone numbers, which goes against our safety rule of not holding contact details we don't need.

## Decision

Sign in with an email one-time code only. The 6-digit code is entered in the app; magic links aren't used.

## Consequences

- The Supabase email template must send `{{ .Token }}` (the code), not a link.
- Local development uses Supabase's built-in test mail inbox, so no email provider is needed until we deploy.
- Before any hosted environment has real users, we must configure a proper email-sending service (e.g. Resend). Supabase's default sender is heavily rate-limited.
- Account = email address. Changing email or recovering an account relies on access to that inbox.
- Revisit: add Sign in with Apple and/or Google if beta users find signing in slow (adding Google on iOS means adding Apple too).
