import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}, including cookies, analytics, and advertising (AdSense) disclosures.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Last updated: October 8, 2026 · Effective for {siteConfig.url}
      </p>
      <div className="article-prose mt-8">
        <p>
          This Privacy Policy explains how {siteConfig.name} (“we,” “us”)
          handles information when you visit our website. We aim to be clear
          enough for readers and for advertising program reviews.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Log &amp; device data:</strong> When you visit, hosting
            providers may automatically collect IP address, browser type,
            general location, and pages viewed.
          </li>
          <li>
            <strong>Contact info:</strong> If you email us or use a contact
            form, we receive the information you submit.
          </li>
          <li>
            <strong>Cookies &amp; similar tech:</strong> Used for site function,
            analytics (when enabled), and advertising (when enabled).
          </li>
        </ul>
        <h2>Google AdSense &amp; advertising cookies</h2>
        <p>
          When we participate in Google AdSense or similar networks, third
          parties may use cookies to serve ads based on prior visits to this
          and other websites. Google&apos;s use of advertising cookies enables
          it and its partners to serve ads based on your visit to this site
          and/or other sites on the Internet.
        </p>
        <p>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Ads Settings
          </a>
          . You can also visit{" "}
          <a
            href="https://www.aboutads.info/choices/"
            rel="noopener noreferrer"
            target="_blank"
          >
            www.aboutads.info
          </a>{" "}
          for more opt-out options.
        </p>
        <p>
          AdSense publisher IDs and slots will be configured after approval. We
          do not currently embed live ad code with a real publisher ID on this
          codebase until you add it.
        </p>
        <h2>Analytics (placeholder)</h2>
        <p>
          We may use privacy-friendly or standard analytics (for example,
          Google Analytics or Plausible). When enabled, those tools process
          usage data under their respective policies. Update this section with
          the exact tools you install.
        </p>
        <h2>How we use information</h2>
        <ul>
          <li>Operate and improve the website</li>
          <li>Respond to messages you send</li>
          <li>Measure aggregate traffic</li>
          <li>Serve and measure advertisements (when enabled)</li>
          <li>Comply with legal obligations</li>
        </ul>
        <h2>Data sharing</h2>
        <p>
          We share data with service providers who help us host the site, serve
          ads, or analyze traffic—only as needed to provide those services. We
          do not sell your email address. Legal requests may require disclosure.
        </p>
        <h2>Children</h2>
        <p>
          This site is intended for a general audience interested in dog
          training for home owners. We do not knowingly collect personal
          information from children under 13 (or under 16 where applicable).
        </p>
        <h2>Your choices</h2>
        <p>
          You can control cookies via browser settings. For access, correction,
          or deletion requests related to information you sent us directly,
          email the address on our <Link href="/contact">Contact</Link> page.
        </p>
        <h2>Changes</h2>
        <p>
          We may update this policy. The “Last updated” date will change when we
          do. Continued use after changes means you acknowledge the updated
          policy.
        </p>
        <h2>Contact</h2>
        <p>
          Privacy questions: see <Link href="/contact">Contact</Link>.
        </p>
      </div>
    </main>
  );
}
