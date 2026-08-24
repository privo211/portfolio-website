"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PortfolioPostHog } from "@/lib/posthog-client";

const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/next").then((module) => module.Analytics),
  { ssr: false },
);

const CONSENT_STORAGE_KEY = "portfolio:analytics-consent:v1";
const POSTHOG_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_PRIVACY_READY === "true",
);
const SECTION_IDS = [
  "about",
  "experience",
  "work",
  "skills",
  "education",
  "testimonials",
  "contact",
] as const;
const SCROLL_MILESTONES = [25, 50, 75, 90, 100] as const;
const READING_MILESTONES = [15, 30, 60, 120, 300] as const;

type ConsentState =
  | "loading"
  | "pending"
  | "accepted"
  | "rejected"
  | "blocked";

interface NavigatorWithPrivacySignals extends Navigator {
  globalPrivacyControl?: boolean;
}

function hasPrivacySignal(): boolean {
  const privacyNavigator = navigator as NavigatorWithPrivacySignals;
  const doNotTrack = navigator.doNotTrack?.toLowerCase();
  return (
    privacyNavigator.globalPrivacyControl === true ||
    doNotTrack === "1" ||
    doNotTrack === "yes"
  );
}

function readConsent(): ConsentState {
  if (hasPrivacySignal()) return "blocked";

  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    // Storage can be unavailable in strict or private browsing modes.
  }

  return "pending";
}

function storeConsent(value: "accepted" | "rejected"): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // The in-memory choice still applies for the current page load.
  }
}

function sectionPlacement(element: Element): string {
  return element.closest("section[id]")?.id || "global";
}

function safeDestination(href: string): {
  domain: string;
  path: string;
} | null {
  try {
    const url = new URL(href, window.location.href);
    return { domain: url.hostname, path: url.pathname };
  } catch {
    return null;
  }
}

function installPortfolioTracking(posthog: PortfolioPostHog): () => void {
  const capturedScrollDepths = new Set<number>();
  const capturedSections = new Set<string>();
  const capturedReadingTimes = new Set<number>();
  const sectionTimers = new Map<string, number>();
  let activeReadingSeconds = 0;
  let lastActivityAt = Date.now();
  let animationFrame = 0;

  const capture = (
    event: string,
    properties?: Record<string, string | number>,
  ) => posthog.capture(event, properties);

  const markActivity = () => {
    lastActivityAt = Date.now();
  };

  const captureScrollDepth = () => {
    animationFrame = 0;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportBottom = window.scrollY + window.innerHeight;
    const depth = documentHeight
      ? Math.min(100, Math.round((viewportBottom / documentHeight) * 100))
      : 100;

    for (const milestone of SCROLL_MILESTONES) {
      if (depth >= milestone && !capturedScrollDepths.has(milestone)) {
        capturedScrollDepths.add(milestone);
        capture("scroll_depth", { percent: milestone });
      }
    }
  };

  const handleScroll = () => {
    markActivity();
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(captureScrollDepth);
    }
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    markActivity();

    const annotated = target.closest<HTMLElement>("[data-analytics-event]");
    if (annotated) {
      const eventName = annotated.dataset.analyticsEvent;
      if (eventName) {
        capture(eventName, {
          label: annotated.dataset.analyticsLabel || "unspecified",
          placement: sectionPlacement(annotated),
        });
      }
    }

    const anchor = target.closest<HTMLAnchorElement>("a[href]");
    const project = target.closest<HTMLElement>("[data-analytics-project]");

    if (project && !anchor) {
      capture("project_open", {
        project: project.dataset.analyticsProject || "unknown",
      });
    }

    if (!anchor) return;

    const href = anchor.getAttribute("href") || "";
    const placement = sectionPlacement(anchor);

    if (anchor.hasAttribute("download") || /\.pdf(?:$|[?#])/i.test(href)) {
      capture("resume_download", { placement });
      return;
    }

    if (href.startsWith("mailto:")) {
      capture("contact_intent", { placement });
      return;
    }

    if (href.startsWith("#")) {
      capture("navigation_click", {
        destination: href.slice(1) || "top",
        placement,
      });
      return;
    }

    const destination = safeDestination(href);
    if (destination && destination.domain !== window.location.hostname) {
      capture("outbound_link", {
        destination_domain: destination.domain,
        destination_path: destination.path,
        placement,
      });
    }
  };

  const handleKeydown = () => markActivity();
  const handlePointerdown = () => markActivity();

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const sectionId = entry.target.id;
        if (!sectionId || capturedSections.has(sectionId)) continue;

        if (entry.isIntersecting && !sectionTimers.has(sectionId)) {
          const timer = window.setTimeout(() => {
            capturedSections.add(sectionId);
            sectionTimers.delete(sectionId);
            capture("section_view", { section: sectionId });
          }, 1000);
          sectionTimers.set(sectionId, timer);
        } else if (!entry.isIntersecting) {
          const timer = sectionTimers.get(sectionId);
          if (timer) window.clearTimeout(timer);
          sectionTimers.delete(sectionId);
        }
      }
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
  );

  for (const sectionId of SECTION_IDS) {
    const section = document.getElementById(sectionId);
    if (section) sectionObserver.observe(section);
  }

  const readingTimer = window.setInterval(() => {
    const isActive =
      document.visibilityState === "visible" &&
      document.hasFocus() &&
      Date.now() - lastActivityAt < 30_000;

    if (!isActive) return;

    activeReadingSeconds += 5;
    for (const milestone of READING_MILESTONES) {
      if (
        activeReadingSeconds >= milestone &&
        !capturedReadingTimes.has(milestone)
      ) {
        capturedReadingTimes.add(milestone);
        capture("active_reading_time", { seconds: milestone });
      }
    }
  }, 5000);

  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("pointerdown", handlePointerdown, {
    passive: true,
  });
  window.addEventListener("scroll", handleScroll, { passive: true });
  captureScrollDepth();

  return () => {
    document.removeEventListener("click", handleClick);
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("pointerdown", handlePointerdown);
    window.removeEventListener("scroll", handleScroll);
    sectionObserver.disconnect();
    sectionTimers.forEach((timer) => window.clearTimeout(timer));
    window.clearInterval(readingTimer);
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
  };
}

export function SiteAnalytics() {
  const [consent, setConsent] = useState<ConsentState>("loading");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const posthogRef = useRef<PortfolioPostHog | null>(null);

  useEffect(() => {
    if (!POSTHOG_CONFIGURED) return;

    const animationFrame = window.requestAnimationFrame(() => {
      setConsent(readConsent());
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;

    let cancelled = false;
    let removeTracking: (() => void) | undefined;

    void import("@/lib/posthog-client").then(({ initializePostHog }) => {
      if (cancelled) return;

      const posthog = initializePostHog();
      if (!posthog) return;

      posthogRef.current = posthog;
      removeTracking = installPortfolioTracking(posthog);
    });

    return () => {
      cancelled = true;
      removeTracking?.();
    };
  }, [consent]);

  const accept = () => {
    storeConsent("accepted");
    setConsent("accepted");
    setSettingsOpen(false);
  };

  const reject = () => {
    storeConsent("rejected");
    posthogRef.current?.stopSessionRecording();
    posthogRef.current?.opt_out_capturing();
    posthogRef.current = null;
    setConsent("rejected");
    setSettingsOpen(false);
  };

  const showDialog =
    POSTHOG_CONFIGURED &&
    consent !== "loading" &&
    consent !== "blocked" &&
    (consent === "pending" || settingsOpen);

  return (
    <>
      <VercelAnalytics />

      {showDialog ? (
        <aside
          aria-label="Analytics privacy choices"
          aria-live="polite"
          className="ph-no-capture fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-white/15 bg-black/95 p-5 text-white shadow-2xl backdrop-blur-xl md:p-6"
          role="dialog"
        >
          <p className="text-sm font-semibold">Behavior analytics</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            May I use privacy-masked PostHog analytics to understand which
            sections people read, where they click and scroll, and to replay a
            sample of sessions? Inputs, URL query strings, network bodies,
            console logs, and raw IP properties are excluded.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10"
              onClick={accept}
              type="button"
            >
              Accept
            </button>
            <button
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10"
              onClick={reject}
              type="button"
            >
              Reject
            </button>
            <Link
              className="text-sm text-white/60 underline underline-offset-4 hover:text-white"
              href="/privacy"
            >
              Privacy details
            </Link>
          </div>
        </aside>
      ) : null}

      {POSTHOG_CONFIGURED &&
      (consent === "accepted" || consent === "rejected") &&
      !showDialog ? (
        <button
          className="ph-no-capture fixed bottom-3 left-3 z-[90] rounded-full border border-foreground/15 bg-background/90 px-3 py-1.5 text-xs text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:text-foreground"
          onClick={() => setSettingsOpen(true)}
          type="button"
        >
          Privacy settings
        </button>
      ) : null}
    </>
  );
}
