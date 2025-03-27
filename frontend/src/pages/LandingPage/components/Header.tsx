import { FC } from "react";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@components/Button/Button";
import { HEADER_ROUTES } from "@constants/HeaderRoutes";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { NavigationBar } from "@components/NavigationBar/NavigationBar";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

export const Header: FC = () => {
    return (
        <header className="-m-page mb-page px-page bg-background-normal sticky top-0 z-10 flex flex-row place-items-center justify-between gap-8 py-[calc(var(--spacing-page)/2)]">
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
        </header>
    );
};
