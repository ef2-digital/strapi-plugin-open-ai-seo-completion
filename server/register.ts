import {Strapi} from '@strapi/strapi';

export default ({strapi}: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'meta-description',
    plugin: 'open-ai-seo-completion',
    type: 'string',
  });
};
