import ReactDOM from "react-dom/client";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Lazy, LazyImport } from "./components/Lazy/Lazy";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";
import { useState, createContext, FC, ReactNode } from "react";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ThemeModeProvider } from "./components/ThemeModeProvider/ThemeModeProvider";

const TestPage = LazyImport("./pages/TestPage/TestPage");
const LandingPage = LazyImport("./pages/LandingPage/LandingPage");
const ColoursPage = LazyImport("./pages/TestPage/pages/ColoursPage");
const PalettesPage = LazyImport("./pages/TestPage/pages/PalettesPage");
const TypographyPage = LazyImport("./pages/TestPage/pages/TypographyPage");
const ComponentsPage = LazyImport("./pages/TestPage/pages/ComponentsPage");

import "./extensions";
import "./global.css";

type MainStateProps = {};

export const MainContext = createContext<MainStateProps>(null!);

const ROOT_DIV_ELEMENT: HTMLElement | null = document.querySelector("#root");

const LazyPage: FC<{ children: ReactNode }> = ({ children }) => (
    <Lazy errorFallback={<ErrorPage />} loadingFallback={<LoadingPage />}>
        {children}
    </Lazy>
);

const LazyComponent: FC<{ children: ReactNode }> = ({ children }) => (
    <Lazy errorFallback={"Error!"} loadingFallback={"Loading..."}>
        {children}
    </Lazy>
);

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
            {import.meta.env["VITE_ENVIRONMENT"] == "development" && (
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
            <ThemeModeProvider>
                <HashRouter basename={window.location.pathname || ""}>
                    <IndexRoutes />
                </HashRouter>
            </ThemeModeProvider>
        </MainContext.Provider>
    );
};

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);
