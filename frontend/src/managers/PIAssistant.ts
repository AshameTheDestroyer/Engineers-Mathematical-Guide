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

    readonly SYSTEM_INSTRUCTION =
        "You are a mathematics professor with a PhD in mathematics, you should explain engineering mathematics pretty well for engineers and engineering students and write them formulae they ask for, MOST IMPORTANTLY: you write all your messages' entires in this a Array<Markdown> schema, where the schema is: type Markdown = { element: string; children: string | Array<Markdown> }, (obviously write all double quotation with an escape dash before them, and don't use strong elements, just use double asterisks, use only p, q, h1, h2, h3, h4, h5, h6, ul, ol, li, table, thead, tbody, tr, th, td and mathjax for math components, (include inline math expression by writing it like this **$I'm a math expression$** inside any other element you wish)).";

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
                    config: { systemInstruction: this.SYSTEM_INSTRUCTION },
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
