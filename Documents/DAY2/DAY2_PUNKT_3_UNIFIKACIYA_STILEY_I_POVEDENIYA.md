# Day 2 — Пункт 3: Унифицировать стили и поведение

## Цель пункта
Сделать одинаковое поведение и единый UI-паттерн для повторяющихся элементов на страницах сайта.

## Что реализовано в коде
- Валидация форм уже унифицирована и используется из одного места:
  - `src/lib/form-validation.ts`
  - подключено в `ContactForm` и `WycenaSection`.
- Создан единый компонент кнопки "вверх" `ScrollToTopButton`:
  - `src/components/scroll-to-top-button.tsx`.
- На страницах заменен локальный дублирующийся код кнопки "вверх" на общий компонент.

## Файлы, которые подтверждают выполнение
- `src/lib/form-validation.ts`
- `src/components/contact-form.tsx`
- `src/components/wycena-section.tsx`
- `src/components/scroll-to-top-button.tsx`
- `src/app/page.tsx`
- `src/app/kontakt/page.tsx`
- `src/app/o-mnie/page.tsx`
- `src/app/bledy/page.tsx`
- `src/app/kalkulator/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

## Итог
Пункт 3 закрыт: поведение форм и повторяющиеся UI-элементы унифицированы через общие компоненты и единые обработчики.
