/**
 * Treści i dane kontaktowe Patrycji Szewczyk (Compas Nieruchomości Group)
 * na podstawie portfolio: https://compasnieruchomosci.vercel.app/
 */
export const CLIENT_PROFILE = {
  fullName: "Patrycja Szewczyk",
  businessName: "Compas Nieruchomości Group",
  shortBusinessName: "Kompas",
  tagline: "Ekspert inwestycji i sprzedaży",
  location: "Warszawa",
  portfolioUrl: "https://compasnieruchomosci.vercel.app/",
  email: "compasgroup.info@gmail.com",
  phoneDisplay: "577 154 116",
  phoneHref: "tel:+48577154116",
  emailHref: "mailto:compasgroup.info@gmail.com",
  languages: ["pl-PL", "en", "de", "it"] as const,
} as const;

export const CLIENT_ABOUT = {
  headline: "Ekspert inwestycji i sprzedaży · Warszawa — Patrycja Szewczyk",
  lead:
    "Jeśli szukasz nie tylko pośrednika, ale partnera, który przeprowadzi Cię przez cały proces — jesteś we właściwym miejscu.",
  paragraphOwner:
    "Ponad 17 lat temu sama przeszłam przez sprzedaż nieruchomości jako właściciel. Dzięki temu doskonale rozumiem emocje, decyzje i wyzwania, które towarzyszą temu procesowi.",
  paragraphToday:
    "Dziś pracuję z klientami, łącząc doświadczenie rynkowe z podejściem inwestycyjnym. Wypracowałam autorski model działania, który pozwala nie tylko skutecznie sprzedać nieruchomość, ale przede wszystkim osiągnąć najlepszy możliwy rezultat finansowy.",
  quote:
    "Większość właścicieli sprzedaje poniżej realnej wartości. Nie dlatego, że rynek jest zły — ale dlatego, że nikt im nie pokazał właściwej strategii i nie ustalił ceny we właściwy sposób.",
  methodClosing:
    "Bo dobra decyzja na rynku nieruchomości rzadko rodzi się z przypadku. Rodzi się z wiedzy!",
  ctaHeadline: "Chcesz sprzedać nieruchomość jak najdrożej? Mam sprawdzoną metodę — nie przypadek.",
} as const;

export const CLIENT_STATS = [
  { value: "17+", label: "Lat na rynku" },
  { value: "1:1", label: "Zawsze ja, nie zespół" },
  { value: "0%", label: "Prowizja tylko od sprzedającego" },
  { value: "4", label: "Języki: PL, EN, DE, IT" },
] as const;

export const CLIENT_COMMISSION_NOTE =
  "Prowizja tylko jednostronna — od sprzedającego. Kupujący nie płaci nic. To oznacza większą grupę zainteresowanych i szybszą sprzedaż.";

export const CLIENT_COMPETENCIES = [
  {
    title: "Ponad 17 lat",
    text: "Doświadczenia na rynku nieruchomości.",
  },
  {
    title: "Wycena",
    text: "Oparta na danych transakcyjnych.",
  },
  {
    title: "Strategia",
    text: "Sprzedaży dopasowana do nieruchomości.",
  },
  {
    title: "Remonty i flipy",
    text: "Doświadczenie w podnoszeniu wartości; ocena stanu technicznego i kosztu remontu.",
  },
  {
    title: "Home staging i architekt wnętrz",
    text: "Przygotowanie wizualne nieruchomości.",
  },
  {
    title: "Proces 1:1",
    text: "Prowadzenie od analizy do finalizacji.",
  },
  {
    title: "Akademia Fotografii",
    text: "Ukończony kurs; sesje i materiały promocyjne.",
  },
  {
    title: "Zagraniczni kupujący",
    text: "Dostęp do sieci nabywców; biegle rozmawiam po włosku, niemiecku i angielsku.",
  },
  {
    title: "Podejście inwestycyjne",
    text: "Nie tylko sprzedaż.",
  },
  {
    title: "Butikowa agencja",
    text: "Jakość, nie ilość.",
  },
] as const;

export const CLIENT_SERVICES = [
  {
    title: "Analiza realnej wartości nieruchomości",
    text: "Oceniam wartość na podstawie realnych danych transakcyjnych, nie ogólnych porównań.",
  },
  {
    title: "Ocena stanu technicznego i kosztu remontu",
    text: "Potrafię rzetelnie ocenić stan techniczny nieruchomości i oszacować koszt remontu.",
  },
  {
    title: "Strategia: sprzedaż od razu lub przygotowanie",
    text: "Dobieram ścieżkę: szybka sprzedaż albo przygotowanie pod wyższą cenę.",
  },
  {
    title: "Pełne bezpieczeństwo prawne",
    text: "Dbam o formalną stronę transakcji i bezpieczne domknięcie sprawy.",
  },
  {
    title: "Sesja zdjęciowa, wideo i kampania promocyjna",
    text: "Materiały, które realnie wspierają sprzedaż — od sesji po ekspozycję oferty.",
  },
  {
    title: "Komunikacja wielojęzyczna",
    text: "Polski, angielski, niemiecki i włoski — szerszy zasięg kupujących.",
  },
] as const;

export const CLIENT_METHOD_STEPS = [
  {
    step: "01",
    title: "Analiza cen transakcyjnych",
    text: "Nie opieram się na cenach ofertowych — analizuję rzeczywiste ceny transakcyjne.",
  },
  {
    step: "02",
    title: "Strategia: sprzedać czy przygotować?",
    text: "Oceniam potencjał i wspólnie decydujemy, czy warto zainwestować w przygotowanie, żeby uzyskać wyższą cenę.",
  },
  {
    step: "03",
    title: "Weryfikacja kupujących",
    text: "Na prezentacje przychodzą tylko osoby realnie gotowe do zakupu. Mniej chaosu, szybsze decyzje.",
  },
  {
    step: "04",
    title: "Etapowe monitorowanie ceny",
    text: "Analizujemy wyniki razem, reagujemy na sygnały rynku i wprowadzamy zmiany zanim pojawi się problem.",
  },
  {
    step: "05",
    title: "Prowadzę cały proces — ja osobiście",
    text: "Od wyceny po finalizację. Bezpośredni kontakt ze mną — nie z asystentem, nie z zespołem.",
  },
] as const;
