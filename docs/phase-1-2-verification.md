# Phase 1–2 acceptance checks

Run the checks below against the deployed HTTPS URL after setting the Supabase Auth Site URL and redirect allowlist to include that URL and `/callback`.

## Browser and PWA

1. Open the deployed site on iPhone Safari and iPad/desktop browsers; check the five-item navigation, safe-area spacing, and light/dark appearance.
2. On iPhone, use **Share → Add to Home Screen**, launch the installed app, and confirm the LIFE OS icon/title and standalone layout.
3. While signed in, load Today once, turn on airplane mode, and navigate/reload. The offline screen should appear; turn connectivity back on and reload.
4. Confirm protected app pages are never available while signed out. Service worker caches only the manifest, public icons, and offline page; it does not cache authenticated app responses.

## Auth and profile

1. Use two separate email accounts. Request a Magic Link for each, follow each link on the same device/browser, and verify both reach Today.
2. In Me, save different timezone/locale/currency/units/AI-consent values for each account; reload and confirm each account sees only its own values.
3. Sign out, confirm navigation returns to Login, and verify reopening `/today` redirects to Login.
4. Request a new link and try an expired or already-used link; confirm a helpful error appears and a fresh link still works.

These deployment/device checks require a real browser, working email delivery, and access to the deployed Supabase project. Local CI cannot establish those results.

## Data backup and export status

The current app does not implement user data export or restore; that is tracked under the later Insights/export milestone. Before real personal data is entered, confirm the Supabase project's database backup retention and restore procedure in its dashboard, and perform a restore check. A platform database backup is operational recovery and is not a user-downloadable export.
