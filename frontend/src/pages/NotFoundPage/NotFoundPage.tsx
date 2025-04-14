import { FC } from "react";
import { Button } from "@components/Button/Button";
import { FallbackPage } from "../FallbackPage/FallbackPage";
import locales from "@localization/not_found_page.json";

import home_icon from "@icons/home.svg";
import { useLocation } from "react-router-dom";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export const NotFoundPage: FC = () => {
    const { GetLocale, language } = useLocalization();
    return (
        <FallbackPage>
            <h1 className="text-3xl font-bold">
                {GetLocale(locales.title, language)}
            </h1>
            <p>{GetLocale(locales.body, language)}</p>
            <Button
                className="[&>div]:px-8"
                link="/"
                icon={{
                    source: home_icon,
                    placement: "left",
                }}
            >
                {GetLocale(locales.button, language)}
            </Button>
        </FallbackPage>
    );
};
