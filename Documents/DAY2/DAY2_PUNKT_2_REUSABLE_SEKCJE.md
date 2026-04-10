# Day 2 — Пункт 2: Сделать секции переиспользуемыми

## Цель пункта
Убрать повторяющиеся секции в страницах и вынести их в общие компоненты, чтобы новые страницы собирались быстрее и без копипаста.

## Что реализовано в коде
- Создан общий компонент `LeadContactSection` в `src/components/lead-contact-section.tsx`.
- Создан общий компонент `PageIntroSection` в `src/components/page-intro-section.tsx`.
- На `Glowna`, `Kontakt`, `Inwestycje` подключен `LeadContactSection`.
- На `Sprzedaz` и `Inwestycje` подключен `PageIntroSection`.

## Файлы, которые подтверждают выполнение
- `src/components/lead-contact-section.tsx`
- `src/components/page-intro-section.tsx`
- `src/app/page.tsx`
- `src/app/kontakt/page.tsx`
- `src/app/inwestycje/page.tsx`
- `src/app/sprzedaz/page.tsx`

## Итог
Пункт 2 закрыт: повторяемые секции вынесены в reusable-компоненты и переиспользуются на ключевых страницах текущего этапа.
