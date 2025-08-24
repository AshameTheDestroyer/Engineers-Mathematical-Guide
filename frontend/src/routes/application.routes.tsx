import { FC, lazy } from "react";
import { Route } from "react-router-dom";
import { RoleEnum } from "@/schemas/UserSchema";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";

const ProfilePage = lazy(() =>
    import("../pages/ApplicationPage/pages/ProfilePage").then((module) => ({
        default: module.ProfilePage,
    }))
);
const ApplicationPage = lazy(() =>
    import("../pages/ApplicationPage/ApplicationPage").then((module) => ({
        default: module.ApplicationPage,
    }))
);

export const APPLICATION_ROUTES = BuildRouter({
    base: {
        href: "/",
        routes: {
            home: { href: "/website" },
            profile: { href: "profile" },
            profileID: { href: "profile/:profileID", isVariable: true },
            discover: { href: "/discover" },
            dashboard: {
                href: "/dashboard",
                renderingPredicate: (myUser) => myUser?.role == RoleEnum.admin,
            },
        },
    },
});

export const ApplicationRoute: FC = () => {
    return (
        <Route
            path={APPLICATION_ROUTES.base.href}
            element={
                <LazyPage>
                    <ApplicationPage />
                </LazyPage>
            }
        >
            <Route
                path={APPLICATION_ROUTES.base.routes.profile.href}
                element={
                    <LazyComponent>
                        <ProfilePage />
                    </LazyComponent>
                }
            />
            <Route
                path={APPLICATION_ROUTES.base.routes.profileID.href}
                element={
                    <LazyComponent>
                        <ProfilePage />
                    </LazyComponent>
                }
            />
        </Route>
    );
};
