import { FC } from "react";
import { Header } from "./components/Header";
import { Page } from "../../components/Page/Page";
import { MainContent } from "./components/MainContent";

export const LandingPage: FC = () => {
    return (
        <Page className="from- to-secondary-normal bg-gradient-to-r from-orange-500">
            <Header />
            <MainContent />
        </Page>
    );
};
