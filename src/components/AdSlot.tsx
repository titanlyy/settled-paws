type AdSlotProps = {
  /**
   * Logical placement — map each to a real AdSense data-ad-slot after approval.
   * Do NOT invent publisher IDs here.
   */
  slot:
    | "in-article-intro"
    | "in-article-mid"
    | "in-article-end"
    | "sidebar"
    | "footer"
    | "homepage-below-hero"
    | "homepage-mid";
  className?: string;
  label?: string;
  /** Hide on mobile (e.g. desktop sidebar) — Better Ads friendly */
  desktopOnly?: boolean;
  /** Compact height for denser layouts */
  size?: "banner" | "rectangle" | "sidebar";
};

const SIZE_MIN: Record<NonNullable<AdSlotProps["size"]>, string> = {
  banner: "min-h-[90px]",
  rectangle: "min-h-[250px]",
  sidebar: "min-h-[280px]",
};

/**
 * Visible AdSense placeholder.
 *
 * After AdSense approval:
 * 1. Add the client script in layout.tsx (ca-pub-… from your account — never invent one).
 * 2. Replace the inner placeholder <div> with:
 *
 *    <ins
 *      className="adsbygoogle"
 *      style={{ display: "block" }}
 *      data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
 *      data-ad-slot="YOUR_SLOT_ID_FOR_THIS_PLACEMENT"
 *      data-ad-format="auto"
 *      data-full-width-responsive="true"
 *    />
 *    then: (window.adsbygoogle = window.adsbygoogle || []).push({});
 *
 * Keep the "Advertisement" label. Avoid popups / sticky overlays that violate Better Ads.
 */
export function AdSlot({
  slot,
  className = "",
  label = "Advertisement",
  desktopOnly = false,
  size = "banner",
}: AdSlotProps) {
  const minH = SIZE_MIN[size];

  return (
    <aside
      className={`ad-slot not-prose ${desktopOnly ? "hidden lg:block" : ""} ${className}`}
      aria-label={label}
      data-ad-placement={slot}
      data-ad-client-placeholder="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot-placeholder={`REPLACE_WITH_SLOT_ID_${slot}`}
      data-adsense-ready="false"
    >
      {/* ADSENSE: paste ca-pub-… into layout script; paste data-ad-slot for placement: {slot} */}
      <p className="mb-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted/80">
        {label}
      </p>
      <div
        className={`flex ${minH} flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-sage-300 bg-gradient-to-b from-sage-50 to-cream-dark/40 px-4 py-5 text-center shadow-inner`}
        data-ad-unit-mount={slot}
      >
        <span className="text-sm font-medium text-ink-muted">Ad placeholder</span>
        <span className="max-w-xs text-[11px] leading-snug text-ink-muted/80">
          Slot: <code className="rounded bg-white/80 px-1 py-0.5 text-[10px]">{slot}</code>
          <br />
          Paste AdSense <code className="text-[10px]"><ins></code> here after approval
        </span>
      </div>
    </aside>
  );
}
