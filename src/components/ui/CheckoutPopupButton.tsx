"use client";

import { ReactNode, MouseEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";

// Ticket Tailor's own pop-out widget can't carry our referral-code
// metadata (its loadEvent() call only accepts a box office name, event
// id, and one of their own tracking tags — no slot for custom data), so
// this opens our own attribution-tagged checkout link in a real popup
// window instead of Ticket Tailor's script. A window.open() opened
// synchronously inside a click handler is not blocked by popup blockers;
// if it somehow still fails (e.g. the visitor already blocked popups from
// this site), fall back to a normal same-tab navigation so the sale is
// never lost to a silent no-op.
export function CheckoutPopupButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const popup = window.open(
      href,
      "exteriorcon-checkout",
      "width=520,height=840,resizable=yes,scrollbars=yes",
    );
    if (!popup) {
      window.location.href = href;
    } else {
      popup.focus();
    }
  }

  return (
    <a href={href} onClick={handleClick} className={buttonClasses(variant, size, className)}>
      {children}
    </a>
  );
}
