# Bearagnostic Build 11

Version: 0.2.0  
Focus: Production Clinical Scan experience and real selected-file analysis foundation.

## What changed
- Rebuilt the Checkup screen to closely follow the approved premium scanning mockup.
- Added the approved Dr. Bear clinical scanning scene as the production hero plate.
- Added animated file tiles that visually flow toward the tablet while real selected-file work is running.
- Added a six-stage Clinical Analysis Rail with completed checkmarks and active-stage state.
- Added a real two-tone cyan-to-blue SVG progress ring tied to actual work stages.
- Added live counters for files reviewed, duplicate candidates, large files, and older files.
- Added premium slow breathing motion to the scanning headline and sequenced ellipsis.
- Added a local file/folder chooser with truthful scope and privacy language.
- Added selected-file metadata analysis, 100 MB large-file classification, one-year older-file classification, and size-group duplicate candidate detection.
- Uses SHA-256 only for safe small same-size candidate groups; larger groups remain clearly classified as candidates rather than exact duplicates.
- Stores aggregate checkup summary only. No filename, file path, file contents, or hashes are persisted.
- Added reduced-motion behavior for all new scan animation.

## Runtime identifiers
- App Version: 0.2.0
- Build: 11
- Cache: `bearagnostic-app-b11`

## QA target
- 320 / 360 / 390 / 430 px portrait widths
- No horizontal overflow
- Real progress only; no timer-driven fake diagnostics
- EN / JA / TH scan copy

## Rollback
Revert the Build 11 commit to restore the Build 10 placeholder Checkup screen.
