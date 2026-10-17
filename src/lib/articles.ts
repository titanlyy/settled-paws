import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import readingTime from "reading-time";
import type { CategorySlug } from "./site";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export type ArticleFrontmatter = {
  title: string;
  description: string;
  category: CategorySlug;
  keywords: string[];
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  related?: string[];
};

export type ArticleMeta = ArticleFrontmatter & {
  slug: string;
  readingMinutes: number;
  wordCount: number;
};

export type Article = ArticleMeta & {
  contentHtml: string;
  contentMarkdown: string;
};

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith(".md"));
}

export function getAllArticles(): ArticleMeta[] {
  const files = getMarkdownFiles();
  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(articlesDirectory, filename), "utf8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    return {
      slug,
      ...(data as ArticleFrontmatter),
      readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
      wordCount,
    };
  });

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleSlugs(): string[] {
  return getMarkdownFiles().map((f) => f.replace(/\.md$/, ""));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(gfm).use(html).process(content);
  const stats = readingTime(content);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    ...(data as ArticleFrontmatter),
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    wordCount,
    contentHtml: processed.toString(),
    contentMarkdown: content,
  };
}

export function getArticlesByCategory(category: CategorySlug): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticles(limit = 6): ArticleMeta[] {
  const all = getAllArticles();
  const featured = all.filter((a) => a.featured);
  const pool = featured.length ? featured : all;
  return pool.slice(0, limit);
}

export function getRelatedArticles(
  slug: string,
  relatedSlugs: string[] | undefined,
  category: CategorySlug,
  limit = 3
): ArticleMeta[] {
  const all = getAllArticles().filter((a) => a.slug !== slug);
  const related: ArticleMeta[] = [];

  if (relatedSlugs?.length) {
    for (const s of relatedSlugs) {
      const found = all.find((a) => a.slug === s);
      if (found) related.push(found);
    }
  }

  for (const a of all) {
    if (related.length >= limit) break;
    if (a.category === category && !related.some((r) => r.slug === a.slug)) {
      related.push(a);
    }
  }

  for (const a of all) {
    if (related.length >= limit) break;
    if (!related.some((r) => r.slug === a.slug)) related.push(a);
  }

  return related.slice(0, limit);
}
