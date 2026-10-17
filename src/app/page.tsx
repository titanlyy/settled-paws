import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
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
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
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
          <div className="relative aspect-[800/520] overflow-hidden rounded-3xl border border-sage-200 bg-white shadow-sm">
            <Image
              src="/images/site/hero.svg"
              alt="Stylized illustration of calm dogs settling at home in an apartment"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 420px"
              priority
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6">
        <DisclaimerBanner compact />

        {/* Homepage ad — below hero content, not ads-only above the fold */}
        <AdSlot slot="homepage-below-hero" size="banner" />

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

        <AdSlot slot="homepage-mid" size="banner" />

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
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-sm transition hover:border-forest/40 hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] bg-sage-50">
                    <Image
                      src={`/images/categories/${c.slug}.svg`}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-display text-lg font-semibold text-ink group-hover:text-forest">
                      {c.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {c.description}
                    </p>
                  </div>
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
          <ul className="mt-4 divide-y divide-sage-200 overflow-hidden rounded-2xl border border-sage-200 bg-white">
            {latest.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="flex gap-4 px-4 py-4 transition hover:bg-sage-50 sm:items-center sm:justify-between sm:px-5"
                >
                  <span className="relative hidden h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-sage-100 sm:block">
                    <Image
                      src={a.image || `/images/articles/${a.slug}-featured.svg`}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </span>
                  <span className="min-w-0 flex-1 font-medium text-ink">
                    {a.title}
                  </span>
                  <span className="shrink-0 text-xs text-ink-muted">
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
