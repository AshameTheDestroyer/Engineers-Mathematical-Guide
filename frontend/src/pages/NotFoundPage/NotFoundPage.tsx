import { FC } from "react";
import { Button } from "@components/Button/Button";
import { FallbackPage } from "../FallbackPage/FallbackPage";

import home_icon from "@icons/home.svg";

export const NotFoundPage: FC = () => {
    return (
        <FallbackPage>
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p>
                Please check your route carefully, because the URL you provided
                does not exist.
            </p>
            <Button
                className="[&>div]:px-8"
                link="/"
                icon={{
                    source: home_icon,
                    placement: "left",
                }}
            >
                Return Home
            </Button>
        </FallbackPage>
    );
};
