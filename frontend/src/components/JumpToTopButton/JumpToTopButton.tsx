import { twMerge } from "tailwind-merge";
import { FC, useEffect, useRef } from "react";
import { IconButton, IconButtonProps } from "../IconButton/IconButton";

import arrow_icon from "@icons/arrow.svg";

export type JumpToTopButtonProps = Omit<IconButtonProps, "icon"> & {
    threshold?: number;
};

export const JumpToTopButton: FC<JumpToTopButtonProps> = ({
    id,
    onClick,
    className,
    threshold = 100,
    ...props
}) => {
    const buttonReference = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        ScrollCallback();

        window.addEventListener("scroll", ScrollCallback);

        return () => {
            window.removeEventListener("scroll", ScrollCallback);
        };
    }, []);

    function ScrollCallback() {
        if (buttonReference.current == null) {
            return;
        }

        buttonReference.current.classList[
            window.scrollY < threshold ? "add" : "remove"
        ]("hidden");
    }

    function JumpToTop() {
        window.scrollTo({ top: 0 });
    }

    return (
        <IconButton
            id={id}
            ref={buttonReference}
            className={twMerge(
                "bottom-page right-page fixed z-50 opacity-75",
                className
            )}
            icon={{
                source: arrow_icon,
            }}
            onClick={(e) => (JumpToTop(), onClick?.(e))}
            {...props}
        />
    );
};
