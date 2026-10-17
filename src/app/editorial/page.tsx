import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial & Affiliate Policy",
  description:
    "How Settled Paws creates content, handles corrections, affiliates, and advertising disclosures.",
  alternates: { canonical: `${siteConfig.url}/editorial` },
};

export default function EditorialPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        Editorial &amp; affiliate policy
      </h1>
      <div className="article-prose mt-8">
        <h2>Editorial standards</h2>
        <ul>
          <li>Original writing focused on actionable home-owner training.</li>
          <li>Positive-reinforcement methods preferred; no promotion of pain-based tools.</li>
          <li>Clear disclaimers: not veterinary advice.</li>
          <li>Author persona transparency on the <Link href="/author">Author</Link> page.</li>
          <li>We do not publish scraped or spun thin content.</li>
        </ul>
        <h2>Corrections</h2>
        <p>
          If you spot an error, email us via <Link href="/contact">Contact</Link>.
          Substantive corrections are updated on the article with a revised date
          when appropriate.
        </p>
        <h2>Affiliate disclosure</h2>
        <p>
          Some articles may include affiliate links. If you purchase through
          those links, we may earn a commission at no extra cost to you. Reviews
          and recommendations will reflect honest fit-and-welfare criteria, not
          commission rate alone. Affiliate relationships will be disclosed in
          or near relevant content when used.
        </p>
        <h2>Advertising</h2>
        <p>
          We may use Google AdSense or similar. Ads are labeled “Advertisement.”
          We avoid pop-ups, full-screen interstitials, and ads-only above-the-fold
          layouts. Content remains primary. See{" "}
          <Link href="/privacy">Privacy Policy</Link> for cookies and opt-outs.
        </p>
        <h2>Product mentions</h2>
        <p>
          Gear guides discuss categories and fit principles. Specific brand
          call-outs, if any, are illustrative unless clearly marked as sponsored
          (we currently do not run sponsored posts by default).
        </p>
      </div>
    </main>
  );
}
