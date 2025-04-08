import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Collection, CollectionProps } from "./Collection";
import { TypographyDisplay, TypographyDisplayProps } from "./TypographyDisplay";

export type TypographyCollectionProps = TypographyDisplayProps &
    Omit<CollectionProps, "children"> & {
        classNames: Array<string>;
    };

export const TypographyCollection: FC<TypographyCollectionProps> = ({
    id,
    text,
    title,
    inner,
    className,
    classNames,
}) => {
    return (
        <Collection
            id={id}
            className={twMerge(
                "[&>div]:flex-col [&>div]:flex-nowrap",
                className
            )}
            title={title}
            inner={inner}
        >
            {classNames.map((className, i) => (
                <TypographyDisplay key={i} className={className} text={text} />
            ))}
        </Collection>
    );
};
