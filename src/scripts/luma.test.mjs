// Run: node src/scripts/luma.test.mjs
// Covers the three things that can silently break: timezone-correct day/time
// (CI builds run in UTC), city derivation across the three real
// geo_address_info shapes Luma sends, and the city-filter reordering.
import assert from "node:assert/strict";
import { mapEntry, planTimeline } from "./luma-map.mjs";

// BOSS Battle: 18:30 UTC on Sep 6 is 00:00 IST on Sep 7 — a naive UTC
// format would land this on the wrong day. location_type "unknown", no
// geo_address_info at all (virtual event) -> city "Online".
const virtualEntry = {
  api_id: "calev-RfaUUU3oNzZfDa2",
  guest_count: 201,
  waitlist_active: false,
  hosts: [
    {
      name: "Bitshala",
      avatar_url: "https://example.com/a.png",
    },
  ],
  ticket_info: { is_free: true, is_sold_out: false },
  event: {
    api_id: "evt-UMUYqzZTSWgyHGy",
    name: "BOSS Battle by Bitshala | Virtual Hackathon",
    start_at: "2026-09-06T18:30:00.000Z",
    timezone: "Asia/Kolkata",
    url: "bitshala-bossbattle",
    cover_url:
      "https://images.lumacdn.com/uploads/ge/cover.png",
    location_type: "unknown",
    geo_address_info: null,
  },
};

// Trezor Academy Bangalore: 11:30 UTC -> 5:00 PM IST, same calendar day.
// geo_address_info.city present -> city used as-is.
const googleGeoEntry = {
  api_id: "calev-jSHwIOrEA93feZh",
  guest_count: 58,
  waitlist_active: false,
  hosts: [
    {
      name: "Bitmela",
      avatar_url: "https://example.com/b.png",
    },
  ],
  ticket_info: { is_free: true, is_sold_out: false },
  event: {
    api_id: "evt-DsAAUhdNCD7bC5Y",
    name: "Trezor Academy: Bangalore",
    start_at: "2026-09-07T11:30:00.000Z",
    timezone: "Asia/Kolkata",
    url: "zryqcv3h",
    cover_url:
      "https://images.lumacdn.com/uploads/yf/cover.jpg",
    location_type: "offline",
    geo_address_info: {
      type: "google",
      city: "Bengaluru",
      region: "Karnataka",
      address: "1288, 17th Cross Rd",
      city_state: "Bengaluru, India",
    },
  },
};

// Trezor Academy Delhi: manual address, no city field at all -> "Other".
const manualNoCityEntry = {
  api_id: "calev-bWmJWYJ8wljTDrb",
  guest_count: 26,
  waitlist_active: false,
  hosts: [],
  ticket_info: { is_free: true, is_sold_out: false },
  event: {
    api_id: "evt-BzrDVLFyY92t5AN",
    name: "Trezor Academy: Delhi",
    start_at: "2026-09-08T10:30:00.000Z",
    timezone: "Asia/Kolkata",
    url: "nglamz12",
    cover_url:
      "https://images.lumacdn.com/uploads/c3/cover.jpg",
    location_type: "offline",
    geo_address_info: {
      type: "manual",
      address:
        "Zone, P1, National Institute of Technology, Plot No. FA7, GT Karnal Rd, Garthi Khurad, Bakoli, Delhi, 110036",
      mode: "shown",
    },
  },
};

// MB Cohort orientation: manual "address" is actually a Discord URL -> "Online".
const manualUrlEntry = {
  api_id: "calev-tby6VF8z3i0G3dF",
  guest_count: 1,
  waitlist_active: false,
  hosts: [],
  ticket_info: { is_free: true, is_sold_out: false },
  event: {
    api_id: "evt-sbXuBcVEzPdA1Ex",
    name: "Mastering Bitcoin (MB) Cohort - Season 7 - Orientation Session",
    start_at: "2026-09-12T14:30:00.000Z",
    timezone: "Asia/Kolkata",
    url: "hlr9d57e",
    cover_url:
      "https://images.lumacdn.com/event-covers/6j/cover.jpg",
    location_type: "offline",
    geo_address_info: {
      type: "manual",
      address: "https://discord.com/invite/STeQFVEWf9",
      mode: "shown",
    },
  },
};

const virtual = mapEntry(virtualEntry);
assert.equal(
  virtual.dayKey,
  "2026-09-07",
  "virtual event day rolls into IST, not stuck on the UTC day",
);
assert.equal(virtual.time, "12:00 AM");
assert.equal(virtual.city, "Online");

const bangalore = mapEntry(googleGeoEntry);
assert.equal(bangalore.dayKey, "2026-09-07");
assert.equal(
  bangalore.time,
  "5:00 PM",
  "11:30 UTC must render as 5:00 PM IST, not 11:30 AM",
);
assert.equal(bangalore.city, "Bengaluru");

const delhi = mapEntry(manualNoCityEntry);
assert.equal(
  delhi.city,
  "Other",
  "manual address with no city field falls back to Other",
);
assert.ok(delhi.venue.includes("Delhi"));

const discordOrientation = mapEntry(manualUrlEntry);
assert.equal(
  discordOrientation.city,
  "Online",
  "a URL-shaped manual address is an online event",
);

// planTimeline: selecting a city floats its rows to the top. Two Mumbai events
// share Sep 12, so the second must stay a date-rail repeat after the move, and
// Bengaluru must restate its date once it starts the "elsewhere" block.
const timeline = [
  { city: "Bengaluru", day: "2026-09-07" },
  { city: "Mumbai", day: "2026-09-12" },
  { city: "Pune", day: "2026-09-12" },
  { city: "Mumbai", day: "2026-09-12" },
  { city: "Jaipur", day: "2026-09-17" },
];
const [blr, mumbai1, pune, mumbai2, jaipur] = timeline;

const unfiltered = planTimeline(timeline, "all");
assert.deepEqual(
  unfiltered.matched,
  timeline,
  "All matches every row, in chronological order",
);
assert.deepEqual([...unfiltered.repeats], [pune, mumbai2]);

const mumbai = planTimeline(timeline, "Mumbai");
assert.deepEqual(mumbai.matched, [mumbai1, mumbai2]);
assert.deepEqual(
  [...mumbai.repeats],
  [mumbai2],
  "mumbai2 still trails mumbai1; blr and pune both restate their dates",
);

const nobody = planTimeline(timeline, "Chennai");
assert.deepEqual(
  nobody.matched,
  [],
  "a city with no events matches nothing rather than crashing",
);
assert.deepEqual([...nobody.repeats], [pune, mumbai2]);

console.log("luma.test.mjs: all assertions passed");
