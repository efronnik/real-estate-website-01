export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register() {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const ensurePermissions = async (roleId: number, actions: string[]) => {
      const existingPermissions = await strapi.db
        .query("plugin::users-permissions.permission")
        .findMany({
          where: {
            role: roleId,
            action: { $in: actions },
          },
        });

      const existingActions = new Set(existingPermissions.map((permission) => permission.action));

      await Promise.all(
        actions
          .filter((action) => !existingActions.has(action))
          .map((action) =>
            strapi.db.query("plugin::users-permissions.permission").create({
              data: {
                action,
                role: roleId,
              },
            }),
          ),
      );
    };

    const publicRole = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    const authenticatedRole = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "authenticated" } });

    const existingEditorRole = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({ where: { name: "Editor" } });

    const editorRole =
      existingEditorRole ||
      (await strapi.db.query("plugin::users-permissions.role").create({
        data: {
          name: "Editor",
          description: "Can create and edit CMS content",
        },
      }));

    const readonlyActions = [
      "api::page.page.find",
      "api::page.page.findOne",
      "api::blog-post.blog-post.find",
      "api::blog-post.blog-post.findOne",
      "api::category.category.find",
      "api::category.category.findOne",
      "api::faq-item.faq-item.find",
      "api::faq-item.faq-item.findOne",
      "api::testimonial.testimonial.find",
      "api::testimonial.testimonial.findOne",
      "api::site-settings.site-settings.find",
      "api::site-settings.site-settings.findOne",
      "api::seo.seo.find",
      "api::seo.seo.findOne",
      "api::lead.lead.create",
    ];

    const editorCrudActions = [
      "api::page.page.create",
      "api::page.page.update",
      "api::page.page.find",
      "api::page.page.findOne",
      "api::blog-post.blog-post.create",
      "api::blog-post.blog-post.update",
      "api::blog-post.blog-post.find",
      "api::blog-post.blog-post.findOne",
      "api::category.category.create",
      "api::category.category.update",
      "api::category.category.find",
      "api::category.category.findOne",
      "api::seo.seo.create",
      "api::seo.seo.update",
      "api::seo.seo.find",
      "api::seo.seo.findOne",
      "api::faq-item.faq-item.create",
      "api::faq-item.faq-item.update",
      "api::faq-item.faq-item.find",
      "api::faq-item.faq-item.findOne",
      "api::testimonial.testimonial.create",
      "api::testimonial.testimonial.update",
      "api::testimonial.testimonial.find",
      "api::testimonial.testimonial.findOne",
      "api::site-settings.site-settings.create",
      "api::site-settings.site-settings.update",
      "api::site-settings.site-settings.find",
      "api::site-settings.site-settings.findOne",
      "api::lead.lead.create",
      "api::lead.lead.update",
      "api::lead.lead.find",
      "api::lead.lead.findOne",
    ];

    if (publicRole) await ensurePermissions(publicRole.id, readonlyActions);
    if (editorRole) await ensurePermissions(editorRole.id, editorCrudActions);

    // Keep "Authenticated" minimal for better security posture.
    // Any accidental CRUD grants for content APIs are removed on boot.
    if (authenticatedRole) {
      await strapi.db.query("plugin::users-permissions.permission").deleteMany({
        where: {
          role: authenticatedRole.id,
          action: { $in: editorCrudActions },
        },
      });
    }

    const pagesCount = await strapi.db.query("api::page.page").count();
    if (pagesCount > 0) return;

    const defaultSeo = await strapi.db.query("api::seo.seo").create({
      data: {
        metaTitle: "FIND Nieruchomosci",
        metaDescription:
          "Wsparcie w sprzedazy mieszkan i inwestowaniu w nieruchomosci w Warszawie.",
        canonicalUrl: "http://localhost:3000/",
        ogTitle: "FIND Nieruchomosci",
        ogDescription: "Sprzedaz i inwestycje nieruchomosci w Warszawie.",
      },
    });

    await strapi.db.query("api::category.category").create({
      data: {
        name: "Porady",
        slug: "porady",
        description: "Poradniki dla sprzedajacych",
      },
    });

    await strapi.db.query("api::category.category").create({
      data: {
        name: "Inwestowanie",
        slug: "inwestowanie",
        description: "Materialy dla inwestorow",
      },
    });

    await strapi.db.query("api::page.page").create({
      data: {
        title: "Glowna",
        slug: "glowna",
        pageType: "glowna",
        headline: "Sprzedaj lub zainwestuj swiadomie",
        lead: "Pokaze bledy i dam jasny plan sprzedazy.",
        content:
          "Nie dostajesz przypadkowych dzialan. Dostajesz konkretny proces od pierwszej diagnozy do podpisu.",
        seo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::page.page").create({
      data: {
        title: "Sprzedaz",
        slug: "sprzedaz",
        pageType: "sprzedaz",
        headline: "Sprzedaj mieszkanie swiadomie — z wycena oparta o realny rynek",
        lead: "Proces sprzedazy od przygotowania po finalizacje formalnosci.",
        content:
          "Zajmujemy sie calym procesem sprzedazy – od przygotowania nieruchomosci, przez marketing, negocjacje, az po finalizacje formalnosci.",
        seo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::page.page").create({
      data: {
        title: "Inwestycje",
        slug: "inwestycje",
        pageType: "inwestycje",
        headline: "Inwestowanie w nieruchomosci Warszawa – flipy mieszkan",
        lead: "Analiza okazji, remontu i wyjscia z inwestycji krok po kroku.",
        content:
          "Pomagam ocenic potencjal flipa, zaplanowac remont i domknac transakcje z jasnym scenariuszem finansowym.",
        seo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::blog-post.blog-post").create({
      data: {
        title: "Jak przygotowac mieszkanie do sprzedazy",
        slug: "jak-przygotowac-mieszkanie-do-sprzedazy",
        excerpt:
          "Home staging i przygotowanie mieszkania do sprzedazy krok po kroku — od oceny stanu po czystosc w kuchni i lazience.",
        content:
          "Artykul renderowany z frontendu (prose). Pelna tresc w kodzie aplikacji.",
        seo: defaultSeo.id,
      },
    });


    await strapi.db.query("api::faq-item.faq-item").create({
      data: {
        question: "Skad mam pewnosc, ze wycenicie moja nieruchomosc zgodnie z jej realna wartoscia?",
        answer:
          "Podczas wyceny korzystamy z autorskiego programu Wyceny 5 Krokow. Porownujemy ceny ofertowe i transakcyjne z wielu zrodel, zanim przedstawimy raport analityczny oparty o realne dane i trendy rynkowe.",
        pageType: "sprzedaz",
        order: 1,
      },
    });

    await strapi.db.query("api::faq-item.faq-item").create({
      data: {
        question: "Jak wyglada proces sprzedazy? Czy ktos poprowadzi mnie krok po kroku?",
        answer:
          "Zajmujemy sie calym procesem sprzedazy – od przygotowania nieruchomosci, przez marketing, negocjacje, az po finalizacje formalnosci. Prowadzimy klientow przez kazdy etap przejrzyscie i profesjonalnie.",
        pageType: "sprzedaz",
        order: 2,
      },
    });

    await strapi.db.query("api::testimonial.testimonial").create({
      data: {
        authorName: "Anna K.",
        quote: "Bardzo sprawny proces i swietna komunikacja.",
        rating: 5,
        city: "Warszawa",
        isFeatured: true,
      },
    });

    await strapi.db.query("api::site-settings.site-settings").create({
      data: {
        siteName: "FIND Nieruchomosci",
        defaultLocale: "pl",
        contactEmail: "compasgroup.info@gmail.com",
        contactPhone: "+48577154116",
        businessAddress: "Warszawa, Polska",
        ga4MeasurementId: "",
        defaultSeo: defaultSeo.id,
      },
    });
  },
};
