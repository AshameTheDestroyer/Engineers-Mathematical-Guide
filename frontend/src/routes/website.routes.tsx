import { FC } from "react";
import { Route } from "react-router-dom";
import { RoleEnum } from "@/schemas/UserSchema";
import { Title } from "@/components/Title/Title";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/routes.json";

const WebsitePage = LazyImport("./pages/WebsitePage/WebsitePage");
const HomePage = LazyImport("./pages/WebsitePage/pages/HomePage");
const HelpPage = LazyImport("./pages/WebsitePage/pages/HelpPage");
const AboutPage = LazyImport("./pages/WebsitePage/pages/AboutPage");
const ContactUsPage = LazyImport("./pages/WebsitePage/pages/ContactUsPage");
const ReferencesPage = LazyImport("./pages/WebsitePage/pages/ReferencesPage");
const TestimonialPage = LazyImport("./pages/WebsitePage/pages/TestimonialPage");

export const WEBSITE_ROUTES = BuildRouter({
    base: {
        href: "website",
        routes: {
            home: { href: "" },
            about: { href: "about" },
            "contact-us": { href: "contact-us" },
            references: { href: "references" },
            testimonial: { href: "testimonial" },
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
                path={WEBSITE_ROUTES.base.routes.testimonial.href}
                element={
                    <LazyComponent>
                        <TestimonialPage />
                        <Title>
                            {GetLocale(locales.testimonial, language)}
                        </Title>
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
