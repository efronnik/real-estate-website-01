"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { isGaTrackingAllowed } from "@/lib/analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pagePathFromRoute(pathname: string, search: string) {
  return search ? `${pathname}?${search}` : pathname;
}

type GoogleAnalyticsPageViewProps = {
  measurementId: string;
};

/** Sends page_view on client route changes; first hit is from the root layout gtag snippet. */
export function GoogleAnalyticsPageView({ measurementId }: GoogleAnalyticsPageViewProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const lastSentPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isGaTrackingAllowed()) {
      return;
    }

    const pagePath = pagePathFromRoute(pathname, searchKey);

    if (lastSentPath.current === null) {
      lastSentPath.current = pagePath;
      return;
    }

    if (lastSentPath.current === pagePath) {
      return;
    }

    const { gtag, dataLayer } = window;
    if (typeof gtag === "function") {
      gtag("config", measurementId, { page_path: pagePath });
    } else if (Array.isArray(dataLayer)) {
      dataLayer.push(["config", measurementId, { page_path: pagePath }]);
    } else {
      return;
    }

    lastSentPath.current = pagePath;
  }, [measurementId, pathname, searchKey]);

  return null;
}
