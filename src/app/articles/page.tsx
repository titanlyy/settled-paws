import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "All training guides",
  description:
    "Browse all Settled Paws dog training guides—puppy basics, barking, alone time, leash skills, and gear.",
  alternates: { canonical: `${siteConfig.url}/articles` },
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          All guides
        </h1>
        <p className="mt-3 text-ink-muted">
          Practical, positive-reinforcement articles for home owners.{" "}
          {articles.length} guides and growing.
        </p>
      </header>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
