import ReactDOM from "react-dom/client";
import { Lazy, LazyImport } from "./components/Lazy/Lazy";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";
import { useState, useEffect, createContext, FC } from "react";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { DesignTestPage } from "./pages/DesignTestPage/DesignTestPage";

const LandingPage = LazyImport("./pages/LandingPage/LandingPage");

import "./extensions";
import "./global.css";

type MainStateProps = {
    isDarkThemed: boolean;

    ToggleDarkTheme: () => void;
};

export const MainContext = createContext<MainStateProps>(null!);

const ROOT_DIV_ELEMENT: HTMLElement | null = document.querySelector("#root");

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
                            <Lazy
                                loadingFallback={<LoadingPage />}
                                errorFallback={(_error) => <NotFoundPage />}
                            >
                                <LandingPage />
                            </Lazy>
                        }
                    />
                    {import.meta.env["VITE_ENVIRONMENT"] == "development" && (
                        <Route
                            path="design-test"
                            element={<DesignTestPage />}
                        />
                    )}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </HashRouter>
        </MainContext.Provider>
    );
};

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);
