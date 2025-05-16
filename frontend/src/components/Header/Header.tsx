import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";
import { FC, useEffect, useImperativeHandle, useRef, useState } from "react";

export type HeaderProps = ComponentProps<HTMLDivElement> & {
    isSticky?: boolean;
    onScroll?: (
        direction: "up" | "down",
        headerElement: HTMLDivElement
    ) => void;
};

export const Header: FC<HeaderProps> = ({
    id,
    ref,
    children,
    isSticky,
    onScroll,
    className,
}) => {
    const headerReference = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState<"up" | "down">("up");

    useImperativeHandle(ref, () => headerReference.current!);

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
                "-m-page mb-page z-10 flex flex-wrap place-items-center justify-between gap-8 px-4 py-2",
                className
            )}
        >
            {children}
        </header>
    );
};
