import { FC } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Header as Header_ } from "@/components/Header/Header";
import { LANDING_PAGE_ROUTES } from "@/routes/TestPage.routes";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { ThemeToggle } from "@/components/ThemeModeToggle/ThemeModeToggle";

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
            <ThemeToggle variant="primary" />
        </Header_>
    );
};
