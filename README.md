# Bearagnostic

**Premium local-first file health checkups, by Benedict Interactive.**

Bearagnostic is a mobile-first Progressive Web App (PWA) centered on Dr. Bear: a calm, competent file-health assistant that analyzes only the files or folders a user explicitly chooses.

## Product principles

- Local-first analysis with no selected-file upload in the current product direction.
- Honest browser/PWA capability claims; no fake whole-device scan, RAM/CPU cleaner, antivirus, or fabricated diagnostics.
- Premium Clean Clinical Editorial design with the approved Dr. Bear identity.
- Simple, robust architecture: semantic HTML, modern CSS, vanilla JavaScript, browser-native APIs, service worker, and web manifest.
- Mobile-first responsive behavior across common Android and iPhone viewport sizes, with a portrait-first installed-PWA experience.
- Native-quality copy in English, Japanese, and Thai.
- Stable canonical file paths and an overwrite-first update policy to keep the repository clean.

## Current repository state

This repository now contains the **Build 1 runtime foundation**.

- App Version: **0.1.0**
- Runtime Build: **1**
- Build 1 includes the Benedict Interactive opening, Bearagnostic product reveal, premium responsive Home, portrait/zoom-lock foundation, installable PWA shell, app icon set, first-run install guidance, professional close/exit flow, and English / Japanese / Thai localization.
- Real file-analysis logic remains intentionally deferred to the Checkup Core so the shell never fabricates scan results.
- Approved visual assets and project governance remain stored in canonical paths.

## Canonical documents

- `docs/governance/BEARAGNOSTIC_MASTER_PLAN.md` — implementation roadmap and acceptance plan.
- `docs/governance/ROOM_MIGRATION_PROMPT.md` — room operating contract and project handoff.
- `docs/governance/REPOSITORY_STRUCTURE_POLICY.md` — repository cleanliness and update rules.
- `docs/qa/QA_MATRIX.md` — release QA baseline.
- `docs/releases/RELEASE_PROCESS.md` — Build, packaging, and delivery workflow.

## Repository philosophy

> Stable paths. Surgical changes. Overwrite first. Archive only when it protects a known-good baseline.

Runtime files should not be duplicated as `v2`, `final`, `new`, or dated copies. Existing canonical files should be updated in place whenever their semantic role remains the same.

## Ownership

Project / IP Owner: **P’Benz**  
Studio / Publisher: **Benedict Interactive**  
Product & Development Lead: **Biu**
