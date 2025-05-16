import { Lazy } from "../Lazy";
import { FC, PropsWithChildren } from "react";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import lazy_locales from "@localization/lazy.json";

export type LazyComponentProps = PropsWithChildren<{
    skeleton?: PropsWithChildren["children"];
}>;

export const LazyComponent: FC<LazyComponentProps> = ({
    children,
    skeleton,
}) => {
    const { GetLocale, language } = useLocalization();

    return (
        <Lazy
            errorFallback={GetLocale(lazy_locales.error, language)}
            loadingFallback={
                skeleton ?? GetLocale(lazy_locales.loading, language)
            }
        >
            {children}
        </Lazy>
    );
};
