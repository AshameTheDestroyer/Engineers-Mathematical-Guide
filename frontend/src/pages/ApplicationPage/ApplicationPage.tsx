import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Page } from "@/components/Page/Page";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { OfflineModal } from "@/components/OfflineModal/OfflineModal";

export const ApplicationPage: FC = () => {
    useDefaultRoute(
        APPLICATION_ROUTES.base.href,
        APPLICATION_ROUTES.base.routes.courses.href
    );

    return (
        <Page>
            <Header />
            <Outlet />
            <OfflineModal />
        </Page>
    );
};
