import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { DASHBOARD_ROUTES } from "@/routes/dashboard.routes";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { OfflineModal } from "@/components/OfflineModal/OfflineModal";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";

export const DashboardPage: FC = () => {
    useScrollRestoration();
    useDefaultRoute(
        DASHBOARD_ROUTES.base.href,
        DASHBOARD_ROUTES.base.routes["user-dashboard"].href
    );

    return (
        <Page>
            <ApplicationBar
                routes={DASHBOARD_ROUTES.base.routes}
                baseRoute={DASHBOARD_ROUTES.base.absolute}
            />

            <Outlet />

            <DoubleCogIcon
                className="text-background-dark -left-page -bottom-1/10 fixed z-[-1]"
                size={400}
            />
            <CogIcon
                className="text-background-dark -right-page fixed top-0 z-[-1] translate-x-1/4 translate-y-2/3 [animation-direction:reverse]"
                size={250}
            />

            {EnvironmentVariables.ENVIRONMENT == "production" && (
                <OfflineModal />
            )}
        </Page>
    );
};
