# Bearagnostic

**Premium local-first file health checkups, by Benedict Interactive.**

Bearagnostic is a mobile-first Progressive Web App (PWA) centered on Dr. Bear: a calm, competent file-health assistant that analyzes only the files or folders a user explicitly chooses.

## Product principles

- Local-first analysis with no selected-file upload in the current product direction.
- Honest browser/PWA capability claims; no fake whole-device scan, RAM/CPU cleaner, antivirus, or fabricated diagnostics.
- Premium Clean Clinical Editorial design with the approved Dr. Bear identity.
- Approved Home mockup is the production composition authority, not a loose inspiration reference.
- Simple, robust architecture: semantic HTML, modern CSS, vanilla JavaScript, browser-native APIs, service worker, and web manifest.
- Mobile-first responsive behavior across common Android and iPhone viewport sizes, with portrait-first installed-PWA behavior.
- Native-quality copy in English, Japanese, and Thai.
- Stable canonical file paths and an overwrite-first update policy.

## Current repository state

This repository contains the **Build 2 visual-fidelity runtime candidate**.

- App Version: **0.1.1**
- Runtime Build: **2**
- Service-worker cache: **`bearagnostic-app-b2`**
- Build 2 rebuilds the Home implementation around the approved mockup composition: open hero, large Dr. Bear anchor, blue primary Checkup panel, four compact tools, File Health card, editorial lifestyle card, persistent bottom navigation, and Benedict Interactive footer.
- Bottom navigation/footer live outside the scrolling content area, so they cannot be pushed off-screen by Home content.
- Real file-analysis logic remains intentionally deferred to the Checkup Core; the shell does not fabricate results.

## Canonical documents

- `docs/governance/BEARAGNOSTIC_MASTER_PLAN.md` — implementation roadmap and visual-fidelity acceptance rule.
- `docs/governance/ROOM_MIGRATION_PROMPT.md` — room operating contract and project handoff.
- `docs/governance/REPOSITORY_STRUCTURE_POLICY.md` — repository cleanliness and update rules.
- `docs/qa/QA_MATRIX.md` — release QA baseline.
- `docs/releases/RELEASE_PROCESS.md` — Build, packaging, and delivery workflow.

## Repository philosophy

> Stable paths. Surgical changes. Overwrite first. Archive only when it protects a known-good baseline.

Runtime files should not be duplicated as `v2`, `final`, `new`, or dated copies. Existing canonical files are updated in place whenever their responsibility remains the same.

## Ownership

Project / IP Owner: **P’Benz**  
Studio / Publisher: **Benedict Interactive**  
Product & Development Lead: **Biu**
