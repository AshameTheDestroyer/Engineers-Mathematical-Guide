import { FC } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Header as Header_ } from "@/components/Header/Header";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";

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
            <NavigationBar
                routes={[{ href: "/test/design", text: "Design" }]}
            />
            <ThemeToggle variant="primary" />
        </Header_>
    );
};
