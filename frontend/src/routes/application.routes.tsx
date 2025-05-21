import { Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { Title } from "@/components/Title/Title";

const CoursePage = LazyImport("./pages/ApplicationPage/pages/CoursePage");
const CoursesPage = LazyImport("./pages/ApplicationPage/pages/CoursesPage");
const ApplicationPage = LazyImport("./pages/ApplicationPage/ApplicationPage");
const LearningTracksPage = LazyImport(
    "./pages/ApplicationPage/pages/LearningTracksPage"
);

import route_locales from "@localization/application_page_routes.json";

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
    const { language, GetLocale } = useLocalization();

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
                            {GetLocale(route_locales.courses, language)}
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
