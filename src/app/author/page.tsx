import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Author — Alex Rivera",
  description: siteConfig.author.bio,
  alternates: { canonical: `${siteConfig.url}/author` },
};

export default function AuthorPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-forest">
        Editorial
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {siteConfig.author.name}
      </h1>
      <p className="mt-2 text-ink-muted">{siteConfig.author.role}</p>
      <div className="article-prose mt-8">
        <p>{siteConfig.author.bio}</p>
        <h2>Transparency</h2>
        <p>
          “Alex Rivera” is the <strong>content persona</strong> for Settled
          Paws—a consistent editorial voice for home-based training articles.
          This site does <strong>not</strong> claim that Alex holds veterinary
          licenses, board certifications in behavior, or professional trainer
          credentials. Advice is educational and synthesized from
          positive-reinforcement best practices commonly taught to pet owners.
        </p>
        <h2>Writing approach</h2>
        <ul>
          <li>Prefer management + reinforcement over punishment.</li>
          <li>Favor apartment-realistic logistics.</li>
          <li>State when to stop DIY and hire help.</li>
          <li>Avoid fear-based tool recommendations.</li>
        </ul>
        <p>
          <Link href="/editorial">Editorial policy</Link> ·{" "}
          <Link href="/contact">Contact</Link> ·{" "}
          <Link href="/articles">All guides</Link>
        </p>
      </div>
    </main>
  );
}
