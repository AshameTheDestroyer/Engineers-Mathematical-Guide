import { useTheme } from "@/hooks/useTheme";
import {
    SetInLocalStorage,
    GetFromLocalStorage,
} from "@/functions/HandleLocalStorage";
import {
    FC,
    useState,
    useEffect,
    createContext,
    PropsWithChildren,
} from "react";

export type ThemePaletteStateProps = {
    themePalette: string;
    themePalettes: Array<string>;
    SetThemePalette: (themePalette: string) => void;
};

export const ThemePaletteContext = createContext<ThemePaletteStateProps>(null!);

const PALETTE_VARIABLES = [
    "light",
    "light-hover",
    "light-active",
    "normal",
    "normal-hover",
    "normal-active",
    "dark",
    "dark-hover",
    "dark-active",
    "darker",
];

export type ThemePaletteProviderProps = PropsWithChildren;

export const ThemePaletteProvider: FC<ThemePaletteProviderProps> = ({
    children,
}) => {
    const { isDarkThemed } = useTheme();
    const [state, setState] = useState<ThemePaletteStateProps>({
        SetThemePalette,
        themePalettes: GetThemePalettes(),
        themePalette: GetFromLocalStorage("theme-palette") ?? "caramel",
    });

    useEffect(() => {
        UpdateThemePaletteVariables(state.themePalette);
    }, [isDarkThemed, state.themePalette]);

    function SetThemePalette(themePalette: string) {
        SetInLocalStorage("theme-palette", themePalette);
        setState((state) => ({ ...state, themePalette }));
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

    function UpdateThemePaletteVariables(themePalette?: string) {
        PALETTE_VARIABLES.map((paletteVariable, i) => {
            document.body.style.setProperty(
                `--color-background-${isDarkThemed ? PALETTE_VARIABLES.at(-1 * (i + 1)) : paletteVariable}`,
                themePalette != null
                    ? `var(--color-${themePalette}-${isDarkThemed ? "foreground" : "background"}-${paletteVariable})`
                    : ""
            );

            document.body.style.setProperty(
                `--color-foreground-${isDarkThemed ? PALETTE_VARIABLES.at(-1 * (i + 1)) : paletteVariable}`,
                themePalette != null
                    ? `var(--color-${themePalette}-${isDarkThemed ? "background" : "foreground"}-${paletteVariable})`
                    : ""
            );
        });
    }

    return (
        <ThemePaletteContext.Provider value={state}>
            {children}
        </ThemePaletteContext.Provider>
    );
};
