import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Priyanshu Vora | Software Engineer",
  description:
    "Priyanshu Vora, AI-first Software Engineer. I find bottlenecks, build automation, and ship measurable impact across teams. Recent CS graduate from Brock University (GPA 3.7).",
  keywords: [
    "Priyanshu Vora",
    "Software Engineer",
    "Full Stack Developer",
    "Python",
    "TypeScript",
    "Next.js",
    "Azure",
    "Portfolio",
  ],
  authors: [{ name: "Priyanshu Vora" }],
  metadataBase: new URL("https://priyanshu-vora.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://priyanshu-vora.vercel.app",
    title: "Priyanshu Vora | Software Engineer",
    description:
      "I build automation that saves enterprises thousands of hours, OCR pipelines, ERP integrations, and backend systems that ship measurable results.",
    siteName: "Priyanshu Vora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Vora | Software Engineer",
    description:
      "I build automation that saves enterprises thousands of hours, OCR pipelines, ERP integrations, and backend systems that ship measurable results.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Priyanshu Vora",
  jobTitle: "Software Engineer",
  url: "https://priyanshu-vora.vercel.app",
  email: "priyanshu.vora211@gmail.com",
  sameAs: [
    "https://github.com/privo211",
    "https://www.linkedin.com/in/priyanshuvora/",
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Brock University",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
