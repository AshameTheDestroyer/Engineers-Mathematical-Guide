import { FC } from "react";
import { RootRoutes } from "./Routes";
import ReactDOM from "react-dom/client";
import { RootProvider } from "./ContextProviders";

import "./extensions";
import "./global.css";

const ROOT_DIV_ELEMENT: HTMLElement | null = document.querySelector("#root");

const Index: FC = () => {
    return (
        <RootProvider>
            <RootRoutes />
        </RootProvider>
    );
};

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);
