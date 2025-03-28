import { twMerge } from "tailwind-merge";
import { FC, RefObject, useEffect } from "react";
import { ComponentProps } from "@types_/ComponentProps";

export type HeaderProps = ComponentProps & {
    isSticky?: boolean;
    ref?: RefObject<HTMLDivElement>;
    onScroll?: (rect: Record<"top" | "left", number>) => void;
};

export const Header: FC<HeaderProps> = ({
    id,
    ref,
    children,
    isSticky,
    onScroll,
    className,
}) => {
    useEffect(() => {
        if (onScroll == null) {
            return;
        }

        const scrollCallback = () =>
            onScroll({
                top: window.scrollY,
                left: window.scrollX,
            });

        window.addEventListener("scroll", scrollCallback);

        return () => {
            window.removeEventListener("scroll", scrollCallback);
        };
    }, [onScroll]);

    return (
        <header
            id={id}
            ref={ref}
            className={twMerge(
                isSticky ? "sticky top-0" : "",
                "-m-page mb-page px-page z-10 flex place-items-center justify-between gap-8 py-[calc(var(--spacing-page)/2)]",
                className
            )}
        >
            {children}
        </header>
    );
};
