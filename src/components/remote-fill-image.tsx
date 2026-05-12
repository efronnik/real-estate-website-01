import Image from "next/image";

type RemoteFillImageProps = {
  src: string;
  alt: string;
  /** Responsive hint for `srcset`; tune per layout. */
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Remote URL only — hostnames must be listed in `next.config.ts` `images.remotePatterns`. */
export function RemoteFillImage({ src, alt, sizes, className, priority }: RemoteFillImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className ?? "object-cover"}
      priority={priority}
    />
  );
}
