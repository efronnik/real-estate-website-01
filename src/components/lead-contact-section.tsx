import { ContactForm } from "@/components/contact-form";

type LeadContactSectionProps = {
  sectionId?: string;
  sourcePage: string;
  leadType?: "kontakt" | "inwestor";
  eyebrow: string;
  title: string;
  description: string;
  verticalLabel?: string;
  showMapOverlay?: boolean;
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
            </div>
          </div>
          <ContactForm sourcePage={sourcePage} leadType={leadType} />
        </div>
      </div>
    </section>
  );
}
