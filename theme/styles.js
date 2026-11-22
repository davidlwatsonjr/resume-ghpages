'use strict';

module.exports = `
:root {
  color-scheme: light;
  --canvas: #e9eeed;
  --paper: #fdfcf9;
  --ink: #192928;
  --muted: #4c605e;
  --accent: #126158;
  --line: #cbd7d3;
  font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
body { margin: 0; background: var(--canvas); color: var(--ink); }
h1, h2, h3, p, ul { margin: 0; }
a { color: var(--accent); text-underline-offset: .2em; overflow-wrap: anywhere; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }

.toolbar {
  max-width: 68rem;
  margin: 0 auto;
  padding: 1.4rem 0 .8rem;
  display: flex;
  justify-content: flex-end;
}
.toolbar button {
  min-height: 44px;
  padding: .5rem 1rem;
  border: 1px solid var(--accent);
  border-radius: .25rem;
  background: var(--paper);
  color: var(--accent);
  font: inherit;
  font-weight: 650;
  cursor: pointer;
}
.toolbar button:hover { background: var(--accent); color: white; }

.resume {
  max-width: 68rem;
  margin: 0 auto 3rem;
  padding: clamp(1.6rem, 6vw, 4.75rem);
  background: var(--paper);
  border-top: .4rem solid var(--accent);
  box-shadow: 0 12px 44px #13312a14;
}
.masthead { display: flow-root; padding-bottom: 2.15rem; }
.portrait {
  float: right;
  width: clamp(5rem, 15vw, 9rem);
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  margin: .2rem 0 .7rem 1.15rem;
  border: 1px solid var(--line);
  border-radius: .35rem;
}
h1 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.6rem, 8vw, 5.3rem);
  font-weight: 400;
  letter-spacing: -.055em;
  line-height: 1.02;
}
.role { margin-top: .6rem; color: var(--accent); font-size: clamp(1.1rem, 3vw, 1.45rem); font-weight: 650; }
.contact {
  display: flex;
  flex-wrap: wrap;
  gap: .22rem 1.15rem;
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  color: var(--muted);
  font-size: .88rem;
}

.section {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  gap: 1rem;
  padding: 1.55rem 0;
  border-top: 1px solid var(--line);
}
.section:last-child { padding-bottom: 0; }
h2 {
  color: var(--accent);
  font-size: .78rem;
  font-weight: 750;
  letter-spacing: .11em;
  text-transform: uppercase;
  padding-top: .25rem;
}
h3 { font-size: 1.05rem; line-height: 1.35; }
.entry + .entry { margin-top: 1.4rem; padding-top: 1.2rem; border-top: 1px solid var(--line); }
.entry-head { display: flex; justify-content: space-between; gap: .6rem 1rem; }
.byline { color: var(--muted); font-size: .92rem; }
.date { color: var(--muted); font-size: .83rem; white-space: nowrap; font-variant-numeric: tabular-nums; }
.entry > p, .entry ul { margin-top: .4rem; }
.entry ul { padding-left: 1.15rem; }
.entry li + li, .section-content > p + p { margin-top: .3rem; }
.compact-row + .compact-row { margin-top: .65rem; }
.compact-row p { color: var(--muted); font-size: .93rem; }

@media screen and (max-width: 72rem) {
  .toolbar { padding-inline: 1rem; }
}
@media screen and (max-width: 42rem) {
  .section { display: block; }
  h2 { margin-bottom: .7rem; }
  .entry-head { flex-wrap: wrap; gap: .2rem .8rem; }
}

@page { size: letter; margin: .54in .6in; }
@media print {
  :root { font: 10pt/1.32 Arial, sans-serif; }
  body, .resume { background: white; color: black; }
  .toolbar, .portrait { display: none; }
  .resume { max-width: none; padding: 0; margin: 0; border: 0; box-shadow: none; }
  .masthead { padding-bottom: 9pt; break-inside: avoid; }
  h1 { font-size: 28pt; letter-spacing: -.02em; }
  .role { margin-top: 3pt; font-size: 13pt; }
  .contact { margin-top: 4pt; gap: 1pt 9pt; font-size: 9pt; }
  .section { display: block; padding: 7pt 0; border-top: 1px solid #999; }
  h2 { font-size: 10pt; padding: 0; margin-bottom: 4pt; break-after: avoid; }
  h3 { font-size: 10pt; }
  .entry-head { display: block; break-inside: avoid; break-after: avoid; }
  .entry + .entry { margin-top: 5pt; padding-top: 0; border: 0; }
  .byline, .date, .compact-row p { font-size: 9pt; }
  .entry > p, .entry ul { margin-top: 2pt; }
  .entry li + li, .section-content > p + p { margin-top: 1pt; }
  .entry li, .compact-row { break-inside: avoid; }
  .compact-row + .compact-row { margin-top: 3pt; }
  p, li { orphans: 2; widows: 2; }
  h2, .role, .contact, .byline, .date, .compact-row p, a { color: black; }
}
`;
