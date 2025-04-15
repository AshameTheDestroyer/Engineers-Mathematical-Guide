import { FC } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Header as Header_ } from "@/components/Header/Header";
import { LANDING_PAGE_ROUTES } from "@/routes/TestPage.routes";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

import route_locales from "@localization/test_page_routes.json";

export const Header: FC = () => {
    const { GetLocaleOfRoutes, language } = useLocalization();

    return (
        <Header_
            className="bg-background-dark transition duration-200"
            isSticky
            onScroll={(direction, header) => {
                header.classList[direction == "up" ? "remove" : "add"](
                    "not-hover:not-focus-within:opacity-50"
                );
            }}
        >
            <Logo />
            <NavigationBar
                className="grow"
                routes={GetLocaleOfRoutes(
                    LANDING_PAGE_ROUTES,
                    route_locales,
                    language
                )}
            />
            <ConfigurationDropDownList variant="primary" />
        </Header_>
    );
};
