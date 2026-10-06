# System Memory (`system.md`) & Consistency

Source: interface-design `.interface-design/system.md` (persisted design-system memory).
In xdesign, the system file is **`xdesign/system.md`** (or `.interface-design/system.md` if the project already uses that).

## Purpose
A project's design decisions must survive across sessions. `system.md` is the single source of truth:
direction, tokens (spacing base/scale, colors, radius, type), component patterns, and a decisions log.
**Future work reads it and holds to it** — it is not optional and not re-litigated.

## Read (Phase 0/2)
1. Inspect the app, existing tokens, component patterns, and `system.md` if present.
2. If present: apply it — decisions are made. Do not diverge without explicit user change.
3. If absent: after choosing a direction, create it from `templates/system.md`.

## Drift & consistency checks
When `system.md` defines values, verify output against it:
- spacing on the declared grid,
- the declared depth strategy used throughout,
- colors from the palette (no new raw colors),
- documented component patterns reused, not reinvented.
Report drift and fix it before finishing.

## Write (Phase 6)
Always offer to save: "Want me to save these patterns for future sessions?"
If yes, update `system.md` with:
- direction (personality / foundation / depth strategy) and spacing base,
- any new tokens,
- key component patterns (record concrete values, e.g. `Button primary — 36px h · 12px 16px pad · 6px radius · 14px/500`) — only when reused 2+ times or reusable,
- a decisions row: what changed, why, date.

## Portable export
Optionally emit `design.md` (DTCG-flavored, human-readable) so the system can move to other tools/agents. See `templates/design.md`.
