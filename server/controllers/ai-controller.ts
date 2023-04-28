'use strict';

const AiController = ({strapi}) => ({
  async generateSeoInformation(ctx) {
    ctx.body = await strapi
      .plugin('open-ai-seo-completion')
      .service('openAi')
      .generateSeoInfo(ctx.request.body.content, ctx.request.body.locale, ctx.request.body.type);
  },
});

export default AiController;
