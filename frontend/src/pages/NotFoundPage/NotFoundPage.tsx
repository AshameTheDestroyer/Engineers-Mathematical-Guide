import { FC } from "react";
import { Button } from "@components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { FallbackPage } from "../FallbackPage/FallbackPage";

import home_icon from "@icons/home.svg";

import locales from "@localization/not_found_page.json";

export const NotFoundPage: FC = () => {
    return (
        <FallbackPage>
            <Locale variant="h1" className="text-3xl font-bold">
                {locales.title}
            </Locale>
            <Locale variant="p">{locales.body}</Locale>
            <Button
                className="[&>div]:px-8"
                link="/"
                icon={{
                    source: home_icon,
                    placement: "left",
                }}
            >
                <Locale>{locales.button}</Locale>
            </Button>
        </FallbackPage>
    );
};
