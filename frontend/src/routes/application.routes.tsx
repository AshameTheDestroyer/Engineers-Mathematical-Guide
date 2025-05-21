import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";

const CoursePage = LazyImport("./pages/ApplicationPage/pages/CoursePage");
const CoursesPage = LazyImport("./pages/ApplicationPage/pages/CoursesPage");
const ApplicationPage = LazyImport("./pages/ApplicationPage/ApplicationPage");
const LearningTracksPage = LazyImport(
    "./pages/ApplicationPage/pages/LearningTracksPage"
);

export const APPLICATION_ROUTES = BuildRouter({
    base: {
        href: "/",
        routes: {
            courses: { href: "courses" },
            courseID: { href: "courses/:courseID" },
            "learning-tracks": { href: "learning-tracks" },
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
                        <Title>
                            {APPLICATION_ROUTES.base.routes.courses.title}
                        </Title>
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
            <Route
                path={APPLICATION_ROUTES.base.routes["learning-tracks"].href}
                element={
                    <LazyComponent>
                        <LearningTracksPage />
                    </LazyComponent>
                }
            />
        </Route>
    );
};
