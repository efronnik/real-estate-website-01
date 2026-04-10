export default {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register() { },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
        const publicRole = await strapi.db
            .query("plugin::users-permissions.role")
            .findOne({ where: { type: "public" } });
        if (!publicRole)
            return;
        const publicActions = [
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
        ];
        const existingPermissions = await strapi.db
            .query("plugin::users-permissions.permission")
            .findMany({
            where: {
                role: publicRole.id,
                action: { $in: publicActions },
            },
        });
        const existingActions = new Set(existingPermissions.map((permission) => permission.action));
        await Promise.all(publicActions
            .filter((action) => !existingActions.has(action))
            .map((action) => strapi.db.query("plugin::users-permissions.permission").create({
            data: {
                action,
                role: publicRole.id,
            },
        })));
    },
};
