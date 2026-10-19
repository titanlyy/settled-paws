import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Settled Paws—our mission, who we write for, and how we create problem-focused dog training content for home owners.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        About {siteConfig.name}
      </h1>
      <div className="article-prose mt-8">
        <p>
          Settled Paws exists for people who live with dogs in ordinary
          homes—apartments, shared walls, busy jobs, and all. We publish
          problem-focused training guides rooted in{" "}
          <strong>positive reinforcement</strong>: clear plans for puppies,
          barking, alone time, leash manners, and gear choices that do not rely
          on fear or pain.
        </p>
        <h2>Who it&apos;s for</h2>
        <p>
          First-time puppy guardians, apartment dwellers, and home owners who
          want practical week-by-week help without kennel-club jargon or
          dominance myths. If you need clinical behavior therapy, we point you
          toward veterinarians and qualified professionals.
        </p>
        <h2>How content is made</h2>
        <p>
          Articles are written and edited for clarity, step-by-step usefulness,
          and alignment with widely taught reward-based training practices. We
          synthesize established positive-reinforcement approaches into
          home-friendly schedules. We do <strong>not</strong> invent fake case
          studies with real people&apos;s names, fake certifications, or
          veterinary diagnoses.
        </p>
        <p>
          Meet our editorial persona on the{" "}
          <Link href="/author">Author</Link> page. Read how we handle affiliates
          and corrections in our{" "}
          <Link href="/editorial">Editorial &amp; affiliate policy</Link>.
        </p>
        <h2>What we are not</h2>
        <p>
          We are not a veterinary clinic, a certified behavior board, or a
          replacement for hands-on training when safety is at stake. Educational
          content only—see the disclaimer on every article.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about the site or content?{" "}
          <Link href="/contact">Contact us</Link>.
        </p>
      </div>
    </main>
  );
}
