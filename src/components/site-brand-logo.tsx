import Image from "next/image";
import { SITE_BRAND, type SiteBrandLogoTone } from "@/lib/client-profile";

type SiteBrandLogoProps = {
  /** `on-dark` = biały znak na ciemnym tle (hero); `on-light` = pełne logo na jasnym tle */
  tone?: SiteBrandLogoTone;
  priority?: boolean;
  className?: string;
};

export function SiteBrandLogo({ tone = "on-light", priority = false, className }: SiteBrandLogoProps) {
  const isOnDark = tone === "on-dark";
  const imgClass = ["site-brand-logo__img", isOnDark ? "site-brand-logo__img--on-dark" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      src={SITE_BRAND.logoSrc}
      alt={SITE_BRAND.logoAlt}
      width={SITE_BRAND.logoWidth}
      height={SITE_BRAND.logoHeight}
      className={imgClass}
      priority={priority}
    />
  );
}
