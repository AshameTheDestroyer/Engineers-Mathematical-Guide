import { Route } from "react-router-dom";
import { TestRoute } from "./routes/test.routes";
import { LandingRoute } from "./routes/landing.routes";
import { ComposeRoutes } from "./functions/ComposeRoutes";
import { RegistrationRoute } from "./routes/registration.routes";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

export const Routes = [
    TestRoute,
    LandingRoute,
    RegistrationRoute,
    () => <Route path="*" element={<NotFoundPage />} />,
];

export const RootRoutes = ComposeRoutes(...Routes);
