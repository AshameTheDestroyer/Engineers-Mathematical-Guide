import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext, FC } from "react";

import { SignupPage } from "./pages/SignupPage/SignupPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

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
                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route
                        path="/registration/signup"
                        element={<SignupPage />}
                    />
                </Routes>
            </HashRouter>
        </MainContext.Provider>
    );
};

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);
