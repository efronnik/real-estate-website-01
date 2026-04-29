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
        metaTitle: "FIND Nieruchomosci - test SEO",
        metaDescription:
          "Testowe dane CMS dla projektu nieruchomosci. Wersja developerska do integracji frontendu.",
        canonicalUrl: "https://example.local/",
        ogTitle: "FIND Nieruchomosci",
        ogDescription: "Testowe dane OG z CMS",
      },
    });

    await strapi.db.query("api::category.category").create({
      data: {
        name: "Porady",
        slug: "porady",
        description: "Testowa kategoria poradnikowa",
      },
    });

    await strapi.db.query("api::category.category").create({
      data: {
        name: "Inwestowanie",
        slug: "inwestowanie",
        description: "Testowa kategoria inwestycyjna",
      },
    });

    await strapi.db.query("api::page.page").create({
      data: {
        title: "Glowna",
        slug: "glowna",
        pageType: "glowna",
        headline: "Sprzedaj lub zainwestuj swiadomie",
        lead: "Testowy lead z CMS dla strony glownej.",
        content:
          "To jest testowa tresc dla strony glownej. Dane sa automatycznie seedowane podczas developmentu.",
        seo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::page.page").create({
      data: {
        title: "Sprzedaz",
        slug: "sprzedaz",
        pageType: "sprzedaz",
        headline: "Pomagamy sprzedawac szybciej",
        lead: "Testowe dane dla lejka sprzedajacego.",
        content: "Sekcje, CTA i copy do testow integracji frontend + CMS.",
        seo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::page.page").create({
      data: {
        title: "Inwestycje",
        slug: "inwestycje",
        pageType: "inwestycje",
        headline: "Buduj portfel nieruchomosci",
        lead: "Testowe dane dla lejka inwestora.",
        content: "Tresc testowa do sprawdzenia renderu dynamicznego.",
        seo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::blog-post.blog-post").create({
      data: {
        title: "Jak przygotowac mieszkanie do sprzedazy",
        slug: "jak-przygotowac-mieszkanie-do-sprzedazy",
        excerpt: "Lista krokow, ktore poprawiaja konwersje ogloszenia.",
        content:
          "To jest testowy artykul blogowy nr 1. Sluzy do sprawdzenia listy i detalu wpisow.",
        seo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::blog-post.blog-post").create({
      data: {
        title: "5 zasad bezpiecznego inwestowania",
        slug: "5-zasad-bezpiecznego-inwestowania",
        excerpt: "Jak unikac typowych bledow inwestora.",
        content:
          "To jest testowy artykul blogowy nr 2. Dane sa wystarczajace do developmentu.",
        seo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::faq-item.faq-item").create({
      data: {
        question: "Ile trwa standardowa sprzedaz nieruchomosci?",
        answer: "To zalezy od rynku i przygotowania oferty, zwykle od kilku tygodni do kilku miesiecy.",
        pageType: "sprzedaz",
        order: 1,
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
        contactEmail: "kontakt@example.local",
        contactPhone: "+48 600 000 000",
        businessAddress: "Warszawa, Polska",
        ga4MeasurementId: "G-TEST123456",
        defaultSeo: defaultSeo.id,
      },
    });

    await strapi.db.query("api::lead.lead").create({
      data: {
        fullName: "Jan Testowy",
        phone: "+48 500 500 500",
        email: "jan.testowy@example.local",
        leadType: "kontakt",
        sourcePage: "glowna",
        message: "To jest testowy lead developerski.",
        city: "Warszawa",
        utmSource: "google",
        utmMedium: "cpc",
        utmCampaign: "spring-test",
        consentData: true,
      },
    });
  },
};
