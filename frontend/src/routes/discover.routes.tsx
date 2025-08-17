import { FC } from "react";
import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

const DiscoverPage = LazyImport("./pages/DiscoverPage/DiscoverPage");
const ModulePage = LazyImport("./pages/DiscoverPage/pages/ModulePage");
const LessonPage = LazyImport("./pages/DiscoverPage/pages/LessonPage");
const CoursePage = LazyImport("./pages/DiscoverPage/pages/CoursePage");
const ModulesPage = LazyImport("./pages/DiscoverPage/pages/ModulesPage");
const CoursesPage = LazyImport("./pages/DiscoverPage/pages/CoursesPage");
const LearningTrackPage = LazyImport(
    "./pages/DiscoverPage/pages/LearningTrackPage"
);
const LearningTrackCoursesPage = LazyImport(
    "./pages/DiscoverPage/pages/LearningTrackCoursesPage"
);
const LearningTracksPage = LazyImport(
    "./pages/DiscoverPage/pages/LearningTracksPage"
);
const MathEquationPage = LazyImport(
    "./pages/DiscoverPage/pages/MathEquationPage"
);
const MathEquationsPage = LazyImport(
    "./pages/DiscoverPage/pages/MathEquationsPage"
);

import route_locales from "@localization/discover_page_routes.json";

export const DISCOVER_ROUTES = BuildRouter({
    base: {
        href: "/discover",
        routes: {
            home: { href: "/website" },
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
            modules: {
                isVariable: true,
                variables: ["courseID"] as const,
                href: "courses/:courseID/modules",
            },
            moduleID: {
                isVariable: true,
                href: "courses/:courseID/modules/:moduleID",
                variables: ["courseID", "moduleID"] as const,
            },
            learningTrackIDCourses: {
                isVariable: true,
                variables: ["learningTrackID"] as const,
                href: "learning-tracks/:learningTrackID/courses",
            },
            lessonID: {
                isVariable: true,
                href: "courses/:courseID/modules/:moduleID/:lessonID",
                variables: ["courseID", "moduleID", "lessonID"] as const,
            },
            application: { href: "/" },
        },
    },
});

export const DiscoverRoute: FC = () => {
    const { language, GetLocale } = useLocalization();

    return (
        <Route
            path={DISCOVER_ROUTES.base.href}
            element={
                <LazyPage>
                    <DiscoverPage />
                </LazyPage>
            }
        >
            <Route
                path={DISCOVER_ROUTES.base.routes.courses.href}
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
                path={DISCOVER_ROUTES.base.routes.courseID.href}
                element={
                    <LazyComponent>
                        <CoursePage />
                    </LazyComponent>
                }
            />
            <Route
                path={DISCOVER_ROUTES.base.routes.modules.href}
                element={
                    <LazyComponent>
                        <ModulesPage />
                    </LazyComponent>
                }
            />
            <Route
                path={DISCOVER_ROUTES.base.routes.moduleID.href}
                element={
                    <LazyComponent>
                        <ModulePage />
                    </LazyComponent>
                }
            />
            <Route
                path={DISCOVER_ROUTES.base.routes.lessonID.href}
                element={
                    <LazyComponent>
                        <LessonPage />
                    </LazyComponent>
                }
            />
            <Route
                path={DISCOVER_ROUTES.base.routes["learning-tracks"].href}
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
                path={DISCOVER_ROUTES.base.routes.learningTrackID.href}
                element={
                    <LazyComponent>
                        <LearningTrackPage />
                    </LazyComponent>
                }
            />
            <Route
                path={DISCOVER_ROUTES.base.routes.learningTrackIDCourses.href}
                element={
                    <LazyComponent>
                        <LearningTrackCoursesPage />
                    </LazyComponent>
                }
            />
            <Route
                path={DISCOVER_ROUTES.base.routes["math-equations"].href}
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
                path={DISCOVER_ROUTES.base.routes.mathEquationID.href}
                element={
                    <LazyComponent>
                        <MathEquationPage />
                    </LazyComponent>
                }
            />
        </Route>
    );
};
