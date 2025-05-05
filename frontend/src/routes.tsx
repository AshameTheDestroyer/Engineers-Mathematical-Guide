import { Route } from "react-router-dom";
import { TestRoute } from "./routes/test.routes";
import { WebsiteRoute } from "./routes/website.routes";
import { ComposeRoutes } from "./functions/ComposeRoutes";
import { RegistrationRoute } from "./routes/registration.routes";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ApplicationRoute } from "./routes/application.routes";

export const Routes = [
    TestRoute,
    WebsiteRoute,
    ApplicationRoute,
    RegistrationRoute,
    () => <Route path="*" element={<NotFoundPage />} />,
];

export const RootRoutes = ComposeRoutes(...Routes);
