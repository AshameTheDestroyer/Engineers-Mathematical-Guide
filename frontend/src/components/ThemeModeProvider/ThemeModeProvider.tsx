import {
    FC,
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";
import {
    SetInLocalStorage,
    GetFromLocalStorage,
} from "@/functions/HandleLocalStorage";

type ThemeModeStateProps = {
    themeMode: ThemeMode;
    isDarkThemed: boolean;
    ToggleThemeMode: () => void;
    SetThemeMode: (themeMode: ThemeMode) => void;
};

export const ThemeModeContext = createContext<ThemeModeStateProps>(null!);

export const useThemeMode = () => useContext(ThemeModeContext);

export type ThemeModeProviderProps = PropsWithChildren;

export const ThemeModeProvider: FC<ThemeModeProviderProps> = ({ children }) => {
    const [state, setState] = useState<ThemeModeStateProps>(() => {
        const themeMode = GetFromLocalStorage("theme-mode") as ThemeMode;

        return {
            themeMode,
            SetThemeMode,
            ToggleThemeMode,
            isDarkThemed: GetIsDarkThemed(themeMode),
        };
    });

    useEffect(() => {
        SetInLocalStorage("theme-mode", state.themeMode);
        document.body.classList[
            GetIsDarkThemed(state.themeMode) ? "add" : "remove"
        ]("dark-themed");
    }, [state.themeMode]);

    function SetThemeMode(themeMode: ThemeMode) {
        setState((state) => ({
            ...state,
            themeMode,
            isDarkThemed: GetIsDarkThemed(themeMode),
        }));
    }

    function ToggleThemeMode() {
        setState((state) => {
            const themeMode = state.themeMode == "dark" ? "light" : "dark";

            return {
                ...state,
                themeMode,
                isDarkThemed: GetIsDarkThemed(themeMode),
            };
        });
    }

    function GetIsDarkThemed(themeMode: ThemeMode): boolean {
        return (
            themeMode == "dark" ||
            (themeMode == "system" && GetIsSystemDarkThemed())
        );
    }

    function GetIsSystemDarkThemed(): boolean {
        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    }

    return (
        <ThemeModeContext.Provider value={state}>
            {children}
        </ThemeModeContext.Provider>
    );
};
