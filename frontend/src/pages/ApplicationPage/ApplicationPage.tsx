import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { OfflineModal } from "@/components/OfflineModal/OfflineModal";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";
import { ExaminationResultModal } from "../DiscoverPage/components/ExaminationResultModal";
import { ExaminationDisclaimerModal } from "../DiscoverPage/components/ExaminationDisclaimerModal";

export const ApplicationPage: FC = () => {
    useScrollRestoration();
    useDefaultRoute(
        APPLICATION_ROUTES.base.href,
        APPLICATION_ROUTES.base.routes.profile.href
    );

    return (
        <Page>
            <ApplicationBar
                baseRoute={APPLICATION_ROUTES.base.absolute}
                routes={Object.omit(
                    APPLICATION_ROUTES.base.routes,
                    "profileID"
                )}
            />
            <Outlet />
            {EnvironmentVariables.ENVIRONMENT == "production" && (
                <>
                    <OfflineModal />
                    <ExaminationDisclaimerModal />
                </>
            )}
            <ExaminationResultModal />
        </Page>
    );
};
