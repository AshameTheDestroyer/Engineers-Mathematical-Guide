import { HashRouter } from "react-router-dom";
import { ComposeProviders } from "./functions/ComposeProviders";
import { MathJaxContext as MathJaxProvider } from "better-react-mathjax";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/ToastProvider/ToastProvider";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ThemeModeProvider } from "./components/ThemeModeProvider/ThemeModeProvider";
import { LocalizationProvider } from "./components/LocalizationProvider/LocalizationProvider";
import { ThemePaletteProvider } from "./components/ThemePaletteProvider/ThemePaletteProvider";

export const queryClient = new QueryClient();

export type MainStateProps = {};

export const MainContext = createContext<MainStateProps>(null!);

export const useMain = () => useContext(MainContext);

export const ContextProviders = [
    ({ children }: PropsWithChildren) => {
        const [state, _setState] = useState<MainStateProps>({});
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
    ({ children }: PropsWithChildren) => (
        <HashRouter basename={window.location.pathname || ""}>
            {children}
        </HashRouter>
    ),
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
        <MathJaxProvider>{children}</MathJaxProvider>
    ),
    ({ children }: PropsWithChildren) => (
        <ToastProvider>{children}</ToastProvider>
    ),
];

export const RootProvider = ComposeProviders(...ContextProviders);
