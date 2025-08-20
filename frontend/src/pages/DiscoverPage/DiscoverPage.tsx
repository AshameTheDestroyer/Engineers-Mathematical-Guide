import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { ExaminationModal } from "./components/ExaminationModal";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { OfflineModal } from "@/components/OfflineModal/OfflineModal";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";

import route_locales from "@localization/discover_page_routes.json";

export const DiscoverPage: FC = () => {
    useScrollRestoration();
    useDefaultRoute(
        DISCOVER_ROUTES.base.href,
        DISCOVER_ROUTES.base.routes.courses.href
    );

    return (
        <Page>
            <ApplicationBar
                routeLocales={route_locales}
                baseRoute={DISCOVER_ROUTES.base.absolute}
                routes={Object.omit(
                    DISCOVER_ROUTES.base.routes,
                    "modules",
                    "lessonID",
                    "moduleID",
                    "courseID",
                    "mathEquationID",
                    "learningTrackID",
                    "learningTrackIDCourses"
                )}
            />
            <Outlet />
            {EnvironmentVariables.ENVIRONMENT == "production" && (
                <>
                    <OfflineModal />
                    <ExaminationModal />
                </>
            )}
        </Page>
    );
};
