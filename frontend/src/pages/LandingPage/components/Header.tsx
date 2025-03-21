import { FC } from "react";
import { LINKS } from "../../../constants/links";
import { Logo } from "../../../components/Logo/Logo";
import { Button } from "../../../components/Button/Button";
import { NavigationBar } from "../../../components/NavigationBar/NavigationBar";

import login_icon from "../../../assets/icons/login.svg";
import signup_icon from "../../../assets/icons/user.svg";

export const Header: FC = () => {
    return (
        <div className="-m-page mb-page p-page bg-foreground-normal flex flex-row place-items-center justify-between gap-8 text-white [&>nav]:grow">
            <Logo />
            <NavigationBar links={LINKS} />
            <div className="flex gap-4">
                <Button
                    link="/registration/signup"
                    icon={{
                        width: 24,
                        placement: "left",
                        source: signup_icon,
                        alternative: "Sign up Icon.",
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
                        alternative: "Login Icon.",
                    }}
                >
                    Login
                </Button>
            </div>
        </div>
    );
};
