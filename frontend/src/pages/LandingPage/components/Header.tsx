import { FC } from "react";
import { LINKS } from "@constants/links";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@components/Button/Button";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { NavigationBar } from "@components/NavigationBar/NavigationBar";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

export const Header: FC = () => {
    return (
        <div className="-m-page mb-page p-page flex flex-row place-items-center justify-between gap-8">
            <Logo />
            <NavigationBar links={LINKS} className="grow" />
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
        </div>
    );
};
