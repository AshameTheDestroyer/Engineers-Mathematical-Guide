import { FC } from "react";
import { Page } from "@components/Page/Page";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { MainContent } from "./components/MainContent";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

import locales from "@localization/website_page.json";
import route_locales from "@localization/website_page_routes.json";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";

export const WebsitePage: FC = () => {
    return (
        <Page className="overflow-x-clip">
            <ApplicationBar
                routeLocales={route_locales}
                routes={WEBSITE_ROUTES.base.routes}
                buttons={
                    <>
                        <Button
                            thickness="thin"
                            link={
                                REGISTRATION_ROUTES.base.routes.signup.absolute
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
                                REGISTRATION_ROUTES.base.routes.login.absolute
                            }
                            icon={{
                                placement: "right",
                                source: login_icon,
                            }}
                        >
                            <Locale>{locales.buttons.login}</Locale>
                        </Button>
                    </>
                }
            />
            <MainContent />
        </Page>
    );
};
