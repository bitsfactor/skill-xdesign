# Taste — light, restrained, designed (anti-"AI look")

The difference between "competent" and "designed" is restraint. Default to light; a dark theme must be *earned* by the product (a night/sleep app, a cinema, a game).

## Hard anti-patterns (never)
- near-black background + neon/cyan glow ("AI dark") unless the product is a night product
- gradients on every surface; glow on everything; glassmorphism everywhere
- three identical rounded cards with three line icons as the only content
- >3 font families, or body text at 3 different sizes with no role
- pure `#000`/`#fff` as page bg/text (use warm off-white / near-black ink)
- accent used on more than ~10% of the screen

## Three light directions (pick one per project, hold it)
**Warm Paper** (default for food, lifestyle, consumer)
`bg #faf7f1 · surface #ffffff · ink #1c1a17 · muted #4a463f · accent clay #b06a3b · line rgba(28,26,23,.10)`
serif display (Noto Serif SC) / sans body / mono data. Borders over shadows; one inset "paper" card.

**Cool Editorial** (for SaaS, docs, B2B)
`bg #f7f8f9 · surface #ffffff · ink #14181d · muted #55606b · accent #2f6df6 · line rgba(20,24,29,.10)`
grotesk display / neutral sans / mono. Hairline rules, generous leading, lots of whitespace.

**Soft Consumer** (for apps, friendly products)
`bg #fdfaf7 · surface #ffffff · ink #232019 · muted #6b6459 · accent #e07a5f · line rgba(35,32,25,.08)`
rounded display / sans / mono; larger radii; warm shadows are OK but keep them soft and few.

## Rhythm & type (what reads as "designed")
- **One focal per view**; the headline is the largest element; everything else steps down.
- Type scale with real jumps (e.g. 12/14/16/20/28/40/52). Body ≤ 68ch. Leading 1.5–1.7 for CJK.
- Spacing only from the token scale; sections get generous vertical padding (64–96px); related items tight (8–16px).
- Use **hairline rules + whitespace** for separation before boxes; when you use boxes, keep one radius scale.
- Data is mono + tabular; labels are small caps/mono and muted.
- One accent, used for: the primary CTA, the one focal highlight, and nothing else.
- Illustrations are the visual interest; do **not** compensate with decoration (noise, blobs, patterns behind text).

## Quick taste check
Squint: is there one obvious focal per section? Is there enough quiet space? Does it look like a designed product page rather than a generated template? If the answer is "template", remove elements until it isn't.
