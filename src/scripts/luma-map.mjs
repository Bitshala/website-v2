// Pure Luma entry -> LumaEvent mapping. Plain .mjs (not .ts) so
// src/scripts/luma.test.mjs can exercise it on Node 18 (the repo's
// pinned version — see .nvmrc) without a TS build step.

const DEFAULT_TZ = "Asia/Kolkata";

// ponytail: small alias map for known dupes; add entries if new ones show up.
const CITY_ALIASES = {
  "New Delhi": "Delhi",
  Bangalore: "Bengaluru",
};

function isUrlLike(value) {
  return /^https?:\/\//i.test((value || "").trim());
}

export function deriveCity(ev) {
  const geo = ev.geo_address_info || {};
  if (geo.city) return CITY_ALIASES[geo.city] || geo.city;
  if (
    ev.location_type !== "offline" ||
    isUrlLike(geo.address)
  )
    return "Online";
  return "Other";
}

export function deriveVenue(geo) {
  return (geo && (geo.address || geo.city_state)) || "";
}

const CURRENCY_SYMBOLS = {
  inr: "₹",
  usd: "$",
  eur: "€",
  gbp: "£",
};

export function formatPrice(ticketInfo) {
  if (!ticketInfo) return "";
  if (ticketInfo.is_free) return "Free";
  const price = ticketInfo.price;
  if (
    !price ||
    typeof price.cents !== "number" ||
    !price.currency
  )
    return "";
  const amount = (price.cents / 100).toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 0,
    },
  );
  const symbol =
    CURRENCY_SYMBOLS[price.currency.toLowerCase()];
  return symbol
    ? `${symbol}${amount}`
    : `${amount} ${price.currency.toUpperCase()}`;
}

/** Maps one raw Luma calendar entry to the flat LumaEvent shape the page renders. */
export function mapEntry(entry) {
  const ev = entry.event || {};
  const geo = ev.geo_address_info || {};
  const timezone = ev.timezone || DEFAULT_TZ;
  const date = new Date(ev.start_at);

  return {
    id: ev.api_id || entry.api_id,
    name: ev.name || "",
    url: ev.url ? `https://luma.com/${ev.url}` : "",
    startAt: ev.start_at,
    timezone,
    dayKey: date.toLocaleDateString("en-CA", {
      timeZone: timezone,
    }),
    dayLabel: date.toLocaleDateString("en-US", {
      timeZone: timezone,
      month: "short",
      day: "numeric",
    }),
    weekday: date.toLocaleDateString("en-US", {
      timeZone: timezone,
      weekday: "long",
    }),
    time: date.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
    }),
    cover: ev.cover_url || null,
    city: deriveCity(ev),
    venue: deriveVenue(geo),
    guestCount: entry.guest_count || 0,
    priceLabel: formatPrice(entry.ticket_info),
    soldOut: !!(
      entry.ticket_info && entry.ticket_info.is_sold_out
    ),
    waitlist: !!entry.waitlist_active,
    hosts: (entry.hosts || []).map((h) => ({
      name: h.name || "",
      avatar: h.avatar_url || "",
    })),
  };
}

/**
 * Selecting a city floats its rows to the top: matched rows take flex order -1,
 * the rest 1, and the divider sits between them at 0. Ties break by DOM order,
 * so chronology survives without numbering anything. Returns the matched rows
 * plus the set whose date rail repeats the row visually above it.
 */
export function planTimeline(rows, city) {
  const isMatch = (row) =>
    city === "all" || row.city === city;
  const matched = rows.filter(isMatch);
  const rest = rows.filter((row) => !isMatch(row));

  const repeats = new Set();
  let previousDay;
  [...matched, ...rest].forEach((row, i) => {
    // The divider breaks the run, so the block below restates its first date.
    if (i !== matched.length && row.day === previousDay)
      repeats.add(row);
    previousDay = row.day;
  });

  return { matched, repeats };
}
