# Design System

## Direction
**Personality:** [Editorial | Modern Minimal | Developer | Atmospheric | Playful | Brutal | Newsprint | Terminal | Bloom | Cobalt | Pixel | custom]
**Foundation:** [warm | cool | neutral | tinted]
**Depth:** [borders-only | subtle-shadows | layered-shadows]
**Signature element:** [the one thing this product is remembered by]

## Tokens
### Spacing
Base: [4px | 8px]
Scale: [4, 8, 12, 16, 24, 32, 48, 64, 96]

### Color (semantic → primitive)
```
--bg:        [paper-1]
--surface:   [paper-2]
--text:      [ink-1]
--text-muted:[ink-3]
--border:    [line-1]
--accent:    [accent-1]
--accent-fg: [on-accent]
--focus:     [focus-1]
--success / --warning / --danger: [...]
```
Primitives: `--paper-1..3`, `--ink-1..3`, `--line-1..2`, `--accent-1..2`, ...

### Radius
Scale: [4, 6, 8] (sharp) | [8, 12, 16] (soft) | [0] (pixel)

### Typography
- `--font-display` / `--font-body` / `--font-mono`
- Scale: [11, 12, 14(base), 16, 18, 22, 28, 44]
- Weights: 400 / 500 / 600 / 700
- Leading: tight [1.1] / base [1.5] / loose [1.7]

### Motion
`--ease-out`, `--ease-in-out`, `--dur-fast [160ms]`, `--dur [240ms]`, `--dur-slow [600ms]`

## Patterns
### Button primary
- Height: 36px · Padding: 12px 16px · Radius: 6px · Font: 14px/500 · Uses: `--accent` / `--accent-fg`
### Card default
- Border: 1px solid `--border` · Padding: 16px · Radius: 8px · Background: `--surface`

## Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Borders-only depth | dashboard tool; users want density | YYYY-MM-DD |
| 4px spacing base | tight enough for tables, divisible by common UI sizes | YYYY-MM-DD |
