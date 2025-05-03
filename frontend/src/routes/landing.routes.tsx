import { Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { RoutesWithAbsolutePaths } from "@/functions/RoutesWithAbsolutePath";

const LandingPage = LazyImport("./pages/LandingPage/LandingPage");

const LANDING_ROUTES_ = RoutesWithAbsolutePaths({
    home: { href: "/" },
    about: { href: "/about" },
    "contact-us": { href: "/contact-us" },
    references: { href: "/references" },
    help: { href: "/help" },
});

export const LANDING_ROUTES =
    EnvironmentVariables.ENVIRONMENT != "development"
        ? LANDING_ROUTES_
        : { ...LANDING_ROUTES_, test: { text: "TEST", href: "/test" } };

export const LandingRoute = () => {
    return (
        <Route
            path={LANDING_ROUTES.home.href}
            element={
                <LazyPage>
                    <LandingPage />
                </LazyPage>
            }
        />
    );
};
