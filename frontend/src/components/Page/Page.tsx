import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";

export type PageProps = ComponentProps;

export const Page: FC<PageProps> = ({ id, className, children }) => {
    return (
        <main
            id={id}
            className={twMerge(
                "page p-page relative isolate flex min-h-screen flex-col transition duration-200",
                className
            )}
        >
            {children}
        </main>
    );
};
