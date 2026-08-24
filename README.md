# Priyanshu Vora — Software Engineer

Personal portfolio built with Next.js 16, React 19, Tailwind CSS v4, GSAP, and Motion.

**Live**: [priyanshuvora.com](https://priyanshuvora.com)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with CSS custom properties (light/dark theme system)
- **Animation**: GSAP + ScrollTrigger, Motion (Framer Motion)
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React
- **Theme**: next-themes with system preference detection

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Analytics

The site uses Vercel Web Analytics for aggregate, cookie-free traffic metrics.
PostHog behavior analytics is optional and only loads after explicit visitor
consent. It captures privacy-masked heatmaps, sampled session replay, scroll
depth, section views, reading-time milestones, downloads, contact intent, and
outbound links.

To enable PostHog, create an EU Cloud project and add the variables from
`.env.example` to Vercel. In PostHog project settings:

- discard raw IP data after GeoIP processing;
- keep replay retention at 30 days or less;
- keep input masking enabled and network/console capture disabled;
- do not identify pseudonymous visitors or join contact details to recordings.

Replay sampling is enforced at 15% in the client. Leave
`NEXT_PUBLIC_POSTHOG_PRIVACY_READY=false` until the raw-IP and retention
settings above are verified, then set it to `true` in Vercel to activate the
consent notice and behavior analytics.
