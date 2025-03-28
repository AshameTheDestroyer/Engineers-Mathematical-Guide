import { FC, useRef } from "react";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@components/Button/Button";
import { HEADER_ROUTES } from "@constants/HeaderRoutes";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { NavigationBar } from "@components/NavigationBar/NavigationBar";
import {
    Header as Header_,
    // HeaderProps
} from "@components/Header/Header";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";

export const Header: FC = () => {
    const headerReference = useRef<HTMLDivElement>(null!);

    // const onScroll: HeaderProps["onScroll"] = ({ top }) => {
    //     if (headerReference.current == null) {
    //         return;
    //     }

    //     const className = "not-hover:not-focus-within:opacity-50";

    //     if (top > headerReference.current.clientHeight) {
    //         headerReference.current.classList.add(className);
    //     } else {
    //         headerReference.current.classList.remove(className);
    //     }
    // };

    return (
        <Header_
            ref={headerReference}
            className="bg-background-normal transition duration-300"
            // onScroll={onScroll}
        >
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
                <ThemeToggle />
            </ButtonBox>
        </Header_>
    );
};
