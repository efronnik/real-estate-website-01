import { absoluteUrl } from "@/lib/seo";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

function optionalString(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

export function getLocalBusinessSchema(): JsonValue {
  const sameAs = [
    optionalString(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL),
    optionalString(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL),
    optionalString(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL),
  ].filter((v): v is string => Boolean(v));

  const maybePhone = optionalString(process.env.NEXT_PUBLIC_BUSINESS_PHONE);
  const maybeEmail = optionalString(process.env.NEXT_PUBLIC_BUSINESS_EMAIL);

  const schema: Record<string, JsonValue> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/")}#localbusiness`,
    name: "FIND",
    url: absoluteUrl("/"),
    description: "Wsparcie w sprzedazy mieszkan i analizie inwestycji nieruchomosciowych.",
    image: absoluteUrl("/LOGO.png"),
    areaServed: {
      "@type": "City",
      name: "Warszawa",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Warszawa",
      addressCountry: "PL",
    },
    knowsLanguage: ["pl-PL", "en", "de", "it"],
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Uslugi FIND",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sprzedaz nieruchomosci",
            url: absoluteUrl("/sprzedaz"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Flip nieruchomosci Warszawa – inwestycje",
            url: absoluteUrl("/inwestycje"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Konsultacja i kontakt",
            url: absoluteUrl("/kontakt"),
          },
        },
      ],
    },
  };

  if (maybePhone) {
    schema.telephone = maybePhone;
  }
  if (maybeEmail) {
    schema.email = maybeEmail;
  }

  return schema;
}
