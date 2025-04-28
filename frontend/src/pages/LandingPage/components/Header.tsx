import { FC } from "react";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { LANDING_ROUTES } from "@/routes/landing.routes";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { Header as Header_ } from "@components/Header/Header";
import { NavigationBar } from "@components/NavigationBar/NavigationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

import locales from "@localization/landing_page.json";
import route_locales from "@localization/landing_page_routes.json";

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
            <Logo />
            <NavigationBar
                className="grow"
                routes={GetRouteLocales(
                    LANDING_ROUTES,
                    route_locales,
                    language
                )}
            />
            <ButtonBox>
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
                <ConfigurationDropDownList variant="secondary" />
            </ButtonBox>
        </Header_>
    );
};
