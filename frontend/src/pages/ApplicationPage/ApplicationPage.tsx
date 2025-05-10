import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

export const ApplicationPage: FC = () => {
    useDefaultRoute(
        APPLICATION_ROUTES.base.href,
        APPLICATION_ROUTES.base.routes.courses.href
    );

    const { direction } = useLocalization();

    return (
        <Page>
            <ConfigurationDropDownList
                className={twJoin(
                    direction == "ltr" ? "right-page" : "left-page",
                    "top-page absolute z-10"
                )}
            />
            <Outlet />
        </Page>
    );
};
