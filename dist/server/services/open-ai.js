'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = ({ strapi }) => ({
    async generateSeoInfo(content, locale) {
        try {
            const prompt = `Give a metadescription in this language: ${locale}, for this content: ${content}`;
            const response = await (0, axios_1.default)({
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
            });
            return response.data;
        }
        catch (err) {
            console.log(err.response);
        }
    }
});
