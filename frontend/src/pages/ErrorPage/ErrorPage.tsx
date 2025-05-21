import { FC } from "react";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { ErrorBoundaryProps } from "react-error-boundary";
import { FallbackPage } from "../FallbackPage/FallbackPage";
import { Typography } from "@/components/Typography/Typography";

import locales from "@localization/error_page.json";

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
            <Flexbox className="max-w-[40rem]" direction="column" gap="2">
                <Typography variant="p" className="font-bold">
                    {`${error}`}
                </Typography>
            </Flexbox>
            <Button
                className="max-w-max place-self-center [&>div]:px-4"
                onClick={resetErrorBoundary}
            >
                <Locale>{locales.button}</Locale>
            </Button>
        </FallbackPage>
    );
};
