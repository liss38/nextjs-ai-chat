import OpenAI from "openai";


export const yandexClient = new OpenAI({
    baseURL: process.env.YANDEX_BASE_URL,
    apiKey: process.env.YANDEX_API_KEY,
    project: process.env.YANDEX_FOLDER_ID,
});