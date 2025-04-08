import { FC } from "react";
import { Logo } from "@components/Logo/Logo";
import { Button } from "@components/Button/Button";
import { DropDown } from "@/components/DropDown/DropDown";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { Header as Header_ } from "@components/Header/Header";
import { LANDING_PAGE_ROUTES } from "@/routes/LandingPage.routes";
import { DropDownList } from "@/components/DropDownList/DropDownList";
import { NavigationBar } from "@components/NavigationBar/NavigationBar";

import cog_icon from "@icons/cog.svg";
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
                <DropDownList
                    variant="secondary"
                    position="bottom-end"
                    icon={{ source: cog_icon }}
                >
                    <DropDown
                        doesTextGrow
                        icon={{ placement: "left", className: "-rotate-90" }}
                        text="Theme Mode"
                        position="left-start"
                    >
                        <Button>Light</Button>
                        <Button>Dark</Button>
                        <Button>System</Button>
                    </DropDown>
                    <DropDown
                        doesTextGrow
                        icon={{ placement: "left", className: "-rotate-90" }}
                        text="Theme Palette"
                        position="left-start"
                    >
                        <Button>Default</Button>
                        <Button>Sakura</Button>
                        <Button>Moss</Button>
                    </DropDown>
                </DropDownList>
            </ButtonBox>
        </Header_>
    );
};
