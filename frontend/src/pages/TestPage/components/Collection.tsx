import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { ComponentProps } from "@/types/ComponentProps";
import {
    Typography,
    TypographyProps,
} from "@/components/Typography/Typography";

export type CollectionProps = ComponentProps<HTMLDivElement> & {
    title: string;
    typography?: TypographyProps;
};

export const Collection: FC<CollectionProps> = ({
    id,
    ref,
    title,
    children,
    className,
    typography,
}) => {
    return (
        <Flexbox
            id={id}
            ref={ref}
            className={className}
            gap="8"
            direction="column"
        >
            <Typography
                variant="h1"
                {...typography}
                className={twMerge("text-xl font-bold", typography?.className)}
            >
                {title}
            </Typography>
            <Flexbox wrap="wrap" gap="8">
                {children}
            </Flexbox>
        </Flexbox>
    );
};
