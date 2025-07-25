import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { TEST_ROUTES } from "@/routes/test.routes";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";

import route_locales from "@localization/test_page_routes.json";

export const TestPage: FC = () => {
    if (TEST_ROUTES == null) {
        return <></>;
    }

    useScrollRestoration();
    useDefaultRoute(
        TEST_ROUTES.base.href,
        TEST_ROUTES.base.routes.colours.href
    );

    return (
        <Page>
            {TEST_ROUTES.base.absolute != null && (
                <ApplicationBar
                    routeLocales={route_locales}
                    routes={TEST_ROUTES.base.routes}
                    baseRoute={TEST_ROUTES.base.absolute}
                />
            )}
            <Outlet />
        </Page>
    );
};
