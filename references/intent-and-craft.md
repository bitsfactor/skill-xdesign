# Intent & Craft

Source: distilled from interface-design (craft-first) + hallmark (structure/genre).

## Intent (do this before code)
- **Who is the human?** The actual person, not "users". Where are they, what did they just do, what next?
- **What must they accomplish?** The single verb. It decides what leads/follows/hides.
- **What should it feel like?** In real words: warm like a notebook, cold like a terminal, dense like a trading floor, calm like a reading app. This shapes color, type, spacing, density.
- **Intent must be systemic.** State it, then check every token against it.

## Product-domain exploration (catches defaults early)
Before proposing a visual direction, produce:
1. **Domain** — ≥5 concepts/metaphors/vocabulary from this product's world.
2. **Color world** — ≥5 colors that *naturally* exist there.
3. **Signature** — one element that could only exist for THIS product.
4. **Defaults** — 3 obvious choices for this interface type (name them so you can avoid them).

Test: remove the product name — could someone still tell what it's for? If not, explore deeper.

## Hierarchy (the #1 driver of "designed" vs "generated")
- **One focal point per view.** Name it, then make it win (size, contrast, position, whitespace); demote everything else.
- **Type scale is a ratio.** ~1.2 dense · ~1.25 product · ~1.333 expressive. From 14–16px body. Round to whole px and to the spacing grid.
- **Weight and color beat size.** A single 14px size holds 3 tiers via weight+opacity: value 600/primary · label 500/secondary · meta 400/muted.
- If you squint and can't separate headline/body/label → hierarchy too weak.

## Density & rhythm
- **Density is a decision in px.** Pick (e.g. workbench 12–16px padding vs brochure 24px) and hold it everywhere.
- **Breathe unevenly.** Group related things tightly; put real air between groups. Monotone spacing = "no one decided".
- **Proportions speak.** A 280px sidebar says "nav serves content"; 360px says "peers". Choose widths that state a relationship.

## Color & depth
- **~60/30/10**: dominant neutral surface, secondary tone, ~10% accent. Color is scarce; most of the screen is structure.
- **One accent, intentional.** Gray builds structure; color communicates (status/action/identity).
- **Hierarchy via space and weight, not lines.** Prefer whitespace/tonal shift over borders/dividers.
- **Subtle layering.** Numbered surface stack; each step is a few % of lightness (or shadow in light mode). You should barely see it, but stacking reveals hierarchy.
  - Sidebars: same surface as canvas + subtle border (not a different color).
  - Inputs: slightly *darker* than surroundings (inset).
  - Dropdowns: one level above parent.
- **Optical sizing**: tighten tracking on large type; loosen body line-height (~1.5).

## Use what exists
Before building a control/style, check the project: reuse existing components/tokens. Extract a component on the **second** real reuse. Bind to **semantic tokens**, never hardcoded literals.
