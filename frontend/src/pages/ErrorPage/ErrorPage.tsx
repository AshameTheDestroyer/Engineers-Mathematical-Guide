import { FC } from "react";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { ErrorBoundaryProps } from "react-error-boundary";
import { FallbackPage } from "../FallbackPage/FallbackPage";
import { CodeBlock } from "@/components/CodeBlock/CodeBlock";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";

import locales from "@localization/error_page.json";

export type ErrorPageProps = Parameters<
    ErrorBoundaryProps["fallbackRender"] & {}
>[0];

export const ErrorPage: FC<ErrorPageProps> = ({
    error,
    resetErrorBoundary,
}) => {
    const { isDarkThemed } = useThemeMode();

    return (
        <FallbackPage>
            <Locale variant="h1" className="text-3xl font-bold">
                {locales.title}
            </Locale>
            <Locale variant="p" className="font-bold">
                {locales.subtitle}
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
        </FallbackPage>
    );
};
