# Bearagnostic — Build 1

**App Version:** 0.1.0  
**Runtime Build:** 1  
**Cache:** `bearagnostic-app-b1`  
**Status:** Deployment Candidate; physical-device acceptance pending

## Scope

Build 1 establishes the first real Bearagnostic runtime:

- Benedict Interactive cinematic studio ident;
- Bearagnostic product reveal;
- premium responsive Home UI;
- approved Dr. Bear integration;
- first-run install/trust experience;
- PWA manifest and offline app-shell service worker;
- portrait-lock strategy and landscape fallback guard;
- web-app zoom-lock foundation;
- fullscreen/standalone installed-PWA launch strategy;
- English, Japanese, and Thai localization;
- professional app menu with install, language, and close/exit flows;
- canonical app icon variants for iOS, Android/PWA, maskable use, and favicon;
- premium editorial Home artwork.

The real Checkup analysis engine is intentionally not included in Build 1. No scan result, device-health score, or file metric is fabricated.

## Risk

**MEDIUM** — first runtime introduction. Existing governance and approved mascot/brand assets are protected; Build 1 adds the app shell without changing approved mascot files.

## QA

### Static — PASS
- HTML local references resolve against the current repository baseline.
- No duplicate element IDs.
- JavaScript syntax checks pass.
- Manifest JSON validates.
- Build 1 matches service-worker cache Build 1.
- Manifest requests `orientation: portrait` and `display: fullscreen` with standalone fallback.
- All UI translation keys exist in English, Japanese, and Thai.
- No horizontal overflow found in automated layout checks at 320, 360, 375, 390, 393, 412, 430, and 768 CSS px.

### Automated browser layout / interaction — PASS
Headless Chromium inline-harness checks verified:
- Home rendering at phone widths;
- first-run sheet rendering;
- English/Japanese/Thai layout rendering;
- language switching;
- menu and close-confirm flow;
- Checkup foundation information sheet;
- landscape portrait-required guard;
- no browser page errors in tested interaction flow.

### Local HTTP asset-path smoke test — PASS
Runtime entry, manifest, service worker, CSS, JS, app icon, approved mascot, and editorial image returned HTTP 200 from a local server.

### Physical PWA / device acceptance — PENDING
Must be verified after GitHub Pages deployment on actual Android/iOS hardware for:
- native install prompt behavior where supported;
- iOS Add to Home Screen guidance;
- installed fullscreen/standalone behavior;
- OS-level portrait behavior;
- safe areas/notches/home indicator;
- browser/OS zoom-policy exceptions;
- close behavior differences across installed PWA environments.

## Rollback

If deployment shows a blocking regression, revert the Build 1 commit. The previous repository state contains governance/assets only and no runtime, so rollback is isolated and straightforward.
