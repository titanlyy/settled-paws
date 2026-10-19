import Image, { type ImageProps } from "next/image";

/**
 * Prefer next/image for raster; SVGs use unoptimized to avoid optimizer quirks on Vercel.
 * A soft sage tint sits behind every image so lazy-loading areas never look broken.
 */
export function SmartImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const isSvg = src.endsWith(".svg");
  return (
    // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through via props
    <Image
      {...props}
      unoptimized={isSvg || props.unoptimized}
      style={{
        backgroundColor: "var(--sage-100)",
        backgroundImage:
          "linear-gradient(135deg, var(--sage-100) 0%, var(--sage-50) 100%)",
        ...props.style,
      }}
    />
  );
}
