import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";
import { FC, useEffect, useRef, useState } from "react";

export type HeaderProps = ComponentProps & {
    isSticky?: boolean;
    onScroll?: (
        direction: "up" | "down",
        headerElement: HTMLDivElement
    ) => void;
};

export const Header: FC<HeaderProps> = ({
    id,
    children,
    isSticky,
    onScroll,
    className,
}) => {
    const headerReference = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState<"up" | "down">("up");

    useEffect(() => {
        if (onScroll == null) {
            return;
        }

        window.addEventListener("scroll", ScrollCallback);

        return () => {
            window.removeEventListener("scroll", ScrollCallback);
        };
    }, [onScroll]);

    useEffect(() => {
        if (headerReference.current == null) {
            return;
        }

        onScroll?.(direction, headerReference.current);
    }, [direction]);

    function ScrollCallback() {
        if (headerReference.current == null) {
            return;
        }

        setDirection(
            window.scrollY < headerReference.current.clientHeight
                ? "up"
                : "down"
        );
    }

    return (
        <header
            id={id}
            ref={headerReference}
            className={twMerge(
                isSticky ? "sticky top-0" : "",
                "-m-page mb-page px-page z-10 flex flex-wrap place-items-center justify-between gap-8 py-[calc(var(--spacing-page)/2)]",
                className
            )}
        >
            {children}
        </header>
    );
};
