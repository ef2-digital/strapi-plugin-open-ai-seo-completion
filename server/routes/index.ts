export default [
  {
    method: 'POST',
    path: '/generate-seo-information',
    handler: 'AiController.generateSeoInformation',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/info',
    handler: 'AiController.getInfo',
    config: {
      auth: false,
      policies: [],
    },
  }];
