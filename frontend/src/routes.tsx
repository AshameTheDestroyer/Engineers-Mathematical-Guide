import { Route } from "react-router-dom";
import { TestRoute } from "./routes/test.routes";
import { WebsiteRoute } from "./routes/website.routes";
import { ApplicationRoute } from "./routes/application.routes";
import { ComposeRoutes } from "./functions/ComposeRoutes";
import { DiscoverRoute } from "./routes/discover.routes";
import { RegistrationRoute } from "./routes/registration.routes";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

export const Routes = [
    TestRoute,
    WebsiteRoute,
    ApplicationRoute,
    DiscoverRoute,
    RegistrationRoute,
    () => <Route path="*" element={<NotFoundPage />} />,
];

export const RootRoutes = ComposeRoutes(...Routes);
