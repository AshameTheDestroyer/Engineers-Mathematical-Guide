import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";

export type PageProps = ComponentProps<HTMLDivElement>;

export const Page: FC<PageProps> = ({ id, ref, className, children }) => {
    return (
        <main
            id={id}
            ref={ref}
            className={twMerge(
                "page p-page relative isolate flex min-h-screen flex-col transition duration-200",
                className
            )}
        >
            {children}
        </main>
    );
};
