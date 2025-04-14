import { FC, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Page } from "@/components/Page/Page";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { JumpToTopButton } from "@/components/JumpToTopButton/JumpToTopButton";
import ProgressBar from "@/components/ProgressBarComponent/ProgressBar";

export const TestPage: FC = () => {
    const location = useLocation();
    const Navigate = useNavigate();

    const [progress, setProgress] = useState(5);

    const handleComplete = () => {
        alert("Progress completed!");
    };

    useEffect(() => {
        if (location.pathname == "/test") {
            Navigate("/test/colours");
        }
    }, []);

    return (
        <Page>
            <Header />
            <Outlet />
            <ProgressBar
                value={30}
                minimum={5}
                maximum={50}
                variant="primary"
                onProgress={(val) => console.log("progress:", val)}
                onComplete={handleComplete}
            />
            <JumpToTopButton />
        </Page>
    );
};
