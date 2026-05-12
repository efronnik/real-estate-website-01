"use client";

import { useEffect, useRef, useState } from "react";

type HeroBackgroundVideoProps = {
  src: string;
  className?: string;
};

/**
 * Decorative hero/section video: defers loading the MP4 until the element is near the viewport.
 */
export function HeroBackgroundVideo({ src, className }: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadSource, setLoadSource] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadSource(true);
          observer.disconnect();
        }
      },
      { rootMargin: "140px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!loadSource || !v) return;
    void v.play().catch(() => {});
  }, [loadSource]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload={loadSource ? "metadata" : "none"}
      aria-hidden="true"
    >
      {loadSource ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
