import { Route } from "react-router-dom";
import { TestRoute } from "./routes/test.routes";
import { WebsiteRoute } from "./routes/website.routes";
import { ProfileRoute } from "./routes/profile.routes";
import { ComposeRoutes } from "./functions/ComposeRoutes";
import { ApplicationRoute } from "./routes/application.routes";
import { RegistrationRoute } from "./routes/registration.routes";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

export const Routes = [
    TestRoute,
    WebsiteRoute,
    ProfileRoute,
    ApplicationRoute,
    RegistrationRoute,
    () => <Route path="*" element={<NotFoundPage />} />,
];

export const RootRoutes = ComposeRoutes(...Routes);
