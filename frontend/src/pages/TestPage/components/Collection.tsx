import { FC } from "react";
import { twMerge } from "tailwind-merge";
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
        <div
            id={id}
            ref={ref}
            className={twMerge("flex flex-col gap-4", className)}
        >
            <Typography
                variant="h1"
                {...typography}
                className={twMerge("text-xl font-bold", typography?.className)}
            >
                {title}
            </Typography>
            <div className="flex flex-wrap gap-8">{children}</div>
        </div>
    );
};
