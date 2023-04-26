'use strict';

const AiController = ({strapi}) => ({
  async getInfo(ctx) {
    ctx.body = {"test": "test"};
  },

  async generateSeoInformation(ctx) {
    ctx.body = await strapi
      .plugin('open-ai-seo-completion')
      .service('openAi')
      .generateSeoInfo(ctx.request.body.content);
  },
});

export default AiController;