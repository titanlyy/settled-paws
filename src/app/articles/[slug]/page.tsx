import type { Metadata } from "next";
import { SmartImage as Image } from "@/components/SmartImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard } from "@/components/ArticleCard";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { JsonLd } from "@/components/JsonLd";
import {
  articleImage,
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
} from "@/lib/articles";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not found" };
  const url = `${siteConfig.url}/articles/${article.slug}`;
  const image = articleImage(article);
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: siteConfig.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [siteConfig.author.name],
      images: [{ url: image, width: 800, height: 450, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const category = siteConfig.categories.find(
    (c) => c.slug === article.category
  );
  const related = getRelatedArticles(
    article.slug,
    article.related,
    article.category
  );
  const url = `${siteConfig.url}/articles/${article.slug}`;
  const image = articleImage(article);
  const figures = article.figures || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    image: `${siteConfig.url}${image}`,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      description: siteConfig.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: url,
    keywords: article.keywords.join(", "),
  };

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={jsonLd} />
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <article>
          <nav className="text-sm text-ink-muted" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-forest">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/articles" className="hover:text-forest">
                  Articles
                </Link>
              </li>
              {category && (
                <>
                  <li aria-hidden>/</li>
                  <li>
                    <Link
                      href={`/category/${category.slug}`}
                      className="hover:text-forest"
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>

          <header className="mt-4">
            {category && (
              <Link
                href={`/category/${category.slug}`}
                className="text-sm font-semibold text-forest hover:underline"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {article.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
              <Link href="/author" className="font-medium text-ink hover:text-forest">
                {siteConfig.author.name}
              </Link>
              <span aria-hidden>·</span>
              <time dateTime={article.updatedAt || article.publishedAt}>
                Updated{" "}
                {new Date(
                  article.updatedAt || article.publishedAt
                ).toLocaleDateString("en-SG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span>{article.readingMinutes} min read</span>
            </div>
          </header>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-sage-200 img-shell shadow-sm">
            <Image
              src={image}
              alt={`Featured illustration for ${article.title}`}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 800px"
              priority
            />
          </div>

          <div className="mt-6">
            <DisclaimerBanner compact />
          </div>

          <div className="mt-8">
            <ArticleBody
              html={article.contentHtml}
              figures={figures}
              title={article.title}
            />
          </div>

          <AdSlot slot="in-article-end" className="my-10" size="banner" />

          <footer className="mt-8 rounded-2xl border border-sage-200 bg-sage-50 p-5">
            <p className="text-sm leading-relaxed text-ink-muted">
              Written by{" "}
              <Link href="/author" className="font-medium text-forest hover:underline">
                {siteConfig.author.name}
              </Link>{" "}
              for {siteConfig.name}. See our{" "}
              <Link href="/editorial" className="underline hover:text-forest">
                editorial &amp; affiliate policy
              </Link>
              . {siteConfig.disclaimer}
            </p>
          </footer>

          {related.length > 0 && (
            <section className="mt-12" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="font-display text-2xl font-semibold text-ink"
              >
                Related guides
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <ArticleCard key={r.slug} article={r} />
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="space-y-6 lg:pt-16" aria-label="Sidebar">
          <AdSlot slot="sidebar" desktopOnly size="sidebar" />
          <div className="rounded-2xl border border-sage-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <p className="font-display text-base font-semibold text-ink">
              On this site
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {siteConfig.categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-ink-muted hover:text-forest"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="text-ink-muted hover:text-forest">
                  About Settled Paws
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/when-to-hire-professional-trainer"
                  className="text-ink-muted hover:text-forest"
                >
                  When to hire a trainer
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
