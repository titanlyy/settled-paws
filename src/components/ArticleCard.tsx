import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { siteConfig } from "@/lib/site";

export function ArticleCard({
  article,
  priority = false,
}: {
  article: ArticleMeta;
  priority?: boolean;
}) {
  const category = siteConfig.categories.find(
    (c) => c.slug === article.category
  );

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-sm transition hover:border-forest/30 hover:shadow-md ${
        priority ? "sm:col-span-2 sm:flex-row" : ""
      }`}
    >
      <div
        className={`flex shrink-0 items-end bg-gradient-to-br from-forest to-sage-600 p-5 text-cream ${
          priority ? "sm:w-48 sm:items-center sm:justify-center" : "h-28"
        }`}
        aria-hidden
      >
        <PawIcon className={priority ? "h-12 w-12 opacity-90" : "h-8 w-8 opacity-80"} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="font-medium text-forest hover:underline"
            >
              {category.name}
            </Link>
          )}
          <span aria-hidden>·</span>
          <span>{article.readingMinutes} min read</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink group-hover:text-forest">
          <Link href={`/articles/${article.slug}`} className="stretched-link">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {article.description}
        </p>
        <p className="mt-4 text-sm font-medium text-forest">
          Read guide →
        </p>
      </div>
    </article>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 18c-2.5 0-4.5-1.2-5.5-3 .8-1.5 2.4-2.5 4.2-2.8.3-.8.9-1.5 1.7-1.9.7.4 1.3 1.1 1.6 1.9 1.8.3 3.4 1.3 4.2 2.8-1 1.8-3 3-5.2 3zm-4.8-9.2c.9 0 1.6-.8 1.6-1.7S8.1 5.4 7.2 5.4 5.6 6.2 5.6 7.1s.7 1.7 1.6 1.7zm9.6 0c.9 0 1.6-.8 1.6-1.7s-.7-1.7-1.6-1.7-1.6.8-1.6 1.7.7 1.7 1.6 1.7zM4.8 13.5c.9 0 1.6-.8 1.6-1.7S5.7 10 4.8 10 3.2 10.8 3.2 11.8s.7 1.7 1.6 1.7zm14.4 0c.9 0 1.6-.8 1.6-1.7S20.1 10 19.2 10s-1.6.8-1.6 1.8.7 1.7 1.6 1.7z" />
    </svg>
  );
}
