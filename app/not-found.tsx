import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center section-padding">
      <h1 className="text-8xl md:text-9xl font-bold tracking-tighter">
        4<span className="text-accent">0</span>4
      </h1>
      <p className="mt-4 font-mono text-text-muted">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:bg-bg-elevated"
      >
        Back to home
      </Link>
    </main>
  );
}
