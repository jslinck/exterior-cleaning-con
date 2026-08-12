// Brand marks for EXTERIOR CON — official supplied logo assets.
//
// IMPORTANT: these are the client's locked, final brand PNGs
// (public/logos/ec-mark.png, public/logos/exterior-con-wordmark.png).
// Do not redraw, retrace, recolor, or otherwise recreate these in
// CSS/SVG — reference the files as-is. Sizing must scale the image
// proportionally (width OR height, never both independently) so the
// aspect ratio is always preserved.

import Image from "next/image";

// Intrinsic source dimensions — required by next/image, and used so
// every consumer scales proportionally instead of stretching either axis.
const MARK_SIZE = { width: 1536, height: 1024 };
const WORDMARK_SIZE = { width: 1536, height: 1024 };

// NOTE: `className` must supply sizing (e.g. "h-12 w-auto" or
// "w-full h-auto") — intentionally no default h-*/w-* here, since mixing
// a default with a caller override is unreliable across Tailwind's
// cascade. Always pass both axes explicitly (one fixed, one `auto`) so
// the image scales proportionally instead of stretching.

export function Mark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logos/ec-mark.png"
      alt="EXTERIOR CON"
      width={MARK_SIZE.width}
      height={MARK_SIZE.height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}

export function Wordmark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logos/exterior-con-wordmark.png"
      alt="EXTERIOR CON — Build · Scale · Dominate"
      width={WORDMARK_SIZE.width}
      height={WORDMARK_SIZE.height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
