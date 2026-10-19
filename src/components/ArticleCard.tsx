import { SmartImage as Image } from "@/components/SmartImage";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { articleImage } from "@/lib/articles";
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
  const src = articleImage(article);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-sm transition hover:border-forest/30 hover:shadow-md`}
    >
      <div
        className="img-shell relative aspect-[16/9] w-full shrink-0 overflow-hidden"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 100vw, 33vw"
          priority={priority}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="relative z-10 font-medium text-forest hover:underline"
            >
              {category.name}
            </Link>
          )}
          <span aria-hidden>·</span>
          <span>{article.readingMinutes} min read</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink group-hover:text-forest">
          <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {article.description}
        </p>
        <p className="mt-4 text-sm font-medium text-forest">Read guide →</p>
      </div>
    </article>
  );
}
