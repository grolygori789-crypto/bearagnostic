# Bearagnostic Repository Structure Policy

**Status:** Canonical  
**Applies to:** `grolygori789-crypto/bearagnostic`  
**Goal:** Keep the repository clean, predictable, easy to update, and resistant to file accumulation.

## 1. Core rule

Bearagnostic uses a **stable-path / overwrite-first** repository model.

When a file keeps the same responsibility, update the existing canonical file instead of creating a second version.

Do not create routine duplicates such as:

- `app-v2.js`
- `app-final.js`
- `app-final-final.js`
- `new-style.css`
- `home-2026-09-06.html`
- copied runtime folders for each Build

Build/version history belongs in Git history and release documentation, not in duplicated runtime files.

## 2. Canonical structure

```text
/
├── assets/
│   ├── brand/       # Canonical brand/logo assets
│   ├── mascot/      # Approved Dr. Bear state assets
│   ├── icons/       # PWA/app icons and platform-safe icon variants
│   └── support/     # Approved support assets such as canonical PromptPay QR
├── css/             # Runtime stylesheets
├── js/
│   ├── config/      # Build/version/runtime configuration
│   ├── core/        # App bootstrap, routing, capability detection
│   ├── analysis/    # File-analysis logic and optional workers
│   ├── ui/          # UI state/rendering/interactions
│   ├── support/     # Help/Feedback and voluntary support isolation
│   └── legal/       # Legal acknowledgement / legal UI behavior
├── docs/
│   ├── governance/  # Master plan, migration contract, repository policy
│   ├── design/      # Approved design references; not runtime assets
│   ├── legal/       # User-facing legal source documents
│   ├── qa/          # QA standards and meaningful QA reports
│   ├── releases/    # Release process and concise release notes
│   ├── restore/     # Rollback artifacts only when materially justified
│   ├── checksums/   # Checksums only for meaningful release/restore needs
│   └── tests/       # Test fixtures/scripts when introduced
├── index.html
├── manifest.webmanifest
├── sw.js
├── README.md
└── LICENSE.md       # Introduced with the legal/IP foundation
```

Git does not preserve empty directories. A `.gitkeep` is allowed only to reserve an approved canonical folder before its first real file exists. It remains hidden and may be removed only when convenient; its presence is harmless.

## 3. Root cleanliness

The repository root is reserved for files that are technically or conventionally expected there.

Allowed root files include:

- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `README.md`
- `LICENSE.md`
- `.gitignore`

Do not place QA reports, screenshots, ZIP packages, backup files, design references, or governance documents at root.

## 4. Overwrite-first rules

1. Same responsibility = same path.
2. Runtime changes overwrite canonical files.
3. Asset replacements use the same filename when the semantic role is unchanged.
4. A new filename is justified only when the new file has a genuinely different role or must coexist at runtime.
5. Git history is the default historical record.
6. Do not commit delivery ZIP files into the repository.
7. Do not create per-Build copies of the entire app.
8. Do not create backups for trivial edits.

## 5. Deletion minimization

Repository updates should be designed so deletion is rare.

Before introducing a file, confirm that its role is stable enough to justify a canonical path. Prefer extending or replacing a current file over adding a parallel alternative.

When deletion is genuinely unavoidable:

- identify the exact path;
- explain why overwrite cannot solve it;
- classify regression risk;
- include deletion instructions explicitly in the delivery;
- avoid broad folder deletion.

## 6. Asset naming

Use lowercase kebab-case English filenames for runtime and reference assets.

Examples:

- `bearagnostic-master-logo.png`
- `dr-bear-scanning.png`
- `dr-bear-concerned.png`
- `dr-bear-approved.png`
- `dr-bear-warning.png`

Avoid spaces, Thai filenames, `(1)`, `copy`, `final`, or version suffixes in canonical paths.

## 7. Governance and release documents

Canonical governance documents are updated in place.

Use a new document only when it represents a distinct policy, legal document, release record, or rollback artifact.

Do not create a new Master Plan for every revision. Update:

`docs/governance/BEARAGNOSTIC_MASTER_PLAN.md`

and use Git history to preserve prior versions.

## 8. Cross-project isolation

Before every delivery, search package contents for unrelated project names and assets. Files from Auren, Little Ganesha Tarot, Velnox, Bark and Guard, Lucky Claw, or any unrelated project are release blockers unless explicitly imported as a verified standard and rewritten/adapted into Bearagnostic documentation.

## 9. Packaging contract

Delivery packages must have the repository root at ZIP root.

Correct:

```text
bearagnostic-update.zip
├── css/
├── js/
├── docs/
└── ...
```

Incorrect:

```text
bearagnostic-update.zip
└── bearagnostic-update/
    └── bearagnostic/
        └── ...
```

P’Benz should be able to extract/overlay the package into the local repository without manually reorganizing files.

## 10. Final repository hygiene check

Before every meaningful package:

- verify canonical paths;
- verify no duplicate-version filenames;
- verify no temporary/backup files;
- verify no delivery ZIP inside the repository;
- verify no wrong-project strings/assets;
- verify changed-file allowlist;
- verify Build/cache coherence for runtime changes;
- verify archive contents before delivery.
