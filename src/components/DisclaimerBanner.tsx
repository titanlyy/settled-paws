import { siteConfig } from "@/lib/site";

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={`rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-amber-950 ${
        compact ? "text-xs" : "text-sm"
      }`}
      role="note"
    >
      <p className={`leading-relaxed ${compact ? "" : "sm:leading-relaxed"}`}>
        <strong className="font-semibold">Not veterinary advice.</strong>{" "}
        {compact
          ? "Educational content only. Aggression, severe anxiety, or medical concerns → see a vet and qualified professional."
          : siteConfig.disclaimer}
      </p>
    </aside>
  );
}
