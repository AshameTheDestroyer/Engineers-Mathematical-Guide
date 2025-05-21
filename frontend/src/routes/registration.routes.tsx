import { Route } from "react-router-dom";
import { LazyImport } from "@/components/Lazy/Lazy";
import { BuildRouter } from "@/functions/BuildRouter";
import { LazyPage } from "@/components/Lazy/components/LazyPage";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";

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

export const RegistrationRoute = () => {
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
                    </LazyComponent>
                }
            />
            <Route
                path={REGISTRATION_ROUTES.base.routes.login.href}
                element={
                    <LazyComponent>
                        <LoginPage />
                    </LazyComponent>
                }
            />
            <Route
                path={REGISTRATION_ROUTES.base.routes["forgot-password"].href}
                element={
                    <LazyComponent>
                        <ForgotPasswordPage />
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
                    </LazyComponent>
                }
            />
        </Route>
    );
};
