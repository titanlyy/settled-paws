import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center"
    >
      <h1 className="font-display text-3xl font-semibold text-ink">
        Page not found
      </h1>
      <p className="mt-3 text-ink-muted">
        That link may be outdated. Try the guides index.
      </p>
      <Link
        href="/articles"
        className="mt-6 rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-cream hover:bg-forest-dark"
      >
        Browse articles
      </Link>
    </main>
  );
}
