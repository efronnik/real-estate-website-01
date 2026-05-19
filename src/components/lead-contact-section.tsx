import { ContactForm } from "@/components/contact-form";
import { ClientDirectContact } from "@/components/client-direct-contact";

type LeadContactSectionProps = {
  sectionId?: string;
  sourcePage: string;
  leadType?: "kontakt" | "inwestor";
  eyebrow: string;
  title: string;
  description: string;
  verticalLabel?: string;
  showMapOverlay?: boolean;
  showDirectContact?: boolean;
};

export function LeadContactSection({
  sectionId = "kontakt",
  sourcePage,
  leadType = "kontakt",
  eyebrow,
  title,
  description,
  verticalLabel = "Kontakt",
  showMapOverlay = true,
  showDirectContact = false,
}: LeadContactSectionProps) {
  return (
    <section id={sectionId} className="section cta">
      <div className="container">
        <div className="shell">
          <div className="copy">
            {showMapOverlay ? <div className="map-overlay"></div> : null}
            {verticalLabel ? <p className="vertical-label">{verticalLabel}</p> : null}
            <div className="copy-inner">
              <p className="eyebrow">{eyebrow}</p>
              <h2>{title}</h2>
              <p>{description}</p>
              {showDirectContact ? <ClientDirectContact variant="light" /> : null}
            </div>
          </div>
          <ContactForm sourcePage={sourcePage} leadType={leadType} />
        </div>
      </div>
    </section>
  );
}
