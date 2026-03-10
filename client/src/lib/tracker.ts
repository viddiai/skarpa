// ── Client-side page view tracker ────────────────────────────
// Uses sendBeacon so it never blocks navigation.

function getOrCreateId(storage: Storage, key: string): string {
  let id = storage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    storage.setItem(key, id);
  }
  return id;
}

export function trackPageView(path: string) {
  // Skip admin pages — we don't want to track our own dashboard visits
  if (path.startsWith("/admin")) return;

  const visitorId = getOrCreateId(localStorage, "skarpa_vid");
  const sessionId = getOrCreateId(sessionStorage, "skarpa_sid");

  const payload = JSON.stringify({
    path,
    referrer: document.referrer || null,
    visitorId,
    sessionId,
  });

  // sendBeacon with Blob is required because sendBeacon doesn't support
  // setting Content-Type directly — using a Blob with type: application/json
  // ensures Express can parse the body.
  navigator.sendBeacon(
    "/api/track",
    new Blob([payload], { type: "application/json" }),
  );
}
