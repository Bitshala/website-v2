/** Card colour: workshop = olive, talk = slate, open = plum open-stage slot. */
export type SessionKind = 'talk' | 'workshop' | 'open';

export interface Session {
  /** 24-hour IST "HH:MM"; shown 12-hour like the Summer 2026 agenda. */
  start: string;
  end: string;
  kind: SessionKind;
  /** Text after the first ": " renders as a smaller subtitle line. */
  title: string;
  /** Joined as "A, B & C" after "by". Empty for open stage. */
  speakers: string[];
  /** Optional abstract, revealed by tapping the card. */
  about?: string;
}

export interface Day {
  date: string;           // "YYYY-MM-DD"
  day: number;            // 26
  title: string;          // day theme
  start?: string;         // day hours, omitted for TBA days
  end?: string;
  sessions: Session[];    // empty = header-only day
}

export interface ScheduleData {
  edition: string;        // "Winter 2026"
  city: string;
  range: string;
  month: string;          // "October"
  lunch: { start: string; end: string };
  days: Day[];
}

export interface ScheduleProps { data?: ScheduleData; heading?: boolean; /** render only these dates; day and session numbering is kept */ only?: string[]; }
export interface SessionCardProps { session: Session; open?: boolean; }
export interface SessionBlockProps { number: number; sessions: Session[]; }
export interface LunchStripProps { start: string; end: string; }
export interface DayHeaderProps { data: ScheduleData; day: Day; index: number; }

export declare const BOSS: {
  schedule: ScheduleData;
  renderSchedule(el: HTMLElement, opts?: ScheduleProps): void;
  html: {
    nav(): string;
    seasonPills(labels: string[], active: string): string;
    heading(data: ScheduleData): string;
    sessionCard(session: Session, opts?: { open?: boolean }): string;
    sessionBlock(number: number, sessions: Session[]): string;
    lunchStrip(lunch: { start: string; end: string }): string;
    dayHeader(data: ScheduleData, day: Day, index: number): string;
    schedule(data: ScheduleData): string;
  };
};
