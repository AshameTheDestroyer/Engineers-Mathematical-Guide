import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";

export const Page: FC<ComponentProps> = ({ id, className, children }) => {
    return (
        <main
            id={id}
            className={twMerge(
                "page p-page flex min-h-screen flex-col",
                className
            )}
        >
            {children}
        </main>
    );
};
