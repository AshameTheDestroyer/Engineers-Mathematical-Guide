import { FC } from "react";
import { Locale } from "@/components/Locale/Locale";
import { FallbackPage } from "../FallbackPage/FallbackPage";

import locales from "@localization/error_page.json";

export const ErrorPage: FC = () => {
    return (
        <FallbackPage>
            <Locale variant="h1" className="text-3xl font-bold">
                {locales.title}
            </Locale>
            <Locale variant="p" className="font-bold">
                {locales.subtitle}
            </Locale>
        </FallbackPage>
    );
};
