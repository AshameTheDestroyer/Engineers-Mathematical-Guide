import { Outlet, Route } from "react-router-dom";
import { WEBSITE_ROUTES } from "./website.routes";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";

const ProfilePage = LazyImport("./pages/ProfilePage/ProfilePage");

export const PROFILE_ROUTES = BuildRouter({
    base: {
        href: "profile",
        routes: {
            home: { href: WEBSITE_ROUTES.base.routes.home.absolute },
            profile: { href: "" },
            application: { href: "/" },
        },
    },
});

export const ProfileRoute = () => {
    return (
        <Route path={PROFILE_ROUTES.base.href} element={<Outlet />}>
            <Route
                path={PROFILE_ROUTES.base.routes.profile.href}
                element={
                    <LazyPage>
                        <ProfilePage />
                    </LazyPage>
                }
            />
        </Route>
    );
};
