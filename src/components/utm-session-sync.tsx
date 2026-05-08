"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { persistUtmFromSearchParams } from "@/lib/utm-attribution";

/** Keeps sessionStorage UTM in sync with URL on App Router navigations. */
export function UtmSessionSync() {
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();

  useEffect(() => {
    persistUtmFromSearchParams(new URLSearchParams(searchKey));
  }, [searchKey]);

  return null;
}
