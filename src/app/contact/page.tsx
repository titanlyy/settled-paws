import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} about content, corrections, or partnership inquiries.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  const mail = "hello@settledpaws.com";
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        Contact
      </h1>
      <p className="mt-3 text-ink-muted">
        We read every message about corrections, content questions, and
        privacy requests. We cannot provide personalized veterinary or
        aggression rehab plans by email.
      </p>

      <div className="mt-8 rounded-2xl border border-sage-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-ink">Email</p>
        <p className="mt-2">
          <a
            href={`mailto:${mail}?subject=Settled%20Paws%20inquiry`}
            className="text-forest underline hover:text-forest-dark"
          >
            {mail}
          </a>
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          Replace this address with your real inbox before launch. For privacy
          requests, include “Privacy” in the subject line.
        </p>
      </div>

      <form
        className="mt-8 space-y-4 rounded-2xl border border-sage-200 bg-sage-50 p-6"
        action={`mailto:${mail}`}
        method="get"
        encType="text/plain"
      >
        <p className="font-display text-lg font-semibold text-ink">
          Quick message form
        </p>
        <p className="text-sm text-ink-muted">
          Opens your email client (placeholder). Wire to a form backend later if
          you prefer.
        </p>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-sage-300 bg-white px-3 py-2 text-sm outline-none ring-forest focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-xl border border-sage-300 bg-white px-3 py-2 text-sm outline-none ring-forest focus:ring-2"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-ink"
          >
            Message
          </label>
          <textarea
            id="message"
            name="body"
            required
            rows={5}
            className="mt-1 w-full rounded-xl border border-sage-300 bg-white px-3 py-2 text-sm outline-none ring-forest focus:ring-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-cream hover:bg-forest-dark"
        >
          Open email draft
        </button>
      </form>
    </main>
  );
}
