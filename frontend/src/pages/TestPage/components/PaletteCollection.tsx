import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Button/Button";
import { ColourCollection } from "./ColourCollection";
import { Collection, CollectionProps } from "./Collection";
import { useThemePalette } from "@/components/ThemePaletteProvider/ThemePaletteProvider";

export type PaletteCollectionProps = Omit<CollectionProps, "children"> & {
    classNames: {
        background: Array<string>;
        foreground: Array<string>;
    };
};

export const PaletteCollection: FC<PaletteCollectionProps> = ({
    id,
    ref,
    title,
    className,
    typography,
    classNames,
}) => {
    const { SetThemePalette } = useThemePalette();

    return (
        <Collection
            id={id}
            ref={ref}
            className={twMerge(
                "relative [&>div]:grid [&>div]:grid-cols-[repeat(auto-fill,minmax(max(30rem,40vw),1fr))]",
                className
            )}
            title={title}
            typography={typography}
        >
            <Button
                className="absolute right-0 top-0 translate-y-[var(--line-height)]"
                onClick={(_e) => SetThemePalette(title.toLowerCase())}
            >
                Apply
            </Button>
            <ColourCollection
                title="Background"
                classNames={classNames.background}
                typography={{ variant: "h2", className: "text-lg" }}
            />
            <ColourCollection
                title="Foreground"
                classNames={classNames.foreground}
                typography={{ variant: "h2", className: "text-lg" }}
            />
        </Collection>
    );
};
