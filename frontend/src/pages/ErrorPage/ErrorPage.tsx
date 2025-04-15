import { FC } from "react";
import { FallbackPage } from "../FallbackPage/FallbackPage";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import locales from "@localization/error_page.json";

export const ErrorPage: FC = () => {
    const { GetLocale, language } = useLocalization();
    return (
        <FallbackPage>
            <h1 className="text-3xl font-bold">
                {GetLocale(locales.title, language)}
            </h1>
            <p>{GetLocale(locales.subtitle, language)}</p>
        </FallbackPage>
    );
};
