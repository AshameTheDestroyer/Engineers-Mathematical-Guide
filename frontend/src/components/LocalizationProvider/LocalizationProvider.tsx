import {
    WritingDirection,
    LocalStorageManager,
} from "@/managers/LocalStorageManager";
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
    direction: WritingDirection;
    SetLanguage: (language: string) => void;
    SetDirection: (direction: WritingDirection) => void;
    GetLocale: (locales: Record<string, string>, language: string) => string;
    GetRouteLocales: (
        routes: Record<string, Omit<Anchor, "routes">>,
        locales: Record<string, Record<string, string>>,
        language: string
    ) => Array<Anchor>;
    GetErrorLocale: (
        errorKey: string | undefined,
        locales: Record<string, Record<string, string>>,
        language: string
    ) => string | undefined;
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
        GetErrorLocale,
        GetRouteLocales,
        language: LocalStorageManager.Instance.items.language,
        direction: LocalStorageManager.Instance.items.direction,
    });

    useEffect(() => {
        document.body.style.direction = state.direction;
    }, [state.direction]);

    function SetLanguage(language: string) {
        LocalStorageManager.Instance.SetItem("language", language);
        setState((state) => ({ ...state, language }));
    }

    function SetDirection(direction: WritingDirection) {
        LocalStorageManager.Instance.SetItem("direction", direction);
        setState((state) => ({ ...state, direction }));
    }

    function GetLocale(locales: Record<string, string>, language: string) {
        const locale = locales[language];
        if (locale == null) {
            // Fetch translation API and return result.
        }
        return locale;
    }

    function GetRouteLocales(
        routes: Record<string, Omit<Anchor, "routes">>,
        locales: Record<string, Record<string, string>>,
        language: string
    ) {
        const routeLocales = Object.entries(routes).map(([key, value]) => ({
            locale: locales[key],
            href: value.href,
        }));

        return routeLocales.map(
            (routeLocale) =>
                ({
                    text: GetLocale(routeLocale.locale, language),
                    href: routeLocale.href,
                }) as Anchor
        );
    }

    function GetErrorLocale(
        errorKey: string | undefined,
        locales: Record<string, Record<string, string>>,
        language: string
    ) {
        const errorLocale = locales[errorKey!];

        if (errorKey != null && errorLocale == null) {
            console.error("Error key not found.");
            console.error(errorKey);
            return "";
        }

        return errorKey && GetLocale(locales[errorKey], language);
    }

    return (
        <LocalizationContext.Provider value={state}>
            {children}
        </LocalizationContext.Provider>
    );
};
