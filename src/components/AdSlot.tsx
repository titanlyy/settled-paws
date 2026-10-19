type AdSize = "banner" | "rectangle" | "sidebar";

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
  /** Matches the real AdSense unit this placement is meant to hold */
  size?: AdSize;
};

/**
 * Minimum heights match standard AdSense units so the layout does not shift
 * when real ads replace the placeholders:
 * - banner:    728×90 leaderboard / responsive horizontal  → min-h 90px
 * - rectangle: 336×280 large rectangle (or 300×250)        → min-h 280px
 * - sidebar:   300×250 medium rectangle (300×600 optional) → min-h 250px
 */
const SIZE_SPEC: Record<AdSize, { minH: string; dims: string; note: string }> = {
  banner: {
    minH: "min-h-[90px]",
    dims: "728×90",
    note: "responsive banner",
  },
  rectangle: {
    minH: "min-h-[280px]",
    dims: "336×280",
    note: "large rectangle (300×250 also fits)",
  },
  sidebar: {
    minH: "min-h-[250px]",
    dims: "300×250",
    note: "sidebar (300×600 optional)",
  },
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
 * Note: ad blockers hide `.ad-slot` elements — that is expected; real ads are blocked too.
 */
export function AdSlot({
  slot,
  className = "",
  label = "Advertisement",
  desktopOnly = false,
  size = "banner",
}: AdSlotProps) {
  const spec = SIZE_SPEC[size];

  return (
    <aside
      className={`ad-slot not-prose ${desktopOnly ? "hidden lg:block" : ""} ${className}`}
      aria-label={label}
      data-ad-placement={slot}
      data-ad-size={size}
      data-ad-client-placeholder="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot-placeholder={`REPLACE_WITH_SLOT_ID_${slot}`}
      data-adsense-ready="false"
    >
      {/* ADSENSE: paste ca-pub-… into layout script; paste data-ad-slot for placement: {slot} */}
      <div
        className={`flex ${spec.minH} w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-sage-600 bg-sage-100/70 px-4 py-3 text-center`}
        data-ad-unit-mount={slot}
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
          {label}
        </span>
        <span className="text-sm font-semibold text-ink">
          {spec.dims}{" "}
          <span className="font-normal text-ink-muted">/ {spec.note}</span>
        </span>
        <span className="text-[11px] leading-snug text-ink-muted">
          Placement:{" "}
          <code className="rounded bg-white/80 px-1 py-0.5 text-[10px]">{slot}</code>
          {size !== "banner" && (
            <>
              <br />
              Paste AdSense <code className="text-[10px]">{"<ins>"}</code> here after approval
            </>
          )}
        </span>
      </div>
    </aside>
  );
}
