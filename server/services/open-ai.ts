'use strict';

import axios from 'axios';

export default ({strapi}) => ({

  async generateSeoInfo(content: string, locale: string) {
    try {
      const prompt = `Give a metadescription in this language: ${locale}, for this content: ${content}`;

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
    } catch (err) {
      console.log(err.response)
    }

  }

});
