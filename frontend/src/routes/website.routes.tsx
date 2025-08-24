import { FC, lazy } from "react";
import { Route } from "react-router-dom";
import { RoleEnum } from "@/schemas/UserSchema";
import { Title } from "@/components/Title/Title";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/routes.json";

const HomePage = lazy(() =>
    import("../pages/WebsitePage/pages/HomePage").then((module) => ({
        default: module.HomePage,
    }))
);
const HelpPage = lazy(() =>
    import("../pages/WebsitePage/pages/HelpPage").then((module) => ({
        default: module.HelpPage,
    }))
);
const WebsitePage = lazy(() =>
    import("../pages/WebsitePage/WebsitePage").then((module) => ({
        default: module.WebsitePage,
    }))
);
const AboutPage = lazy(() =>
    import("../pages/WebsitePage/pages/AboutPage").then((module) => ({
        default: module.AboutPage,
    }))
);
const ContactUsPage = lazy(() =>
    import("../pages/WebsitePage/pages/ContactUsPage").then((module) => ({
        default: module.ContactUsPage,
    }))
);
const ReferencesPage = lazy(() =>
    import("../pages/WebsitePage/pages/ReferencesPage").then((module) => ({
        default: module.ReferencesPage,
    }))
);

export const WEBSITE_ROUTES = BuildRouter({
    base: {
        href: "website",
        routes: {
            home: { href: "" },
            about: { href: "about" },
            "contact-us": { href: "contact-us" },
            references: { href: "references" },
            help: { href: "help" },
            discover: { href: "/discover" },
            application: { href: "/" },
            dashboard: {
                href: "/dashboard",
                renderingPredicate: (myUser) => myUser?.role == RoleEnum.admin,
            },
            test: {
                text: "TEST",
                href: "/test",
                renderingPredicate: () =>
                    EnvironmentVariables.ENVIRONMENT == "development",
            },
        },
    },
});

export const WebsiteRoute: FC = () => {
    const { language, GetLocale } = useLocalization();

    return (
        <Route
            path={WEBSITE_ROUTES.base.href}
            element={
                <LazyPage>
                    <WebsitePage />
                </LazyPage>
            }
        >
            <Route
                path={WEBSITE_ROUTES.base.routes.home.href}
                element={
                    <LazyComponent>
                        <HomePage />
                    </LazyComponent>
                }
            />
            <Route
                path={WEBSITE_ROUTES.base.routes.about.href}
                element={
                    <LazyComponent>
                        <AboutPage />
                        <Title>{GetLocale(locales.about, language)}</Title>
                    </LazyComponent>
                }
            />
            <Route
                path={WEBSITE_ROUTES.base.routes["contact-us"].href}
                element={
                    <LazyComponent>
                        <ContactUsPage />
                        <Title>
                            {GetLocale(locales["contact-us"], language)}
                        </Title>
                    </LazyComponent>
                }
            />
            <Route
                path={WEBSITE_ROUTES.base.routes.references.href}
                element={
                    <LazyComponent>
                        <ReferencesPage />
                        <Title>{GetLocale(locales.references, language)}</Title>
                    </LazyComponent>
                }
            />
            <Route
                path={WEBSITE_ROUTES.base.routes.help.href}
                element={
                    <LazyComponent>
                        <HelpPage />
                        <Title>{GetLocale(locales.help, language)}</Title>
                    </LazyComponent>
                }
            />
        </Route>
    );
};
