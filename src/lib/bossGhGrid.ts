// GitHub-style contribution grid (53 × 7) that spells the BOSS Winter 2026
// banner words in a 5×7 pixel font over plum noise. Shared by the server
// render of the agenda and its client-side word rotation.

export const GH_COLS = 53;
export const GH_ROWS = 7;

/** "0" | "1" | "2" = plum noise levels, "on" = a letter cell. */
export type GhLevel = "0" | "1" | "2" | "on";

/* 5×7 pixel letters */
// prettier-ignore
const FONT: Record<string, string[]> = {
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
};

/** Words in display order; accent is a colour token name. */
export const GH_WORDS = [
  { text: "BOSS", accent: "mint" },
  { text: "SUMMIT", accent: "coral" },
  { text: "JAIPUR", accent: "butter" },
  { text: "WINTER", accent: "lime" },
  { text: "2026", accent: "highlight" },
];

// Cells row by row; letters centred, noise from a seeded Park–Miller PRNG
function ghGrid(word: string, seed: number): GhLevel[] {
  const on = new Set<string>();
  const x0 = Math.floor(
    (GH_COLS - (word.length * 6 - 1)) / 2,
  );
  [...word].forEach((ch, li) => {
    const g = FONT[ch];
    for (let r = 0; r < GH_ROWS; r++)
      for (let c = 0; c < 5; c++)
        if (g[r][c] === "1")
          on.add(`${r},${x0 + li * 6 + c}`);
  });
  const out: GhLevel[] = [];
  for (let r = 0; r < GH_ROWS; r++)
    for (let c = 0; c < GH_COLS; c++) {
      seed = (seed * 16807) % 2147483647;
      const x = seed / 2147483647;
      out.push(
        on.has(`${r},${c}`)
          ? "on"
          : x < 0.6
            ? "0"
            : x < 0.88
              ? "1"
              : "2",
      );
    }
  return out;
}

export const GH_GRIDS = GH_WORDS.map((w, k) =>
  ghGrid(w.text, 26 + k * 7919),
);

/** Stagger step for a cell: one step per 6 columns, left to right. */
export const ghDelayStep = (index: number) =>
  Math.floor((index % GH_COLS) / 6);
