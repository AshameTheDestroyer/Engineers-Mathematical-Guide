import { Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { RoutesWithAbsolutePaths } from "@/functions/RoutesWithAbsolutePath";

const CoursePage = LazyImport("./pages/ApplicationPage/pages/CoursePage");
const CoursesPage = LazyImport("./pages/ApplicationPage/pages/CoursesPage");
const ApplicationPage = LazyImport("./pages/ApplicationPage/ApplicationPage");

export const APPLICATION_ROUTES = RoutesWithAbsolutePaths({
    base: {
        href: "/",
        routes: {
            courses: { href: "courses" },
            courseID: { href: ":courseID" },
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
                path={APPLICATION_ROUTES.base.routes.courses.href}
                element={
                    <LazyComponent>
                        <CoursesPage />
                    </LazyComponent>
                }
            />
            <Route
                path={APPLICATION_ROUTES.base.routes.courseID.href}
                element={
                    <LazyComponent>
                        <CoursePage />
                    </LazyComponent>
                }
            />
        </Route>
    );
};
