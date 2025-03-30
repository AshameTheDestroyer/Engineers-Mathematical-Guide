import { FC } from "react";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@components/Button/Button";
import { LANDING_PAGE_ROUTES } from "@/routes/LandingPage.routes";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { Header as Header_ } from "@components/Header/Header";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { NavigationBar } from "@components/NavigationBar/NavigationBar";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

export const Header: FC = () => {
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
            <NavigationBar className="grow" routes={LANDING_PAGE_ROUTES} />
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
                <ThemeToggle />
            </ButtonBox>
        </Header_>
    );
};
