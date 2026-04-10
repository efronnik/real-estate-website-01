# Day 1 Decision Document

## Scope (Day 1)
- Strony aktywne: `Glowna`, `Sprzedaz`, `Inwestycje`, `O mnie`, `Kontakt`, `Blog`

## Punkt 1 - 2 lejki sprzedazowe (zatwierdzone)

### Lejka A - Sprzedajacy (Seller)
- Wejscie: `Glowna`, `Blog`, `Bledy`
- Trasa glowna: `Glowna -> Sprzedaz -> Kontakt`
- Primary conversion: wysylka formularza `wycena nieruchomosci`
- Secondary conversion: wysylka formularza `kontakt`

### Lejka B - Inwestor
- Wejscie: `Glowna`, `Blog`, `Inwestycje`
- Trasa glowna: `Glowna -> Inwestycje -> Kontakt`
- Primary conversion: wysylka formularza `kontakt` (lead type: inwestor)
- Secondary conversion: klikniecie CTA prowadzace do `Kontakt`

## Punkt 2 - CTA map po stronach (zatwierdzone)
- Szczegoly: `CTA_MAP_V1.md`
- Zasada: kazda strona ma primary CTA i kierunek do konkretnej formy (`kontakt` lub `wycena`)

## Punkt 3 - Formularz kontakt (zatwierdzone)
- Szczegoly pol: `FORM_KONTAKT_FIELDS_V1.md`
- Wdrozenie: wspolny komponent `src/components/contact-form.tsx`

## Punkt 4 - Formularz wycena (zatwierdzone)
- Szczegoly pol: `FORM_WYCENA_FIELDS_V1.md`
- Wdrozenie: wspolny komponent sekcji `src/components/wycena-section.tsx`

## Punkt 5 - Day 1 dokument decyzji (zatwierdzone)
- Ten plik jest glownym dokumentem decyzji Day 1 (single source of truth).
- Wszystkie kolejne zmiany strukturalne powinny byc zgodne z tym dokumentem.

## Status
- Punkt 1 zamkniety.
- Punkt 2 zamkniety.
- Punkt 3 zamkniety.
- Punkt 4 zamkniety.
- Punkt 5 zamkniety.
