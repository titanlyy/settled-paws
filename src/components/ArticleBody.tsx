import { AdSlot } from "./AdSlot";

/**
 * Renders article HTML and inserts mid-article ad after the second H2 when possible.
 */
export function ArticleBody({ html }: { html: string }) {
  const parts = splitAtSecondH2(html);
  const intro = extractIntroAndRest(parts.before);

  return (
    <div className="article-prose">
      <div dangerouslySetInnerHTML={{ __html: intro.first }} />
      <AdSlot slot="in-article-intro" className="my-8 not-prose" />
      {intro.rest && (
        <div dangerouslySetInnerHTML={{ __html: intro.rest }} />
      )}
      {parts.after && (
        <>
          <AdSlot slot="in-article-mid" className="my-8 not-prose" />
          <div dangerouslySetInnerHTML={{ __html: parts.after }} />
        </>
      )}
    </div>
  );
}

function extractIntroAndRest(html: string): { first: string; rest: string } {
  // After first closing </p> following content start — insert intro ad
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
