import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Lazy, LazyImport } from "./components/Lazy/Lazy";
import { useState, useEffect, createContext, FC, ReactNode } from "react";

const TestPage = LazyImport("./pages/TestPage/TestPage");
const LandingPage = LazyImport("./pages/LandingPage/LandingPage");
const DesignPage = LazyImport("./pages/TestPage/pages/DesignPage");

import "./extensions";
import "./global.css";

type MainStateProps = {
    isDarkThemed: boolean;

    ToggleDarkTheme: () => void;
};

export const MainContext = createContext<MainStateProps>(null!);

const ROOT_DIV_ELEMENT: HTMLElement | null = document.querySelector("#root");

const LazyPage: FC<{ children: ReactNode }> = ({ children }) => (
    <Lazy errorFallback={<NotFoundPage />} loadingFallback={<LoadingPage />}>
        {children}
    </Lazy>
);

const LazyComponent: FC<{ children: ReactNode }> = ({ children }) => (
    <Lazy errorFallback={"Error!"} loadingFallback={"Loading..."}>
        {children}
    </Lazy>
);

const Index: FC = () => {
    const [state, setState] = useState<MainStateProps>({
        isDarkThemed: true,

        ToggleDarkTheme,
    });

    useEffect(() => {
        document.body.classList.toggle("dark-themed");
    }, []);

    function ToggleDarkTheme(): void {
        state.isDarkThemed = !state.isDarkThemed;
        setState({ ...state });

        document.body.classList.toggle("light-themed");
        document.body.classList.toggle("dark-themed");
    }

    return (
        <MainContext.Provider value={state}>
            <HashRouter basename={window.location.pathname || ""}>
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
                                path="design"
                                element={
                                    <LazyComponent>
                                        <DesignPage />
                                    </LazyComponent>
                                }
                            />
                        </Route>
                    )}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </HashRouter>
        </MainContext.Provider>
    );
};

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);
