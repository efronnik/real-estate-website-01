"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { ROUTE_PATHS } from "@/config/navigation";
import { fetchCmsBlogPostBySlug, type CmsBlogPostRecord } from "@/lib/cms";

type Article = {
  title: string;
  lead: string;
  category: string;
  readTime: string;
  points: string[];
  checklist: string[];
  frameworkEyebrow?: string;
  frameworkTitle?: string;
  mistakesTitle?: string;
  checklistTitle?: string;
  checklistCardText?: string;
  checklistMetric?: string;
  showFramework?: boolean;
  showMistakes?: boolean;
  framework?: string[];
  mistakes?: string[];
  closing?: string;
  signals?: Array<{ title: string; why: string; action: string; image: string }>;
};

const articles: Record<string, Article> = {
  "7-sygnalow-ze-cena-blokuje-sprzedaz": {
    title: "7 sygnałów, że cena blokuje sprzedaż",
    lead: "Jeśli oferta długo stoi bez jakościowych zapytań, problemem często nie jest mieszkanie, tylko strategia ceny i pozycjonowanie.",
    category: "Warszawa / analiza rynku",
    readTime: "8 min czytania",
    points: [
      "Ruch w ogłoszeniu jest niski mimo poprawnych zdjęć i lokalizacji.",
      "Masz dużo pytań, ale mało realnych prezentacji.",
      "Większość rozmów zaczyna się od mocnej obniżki ceny.",
      "Po 2-3 tygodniach nie pojawiają się nowe profile kupujących.",
      "Porównywalne mieszkania w okolicy rotują szybciej.",
      "Oferta „wisi”, ale nie buduje presji decyzyjnej.",
      "Każda kolejna korekta ceny osłabia pozycję negocjacyjną.",
    ],
    signals: [
      {
        title: "Niski ruch w ogłoszeniu od pierwszych dni",
        why: "Jeżeli oferta nie łapie uwagi na starcie, cena często jest poza „strefą decyzji” kupujących dla tej lokalizacji i standardu.",
        action: "Porównaj cenę z realnymi transakcjami i podobnymi mieszkaniami aktywnymi na rynku, nie tylko z pojedynczymi ofertami premium.",
        image: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Dużo wiadomości, mało prezentacji",
        why: "Kupujący klikają z ciekawości, ale rezygnują przed spotkaniem, gdy cena nie zgadza się z tym, co widzą w ofercie.",
        action: "Sprawdź spójność: cena vs. zdjęcia, opis, standard wykończenia i lokalizacja. Popraw komunikat wartości.",
        image: "https://images.pexels.com/photos/2725676/pexels-photo-2725676.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Każda rozmowa zaczyna się od mocnej obniżki",
        why: "To sygnał, że rynek postrzega ofertę jako zawyżoną i kupujący od razu testują granicę ustępstw.",
        action: "Przygotuj argumenty obrony ceny i scenariusz negocjacyjny. Jeśli argumentów brak - skoryguj cenę strategicznie, nie impulsowo.",
        image: "https://images.pexels.com/photos/7578876/pexels-photo-7578876.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Po 2-3 tygodniach nie pojawiają się nowe profile klientów",
        why: "Algorytm i rynek „odczytują” ofertę jako mniej atrakcyjną, a zasięg naturalnie słabnie.",
        action: "Zrób reset wejścia: aktualizacja materiałów, opisu i pozycjonowania ceny zamiast drobnych, częstych cięć.",
        image: "https://images.pexels.com/photos/7578913/pexels-photo-7578913.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Podobne mieszkania sprzedają się szybciej",
        why: "Gdy porównywalne nieruchomości rotują, a Twoja stoi, cena lub sposób prezentacji nie trafia w oczekiwania rynku.",
        action: "Przeprowadź krótką analizę konkurencji 1:1 i wskaż, gdzie oferta wypada gorzej lub drożej bez uzasadnienia.",
        image: "https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Brak presji decyzyjnej po prezentacjach",
        why: "Kupujący nie czują, że oferta jest „uczciwie wyceniona na teraz”, więc odkładają decyzję.",
        action: "Doprecyzuj warunki oferty i narrację wartości. Pokaż jasno, co uzasadnia cenę i jakie są koszty zwlekania.",
        image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Każda korekta ceny pogarsza pozycję negocjacyjną",
        why: "Seria przypadkowych obniżek buduje obraz sprzedającego pod presją, co zachęca do dalszego zbijania ceny.",
        action: "Przyjmij jedną zaplanowaną korektę opartą o dane i komunikuj ją jako element strategii, a nie desperacji.",
        image: "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
    ],
    checklist: [
      "Zweryfikuj cenę na tle transakcji podobnych mieszkań.",
      "Sprawdź, czy komunikat ogłoszenia wspiera cenę.",
      "Ustal scenariusz korekty zamiast przypadkowych obniżek.",
    ],
    frameworkEyebrow: "Plan pracy",
    frameworkTitle: "Plan działania na 14 dni",
    mistakesTitle: "Najczęstsze błędy przy korekcie ceny",
    checklistTitle: "Checklista do wdrożenia",
    checklistCardText: "Element checklisty do wdrożenia przed kolejnym etapem sprzedaży.",
    checklistMetric: "Checklista wdrożenia",
    framework: [
      "Dzień 1-2: audyt oferty - cena, zdjęcia, tytuł, opis i grupa docelowa.",
      "Dzień 3-4: analiza konkurencji 1:1 (metraż, standard, piętro, ekspozycja, lokalizacja).",
      "Dzień 5-7: poprawki komunikatu wartości i materiałów wizualnych bez zmiany ceny.",
      "Dzień 8-10: monitoring jakości zapytań, liczby prezentacji i przebiegu rozmów.",
      "Dzień 11-14: decyzja - utrzymanie ceny, repozycjonowanie albo jedna strategiczna korekta.",
    ],
    mistakes: [
      "Wiele małych obniżek co kilka dni - rynek odczytuje to jako presję sprzedającego.",
      "Korekta ceny bez poprawy zdjęć i opisu - kupujący dalej nie widzą uzasadnienia wartości.",
      "Porównywanie się do najdroższych ofert zamiast do mieszkań realnie rotujących.",
      "Ustalanie ceny „żeby mieć z czego schodzić” bez planu negocjacyjnego.",
      "Decyzje pod wpływem pojedynczej opinii, a nie danych z pierwszych 10-14 dni.",
    ],
    closing: "Najlepsza strategia to nie najniższa cena, ale cena, która jest wiarygodna dla rynku i obroniona jakością oferty. Gdy połączysz dane, komunikat i plan negocjacji, skracasz czas sprzedaży bez oddawania marży.",
  },
  "home-staging-premium-bez-przepalania-budzetu": {
    title: "Home staging premium bez przepalania budżetu",
    lead: "Home staging premium to reżyseria doświadczenia kupującego: co widzi po wejściu, jak porusza się po mieszkaniu i co zapamięta po 15 minutach prezentacji.",
    category: "Home staging / premium",
    readTime: "10 min czytania",
    points: [
      "Zaprojektuj „pierwsze 20 sekund”: wejście, oś widoku i najmocniejszy kadr, który od razu komunikuje standard mieszkania.",
      "Buduj spójność materiałów i faktur (drewno, tkaniny, metal, szkło), żeby wnętrze było odczuwane jako premium, a nie „przestylizowane”.",
      "Ustaw warstwy światła: bazowe, zadaniowe i akcentowe. Jedna temperatura barwowa w całym mieszkaniu poprawia odbiór jakości.",
      "Pracuj na skali: mniej mebli, ale we właściwych proporcjach. Wolna przestrzeń jest w premium równie ważna jak wyposażenie.",
      "Stylizuj zapachem i dźwiękiem tła subtelnie, bez „efektu hotelowego” - kupujący ma czuć dom, nie scenografię.",
      "Spójność online/offline: kadr ze zdjęcia musi być możliwy do odtworzenia podczas prezentacji 1:1.",
    ],
    signals: [
      {
        title: "Pierwszy kadr nie buduje efektu premium",
        why: "Jeśli wejście i główny kadr są przypadkowe, kupujący nie widzi jakości już na starcie i trudniej mu uzasadnić wysoką wartość nieruchomości.",
        action: "Ustal jeden dominujący punkt wejścia i kompozycję salonu, która od razu pokazuje skalę, światło i proporcje.",
        image: "https://images.pexels.com/photos/7031398/pexels-photo-7031398.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Za dużo dodatków, za mało przestrzeni",
        why: "Nadmiar dekoracji rozprasza uwagę i optycznie zmniejsza wnętrze. W segmencie premium działa selekcja, nie ilość.",
        action: "Zostaw 2-3 mocne akcenty na pomieszczenie i usuń elementy, które nie wspierają funkcji pokoju.",
        image: "https://images.pexels.com/photos/7535038/pexels-photo-7535038.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Niespójne oświetlenie psuje odbiór jakości",
        why: "Mieszanie temperatur światła i przypadkowe cienie sprawiają, że nawet dobre wnętrze wygląda taniej i mniej spójnie.",
        action: "Ujednolić temperaturę barwową i ustawić trzy warstwy światła: ogólne, punktowe i akcentowe.",
        image: "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Zdjęcia nie zgadzają się z prezentacją na żywo",
        why: "Gdy klient widzi inną aranżację niż w ogłoszeniu, maleje zaufanie i rośnie ostrożność decyzyjna.",
        action: "Przed publikacją ustal finalny układ mebli i dodatków oraz odtwarzaj go 1:1 przy każdym pokazie.",
        image: "https://images.pexels.com/photos/7578932/pexels-photo-7578932.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Brak scenariusza trasy prezentacji",
        why: "Chaotyczne oprowadzanie powoduje, że kupujący pomija kluczowe atuty i zapamiętuje przypadkowe detale.",
        action: "Zaprojektuj trasę: wejście -> strefa dzienna -> strefa prywatna -> podsumowanie atutów na końcu.",
        image: "https://images.pexels.com/photos/7578912/pexels-photo-7578912.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
    ],
    checklist: [
      "Scenariusz trasy prezentacji: kolejność wejścia do pomieszczeń i punkt zatrzymania w każdym pokoju.",
      "Jednolita temperatura światła (np. 3000K) i kontrola odbić w lustrach, szybach oraz frontach połyskowych.",
      "Pakiet tekstyliów premium: zasłony, poduszki, narzuta i dywan w jednej, spokojnej palecie.",
      "Mikro-porządek powierzchni: blaty, stoliki, strefa wejścia i łazienka gotowe na zdjęcie „bez poprawek”.",
      "Test zapachu i akustyki 30 minut przed pokazem (wietrzenie, brak intensywnych odświeżaczy, cisza tła).",
      "Lista „last minute” na dzień prezentacji: światło, rolety, układ krzeseł, zamknięte schowki, świeże ręczniki.",
    ],
    frameworkEyebrow: "Plan wdrożenia",
    frameworkTitle: "Scenariusz home staging premium",
    mistakesTitle: "Najczęstsze błędy w home stagingu premium",
    checklistTitle: "Checklista przed sesją i prezentacją",
    checklistCardText: "Kontrolny punkt stagingu premium do odhaczenia przed publikacją.",
    checklistMetric: "Staging premium",
    framework: [
      "Dzień 1-2: audyt doświadczenia kupującego - trasa wejścia, pierwsze kadry i elementy rozpraszające uwagę.",
      "Dzień 3-4: porządkowanie i mikro-naprawy estetyczne, które podnoszą odbiór jakości bez remontu.",
      "Dzień 5-7: ustawienie światła, tekstyliów i proporcji mebli w trzech kluczowych strefach mieszkania.",
      "Dzień 8-10: sesja foto + krótki walkthrough, potem korekta scenografii pod realny kadr i perspektywę obiektywu.",
      "Dzień 11-14: próba generalna prezentacji na żywo i check-lista operacyjna dla każdego terminu pokazu.",
    ],
    mistakes: [
      "„Dekorowanie pod siebie” zamiast pod profil kupującego premium.",
      "Łączenie kilku modnych stylów jednocześnie, co daje efekt chaosu zamiast klasy.",
      "Nadmierna ilość dodatków, które zabierają uwagę od architektury i proporcji wnętrza.",
      "Zbyt ciemne lub nierówne oświetlenie - mieszkanie wygląda na mniejsze i mniej zadbane.",
      "Brak scenariusza pokazu: kupujący chodzi przypadkowo, a najmocniejsze atuty mieszkania pozostają niewidoczne.",
    ],
    closing: "Premium staging nie polega na „upiększaniu”, tylko na projektowaniu odczuć: spokoju, jakości i zaufania do nieruchomości. Gdy kupujący intuicyjnie czuje porządek i proporcję, łatwiej przechodzi z fazy oglądania do fazy decyzji.",
  },
  "dokumenty-do-sprzedazy-checklista-eksperta": {
    title: "Dokumenty do sprzedaży: checklista eksperta",
    lead: "W transakcji premium dokumenty nie są „formalnością na koniec”, tylko narzędziem budowania zaufania już od pierwszej rozmowy z kupującym.",
    category: "Formalności / bezpieczeństwo",
    readTime: "11 min czytania",
    points: [
      "Zbuduj „teczkę transakcyjną” przed publikacją: własność, obciążenia, opłaty i status lokalu w jednym pakiecie.",
      "Sprawdź zgodność danych między dokumentami źródłowymi, księgą wieczystą i stanem faktycznym nieruchomości.",
      "Przygotuj dokumenty pod dwa scenariusze: zakup gotówkowy i zakup kredytowy (różne tempo i wymagania banku).",
      "Zadbaj o aktualność zaświadczeń z terminem ważności, aby nie stracić czasu przy finalizacji.",
      "Ustal kolejność przekazywania dokumentów: które wysyłasz na etapie oferty, które dopiero po decyzji klienta.",
      "Każdy dokument opisz po ludzku jednym zdaniem: co potwierdza i dlaczego jest ważny dla bezpieczeństwa kupującego.",
    ],
    signals: [
      {
        title: "Rozjazd między księgą wieczystą a stanem faktycznym",
        why: "Nawet drobna niespójność danych zwiększa ostrożność kupującego i wydłuża decyzję banku lub notariusza.",
        action: "Przed ofertą wykonaj audyt zgodności: właściciel, udziały, obciążenia, adres, powierzchnia, podstawa nabycia.",
        image: "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Brak aktualnych zaświadczeń o opłatach i braku zaległości",
        why: "Kupujący potrzebuje pewności, że lokal nie niesie ukrytych zobowiązań wobec wspólnoty/spółdzielni i dostawców.",
        action: "Przygotuj komplet aktualnych zaświadczeń i kontroluj ich ważność, aby nie odnawiać dokumentów na ostatniej prostej.",
        image: "https://images.pexels.com/photos/8297474/pexels-photo-8297474.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Niejasny status zameldowania i przekazania lokalu",
        why: "Nieuregulowane kwestie meldunkowe i brak planu przekazania podnoszą ryzyko prawne po stronie kupującego.",
        action: "Ustal harmonogram wymeldowania, protokół przekazania i listę elementów wyposażenia przekazywanych z lokalem.",
        image: "https://images.pexels.com/photos/6863333/pexels-photo-6863333.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Brak dokumentów energetycznych i technicznych na czas",
        why: "Braki formalne przy akcie powodują nerwowe przesunięcia terminów i osłabiają profesjonalny odbiór oferty.",
        action: "Zweryfikuj obowiązki ustawowe (w tym świadectwo charakterystyki energetycznej) odpowiednio wcześniej.",
        image: "https://images.pexels.com/photos/8292856/pexels-photo-8292856.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Dokumenty wysyłane „na raty” bez logiki",
        why: "Chaotyczny obieg dokumentów obniża zaufanie i zwiększa liczbę pytań zwrotnych od kupującego, banku i kancelarii.",
        action: "Zrób indeks dokumentów i udostępniaj je paczkami według etapu transakcji, z krótkim komentarzem do każdego pliku.",
        image: "https://images.pexels.com/photos/8293698/pexels-photo-8293698.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
    ],
    checklist: [
      "Dokument własności + podstawa nabycia (akt, spadek, darowizna lub inne źródło prawa).",
      "Aktualny odpis księgi wieczystej i kontrola wpisów/obciążeń.",
      "Zaświadczenia o braku zaległości wobec wspólnoty/spółdzielni i opłat lokalowych.",
      "Zaświadczenie o osobach zameldowanych oraz plan wymeldowania przed/po akcie.",
      "Świadectwo charakterystyki energetycznej (jeśli wymagane dla danej transakcji).",
      "Pakiet dla notariusza: dane stron, sposób płatności, termin wydania lokalu, elementy wyposażenia.",
      "Wariant kredytowy: zestaw dokumentów pod analizę bankową kupującego.",
      "Wzór protokołu zdawczo-odbiorczego i lista liczników/kluczy do przekazania.",
    ],
    frameworkEyebrow: "Plan formalny",
    frameworkTitle: "Plan dokumentacyjny krok po kroku",
    mistakesTitle: "Najczęstsze błędy formalne przy sprzedaży",
    checklistTitle: "Checklista dokumentów i bezpieczeństwa",
    checklistCardText: "Punkt kontrolny formalności do potwierdzenia przed kolejnym etapem transakcji.",
    checklistMetric: "Bezpieczeństwo formalne",
    framework: [
      "Dzień 1-2: audyt stanu prawnego i lista braków dokumentacyjnych.",
      "Dzień 3-4: uzupełnienie zaświadczeń i potwierdzeń opłat z terminem ważności.",
      "Dzień 5-7: przygotowanie paczki dokumentów dla kupującego i notariusza.",
      "Dzień 8-10: weryfikacja scenariusza kredytowego (jeśli dotyczy) i odpowiedzi na pytania banku.",
      "Dzień 11-14: potwierdzenie warunków aktu, wydania lokalu i protokołu przekazania.",
    ],
    mistakes: [
      "Przekonanie, że dokumenty „załatwi się na końcu” - to najczęstsza przyczyna opóźnień finału.",
      "Brak jednolitej wersji danych (adres, metraż, udziały) w różnych dokumentach.",
      "Niedoszacowanie czasu potrzebnego na uzyskanie zaświadczeń ze wspólnoty, spółdzielni i urzędów.",
      "Brak planu pod transakcję kredytową, mimo że kupujący finansuje zakup kredytem.",
      "Nieprzygotowany protokół wydania lokalu i zakres przekazywanego wyposażenia.",
    ],
    closing: "Im bardziej uporządkowana dokumentacja, tym większe poczucie bezpieczeństwa po stronie kupującego i szybsza droga do aktu. W praktyce premium formalności są częścią strategii sprzedaży, nie dodatkiem do niej.",
  },
  "negocjacje-ceny-scenariusze-rozmowy": {
    title: "Negocjacje ceny: scenariusze rozmowy",
    lead: "Skuteczne negocjacje to zarządzanie tempem, informacją i emocją rozmowy - nie tylko wymiana liczb przy stole.",
    category: "Negocjacje / strategie",
    readTime: "10 min czytania",
    points: [
      "Rozpisz trzy poziomy ustępstw: warunki idealne, akceptowalne i graniczne.",
      "Ustal kolejność tematów rozmowy - najpierw wartość i warunki, dopiero potem cena końcowa.",
      "Zdefiniuj reakcje na typowe zagrywki: cisza, deadline, porównania z tańszymi ofertami, presja emocjonalna.",
      "Przygotuj argumenty oparte na faktach transakcyjnych, nie na oczekiwaniach właściciela.",
      "Traktuj negocjacje jako proces kilku kroków, a nie jedną rozmowę „wszystko albo nic”.",
      "Po każdej rundzie zapisuj ustalenia i kolejny krok, żeby nie tracić kontroli nad dynamiką.",
    ],
    signals: [
      {
        title: "Kupujący próbuje zbić cenę już w pierwszej minucie",
        why: "To test Twojej pewności i granic - jeśli szybko schodzisz z ceny, oddajesz przewagę na starcie całego procesu.",
        action: "Wróć do wartości oferty i danych porównawczych. Kwotę omawiaj po potwierdzeniu warunków transakcji.",
        image: "https://images.pexels.com/photos/7681104/pexels-photo-7681104.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Rozmowa kręci się wokół emocji, nie faktów",
        why: "Gdy dyskusja odrywa się od liczb i warunków, rośnie ryzyko ustępstw pod presją chwili.",
        action: "Przenoś rozmowę na konkret: standard, lokalizacja, stan prawny, terminy i porównywalne transakcje.",
        image: "https://images.pexels.com/photos/8292795/pexels-photo-8292795.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Druga strona stawia sztuczny deadline",
        why: "Presja czasu bywa narzędziem do wymuszenia szybkiej decyzji na niekorzystnych warunkach.",
        action: "Ustal minimalny czas na analizę i trzymaj się procedury decyzyjnej, nawet przy „ofertach tylko dziś”.",
        image: "https://images.pexels.com/photos/8292868/pexels-photo-8292868.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Brak pisemnego podsumowania po rozmowie",
        why: "Bez potwierdzenia ustaleń pojawiają się rozbieżne interpretacje i cofanie wcześniej uzgodnionych punktów.",
        action: "Po każdej rundzie wyślij krótkie podsumowanie: uzgodnione warunki, otwarte kwestie, termin kolejnego kroku.",
        image: "https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
      {
        title: "Negocjacje bez scenariusza B",
        why: "Jeśli masz tylko jeden wariant, łatwo wejść w pozycję obronną i zaakceptować warunki poniżej celu.",
        action: "Przygotuj alternatywy: wariant ceny, wariant terminu wydania i wariant zakresu wyposażenia.",
        image: "https://images.pexels.com/photos/8297473/pexels-photo-8297473.jpeg?auto=compress&cs=tinysrgb&w=1800",
      },
    ],
    checklist: [
      "Tabela granic negocjacyjnych: cena, termin aktu, termin wydania, wyposażenie.",
      "Lista 3-5 argumentów wartości oferty opartych na danych i faktach lokalnych.",
      "Gotowe odpowiedzi na najczęstsze obiekcje (cena, stan, lokalizacja, koszty).",
      "Scenariusz pierwszej rozmowy: otwarcie, pytania kwalifikujące, kolejność tematów.",
      "Scenariusz drugiej rundy: jakie ustępstwo za jakie ustępstwo drugiej strony.",
      "Wzór wiadomości podsumowującej ustalenia po spotkaniu.",
      "Warunki „stop” - kiedy kończysz negocjacje i wracasz do rynku.",
      "Plan alternatywny na wypadek wycofania się kupującego.",
    ],
    frameworkEyebrow: "Plan negocjacji",
    frameworkTitle: "Scenariusz rozmowy w 5 krokach",
    mistakesTitle: "Najczęstsze błędy w negocjacjach ceny",
    checklistTitle: "Checklista przygotowania do negocjacji",
    checklistCardText: "Punkt kontrolny przygotowania negocjacyjnego przed kolejną rundą rozmów.",
    checklistMetric: "Negocjacje",
    framework: [
      "Krok 1: przygotowanie mapy interesów obu stron i listy warunków poza ceną.",
      "Krok 2: rozmowa otwierająca - diagnoza motywacji kupującego i jego realnych ograniczeń.",
      "Krok 3: prezentacja wartości + pierwsza kotwica cenowa osadzona w danych.",
      "Krok 4: wymiana ustępstw warunkowych (nigdy jednostronnych) i pisemne podsumowanie.",
      "Krok 5: decyzja końcowa - akceptacja, kontynuacja z korektą lub kontrolowane zakończenie rozmów.",
    ],
    mistakes: [
      "Zbyt szybkie ujawnienie minimalnej ceny akceptowalnej.",
      "Bronienie samej liczby zamiast całego pakietu warunków transakcji.",
      "Brak notatek i pisemnych podsumowań po rozmowach.",
      "Ustępstwa „za nic” - bez równoważnej koncesji drugiej strony.",
      "Podejmowanie decyzji pod wpływem presji czasu bez weryfikacji alternatyw.",
    ],
    closing: "Dobre negocjacje nie polegają na twardości dla samej twardości, ale na konsekwencji i strukturze. Kiedy kontrolujesz tempo, kolejność tematów i zasady ustępstw, finalna cena jest skutkiem procesu, a nie przypadku.",
  },
};

const heroSlugs = [
  "7-sygnalow-ze-cena-blokuje-sprzedaz",
  "home-staging-premium-bez-przepalania-budzetu",
  "dokumenty-do-sprzedazy-checklista-eksperta",
  "negocjacje-ceny-scenariusze-rozmowy",
];

const frameworkHeroWords = ["Audyt", "Analiza", "Pozycja", "Monitoring", "Decyzja"];
const frameworkImages = [
  "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7578914/pexels-photo-7578914.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7948071/pexels-photo-7948071.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/8293703/pexels-photo-8293703.jpeg?auto=compress&cs=tinysrgb&w=1800",
];
const mistakeImages = [
  "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/8293693/pexels-photo-8293693.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/3811082/pexels-photo-3811082.jpeg?auto=compress&cs=tinysrgb&w=1800",
];
const checklistImages = [
  "https://images.pexels.com/photos/7578903/pexels-photo-7578903.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/8292799/pexels-photo-8292799.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7415036/pexels-photo-7415036.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7821510/pexels-photo-7821510.jpeg?auto=compress&cs=tinysrgb&w=1800",
];

export default function BlogArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = String(params.slug);
  const [cmsArticle, setCmsArticle] = useState<CmsBlogPostRecord | null>(null);
  const fallbackArticle = articles[slug];
  const article = cmsArticle
    ? {
        title: cmsArticle.title ?? "Artykuł",
        lead: cmsArticle.excerpt ?? "Treść artykułu z CMS.",
        category: cmsArticle.category?.name ?? cmsArticle.category?.attributes?.name ?? "Blog / CMS",
        readTime: "5 min czytania",
        points: [],
        checklist: [],
        showFramework: false,
        showMistakes: false,
        closing: cmsArticle.content ?? "",
      }
    : fallbackArticle;
  const year = new Date().getFullYear();
  const hasHero = heroSlugs.includes(slug);

  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const [activeMistakeIndex, setActiveMistakeIndex] = useState(0);
  const [currentChecklistSlide, setCurrentChecklistSlide] = useState(0);
  const [isChecklistPaused, setIsChecklistPaused] = useState(false);

  const signalCardRefs = useRef<Array<HTMLElement | null>>([]);
  const mistakeCardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let mounted = true;
    const loadCmsArticle = async () => {
      const post = await fetchCmsBlogPostBySlug(slug);
      if (mounted) {
        setCmsArticle(post);
      }
    };
    void loadCmsArticle();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const frameworkSteps = useMemo(() => {
    const list = article?.framework ?? [];
    return list.map((step, idx) => {
      const [left, ...right] = step.split(":");
      return {
        label: String(idx + 1).padStart(2, "0"),
        title: left?.trim() || `Krok ${idx + 1}`,
        text: right.join(":").trim() || step,
        hero: frameworkHeroWords[idx] ?? "Etap",
        image: frameworkImages[idx % frameworkImages.length],
      };
    });
  }, [article]);

  const mistakeCards = useMemo(
    () =>
      (article?.mistakes ?? []).map((text, idx) => ({
        text,
        image: mistakeImages[idx % mistakeImages.length],
      })),
    [article],
  );

  const checklistCards = useMemo(
    () =>
      (article?.checklist ?? []).map((text, idx) => ({
        title: text,
        text: article?.checklistCardText ?? "Element checklisty do wdrożenia przed kolejnym etapem sprzedaży.",
        metric: article?.checklistMetric ?? "Checklista wdrożenia",
        image: checklistImages[idx % checklistImages.length],
      })),
    [article],
  );

  const showFrameworkSection = (article?.showFramework ?? true) && frameworkSteps.length > 0;
  const showMistakesSection = (article?.showMistakes ?? true) && mistakeCards.length > 0;

  useEffect(() => {
    if (!article) return;
    const updateByCenter = (refs: Array<HTMLElement | null>, setter: (idx: number) => void) => {
      const viewportCenter = window.innerHeight * 0.45;
      let closest = 0;
      let minDistance = Number.POSITIVE_INFINITY;
      refs.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = idx;
        }
      });
      setter(closest);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        updateByCenter(signalCardRefs.current, setActiveSignalIndex);
        updateByCenter(mistakeCardRefs.current, setActiveMistakeIndex);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [article]);

  useEffect(() => {
    if (!checklistCards.length) return;
    const timer = setInterval(() => {
      if (!isChecklistPaused) setCurrentChecklistSlide((s) => (s + 1) % checklistCards.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [checklistCards.length, isChecklistPaused]);

  if (!article) {
    return (
      <main className="article-page">
        <section className="section">
          <div className="container article-shell">
            <p className="eyebrow">Blog</p>
            <h1 className="section-title">Artykuł nie został znaleziony</h1>
            <p className="section-copy">Sprawdź listę materiałów na stronie bloga.</p>
            <a href={ROUTE_PATHS.blog} className="link-arrow">Wróć do bloga</a>
          </div>
        </section>
      </main>
    );
  }

  const checklistRelativeIndex = (idx: number) => {
    const len = checklistCards.length;
    let diff = (idx - currentChecklistSlide + len) % len;
    if (diff > len / 2) diff -= len;
    return diff;
  };

  return (
    <>
      <main className={`article-page ${hasHero ? "article-page--hero" : ""}`}>
        <SiteTopbar />

        {hasHero && (
          <section className="section article-hero">
            <video className="article-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
              <source src="/Hero-7.mp4" type="video/mp4" />
            </video>
            <div className="article-hero-overlay" aria-hidden="true"></div>
            <div className="container article-hero-shell">
              <p className="eyebrow">{article.category}</p>
              <h1 className="section-title">{article.title}</h1>
              <p className="section-copy">{article.lead}</p>
              <p className="article-meta">{article.readTime}</p>
            </div>
          </section>
        )}

        <section className="section">
          <div className="container article-shell">
            {!hasHero && (
              <>
                <p className="eyebrow">{article.category}</p>
                <h1 className="section-title">{article.title}</h1>
                <p className="section-copy">{article.lead}</p>
                <p className="article-meta">{article.readTime}</p>
              </>
            )}

            {!!article.signals?.length && (
              <div className="signals-layout">
                <aside className="signals-copy">
                  <div className="signals-progress">{activeSignalIndex + 1} / {article.signals.length}</div>
                  <p className="signals-lead">{article.signals[activeSignalIndex]?.title}</p>
                </aside>
                <div className="signals-visuals">
                  {article.signals.map((signal, idx) => (
                    <article key={signal.title} ref={(el) => { signalCardRefs.current[idx] = el; }} className={`signal-card ${idx === activeSignalIndex ? "active" : ""}`} style={{ ["--bg" as string]: `url(${signal.image})` }}>
                      <p><strong>Dlaczego to ważne:</strong> {signal.why}</p>
                      <p><strong>Co zrobić:</strong> {signal.action}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showFrameworkSection && (
            <div className="article-process-wrap process">
              <div className="container">
                <header className="process-head">
                  <p className="eyebrow">{article.frameworkEyebrow ?? "Plan pracy"}</p>
                  <h2 className="section-title">{article.frameworkTitle ?? "Plan działania na 14 dni"}</h2>
                </header>
              </div>
              <div className="service-board">
                {frameworkSteps.map((step) => (
                  <article key={step.label} className="service-row" style={{ ["--bg" as string]: `url(${step.image})` }}>
                    <div className="service-info"><p className="idx"><span className="idx-text">{step.label}</span></p><h3>{step.title}</h3><p>{step.text}</p></div>
                    <div className="service-word"><span>{step.hero}</span></div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="container article-shell">
            {showMistakesSection && (
              <div className="article-mistakes-layout">
                <aside className="article-mistakes-copy">
                  <h2>{article.mistakesTitle ?? "Najczęstsze błędy przy korekcie ceny"}</h2>
                  <p>To punkty, które najczęściej psują pozycję negocjacyjną i wydłużają sprzedaż. Jeśli wyeliminujesz je na starcie, decyzje cenowe będą bardziej przewidywalne i oparte na danych.</p>
                </aside>
                <div className="article-mistakes-visuals">
                  <div className="article-mistakes-grid">
                    {mistakeCards.map((item, idx) => (
                      <article key={item.text} ref={(el) => { mistakeCardRefs.current[idx] = el; }} className={`article-mistake-item ${idx === activeMistakeIndex ? "active" : ""}`}>
                        <img src={item.image} alt={item.text} />
                        <p>{item.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!!checklistCards.length && (
              <div className="article-checklist-stage">
                <div className="article-checklist-head"><h2 className="section-title">{article.checklistTitle ?? "Checklista do wdrożenia"}</h2></div>
                <div className="article-checklist-carousel" onMouseEnter={() => setIsChecklistPaused(true)} onMouseLeave={() => setIsChecklistPaused(false)}>
                  {checklistCards.map((item, idx) => {
                    const r = checklistRelativeIndex(idx);
                    return (
                      <article key={item.title} className={`article-checklist-panel ${r === 0 ? "center" : ""} ${r === -1 ? "left" : ""} ${r === 1 ? "right" : ""} ${Math.abs(r) > 1 ? "hidden" : ""}`} style={{ ["--bg" as string]: `url(${item.image})` }} onClick={() => setCurrentChecklistSlide(idx)}>
                        <div className="article-checklist-panel-overlay">
                          <p className="article-checklist-kicker">{String(idx + 1).padStart(2, "0")}</p>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                          <div className="article-checklist-metric">{item.metric}</div>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <div className="article-checklist-dots" role="tablist" aria-label="Nawigacja checklisty">
                  {checklistCards.map((item, idx) => (
                    <button key={`checklist-dot-${item.title}`} className={`article-checklist-dot ${idx === currentChecklistSlide ? "active" : ""}`} aria-label={`Przejdź do elementu checklisty ${idx + 1}`} onClick={() => setCurrentChecklistSlide(idx)}><span className="dot-core"></span></button>
                  ))}
                </div>
              </div>
            )}

            {!!article.closing && <p className="article-closing">{article.closing}</p>}

            <div className="surface faq-box">
              <h2>Co zrobić po przeczytaniu artykułu</h2>
              <h3>Wybierz odpowiednią ścieżkę i przejdź do formularza</h3>
              <p>
                Jeśli temat dotyczy sprzedaży mieszkania, przejdź do formularza wyceny. Jeśli
                planujesz inwestowanie, wybierz ścieżkę inwestycyjną i umów rozmowę.
              </p>
              <p className="section-copy">
                Powiązane ścieżki:
                {" "}
                <a href={`${ROUTE_PATHS.sprzedaz}#wycena`}>Sprzedaż / Wycena</a>
                {" | "}
                <a href={ROUTE_PATHS.inwestycje}>Inwestycje</a>
                {" | "}
                <a href={`${ROUTE_PATHS.kontakt}#kontakt`}>Kontakt / Konsultacja</a>
              </p>
              <div className="sale-cta-actions">
                <a href={`${ROUTE_PATHS.sprzedaz}#wycena`} className="prefooter-btn">
                  <span className="prefooter-btn-text-wrap" aria-hidden="true">
                    <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do wyceny</span>
                    <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do wyceny</span>
                  </span>
                  <span className="sr-only">Przejdź do wyceny</span>
                  <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
                </a>
                <a href={`${ROUTE_PATHS.kontakt}#kontakt`} className="prefooter-btn">
                  <span className="prefooter-btn-text-wrap" aria-hidden="true">
                    <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span>
                    <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span>
                  </span>
                  <span className="sr-only">Umów konsultację</span>
                  <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
                </a>
                <a href={ROUTE_PATHS.inwestycje} className="prefooter-btn">
                  <span className="prefooter-btn-text-wrap" aria-hidden="true">
                    <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do inwestycji</span>
                    <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do inwestycji</span>
                  </span>
                  <span className="sr-only">Przejdź do inwestycji</span>
                  <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Koniec przewijania? Zróbmy pierwszy krok."
          title="Sprzedaj mieszkanie spokojnie i na dobrych warunkach."
          buttons={[{ href: `${ROUTE_PATHS.kontakt}#kontakt`, label: "Umów konsultację" }]}
        />
        <SiteFooter year={year} />
      </div>
      <ScrollToTopButton />
    </>
  );
}

