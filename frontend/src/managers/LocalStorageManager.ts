import { z } from "zod";
import { ZodGetDefaults } from "@/functions/Zod.GetDefaults";

export enum DirectionEnum {
    rtl = "rtl",
    ltr = "ltr",
}

export type Direction = ExtractEnumValue<DirectionEnum>;

export enum ThemeModeEnum {
    light = "light",
    dark = "dark",
    system = "system",
}

export type ThemeMode = ExtractEnumValue<ThemeModeEnum>;

export const LocalStorageSchema = z.object({
    token: z.string().nullish(),
    language: z.string().length(2).default("en"),
    "theme-palette": z.string().default("caramel"),
    direction: z.enum(Object.getEnumValues(DirectionEnum)).default("ltr"),
    "theme-mode": z.enum(Object.getEnumValues(ThemeModeEnum)).default("system"),
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
        const defaults = ZodGetDefaults(LocalStorageSchema);
        const items = Object.keys(LocalStorageSchema.keyof().Enum).reduce(
            (accumulator, key) => {
                const value = localStorage.getItem(
                    `${LocalStorageManager.KEY}-${key}`
                );

                return {
                    ...accumulator,
                    [key]:
                        value != null
                            ? JSON.parse(value)
                            : defaults[key as keyof LocalStorageDTO],
                };
            },
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

        if (value == undefined) {
            localStorage.removeItem(`${LocalStorageManager.KEY}-${key}`);
            return;
        }

        localStorage.setItem(
            `${LocalStorageManager.KEY}-${key}`,
            JSON.stringify(value)
        );
    }
}
