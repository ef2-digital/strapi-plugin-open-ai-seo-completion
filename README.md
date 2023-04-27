# Strapi plugin to generate SEO information using OpenAI

This plugin generates SEO information using OpenAI's API.
Based on the field with the main content on a page, SEO information is
generated when the 'generate' button is pressed.

- Provides custom fields for meta description and meta title
- Provides a 'fieldpicker' for selecting the main content field
- OpenAI API-key can be set in the plugin settings

## Installation

```bash
yarn add @ef2/strapi-plugin-open-ai-seo-completion
```

Enable the plugin in `./config/plugins.js` by adding the following:

```js
'open-ai-seo-completion': {
  enabled: true,
    resolve: './src/plugins/open-ai-seo-completion',
    config: {
        apiToken: process.env.OPEN_AI_API_TOKEN
    }
}
```

Set your OpenAI API key in your `.env` file:

```dotenv
OPEN_AI_API_TOKEN=your-api-token
```

## Usage

Coming soon...
