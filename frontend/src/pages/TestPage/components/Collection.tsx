import { FC } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { ComponentProps } from "@/types/ComponentProps";

export type CollectionProps = ComponentProps & {
    title: string;
    inner?: boolean;
};

export const Collection: FC<CollectionProps> = ({
    id,
    title,
    inner,
    children,
    className,
}) => {
    return (
        <div id={id} className={twMerge("flex flex-col gap-4", className)}>
            {!inner ? (
                <h1 className="text-xl font-bold">{title}</h1>
            ) : (
                <h2 className="text-lg font-bold">{title}</h2>
            )}
            <div
                className={twJoin("flex flex-wrap", !inner ? "gap-8" : "gap-4")}
            >
                {children}
            </div>
        </div>
    );
};
