import { FC } from "react";
import { Locale } from "@/components/Locale/Locale";
import { FallbackPage } from "../FallbackPage/FallbackPage";

import locales from "@localization/error_page.json";
import { ErrorBoundaryProps } from "react-error-boundary";
import { Button } from "@/components/Button/Button";
import { Typography } from "@/components/Typography/Typography";

export type ErrorPageProps = Parameters<
    ErrorBoundaryProps["fallbackRender"] & {}
>[0];

export const ErrorPage: FC<ErrorPageProps> = ({
    error,
    resetErrorBoundary,
}) => {
    return (
        <FallbackPage>
            <Locale variant="h1" className="text-3xl font-bold">
                {locales.title}
            </Locale>
            <Locale variant="p" className="font-bold">
                {locales.subtitle}
            </Locale>
            <details className="flex max-w-[40rem] flex-col gap-2">
                <Typography variant="p" className="font-bold">
                    {`${error}`}
                </Typography>
                <summary className="font-bold">
                    <Locale>{locales.details}</Locale>
                </summary>
            </details>
            <Button
                className="max-w-max place-self-center [&>div]:px-4"
                onClick={resetErrorBoundary}
            >
                <Locale>{locales.button}</Locale>
            </Button>
        </FallbackPage>
    );
};
