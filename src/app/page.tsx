import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Newsletter } from "@/components/Newsletter";
import { TrustStrip } from "@/components/TrustStrip";
import { getFeaturedArticles, getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedArticles(6);
  const latest = getAllArticles().slice(0, 3);

  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-sage-200 bg-gradient-to-br from-cream via-sage-50 to-sky-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-forest">
              Positive reinforcement · Apartment-aware
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Calm training plans for real homes—and real dogs.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="inline-flex rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-cream shadow-sm transition hover:bg-forest-dark"
              >
                Browse guides
              </Link>
              <Link
                href="/category/puppy-basics"
                className="inline-flex rounded-xl border border-sage-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-forest hover:text-forest"
              >
                Start with puppy basics
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-sage-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <p className="font-display text-lg font-semibold text-ink">
              How Settled Paws helps
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
              <li className="flex gap-2">
                <span className="text-forest" aria-hidden>
                  ✓
                </span>
                Week-by-week and day-by-day plans you can follow after work.
              </li>
              <li className="flex gap-2">
                <span className="text-forest" aria-hidden>
                  ✓
                </span>
                Apartment logistics: elevators, shared walls, no yard.
              </li>
              <li className="flex gap-2">
                <span className="text-forest" aria-hidden>
                  ✓
                </span>
                Clear lines for when DIY stops and professionals step in.
              </li>
              <li className="flex gap-2">
                <span className="text-forest" aria-hidden>
                  ✓
                </span>
                Honest gear guidance—no fear-based tools.
              </li>
            </ul>
            <p className="mt-5 text-xs text-ink-muted">
              Written for home owners · Educational, not veterinary advice
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6">
        <DisclaimerBanner compact />

        <TrustStrip />

        <section aria-labelledby="featured-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2
                id="featured-heading"
                className="font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                Featured guides
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Cornerstone articles for the problems home owners ask about most.
              </p>
            </div>
            <Link
              href="/articles"
              className="hidden text-sm font-semibold text-forest hover:underline sm:inline"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((article, i) => (
              <ArticleCard
                key={article.slug}
                article={article}
                priority={i === 0}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="cats-heading">
          <h2
            id="cats-heading"
            className="font-display text-2xl font-semibold text-ink"
          >
            Browse by topic
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="block h-full rounded-2xl border border-sage-200 bg-white p-5 shadow-sm transition hover:border-forest/40 hover:shadow-md"
                >
                  <p className="font-display text-lg font-semibold text-ink">
                    {c.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {c.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="latest-heading">
          <h2
            id="latest-heading"
            className="font-display text-2xl font-semibold text-ink"
          >
            Recently updated
          </h2>
          <ul className="mt-4 divide-y divide-sage-200 rounded-2xl border border-sage-200 bg-white">
            {latest.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="flex flex-col gap-1 px-5 py-4 transition hover:bg-sage-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-medium text-ink">{a.title}</span>
                  <span className="text-xs text-ink-muted">
                    {a.readingMinutes} min ·{" "}
                    {new Date(a.updatedAt || a.publishedAt).toLocaleDateString(
                      "en-SG",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Newsletter />
      </div>
    </main>
  );
}
