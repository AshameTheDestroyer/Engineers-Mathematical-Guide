import { FC, lazy } from "react";
import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/routes.json";

const TestPage = lazy(() =>
    import("../pages/TestPage/TestPage").then((module) => ({
        default: module.TestPage,
    }))
);
const ColoursPage = lazy(() =>
    import("../pages/TestPage/pages/ColoursPage").then((module) => ({
        default: module.ColoursPage,
    }))
);
const PalettesPage = lazy(() =>
    import("../pages/TestPage/pages/PalettesPage").then((module) => ({
        default: module.PalettesPage,
    }))
);
const TypographyPage = lazy(() =>
    import("../pages/TestPage/pages/TypographyPage").then((module) => ({
        default: module.TypographyPage,
    }))
);
const ComponentsPage = lazy(() =>
    import("../pages/TestPage/pages/ComponentsPage").then((module) => ({
        default: module.ComponentsPage,
    }))
);

export const TEST_ROUTES = BuildRouter({
    base: {
        href: "test",
        renderingPredicate: () =>
            EnvironmentVariables.ENVIRONMENT == "development",
        routes: {
            home: { href: "/website" },
            colours: { href: "colours" },
            typography: { href: "typography" },
            components: { href: "components" },
            palettes: { href: "palettes" },
        },
    },
});

export const TestRoute: FC = () => {
    const { language, GetLocale } = useLocalization();

    if (TEST_ROUTES == null) {
        return <></>;
    }

    return (
        <Route
            path={TEST_ROUTES.base.href}
            element={
                <LazyPage>
                    <TestPage />
                </LazyPage>
            }
        >
            <Route
                path={TEST_ROUTES.base.routes.colours.href}
                element={
                    <LazyComponent>
                        <ColoursPage />
                        <Title>{GetLocale(locales.colours, language)}</Title>
                    </LazyComponent>
                }
            />
            <Route
                path={TEST_ROUTES.base.routes.typography.href}
                element={
                    <LazyComponent>
                        <TypographyPage />
                        <Title>{GetLocale(locales.typography, language)}</Title>
                    </LazyComponent>
                }
            />
            <Route
                path={TEST_ROUTES.base.routes.components.href}
                element={
                    <LazyComponent>
                        <ComponentsPage />
                        <Title>{GetLocale(locales.components, language)}</Title>
                    </LazyComponent>
                }
            />
            <Route
                path={TEST_ROUTES.base.routes.palettes.href}
                element={
                    <LazyComponent>
                        <PalettesPage />
                        <Title>{GetLocale(locales.palettes, language)}</Title>
                    </LazyComponent>
                }
            />
        </Route>
    );
};
