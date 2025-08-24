import { FC, lazy } from "react";
import { Route } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/routes.json";

const LoginPage = lazy(() =>
    import("../pages/RegistrationPage/pages/LoginPage").then((module) => ({
        default: module.LoginPage,
    }))
);
const SignupPage = lazy(() =>
    import("../pages/RegistrationPage/pages/SignupPage").then((module) => ({
        default: module.SignupPage,
    }))
);
const RegistrationPage = lazy(() =>
    import("../pages/RegistrationPage/RegistrationPage").then((module) => ({
        default: module.RegistrationPage,
    }))
);
const ForgotPasswordPage = lazy(() =>
    import("../pages/RegistrationPage/pages/ForgotPasswordPage").then(
        (module) => ({ default: module.ForgotPasswordPage })
    )
);
const TermsAndConditionsPage = lazy(() =>
    import("../pages/RegistrationPage/pages/TermsAndConditionsPage").then(
        (module) => ({ default: module.TermsAndConditionsPage })
    )
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
