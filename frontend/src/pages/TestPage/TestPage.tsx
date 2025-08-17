import { FC } from "react";
import { Page } from "@/components/Page/Page";
import { TEST_ROUTES } from "@/routes/test.routes";
import { Navigate, Outlet } from "react-router-dom";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";

export const TestPage: FC = () => {
    if (!TEST_ROUTES.base.renderingPredicate()) {
        return <Navigate to={APPLICATION_ROUTES.base.absolute} />;
    }

    useScrollRestoration();
    useDefaultRoute(
        TEST_ROUTES.base.href,
        TEST_ROUTES.base.routes.colours.href
    );

    return (
        <Page>
            <ApplicationBar
                routes={TEST_ROUTES.base.routes}
                baseRoute={TEST_ROUTES.base.absolute}
            />
            <Outlet />
        </Page>
    );
};
