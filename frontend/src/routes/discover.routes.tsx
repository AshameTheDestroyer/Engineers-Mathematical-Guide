import { FC, lazy } from "react";
import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/routes.json";

const DiscoverPage = lazy(() =>
    import("../pages/DiscoverPage/DiscoverPage").then((module) => ({
        default: module.DiscoverPage,
    }))
);
const ModulePage = lazy(() =>
    import("../pages/DiscoverPage/pages/ModulePage").then((module) => ({
        default: module.ModulePage,
    }))
);
const LessonPage = lazy(() =>
    import("../pages/DiscoverPage/pages/LessonPage").then((module) => ({
        default: module.LessonPage,
    }))
);
const CoursePage = lazy(() =>
    import("../pages/DiscoverPage/pages/CoursePage").then((module) => ({
        default: module.CoursePage,
    }))
);
const ModulesPage = lazy(() =>
    import("../pages/DiscoverPage/pages/ModulesPage").then((module) => ({
        default: module.ModulesPage,
    }))
);
const CoursesPage = lazy(() =>
    import("../pages/DiscoverPage/pages/CoursesPage").then((module) => ({
        default: module.CoursesPage,
    }))
);
const MathEquationPage = lazy(() =>
    import("../pages/DiscoverPage/pages/MathEquationPage").then((module) => ({
        default: module.MathEquationPage,
    }))
);
const MathEquationsPage = lazy(() =>
    import("../pages/DiscoverPage/pages/MathEquationsPage").then((module) => ({
        default: module.MathEquationsPage,
    }))
);
const LearningTrackPage = lazy(() =>
    import("../pages/DiscoverPage/pages/LearningTrackPage").then((module) => ({
        default: module.LearningTrackPage,
    }))
);
const LearningTracksPage = lazy(() =>
    import("../pages/DiscoverPage/pages/LearningTracksPage").then((module) => ({
        default: module.LearningTracksPage,
    }))
);
const LearningTrackCoursesPage = lazy(() =>
    import("../pages/DiscoverPage/pages/LearningTrackCoursesPage").then(
        (module) => ({ default: module.LearningTrackCoursesPage })
    )
);

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
                        <Title>{GetLocale(locales.courses, language)}</Title>
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
                            {GetLocale(locales["learning-tracks"], language)}
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
                            {GetLocale(locales["math-equations"], language)}
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
