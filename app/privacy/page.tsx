import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | Priyanshu Vora",
  description: "How this portfolio uses privacy-conscious website analytics.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground md:px-12">
      <article className="mx-auto max-w-3xl">
        <Link
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          href="/"
        >
          Back to portfolio
        </Link>

        <h1 className="mt-10 text-5xl font-light tracking-tighter md:text-7xl">
          Privacy
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Last updated August 24, 2026
        </p>

        <div className="mt-12 space-y-10 text-base leading-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-medium text-foreground">
              What is measured
            </h2>
            <p className="mt-3">
              This site uses Vercel Web Analytics for aggregate page views,
              referrers, device and browser categories, and approximate
              geographic trends. Vercel Analytics is cookie-free and does not
              expose a visitor&apos;s IP address in the analytics record.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-foreground">
              Optional behavior analytics
            </h2>
            <p className="mt-3">
              If you choose Accept in the behavior analytics notice, PostHog
              Cloud EU may record page views, section views, scroll depth,
              active reading-time milestones, clicks, outbound links, and a
              sampled visual replay of the session. This helps determine which
              portfolio content is useful and where the experience can improve.
            </p>
            <p className="mt-3">
              PostHog is not loaded before acceptance. Rejecting leaves only
              the aggregate Vercel measurement active. Global Privacy Control
              and browser Do Not Track signals keep PostHog disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-foreground">
              Safeguards
            </h2>
            <p className="mt-3">
              All inputs are masked. URL query strings and fragments, request
              and response bodies, network headers, console logs, canvas
              content, and raw IP event properties are excluded. A connection
              IP may be processed to derive approximate geography and is then
              discarded. Visitors are pseudonymous: this portfolio does not
              call PostHog identify or link contact details to recordings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-foreground">
              Choice, retention, and contact
            </h2>
            <p className="mt-3">
              Your choice is stored locally in your browser and can be changed
              at any time using Privacy settings. Behavior recordings are kept
              for no more than 30 days. A pseudonymous analytics identifier is
              retained in browser storage until you withdraw consent or clear
              site data. Aggregate analytics may be retained for up to 12
              months. Analytics access is restricted to the site owner.
            </p>
            <p className="mt-3">
              Because no name or contact details are attached, analytics
              records normally cannot be located using an email address. To
              stop collection and clear the local identifier, choose Reject in
              Privacy settings. To ask a privacy question, email{" "}
              <a
                className="text-foreground underline underline-offset-4"
                href="mailto:priyanshu.vora211@gmail.com"
              >
                priyanshu.vora211@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
