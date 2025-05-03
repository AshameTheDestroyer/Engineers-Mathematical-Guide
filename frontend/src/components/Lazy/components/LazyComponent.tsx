import { Lazy } from "../Lazy";
import { FC, PropsWithChildren } from "react";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import lazy_locales from "@localization/lazy.json";

export type LazyComponentProps = PropsWithChildren;

export const LazyComponent: FC<LazyComponentProps> = ({ children }) => {
    const { GetLocale, language } = useLocalization();

    return (
        <Lazy
            errorFallback={GetLocale(lazy_locales.error, language)}
            loadingFallback={GetLocale(lazy_locales.loading, language)}
        >
            {children}
        </Lazy>
    );
};
