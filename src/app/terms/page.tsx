import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${siteConfig.name} website content and services.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-ink-muted">Last updated: October 8, 2026</p>
      <div className="article-prose mt-8">
        <p>
          By accessing {siteConfig.name}, you agree to these Terms of Use. If
          you do not agree, please do not use the site.
        </p>
        <h2>Educational content only</h2>
        <p>
          Articles are for general educational purposes and are{" "}
          <strong>not veterinary advice</strong>, not a diagnosis, and not a
          substitute for personalized training when safety is involved. Always
          consult a veterinarian for medical concerns and a qualified
          professional for aggression or severe anxiety.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Site content is owned by {siteConfig.name} unless otherwise noted. You
          may not copy articles wholesale for republication without permission.
          Short quotations with credit and a link are welcome.
        </p>
        <h2>User conduct</h2>
        <p>
          Do not misuse the site, attempt unauthorized access, or use content to
          build competing scraped doorway pages.
        </p>
        <h2>Affiliate &amp; ads</h2>
        <p>
          We may display advertisements and affiliate links as described in our{" "}
          <Link href="/editorial">Editorial policy</Link> and{" "}
          <Link href="/privacy">Privacy Policy</Link>. Ad placement strives to
          follow Better Ads / user-experience norms.
        </p>
        <h2>Disclaimer of warranties</h2>
        <p>
          The site is provided “as is.” We do not warrant uninterrupted access
          or that training outcomes will match examples. Dogs are individuals.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {siteConfig.name} is not
          liable for indirect or consequential damages arising from use of the
          site or reliance on content.
        </p>
        <h2>Changes</h2>
        <p>
          We may update these terms. Continued use after updates constitutes
          acceptance of the revised terms.
        </p>
        <h2>Contact</h2>
        <p>
          Questions: <Link href="/contact">Contact</Link>.
        </p>
      </div>
    </main>
  );
}
