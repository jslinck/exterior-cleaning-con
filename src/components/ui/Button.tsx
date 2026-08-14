import Link from "next/link";
import { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-ember text-ink hover:bg-ember-light active:scale-[0.98] shadow-[0_0_0_0_rgba(255,106,12,0)] hover:shadow-[0_8px_30px_-6px_rgba(255,106,12,0.6)]",
  secondary:
    "bg-transparent text-bone border border-bone/30 hover:border-bone hover:bg-bone/5 active:scale-[0.98]",
  ghost: "bg-transparent text-bone hover:text-ember",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

// Shared with CheckoutPopupButton so both stay visually identical without
// duplicating the style rules.
export function buttonClasses(
  variant: NonNullable<CommonProps["variant"]> = "primary",
  size: NonNullable<CommonProps["size"]> = "md",
  className = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: CommonProps & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = buttonClasses(variant, size, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
