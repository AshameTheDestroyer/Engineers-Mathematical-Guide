import { Handler } from "express";
import { AIAssistant } from "./ai.model";

export const PromptAI: Handler = async (request, response) => {
    try {
        const { prompt } = request.body;

        const AIResponse = await AIAssistant.Model.models.generateContent({
            contents: prompt,
            model: process.env.AI_MODEL,
            config: {
                temperature: Number(process.env.AI_TEMPERATURE),
                systemInstruction: process.env.AI_SYSTEM_INSTRUCTIONS,
            },
        });

        response.status(200).json({
            message: AIResponse.text,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};
