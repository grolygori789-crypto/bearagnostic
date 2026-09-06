# Bearagnostic

**Premium local-first file-health checkups, by Benedict Interactive.**

Bearagnostic is a mobile-first Progressive Web App centered on Dr. Bear, a calm, competent and slightly deadpan file-health assistant. It analyzes only files or folders the user explicitly chooses.

## Current production candidate

- App Version: **0.1.2**
- Runtime Build: **3**
- Service Worker cache: **bearagnostic-app-b3**
- Languages: **English / 日本語 / ไทย**

Build 3 is a focused visual and shell correction release. It restores the approved Premium Clean Clinical Editorial Home composition, adds the Benedict Interactive → Bearagnostic opening, fixes the PWA install offer flow, provides complete bottom-navigation iconography, keeps Home fitted to the viewport without page scrolling, and introduces real Settings / More information architecture rather than routing those controls to installation.

## Product truth

Bearagnostic does not claim unrestricted whole-device access. The V1 direction is user-selected file analysis for duplicates, large files, older files and cleanup candidates. Selected files are intended to be analyzed locally and are not uploaded by the app in the current version.

The real file-analysis Checkup engine is a subsequent production phase. Build 3 does not fabricate scan results, health scores, RAM/CPU data, system junk or progress.

## PWA behavior

- Installable from supported browsers.
- Custom first-browser-launch install invitation with native prompt integration where the browser exposes it.
- iOS guidance for Add to Home Screen.
- Installed launch targets full-screen with standalone/minimal-ui fallbacks.
- Portrait-first layout and best-effort orientation lock.
- Zoom suppression at the web-app layer; OS accessibility behavior may override browser restrictions.
- Offline app shell via Service Worker.

## Repository philosophy

> Stable paths. Surgical changes. Overwrite first. Git history keeps ordinary history.

Runtime files should not be duplicated as `v2`, `final`, `new`, or dated copies. Delivery packages use repository-relative paths so they can be overlaid directly onto the repository root.

## Ownership

Project / IP Owner: **P’Benz**  
Studio / Publisher: **Benedict Interactive**  
Product & Development Lead: **Biu**
