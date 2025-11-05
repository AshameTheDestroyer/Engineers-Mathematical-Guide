import { GoogleGenAI } from "@google/genai";

export class AIAssistant {
    static #model: GoogleGenAI;

    static get Model() {
        return (this.#model ??= AIAssistant.#model =
            new GoogleGenAI({
                apiKey: process.env.AI_API_KEY,
            }));
    }
}
