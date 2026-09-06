# Bearagnostic QA Matrix

**Purpose:** Canonical QA baseline for meaningful runtime releases.

## Status vocabulary

- **Static PASS** — source/static checks pass.
- **Automated Browser PASS** — deterministic browser checks pass where available.
- **Deployment Candidate** — suitable for deployment testing.
- **Physical PASS** — verified on real hardware.
- **Known-Good Baseline** — physically accepted build designated as stable.

Do not treat lower levels as equivalent to Physical PASS.

## Responsive matrix

| Target | Required checks |
|---|---|
| 320 px | fit, no horizontal overflow, readable type, touch targets |
| 360 px | fit, bottom nav, hero/CTA balance |
| 375/390/393 px | primary phone reference range |
| 412/430 px | large-phone spacing and density |
| ~768 px | tablet sanity, no stretched/awkward composition |

## Viewport / full-screen checks

- `viewport-fit=cover` works with safe areas.
- No horizontal document overflow.
- No unintended page scaling.
- Pinch/double-tap zoom is suppressed where supported by the platform/browser policy.
- Installed PWA launches in the strongest supported app-like/full-screen display mode.
- Browser mode remains full-bleed within the available viewport when browser chrome cannot be removed.
- iOS and Android behavior is documented separately when capability differs.
- OS-level accessibility overrides are not falsely reported as app failures.

## Static checks

- HTML validity/sanity
- CSS parse sanity
- JavaScript syntax
- duplicate IDs
- missing assets
- broken relative paths
- manifest validity
- service worker syntax
- Build/cache coherence
- no obvious secrets
- no cross-project files/strings

## Functional checks

- multi-file selection
- folder selection where supported
- capability fallback
- progress based on real work
- large files
- older files
- duplicate candidates
- cleanup candidates
- empty state
- error recovery
- large selection behavior

## PWA checks

- first online load
- repeat launch
- install flow
- installed reopen
- offline app-shell launch after prior successful load
- reconnect
- update available flow
- no forced reload during active analysis
- cache version coherence

## Accessibility checks

- visible focus
- semantic labels
- screen-reader labels for critical controls
- minimum practical 44×44 CSS px targets
- contrast
- reduced motion
- readable typography without relying on user zoom

## Privacy / Trust checks

- selected files are not uploaded by app logic
- file names/paths are not leaked into support diagnostics
- no background analytics/ads
- external links are user initiated
- destructive actions require explicit user action
- no fake whole-device diagnostic claims

## Repository hygiene checks

- changed-file allowlist reviewed
- no `v2`, `final`, `copy`, dated runtime duplicates
- no temporary/backup files
- no ZIP committed to repo
- no unrelated project assets
- package root is repository root
