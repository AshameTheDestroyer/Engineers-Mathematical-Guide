import { Anchor } from "@/types/Anchor";
import { Gender } from "@/schemas/SignupSchema";
import {
    WritingDirection,
    LocalStorageManager,
    WritingDirectionMode,
    WritingDirectionModeEnum,
} from "@/managers/LocalStorageManager";
import {
    FC,
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";

import supported_languages from "@json/supported_languages.json";

export type LocalizationStateProps = {
    language: string;
    direction: WritingDirection;
    "direction-mode": WritingDirectionMode;
    SetLanguage: (language: string) => void;
    SetDirectionMode: (direction: WritingDirectionMode) => void;
    GetLocale: (locales: Record<string, string>, language: string) => string;
    GetGenderedLocale: (
        locales: Record<string, string | Record<Gender, string>>,
        language: string,
        gender: Gender
    ) => string;
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
        GetErrorLocale,
        GetRouteLocales,
        SetDirectionMode,
        GetGenderedLocale,
        language: LocalStorageManager.Instance.items.language,
        "direction-mode": LocalStorageManager.Instance.items["direction-mode"],
        direction: GetDirection(
            LocalStorageManager.Instance.items["direction-mode"],
            LocalStorageManager.Instance.items.language
        ),
    });

    useEffect(() => {
        setState((state) => ({
            ...state,
            direction: GetDirection(state["direction-mode"], state.language),
        }));
    }, [state["direction-mode"], state.language]);

    useEffect(() => {
        document.body.style.direction = state.direction;
    }, [state.direction]);

    function SetLanguage(language: string) {
        LocalStorageManager.Instance.SetItem("language", language);
        setState((state) => ({ ...state, language }));
    }

    function SetDirectionMode(directionMode: WritingDirectionMode) {
        LocalStorageManager.Instance.SetItem("direction-mode", directionMode);
        setState((state) => ({ ...state, "direction-mode": directionMode }));
    }

    function GetLocale(locales: Record<string, string>, language: string) {
        const locale = locales[language];
        if (locale == null) {
            // Fetch translation API and return result.
        }
        return locale;
    }

    function GetGenderedLocale(
        locales: Record<string, string | Record<Gender, string>>,
        language: string,
        gender: Gender
    ) {
        const locale_ = locales[language];
        const locale = typeof locale_ == "string" ? locale_ : locale_[gender];
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
        const routeLocales = Object.entries(routes).map(([key, value]) => {
            if (key in locales) {
                return {
                    ...value,
                    locale: locales[key],
                };
            }

            throw new Error(
                `The "${key}" was not found in the provided locales.`
            );
        });

        return routeLocales.map(
            (routeLocale) =>
                ({
                    ...routeLocale,
                    title: GetLocale(routeLocale.locale, language),
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

    function GetDirection(
        directionMode: WritingDirectionMode,
        language: string
    ): WritingDirection {
        if (directionMode == WritingDirectionModeEnum.auto) {
            const language_ = supported_languages.find(
                (language_) => language_.code == language
            );
            return language_?.direction as WritingDirection;
        }

        return directionMode;
    }

    return (
        <LocalizationContext.Provider value={state}>
            {children}
        </LocalizationContext.Provider>
    );
};
