import { FC } from "react";
import { Page } from "@/components/Page/Page";
import { PROFILE_ROUTES } from "@/routes/profile.routes";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { ProfileMainContent } from "./components/ProfileMainContent";
import { OfflineModal } from "@/components/OfflineModal/OfflineModal";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";

import route_locales from "@localization/profile_page_routes.json";

export const ProfilePage: FC = () => {
    useScrollRestoration();

    return (
        <Page>
            <ApplicationBar
                routeLocales={route_locales}
                routes={PROFILE_ROUTES.base.routes}
                baseRoute={PROFILE_ROUTES.base.absolute}
            />
            <ProfileMainContent />
            {EnvironmentVariables.ENVIRONMENT == "production" && (
                <OfflineModal />
            )}
        </Page>
    );
};
