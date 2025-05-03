import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ColourDisplay } from "./ColourDisplay";
import { Collection, CollectionProps } from "./Collection";

export type ColourCollectionProps = Omit<CollectionProps, "children"> & {
    classNames: Array<string>;
};

export const ColourCollection: FC<ColourCollectionProps> = ({
    id,
    ref,
    title,
    className,
    typography,
    classNames,
}) => {
    return (
        <Collection
            id={id}
            ref={ref}
            className={twMerge(
                "[&>div]:grid [&>div]:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]",
                className
            )}
            title={title}
            typography={typography}
        >
            {classNames.map((className, i) => (
                <ColourDisplay key={i} className={className} />
            ))}
        </Collection>
    );
};
