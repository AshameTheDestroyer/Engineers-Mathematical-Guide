import { Lazy } from "../Lazy";
import { FC, PropsWithChildren } from "react";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { CodeBlock } from "@/components/CodeBlock/CodeBlock";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/lazy.json";

export type LazyComponentProps = PropsWithChildren<{
    skeleton?: PropsWithChildren["children"];
}>;

export const LazyComponent: FC<LazyComponentProps> = ({
    children,
    skeleton,
}) => {
    const { isDarkThemed } = useThemeMode();
    const { GetLocale, language } = useLocalization();

    return (
        <Lazy
            errorFallback={({ error, resetErrorBoundary }) => (
                <div className="flex flex-col gap-6">
                    <Locale className="font-bold" variant="h4">
                        {locales.error}
                    </Locale>
                    <CodeBlock
                        className="max-w-[calc(100vw-var(--spacing-page)*2)]"
                        language="json"
                        theme={isDarkThemed ? "duotoneSea" : "materialLight"}
                    >
                        {`${error}`}
                    </CodeBlock>
                    <Button
                        className="max-w-max place-self-center [&>div]:px-4"
                        onClick={resetErrorBoundary}
                    >
                        <Locale>{locales.button}</Locale>
                    </Button>
                </div>
            )}
            loadingFallback={skeleton ?? GetLocale(locales.loading, language)}
        >
            {children}
        </Lazy>
    );
};
