"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackCtaClick } from "@/lib/ga4";

export type CtaClickLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  /** Sent to GA4 as `placement` (e.g. prefooter, home_hero). */
  ctaLocation: string;
  ctaLabel: string;
  children: ReactNode;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

export function CtaClickLink({ href, ctaLocation, ctaLabel, children, onClick, ...rest }: CtaClickLinkProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          trackCtaClick(ctaLocation, ctaLabel, href);
        }
      }}
    >
      {children}
    </a>
  );
}
