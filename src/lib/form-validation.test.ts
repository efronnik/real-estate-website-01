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

  it("preserves contact-only details in the message payload", () => {
    const payload = buildLeadPayloadFromFormData(
      formDataFrom({
        full_name: "Ewa Test",
        phone: "+48600111222",
        lead_type: "kontakt",
        source_page: "kontakt",
        preferred_contact_time: "10:00-12:00",
        message: "Prosze o kontakt.",
        consent_data: "on",
      }),
    );

    expect(payload.message).toBe(
      ["Prosze o kontakt.", "Dodatkowe dane z formularza:\nPreferowana godzina kontaktu: 10:00-12:00"].join(
        "\n\n",
      ),
    );
  });

  it("preserves valuation details in the message payload", () => {
    const payload = buildLeadPayloadFromFormData(
      formDataFrom({
        full_name: "Jan Kowalski",
        phone: "+48 600 000 000",
        lead_type: "wycena",
        source_page: "sprzedaz",
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
        consent_data: "on",
      }),
    );

    expect(payload.message).toBe(
      [
        "Dodatkowe dane z formularza:",
        "Dzielnica: Mokotow",
        "Typ nieruchomosci: mieszkanie",
        "Metraz (m2): 58",
        "Liczba pokoi: 3",
        "Stan nieruchomosci: dobry",
        "Pietro: 3/8",
        "Typ budynku: blok",
        "Forma wlasnosci: pelna wlasnosc",
        "Oczekiwana cena: 950000 PLN",
        "Termin sprzedazy: 1-3 miesiace",
      ].join("\n"),
    );
  });
});
