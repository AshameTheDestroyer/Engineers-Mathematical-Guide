import { FC } from "react";
import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/routes.json";

const LoginPage = LazyImport("./pages/RegistrationPage/pages/LoginPage");
const SignupPage = LazyImport("./pages/RegistrationPage/pages/SignupPage");
const RegistrationPage = LazyImport(
    "./pages/RegistrationPage/RegistrationPage"
);
const ForgotPasswordPage = LazyImport(
    "./pages/RegistrationPage/pages/ForgotPasswordPage"
);
const TermsAndConditionsPage = LazyImport(
    "./pages/RegistrationPage/pages/TermsAndConditionsPage"
);

export const REGISTRATION_ROUTES = BuildRouter({
    base: {
        href: "registration",
        routes: {
            signup: { href: "signup" },
            login: { href: "login" },
            "forgot-password": { href: "forgot-password" },
            "terms-and-conditions": { href: "terms-and-conditions" },
        },
    },
});

export const RegistrationRoute: FC = () => {
    const { language, GetLocale } = useLocalization();

    return (
        <Route
            path={REGISTRATION_ROUTES.base.href}
            element={
                <LazyPage>
                    <RegistrationPage />
                </LazyPage>
            }
        >
            <Route
                path={REGISTRATION_ROUTES.base.routes.signup.href}
                element={
                    <LazyComponent>
                        <SignupPage />
                        <Title>{GetLocale(locales.signup, language)}</Title>
                    </LazyComponent>
                }
            />
            <Route
                path={REGISTRATION_ROUTES.base.routes.login.href}
                element={
                    <LazyComponent>
                        <LoginPage />
                        <Title>{GetLocale(locales.login, language)}</Title>
                    </LazyComponent>
                }
            />
            <Route
                path={REGISTRATION_ROUTES.base.routes["forgot-password"].href}
                element={
                    <LazyComponent>
                        <ForgotPasswordPage />
                        <Title>
                            {GetLocale(locales["forgot-password"], language)}
                        </Title>
                    </LazyComponent>
                }
            />
            <Route
                path={
                    REGISTRATION_ROUTES.base.routes["terms-and-conditions"].href
                }
                element={
                    <LazyComponent>
                        <TermsAndConditionsPage />
                        <Title>
                            {GetLocale(
                                locales["terms-and-conditions"],
                                language
                            )}
                        </Title>
                    </LazyComponent>
                }
            />
        </Route>
    );
};
