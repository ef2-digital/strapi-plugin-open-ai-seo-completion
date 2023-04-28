import {prefixPluginTranslations} from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import FieldPicker from "./components/RightLinksComponents/FieldPicker";
import React from "react";

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
      name: 'seo-ai-input',
      pluginId: 'open-ai-seo-completion',
      type: 'string',
      intlLabel: {
        id: 'open-ai-seo-completion.custom-field.label',
        defaultMessage: 'SEO field with AI completion'
      },
      intlDescription: {
        id: 'open-ai-seo-completion.custom-field.description',
        defaultMessage: 'SEO info field with Open AI completion'
      },
      components: {
        Input: async () => import('./components/FieldComponents/Input'),
      },
      icon: PluginIcon,
      options: {
        base: [
          {
            sectionTitle: {
              id: 'open-ai-seo-completion.options.type.title',
              defaultMessage: 'Type SEO information',
            },
            items: [ // Add settings items to the section
              {
                name: 'options.seo-info-type',
                intlLabel: {
                  id: 'open-ai-seo-completion.options.type.label',
                  defaultMessage: 'Type SEO information',
                },
                type: 'select',
                value: 'description',
                options: [
                  {
                    key: 'description',
                    value: 'description',
                    defaultValue: 'description',
                    metadatas: {
                      intlLabel: {
                        id: 'open-ai-seo-completion.options.type.description.label',
                        defaultMessage: 'Description',
                      },
                    },
                  },
                  {
                    key: 'title',
                    value: 'title',
                    defaultValue: 'title',
                    metadatas: {
                      intlLabel: {
                        id: 'open-ai-seo-completion.options.type.title.label',
                        defaultMessage: 'Title',
                      },
                    },
                  },
                ],
              }
            ],
          }
        ]
      },
    });

    app.registerPlugin(plugin);

  },

  bootstrap(app: any) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'open-ai-seo-completion-page-settings',
      Component: () => <FieldPicker/>,
    });
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
