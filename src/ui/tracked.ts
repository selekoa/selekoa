/**
 * A promise that records its outcome, so that React's `use` returns a
 * settled value at once instead of suspending (src/ui/page-modules.tsx).
 */
export type Tracked<T> = Promise<T> & {
  status?: 'pending' | 'fulfilled' | 'rejected';
  value?: T;
  reason?: unknown;
};

export function track<T>(promise: Promise<T>): Tracked<T> {
  const tracked = promise as Tracked<T>;
  tracked.status = 'pending';
  tracked.then(
    (value) => {
      tracked.status = 'fulfilled';
      tracked.value = value;
    },
    (reason: unknown) => {
      tracked.status = 'rejected';
      tracked.reason = reason;
    },
  );
  return tracked;
}

/** A promise already settled with a value, which `use` reads at once. */
export function settled<T>(value: T): Tracked<T> {
  const tracked = Promise.resolve(value) as Tracked<T>;
  tracked.status = 'fulfilled';
  tracked.value = value;
  return tracked;
}
