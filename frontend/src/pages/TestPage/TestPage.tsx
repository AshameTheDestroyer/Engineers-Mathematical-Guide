import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { Header } from "@/components/Header/Header";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";

export const TestPage: FC = () => {
    return (
        <Page className="gap-8">
            <Header
                className="bg-background-normal transition duration-200"
                isSticky
                onScroll={(direction, header) => {
                    header.classList[direction == "up" ? "remove" : "add"](
                        "not-hover:not-focus-within:opacity-50"
                    );
                }}
            >
                <NavigationBar
                    routes={[{ href: "/test/design", text: "Design" }]}
                />
                <ThemeToggle variant="primary" />
            </Header>
            <Outlet />
        </Page>
    );
};
