"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: 'meta-description',
        plugin: 'open-ai-seo-completion',
        type: 'string',
    });
};
