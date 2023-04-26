import {prefixPluginTranslations} from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.customFields.register({
      name: 'meta-description',
      pluginId: 'open-ai-seo-completion',
      type: 'string',
      intlLabel: {
        id: 'open-ai-seo-completion.meta-description.label',
        defaultMessage: 'Meta Description with AI completion'
      },
      intlDescription: {
        id: 'open-ai-seo-completion.meta-description.description',
        defaultMessage: 'Meta Description with Open AI completion'
      },
      components: {
        Input: async () => import('./components/FieldComponents/Input'),
      },
      icon: PluginIcon,
      options: {
        base: [
          {
            sectionTitle: {
              id: 'open-ai-seo-completion.options.context-selection',
              defaultMessage: 'Context selection',
            },
            items: [ // Add settings items to the section
              {
                intlLabel: {
                  id: 'open-ai-seo-completion.options.context-selection.label',
                  defaultMessage: 'Content field key',
                },
                name: 'options.context-selection-field-key',
                type: 'text'
              }
            ],
          }
        ]
      },
    });

    app.registerPlugin(plugin);

  },

  bootstrap(app: any) {
  },

  async registerTrads(app: any) {
    const {locales} = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({default: data}) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  }
  ,
};
