# Verify — no visual bugs (the FIRST principle)

**A build is not done until the geometry audit returns 0 bugs.** "No raw values" only covers color/spacing *sources*; it does NOT guarantee text fits, nodes don't overlap, or things align. You must **measure the rendered geometry** and fix every bug before declaring done.

## What counts as a visual bug (must be zero)
- **Text not fitting its node** — a `<text>` whose bbox exceeds its container rect/pill (left/right/top/bottom), or is not roughly centered in it.
- **Overlap** — two nodes overlapping, or text colliding with another node/text.
- **Off-grid** — node `x/y/width/height` not on the 4px grid.
- **Ragged tiers** — same-tier nodes of different size, or uneven gaps (pitch not constant).
- **Too-small text** — any hero `<text>` rendering below 13px.
- **Page overflow** — horizontal scroll at 320/375/768/1280.
- **Invisible content** — any element holding text (or with height > 20) whose computed `opacity:0` / `visibility:hidden` / `display:none` at rest. (This is the classic "blank page" bug from scroll-reveal animations.)
- **Connector ports** — a line not starting/ending on the node edge it connects to.

## Audit snippet — run it in the browser (Playwright MCP `evaluate`) and fix until `bugs: []`

```js
() => {
  const svgs=[...document.querySelectorAll('svg')];let hero=null,best=-1;
  for(const s of svgs){const r=s.getBoundingClientRect();if(r.width*r.height>best){best=r.width*r.height;hero=s;}}
  const bugs=[];if(!hero)return{bugs:['no svg']};
  const B=el=>{const b=el.getBBox();return{x:b.x,y:b.y,w:b.width,h:b.height};};
  const rects=[...hero.querySelectorAll('rect')].map((r,i)=>({i,...B(r),cls:r.getAttribute('class')||''}));
  const texts=[...hero.querySelectorAll('text')].map(t=>({s:(t.textContent||'').trim().slice(0,20),...B(t)}));
  rects.forEach(r=>{if([r.x,r.y,r.w,r.h].some(v=>Math.abs(v/4-Math.round(v/4))>0.01))bugs.push(`rect#${r.i} off-grid ${r.x},${r.y},${r.w},${r.h}`);});
  rects.forEach(r=>texts.forEach(t=>{const cx=t.x+t.w/2,cy=t.y+t.h/2;
    if(cx>r.x&&cx<r.x+r.w&&cy>r.y&&cy<r.y+r.h){
      if(t.x<r.x+4||t.x+t.w>r.x+r.w-4)bugs.push(`text "${t.s}" overflows rect#${r.i} horizontally`);
      if(t.y<r.y+4||t.y+t.h>r.y+r.h-4)bugs.push(`text "${t.s}" overflows rect#${r.i} vertically`);
    }}));
  for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];
    const ox=Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x),oy=Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y);
    if(ox>2&&oy>2)bugs.push(`rect#${i} overlaps rect#${j}`);}
  const sc=hero.getBoundingClientRect().width/hero.viewBox.baseVal.width;
  hero.querySelectorAll('text').forEach(t=>{const px=parseFloat(getComputedStyle(t).fontSize)*sc;if(px<12.9)bugs.push(`text "${(t.textContent||'').trim().slice(0,16)}" ${px.toFixed(1)}px < 13`);});
  if(document.documentElement.scrollWidth>document.documentElement.clientWidth+1)bugs.push('page horizontal overflow');
  document.querySelectorAll('body *').forEach(el=>{const cs=getComputedStyle(el);const r=el.getBoundingClientRect();
    if((cs.opacity==='0'||cs.visibility==='hidden')&&(el.textContent||'').trim().length>0&&r.height>20)bugs.push('invisible content: '+(el.className||el.tagName));});
  return {viewBox:hero.getAttribute('viewBox'),bugs};
}
```
Also run it at 320/375/768/1280 widths.

## Fixes (in order of preference)
1. **Text overflows node** → enlarge the node, OR shorten the label, OR split into two lines. Never shrink below 13px.
2. **Text above/below node** → set `dominant-baseline:middle` (or `vertical-align`) and center on `rect.y + rect.h/2`; check the two-line stack fits (`line-height` × lines ≤ `h - 2·padding`).
3. **Overlap** → re-layout on the grid (increase pitch / move the column), don't nudge by 1–2px.
4. **Off-grid** → snap every `x/y/w/h` to multiples of 4.
5. **Ragged tier** → give all nodes in a tier the SAME `w/h` and a constant gap.
6. **Page overflow** → `width:100%`/`max-width`/`min-width:0` on the flex/grid item; allow the figure to scroll locally if truly necessary.

## Loop
Audit → fix → audit again. **Repeat until `bugs` is empty at all four widths.** Only then is the build done.
