import { FC } from "react";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { Header as Header_ } from "@components/Header/Header";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { NavigationMenuButton } from "@/components/Drawer/components/NavigationMenuButton";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

import locales from "@localization/website_page.json";
import route_locales from "@localization/website_page_routes.json";

export const Header: FC = () => {
    const { GetRouteLocales, language } = useLocalization();

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
            <Logo className="h-10" />
            <ButtonBox className="place-items-center">
                <Button
                    link="/registration/signup"
                    icon={{
                        placement: "left",
                        source: signup_icon,
                    }}
                >
                    <Locale>{locales.buttons.signup}</Locale>
                </Button>
                <Button
                    variant="primary"
                    link="/registration/login"
                    icon={{
                        placement: "right",
                        source: login_icon,
                    }}
                >
                    <Locale>{locales.buttons.login}</Locale>
                </Button>
                <NavigationMenuButton
                    thickness="thin"
                    routes={GetRouteLocales(
                        WEBSITE_ROUTES.base.routes,
                        route_locales,
                        language
                    )}
                />
                <ConfigurationDropDownList
                    thickness="thin"
                    variant="secondary"
                />
            </ButtonBox>
        </Header_>
    );
};
