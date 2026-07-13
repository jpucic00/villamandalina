// Fire a custom Umami event. No-op when the tracker isn't loaded
// (script not configured, blocked by the client, or running server-side).
export function trackEvent(
  eventName: string,
  eventData?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  window.umami?.track(eventName, eventData);
}
