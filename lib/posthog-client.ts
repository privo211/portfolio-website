import posthog from "posthog-js";

export type PortfolioPostHog = typeof posthog;

const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";
const POSTHOG_PRIVACY_READY =
  process.env.NEXT_PUBLIC_POSTHOG_PRIVACY_READY === "true";

let initialized = false;

function redactUrl(value: string): string {
  try {
    const url = new URL(value, window.location.origin);

    if (url.protocol === "mailto:" || url.protocol === "tel:") {
      return `${url.protocol}[redacted]`;
    }

    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return value.split(/[?#]/, 1)[0];
  }
}

function sanitizeValue(value: unknown, propertyName = ""): unknown {
  if (typeof value === "string") {
    return /(url|href|referrer)/i.test(propertyName)
      ? redactUrl(value)
      : value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, propertyName));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        sanitizeValue(item, key),
      ]),
    );
  }

  return value;
}

export function initializePostHog(): PortfolioPostHog | null {
  if (!POSTHOG_TOKEN || !POSTHOG_PRIVACY_READY) return null;

  if (!initialized) {
    posthog.init(POSTHOG_TOKEN, {
      api_host: POSTHOG_HOST,
      defaults: "2026-05-30",
      autocapture: {
        dom_event_allowlist: ["click"],
        element_allowlist: ["a", "button"],
        element_attribute_ignorelist: ["href", "src"],
        capture_copied_text: false,
      },
      capture_pageview: "history_change",
      capture_pageleave: true,
      capture_heatmaps: true,
      capture_dead_clicks: true,
      capture_exceptions: false,
      capture_performance: false,
      disable_capture_url_hashes: true,
      enable_recording_console_log: false,
      person_profiles: "never",
      opt_out_capturing_by_default: true,
      opt_out_persistence_by_default: true,
      property_denylist: ["$ip"],
      respect_dnt: true,
      session_recording: {
        sampleRate: 0.15,
        blockClass: "ph-no-capture",
        maskAllInputs: true,
        maskTextSelector: ".ph-mask",
        recordBody: false,
        recordHeaders: false,
        captureCanvas: { recordCanvas: false },
        maskCapturedNetworkRequestFn: (request) => ({
          ...request,
          name: request.name ? redactUrl(request.name) : request.name,
          requestBody: null,
          requestHeaders: undefined,
          responseBody: null,
          responseHeaders: undefined,
        }),
      },
      before_send: (event) => {
        if (!event?.properties) return event;

        return {
          ...event,
          properties: sanitizeValue(event.properties) as typeof event.properties,
        };
      },
    });

    initialized = true;
  }

  posthog.opt_in_capturing();
  return posthog;
}
