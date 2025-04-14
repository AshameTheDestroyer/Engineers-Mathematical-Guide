import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useDefaultRoute = (currentRoute: string, defaultRoute: string) => {
    const location = useLocation();
    const Navigate = useNavigate();
    const path =
        "/" +
        location.pathname
            .split("/")
            .filter((path) => path != "")
            .join("/");

    useEffect(() => {
        if (path == currentRoute) {
            Navigate(`${currentRoute}${defaultRoute}`);
        }
    }, [location.pathname]);
};
