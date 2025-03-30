import { FC, useEffect } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Page } from "@/components/Page/Page";
import { Header } from "@/components/Header/Header";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";

export const TestPage: FC = () => {
    const location = useLocation();
    const Navigate = useNavigate();

    useEffect(() => {
        if (location.pathname == "/test") {
            Navigate("/test/design");
        }
    }, []);

    return (
        <Page>
            <Header
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
                    routes={[{ href: "/test/design", text: "Design" }]}
                />
                <ThemeToggle variant="primary" />
            </Header>
            <Outlet />
        </Page>
    );
};
