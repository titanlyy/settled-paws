type AdSlotProps = {
  /** Logical placement id — replace with real AdSense slot IDs later */
  slot:
    | "in-article-intro"
    | "in-article-mid"
    | "in-article-end"
    | "sidebar"
    | "footer"
    | "auto-placeholder";
  className?: string;
  label?: string;
  /** Hide on mobile (e.g. desktop sidebar) */
  desktopOnly?: boolean;
};

/**
 * AdSense placeholder.
 *
 * When approved, replace the inner div with something like:
 *
 * <ins className="adsbygoogle"
 *   style={{ display: "block" }}
 *   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *   data-ad-slot="XXXXXXXXXX"
 *   data-ad-format="auto"
 *   data-full-width-responsive="true" />
 *
 * And run: (window.adsbygoogle = window.adsbygoogle || []).push({});
 *
 * Auto ads: add the AdSense script in layout.tsx (see comment there).
 */
export function AdSlot({
  slot,
  className = "",
  label = "Advertisement",
  desktopOnly = false,
}: AdSlotProps) {
  return (
    <aside
      className={`ad-slot ${desktopOnly ? "hidden lg:block" : ""} ${className}`}
      aria-label={label}
      data-ad-slot={slot}
      data-ad-client-placeholder="ca-pub-XXXXXXXXXXXXXXXX"
    >
      <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-widest text-ink-muted/70">
        {label}
      </p>
      <div
        className="flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-sage-300 bg-sage-50/80 px-4 py-6 text-center text-xs text-ink-muted"
        // Paste real AdSense <ins> unit here for slot: {slot}
      >
        <span>
          Ad placeholder ({slot})
          <br />
          <span className="opacity-70">
            Replace with AdSense unit — keep labeled &amp; content-first
          </span>
        </span>
      </div>
    </aside>
  );
}
