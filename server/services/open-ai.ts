'use strict';

import axios from 'axios';

export default ({strapi}: any) => ({

  async generateSeoInfo(content: string, locale: string, type: SeoInfoType) {
    try {
      let prompt;
      switch (type) {
        case SeoInfoType.description:
          prompt = `Give the meta description without a label in this language ${locale}, for the following content. ${content}`;
          break;
        case SeoInfoType.title:
          prompt = `Give the meta title without a label in this language ${locale}, for the following content. ${content}`;
          break;
      }

      const response = await axios(
        {
          url: 'https://api.openai.com/v1/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${strapi.plugin('open-ai-seo-completion').config('apiToken')}`
          },
          data: JSON.stringify({
            'model': 'text-davinci-003',
            'prompt': `${prompt}`,
            'temperature': 0.3,
            'max_tokens': 160,
            'top_p': 1,
            'frequency_penalty': 0,
            'presence_penalty': 0
          })
        })

      return response.data;
    } catch (err: any) {
      console.log(err.response)
    }
  }
});

export enum SeoInfoType {
  description = 'description',
  title = 'title',
}
