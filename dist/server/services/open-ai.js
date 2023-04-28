'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoInfoType = void 0;
const axios_1 = __importDefault(require("axios"));
exports.default = ({ strapi }) => ({
    async generateSeoInfo(content, locale, type) {
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
var SeoInfoType;
(function (SeoInfoType) {
    SeoInfoType["description"] = "description";
    SeoInfoType["title"] = "title";
})(SeoInfoType = exports.SeoInfoType || (exports.SeoInfoType = {}));
