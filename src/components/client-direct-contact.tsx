import { CLIENT_PROFILE } from "@/lib/client-profile";
import { ContactClickLink } from "@/components/contact-click-link";

type ClientDirectContactProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function ClientDirectContact({ className, variant = "dark" }: ClientDirectContactProps) {
  const rootClass = ["client-direct-contact", `client-direct-contact--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <p className="client-direct-contact-name">{CLIENT_PROFILE.fullName}</p>
      <p className="client-direct-contact-role">
        {CLIENT_PROFILE.tagline} · {CLIENT_PROFILE.location}
      </p>
      <p className="client-direct-contact-agency">{CLIENT_PROFILE.businessName}</p>
      <div className="client-direct-contact-links">
        <ContactClickLink href={CLIENT_PROFILE.phoneHref} className="client-direct-contact-link">
          {CLIENT_PROFILE.phoneDisplay}
        </ContactClickLink>
        <ContactClickLink href={CLIENT_PROFILE.emailHref} className="client-direct-contact-link">
          {CLIENT_PROFILE.email}
        </ContactClickLink>
      </div>
    </div>
  );
}
