import { FC } from "react";
import { FallbackPage } from "../FallbackPage/FallbackPage";

export const LoadingPage: FC = () => {
    return (
        <FallbackPage>
            <h1 className="text-3xl font-bold">Loading...</h1>
            <p>Please wait a moment till page finally loads.</p>
        </FallbackPage>
    );
};
