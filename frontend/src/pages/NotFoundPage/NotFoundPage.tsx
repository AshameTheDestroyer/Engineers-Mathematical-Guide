import { FC } from "react";
import { Page } from "@components/Page/Page";
import { Icon } from "@components/Icon/Icon";
import { Button } from "@components/Button/Button";

import cog_icon from "@icons/cog.svg";
import home_icon from "@icons/home.svg";

export const NotFoundPage: FC = () => {
    return (
        <Page className="bg-primary-normal overflow-hidden text-white">
            <div className="centralize bg-gray isolate flex h-32 grow flex-col justify-between gap-5 overflow-hidden">
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
                <Icon
                    className="-left-page absolute bottom-0 z-[-1] -translate-x-1/4 translate-y-1/4 animate-spin text-white [animation-duration:60s]"
                    width={400}
                    height={400}
                    source={cog_icon}
                />
                <Icon
                    className="-left-page absolute bottom-0 z-[-1] translate-x-[70%] translate-y-[40%] rotate-[-5deg] animate-spin text-white [animation-direction:reverse] [animation-duration:60s]"
                    width={350}
                    height={350}
                    source={cog_icon}
                />
                <Icon
                    className="-right-page absolute top-0 translate-x-1/4 translate-y-2/3 animate-spin text-white [animation-direction:reverse] [animation-duration:60s]"
                    width={250}
                    height={250}
                    source={cog_icon}
                />
                <Icon
                    className="-left-page absolute top-0 -translate-y-1/2 translate-x-[10vw] animate-spin text-white [animation-direction:reverse] [animation-duration:60s]"
                    width={250}
                    height={250}
                    source={cog_icon}
                />
            </div>
        </Page>
    );
};
