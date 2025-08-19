import { FC } from "react";
import { useMain } from "@/contexts";
import { Outlet } from "react-router-dom";
import { Page } from "@components/Page/Page";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

import locales from "@localization/home_page.json";

export const WebsitePage: FC = () => {
    useScrollRestoration();

    const { myUser } = useMain();

    return (
        <Page className="overflow-x-clip">
            <ApplicationBar
                routes={WEBSITE_ROUTES.base.routes}
                baseRoute={WEBSITE_ROUTES.base.absolute}
                buttons={
                    myUser == null && (
                        <>
                            <Button
                                thickness="thin"
                                link={
                                    REGISTRATION_ROUTES.base.routes.signup
                                        .absolute
                                }
                                icon={{
                                    placement: "left",
                                    source: signup_icon,
                                }}
                            >
                                <Locale>{locales.buttons.signup}</Locale>
                            </Button>
                            <Button
                                variant="primary"
                                thickness="thin"
                                link={
                                    REGISTRATION_ROUTES.base.routes.login
                                        .absolute
                                }
                                icon={{
                                    placement: "right",
                                    source: login_icon,
                                }}
                            >
                                <Locale>{locales.buttons.login}</Locale>
                            </Button>
                        </>
                    )
                }
            />
            <Outlet />
        </Page>
    );
};
