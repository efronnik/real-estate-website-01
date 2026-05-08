"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackContactClick } from "@/lib/ga4";

export type ContactClickLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  children: ReactNode;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

/** Tracks `contact_click` for tel / mailto / common messenger URLs only. */
export function ContactClickLink({ href, children, onClick, ...rest }: ContactClickLinkProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          trackContactClick(href);
        }
      }}
    >
      {children}
    </a>
  );
}
