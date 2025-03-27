import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";

export type HeaderProps = ComponentProps;

export const Header: FC<HeaderProps> = ({ id, children, className }) => {
    return (
        <header
            id={id}
            className={twMerge(
                "-m-page mb-page px-page sticky top-0 z-10 flex place-items-center justify-between gap-8 py-[calc(var(--spacing-page)/2)]",
                className
            )}
        >
            {children}
        </header>
    );
};
