The full Winter 2026 agenda in the bitshala.org/boss style. Every day is stacked under its own header bar. Each talk day is split into two session blocks either side of a vertical LUNCH strip, the same layout as the Summer 2026 agenda.

Mount it with `BOSS.renderSchedule(element, { data, heading })`.

- `data` defaults to the bundled Winter 2026 programme (`BOSS.schedule`).
- `heading: false` drops the "Winter 2026 Agenda" heading, for when the site's own section heading and season switch sit above it.

**Responsive:** the agenda sizes itself by its container, not the window.
- **Above 1180px:** full-size type.
- **861–1180px:** card titles 21px and chips 17px, same three columns.
- **860px and below:** the blocks stack, the lunch strip lies flat between them, the day header wraps date and theme onto two lines, and gutters drop to 16px.

**Cards:** a card is a workshop (olive with a yellow edge), a talk (slate) or an open-stage slot (plum). There are no type labels, so the colour plus the duration does the work, as on Summer 2026. A card that has an abstract shows a small **+** by its duration. Tapping the card opens the abstract.

**Fonts:** both ship with the system. DX Slight sets the heading, Inter sets everything inside the agenda.
