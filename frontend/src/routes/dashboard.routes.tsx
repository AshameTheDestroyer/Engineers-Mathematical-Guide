import { FC } from "react";
import { Route } from "react-router-dom";
import { RoleEnum } from "@/schemas/UserSchema";
import { Title } from "@/components/Title/Title";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/routes.json";

const DashboardPage = LazyImport("./pages/DashboardPage/DashboardPage");
const UserDashboardPage = LazyImport(
    "./pages/DashboardPage/pages/UserDashboardPage"
);
const CourseDashboardPage = LazyImport(
    "./pages/DashboardPage/pages/CourseDashboardPage"
);
const LearningTrackDashboardPage = LazyImport(
    "./pages/DashboardPage/pages/LearningTrackDashboardPage"
);
const MathEquationDashboardPage = LazyImport(
    "./pages/DashboardPage/pages/MathEquationDashboardPage"
);

export const DASHBOARD_ROUTES = BuildRouter({
    base: {
        href: "/dashboard",
        renderingPredicate: (myUser) => myUser?.role == RoleEnum.admin,
        routes: {
            home: { href: "/website" },
            "user-dashboard": { href: "users" },
            "course-dashboard": { href: "courses" },
            "learning-track-dashboard": { href: "learning-tracks" },
            "math-equation-dashboard": { href: "math-equations" },
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
                path={DASHBOARD_ROUTES.base.routes["user-dashboard"].href}
                element={
                    <LazyComponent>
                        <UserDashboardPage />
                        <Title>
                            {GetLocale(locales["user-dashboard"], language)}
                        </Title>
                    </LazyComponent>
                }
            />
            <Route
                path={DASHBOARD_ROUTES.base.routes["course-dashboard"].href}
                element={
                    <LazyComponent>
                        <CourseDashboardPage />
                        <Title>
                            {GetLocale(locales["course-dashboard"], language)}
                        </Title>
                    </LazyComponent>
                }
            />
            <Route
                path={
                    DASHBOARD_ROUTES.base.routes["learning-track-dashboard"]
                        .href
                }
                element={
                    <LazyComponent>
                        <LearningTrackDashboardPage />
                        <Title>
                            {GetLocale(
                                locales["learning-track-dashboard"],
                                language
                            )}
                        </Title>
                    </LazyComponent>
                }
            />
            <Route
                path={
                    DASHBOARD_ROUTES.base.routes["math-equation-dashboard"].href
                }
                element={
                    <LazyComponent>
                        <MathEquationDashboardPage />
                        <Title>
                            {GetLocale(
                                locales["math-equation-dashboard"],
                                language
                            )}
                        </Title>
                    </LazyComponent>
                }
            />
        </Route>
    );
};
