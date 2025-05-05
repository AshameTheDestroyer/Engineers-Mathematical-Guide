import { Outlet, Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { RoutesWithAbsolutePaths } from "@/functions/RoutesWithAbsolutePath";

const WebsitePage = LazyImport("./pages/WebsitePage/WebsitePage");

const WEBSITE_ROUTES_ = RoutesWithAbsolutePaths({
    base: {
        href: "website",
        routes: {
            home: { href: "" },
            about: { href: "about" },
            "contact-us": { href: "contact-us" },
            references: { href: "references" },
            help: { href: "help" },
        },
    },
});

export const WEBSITE_ROUTES =
    EnvironmentVariables.ENVIRONMENT != "development"
        ? WEBSITE_ROUTES_
        : {
              ...WEBSITE_ROUTES_,
              base: {
                  ...WEBSITE_ROUTES_.base,
                  routes: {
                      ...WEBSITE_ROUTES_.base.routes,
                      test: { text: "TEST", href: "/test" },
                  },
              },
          };

export const WebsiteRoute = () => {
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
