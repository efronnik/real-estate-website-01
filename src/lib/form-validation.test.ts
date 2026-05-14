import { describe, expect, it } from "vitest";
import { buildLeadPayloadFromFormData } from "./form-validation";

function formDataFrom(entries: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) {
    fd.append(k, v);
  }
  return fd;
}

describe("buildLeadPayloadFromFormData", () => {
  it("maps form field names to the JSON API shape", () => {
    const payload = buildLeadPayloadFromFormData(
      formDataFrom({
        full_name: "Jan Kowalski",
        phone: "+48 600 000 000",
        lead_type: "wycena",
        source_page: "sprzedaz",
        consent_data: "on",
      }),
    );
    expect(payload).toMatchObject({
      fullName: "Jan Kowalski",
      phone: "+48 600 000 000",
      leadType: "wycena",
      sourcePage: "sprzedaz",
      consentData: true,
    });
  });

  it("defaults leadType to kontakt when missing", () => {
    const payload = buildLeadPayloadFromFormData(
      formDataFrom({
        full_name: "Ewa Test",
        phone: "+48600111222",
        source_page: "blog",
        consent_data: "true",
      }),
    );
    expect(payload.leadType).toBe("kontakt");
  });

  it("reads city_or_district as city fallback", () => {
    const payload = buildLeadPayloadFromFormData(
      formDataFrom({
        full_name: "Marek K",
        phone: "+48600111222",
        source_page: "inwestycje",
        city_or_district: "Warszawa",
        consent_data: "on",
      }),
    );
    expect(payload.city).toBe("Warszawa");
  });

  it("preserves valuation-specific answers in the persisted message", () => {
    const payload = buildLeadPayloadFromFormData(
      formDataFrom({
        full_name: "Anna Nowak",
        phone: "+48600111222",
        email: "anna@example.com",
        lead_type: "wycena",
        source_page: "sprzedaz",
        city: "Warszawa",
        district: "Mokotow",
        property_type: "mieszkanie",
        area_m2: "58",
        rooms: "3",
        condition: "dobry",
        floor: "3/8",
        building_type: "blok",
        ownership_type: "pelna wlasnosc",
        expected_price: "950000 PLN",
        timeline: "1-3 miesiace",
        message: "Prosze o szybki kontakt.",
        consent_data: "on",
      }),
    );

    expect(payload.message).toContain("Szczegoly formularza:");
    expect(payload.message).toContain("Dzielnica: Mokotow");
    expect(payload.message).toContain("Typ nieruchomosci: mieszkanie");
    expect(payload.message).toContain("Metraz m2: 58");
    expect(payload.message).toContain("Liczba pokoi: 3");
    expect(payload.message).toContain("Oczekiwana cena: 950000 PLN");
    expect(payload.message).toContain("Wiadomosc: Prosze o szybki kontakt.");
  });

  it("preserves preferred contact time for contact forms", () => {
    const payload = buildLeadPayloadFromFormData(
      formDataFrom({
        full_name: "Ewa Test",
        phone: "+48600111222",
        source_page: "kontakt",
        preferred_contact_time: "10:00-12:00",
        consent_data: "on",
      }),
    );

    expect(payload.message).toBe("Szczegoly formularza: Preferowana godzina kontaktu: 10:00-12:00");
  });
});
