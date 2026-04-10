# Master Plan на 14 дней

## Фиксация scope (важно)
- Активный объем: `Glowna`, `Sprzedaz`, `Inwestycje`, `O mnie`, `Kontakt`, `Blog`
- `Portfolio`: вне текущего объема (отдельный этап / отдельный сайт)
- В проекте две формы: `kontakt` + `wycena nieruchomosci`

## Обязательные артефакты (должны быть зафиксированы)
- `DAY1_DECISION.md` — главный документ решений Day 1 (без разночтений)
- `CTA_MAP_V1.md` — карта CTA по страницам
- `FORM_KONTAKT_FIELDS_V1.md` — финальные поля формы `kontakt`
- `FORM_WYCENA_FIELDS_V1.md` — финальные поля формы `wycena`

## Критерии полноты Day 1 (must-have)
- Зафиксированы 2 lejki:
  - Lejek A (Seller): `Glowna -> Sprzedaz -> Kontakt`
  - Lejek B (Inwestor): `Glowna -> Inwestycje -> Kontakt`
- На `Glowna` есть 2 явных входа в lejki (Hero CTA: `Sprzedaj`, `Inwestuj`)
- Утверждена CTA-карта по страницам (какая кнопка куда ведет и к какой форме)
- Утверждены финальные поля обеих форм (`kontakt`, `wycena`) с required/optional
- Создан Day 1 decision-document как single source of truth

## Day 1 — База и структура (статус: DONE)
- Подтверждена карта страниц и сценарии лидогенерации
- Зафиксированы 2 lejki (seller/investor) и маршруты страниц
- Утверждена CTA-карта по страницам
- Утверждены поля форм: `kontakt` и `wycena`
- Унифицирован UI-скелет: общий header/footer, общие компоненты форм
- Документ решений Day 1: `DAY1_DECISION.md`
- Проверка соответствия Day 1 по коду и документам: DONE

## Day 2 — Архитектура и UI-основа (статус: PARTIAL DONE)
- Единый layout/navigation/component-base: DONE
- Дальнейшая чистка секций и reusable-блоков: DONE
- Маршрутизация под расширение без рефактора ядра: DONE
- Финальная донастройка адаптивности ключевых шаблонов: DONE 
- Mobile navigation (burger menu): кнопка, overlay, open/close state, блокировка фонового скролла, закрытие по ESC/клику вне меню

## Day 3 — CMS (Strapi) и модели данных
- Поднять Strapi
- Создать коллекции: `Page`, `BlogPost`, `Lead`, `SEO` (опционально `FAQ`, `Testimonials`)
- Настроить роли и доступы клиента
- Заполнить тестовыми данными для разработки

## Day 4 — Главная (конверсионная)
- Собрать lead-gen структуру (оффер, доказательства, процесс, CTA)
- Подключить контент из CMS
- Проверить mobile/tablet/desktop

## Day 5 — Страница Sprzedaz
- Структура процесса продажи (включая 5 шагов)
- Секции: выцена транзакционная vs офферная, маркетинг, отбор лидов, безопасность
- CTA на консультацию + форма wycena
- SEO-структура: H1/H2/H3

## Day 6 — Страница Inwestycje
- SEO-landing под inwestowanie/flipy Warszawa
- Секции: как работает, ошибки, для кого, CTA
- Internal linking (в т.ч. на kalkulator/wycena)
- Alt-тексты + SEO-семантика

## Day 7 — O mnie + personal brand
- Экспертный профиль и преимущества
- Конверсионная структура контента (сканируемая)
- CTA в оба lejki
- SEO-поля из CMS

## Day 8 — Kontakt + обе формы (UI/UX)
- Финализация страницы `Kontakt`
- Обе формы в целевом UX
- Клиентская валидация, состояния, сообщения, подтверждение отправки
- Унификация форменных компонентов
- Юридические согласия в формах + ссылки на политику приватности/RODO

## Day 9 — Backend обработки лидов
- Server-side validation + sanitization
- Сохранение лидов в `Lead` (Strapi/DB)
- Антиспам (honeypot/reCAPTCHA по необходимости)
- Логи и диагностика ошибок
- Базовая безопасность API (rate limit, CORS, защита endpoint-ов)
- Проверка доставки лида end-to-end (форма -> backend -> `Lead`/уведомление)

## Day 10 — Blog (listing + slug)
- Листинг статей + страница статьи по slug
- Подключение к CMS (`BlogPost`)
- Категории/теги (если нужны)
- Базовое SEO статей
- Fallback-поведение при недоступности CMS (без падения страницы)

## Day 11 — GA4 и события конверсии
- Интеграция GA4
- События: submit `kontakt`, submit `wycena`, клики CTA, contact-click
- Тесты Realtime/DebugView
- Маркировка ключевых событий как conversions

## Day 12 — Техническое SEO
- Metadata, canonical, OpenGraph, robots, sitemap
- Проверка индексации и URL
- Проверка заголовков и семантики
- Schema (LocalBusiness + дополнительные поля)
- Базовая accessibility-проверка (контраст, фокус, клавиатура, labels/aria)
- A11y-проверка burger menu: фокус-менеджмент, `aria-expanded`, `aria-controls`, keyboard navigation
- Подключение Google Search Console и Bing Webmaster
- Отправка sitemap в GSC/Bing
- Проверка noindex-гигиены (staging/preview закрыты, prod открыт)

## Day 13 — Performance, стабильность, QA
- Оптимизация изображений/video/lazy-load
- Core Web Vitals (базово)
- Полный QA: навигация, формы, блог, SEO, analytics, адаптив
- QA burger menu на mobile/tablet: открытия/закрытия, активные ссылки, переходы между страницами, отсутствие визуальных сдвигов layout
- Исправление багов и release checklist
- UAT-чеклист приемки (по страницам, формам, аналитике)
- Страницы ошибок и сценарии отказа: `404`, `500`, ошибки API
- Проверка security headers: `HSTS`, `CSP` (базовый), `X-Content-Type-Options`, `Referrer-Policy`

## Day 14 — Deploy и передача
- Deploy frontend + CMS
- Домен/SSL/env
- Передача доступов: hosting, CMS, analytics, source code
- Краткая инструкция клиенту + финальная сдача
- Документация по env и доступам (где хранится, как ротировать)
- Backup/restore-процедура для CMS/БД
- Пост-релиз мониторинг 24-72 часа (ошибки форм, события, uptime)
- Контент-операционка для клиента (как публиковать, редактировать SEO, смотреть лиды)
- Подключение и проверка error tracking (Sentry или аналог)
- Роллбек-план релиза (пошагово: как откатить за 15-30 минут)
- Финальная проверка отсутствия дублирующих событий/тегов аналитики

## Контрольные milestones
- До Day 4: готовый каркас + модели CMS
- До Day 9: обе формы + сохранение лидов end-to-end
- До Day 12: SEO + GA4 включены и проверены
- Day 14: передача под ключ без зависимости от исполнителя

## Жесткое правило выполнения
- Любой пункт считается выполненным только если:
  1) он прописан в этом плане,
  2) зафиксирован в соответствующем документе,
  3) реализован в коде (если это технический пункт),
  4) проверен по факту на сайте.
