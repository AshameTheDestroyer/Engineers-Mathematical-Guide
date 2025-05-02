import { LocalStorageManager, ThemeMode } from "@/managers/LocalStorageManager";
import {
    FC,
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";

type ThemeModeStateProps = {
    isDarkThemed: boolean;
    ToggleThemeMode: () => void;
    themeMode: ExtractEnumValue<ThemeMode>;
    SetThemeMode: (themeMode: ExtractEnumValue<ThemeMode>) => void;
};

export const ThemeModeContext = createContext<ThemeModeStateProps>(null!);

export const useThemeMode = () => useContext(ThemeModeContext);

export type ThemeModeProviderProps = PropsWithChildren;

export const ThemeModeProvider: FC<ThemeModeProviderProps> = ({ children }) => {
    const [state, setState] = useState<ThemeModeStateProps>(() => {
        const themeMode = LocalStorageManager.Instance.items["theme-mode"];

        return {
            themeMode,
            SetThemeMode,
            ToggleThemeMode,
            isDarkThemed: GetIsDarkThemed(themeMode),
        };
    });

    useEffect(() => {
        LocalStorageManager.Instance.SetItem("theme-mode", state.themeMode);
        document.body.classList[
            GetIsDarkThemed(state.themeMode) ? "add" : "remove"
        ]("dark-themed");
    }, [state.themeMode]);

    function SetThemeMode(themeMode: ExtractEnumValue<ThemeMode>) {
        setState((state) => ({
            ...state,
            themeMode,
            isDarkThemed: GetIsDarkThemed(themeMode),
        }));
    }

    function ToggleThemeMode() {
        setState((state) => {
            const themeMode =
                state.themeMode == ThemeMode.dark
                    ? ThemeMode.light
                    : ThemeMode.dark;

            return {
                ...state,
                themeMode,
                isDarkThemed: GetIsDarkThemed(themeMode),
            };
        });
    }

    function GetIsDarkThemed(themeMode: ExtractEnumValue<ThemeMode>): boolean {
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
