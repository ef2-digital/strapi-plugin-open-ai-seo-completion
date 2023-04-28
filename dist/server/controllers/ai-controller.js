'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const AiController = ({ strapi }) => ({
    async generateSeoInformation(ctx) {
        ctx.body = await strapi
            .plugin('open-ai-seo-completion')
            .service('openAi')
            .generateSeoInfo(ctx.request.body.content, ctx.request.body.locale, ctx.request.body.type);
    },
});
exports.default = AiController;
