import { Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";

const ProfilePage = LazyImport("./pages/ApplicationPage/pages/ProfilePage");
const ApplicationPage = LazyImport("./pages/ApplicationPage/ApplicationPage");

export const APPLICATION_ROUTES = BuildRouter({
    base: {
        href: "/",
        routes: {
            home: { href: "/website" },
            profile: { href: "profile" },
            profileID: { href: "profile/:profileID", isVariable: true },
            discover: { href: "/discover" },
        },
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
