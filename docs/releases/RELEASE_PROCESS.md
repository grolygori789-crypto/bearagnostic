# Bearagnostic Release Process

## 1. Inspect production first

Once production exists, GitHub `main` is the implementation baseline.

Before a runtime batch:

- inspect current HEAD;
- inspect displayed Build/App Version;
- inspect `sw.js` cache identity;
- inspect `manifest.webmanifest` when relevant;
- inspect runtime entry files;
- inspect storage/schema when relevant;
- establish the known-good baseline.

## 2. Define the batch

For each update define:

- objective;
- changed-file allowlist;
- protected files;
- regression risk: LOW / MEDIUM / HIGH;
- QA required;
- rollback plan for HIGH risk.

## 3. Overwrite-first implementation

Update canonical files in place whenever their role is unchanged.

Do not create routine version copies of runtime files. Git history is the ordinary rollback/history mechanism.

## 4. Build governance

Every runtime change increments Build.

Verify coherence across:

- internal Build constant;
- displayed Build;
- service-worker cache identity;
- About/Settings footer;
- release metadata when used.

Governance-only docs changes do not increment runtime Build.

## 5. QA

Run the relevant subset of `docs/qa/QA_MATRIX.md`.

Use precise status labels. Never claim physical-device validation without physical-device testing.

## 6. Package

Delivery ZIP requirements:

- ZIP root is repository root;
- changed files only where practical;
- canonical repository-relative paths;
- no wrapper folder;
- no unrelated files;
- no stale ZIP baseline;
- archive inspected before delivery.

P’Benz should be able to extract/overlay the package into the repository with minimal manual handling.

## 7. Commit Name

Every GitHub delivery includes a concise Commit Name of no more than 50 characters in a Markdown code block.

## 8. Remote-write boundary

Default workflow is read/inspect → build locally → QA → package → P’Benz uploads/commits.

Do not mutate the remote repository unless P’Benz explicitly authorizes remote writes in the current turn.

## 9. Known-good baseline

After P’Benz physically accepts a deployed build, it may be designated the new known-good baseline.

Create dedicated rollback artifacts only when meaningful risk justifies them. Avoid backup clutter for trivial changes.
