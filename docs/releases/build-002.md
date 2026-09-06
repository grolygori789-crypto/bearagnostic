# Bearagnostic — Build 2

**App Version:** 0.1.1  
**Runtime Build:** 2  
**Cache:** `bearagnostic-app-b2`  
**Status:** Deployment Candidate; physical-device acceptance pending

## Objective

Rebuild the Home screen to follow the approved Bearagnostic mockup as closely as practical while preserving truthful PWA/browser behavior.

## What changed

- Rebuilt Home composition instead of patching the rejected Build 1 layout.
- Removed the generic enclosed hero card and restored the open editorial hero.
- Added the approved wordmark treatment derived from the supplied mockup.
- Restored the large right-side Dr. Bear visual anchor.
- Rebuilt the primary Checkup panel to match the mockup proportions and visual hierarchy.
- Rebuilt quick tools as four compact cards in a single row.
- Restored a single horizontal File Health card.
- Integrated the approved editorial still-life as the lifestyle card.
- Rebuilt five-item bottom navigation in the mockup style.
- Moved bottom navigation/footer outside the scrolling Home region so they remain fully visible.
- Preserved English, Japanese, and Thai localization, PWA install flow, portrait policy, zoom-lock policy, opening sequence, and professional close flow.
- Added a governance-level Home mockup fidelity acceptance rule.

## Truthful differences from the visual mockup

The production shell intentionally uses truthful capability language:

- `Start Checkup` rather than `Start Scan`;
- `Cleanup` refers to review candidates, not system junk;
- `File Health` applies to the selected file set, not the whole device.

## Risk

**MEDIUM** — substantial visual rewrite of the Home runtime, but no file-analysis engine or destructive behavior is introduced.

## QA performed

### Static — PASS
- Runtime paths and required local assets resolve.
- JavaScript syntax validates.
- Manifest JSON validates.
- Runtime Build 2 matches service-worker cache Build 2.
- Manifest retains portrait orientation and fullscreen/standalone strategy.
- No duplicate element IDs detected.
- Cross-project contamination scan completed for runtime/package paths.

### Automated visual harness — PASS
Headless Chromium rendering was exercised using an inline self-contained harness because direct localhost/file navigation is blocked in the execution environment.

Rendered Home screenshots were checked at:
- 390 × 844
- 430 × 932
- 320 × 700

Observed behavior:
- no document-level horizontal overflow;
- bottom navigation remains fully visible;
- footer remains fully visible;
- Home content scrolls independently only when the available vertical space is too short;
- approved mockup composition remains recognizable across tested widths.

### Physical PWA / device acceptance — PENDING
Requires real Android/iOS testing after GitHub Pages deployment for install UI, OS safe areas, installed fullscreen behavior, portrait enforcement limits, and browser/OS zoom-policy exceptions.

## Rollback

If Build 2 introduces a blocking regression, revert the Build 2 commit to restore Build 1. No new persistent data schema is introduced in this build.
