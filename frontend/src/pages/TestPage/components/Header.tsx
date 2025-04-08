import { FC } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Header as Header_ } from "@/components/Header/Header";
import { LANDING_PAGE_ROUTES } from "@/routes/TestPage.routes";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

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
            <ConfigurationDropDownList variant="primary" />
        </Header_>
    );
};
