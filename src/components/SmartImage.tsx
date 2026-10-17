import Image, { type ImageProps } from "next/image";

/**
 * Prefer next/image for raster; SVGs use unoptimized to avoid optimizer quirks on Vercel.
 */
export function SmartImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const isSvg = src.endsWith(".svg");
  return <Image {...props} unoptimized={isSvg || props.unoptimized} />;
}
