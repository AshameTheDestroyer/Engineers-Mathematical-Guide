import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Page } from "@/components/Page/Page";
import { TEST_ROUTES } from "@/routes/test.routes";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { JumpToTopButton } from "@/components/JumpToTopButton/JumpToTopButton";

export const TestPage: FC = () => {
    if (TEST_ROUTES == null) {
        return <></>;
    }

    useDefaultRoute(
        TEST_ROUTES.base.href,
        TEST_ROUTES.base.routes.colours.href
    );

    return (
        <Page>
            <Header />
            <Outlet />
            <JumpToTopButton />
        </Page>
    );
};
