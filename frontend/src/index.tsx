import { FC } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";

import { Home } from "./pages/Home";

import "./index.css";

const ROOT_DIV_ELEMENT: HTMLElement | null = document.querySelector("#root");

const Index: FC = () => {
    return (
        <HashRouter basename={window.location.pathname || ""}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </HashRouter>
    );
};

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);
