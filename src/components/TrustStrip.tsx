const items = [
  {
    title: "Positive reinforcement",
    body: "Reward-based plans that build trust—no fear or pain-based tools.",
  },
  {
    title: "Apartment-aware",
    body: "Quiet living, shared walls, elevators, and tiny bathrooms considered.",
  },
  {
    title: "Step-by-step",
    body: "Day plans, week ladders, and checklists you can actually follow.",
  },
  {
    title: "Know when to call help",
    body: "Clear lines for when DIY stops and professionals should step in.",
  },
];

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="py-2">
      <h2 id="trust-heading" className="sr-only">
        Why Settled Paws
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-sage-200 bg-white p-5 shadow-sm"
          >
            <p className="font-display text-base font-semibold text-ink">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
