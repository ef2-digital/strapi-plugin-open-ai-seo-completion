import {Strapi} from '@strapi/strapi';

export default ({strapi}: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'seo-ai-input',
    plugin: 'open-ai-seo-completion',
    type: 'string',
  });
};
