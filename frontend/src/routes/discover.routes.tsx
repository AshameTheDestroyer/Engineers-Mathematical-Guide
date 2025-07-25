import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

const CoursePage = LazyImport("./pages/DiscoverPage/pages/CoursePage");
const CoursesPage = LazyImport("./pages/DiscoverPage/pages/CoursesPage");
const DiscoverPage = LazyImport("./pages/DiscoverPage/DiscoverPage");
const LearningTrackPage = LazyImport(
    "./pages/DiscoverPage/pages/LearningTrackPage"
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
        },
    },
});

export const DiscoverRoute = () => {
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
