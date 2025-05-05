import { Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { RoutesWithAbsolutePaths } from "@/functions/RoutesWithAbsolutePath";

const ApplicationPage = LazyImport("./pages/ApplicationPage/ApplicationPage");

export const APPLICATION_ROUTES = RoutesWithAbsolutePaths({
    base: {
        href: "/",
    },
});

export const ApplicationRoute = () => {
    return (
        <Route
            path={APPLICATION_ROUTES.base.href}
            element={
                <LazyPage>
                    <ApplicationPage />
                </LazyPage>
            }
        />
    );
};
