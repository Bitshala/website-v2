# Rebuilding the PDF

`build-pdf.js` renders the design with headless Chrome (puppeteer-core), checks the 1440px, 1024px and 390px layouts for sideways scroll, overflowing text and shadow/glow effects, and writes one PDF page per section.

```sh
npm i --prefix /tmp/boss-pdf puppeteer-core@23.11.1
NODE_PATH=/tmp/boss-pdf/node_modules node design/boss-winter-2026/scripts/build-pdf.js design/boss-winter-2026 /tmp/boss-pdf/out
pdfunite $(cat /tmp/boss-pdf/out/parts.txt) BOSS-Winter-2026-Schedule-Design.pdf
```

It expects Google Chrome at `/Applications/Google Chrome.app` and poppler's `pdfunite`.
