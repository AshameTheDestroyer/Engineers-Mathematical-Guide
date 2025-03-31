import { FC, useEffect } from "react";
import { Header } from "./components/Header";
import { Page } from "@/components/Page/Page";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { JumpToTopButton } from "@/components/JumpToTopButton/JumpToTopButton";

export const TestPage: FC = () => {
    const location = useLocation();
    const Navigate = useNavigate();

    useEffect(() => {
        if (location.pathname == "/test") {
            Navigate("/test/colours");
        }
    }, []);

    return (
        <Page>
            <Header />
            <Outlet />
            <JumpToTopButton />
        </Page>
    );
};
