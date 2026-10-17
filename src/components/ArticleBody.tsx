import Image from "next/image";
import { AdSlot } from "./AdSlot";

type Figure = { src: string; alt: string };

/**
 * Renders article HTML, inserts intro/mid ad slots, and interleaves figures.
 */
export function ArticleBody({
  html,
  figures = [],
  title,
}: {
  html: string;
  figures?: string[];
  title: string;
}) {
  const parts = splitAtSecondH2(html);
  const intro = extractIntroAndRest(parts.before);
  const fig0 = figures[0]
    ? { src: figures[0], alt: `Illustration for ${title}` }
    : null;
  const fig1 = figures[1]
    ? { src: figures[1], alt: `Training diagram related to ${title}` }
    : null;

  return (
    <div className="article-prose">
      <div dangerouslySetInnerHTML={{ __html: intro.first }} />
      <AdSlot slot="in-article-intro" className="my-8" size="banner" />
      {intro.rest && (
        <div dangerouslySetInnerHTML={{ __html: intro.rest }} />
      )}
      {fig0 && <ArticleFigure figure={fig0} />}
      {parts.after && (
        <>
          <AdSlot slot="in-article-mid" className="my-8" size="rectangle" />
          <div dangerouslySetInnerHTML={{ __html: parts.after }} />
        </>
      )}
      {fig1 && <ArticleFigure figure={fig1} />}
    </div>
  );
}

function ArticleFigure({ figure }: { figure: Figure }) {
  return (
    <figure className="not-prose my-10 overflow-hidden rounded-2xl border border-sage-200 bg-sage-50 shadow-sm">
      <div className="relative aspect-[720/280] w-full">
        <Image
          src={figure.src}
          alt={figure.alt}
          fill
          className="object-contain p-2 sm:p-4"
          sizes="(max-width:768px) 100vw, 720px"
        />
      </div>
      <figcaption className="border-t border-sage-200 px-4 py-2 text-center text-xs text-ink-muted">
        {figure.alt}
      </figcaption>
    </figure>
  );
}

function extractIntroAndRest(html: string): { first: string; rest: string } {
  const match = html.match(/<\/p>/i);
  if (!match || match.index === undefined) {
    return { first: html, rest: "" };
  }
  const cut = match.index + match[0].length;
  return { first: html.slice(0, cut), rest: html.slice(cut) };
}

function splitAtSecondH2(html: string): { before: string; after: string } {
  const re = /<h2[\s>]/gi;
  let count = 0;
  let idx = -1;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    count += 1;
    if (count === 2) {
      idx = m.index;
      break;
    }
  }
  if (idx === -1) return { before: html, after: "" };
  return { before: html.slice(0, idx), after: html.slice(idx) };
}
