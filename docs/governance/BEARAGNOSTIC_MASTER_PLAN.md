# BEARAGNOSTIC — MASTER PLAN

**Revision:** 1.1  
**Project:** Bearagnostic  
**Studio / Publisher:** Benedict Interactive  
**Project Owner / IP Owner:** P’Benz  
**Product & Development Lead:** Biu  
**Primary Platform:** Mobile-first HTML/CSS/JavaScript Progressive Web App  
**Primary Hosting:** GitHub Pages  
**Target Complexity:** approximately 5.5/10 maximum  
**Current State:** Build 1 runtime foundation / deployment candidate

---

## 1. Product North Star

Bearagnostic will be a premium, local-first **file-health checkup assistant** represented by Dr. Bear.

The product does not compete by pretending to have privileged whole-device access. It competes on:

- excellent analysis of user-selected files/folders;
- clarity and prioritization;
- visual quality;
- privacy and trust;
- fast, calm interaction;
- memorable character identity;
- cross-platform honesty;
- reliable PWA installation and repeat use.

Core product metaphor:

> Dr. Bear performs a checkup on the files the user explicitly chooses.

Core engineering principle:

> Simple architecture. Exceptional execution.

---

## 2. Success Definition

A successful Bearagnostic release lets a user:

1. open or install the app with minimal friction;
2. immediately understand what Bearagnostic can and cannot do;
3. select files or a supported folder;
4. receive real, locally computed analysis;
5. identify duplicates, large files, older files, and cleanup candidates worth reviewing;
6. understand that the result applies only to the selected data set;
7. trust that selected file contents are not silently uploaded;
8. use the app comfortably across common phone sizes;
9. recognize and remember Dr. Bear;
10. return later without startup or update friction.

---

## 3. Product Scope — V1

### 3.1 Start Checkup

Primary CTA:

**Start Checkup**

Supporting copy:

**Choose files or a folder to analyze.**

The interface must never imply unrestricted whole-device scanning.

### 3.2 Duplicate Analysis

Planned strategy:

1. group by file size;
2. narrow candidates before expensive work;
3. use exact content hashing only where safe and performant;
4. classify oversized or incompletely verified matches as possible duplicates;
5. never label metadata-only matches as exact duplicates.

### 3.3 Large Files

Show large files only within the selected set. Thresholds may be tuned after real-device performance testing.

### 3.4 Older Files

Use available `lastModified` metadata and describe it truthfully as modified-date information, not guaranteed creation age.

### 3.5 Cleanup Candidates

Combine useful findings into a reviewable list:

- exact duplicates;
- possible duplicates;
- large files;
- older files.

Do not call these system junk.

### 3.6 Checkup Summary

Use qualitative states based on observed findings:

- Looks good
- Worth reviewing
- Needs attention

Do not introduce a fake universal device-health score.

---

## 4. Product Information Architecture

Initial target structure:

### Home
- Bearagnostic identity
- Dr. Bear hero
- Start Checkup
- quick tools
- truthful recent summary when history exists

### Checkup
- file/folder selection
- capability explanation
- real progress
- analysis state
- result summary

### Tools
- Duplicates
- Large Files
- Older Files
- Cleanup Candidates

### Insights
- truthful aggregate history only when sufficient data exists

### More
- Preferences
- Checkup settings
- Privacy & local data
- Help & Feedback
- Support Bearagnostic
- Legal
- About
- Build / version

A bottom-navigation item must not ship merely to fill space. Empty decorative tabs are removed or deferred.

---

## 5. Visual Direction

Canonical visual language:

**Premium Clean Clinical Editorial**

### 5.1 Base palette

- warm white / soft ivory background;
- subtle pale gray/cool-white surfaces;
- dark navy / charcoal text;
- Bearagnostic cyan-to-blue accent;
- restrained mint, violet, and amber for semantic use only.

### 5.2 Material language

- disciplined rounded-corner hierarchy;
- subtle borders;
- soft layered shadows;
- excellent spacing;
- clean iconography;
- limited editorial serif/italic accent copy;
- no excessive glassmorphism;
- no gaming neon;
- no random multicolor gradients;
- no fake technical gauges.

### 5.3 Dr. Bear identity

The approved mascot identity is locked across:

- head and muzzle shape;
- fur color family;
- tan muzzle / inner ear relationship;
- rectangular glasses;
- white lab coat;
- dark undershirt;
- tablet family;
- pen placement;
- body proportion;
- premium rendering language.

Canonical states:

- Master
- Scanning
- Concerned
- Approved
- Deadpan Warning

The mascot is selectively used; it does not appear on every card.

---

## 6. Responsive Fit, Viewport Lock & Full-Screen Policy

This section incorporates P’Benz’s explicit project requirement added on 6 September 2026.

### 6.1 Required outcome

Bearagnostic must feel deliberately fitted to the phone rather than like a desktop webpage squeezed into a mobile viewport.

Target QA widths include at least:

- 320 px
- 360 px
- 375 / 390 / 393 px
- 412 / 430 px
- tablet sanity around 768 px

The production layout will use responsive tokens and fluid sizing rather than one fixed screenshot dimension.

### 6.2 Layout implementation strategy

Use:

- `viewport-fit=cover`;
- safe-area insets via `env(safe-area-inset-*)`;
- `dvh`/dynamic viewport units where useful;
- `clamp()` for responsive type and spacing;
- fluid cards and grid rules;
- strict `overflow-x: hidden` / no horizontal document overflow;
- bottom navigation positioned safely above home indicators and browser UI;
- keyboard-safe forms;
- portrait-first composition.

### 6.3 Portrait orientation lock

P’Benz requires Bearagnostic to remain portrait-first and prevent ordinary in-app rotation wherever the platform permits it.

Implementation target:

- manifest `orientation: portrait`;
- Screen Orientation API lock in installed-PWA environments where supported;
- a professional portrait-required guard when a browser or OS ignores the requested lock;
- no broken landscape layout exposed as a normal app state.

**Platform boundary:** web applications cannot override every OS/browser orientation policy. The product must enforce portrait at the strongest honest level available and provide a clear fallback instead of claiming impossible control.

### 6.4 Zoom lock

The app will request a fixed mobile viewport using a production viewport policy equivalent to:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
>
```

Additional touch/gesture handling may be used where necessary to suppress pinch/double-tap zoom while preserving intended app scrolling and controls.

**Important technical truth:** browser and operating-system accessibility policies can override or ignore web-page zoom restrictions in some environments. Bearagnostic can strongly request and enforce zoom lock at the web-app layer where supported, but no PWA can guarantee control over every OS-level accessibility zoom feature.

Because zoom is intentionally restricted, the design must compensate with highly readable type, generous touch targets, strong contrast, and responsive sizing.

### 6.5 Automatic full-screen / app-like launch

Primary installed-PWA target:

- prefer a full-screen-capable manifest display mode where supported;
- provide `standalone` as a safe fallback;
- render edge-to-edge with safe-area handling;
- remove unnecessary browser-like chrome from the app itself.

**Platform boundary:** a normal webpage cannot reliably invoke the browser Fullscreen API automatically on first load because browsers generally require a user gesture. Therefore:

- installed PWA launch is the primary path for the strongest automatic app-like/full-screen experience;
- browser launch will render full-bleed inside the available viewport and offer a refined install path;
- iOS/Android differences will be capability-detected rather than hidden;
- the app will never claim that browser chrome can be forcibly removed where the platform does not permit it.

This is a hard product requirement, implemented to the maximum level each platform honestly allows.

---

## 7. Opening / First-Run Experience

Target sequence:

**Benedict Interactive → Bearagnostic → Home**

First launch:

- short Benedict Interactive ident;
- soft transition to Bearagnostic;
- reveal the premium Home shell;
- show a single first-run install/trust sheet with language controls and selected-file/local-analysis scope;
- allow install or a clear “not now” path without blocking future use.

Repeat launch should be substantially shorter.

Optional opening layers must fail open. Branding must never brick startup.

### 7.1 Professional close / exit behavior

Bearagnostic provides a deliberate **Close Bearagnostic** action from the app menu rather than placing a persistent desktop-style close button over the main UI.

- use a clear confirmation step;
- attempt `window.close()` only from the explicit user action where permitted;
- when the browser/PWA environment refuses self-close, show a clean exit state explaining how to dismiss the app from recent apps;
- never claim the app closed when the platform kept it open.

---

## 8. Technical Architecture

Preferred stack:

- semantic HTML;
- modern CSS;
- vanilla JavaScript;
- browser-native file APIs;
- service worker;
- web manifest;
- optional lightweight Web Worker where analysis cost justifies it;
- localStorage / IndexedDB only where necessary;
- GitHub Pages.

Avoid by default:

- React / Vue / Angular;
- Node backend;
- database server;
- user accounts;
- server-side file uploads;
- native Android Studio requirement;
- Capacitor / Kotlin;
- large dependencies or complex build chains.

---

## 9. Capability Detection

Runtime capability detection is mandatory.

Selection may use:

- standard multi-file input;
- directory selection where supported;
- File System Access API where supported.

If a capability is unavailable:

- hide or adapt the unsupported action;
- provide a truthful fallback;
- never present a broken control;
- never claim deletion occurred when the browser cannot perform it.

---

## 10. Deletion / Destructive Operations

V1 priority:

**analyze → review → guide**

rather than one-tap deletion.

If direct deletion is added later, it must be capability-gated and require:

- explicitly granted scope;
- clear preview;
- explicit confirmation;
- truthful success/failure;
- safe fallback;
- no silent deletion.

Destructive behavior automatically triggers elevated regression and privacy review.

---

## 11. Local Data & Privacy

Default philosophy:

**Local-first, minimal persistence.**

V1 target:

- no account;
- no login;
- no behavioural analytics SDK;
- no advertising SDK;
- no remote storage of selected files;
- local browser/app analysis;
- no background upload of selected content.

Do not persist by default:

- raw file contents;
- full file paths;
- full directory trees;
- sensitive media metadata;
- long-lived hashes tied to filenames.

If Insights/history is enabled, store aggregate checkup summaries only.

---

## 12. Performance Plan

The app must feel fast even with meaningful selections.

Strategy:

- group inexpensive candidates before hashing;
- process incrementally;
- update progress based on actual work;
- yield to the UI to avoid long main-thread blocking;
- introduce a Web Worker only when justified;
- release large buffers promptly;
- set transparent limits when an operation is too memory-heavy;
- degrade gracefully instead of pretending analysis completed.

No fake progress.

---

## 13. PWA / Offline Plan

Required production elements:

- valid `manifest.webmanifest`;
- service worker;
- install icons;
- theme/background colors;
- full-screen/standalone display strategy;
- offline-capable app shell;
- GitHub Pages-safe relative paths;
- coherent Build/cache versioning;
- install guidance;
- update-available flow that does not interrupt an active checkup.

Do not cache user-selected file contents as app assets.

---

## 14. Build & Version Governance

Runtime Build and semantic App Version are separate.

Current runtime foundation:

- App Version: `0.1.0`;
- Runtime Build: `1`;
- service-worker cache identity: `bearagnostic-app-b1`;
- Legal Version target: `1.0.0` when the legal layer is introduced.

Every runtime change must increment Build.

Build/cache identity must remain coherent across:

- runtime config;
- displayed Build;
- service worker cache;
- About/Settings footer;
- release metadata where used.

A mismatch is a release blocker.

Governance-only documentation changes do not increment runtime Build.

---

## 15. Repository Hygiene / Update Strategy

Bearagnostic follows the repository policy in `REPOSITORY_STRUCTURE_POLICY.md`.

Key rules:

- stable canonical paths;
- overwrite existing files whenever responsibility is unchanged;
- no `v2`, `final`, `new`, or dated runtime copies;
- Git history stores ordinary history;
- rollback artifacts only for meaningful risk;
- no delivery ZIPs inside GitHub;
- no random files at root;
- no cross-project contamination;
- no unnecessary file moves/renames.

This is specifically designed so routine updates can be overlaid cleanly without P’Benz manually cleaning accumulated files.

---

## 16. Help & Feedback

Planned actions:

- Report a Problem
- Send Feedback
- Copy Diagnostic Info

Official support:

`benedict.support@gmail.com`

Safe diagnostics may contain Build/version/platform/browser/capability information, but must not automatically contain filenames, paths, hashes, screenshots, clipboard content, or selected-file metadata.

The user controls the final send action.

---

## 17. Voluntary Support

Initial business model:

**Open Access + Voluntary Support**

Worldwide:

- Ko-fi: `https://ko-fi.com/benedictinteractive`

Thailand:

- canonical Benedict Interactive PromptPay standard and approved QR, verified from the designated source before implementation.

Support never changes analysis quality, limits, results, or entitlements.

Support failure must not affect core app behavior.

---

## 18. Internationalization

Launch target:

- English
- Japanese (`日本語`)
- Thai (`ไทย`)

Each language must read as naturally authored product copy, not literal machine translation. The tone stays premium, concise, calm, and easy to understand in each locale.

Language selection persists locally and remains available from the app UI. Brand names remain unchanged.

---

## 19. Accessibility

Even with the explicit zoom-lock requirement, the app should preserve strong practical accessibility through:

- minimum comfortable text sizes;
- high contrast;
- visible focus states;
- semantic controls;
- screen-reader labels;
- touch targets generally at least 44×44 CSS px;
- reduced-motion support;
- no information conveyed by color alone;
- responsive layout that does not require zoom to read.

Any accessibility conflict created by platform-level zoom restrictions must be documented rather than hidden.

---

## 20. QA Baseline

Every meaningful runtime release validates the relevant subset of:

### Static
- HTML/CSS/JS sanity
- duplicate IDs
- missing assets
- broken relative paths
- manifest/service-worker validity
- Build/cache coherence
- secrets scan
- cross-project contamination scan

### Responsive
- 320
- 360
- 375/390/393
- 412/430
- ~768 sanity
- no horizontal overflow
- safe areas
- bottom navigation
- text wrapping
- touch targets
- zoom-lock behavior where supported
- installed-PWA viewport/full-screen behavior where supported

### Functional
- file selection
- folder capability detection
- progress
- duplicate analysis
- large files
- older files
- cleanup candidates
- zero-result state
- error recovery

### PWA
- first online load
- repeat launch
- install flow
- installed reopen
- offline app-shell launch
- reconnect
- update path
- cache coherence

### Privacy / Trust
- no selected-content upload
- no filename/path leakage into diagnostics
- no silent destructive action
- user-initiated external links only

Static or automated PASS never equals physical-device acceptance.

---

## 21. Implementation Roadmap

### Phase 1 — Foundation

Deliver:

- repository governance and clean structure;
- approved visual assets in canonical paths;
- runtime Build/version configuration;
- PWA manifest/service worker shell;
- responsive viewport/full-screen/zoom-lock foundation;
- app icon;
- opening sequence;
- premium responsive Home;
- English / Japanese / Thai localization foundation;
- first-run install guidance;
- professional close / exit flow;
- Settings/About shell.

**Exit condition:** a stable, installable, visually premium shell that fits target devices and starts reliably.

### Phase 2 — Real Checkup Core

Deliver:

- file selection;
- folder capability detection;
- real progress;
- file count and total size;
- large-file analysis;
- older-file analysis;
- duplicate candidate foundation;
- result summary;
- truthful scope messaging.

**Exit condition:** user receives real analysis with no fake metrics.

### Phase 3 — Checkup Intelligence & UX Polish

Deliver:

- exact/possible duplicate distinction;
- review prioritization;
- reclaimable-size calculation where defensible;
- result filtering/sorting;
- excellent empty/error states;
- Dr. Bear state integration;
- performance hardening.

**Exit condition:** Checkup experience feels genuinely useful and premium, not merely functional.

### Phase 4 — Trust, Privacy, Legal & Support UX

Deliver:

- privacy/local-data controls;
- local history erase flow;
- Help & Feedback;
- Terms / Privacy / IP / Third-Party Notices / About;
- legal acknowledgement where appropriate;
- Ko-fi;
- PromptPay;
- failure isolation QA.

**Exit condition:** production trust surfaces accurately match product behavior.

### Phase 5 — Insights & Return Experience

Deliver only if truthful data exists:

- aggregate checkup history;
- file-volume trend;
- duplicate trend;
- large-file trend;
- reclaimable-space trend;
- recent summaries.

No fake insights to fill the screen.

### Phase 6 — Production Hardening / RC

Deliver:

- cross-browser testing;
- Android installed PWA testing;
- iPhone Safari / installed-web-app testing;
- full-screen/viewport behavior verification;
- offline/reconnect/update verification;
- accessibility sanity;
- performance limits;
- final legal/support review;
- physical-device acceptance.

**Exit condition:** Physical PASS can establish the known-good baseline.

---

## 22. Release Decision Heuristic

Before shipping any feature, answer:

1. Is it useful?
2. Can the PWA really do it?
3. Does it remain within Medium complexity?
4. Can the change be isolated?
5. Does it preserve privacy?
6. Does it strengthen Bearagnostic’s premium identity?
7. What can regress?
8. Can a simpler implementation deliver most of the value?
9. Is behavior honest on iOS and Android?
10. Would a reasonable user trust it?

Weak answer = redesign, defer, or reject.

---

## 23. Immediate Next Production Batch

After this governance foundation is committed, the next batch should be **Build 1 — Phase 1 Runtime Foundation**.

Priority order:

1. version/build config;
2. responsive viewport + safe-area + zoom-lock foundation;
3. PWA manifest and service worker;
4. install identity/app icon;
5. opening sequence;
6. premium Home derived from the approved white mockup with truthful labels;
7. Settings/About shell;
8. responsive QA at all target widths;
9. installed-PWA/full-screen behavior QA within platform limits.

Do not jump ahead to complex duplicate hashing until the shell, layout system, and PWA lifecycle are stable.

---

## 24. Final Standard

Bearagnostic must feel expensive because every visible and technical detail is intentional.

Not because the codebase is complicated.

The governing question remains:

> What is the simplest implementation that makes Bearagnostic feel world-class without lying about what the browser can do?
