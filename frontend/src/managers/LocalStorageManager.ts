import { z } from "zod";

export enum Direction {
    rtl = "rtl",
    ltr = "ltr",
}

export enum ThemeMode {
    light = "light",
    dark = "dark",
    system = "system",
}

export const LocalStorageSchema = z.object({
    token: z.string().nullable(),
    language: z.string().length(2).default("en"),
    "theme-palette": z.string().default("caramel"),
    direction: z.nativeEnum(Direction).default(Direction.ltr),
    "theme-mode": z.nativeEnum(ThemeMode).default(ThemeMode.system),
});

export type LocalStorageDTO = z.infer<typeof LocalStorageSchema>;

export class LocalStorageManager {
    static readonly KEY = "MATHWARE-EMG";

    static instance?: LocalStorageManager;
    #items: LocalStorageDTO;

    static get Instance() {
        return (this.instance ??= new LocalStorageManager());
    }

    constructor() {
        const items = Object.keys(LocalStorageSchema.keyof().Enum).reduce(
            (accumulator, key) => ({
                ...accumulator,
                [key]: JSON.parse(
                    localStorage.getItem(`${LocalStorageManager.KEY}-${key}`)!
                ),
            }),
            {}
        );

        this.#items = LocalStorageSchema.parse(items);
    }

    get items() {
        return this.#items;
    }

    SetItem<T extends keyof LocalStorageDTO>(
        key: T,
        value: LocalStorageDTO[T]
    ): void {
        this.#items[key] = value;
        localStorage.setItem(
            `${LocalStorageManager.KEY}-${key}`,
            JSON.stringify(value)
        );
    }
}
