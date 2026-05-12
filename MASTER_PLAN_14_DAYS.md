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
- Унифицирован UI-скелет: общий header/footer, общие компоненты форм: DONE
- Документ решений Day 1: `Documents/DAY1/DAY1_DECISION.md`
- Проверка соответствия Day 1 по коду и документам: DONE

## Day 2 — Архитектура и UI-основа (статус: DONE)
- Единый layout/navigation/component-base: DONE
- Дальнейшая чистка секций и reusable-блоков: DONE
- Маршрутизация под расширение без рефактора ядра: DONE
- Финальная донастройка адаптивности ключевых шаблонов: DONE 
- Mobile navigation (burger menu): кнопка, overlay, open/close state, блокировка фонового скролла, закрытие по ESC/клику вне меню: DONE 

## Day 3 — CMS (Strapi) и модели данных (статус: DONE)
- Поднять Strapi: DONE
- Создать коллекции (4 обязательных): `Page`, `BlogPost`, `Lead`, `SEO`: DONE
- Добавить коллекции (4 желательных для проекта): `SiteSettings`, `FAQItem`, `Testimonial`, `Category` (или `Tag`): DONE
- Можно добавить позже: `CaseStudy`, `Service`, `Author`, `Redirect`: DONE
- Настроить роли и доступы клиента: DONE
- Заполнить тестовыми данными для разработки: DONE

## Day 4 — Главная (конверсионная)
- Собрать lead-gen структуру (оффер, доказательства, процесс, CTA): DONE
- Оптимизировать порядок секций под конверсию в 2 lejki (seller/inwestor), включая перестановку блоков при необходимости: DONE
- Улучшить воронки seller/inwestor: усилить переходы между шагами, офферы, CTA и точки квалификации лида: DONE
- Явно зафиксировать входы в 2 lejki (seller/inwestor) и приоритеты CTA: DONE
- Подключить контент из CMS: DONE
- Подключить SEO-поля страницы `Glowna` из CMS (`SEO`: title, description, canonical, OG): DONE
- SEO-структура страницы: 1xH1 + иерархия H2/H3 + внутренняя перелинковка в lejki: DONE
- Проверить mobile/tablet/desktop: DONE

## Day 5 — Страница Sprzedaz
- Структура процесса продажи (включая 5 шагов): DONE
- Секции: выцена транзакционная vs офферная, маркетинг, отбор лидов, безопасность: DONE
- CTA на консультацию + форма wycena: DONE
- Подключить контент страницы `Sprzedaz` из CMS (`Page` + связанные блоки): DONE
- Подключить SEO-поля страницы `Sprzedaz` из CMS (`SEO`: title, description, canonical, OG): DONE
- SEO-структура: H1/H2/H3: DONE
- Lejek-логика: переходы Sprzedaz -> Kontakt/Wycena и контроль точек конверсии: DONE

## Day 6 — Страница Inwestycje
- SEO-landing под inwestowanie/flipy Warszawa: DONE
- Секции: как работает, ошибки, для кого, CTA: DONE
- Internal linking (в т.ч. на kalkulator/wycena): DONE
- Подключить контент страницы `Inwestycje` из CMS (`Page` + связанные блоки): DONE
- Подключить SEO-поля страницы `Inwestycje` из CMS (`SEO`: title, description, canonical, OG): DONE
- Зафиксировать решение по `Kalkulator`: DONE (выбран вариант A — страница остается кодовым инструментом; CMS не управляет hero/SEO/CTA этого шага): DONE
- Alt-тексты + SEO-семантика: DONE
- Lejek-логика: переходы Inwestycje -> Kontakt/Blog/Kalkulator без дублирования CTA: DONE

## Day 7 — O mnie + personal brand
- Экспертный профиль и преимущества: DONE
- Конверсионная структура контента (сканируемая): DONE
- CTA в оба lejki: DONE
- SEO-поля из CMS: DONE
- Подключить контент страницы `O mnie` из CMS (`Page`): DONE
- SEO-структура страницы: 1xH1 + H2/H3 + релевантные внутренние ссылки в Sprzedaz/Inwestycje: DONE

## Day 8 — Kontakt + обе формы (UI/UX)
- Финализация страницы `Kontakt`: DONE
- Обе формы в целевом UX: DONE
- Клиентская валидация, состояния, сообщения, подтверждение отправки: DONE
- Унификация форменных компонентов: DONE
- Юридические согласия в формах + ссылки на политику приватности/RODO: DONE
- Подключить контент страницы `Kontakt` из CMS (`Page`): DONE
- Подключить SEO-поля страницы `Kontakt` из CMS (`SEO`: title, description, canonical, OG): DONE
- SEO-структура страницы Kontakt + корректные точки входа в формы из обоих lejki: DONE

## Day 9 — Backend обработки лидов
- Server-side validation + sanitization: DONE
- Сохранение лидов в `Lead` (Strapi/DB): DONE
- Антиспам (honeypot/reCAPTCHA по необходимости): DONE
- Логи и диагностика ошибок: DONE
- Базовая безопасность API (rate limit, CORS, защита endpoint-ов): DONE
- Ограничения и защита payload: лимиты размера тела запроса, whitelisting полей, нормализация/очистка входных данных: DONE
- Политика PII в логах: персональные данные не пишутся в открытые логи, только технические идентификаторы и коды ошибок: DONE
- Проверка доставки лида end-to-end (форма -> backend -> `Lead`/уведомление): PROCESSED

## Day 10 — Blog (listing + slug): DONE
- Листинг статей + страница статьи по slug: DONE
- Подключение к CMS (`BlogPost`): DONE
- Категории/теги (если нужны): DONE
- Базовое SEO статей: DONE
- Подключить SEO-поля list/detail из CMS (`SEO` у `BlogPost`, metadata на страницах): DONE
- Подключить `FAQItem`/`Testimonial` из CMS в те секции, где они выводятся (без хардкода): DONE
- Fallback-поведение при недоступности CMS (без падения страницы): DONE
- SEO-структура list/detail (H1/H2/H3), внутренние ссылки из статей в lejki и CTA на лид-формы: DONE

## Day 11 — GA4 и события конверсии: DONE
- Подготовить GA4 property + Web Data Stream, зафиксировать Measurement ID (`G-XXXXXXXXXX`) и хранение через env
- Подключить `gtag`/Google tag в Next.js layout (без дублей), включать только при наличии GA ID
- Проверить корректный `page_view` на SSR + client navigation (App Router), без повторной отправки
- Внедрить события конверсии:
  - `lead_form_submit` (успешная отправка `kontakt`/`wycena`)
  - `lead_form_error` (ошибка отправки формы)
  - `cta_click` (ключевые CTA в hero/sections/prefooter/blog)
  - `contact_click` (tel/email/мессенджеры при наличии)
- Для каждого события передавать обязательные параметры:
  - `form_type` (`kontakt`/`wycena`)
  - `lead_type` (`sprzedaz`/`inwestor`/`kontakt`)
  - `source_page`
  - `cta_id` и/или `placement`
  - `status` (`success`/`error`) для форм
- Синхронизировать UTM-атрибуцию в аналитике (`utm_source`, `utm_medium`, `utm_campaign`) для lead-событий
- Настроить privacy/consent-логику:
  - не отправлять marketing analytics до согласия (если consent-баннер включен)
  - проверить, что в GA не уходит PII
  - TODO (перед production): включить consent-баннер (`NEXT_PUBLIC_ANALYTICS_CONSENT_BANNER=true`) и пройти ручной smoke-тест Accept/Reject
- Отдельно проверить cookie-настройку перед production (чтобы корректно работало согласие):
  - включить `NEXT_PUBLIC_ANALYTICS_CONSENT_BANNER=true` в production env
  - убедиться, что баннер показывается новым пользователям
  - убедиться, что выбор пользователя сохраняется (localStorage) и повторно баннер не мешает
  - проверить сценарии: до Accept нет analytics, после Accept есть, после Reject нет
- Тесты Realtime/DebugView:
  - ручной чеклист по всем событиям и параметрам
  - проверка отсутствия дублей при повторных рендерах/навигации
- Пометить ключевые события как conversions в GA4:
  - минимум `lead_form_submit`
  - опционально `contact_click` (по бизнес-решению)
- Добавить короткий QA-протокол в проект (что, где и как проверять в GA4 после релиза)
- Критерий DONE Day 11:
  - события стабильно видны в DebugView с корректными параметрами
  - conversion events отмечены и подтверждены
  - нет дублей `page_view` и нет отправки PII

## Day 12 — Техническое SEO
- **DONE** — Metadata, canonical, OpenGraph, robots, sitemap (реализация в коде, сборка ок)
- **PROCESSED** — Проверка индексации и URL (полная проверка в поиске и на боевом домене — после prod)
- **PROCESSED** — Проверка заголовков и семантики (ручная приёмка по контенту/CMS на ключевых страницах; при необходимости повтор на prod)
- **DONE** — Schema (LocalBusiness + дополнительные поля)
- **DONE** — Единый SEO-mapping: все ключевые страницы берут metadata из CMS (`SEO`) без ручных дублей в коде
- **PROCESSED** — SEO-matrix приемки по всем страницам scope (`title`, `description`, `canonical`, `OG`, `robots`, `H1`, internal links): структура и код готовы; финальная матрица по факту на prod-URL вручную
- **DONE** — Базовая accessibility-проверка (фокус, клавиатура, labels/aria; усиления в коде; контраст — без автотеста, при желании докрутить вручную)
- **DONE** — A11y-проверка burger menu: фокус-менеджмент, `aria-expanded`, `aria-controls`, keyboard navigation
- **PROCESSED** — Подключение Google Search Console и Bing Webmaster (верификация и работа в консолях — после выдачи домена)
- **PROCESSED** — Отправка sitemap в GSC/Bing (после верификации: `https://<домен>/sitemap.xml` в обеих консолях)
- **DONE** — Проверка noindex-гигиены: реализация в коде (`NEXT_PUBLIC_SITE_INDEXABLE`, `VERCEL_ENV=preview`, `robots.txt`, `X-Robots-Tag`, layout `robots`)
- **PROCESSED** — Проверка noindex-гигиены: подтвердить env и ответы (`/robots.txt`, заголовки) на prod и staging вручную

## Day 13 — Performance, стабильность, QA
- **DONE** — Оптимизация изображений/video/lazy-load: `next/image` (Unsplash/Pexels + логотип), отложенная загрузка фоновых MP4 (`HeroBackgroundVideo`), правки CSS под `fill`; декоративные ряды с `--bg` в CSS пока без изменений (отдельный шаг при необходимости)
- Core Web Vitals с порогами приемки (LCP / CLS / INP / TTFB):
  - **DONE (сейчас, без prod):** шрифты через `next/font` (меньше CLS, без блокирующего Google Fonts CSS); локальный замер: `npm run dev` в одном терминале, затем `npm run perf:lighthouse` (mobile preset, только Performance) — ориентир, не замена PSI
  - **PROCESSED (после хостинга):** подтвердить пороги на боевом URL через PageSpeed Insights / Search Console (полевые данные), отдельно TTFB по факту хостинга
- **DONE** — Автоматизированные тесты (базовый каркас в репозитории):
  - **Unit (Vitest):** `lead-validation`, `buildLeadPayloadFromFormData`, `KEY_SEO_PAGE_MAPPING`
  - **Integration:** `POST /api/leads` с моком Strapi (валидация, honeypot, неизвестные поля)
  - **E2E (Playwright):** `e2e/critical-paths.spec.ts` + `e2e/full-qa.spec.ts`; перед прогоном `npm run test:e2e` выполняется `next build` и `next start` на порту E2E (см. `playwright.config.ts`), не `next dev`
  - **Расширение позже:** больше кейсов валидации UI, контрактные тесты CMS, стабильные сиды для блога в E2E если контент полностью из CMS
- **DONE (код):** CI/CD quality gate — `.github/workflows/ci.yml`: `lint`, `test` (Vitest), `test:e2e` (Playwright: внутри поднимается `next build` + `next start` на порту E2E, отдельный `build` в job не дублируется)
  - **PROCESSED (орг.):** в настройках репозитория включить обязательный статус CI для merge в `main`
- **DONE (авто) + PROCESSED (ручная приёмка)** — Полный QA: навигация, формы, блог, SEO, analytics, адаптив
  - **Автоматически (`e2e/full-qa.spec.ts`, `e2e/burger-menu.spec.ts` + CI):** `robots.txt` / `sitemap.xml`, заголовок + `h1` на ключевых путях, JSON-LD `LocalBusiness` на главной, топбар desktop (4 маршрута), форма Kontakt (успех с моком `POST /api/leads`, пустая отправка → фокус на поле), блог: список → статья → видимость CTA wyceny; бургер — см. отдельный spec
  - **Вручную перед prod:** контраст/читабельность, реальная отправка лида в Strapi, GA4 DebugView после согласия cookie (`NEXT_PUBLIC_GA_MEASUREMENT_ID`), матрица metadata/canonical/OG по страницам на боевом URL, tablet + реальные устройства, регресс после смены контента в CMS
- **DONE (авто + UI)** — QA burger menu mobile/tablet: `e2e/burger-menu.spec.ts` (viewports 390×844 и 820×1100) — открытие/закрытие на `/sprzedaz` (×, клик по overlay, Escape); на artykule blogowym — `aria-current="page"` + `nav-link-active` у «Blog», переход в listing и в «Sprzedaz»; прокси layout-shift: ширина viewport не меняется при открытии, `overflow: hidden` на `body` снимается после закрытия. В коде: `isRouteActive` + стили активной ссылки в desktop- и mobile-меню
  - **PROCESSED (визуал):** осмотреть вручную отсутствие «прыжков» контента и артефактов анимации на реальных устройствах / BrowserStack
- **DONE (авто)** — Сценарий отказа CMS (failover): `e2e/cms-failover.spec.ts` + `playwright.failover.config.ts` поднимают приложение с недоступным Strapi (`NEXT_PUBLIC_STRAPI_URL`/`STRAPI_URL` -> `127.0.0.1:9`) и проверяют: `/sprzedaz`, `/kontakt`, `/blog` рендерят fallback-контент; форма контакта доступна и отправляется при моке `/api/leads`; критические CTA видимы
- **DONE** — Исправление багов и release checklist: стабилизирован `blog/[slug]` (мемоизация `article`, убраны предупреждения по зависимостям хуков); добавлен `RELEASE_CHECKLIST.md` + команда `npm run release:check` (lint + unit/integration + e2e + failover)
- **DONE** — UAT-чеклист приемки (по страницам, формам, аналитике): добавлен `UAT_CHECKLIST.md` (структурированные критерии + sign-off блок)
- **DONE (код + тесты) / PROCESSED (ручной триггер `500`)** — Страницы ошибок и сценарии отказа: добавлены `src/app/not-found.tsx` (кастомная `404`) и `src/app/error.tsx` (`500`-экран c `reset`/контактом); расширены тесты API и E2E: `e2e/full-qa.spec.ts` покрывает `404` и API-ошибки (`400 invalid payload`, `403 origin`), `src/app/api/leads/route.integration.test.ts` покрывает `502` (Strapi unreachable) и `OPTIONS 403` для чужого origin
- **DONE (код + e2e)** — Проверка security headers: `HSTS`, `CSP` (базовый), `X-Content-Type-Options`, `Referrer-Policy` заданы глобально в `next.config.ts` (`headers()`), проверяются автотестом `e2e/full-qa.spec.ts` (`security headers present on homepage response`)

## Day 14 — Deploy и передача
- Deploy frontend + CMS
- Домен/SSL/env
- Production-hardening CMS: переход Strapi на PostgreSQL, настройка media storage, backup/restore и monitoring/alerting
- Передача доступов: hosting, CMS, analytics, source code
- Краткая инструкция клиенту + финальная сдача
- SiteSettings подключен на frontend: глобальные контакты, соцсети, повторяющиеся тексты/CTA подтягиваются из CMS
- Финальный контент-аудит: нет критичного хардкода на страницах из scope (`Glowna`, `Sprzedaz`, `Inwestycje`, `O mnie`, `Kontakt`, `Blog`)
- Финальный CMS-аудит: `Page`, `BlogPost`, `SEO`, `SiteSettings`, `FAQItem`, `Testimonial` участвуют в рендере там, где требуется по UX
- Финальный протокол приемки (go-live checklist):
  - CI зеленый (`lint`, `tests`, `build`)
  - QA/UAT checklist закрыт без блокирующих дефектов
  - SEO-matrix закрыт по всем страницам scope
  - GA4 события и conversions подтверждены в DebugView/Realtime
  - rollback-план проверен тестовым dry-run
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
  5) для автоматизируемых задач есть зеленый результат CI/автотестов,
  6) для production-задач есть артефакт проверки (чеклист, отчет, скрин/лог).
