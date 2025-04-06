import { FC } from "react";
import { FallbackPage } from "../FallbackPage/FallbackPage";

export const ErrorPage: FC = () => {
    return (
        <FallbackPage>
            <h1 className="text-3xl font-bold">Error</h1>
            <p>Something went wrong, please refresh.</p>
        </FallbackPage>
    );
};
