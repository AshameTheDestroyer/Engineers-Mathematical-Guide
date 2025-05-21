import { Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";

const TestPage = LazyImport("./pages/TestPage/TestPage");
const ColoursPage = LazyImport("./pages/TestPage/pages/ColoursPage");
const PalettesPage = LazyImport("./pages/TestPage/pages/PalettesPage");
const TypographyPage = LazyImport("./pages/TestPage/pages/TypographyPage");
const ComponentsPage = LazyImport("./pages/TestPage/pages/ComponentsPage");

const TEST_ROUTES_ = BuildRouter({
    base: {
        href: "test",
        routes: {
            colours: { href: "colours" },
            typography: { href: "typography" },
            components: { href: "components" },
            palettes: { href: "palettes" },
        },
    },
});

export const TEST_ROUTES =
    EnvironmentVariables.ENVIRONMENT == "development"
        ? TEST_ROUTES_
        : undefined;

export const TestRoute = () => {
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
                    </LazyComponent>
                }
            />
            <Route
                path={TEST_ROUTES.base.routes.typography.href}
                element={
                    <LazyComponent>
                        <TypographyPage />
                    </LazyComponent>
                }
            />
            <Route
                path={TEST_ROUTES.base.routes.components.href}
                element={
                    <LazyComponent>
                        <ComponentsPage />
                    </LazyComponent>
                }
            />
            <Route
                path={TEST_ROUTES.base.routes.palettes.href}
                element={
                    <LazyComponent>
                        <PalettesPage />
                    </LazyComponent>
                }
            />
        </Route>
    );
};
