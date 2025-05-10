import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useDefaultRoute = (currentRoute: string, defaultRoute: string) => {
    const location = useLocation();
    const Navigate = useNavigate();
    const path = location.pathname
        .split("/")
        .filter((path) => path != "")
        .join("/");

    useEffect(() => {
        const currentRoute_ = currentRoute.replace(/^\//, "");
        const defaultRoute_ = defaultRoute.replace(/^\//, "");
        const navigatedRoute = `/${currentRoute_}/${defaultRoute_}`;

        if (path == currentRoute_) {
            Navigate(navigatedRoute.replace(/^\/\//, "/"));
        }
    }, [path, currentRoute, defaultRoute]);
};
