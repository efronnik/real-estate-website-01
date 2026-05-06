import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::lead.lead", () => ({
  async create(ctx) {
    const consentData = ctx.request.body?.data?.consentData;
    if (consentData !== true) {
      return ctx.badRequest("consentData must be accepted.");
    }

    return super.create(ctx);
  },
}));
