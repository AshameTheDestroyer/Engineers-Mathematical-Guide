import { FC } from "react";
import { FallbackPage } from "../FallbackPage/FallbackPage";
// import locales from "@localization/landing_page.json";
import locals from "@localization/loading_page.json";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export const LoadingPage: FC = () => {
    const { GetLocale, language } = useLocalization();
    return (
        <FallbackPage>
            <h1 className="text-3xl font-bold">
                {GetLocale(locals.title, language)}
            </h1>
            <p>{GetLocale(locals.subtitle, language)}</p>
        </FallbackPage>
    );
};
