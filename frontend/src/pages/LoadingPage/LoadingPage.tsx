import { FC } from "react";
import { Locale } from "@/components/Locale/Locale";
import { FallbackPage } from "../FallbackPage/FallbackPage";

import locals from "@localization/loading_page.json";

export const LoadingPage: FC = () => {
    return (
        <FallbackPage>
            <Locale variant="h1" className="text-3xl font-bold">
                {locals.title}
            </Locale>
            <Locale variant="p" className="font-bold">
                {locals.subtitle}
            </Locale>
        </FallbackPage>
    );
};
