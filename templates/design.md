---
name: [Project] Design System
version: 0.1
updated: YYYY-MM-DD
---

# [Project] — Design Language

Portable, human-readable, DTCG-flavored system doc. Consumable by multiple agents/tools.
Mirror of `system.md`, but format-stable (for handoff, not just memory).

## Direction
personality: [Editorial]
foundation: [warm]
depth: [borders-only]
signature: [one-line description]

## Color
| token | value | role |
|---|---|---|
| color.bg | #f6f1e7 | page background |
| color.surface | #efe8da | cards / panels |
| color.text | #1f1e1a | primary text |
| color.text.muted | #6b6659 | secondary text |
| color.border | #d8ceb9 | hairlines |
| color.accent | #2e4a3b | action / identity |
| color.on-accent | #f6f1e7 | text on accent |
| color.focus | #2e4a3b | focus ring |

## Spacing
base: 4px
scale: [2,4,8,12,16,24,32,48,64,96]

## Radius
scale: [4,8,16,999]

## Typography
- display: Fraunces 600/700
- body: Public Sans 400/500/600
- mono: JetBrains Mono 400/500
- scale: [12,13,14,16,18,22,28,36]

## Motion
easing: { out: cubic-bezier(.22,1,.36,1), in-out: cubic-bezier(.65,0,.35,1) }
duration: { fast: 160ms, base: 240ms, slow: 600ms }

## Components
### Button.primary
height: 36px
padding: 12px 16px
radius: 6px
font: 14px / 500
bg: color.accent ; fg: color.on-accent

## Decisions
- [why border-only depth] — [date]
