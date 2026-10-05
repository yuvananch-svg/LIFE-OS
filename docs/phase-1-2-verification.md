# Phase 1–2 acceptance checks

Run the checks below against the deployed HTTPS URL after setting `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, setting the Supabase Auth Site URL to the deployed origin, and adding the exact `${origin}/callback` URL to the redirect allowlist. Local development should add the exact local callback URL too. This repository cannot inspect or change the hosted project's dashboard configuration. Never put a Supabase secret/service-role key in a `NEXT_PUBLIC_` variable.

## Browser and PWA

1. Open the deployed site on iPhone Safari and iPad/desktop browsers; check the five-item navigation, safe-area spacing, and light/dark appearance.
2. On iPhone, use **Share → Add to Home Screen**, launch the installed app, and confirm the LIFE OS icon/title and standalone layout.
3. While signed in, load Today once, turn on airplane mode, and navigate/reload. The offline screen should appear; turn connectivity back on and reload.
4. Confirm protected app pages are never available while signed out. Service worker caches only the manifest, public icons, and offline page; it does not cache authenticated app responses.

## Auth and profile

1. Use two separate email accounts. Request a Magic Link for each, follow each link on the same device/browser, and verify both reach Today. Confirm the outgoing URL uses `/callback` and the Supabase redirect allowlist matches it.
2. In Me, save different timezone/locale/currency/units/AI-consent values for each account; reload and confirm each account sees only its own values.
3. Sign out, confirm navigation returns to Login, and verify reopening `/today` redirects to Login.
4. Request a new link and try an expired or already-used link; confirm a helpful error appears and a fresh link still works.

These deployment/device checks require a real browser, working email delivery, and access to the deployed Supabase project. Local CI cannot establish those results.

## Local evidence and consent contract

- `npm run typecheck`, `npm run lint`, and `npm test` validate the checked-in code and pure consent contract. `npm run smoke` exercises public login/offline, protected Today redirection, and missing callback code.
- The app shell loads profile preferences, section permissions, and active section labels only after server-side identity lookup; the client context is keyed by user ID and clears on logout/account change. Timezone shown in the shared shell comes from this context.
- `profiles.ai_consent` is the global AI opt-in. AI read scope also requires an explicit `section_permissions.can_read` row for that user and section. AI write/proposed-change scope requires both `can_read` and `can_write`. Missing rows, failed context loads, and absent global consent deny scope. The current table is a future AI capability contract; it does not change ordinary module CRUD. Revocation governs subsequent resolver calls; it cannot recall data already processed by a provider.
- Transcription-provider consent is disclosed but disabled until a provider and audio lifecycle are implemented. No audio is recorded or sent in phase 2.
- `2.1` config/URL values have code-level guards and are documented above, but hosted Site URL and redirect allowlist were not inspected. `2.2–2.6` and the browser portion of `2.7` remain unverified because no authenticated project/email/device session was available. SQL RLS suite results are not reported as run here.
- Auth implementation cross-checked against Supabase's current [Next.js SSR guide](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs), [signInWithOtp](https://supabase.com/docs/reference/javascript/auth-signinwithotp), [exchangeCodeForSession](https://supabase.com/docs/reference/javascript/auth-exchangecodeforsession), and [redirect URL guide](https://supabase.com/docs/guides/auth/redirect-urls) on 2026-10-05. Callback path is `/callback` because the `(auth)` route group is omitted from the URL.

## Data backup and export status

The current app does not implement user data export or restore; that is tracked under the later Insights/export milestone. Before real personal data is entered, confirm the Supabase project's database backup retention and restore procedure in its dashboard, and perform a restore check. A platform database backup is operational recovery and is not a user-downloadable export.
