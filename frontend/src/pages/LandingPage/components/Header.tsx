import { FC } from "react";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@components/Button/Button";
import { HEADER_ROUTES } from "@constants/HeaderRoutes";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { Header as Header_ } from "@components/Header/Header";
import { NavigationBar } from "@components/NavigationBar/NavigationBar";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

export const Header: FC = () => {
    return (
        <Header_ className="bg-background-normal">
            <Logo />
            <NavigationBar routes={HEADER_ROUTES} className="grow" />
            <ButtonBox>
                <Button
                    link="/registration/signup"
                    icon={{
                        width: 24,
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
                        width: 24,
                        placement: "right",
                        source: login_icon,
                    }}
                >
                    Login
                </Button>
            </ButtonBox>
        </Header_>
    );
};
