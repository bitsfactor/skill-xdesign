# Token Architecture & the "No Raw Values" Rule

Source: interface-design token architecture + hallmark gate 48 (mid-render token improvisation).

## The hard rule
> After tokens are defined, **every** `color`, `font-family`, `font-size`, spacing, radius, shadow and duration in the artifact MUST reference a named token.
> If a needed value has no token, **lift it into the token block as a named variable first**, then reference it.
> Inline hex / rgb() / oklch() / raw px that bypass the token block are a **gate failure** (checked by `scripts/dscheck.mjs`).

## Layers
1. **Primitive** — raw scale values, named for the world (not `--gray-700`): e.g. `--paper-1`, `--ink-1`, `--accent-1`.
2. **Semantic** — roles: `--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--accent`, `--success`, `--danger`, `--focus`.
3. **Component** — optional dedicated tokens for controls (`--input-bg`, `--input-border`, `--btn-primary-bg`, `--btn-primary-fg`) so they can be tuned independently.

Rule: semantics reference primitives; components reference semantics. No component → raw.

## Scales
- **Spacing**: pick base 4 or 8px; use left-side tokens only — `--space-3xs..4xl` (e.g. 2,4,8,12,16,24,32,48,64,96). Never an arbitrary px.
- **Type**: choose a ratio; define `--text-xs..display`. Round to whole px and to the grid. Also `--font-display/body/mono`, `--leading-*`, `--tracking-*`.
- **Radius**: a small set (`--radius-sm/md/lg/pill`), reused — not per-component one-offs.
- **Elevation**: numbered steps (`--shadow-1/2/3`) or layered ring+soft shadows in light mode; single ring in dark.
- **Motion**: `--ease-*`, `--dur-fast/base/slow`.

## Naming
Token names should evoke the product's world, not a generic template. Someone reading only the tokens should guess what the product is.

## Enforcement
`scripts/dscheck.mjs` flags:
- raw colors outside `:root`,
- raw lengths in layout properties that have a token equivalent,
- off-grid spacing,
- `!important`,
- font-family count > 3 or banned fonts.
Fix all findings before declaring done.
