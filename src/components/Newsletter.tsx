"use client";

export function Newsletter() {
  return (
    <section
      className="rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-sky-50 p-6 sm:p-8"
      aria-labelledby="newsletter-heading"
    >
      <h2
        id="newsletter-heading"
        className="font-display text-xl font-semibold text-ink sm:text-2xl"
      >
        Quiet tips for busy homes
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
        Occasional training notes—settle skills, alone-time ladders, apartment
        manners. No spam. Placeholder form (wire to your ESP later).
      </p>
      <form
        className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row"
        onSubmit={(e) => e.preventDefault()}
        action="#"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full flex-1 rounded-xl border border-sage-300 bg-white px-4 py-2.5 text-sm text-ink outline-none ring-forest focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-dark"
        >
          Notify me
        </button>
      </form>
      <p className="mt-2 text-xs text-ink-muted">
        By signing up you agree to our{" "}
        <a href="/privacy" className="underline hover:text-forest">
          Privacy Policy
        </a>
        .
      </p>
    </section>
  );
}
