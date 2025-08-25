import { GoogleGenAI } from "@google/genai";
import { EnvironmentVariables } from "./EnvironmentVariables";

export class PIAssistant {
    static instance?: PIAssistant;
    #assistant: GoogleGenAI;
    #subscribers = new Set<() => void>();
    #messages = [] as Array<{
        answer: string;
        question: string;
        finished: boolean;
    }>;

    static get Instance() {
        return (this.instance ??= new PIAssistant());
    }

    constructor() {
        this.#assistant = new GoogleGenAI({
            apiKey: EnvironmentVariables.AI_KEY,
        });
    }

    get messages() {
        return [...this.#messages];
    }

    #NotifySubscribers() {
        this.#subscribers.forEach((fn) => fn());
    }

    Subscribe(delegate: () => void) {
        this.#subscribers.add(delegate);
        return () => {
            this.#subscribers.delete(delegate);
        };
    }

    async Ask(question: string) {
        const message: (typeof this.messages)[number] = {
            question,
            answer: "",
            finished: false,
        };

        console.log({ message });
        this.#messages.push(message);
        this.#NotifySubscribers();

        try {
            const response = await this.#assistant.models.generateContentStream(
                {
                    contents: [{ role: "user", parts: [{ text: question }] }],
                    model: "gemini-2.5-flash",
                    config: {
                        systemInstruction:
                            EnvironmentVariables.AI_SYSTEM_INSTRUCTIONS,
                    },
                }
            );

            for await (const chunk of response) {
                console.log({ chunk: chunk.text });
                message.answer += chunk.text;
                this.#NotifySubscribers();
            }
        } catch (error) {
            console.error(error);
        }

        message.finished ||= true;
        return message;
    }
}
