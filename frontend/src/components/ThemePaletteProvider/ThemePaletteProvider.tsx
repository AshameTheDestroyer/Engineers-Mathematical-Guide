import { GetFromLocalStorage } from "@/functions/HandleLocalStorage";
import {
    FC,
    useState,
    createContext,
    PropsWithChildren,
    useEffect,
} from "react";

export type ThemePaletteStateProps = {
    themePalette?: string;
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
        themePalette: GetFromLocalStorage("theme-palette"),
        SetThemePalette,
    });

    function SetThemePalette(themePalette?: string) {
        setState((state) => ({ ...state, themePalette }));

        PALETTE_VARIABLES.map((paletteVariable) =>
            document.body.style.setProperty(
                `--color-${paletteVariable}`,
                themePalette != null
                    ? `var(--color-${themePalette}-${paletteVariable})`
                    : ""
            )
        );
    }

    useEffect(() => {
        // if (initialPalette) {
        SetThemePalette("lagoon");
        // }
    }, []);

    return (
        <ThemePaletteContext.Provider value={state}>
            {children}
        </ThemePaletteContext.Provider>
    );
};
