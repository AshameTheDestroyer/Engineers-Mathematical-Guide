import { FC } from "react";
import { RootRoutes } from "./routes";
import ReactDOM from "react-dom/client";
import { RootProvider } from "./contexts";

import "./extensions";
import "./global.css";

export const ROOT_ELEMENT = document.getElementById("root");
export const MODAL_CONTAINER_ELEMENT =
    document.getElementById("modal-container");

const Index: FC = () => {
    return (
        <RootProvider>
            <RootRoutes />
        </RootProvider>
    );
};

ReactDOM.createRoot(ROOT_ELEMENT ?? document.body).render(<Index />);
