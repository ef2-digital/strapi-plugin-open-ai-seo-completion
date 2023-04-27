export default [
  {
    method: 'POST',
    path: '/generate-seo-information',
    handler: 'AiController.generateSeoInformation',
    config: {
      auth: false,
      policies: [],
    },
  }];
