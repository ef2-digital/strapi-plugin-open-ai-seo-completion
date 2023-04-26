"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
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
    }
];
