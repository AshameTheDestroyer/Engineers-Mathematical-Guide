import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { WEBSITE_ROUTES } from "./website.routes";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

const CoursePage = LazyImport("./pages/ApplicationPage/pages/CoursePage");
const CoursesPage = LazyImport("./pages/ApplicationPage/pages/CoursesPage");
const ApplicationPage = LazyImport("./pages/ApplicationPage/ApplicationPage");
const LearningTrackPage = LazyImport(
    "./pages/ApplicationPage/pages/LearningTrackPage"
);
const LearningTracksPage = LazyImport(
    "./pages/ApplicationPage/pages/LearningTracksPage"
);
const MathEquationPage = LazyImport(
    "./pages/ApplicationPage/pages/MathEquationPage"
);
const MathEquationsPage = LazyImport(
    "./pages/ApplicationPage/pages/MathEquationsPage"
);

import route_locales from "@localization/application_page_routes.json";

export const APPLICATION_ROUTES = BuildRouter({
    base: {
        href: "/",
        routes: {
            home: { href: WEBSITE_ROUTES.base.routes.home.absolute },
            courses: { href: "courses" },
            "learning-tracks": { href: "learning-tracks" },
            "math-equations": { href: "math-equations" },
            courseID: {
                isVariable: true,
                href: "courses/:courseID",
            },
            learningTrackID: {
                isVariable: true,
                href: "learning-tracks/:learningTrackID",
            },
            mathEquationID: {
                isVariable: true,
                href: "math-equations/:mathEquationID",
            },
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
                        <Title>
                            {GetLocale(
                                route_locales["learning-tracks"],
                                language
                            )}
                        </Title>
                    </LazyComponent>
                }
            />
            <Route
                path={APPLICATION_ROUTES.base.routes.learningTrackID.href}
                element={
                    <LazyComponent>
                        <LearningTrackPage />
                    </LazyComponent>
                }
            />
            <Route
                path={APPLICATION_ROUTES.base.routes["math-equations"].href}
                element={
                    <LazyComponent>
                        <MathEquationsPage />
                        <Title>
                            {GetLocale(
                                route_locales["math-equations"],
                                language
                            )}
                        </Title>
                    </LazyComponent>
                }
            />
            <Route
                path={APPLICATION_ROUTES.base.routes.mathEquationID.href}
                element={
                    <LazyComponent>
                        <MathEquationPage />
                    </LazyComponent>
                }
            />
        </Route>
    );
};
