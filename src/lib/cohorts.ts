export type CohortKey = "bpd" | "mb" | "lbtcl" | "pb" | "ln";

/**
 * Maps short keys used in pages to API keys
 */
export const COHORT_KEY_MAP: Record<CohortKey, string> = {
  bpd: "BITCOIN_PROTOCOL_DEVELOPMENT",
  mb: "MASTERING_BITCOIN",
  lbtcl: "LEARNING_BITCOIN_FROM_COMMAND_LINE",
  pb: "PROGRAMMING_BITCOIN",
  ln: "MASTERING_LIGHTNING_NETWORK",
};

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getCohortStartDate(
  cohortsData: Record<string, any>,
  key: CohortKey
): string {
  const apiKey = COHORT_KEY_MAP[key];
  const cohort = cohortsData?.[apiKey];

  if (!cohort || !cohort.startDate) {
    return "TBA";
  }

  return formatDate(cohort.startDate);
}

export function getCohortStatus(
  cohortsData: Record<string, any>,
  key: CohortKey
): "Running" | "Starting Soon" | "Registration Closed" | "Coming Soon" {
  const apiKey = COHORT_KEY_MAP[key];
  const cohort = cohortsData?.[apiKey];

  if (!cohort) return "Coming Soon";

  const now = new Date();
  const start = new Date(cohort.startDate);
  const end = new Date(cohort.endDate);
  const deadline = new Date(cohort.registrationDeadline);

  if (now >= start && now <= end) return "Running";
  if (now < start && now <= deadline) return "Starting Soon";
  if (now > deadline) return "Registration Closed";

  return "Coming Soon";
}
