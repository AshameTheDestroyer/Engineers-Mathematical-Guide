import { FC } from "react";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@components/Button/Button";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { Header as Header_ } from "@components/Header/Header";
import { LANDING_PAGE_ROUTES } from "@/routes/LandingPage.routes";
import { NavigationBar } from "@components/NavigationBar/NavigationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

import route_locales from "@localization/landing_page_routes.json";

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
            <ButtonBox>
                <Button
                    link="/registration/signup"
                    icon={{
                        placement: "left",
                        source: signup_icon,
                    }}
                >
                    Sign up
                </Button>
                <Button
                    variant="primary"
                    link="/registration/login"
                    icon={{
                        placement: "right",
                        source: login_icon,
                    }}
                >
                    Login
                </Button>
                <ConfigurationDropDownList variant="secondary" />
            </ButtonBox>
        </Header_>
    );
};
