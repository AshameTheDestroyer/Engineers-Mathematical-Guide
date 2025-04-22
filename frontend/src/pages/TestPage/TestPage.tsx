import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Page } from "@/components/Page/Page";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { JumpToTopButton } from "@/components/JumpToTopButton/JumpToTopButton";

export const TestPage: FC = () => {
    useDefaultRoute("/test", "/colours");

    return (
        <Page>
            <Header />
            <Outlet />
            <JumpToTopButton />
        </Page>
    );
};
