# BOSS Winter 2026

The agenda design for BOSS Winter 2026, Bitshala's six-day summit for Indian Bitcoin open-source builders (Jaipur, 26–31 October 2026). It follows the Summer 2026 agenda on bitshala.org/boss: plum night, stacked day header bars, two outlined session blocks per day either side of a vertical LUNCH strip, olive workshop cards and slate talk cards.

## Content fundamentals

- **Day headers** read `OCTOBER 27 • DAY 02 : AI, Developer Tooling & Bitcoin Core`. The date and day number are uppercase with zero padding, and the theme is in title case. The day's hours sit on the right as `10:00 AM - 5:00 PM`.
- **Session blocks** are numbered across the whole summit: Session 01 and 02 on Day 02, Session 03 and 04 on Day 03, and so on.
- **Times** on chips are 12-hour with no AM/PM (`10:00`, `2:30`), as on Summer 2026. Durations are written `30m`, `60m`, `90m`.
- **Titles** keep the sheet's wording and casing; only obvious typos are fixed ("Lightinign" → "Lightning"). Everything after the first colon becomes a smaller subtitle line ("Bitcoin After Quantum:" / "Understanding the Threat").
- **Speakers** follow "by", in italics, with several speakers joined as "A, B & C". Handles keep their own casing (`codingp110`, `sha512rma`, `qlrd`).
- **No labels on cards:** no type tags and no status badges. The card colour says what kind of session it is.
- **Abstracts** stay one to three plain sentences, describing the session. They open when the card is tapped.

## Visual foundations

**Colour.** One dark theme. `plum-950` is the page, `plum-900` the day header bars. Every outline is the same flat 2px steel blue (`frame`). There are no glows, gradients or shadows anywhere in the agenda.

| Card | Fill | Edge | Means |
| --- | --- | --- | --- |
| Workshop | `olive` | `olive-line` (yellow) | Hands-on, 60–90 min |
| Talk | `slate` | `slate-line` | Talks and demos |
| Open stage | `plum-800` | `plum-500` | Open discussion slots |

Time chips are `chip` white with `on-chip` text. The bright accents (`highlight`, `lime`, `coral`, `butter`, `mint`) belong to headings and nav, never inside the agenda.

**Type.** Two families.
- **DX Slight** (`fonts/Dx-Slight-*-Tall.otf`, the files bitshala.org/boss serves) sets headings, nav links, season pills and poster lines. Use Medium Tall (500), the cut the site loads, with `font-synthesis: none`. Tall (400) and Bold Tall (700) are included too.
- **Inter** (Inter 4.1, `fonts/Inter-*.woff2`) sets everything inside the agenda: Bold 24px day headers, Bold 25px card titles, SemiBold 18px subtitles, SemiBold Italic 18px bylines with "by" in regular Italic, Medium 21px labels and ranges, Medium 20px time chips with tabular figures, and Medium 15px durations.

**Layout.** Each talk day is a three-column grid (block · 88px lunch · block) with 22px gaps. Days stack with 44px between them. Cards inside a block are 12px apart.

**Shape.** `radius-lg` for blocks and the lunch strip, `radius-md` for day headers, `radius-sm` for cards, `radius-xs` for time chips. All outlines are 2px.

**Responsive.** Components read their container (`@container boss`), not the window.
- **Above 1180px:** full size.
- **861–1180px:** same columns; card titles 21px, chips 17px.
- **860px and below:** blocks stack, lunch lies flat between them (chip · LUNCH · 90m on the right), the day header puts date and theme on two lines with the hours below, gutters drop to 16px, card titles 18px, chips 14px. Checked at 390px with no sideways scroll.

## Using it

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="components/bundle.js"></script>
<div id="agenda"></div>
<script>BOSS.renderSchedule(document.getElementById('agenda'), { heading: false });</script>
```

`BOSS.schedule` holds the programme as data. Edit a session there and every view updates. `BOSS.html.nav()`, `BOSS.html.seasonPills(labels, active)` and `BOSS.html.heading(data)` build the site chrome around it.

## Sources

- The programme comes from the *BOSS PM Sheet: BOSS Schedule* tab (26–29 Oct). 30 and 31 Oct are not in the sheet yet and show *To be announced*.
- The layout is matched from the Summer 2026 agenda image (`public/boss26/boss26schedule.png` in the bitshala website repo). The colours and nav come from the BOSS page.
- Counts: 6 days, 18 talks, 6 workshops, 2 open stages.
