// Best-effort in-memory sliding-window rate limiter.
//
// On serverless (Vercel) this lives per-instance, so it's a fast, free first
// line of defense against bursts hitting the same warm instance. The
// authoritative, cross-instance limit is the Postgres-backed count in db.ts.

export type RateRule = { windowMs: number; max: number };

const hits = new Map<string, number[]>();

/**
 * Records a hit for `key` and checks it against the given rules. A request is
 * blocked if any rule's max would be exceeded within its window. Blocked
 * requests are NOT recorded (so a flood can't keep pushing the window forward).
 */
export function rateLimit(
  key: string,
  rules: RateRule[],
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const maxWindow = Math.max(...rules.map((r) => r.windowMs));
  const recent = (hits.get(key) ?? []).filter((t) => now - t < maxWindow);

  for (const rule of rules) {
    const inWindow = recent.filter((t) => now - t < rule.windowMs);
    if (inWindow.length >= rule.max) {
      const oldest = Math.min(...inWindow);
      const retryAfterSec = Math.ceil((rule.windowMs - (now - oldest)) / 1000);
      hits.set(key, recent);
      return { ok: false, retryAfterSec: Math.max(1, retryAfterSec) };
    }
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > maxWindow)) hits.delete(k);
    }
  }

  return { ok: true, retryAfterSec: 0 };
}
