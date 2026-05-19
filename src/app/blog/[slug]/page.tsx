"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ROUTE_PATHS } from "@/config/navigation";
import { CtaClickLink } from "@/components/cta-click-link";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
import { RemoteFillImage } from "@/components/remote-fill-image";
import { fetchCmsBlogPostBySlug, type CmsBlogPostRecord } from "@/lib/cms";
import { isUsableCmsBlogPost } from "@/lib/cms-content";

type ArticleSection = {
  title: string;
  paragraphs: string[];
};

type Article = {
  title: string;
  lead: string;
  category: string;
  readTime: string;
  points: string[];
  intro?: string[];
  sections?: ArticleSection[];
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
  disclaimer?: string;
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
  "jak-przygotowac-mieszkanie-do-sprzedazy": {
    title: "Jak przygotować mieszkanie do sprzedaży, aby zwróciło uwagę nawet najbardziej wymagających klientów?",
    lead:
      "Prezentacja nieruchomości ma istotne znaczenie dla sukcesu transakcji. Zobacz, na czym polega home staging i od czego zacząć przygotowanie mieszkania krok po kroku.",
    category: "Home staging / przygotowanie oferty",
    readTime: "10 min czytania",
    points: [],
    intro: [
      "Prezentacja nieruchomości ma istotne znaczenie dla sukcesu transakcji.",
      "W tym artykule wyjaśnimy, na czym polega profesjonalny home staging i jakie elementy są decydujące, by mieszkanie prezentowało się perfekcyjnie i przyciągało zainteresowanie.",
      "Znajomość tych zasad pomoże maksymalizować wartość oferty na rynku premium, przyspieszając proces sprzedaży i zwiększając zadowolenie potencjalnych nabywców.",
    ],
    sections: [
      {
        title: "Profesjonalne przygotowanie mieszkania do sprzedaży – sekrety home stagingu",
        paragraphs: [
          "Home staging to proces aranżacji wnętrz, którego celem jest zwiększenie atrakcyjności nieruchomości na rynku. Specjaliści stosują techniki takie jak odpowiednie oświetlenie, malowanie, dekorowanie oraz strategiczne rozmieszczenie mebli, aby wykreować przestrzenie zapraszające i funkcjonalne, podkreślając atuty nieruchomości.",
          "Profesjonalne przygotowanie mieszkania do sprzedaży pozwala przyciągnąć więcej potencjalnych nabywców, zwiększyć wartość transakcyjną nieruchomości oraz skrócić czas potrzebny na jej sprzedaż.",
        ],
      },
      {
        title: "Od czego zacząć przygotowanie nieruchomości do sprzedaży?",
        paragraphs: [
          "Pierwszym krokiem jest ocena aktualnego stanu nieruchomości. To ważny moment, który pozwala określić zakres niezbędnych działań.",
          "W niektórych przypadkach wystarczy gruntowne sprzątanie, usunięcie zbędnych przedmiotów i dodanie kilku dekoracji, aby wnętrze zyskało na atrakcyjności. Inne nieruchomości mogą wymagać bardziej zaawansowanych interwencji, takich jak malowanie ścian czy cyklinowanie podłóg, aby odświeżyć przestrzeń i nadać jej nowoczesny wygląd.",
          "Dostosowanie działań do stanu nieruchomości pozwala zmaksymalizować jej wartość i przyciągnąć więcej potencjalnych kupców.",
        ],
      },
      {
        title: "Jak przygotować mieszkanie do sprzedaży krok po kroku",
        paragraphs: [
          "Sprzedaż mieszkania wymaga nie tylko atrakcyjnej oferty, ale także odpowiedniego przygotowania wnętrza. Poniżej przedstawiamy szczegółowy plan działania, który pomoże Ci w pełni przygotować mieszkanie do sprzedaży, krok po kroku.",
        ],
      },
      {
        title: "Krok 1. Czystość i porządek",
        paragraphs: [
          "Pierwszym krokiem jest dokładne sprzątanie mieszkania, z naciskiem na łazienki i kuchnie. To właśnie te pomieszczenia często decydują o pierwszym wrażeniu.",
          "Warto zadbać o czystość wszystkich powierzchni, w tym armatury, blatów, fug i podłóg. Wszystkie ślady użytkowania, plamy czy zacieki muszą zostać usunięte.",
          "W łazienkach i kuchniach sprawdź stan wyposażenia i usuń zbędne przedmioty, aby przestrzeń wydawała się większa i bardziej uporządkowana.",
        ],
      },
      {
        title: "Krok 2. Depersonalizacja — mniej „Twojego”, więcej przestrzeni",
        paragraphs: [
          "Kupujący musi móc wyobrazić sobie własne życie w mieszkaniu. Dlatego warto ograniczyć liczbę osobistych przedmiotów: rodzinne zdjęcia, pamiątki, nadmiar bibelotów i rzeczy na blatach.",
          "Schowaj sezonowe ubrania, zabawki i wszystko, co wizualnie „zabiera” metraż. Otwarte powierzchnie i puste szafy (częściowo) sprawiają, że lokal wydaje się większy i bardziej uporządkowany.",
        ],
      },
      {
        title: "Krok 3. Drobne naprawy i odświeżenie",
        paragraphs: [
          "Po ocenie stanu nieruchomości zajmij się elementami, które psują odbiór jakości: pęknięte fugi, porysowane blaty, niedziałające zamki czy cienie na ścianach.",
          "Często wystarczy odświeżające malowanie w neutralnym kolorze lub cyklinowanie podłóg, aby nadać wnętrzu nowoczesny wygląd — dokładnie tak, jak opisaliśmy w sekcji o pierwszej ocenie mieszkania.",
          "Naprawy niewymagające remontu generalnego, ale widoczne na zdjęciach i podczas prezentacji, warto zrobić przed publikacją oferty.",
        ],
      },
      {
        title: "Krok 4. Oświetlenie i kolory",
        paragraphs: [
          "Home staging mocno opiera się na świetle. Doświetl ciemne kąty, wymień przepalone żarówki i ujednolić temperaturę barwową w całym mieszkaniu.",
          "Jasne, neutralne ściany (biel, ciepła szarość, beż) pomagają podkreślić metraż i sprawiają, że wnętrze jest bardziej uniwersalne dla wymagających klientów z segmentu premium.",
        ],
      },
      {
        title: "Krok 5. Meble, dekoracje i układ przestrzeni",
        paragraphs: [
          "Strategiczne rozmieszczenie mebli powinno prowadzić wzrok kupującego przez najmocniejsze atuty: salon, ekspozycję okien, strefę dzienną.",
          "Zostaw tylko niezbędne meble w proporcjach dopasowanych do pokoju. Kilka starannie dobranych dekoracji (rośliny, poduszki, obraz) wystarczy — nadmiar sprawia wrażenie chaosu.",
          "W każdym pomieszczeniu powinna być jedna dominująca funkcja: tutaj odpoczynek, tutaj praca, tutaj jedzenie. To ułatwia szybką decyzję kupującego.",
        ],
      },
      {
        title: "Krok 6. Detale przed pokazem i zdjęciami",
        paragraphs: [
          "Tuż przed sesją zdjęciową lub wizytą sprawdź detale: czyste lustra, świeże ręczniki w łazience, porządek w szafach widocznych w kadrze, brak intensywnych zapachów.",
          "Wietrz mieszkanie i unikaj agresywnych odświeżaczy — naturalny, świeży zapach buduje zaufanie lepiej niż „efekt hotelu”.",
        ],
      },
      {
        title: "Krok 7. Spójność online i na żywo",
        paragraphs: [
          "Zdjęcia w ogłoszeniu powinny odpowiadać temu, co zobaczy klient na prezentacji. Ten sam układ mebli, porządek i światło — bez „niespodzianek” po wejściu do drzwi.",
          "Dobrze przygotowane wnętrze w materiałach marketingowych przyciąga bardziej świadomych nabywców i skraca drogę od oglądania do rozmowy o warunkach transakcji.",
        ],
      },
    ],
    closing:
      "Przygotowanie mieszkania do sprzedaży to proces: od czystości i oceny stanu, przez home staging, aż po spójną prezentację w ogłoszeniu i na żywo. Im lepiej dopracujesz każdy krok, tym łatwiej wyróżnisz ofertę na rynku premium i przyspieszysz sprzedaż.",
    checklist: [],
    showFramework: false,
    showMistakes: false,
  },
  "dokumenty-do-sprzedazy-checklista-eksperta": {
    title: "Jakie dokumenty są potrzebne do sprzedaży mieszkania?",
    lead:
      "Numer księgi wieczystej potwierdza prawo własności i obciążenia hipoteczne — ale to nie jedyny dokument. Zobacz pełny zestaw papierów przy sprzedaży mieszkania własnościowego, spółdzielczego i z kredytem.",
    category: "Formalności / sprzedaż mieszkania",
    readTime: "14 min czytania",
    points: [],
    intro: [
      "Numer księgi wieczystej jest ważnym elementem w procesie sprzedaży nieruchomości, ponieważ potwierdza prawo własności oraz obciążenia hipoteczne. Ale nie jedynym.",
      "Istotne jest też zaświadczenie o zameldowaniu, potwierdzenie wniesienia opłaty przekształceniowej — jeśli nadal widnieje jako roszczenie w III dziale KW — oraz zaświadczenie ze wspólnoty o wysokości opłat miesięcznych i potwierdzające brak zaległości zbywcy w opłatach.",
      "Przy sprzedaży mieszkania — własnościowego, spółdzielczego własnościowego lub nabytego na kredyt — zestaw wymaganych dokumentów może się różnić. Dokumenty te ułatwiają przeprowadzenie transakcji, zapewniając bezpieczeństwo prawne i finansowe obu stron.",
    ],
    sections: [
      {
        title: "Akt notarialny potwierdzający prawo własności — fundament prawny transakcji",
        paragraphs: [
          "Bez względu na to, czy nieruchomość została zakupiona, otrzymana w spadku, czy jest darowizną — przy każdej transakcji sprzedaży mieszkania wymagany jest akt notarialny potwierdzający własność. Ten formalny dokument, sporządzony i podpisany w obecności notariusza, stanowi dowód prawny, że osoba sprzedająca jest rzeczywiście właścicielem nieruchomości.",
          "Akt notarialny nabycia zawiera kluczowe informacje: opis mieszkania, lokalizację, dane właściciela oraz historię przeniesienia własności. Jest podstawą do wpisu zmian w księdze wieczystej — kolejnego kroku w prawidłowym przekazaniu tytułu własności.",
          "Posiadanie aktualnego aktu notarialnego ułatwia legalne i bezproblemowe przejście praw własności, co zapewnia bezpieczeństwo prawne sprzedającemu i kupującemu. Brak tego dokumentu może uniemożliwić transakcję lub prowadzić do sporów prawnych.",
          "Notariusz przed sporządzeniem aktu weryfikuje legalność dokumentów oraz zgodność danych z księgą wieczystą. Akt notarialny jest też wymagany do wpisu zmiany właściciela w KW — bez tego kupujący nie zostanie uznany za nowego właściciela.",
        ],
      },
      {
        title: "Mieszkanie własnościowe — jakie dokumenty przygotować",
        paragraphs: [
          "Przy lokalu na prawie własności podstawą jest aktualny odpis z księgi wieczystej (najlepiej nie starszy niż kilka miesięcy). W dziale II widać właściciela, w dziale III — roszczenia i ograniczenia, w dziale IV — hipotekę i inne obciążenia.",
          "Do paczki dołącz akt notarialny nabycia oraz zaświadczenie z urzędu gminy o osobach zameldowanych w lokalu.",
          "Z wspólnoty mieszkaniowej (lub zarządcy) pobierz zaświadczenie o wysokości opłat eksploatacyjnych i braku zaległości po stronie sprzedającego.",
          "Przy sprzedaży lokalu przekazujesz ważne świadectwo charakterystyki energetycznej — to ustawowy obowiązek przy zbyciu budynku lub lokalu. Przygotuj też projekt protokołu zdawczo-odbiorczego.",
        ],
      },
      {
        title: "Mieszkanie spółdzielcze własnościowe — na co zwrócić uwagę",
        paragraphs: [
          "Lokal spółdzielczy własnościowy po przekształceniu jest wpisany w księdze wieczystej jak pełna własność. Sprawdź dział III: czy nie widnieje roszczenie dotyczące opłaty przekształceniowej.",
          "Ze spółdzielni mieszkaniowej pobierz zaświadczenie o braku zaległości i informację, czy statut wymaga zgody spółdzielni na sprzedaż.",
          "Dołącz dokumenty nabycia oraz zaświadczenie o zameldowaniu. Spójność danych między KW, aktami a stanem faktycznym ogranicza opóźnienia u notariusza i w banku kupującego.",
        ],
      },
      {
        title: "Mieszkanie nabyte na kredyt — dokumenty przy sprzedaży z hipoteką",
        paragraphs: [
          "Gdy w dziale IV księgi wieczystej widnieje hipoteka, sprzedaż wymaga koordynacji ze spłatą kredytu. Bank podaje saldo zadłużenia i warunki zamknięcia kredytu w dniu aktu notarialnego.",
          "Najczęściej hipotekę spłaca się ze środków kupującego — notariusz lub bank prowadzi wypłatę z zabezpieczeniem.",
          "Po spłacie bank wydaje dokumenty do wykreślenia hipoteki z działu IV KW. Dołącz standardowy pakiet: odpis KW, akt nabycia, zaświadczenia z wspólnoty, zameldowanie i świadectwo energetyczne.",
        ],
      },
      {
        title: "Akt notarialny nabycia i akt sprzedaży — czym się różnią",
        paragraphs: [
          "Przy sprzedaży potrzebujesz aktu notarialnego nabycia (skąd masz własność) oraz nowego aktu sprzedaży (przenosi własność na kupującego).",
          "Akt nabycia to dowód, że jesteś właścicielem. Akt sprzedaży podpisujecie w dniu transakcji — wraz z wpisem w KW przenosi własność.",
          "Notariusz sprawdza dokumenty, zgodność z KW i brak sprzeczności prawnych. Dopiero po spełnieniu warunków (np. spłacie hipoteki) wpisuje nowego właściciela w dziale II KW.",
        ],
      },
      {
        title: "Podsumowanie — uporządkuj dokumenty przed wystawieniem oferty",
        paragraphs: [
          "Najczęstsze opóźnienia: nieaktualny odpis KW, zaległości w wspólnocie, nierozliczona opłata przekształceniowa w dziale III albo niewykreślona hipoteka w dziale IV.",
          "Złóż dokumenty w jednej teczce i odnawiaj zaświadczenia — większość ma krótki termin ważności. Porządek na starcie wzmacnia negocjacje i skraca drogę do aktu u notariusza.",
        ],
      },
    ],
    closing:
      "Im wcześniej ułożysz dokumenty, tym spokojniejsza sprzedaż. Chcesz oszacować wartość mieszkania przed ofertą? Skorzystaj z bezpłatnego kalkulatora wyceny.",
    disclaimer:
      "Artykuł ma charakter informacyjny i nie zastępuje porady notariusza, radcy prawnego ani doradcy bankowego. Szczegóły zależą od stanu prawnego lokalu — w razie wątpliwości skonsultuj sprawę ze specjalistą.",
    checklist: [],
    showFramework: false,
    showMistakes: false,
  },
  "jakie-dokumenty-przygotowac-dla-agencji-nieruchomosci": {
    title: "Jakie dokumenty przygotować dla agencji nieruchomości?",
    lead:
      "Sprzedaż nieruchomości bądź też jej wynajem wymaga przygotowania dokumentów. Sam opis mieszkania, domu czy działki nie wystarczy pośrednikowi — poniżej znajdziesz, co przygotować dla agencji, która ma zająć się Twoją nieruchomością.",
    category: "Formalności / agencja",
    readTime: "20 min czytania",
    points: [],
    intro: [
      "Profesjonalni pośrednicy muszą znać pełną sytuację prawną nieruchomości — nie mogą oferować lokalu bez kompletu dokumentów.",
      "W tym artykule dowiesz się: dlaczego komplet dokumentów jest ważny dla bezpieczeństwa i szybkości sprzedaży lub wynajmu; jakie dokumenty są wymagane przy sprzedaży mieszkania z odrębną własnością oraz przy spółdzielczym prawie do lokalu; jakie formalności obowiązują przy mieszkaniu z kredytem hipotecznym; jakie dokumenty są potrzebne przy sprzedaży domu i działki; oraz co przedstawić agencji przy wynajmie.",
    ],
    sections: [
      {
        title: "Dlaczego komplet dokumentów jest tak ważny dla agencji nieruchomości?",
        paragraphs: [
          "Agencja, dysponując pełnym zestawem dokumentów, może od razu przygotować rzetelną ofertę, zweryfikować stan prawny i odpowiedzieć na szczegółowe pytania potencjalnych klientów. Brak istotnych zaświadczeń lub nieaktualne dokumenty często powodują przestoje — uzupełnianie ich wydłuża finalizację transakcji.",
          "Komplet dokumentów pozwala wyeliminować zagrożenia: nieuregulowany stan własności, obciążenia hipoteczne czy roszczenia osób trzecich. Dzięki analizie dokumentacji pośrednik zabezpiecza interesy obu stron.",
          "Weryfikacja stanu prawnego — w tym księgi wieczystej — pozwala uniknąć problemów w przyszłości i przeprowadzić transakcję zgodnie z przepisami.",
        ],
      },
      {
        title: "Dokumenty potrzebne przy sprzedaży mieszkania na rynku wtórnym",
        paragraphs: [
          "Aby odpowiedzieć, jakie dokumenty są potrzebne przy sprzedaży mieszkania, trzeba określić rodzaj prawa do lokalu: odrębna własność czy spółdzielcze własnościowe prawo do lokalu.",
        ],
      },
      {
        title: "Pełna własność mieszkania z księgą wieczystą",
        paragraphs: [
          "Akt notarialny — zgodnie z Kodeksem cywilnym sprzedaż mieszkania wymaga udziału notariusza, który weryfikuje dokumenty i poświadcza transakcję.",
          "Księga wieczysta jest publicznym rejestrem stanu prawnego: dane właściciela, położenie nieruchomości, wpisy o prawach, roszczeniach i obciążeniach (np. hipoteka). Umożliwia sprawdzenie, kto jest właścicielem i czy lokal nie jest obciążony prawami osób trzecich.",
          "Zaświadczenie o braku zameldowanych osób w mieszkaniu można uzyskać online lub w urzędzie gminy.",
          "Świadectwo charakterystyki energetycznej określa m.in. roczne zapotrzebowanie na energię, emisję CO₂, izolację, systemy grzewcze i wskazówki modernizacyjne — jest wymagane przy zbyciu lokalu.",
          "Zaświadczenie o niezaleganiu w opłatach czynszowych i eksploatacyjnych wydaje wspólnota, spółdzielnia lub zarządca i potwierdza brak zaległości z tytułu czynszu, mediów (gdy rozlicza zarządca), funduszu remontowego i innych opłat.",
        ],
      },
      {
        title: "Własność ze spadku lub darowizny — dodatkowe dokumenty",
        paragraphs: [
          "Potrzebne są: księga wieczysta, zaświadczenie o braku zameldowanych osób, świadectwo energetyczne oraz zaświadczenie o niezaleganiu z opłatami administracyjnymi.",
          "Dodatkowo — podstawa nabycia: postanowienie sądu lub akt poświadczenia dziedziczenia (z protokołem).",
          "Ważne bywa zaświadczenie z Urzędu Skarbowego o zwolnieniu lub opłaceniu podatku od spadku lub darowizny (nie jest wymagane, gdy nabycie nastąpiło na podstawie umowy w formie aktu notarialnego lub gdy było zwolnione w ramach dziedziczenia po osobach najbliższych).",
        ],
      },
      {
        title: "Spółdzielcze własnościowe prawo do lokalu z księgą wieczystą",
        paragraphs: [
          "Przy sprzedaży często wymagana jest zgoda spółdzielni mieszkaniowej. Oprócz numeru KW (gdy istnieje) potrzebne są: zaświadczenie ze spółdzielni do sprzedaży, podstawa nabycia (akt notarialny lub przydział), zaświadczenie o braku zameldowanych osób oraz świadectwo charakterystyki energetycznej.",
        ],
      },
      {
        title: "Spółdzielcze prawo do lokalu bez KW — z uregulowanym gruntem",
        paragraphs: [
          "Wymagane są dokumenty jak wyżej, z naciskiem na zaświadczenie ze spółdzielni do sprzedaży — określa właściciela. Potrzebne jest też zaświadczenie o braku przeciwwskazań do założenia księgi wieczystej, wydawane przez spółdzielnię.",
        ],
      },
      {
        title: "Spółdzielcze prawo do lokalu bez KW i bez uregulowanych gruntów",
        paragraphs: [
          "Potrzebne są te same zaświadczenia co wyżej. Nie ma możliwości kredytu przy zakupie — możliwa jest wyłącznie płatność gotówką.",
        ],
      },
      {
        title: "Formalności przy mieszkaniu obciążonym kredytem hipotecznym",
        paragraphs: [
          "Notariusz wymaga zaświadczenia z banku z informacją o: warunkach i możliwościach spłaty kredytu, pozostałej kwocie, numerze rachunku do spłaty, zgodzie na wcześniejszą spłatę, zgodzie na zwolnienie zabezpieczenia po spłacie oraz o braku umowy na podstawienie wierzytelności.",
        ],
      },
      {
        title: "Rzut mieszkania jako dodatkowy dokument",
        paragraphs: [
          "Rzut przedstawia układ pomieszczeń (płaski schemat lub wizualizacja 3D): elementy konstrukcyjne, instalacje, drzwi, okna, wymiary i orientację względem stron świata.",
        ],
      },
      {
        title: "Jakie dokumenty przygotować przy sprzedaży domu?",
        paragraphs: [
          "Dodatkowo: aktualny wyrys i wypis z rejestru gruntów; zaświadczenie o przeznaczeniu w MPZP lub o braku planu; zaświadczenie o braku zaległości w podatku od nieruchomości lub opłacie z tytułu użytkowania wieczystego; zaświadczenie o objęciu uproszczonym planem urządzenia lasu; zaświadczenie o braku osób zameldowanych w budynku.",
        ],
      },
      {
        title: "Dokumenty niezbędne przy sprzedaży działki",
        paragraphs: [
          "Oprócz aktu notarialnego: aktualny wypis z rejestru gruntów; zaświadczenie o przeznaczeniu w MPZP; zaświadczenie o uproszczonym planie urządzenia lasu; zaświadczenie, czy działka jest w obszarze rewitalizacji lub Specjalnej Strefie Rewitalizacji.",
          "Gdy trzeba założyć księgę wieczystą — ważny jest wyrys z mapy ewidencji wraz z klauzulą do wpisu w KW.",
        ],
      },
      {
        title: "Jakie dokumenty przygotować dla agencji przy wynajmie?",
        paragraphs: [
          "Przy wynajmie bez bycia właścicielem — zaświadczenie o prawie do dysponowania nieruchomością (zgoda właściciela na wynajem).",
          "Gdy jesteś właścicielem — podobnie jak przy sprzedaży potrzebny jest akt notarialny nabycia oraz dokumenty potwierdzające stan prawny.",
        ],
      },
      {
        title: "FAQ — najczęściej zadawane pytania",
        paragraphs: [
          "Czy przy sprzedaży mieszkania zawsze potrzebny jest akt notarialny? Tak — potwierdza nabycie lub zbycie i jest wymagany przy sprzedaży mieszkania.",
          "Jakie dokumenty są potrzebne przy spółdzielczym własnościowym prawie do lokalu? M.in. zaświadczenie ze spółdzielni, podstawa nabycia, zameldowanie, świadectwo energetyczne oraz — w zależności od sytuacji — KW lub zaświadczenie o możliwości jej założenia.",
          "Jakie dodatkowe dokumenty przy mieszkaniu z kredytem hipotecznym? Zaświadczenie banku o saldzie, warunkach spłaty i zwolnieniu hipoteki po spłacie — koordynowane z notariuszem przy akcie sprzedaży.",
        ],
      },
    ],
    closing:
      "Uporządkuj dokumenty przed pierwszą rozmową z pośrednikiem — skrócisz czas od oferty do aktu. Chcesz oszacować wartość mieszkania? Skorzystaj z bezpłatnego kalkulatora wyceny na stronie.",
    disclaimer:
      "Artykuł ma charakter informacyjny i nie zastępuje porady notariusza, radcy prawnego ani doradcy bankowego. Szczegóły zależą od stanu prawnego nieruchomości i warunków umowy — w razie wątpliwości skonsultuj sprawę ze specjalistą.",
    checklist: [],
    showFramework: false,
    showMistakes: false,
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
  "jakie-dokumenty-przygotowac-dla-agencji-nieruchomosci",
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
  const article = useMemo(() => {
    const hasProseFallback =
      (fallbackArticle?.intro?.length ?? 0) > 0 || (fallbackArticle?.sections?.length ?? 0) > 0;

    if (hasProseFallback && fallbackArticle) {
      return fallbackArticle;
    }

    if (cmsArticle && isUsableCmsBlogPost(cmsArticle)) {
      return {
        title: cmsArticle.title ?? "Artykuł",
        lead: cmsArticle.excerpt ?? "",
        category: cmsArticle.category?.name ?? cmsArticle.category?.attributes?.name ?? "Blog",
        readTime: "5 min czytania",
        points: [],
        checklist: [],
        showFramework: false,
        showMistakes: false,
        closing: cmsArticle.content ?? "",
      };
    }
    return fallbackArticle;
  }, [cmsArticle, fallbackArticle]);
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
            <CtaClickLink href={ROUTE_PATHS.blog} className="link-arrow" ctaLocation="blog_article_back" ctaLabel="Wróć do bloga">
              Wróć do bloga
            </CtaClickLink>
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
            <HeroBackgroundVideo className="article-hero-video" src="/Hero-7.mp4" />
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

            {(!!article.intro?.length || !!article.sections?.length) && (
              <article className="article-prose">
                {article.intro?.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="article-prose-p">
                    {paragraph}
                  </p>
                ))}
                {article.sections?.map((section) => (
                  <div key={section.title} className="article-prose-section">
                    <h2 className="article-prose-h2">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="article-prose-p">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </article>
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
                        <RemoteFillImage src={item.image} alt={item.text} sizes="(max-width: 900px) 100vw, 40vw" />
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

            {!!article.disclaimer && <p className="article-disclaimer">{article.disclaimer}</p>}

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
                <CtaClickLink href={`${ROUTE_PATHS.sprzedaz}#wycena`} ctaLocation="blog_article_faq" ctaLabel="Sprzedaż / Wycena">
                  Sprzedaż / Wycena
                </CtaClickLink>
                {" | "}
                <CtaClickLink href={ROUTE_PATHS.inwestycje} ctaLocation="blog_article_faq" ctaLabel="Inwestycje">
                  Inwestycje
                </CtaClickLink>
                {" | "}
                <CtaClickLink href={`${ROUTE_PATHS.kontakt}#kontakt`} ctaLocation="blog_article_faq" ctaLabel="Kontakt / Konsultacja">
                  Kontakt / Konsultacja
                </CtaClickLink>
              </p>
              <div className="sale-cta-actions">
                <CtaClickLink href={`${ROUTE_PATHS.sprzedaz}#wycena`} className="prefooter-btn" ctaLocation="blog_article_cta" ctaLabel="Przejdź do wyceny">
                  <span className="prefooter-btn-text-wrap" aria-hidden="true">
                    <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do wyceny</span>
                    <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do wyceny</span>
                  </span>
                  <span className="sr-only">Przejdź do wyceny</span>
                  <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
                </CtaClickLink>
                <CtaClickLink href={`${ROUTE_PATHS.kontakt}#kontakt`} className="prefooter-btn" ctaLocation="blog_article_cta" ctaLabel="Umów konsultację">
                  <span className="prefooter-btn-text-wrap" aria-hidden="true">
                    <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span>
                    <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span>
                  </span>
                  <span className="sr-only">Umów konsultację</span>
                  <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
                </CtaClickLink>
                <CtaClickLink href={ROUTE_PATHS.inwestycje} className="prefooter-btn" ctaLocation="blog_article_cta" ctaLabel="Przejdź do inwestycji">
                  <span className="prefooter-btn-text-wrap" aria-hidden="true">
                    <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do inwestycji</span>
                    <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do inwestycji</span>
                  </span>
                  <span className="sr-only">Przejdź do inwestycji</span>
                  <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
                </CtaClickLink>
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
    </>
  );
}

