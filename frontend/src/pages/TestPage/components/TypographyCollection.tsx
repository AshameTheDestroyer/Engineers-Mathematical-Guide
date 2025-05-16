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
    ref,
    text,
    title,
    className,
    classNames,
    typography,
}) => {
    return (
        <Collection
            id={id}
            ref={ref}
            className={twMerge(
                "max-w-[calc(100vw-var(--spacing-page)*2)] [&>div]:flex-col [&>div]:flex-nowrap",
                className
            )}
            title={title}
            typography={typography}
        >
            {classNames.map((className, i) => (
                <TypographyDisplay key={i} className={className} text={text} />
            ))}
        </Collection>
    );
};
