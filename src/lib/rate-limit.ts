type Entry = { count: number; lastFailAt: number; blockedUntil: number };

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

// dev e hot reload e map reset na hoy, tai globalThis e rakha
const g = globalThis as unknown as { __loginAttempts?: Map<string, Entry> };
const store = (g.__loginAttempts ??= new Map<string, Entry>());

export function isBlocked(key: string): boolean {
  const e = store.get(key);
  if (!e) return false;
  if (e.blockedUntil > Date.now()) return true;
  if (e.blockedUntil !== 0) store.delete(key); // block shesh
  return false;
}

export function recordFailure(key: string) {
  const now = Date.now();
  const e = store.get(key);

  // purono failure 15 min age hole notun kore gono
  const fresh = !e || now - e.lastFailAt > WINDOW_MS;
  const count = fresh ? 1 : e.count + 1;

  store.set(key, {
    count,
    lastFailAt: now,
    blockedUntil: count >= MAX_ATTEMPTS ? now + WINDOW_MS : 0,
  });
}

export function resetAttempts(key: string) {
  store.delete(key);
}