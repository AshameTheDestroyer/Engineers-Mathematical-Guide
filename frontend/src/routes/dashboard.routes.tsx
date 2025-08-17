import { FC } from "react";
import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

const DashboardPage = LazyImport("./pages/DashboardPage/DashboardPage");
const UserDashboardPage = LazyImport(
    "./pages/DashboardPage/pages/UserDashboardPage"
);

import locales from "@localization/routes.json";

export const DASHBOARD_ROUTES = BuildRouter({
    base: {
        href: "/dashboard",
        routes: {
            home: { href: "/website" },
            "dashboard-users": {
                href: "users",
                title: "User Dashboard",
            },
        },
    },
});

export const DashboardRoute: FC = () => {
    const { language, GetLocale } = useLocalization();

    return (
        <Route
            path={DASHBOARD_ROUTES.base.href}
            element={
                <LazyPage>
                    <DashboardPage />
                </LazyPage>
            }
        >
            <Route
                path={DASHBOARD_ROUTES.base.routes["dashboard-users"].href}
                element={
                    <LazyComponent>
                        <UserDashboardPage />
                        <Title>
                            {GetLocale(locales["dashboard-users"], language)}
                        </Title>
                    </LazyComponent>
                }
            />
        </Route>
    );
};
