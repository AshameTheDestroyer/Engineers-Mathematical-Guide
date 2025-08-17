import { FC } from "react";
import { Outlet, Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";

const WebsitePage = LazyImport("./pages/WebsitePage/WebsitePage");

export const WEBSITE_ROUTES = BuildRouter({
    base: {
        href: "website",
        routes: {
            home: { href: "" },
            about: { href: "about" },
            "contact-us": { href: "contact-us" },
            references: { href: "references" },
            help: { href: "help" },
            discover: { href: "/discover" },
            application: { href: "/" },
            test: {
                text: "TEST",
                href: "/test",
                renderingPredicate: () =>
                    EnvironmentVariables.ENVIRONMENT == "development",
            },
        },
    },
});

export const WebsiteRoute: FC = () => {
    return (
        <Route path={WEBSITE_ROUTES.base.href} element={<Outlet />}>
            <Route
                path={WEBSITE_ROUTES.base.routes.home.href}
                element={
                    <LazyPage>
                        <WebsitePage />
                    </LazyPage>
                }
            />
        </Route>
    );
};
