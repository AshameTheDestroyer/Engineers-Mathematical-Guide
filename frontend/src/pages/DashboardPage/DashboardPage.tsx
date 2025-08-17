import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { DASHBOARD_ROUTES } from "@/routes/dashboard.routes";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { OfflineModal } from "@/components/OfflineModal/OfflineModal";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";

export const DashboardPage: FC = () => {
    useScrollRestoration();
    useDefaultRoute(
        DASHBOARD_ROUTES.base.href,
        DASHBOARD_ROUTES.base.routes["dashboard-users"].href
    );

    return (
        <Page>
            <ApplicationBar
                routes={DASHBOARD_ROUTES.base.routes}
                baseRoute={DASHBOARD_ROUTES.base.absolute}
            />
            <Outlet />
            {EnvironmentVariables.ENVIRONMENT == "production" && (
                <OfflineModal />
            )}
        </Page>
    );
};
