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
    GetLocaleOfRoutes: (
        routes: Array<Anchor>,
        locales: Record<string, Record<string, string>>,
        language: string
    ) => Array<Anchor>;
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
        GetLocaleOfRoutes,
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

    function GetLocaleOfRoutes(
        routes: Array<Anchor>,
        locales: Record<string, Record<string, string>>,
        language: string
    ) {
        const routeLocales = routes.map((route) => ({
            locale: locales[route.text],
            href: route.href,
        }));

        return routeLocales.map(
            (routeLocale) =>
                ({
                    text: GetLocale(routeLocale.locale, language),
                    href: routeLocale.href,
                }) as Anchor
        );
    }

    return (
        <LocalizationContext.Provider value={state}>
            {children}
        </LocalizationContext.Provider>
    );
};
