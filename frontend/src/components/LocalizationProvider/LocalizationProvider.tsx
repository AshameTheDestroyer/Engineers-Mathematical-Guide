import {
    SetInLocalStorage,
    GetFromLocalStorage,
} from "@/functions/HandleLocalStorage";
import {
    FC,
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";

export type LocalizationStateProps = {
    language: string;
    direction: "rtl" | "ltr";
    SetLanguage: (language: string) => void;
    SetDirection: (direction: "rtl" | "ltr") => void;
    GetLocale: (locales: Record<string, string>, language: string) => string;
};

export const LocalizationContext = createContext<LocalizationStateProps>(null!);

export const useLocalization = () => useContext(LocalizationContext);

export type LocalizationProviderProps = PropsWithChildren;

export const LocalizationProvider: FC<LocalizationProviderProps> = ({
    children,
}) => {
    const [state, setState] = useState<LocalizationStateProps>({
        GetLocale,
        SetLanguage,
        SetDirection,
        language: GetFromLocalStorage("language") ?? "en",
        direction: GetFromLocalStorage("direction") ?? "ltr",
    });

    useEffect(() => {
        document.body.style.direction = state.direction;
    }, [state.direction]);

    function SetLanguage(language: string) {
        SetInLocalStorage("language", language);
        setState((state) => ({ ...state, language }));
    }

    function SetDirection(direction: "rtl" | "ltr") {
        SetInLocalStorage("direction", direction);
        setState((state) => ({ ...state, direction }));
    }

    function GetLocale(locales: Record<string, string>, language: string) {
        const locale = locales[language];
        if (locale == null) {
            // Fetch translation API and return result.
        }
        return locale;
    }

    return (
        <LocalizationContext.Provider value={state}>
            {children}
        </LocalizationContext.Provider>
    );
};
