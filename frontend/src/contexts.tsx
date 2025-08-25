import { HashRouter } from "react-router-dom";
import { DetailedUserDTO } from "./schemas/UserSchema";
import { useGetMyUser } from "./services/Users/useGetMyUser";
import { ComposeProviders } from "./functions/ComposeProviders";
import { MathJaxContext as MathJaxProvider } from "better-react-mathjax";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/ToastProvider/ToastProvider";
import { ThemeModeProvider } from "./components/ThemeModeProvider/ThemeModeProvider";
import { ScreenSizeProvider } from "./components/ScreenSizeProvider/ScreenSizeProvider";
import { ExaminationProvider } from "./components/ExaminationProvider/ExaminationProvider";
import { LocalizationProvider } from "./components/LocalizationProvider/LocalizationProvider";
import { ThemePaletteProvider } from "./components/ThemePaletteProvider/ThemePaletteProvider";
import {
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";

export const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 3000 * 60 * 10 } },
});

export type MainStateProps = {
    rootTitle: string;
    myUser?: DetailedUserDTO;
    setMyUser: (user: DetailedUserDTO | undefined) => void;
};

export const MainContext = createContext<MainStateProps>(null!);

export const useMain = () => useContext(MainContext);

export const ContextProviders = [
    ({ children }: PropsWithChildren) => {
        const [state, setState] = useState<MainStateProps>({
            rootTitle: document.title,
            setMyUser: (user) =>
                setState((state) => ({ ...state, myUser: user })),
        });

        const { data: myUser } = useGetMyUser(
            { usesSuspense: true },
            queryClient
        );

        useEffect(() => {
            setState((state) => ({ ...state, myUser }));
        }, []);

        return (
            <MainContext.Provider value={state}>
                {children}
            </MainContext.Provider>
        );
    },
    ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    ),
    ({ children }: PropsWithChildren) => <HashRouter>{children}</HashRouter>,
    ({ children }: PropsWithChildren) => (
        <LocalizationProvider>{children}</LocalizationProvider>
    ),
    ({ children }: PropsWithChildren) => (
        <ThemeModeProvider>{children}</ThemeModeProvider>
    ),
    ({ children }: PropsWithChildren) => (
        <ThemePaletteProvider>{children}</ThemePaletteProvider>
    ),
    ({ children }: PropsWithChildren) => (
        <ScreenSizeProvider>{children}</ScreenSizeProvider>
    ),
    ({ children }: PropsWithChildren) => (
        <ExaminationProvider>{children}</ExaminationProvider>
    ),
    ({ children }: PropsWithChildren) => (
        <MathJaxProvider>{children}</MathJaxProvider>
    ),
    ({ children }: PropsWithChildren) => (
        <ToastProvider>{children}</ToastProvider>
    ),
];

export const RootProvider = ComposeProviders(...ContextProviders);
