import { FC } from "react";
import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/routes.json";

const TestPage = LazyImport("./pages/TestPage/TestPage");
const ColoursPage = LazyImport("./pages/TestPage/pages/ColoursPage");
const PalettesPage = LazyImport("./pages/TestPage/pages/PalettesPage");
const TypographyPage = LazyImport("./pages/TestPage/pages/TypographyPage");
const ComponentsPage = LazyImport("./pages/TestPage/pages/ComponentsPage");

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
