import type { Metadata } from "next";
import { SmartImage as Image } from "@/components/SmartImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/articles";
import { siteConfig, type CategorySlug } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return siteConfig.categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = siteConfig.categories.find((c) => c.slug === slug);
  if (!category) return { title: "Not found" };
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `${siteConfig.url}/category/${category.slug}` },
    openGraph: {
      images: [`/images/categories/${category.slug}.svg`],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = siteConfig.categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(slug as CategorySlug);

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span aria-hidden> / </span>
        <span>{category.name}</span>
      </nav>
      <header className="mt-4 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-center">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 text-ink-muted">{category.description}</p>
        </div>
        <div className="relative hidden aspect-[16/9] overflow-hidden rounded-2xl border border-sage-200 bg-sage-50 lg:block">
          <Image
            src={`/images/categories/${category.slug}.svg`}
            alt=""
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      </header>
      {articles.length === 0 ? (
        <p className="mt-10 text-ink-muted">Guides coming soon.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
