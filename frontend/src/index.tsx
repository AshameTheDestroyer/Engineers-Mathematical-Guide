import ReactDOM from "react-dom/client";
import { Lazy, LazyImport } from "./components/Lazy/Lazy";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext, FC } from "react";

const LandingPage = LazyImport("./pages/LandingPage/LandingPage");
const NotFoundPage = LazyImport("./pages/NotFoundPage/NotFoundPage");

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
                                loadingFallback={"loading..."}
                                errorFallback={(_error) => "error!"}
                            >
                                <LandingPage />
                            </Lazy>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Lazy
                                loadingFallback={"loading..."}
                                errorFallback={(_error) => "error!"}
                            >
                                <NotFoundPage />
                            </Lazy>
                        }
                    />
                </Routes>
            </HashRouter>
        </MainContext.Provider>
    );
};

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);
