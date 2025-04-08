import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Button/Button";
import { ColourCollection } from "./ColourCollection";
import { useThemePalette } from "@/hooks/useThemePalette";
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
    const { SetThemePalette } = useThemePalette();

    return (
        <Collection
            id={id}
            className={twMerge(
                "relative [&>div]:grid [&>div]:grid-cols-[repeat(auto-fill,minmax(max(30rem,40vw),1fr))]",
                className
            )}
            inner={inner}
            title={title}
        >
            <Button
                className="absolute right-0 top-0 translate-y-[var(--line-height)]"
                onClick={(_e) => SetThemePalette(title.toLowerCase())}
            >
                Apply
            </Button>
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
