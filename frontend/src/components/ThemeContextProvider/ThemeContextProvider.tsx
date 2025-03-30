import {
    FC,
    useState,
    useEffect,
    createContext,
    PropsWithChildren,
} from "react";
import {
    GetFromLocalStorage,
    SetInLocalStorage,
} from "@/functions/HandleLocalStorage";

type ThemeStateProps = {
    isDarkThemed: boolean;
    ToggleIsDarkThemed: () => void;
    SetIsDarkThemed: (value: boolean) => void;
};

export const ThemeContext = createContext<ThemeStateProps>(null!);

export type ThemeContextProviderProps = PropsWithChildren;

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
    children,
}) => {
    const [state, setState] = useState<ThemeStateProps>({
        isDarkThemed: Boolean(GetFromLocalStorage("isDarkThemed")),
        SetIsDarkThemed,
        ToggleIsDarkThemed,
    });

    useEffect(() => {
        SetInLocalStorage("isDarkThemed", state.isDarkThemed);
        document.body.classList[state.isDarkThemed ? "add" : "remove"](
            "dark-themed"
        );
    }, [state.isDarkThemed]);

    function SetIsDarkThemed(value: boolean): void {
        setState((state) => ({ ...state, isDarkThemed: value }));
    }

    function ToggleIsDarkThemed(): void {
        setState((state) => ({ ...state, isDarkThemed: !state.isDarkThemed }));
    }

    return (
        <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
    );
};
