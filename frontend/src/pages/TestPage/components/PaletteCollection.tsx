import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ColourCollection } from "./ColourCollection";
import { Collection, CollectionProps } from "./Collection";

export type PaletteCollectionProps = Omit<CollectionProps, "children"> & {
    classNames: {
        background: Array<string>;
        foreground: Array<string>;
    };
};

export const PaletteCollection: FC<PaletteCollectionProps> = ({
    id,
    title,
    inner,
    className,
    classNames,
}) => {
    return (
        <Collection
            id={id}
            className={twMerge(
                "[&>div]:grid [&>div]:grid-cols-[repeat(auto-fill,minmax(max(30rem,40vw),1fr))]",
                className
            )}
            inner={inner}
            title={title}
        >
            <ColourCollection
                inner
                title="Background"
                classNames={classNames.background}
            />
            <ColourCollection
                inner
                title="Foreground"
                classNames={classNames.foreground}
            />
        </Collection>
    );
};
