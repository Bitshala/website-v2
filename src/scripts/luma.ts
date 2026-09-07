import { mapEntry } from "./luma-map.mjs";

export type LumaEvent = {
  id: string;
  name: string;
  url: string;
  startAt: string;
  timezone: string;
  dayKey: string;
  dayLabel: string;
  weekday: string;
  time: string;
  cover: string | null;
  city: string;
  venue: string;
  guestCount: number;
  priceLabel: string;
  soldOut: boolean;
  waitlist: boolean;
  hosts: { name: string; avatar: string }[];
};

const CALENDAR_URL =
  "https://api.lu.ma/calendar/get-items?calendar_api_id=cal-pGdMS95JBh7cdom&period=future&pagination_limit=50";
const TTL_MS = 60 * 60 * 1000; // ponytail: in-memory cache; file cache if rate limits bite
let cache: { at: number; events: LumaEvent[] } | null =
  null;

/** Live upcoming events from Bitshala's public Luma calendar. */
export async function getLumaEvents(): Promise<
  LumaEvent[]
> {
  if (cache && Date.now() - cache.at < TTL_MS)
    return cache.events;

  try {
    const res = await fetch(CALENDAR_URL);
    if (!res.ok) {
      console.error(
        "Luma calendar fetch failed:",
        res.status,
      );
      return [];
    }
    const data = await res.json();
    const events: LumaEvent[] = (data.entries ?? [])
      .map(mapEntry)
      .sort(
        (a: LumaEvent, b: LumaEvent) =>
          Date.parse(a.startAt) - Date.parse(b.startAt),
      );
    cache = { at: Date.now(), events };
    return events;
  } catch (err) {
    console.error("getLumaEvents failed:", err);
    return cache?.events ?? [];
  }
}
