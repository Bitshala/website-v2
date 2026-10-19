// Builds the local preview page, runs layout checks, takes screenshots and renders the multi-page PDF.
// usage: node build.js <ds-project-dir> <out-dir>
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PROJ = path.resolve(process.argv[2]);
const OUT = path.resolve(process.argv[3]);
fs.mkdirSync(OUT, { recursive: true });
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const tokens = JSON.parse(fs.readFileSync(path.join(PROJ, 'tokens.json'), 'utf8'));
const col = Object.fromEntries(tokens.color.tokens.map(t => [t.name, t.value]));

/* ---------- tokens.css, the same shape the design system page generates ---------- */
function tokensCss() {
  let css = '';
  for (const f of tokens.type.fonts) {
    css += `@font-face{font-family:"${f.family}";src:url("file://${path.join(PROJ, f.file)}");font-weight:${f.weight};font-style:${f.style || 'normal'};font-display:block}\n`;
  }
  css += ':root{' + tokens.color.tokens.map(t => `--${t.name}:${t.value}`).join(';');
  css += ';' + tokens.spacing.tokens.map(t => `--${t.name}:${t.value}`).join(';');
  css += ';' + tokens.radius.tokens.map(t => `--${t.name}:${t.value}`).join(';');
  css += ';' + Object.entries(tokens.type.families).map(([k, v]) => `--font-${k}:${v}`).join(';') + '}\n';
  return css;
}
const TOKENS_CSS = tokensCss();
const BUNDLE_CSS = fs.readFileSync(path.join(PROJ, 'components/bundle.css'), 'utf8');
const BUNDLE_JS = fs.readFileSync(path.join(PROJ, 'components/bundle.js'), 'utf8');

/* ---------- contrast ---------- */
function lum(hex) {
  const n = hex.replace('#', '');
  const c = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/* ---------- shared page chrome for the PDF ---------- */
const PAGE_CSS = `
  html,body{margin:0;background:var(--plum-950);color:var(--ink);font-family:var(--font-sans);-webkit-font-smoothing:antialiased}
  *{box-sizing:border-box}
  .sheet{width:1600px;background:var(--plum-950)}
  .strip{height:28px;background:var(--black)}
  .pad{padding:56px 72px 72px}
  .eyebrow{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:40px;font-weight:500;font-size:18px;color:var(--ink-muted-plum)}
  .eyebrow b{font-weight:600;color:var(--ink)}
  .h1{margin:0 0 28px;font-family:var(--font-display);font-weight:500;font-synthesis:none;font-size:96px;line-height:1.1}
  .h1 mark{display:inline-block;background:var(--highlight);color:var(--on-chip);padding:0 .08em .3em;line-height:1;vertical-align:top}
  .ghead{margin:0 0 16px;font-size:15px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted-plum)}
  .lede{margin:0 0 48px;max-width:70ch;font-size:20px;line-height:1.5;color:var(--ink-muted-plum)}
  .h3{margin:0 0 18px;font-family:var(--font-display);font-weight:500;font-synthesis:none;font-size:40px;line-height:1}
  .note{font-size:15px;line-height:1.5;color:var(--ink-muted-plum)}
  .note b{color:var(--ink);font-weight:600}
  table{border-collapse:collapse;width:100%;font-size:16px}
  th,td{text-align:left;padding:12px 14px;border-bottom:1px solid #4a2a42;vertical-align:top}
  th{font-weight:600;color:var(--ink-muted-plum);font-size:14px;letter-spacing:.06em;text-transform:uppercase}
  td{line-height:1.45}
  .tnum{font-variant-numeric:tabular-nums}
`;

function doc(body, extraCss = '') {
  return `<!doctype html><html><head><meta charset="utf-8"><title>BOSS Winter 2026</title>
<style>${TOKENS_CSS}${BUNDLE_CSS}${PAGE_CSS}${extraCss}</style>
<script>${BUNDLE_JS}</script></head><body>${body}</body></html>`;
}
function sheet(n, title, inner) {
  return `<div class="sheet"><div class="strip"></div><div class="pad">
  <div class="eyebrow"><span><b>BOSS Winter 2026</b> · Schedule design</span><span class="tnum">${String(n).padStart(2, '0')} / 06 · ${title}</span></div>
  ${inner}</div></div>`;
}

/* ---------- 1 · Cover ---------- */
const cover = sheet(1, 'Cover', `
  <div id="nav"></div>
  <div style="margin-top:150px">
    <h1 class="h1" style="font-size:220px;line-height:.92">Winter 2026 <mark>Agenda</mark></h1>
    <p style="margin:28px 0 0;font-size:26px;font-weight:500">BOSS Summit · Bitshala · Jaipur · 26–31 October 2026</p>
  </div>
  <div id="pills" style="margin-top:40px"></div>
  <div class="stats">
    <div><span>6</span>Days</div><div><span>18</span>Talks</div><div><span>6</span>Workshops</div><div><span>2</span>Open stages</div>
  </div>
  <p class="note" style="margin:56px 0 0;max-width:80ch">The Winter 2026 agenda in the layout of the Summer 2026 agenda on bitshala.org/boss: colour, type, components, the full desktop agenda and the 390px mobile agenda. Programme from the BOSS PM Sheet, “BOSS Schedule” tab.</p>
  <script>
    document.getElementById('nav').innerHTML = BOSS.html.nav();
    document.getElementById('pills').innerHTML = BOSS.html.seasonPills(['Winter 2026','Summer 2026'], 'Winter 2026');
  </script>`);
const coverCss = `
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:96px}
  .stats div{border:2px solid var(--frame);border-radius:var(--radius-lg);padding:24px 28px 26px;font-size:22px;font-weight:500}
  .stats span{display:block;margin-bottom:10px;font-family:var(--font-display);font-weight:500;font-synthesis:none;font-size:120px;line-height:.9;color:var(--highlight)}
`;

/* ---------- 2 · Colour ---------- */
const groups = [
  ['Surfaces', ['plum-950', 'plum-900', 'black']],
  ['Outlines and chips', ['frame', 'chip', 'on-chip']],
  ['Text', ['ink', 'ink-muted', 'ink-muted-olive', 'ink-muted-plum']],
  ['Session cards', ['olive', 'olive-line', 'slate', 'slate-line', 'plum-800', 'plum-500']],
  ['Accents: headings and nav only, never inside the agenda', ['highlight', 'lime', 'coral', 'butter', 'mint']],
];
const label = {
  'plum-950': 'Page', 'plum-900': 'Header bar', black: 'Top strip', ink: 'Text', 'ink-muted': 'Muted on slate',
  'ink-muted-olive': 'Muted on olive', 'ink-muted-plum': 'Muted on plum', frame: 'Outline', chip: 'Time chip',
  'on-chip': 'Chip text', olive: 'Workshop fill', 'olive-line': 'Workshop border', slate: 'Talk fill',
  'slate-line': 'Talk border', 'plum-800': 'Open Stage fill', 'plum-500': 'Open Stage border',
  highlight: 'Highlight yellow', lime: 'Lime', coral: 'Register coral', butter: 'Schedule yellow', mint: 'Gallery green',
};
const usage = Object.fromEntries(tokens.color.tokens.map(t => [t.name, t.usage]));
const pairs = [
  ['Text on page', 'ink', 'plum-950'], ['Text on header bar', 'ink', 'plum-900'],
  ['Title on talk card', 'ink', 'slate'], ['Title on workshop card', 'ink', 'olive'], ['Title on Open Stage card', 'ink', 'plum-800'],
  ['Duration on talk card', 'ink-muted', 'slate'], ['Duration on workshop card', 'ink-muted-olive', 'olive'],
  ['Duration on Open Stage card', 'ink-muted-plum', 'plum-800'], ['Chip text on chip', 'on-chip', 'chip'],
  ['Heading on highlight', 'on-chip', 'highlight'], ['Muted note on page', 'ink-muted-plum', 'plum-950'],
];
const colour = sheet(2, 'Colour', `
  <h2 class="h1">Colour</h2>
  <p class="lede">One dark theme taken from bitshala.org/boss. The card fill is the only signal of session type. Every outline is a flat 2px steel blue, with no glow, gradient or shadow.</p>
  <div class="cgrid">
    ${groups.map(([g, names]) => `<section class="cgroup"><h3 class="ghead">${g}</h3><div class="sw">${names.map(n => `
      <div class="swatch"><div class="chipc" style="background:${col[n]}"></div>
      <div class="meta"><b>${label[n]}</b><span class="hex tnum">${col[n].toUpperCase()}</span><span class="tok">${n}</span><p>${usage[n]}</p></div></div>`).join('')}
    </div></section>`).join('')}
  </div>
  <section style="margin-top:40px"><h3 class="ghead">Contrast (WCAG 2.x, all text pairs at 4.5:1 or better)</h3>
  <table class="ct"><thead><tr><th>Pair</th><th>Sample</th><th>Colours</th><th>Ratio</th></tr></thead><tbody>
  ${pairs.map(([n, f, b]) => { const r = ratio(col[f], col[b]); return `<tr><td>${n}</td><td><span class="samp" style="background:${col[b]};color:${col[f]}">10:00 Aa</span></td><td class="tnum">${col[f]} on ${col[b]}</td><td class="tnum"><b>${r.toFixed(1)}:1</b> ${r >= 4.5 ? 'Pass' : 'FAIL'}</td></tr>`; }).join('')}
  </tbody></table></section>`);
const colourCss = `
  .cgrid{display:grid;grid-template-columns:1fr 1fr;gap:36px 48px}
  .cgroup:nth-child(n+3){grid-column:1/-1}
  .cgroup:nth-child(-n+2) .sw{grid-template-columns:repeat(3,1fr)}
  .cgroup:nth-child(3) .sw{grid-template-columns:repeat(4,1fr)}
  .sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}
  .cgroup:nth-child(4) .sw{grid-template-columns:repeat(6,1fr)}
  .cgroup:nth-child(5) .sw{grid-template-columns:repeat(5,1fr)}
  .swatch{border:2px solid #4a2a42;border-radius:var(--radius-sm);overflow:hidden}
  .chipc{height:84px;border-bottom:2px solid #4a2a42}
  .meta{padding:12px 14px 14px;display:flex;flex-direction:column;gap:3px}
  .meta b{font-size:16px}
  .hex{font-weight:500;font-size:15px}
  .tok{font-size:13px;color:var(--ink-muted-plum)}
  .meta p{margin:6px 0 0;font-size:13px;line-height:1.45;color:var(--ink-muted-plum)}
  .samp{display:inline-block;padding:4px 10px;border-radius:4px;font-weight:600}
  .ct td:last-child{white-space:nowrap}
`;

/* ---------- 3 · Type & scale ---------- */
const typeRows = [];
for (const g of tokens.type.groups) for (const s of g.styles) typeRows.push({ g: g.name, fam: g.family, ...s });
const typePage = sheet(3, 'Type & scale', `
  <h2 class="h1">Type &amp; <mark>scale</mark></h2>
  <p class="lede">DX Slight, the tall condensed face of the BOSS site, sets headings, nav and season pills. Inter sets everything inside the agenda.</p>
  <div class="tgrid">
    <section class="spec">
      <div class="ghead">DX Slight · Tall · display</div>
      <div class="dx" style="font-size:118px;line-height:1.05;white-space:nowrap;margin-top:8px">Aa Winter 2026</div>
      <div class="dx" style="font-size:40px;margin-top:18px;line-height:1.05">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz 0123456789</div>
      <div class="weights">
        <div><span class="dx" style="font-weight:400">Agenda</span>Tall · 400</div>
        <div><span class="dx" style="font-weight:500">Agenda</span>Medium Tall · 500 · used on the site</div>
        <div><span class="dx" style="font-weight:700">Agenda</span>Bold Tall · 700</div>
      </div>
    </section>
    <section class="spec">
      <div class="ghead">Inter · agenda text</div>
      <div style="font-size:150px;line-height:.9;font-weight:700;letter-spacing:-.02em">Aa 10:30</div>
      <div style="font-size:26px;margin-top:22px;line-height:1.35;font-weight:500">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br><span class="tnum">0123456789</span> <i style="font-weight:400">by</i> <i style="font-weight:600">codingp110</i></div>
      <div class="note" style="margin-top:18px">Regular, Italic, Medium, SemiBold, SemiBold Italic and Bold are shipped. Tabular figures on time chips only.</div>
    </section>
  </div>
  <table class="ts" style="margin-top:44px"><thead><tr><th>Style</th><th>Face</th><th>Size / line</th><th>Sample</th><th>Use</th></tr></thead><tbody>
  ${typeRows.map(r => {
    const fam = r.fam === 'display' ? 'var(--font-display)' : 'var(--font-sans)';
    const size = Math.min(parseFloat(r.fontSize), r.fam === 'display' ? 72 : 30);
    const st = `font-family:${fam};font-size:${size}px;font-weight:${r.fontWeight};font-style:${r.fontStyle || 'normal'};line-height:1.15;${r.name === 'chip' ? 'font-variant-numeric:tabular-nums;' : ''}${r.fam === 'display' ? 'font-synthesis:none;' : ''}`;
    const sample = r.name === 'byline' ? '<span style="font-weight:400">by</span> Luiz Medina' : r.sample;
    return `<tr><td><b>${r.name}</b></td><td>${r.fam === 'display' ? 'DX Slight' : 'Inter'} ${r.fontWeight}${r.fontStyle ? ' italic' : ''}</td><td class="tnum">${r.fontSize} / ${r.lineHeight}</td><td><div style="${st}">${r.name === 'chip' ? `<span class="boss-chip" style="font-size:20px;min-width:76px;margin:0">${sample}</span>` : sample}</div>${size < parseFloat(r.fontSize) ? `<div class="note">shown at ${size}px</div>` : ''}</td><td class="note">${r.usage}</td></tr>`;
  }).join('')}
  </tbody></table>
  <div class="scales">
    <section><div class="ghead">Spacing</div>
      ${tokens.spacing.tokens.map(t => `<div class="srow"><span class="tnum"><b>${t.value}</b> ${t.name}</span><i style="width:${parseFloat(t.value) * 3}px"></i><em>${t.usage}</em></div>`).join('')}
    </section>
    <section><div class="ghead">Radius · all outlines 2px</div>
      <div class="radii">${tokens.radius.tokens.map(t => `<div><i style="border-radius:${t.value}"></i><b class="tnum">${t.value}</b><span>${t.name}</span><em>${t.usage}</em></div>`).join('')}</div>
    </section>
  </div>`);
const typeCss = `
  .dx{font-family:var(--font-display);font-weight:500;font-synthesis:none}
  .tgrid{display:grid;grid-template-columns:1fr 1fr;gap:48px}
  .spec{border:2px solid var(--frame);border-radius:var(--radius-lg);padding:28px 32px 32px}
  .weights{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px;font-size:14px;color:var(--ink-muted-plum)}
  .weights span{display:block;font-size:56px;line-height:1;color:var(--ink);margin-bottom:6px}
  .ts td{vertical-align:middle}
  .ts td:nth-child(5){width:430px}
  .scales{display:grid;grid-template-columns:1.2fr 1fr;gap:48px;margin-top:48px}
  .srow{display:grid;grid-template-columns:150px 280px 1fr;align-items:center;gap:16px;padding:7px 0;font-size:15px}
  .srow i{display:block;height:16px;background:var(--frame);border-radius:2px}
  .srow em{font-style:normal;font-size:13px;color:var(--ink-muted-plum)}
  .radii{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .radii div{display:flex;flex-direction:column;gap:4px;font-size:15px}
  .radii i{display:block;height:110px;border:2px solid var(--frame);margin-bottom:8px}
  .radii span{font-size:13px;color:var(--ink-muted-plum)}
  .radii em{font-style:normal;font-size:13px;color:var(--ink-muted-plum)}
`;

/* ---------- 4 · Components ---------- */
const comps = sheet(4, 'Components', `
  <h2 class="h1">Components</h2>
  <p class="lede">Six pieces build every day of the agenda. They size themselves by their container, so the same markup works on desktop and phone.</p>
  <div class="boss cmp">
    <div class="ann"><div class="h3">Day header</div><p class="note">Full width. <b>plum-900</b> fill, flat 2px <b>frame</b> outline, 12px radius. Inter Bold 24px on the left, Medium 21px hours on the right. A day with no sessions is just this bar.</p></div>
    <div id="c-head"></div>

    <div class="ann"><div class="h3">Session cards</div><p class="note">8px radius, 2px border. Colour is the only type signal: <b>Workshop</b> olive with a yellow border, <b>Talk</b> slate, <b>Open Stage</b> plum. White time chip (12-hour, no AM/PM), bold title, the text after a colon on a smaller line, italic byline, duration bottom right. Open Stage has no “by” line.</p></div>
    <div class="row3" id="c-cards"></div>

    <div class="ann"><div class="h3">Opened card</div><p class="note">A card with an abstract shows a small <b>+</b> next to its duration. Tapping the card opens a 1–3 sentence abstract, and the + turns into −.</p></div>
    <div id="c-open" style="max-width:760px"></div>

    <div class="ann"><div class="h3">Session block &amp; lunch strip</div><p class="note">Block: 2px <b>frame</b> outline, 16px radius, “Session 03” and its range in Medium 21px, cards 12px apart. Numbering runs across the summit. Lunch: an 88px column with a vertical chip, LUNCH and 90m. At 860px and below it lies flat between the blocks.</p></div>
    <div class="blk">
      <div id="c-block"></div>
      <div id="c-lunch" style="display:grid"></div>
      <div>
        <div class="ghead" style="margin-top:4px">Horizontal, ≤ 860px</div>
        <div class="boss" id="c-lunch-h" style="width:390px"></div>
        <p class="note" style="margin-top:22px;max-width:46ch">The narrow bar keeps the same order: the time chip, then LUNCH, then the duration at the right.</p>
      </div>
    </div>
  </div>
  <script>
    var B = BOSS, d = B.schedule, days = d.days, c = B.html.sessionCard;
    document.getElementById('c-head').innerHTML = B.html.dayHeader(d, days[1], 1);
    document.getElementById('c-cards').innerHTML = c(days[3].sessions[1]) + c(days[1].sessions[1]) + c(days[2].sessions[8]);
    document.getElementById('c-open').innerHTML = c(days[2].sessions[1], { open: true });
    document.getElementById('c-block').innerHTML = B.html.sessionBlock(3, days[2].sessions.slice(0, 5));
    document.getElementById('c-lunch').innerHTML = B.html.lunchStrip(d.lunch);
    document.getElementById('c-lunch-h').innerHTML = B.html.lunchStrip(d.lunch);
  </script>`);
const compCss = `
  .cmp{background:transparent;display:grid;gap:18px}
  .ann{display:grid;grid-template-columns:380px 1fr;gap:32px;align-items:baseline;margin-top:30px}
  .ann .h3{margin:0}
  .ann .note{margin:0;max-width:95ch}
  .row3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;align-items:start}
  .blk{display:grid;grid-template-columns:minmax(0,700px) 88px minmax(0,1fr);gap:22px;align-items:stretch}
`;

/* ---------- 5 · Desktop agenda ---------- */
const desktop = sheet(5, 'Desktop agenda', `
  <div id="nav5" style="margin-bottom:40px"></div>
  <div id="agenda" style="margin:0 -32px"></div>
  <script>
    document.getElementById('nav5').innerHTML = BOSS.html.nav();
    BOSS.renderSchedule(document.getElementById('agenda'));
  </script>`);
const desktopCss = `#agenda .boss-schedule{padding-top:0;padding-bottom:0}`;

/* ---------- 6 · Mobile ---------- */
const mobile = sheet(6, 'Mobile', `
  <h2 class="h1">Mobile <mark>390px</mark></h2>
  <p class="lede">The same components in a 390px container. Blocks stack, lunch lies flat between them, and the day header puts date, theme and hours on separate lines. Nothing scrolls sideways.</p>
  <div class="phones">
    <figure><div class="phone"><div class="scr"><div class="boss" id="m1"></div></div></div><figcaption>Days 01–02</figcaption></figure>
    <figure><div class="phone"><div class="scr"><div class="boss" id="m2"></div></div></div><figcaption>Day 03</figcaption></figure>
    <figure><div class="phone"><div class="scr"><div class="boss" id="m3"></div></div></div><figcaption>Days 04–06</figcaption></figure>
  </div>
  <h3 class="h3" style="margin-top:56px">Breakpoints</h3>
  <p class="note" style="margin:-6px 0 18px">Container widths, read with <b>@container boss</b>, not the window.</p>
  <table class="bp"><thead><tr><th>Container</th><th>Layout</th><th>Card title</th><th>Time chip</th><th>Gutter</th><th>Lunch</th><th>Day header</th></tr></thead><tbody>
    <tr><td class="tnum"><b>≥ 1181px</b></td><td>Block · lunch · block, 22px gaps</td><td class="tnum">25px</td><td class="tnum">20px</td><td class="tnum">32px</td><td>Vertical, 88px column</td><td>One line, hours right</td></tr>
    <tr><td class="tnum"><b>861–1180px</b></td><td>Same three columns</td><td class="tnum">21px</td><td class="tnum">17px</td><td class="tnum">32px</td><td>Vertical, 88px column</td><td>One line, 20px</td></tr>
    <tr><td class="tnum"><b>≤ 860px</b></td><td>Blocks stack</td><td class="tnum">18px</td><td class="tnum">14px</td><td class="tnum">16px</td><td>Flat bar: chip · LUNCH · 90m</td><td>Date / theme / hours on 3 lines</td></tr>
  </tbody></table>
  <script>
    var R = BOSS.renderSchedule;
    R(document.getElementById('m1'), { only: ['2026-10-26', '2026-10-27'] });
    R(document.getElementById('m2'), { only: ['2026-10-28'] });
    R(document.getElementById('m3'), { only: ['2026-10-29', '2026-10-30', '2026-10-31'] });
    var m1 = document.querySelector('#m1 .boss-schedule');
    m1.insertAdjacentHTML('afterbegin', '<div class="boss-top">' + BOSS.html.heading(BOSS.schedule) + '<p class="boss-top__meta">Jaipur · 26–31 October 2026</p></div>');
  </script>`);
const mobileCss = `
  .phones{display:grid;grid-template-columns:repeat(3,414px);justify-content:space-between;align-items:start}
  figure{margin:0}
  .phone{width:414px;padding:12px;border-radius:52px;background:var(--black);border:2px solid #3b3b40}
  .scr{width:390px;border-radius:40px;overflow:hidden;background:var(--plum-950);padding-top:34px;position:relative}
  .scr::before{content:"";position:absolute;top:10px;left:50%;width:110px;height:28px;margin-left:-55px;border-radius:14px;background:var(--black)}
  figcaption{margin-top:14px;text-align:center;font-weight:600;font-size:17px}
  .bp td,.bp th{padding:12px 16px}
`;

const sections = [
  ['01-cover', cover, coverCss], ['02-colour', colour, colourCss], ['03-type', typePage, typeCss],
  ['04-components', comps, compCss], ['05-desktop', desktop, desktopCss], ['06-mobile', mobile, mobileCss],
];

/* ---------- live site page for checks (heading + nav + agenda) ---------- */
const site = doc(`<div style="background:var(--black);height:28px"></div>
  <div class="boss" id="site"><div class="boss-schedule" style="padding-bottom:0"><div id="n"></div></div><div id="a"></div></div>
  <script>document.getElementById('n').innerHTML = BOSS.html.nav();BOSS.renderSchedule(document.getElementById('a'));</script>`,
  'html,body{margin:0;background:var(--plum-950)} #site .boss-schedule .boss-schedule{padding-top:24px}');
fs.writeFileSync(path.join(OUT, 'site.html'), site);

const CHECK = () => {
  const out = { vw: innerWidth, scrollW: document.documentElement.scrollWidth, overflowX: document.documentElement.scrollWidth > innerWidth, problems: [] };
  const all = [...document.querySelectorAll('.boss *')];
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.boxShadow !== 'none' || cs.textShadow !== 'none' || cs.filter !== 'none' || /gradient/.test(cs.backgroundImage)) out.problems.push('effect: ' + el.className);
    if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0 && cs.overflowX !== 'visible') out.problems.push('scroll overflow: ' + el.className);
    const r = el.getBoundingClientRect();
    if (r.right > innerWidth + 0.5 && r.width > 0) out.problems.push('past viewport: ' + el.className + ' ' + Math.round(r.right));
  }
  // every card's text stays inside its card
  for (const card of document.querySelectorAll('.boss-card')) {
    const cr = card.getBoundingClientRect();
    for (const t of card.querySelectorAll('.boss-card__title,.boss-card__by,.boss-card__dur,.boss-chip,.boss-card__sub')) {
      const r = t.getBoundingClientRect();
      if (r.left < cr.left - .5 || r.right > cr.right + .5 || r.bottom > cr.bottom + .5) out.problems.push('card text outside card: ' + t.textContent.slice(0, 40));
    }
    // duration must not collide with the byline/title
    const dur = card.querySelector('.boss-card__dur').getBoundingClientRect();
    for (const t of card.querySelectorAll('.boss-card__title,.boss-card__by')) {
      const rg = document.createRange(); rg.selectNodeContents(t);
      for (const r of rg.getClientRects()) {
        const ov = !(r.right <= dur.left || r.left >= dur.right || r.bottom <= dur.top || r.top >= dur.bottom);
        if (ov) { out.problems.push('duration overlaps text: ' + t.textContent.slice(0, 40)); break; }
      }
    }
  }
  out.fonts = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight + ' ' + f.style);
  return out;
};

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const report = {};
  for (const [name, w] of [['desktop-1440', 1440], ['tablet-1024', 1024], ['mobile-390', 390]]) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: w === 390 ? 2 : 1 });
    await page.goto('file://' + path.join(OUT, 'site.html'), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    report[name] = await page.evaluate(CHECK);
    await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: true });
  }
  // PDF, one page per section, each page sized to its content
  const parts = [];
  for (const [name, body, css] of sections) {
    const file = path.join(OUT, name + '.html');
    fs.writeFileSync(file, doc(body, css));
    await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });
    await page.goto('file://' + file, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const h = await page.evaluate(() => Math.ceil(document.querySelector('.sheet').getBoundingClientRect().height));
    const chk = await page.evaluate(CHECK);
    report['pdf-' + name] = { height: h, overflowX: chk.overflowX, problems: chk.problems };
    await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: true });
    const pdf = path.join(OUT, name + '.pdf');
    await page.pdf({ path: pdf, width: '1600px', height: h + 'px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, pageRanges: '1' });
    parts.push(pdf);
  }
  fs.writeFileSync(path.join(OUT, 'parts.txt'), parts.join('\n'));
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  await browser.close();
  for (const [k, v] of Object.entries(report)) console.log(k, 'overflowX=' + v.overflowX, 'problems=' + v.problems.length, v.problems.slice(0, 6).join(' | '), v.height ? 'h=' + v.height : '');
  console.log('fonts:', [...new Set(report['desktop-1440'].fonts)].join(', '));
})();
