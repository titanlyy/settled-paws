import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { AdSlot } from "./AdSlot";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-sage-200 bg-sage-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <AdSlot
          slot="footer"
          className="mb-8"
          label="Advertisement"
          size="banner"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-lg font-semibold text-ink">
              {siteConfig.name}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.tagline}. Positive-reinforcement guides for busy
              households and apartment living.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/articles" className="text-ink hover:text-forest">
                  All articles
                </Link>
              </li>
              {siteConfig.categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-ink hover:text-forest"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Trust
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-ink hover:text-forest">
                  About
                </Link>
              </li>
              <li>
                <Link href="/author" className="text-ink hover:text-forest">
                  Author
                </Link>
              </li>
              <li>
                <Link href="/editorial" className="text-ink hover:text-forest">
                  Editorial policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink hover:text-forest">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-ink hover:text-forest">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-ink hover:text-forest">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-sage-200 pt-6">
          <p className="text-xs leading-relaxed text-ink-muted">
            {siteConfig.disclaimer}
          </p>
          <p className="mt-4 text-xs text-ink-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
