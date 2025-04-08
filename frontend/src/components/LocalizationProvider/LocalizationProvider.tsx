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
};

export const LocalizationContext = createContext<LocalizationStateProps>(null!);

export const useLocalization = () => useContext(LocalizationContext);

export type LocalizationProviderProps = PropsWithChildren;

export const LocalizationProvider: FC<LocalizationProviderProps> = ({
    children,
}) => {
    const [state, setState] = useState<LocalizationStateProps>({
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

    return (
        <LocalizationContext.Provider value={state}>
            {children}
        </LocalizationContext.Provider>
    );
};
