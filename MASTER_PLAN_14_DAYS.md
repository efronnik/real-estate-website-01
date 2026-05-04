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
- <span style="color: #facc15">Проверка доставки лида end-to-end (форма -> backend -> `Lead`/уведомление): PROCESSED</span>

## Day 10 — Blog (listing + slug)
- Листинг статей + страница статьи по slug
- Подключение к CMS (`BlogPost`)
- Категории/теги (если нужны)
- Базовое SEO статей
- Подключить SEO-поля list/detail из CMS (`SEO` у `BlogPost`, metadata на страницах)
- Подключить `FAQItem`/`Testimonial` из CMS в те секции, где они выводятся (без хардкода)
- Fallback-поведение при недоступности CMS (без падения страницы)
- SEO-структура list/detail (H1/H2/H3), внутренние ссылки из статей в lejki и CTA на лид-формы

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
- Единый SEO-mapping: все ключевые страницы берут metadata из CMS (`SEO`) без ручных дублей в коде
- SEO-matrix приемки по всем страницам scope: для каждой страницы проверены `title`, `description`, `canonical`, `OG`, `robots`, `H1`, релевантные internal links
- Базовая accessibility-проверка (контраст, фокус, клавиатура, labels/aria)
- A11y-проверка burger menu: фокус-менеджмент, `aria-expanded`, `aria-controls`, keyboard navigation
- Подключение Google Search Console и Bing Webmaster
- Отправка sitemap в GSC/Bing
- Проверка noindex-гигиены (staging/preview закрыты, prod открыт)

## Day 13 — Performance, стабильность, QA
- Оптимизация изображений/video/lazy-load
- Core Web Vitals с порогами приемки:
  - LCP < 2.5s (mobile, ключевые страницы)
  - CLS < 0.1
  - INP < 200ms
  - TTFB в пределах целевого окружения хостинга
- Автоматизированные тесты:
  - Unit: утилиты, валидация форм, маппинг CMS-данных
  - Integration: форма -> API -> сохранение лида в `Lead`
  - E2E: критические пути `Glowna -> Sprzedaz/Kontakt`, `Glowna -> Inwestycje/Kontakt`, `Blog list -> Blog detail -> CTA`
- CI/CD quality gate:
  - запуск lint + tests + build на каждый PR
  - merge запрещен при падении хотя бы одного обязательного шага
- Полный QA: навигация, формы, блог, SEO, analytics, адаптив
- QA burger menu на mobile/tablet: открытия/закрытия, активные ссылки, переходы между страницами, отсутствие визуальных сдвигов layout
- Сценарий отказа CMS (failover): Strapi недоступен -> страницы не падают, отрабатывает fallback, формы и критические CTA доступны
- Исправление багов и release checklist
- UAT-чеклист приемки (по страницам, формам, аналитике)
- Страницы ошибок и сценарии отказа: `404`, `500`, ошибки API
- Проверка security headers: `HSTS`, `CSP` (базовый), `X-Content-Type-Options`, `Referrer-Policy`

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
