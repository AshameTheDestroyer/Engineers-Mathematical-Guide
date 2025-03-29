import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ColourDisplay } from "./ColourDisplay";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type ColourCollectionProps = ChildlessComponentProps & {
    title: string;
    classNames: Array<string>;
};

export const ColourCollection: FC<ColourCollectionProps> = ({
    id,
    title,
    className,
    classNames,
}) => {
    return (
        <div id={id} className={twMerge("flex flex-col gap-4", className)}>
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="flex flex-wrap gap-4">
                {classNames.map((className) => (
                    <ColourDisplay className={className} />
                ))}
            </div>
        </div>
    );
};
