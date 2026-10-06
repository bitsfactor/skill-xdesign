# Study: extract DNA → design.md

Source: hallmark `study` verb. Borrow from an admired design *without copying pixels*.

## Trigger
The user pastes a URL or attaches a screenshot of a design they admire, or asks to "extract the DNA".

## Process
1. If a URL is given (WebFetch), read its HTML/CSS: name the **exact fonts** and **exact colors** it uses.
   If a screenshot only: infer type roles and palette visually.
2. Extract DNA: **macrostructure**, hero archetype, type pairing (roles), color anchor(s), motion stance.
3. Produce a short diagnosis: what gives it its character, and one anti-pattern it avoids.
4. Offer three follow-ups:
   - build with the DNA (handoff to Phase 3–4),
   - lock the DNA into a portable **`design.md`** (see `templates/design.md`),
   - stop at the diagnosis.

## Rules
- **Never copy pixels or assets.** Extract principles and tokens, not files.
- Refuse template-marketplace URLs. For `design.md` emission, require that the source is the user's own or a legitimate public reference for their own brand.
- If the URL is auth-walled / a JS-only shell, ask for a screenshot.

## Output shape
```
DNA — <source>
- Macrostructure: <name>        - Hero: <archetype>
- Type: display <face>, body <face>, mono <face (role)>
- Color anchor(s): <4-6 values with roles>
- Depth/motion: <strategy>
Why it works: <1-2 lines>
Avoid copying: <1 line>
```
