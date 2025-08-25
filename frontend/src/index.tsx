import { FC } from "react";
import { RootRoutes } from "./routes";
import ReactDOM from "react-dom/client";
import { RootProvider } from "./contexts";
import { EnvironmentVariables } from "./managers/EnvironmentVariables";

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

declare global {
    interface Window {
        __REACT_ROOT__: ReactDOM.Root | undefined;
    }
}

if (EnvironmentVariables.ENVIRONMENT == "production") {
    ReactDOM.createRoot(ROOT_ELEMENT ?? document.body).render(<Index />);
} else {
    Render();

    function Render() {
        const container = ROOT_ELEMENT ?? document.body;

        if (window.__REACT_ROOT__ == null) {
            window.__REACT_ROOT__ = ReactDOM.createRoot(container);
        }

        window.__REACT_ROOT__.render(<Index />);
    }

    if (import.meta.hot) {
        import.meta.hot.accept("./Index", async () => {
            Render();
        });
    }
}
