import ReactDOM from "react-dom/client";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Lazy, LazyImport } from "./components/Lazy/Lazy";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { environmentVariables } from "./services/EnvironmentVariables";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext, FC, ReactNode, useContext } from "react";
import { ThemeModeProvider } from "./components/ThemeModeProvider/ThemeModeProvider";
import { ThemePaletteProvider } from "./components/ThemePaletteProvider/ThemePaletteProvider";
import {
    useLocalization,
    LocalizationProvider,
} from "./components/LocalizationProvider/LocalizationProvider";

import lazy_locales from "@localization/lazy.json";

import "./extensions";
import "./global.css";

const TestPage = LazyImport("./pages/TestPage/TestPage");
const LandingPage = LazyImport("./pages/LandingPage/LandingPage");
const ColoursPage = LazyImport("./pages/TestPage/pages/ColoursPage");
const PalettesPage = LazyImport("./pages/TestPage/pages/PalettesPage");
const LoginPage = LazyImport("./pages/RegistrationPage/pages/LoginPage");
const SignupPage = LazyImport("./pages/RegistrationPage/pages/SignupPage");
const TypographyPage = LazyImport("./pages/TestPage/pages/TypographyPage");
const ComponentsPage = LazyImport("./pages/TestPage/pages/ComponentsPage");
const ForgotPasswordPage = LazyImport(
    "./pages/RegistrationPage/pages/ForgotPasswordPage"
);
const RegistrationPage = LazyImport(
    "./pages/RegistrationPage/RegistrationPage"
);

const queryClient = new QueryClient();

type MainStateProps = {};

export const MainContext = createContext<MainStateProps>(null!);

export const useMain = () => useContext(MainContext);

const ROOT_DIV_ELEMENT: HTMLElement | null = document.querySelector("#root");

const LazyPage: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Lazy errorFallback={<ErrorPage />} loadingFallback={<LoadingPage />}>
            {children}
        </Lazy>
    );
};

const LazyComponent: FC<{ children: ReactNode }> = ({ children }) => {
    const { GetLocale, language } = useLocalization();

    return (
        <Lazy
            errorFallback={GetLocale(lazy_locales.error, language)}
            loadingFallback={GetLocale(lazy_locales.loading, language)}
        >
            {children}
        </Lazy>
    );
};

const IndexRoutes: FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <LazyPage>
                        <LandingPage />
                    </LazyPage>
                }
            />
            <Route
                path="registration"
                element={
                    <LazyPage>
                        <RegistrationPage />
                    </LazyPage>
                }
            >
                <Route
                    path="signup"
                    element={
                        <LazyComponent>
                            <SignupPage />
                        </LazyComponent>
                    }
                />
                <Route
                    path="login"
                    element={
                        <LazyComponent>
                            <LoginPage />
                        </LazyComponent>
                    }
                />
                <Route
                    path="forgot-password"
                    element={
                        <LazyComponent>
                            <ForgotPasswordPage />
                        </LazyComponent>
                    }
                />
            </Route>
            {environmentVariables.ENVIRONMENT == "development" && (
                <Route
                    path="test"
                    element={
                        <LazyPage>
                            <TestPage />
                        </LazyPage>
                    }
                >
                    <Route
                        path="colours"
                        element={
                            <LazyComponent>
                                <ColoursPage />
                            </LazyComponent>
                        }
                    />
                    <Route
                        path="typography"
                        element={
                            <LazyComponent>
                                <TypographyPage />
                            </LazyComponent>
                        }
                    />
                    <Route
                        path="components"
                        element={
                            <LazyComponent>
                                <ComponentsPage />
                            </LazyComponent>
                        }
                    />
                    <Route
                        path="palettes"
                        element={
                            <LazyComponent>
                                <PalettesPage />
                            </LazyComponent>
                        }
                    />
                </Route>
            )}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

const Index: FC = () => {
    const [state, _setState] = useState<MainStateProps>({});

    return (
        <MainContext.Provider value={state}>
            <QueryClientProvider client={queryClient}>
                <LocalizationProvider>
                    <ThemeModeProvider>
                        <ThemePaletteProvider>
                            <HashRouter
                                basename={window.location.pathname || ""}
                            >
                                <IndexRoutes />
                            </HashRouter>
                        </ThemePaletteProvider>
                    </ThemeModeProvider>
                </LocalizationProvider>
            </QueryClientProvider>
        </MainContext.Provider>
    );
};

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);
