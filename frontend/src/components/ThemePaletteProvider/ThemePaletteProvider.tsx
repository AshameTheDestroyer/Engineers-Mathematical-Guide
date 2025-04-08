import { GetFromLocalStorage } from "@/functions/HandleLocalStorage";
import { FC, useState, createContext, PropsWithChildren } from "react";

export type ThemePaletteStateProps = {
    themePalette?: string;
    themePalettes: Array<string>;
    SetThemePalette: (themePalette?: string) => void;
};

export const ThemePaletteContext = createContext<ThemePaletteStateProps>(null!);

const PALETTE_VARIABLES = [
    "background-light",
    "background-light-hover",
    "background-light-active",
    "background-normal",
    "background-normal-hover",
    "background-normal-active",
    "background-dark",
    "background-dark-hover",
    "background-dark-active",
    "background-darker",
    "foreground-light",
    "foreground-light-hover",
    "foreground-light-active",
    "foreground-normal",
    "foreground-normal-hover",
    "foreground-normal-active",
    "foreground-dark",
    "foreground-dark-hover",
    "foreground-dark-active",
    "foreground-darker",
];

export type ThemePaletteProviderProps = PropsWithChildren;

export const ThemePaletteProvider: FC<ThemePaletteProviderProps> = ({
    children,
}) => {
    const [state, setState] = useState<ThemePaletteStateProps>({
        SetThemePalette,
        themePalettes: GetThemePalettes(),
        themePalette: GetFromLocalStorage("theme-palette"),
    });

    function SetThemePalette(themePalette?: string) {
        setState((state) => ({
            ...state,
            themePalette: themePalette == "default" ? undefined : themePalette,
        }));

        PALETTE_VARIABLES.map((paletteVariable) =>
            document.body.style.setProperty(
                `--color-${paletteVariable}`,
                themePalette != null
                    ? `var(--color-${themePalette}-${paletteVariable})`
                    : ""
            )
        );
    }

    function GetThemePalettes(): Array<string> {
        const root = document.querySelector(":root") as HTMLElement;
        const styles = [...root.computedStyleMap().keys()];
        const paletteRegex = /--color-(.*?)-background/;

        return Array.from(
            new Set(
                styles
                    .filter((style) => paletteRegex.test(style))
                    .map((palette) => palette.match(paletteRegex)?.[1])
                    .filter((palette) => palette != null)
            )
        );
    }

    return (
        <ThemePaletteContext.Provider value={state}>
            {children}
        </ThemePaletteContext.Provider>
    );
};
