import { FC } from "react";
import { Page } from "@components/Page/Page";
import { Button } from "@components/Button/Button";

import home_icon from "@icons/home.svg";

export const NotFoundPage: FC = () => {
    return (
        <Page className="bg-primary-normal text-white">
            <div className="centralize bg-gray flex h-32 grow flex-col justify-between gap-5">
                <h1 className="text-3xl font-bold">Page Not Found</h1>
                <p>
                    Please check your route carefully, because the URL you
                    provided does not exist.
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
            </div>
        </Page>
    );
};
