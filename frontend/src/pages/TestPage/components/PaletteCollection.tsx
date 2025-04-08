import { FC, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Button/Button";
import { ColourCollection } from "./ColourCollection";
import { Collection, CollectionProps } from "./Collection";
import { ThemePaletteContext } from "@/components/ThemePaletteProvider/ThemePaletteProvider";

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
    const { SetThemePalette } = useContext(ThemePaletteContext);

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
                className="text- absolute right-0 top-0 translate-y-[var(--line-height)]"
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
