import "server-only";

/**
 * Small in-memory sliding-window limiter, keyed by client IP.
 *
 * It lives per server instance and resets on cold start, so it only blunts
 * bursts from one client; it is not a global quota. Old keys are pruned on
 * every call so the map cannot grow without bound.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function check(key: string): { ok: boolean; retryAfterSec: number } {
    const now = Date.now();
    const since = now - windowMs;

    // prune keys whose newest hit is outside the window
    if (hits.size > 1000) {
      for (const [k, times] of hits) {
        if (times[times.length - 1] <= since) hits.delete(k);
      }
    }

    const recent = (hits.get(key) ?? []).filter((t) => t > since);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return { ok: false, retryAfterSec: Math.ceil((recent[0] + windowMs - now) / 1000) };
    }
    recent.push(now);
    hits.set(key, recent);
    return { ok: true, retryAfterSec: 0 };
  };
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
