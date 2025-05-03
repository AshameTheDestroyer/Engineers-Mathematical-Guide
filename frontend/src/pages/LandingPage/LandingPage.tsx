import { FC } from "react";
import { Page } from "@components/Page/Page";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";

export const LandingPage: FC = () => {
    return (
        <Page>
            <Header />
            <MainContent />
        </Page>
    );
};
