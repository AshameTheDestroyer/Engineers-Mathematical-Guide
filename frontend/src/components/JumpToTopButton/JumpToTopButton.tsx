import { twMerge } from "tailwind-merge";
import { FC, useCallback, useEffect, useRef } from "react";
import { IconButton, IconButtonProps } from "../IconButton/IconButton";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

import arrow_icon from "@icons/arrow.svg";

export type JumpToTopButtonProps = Omit<IconButtonProps, "icon"> & {
    threshold?: number;
    isContainerized?: boolean;
    orientation: "horizontal" | "vertical";
};

export const JumpToTopButton: FC<JumpToTopButtonProps> = ({
    id,
    onClick,
    className,
    orientation,
    isContainerized,
    threshold = 100,
    ...props
}) => {
    const { direction } = useLocalization();
    const buttonReference = useRef<HTMLButtonElement>(null);

    const rootElement = isContainerized
        ? buttonReference.current?.parentElement
        : window;

    const GetScrollValue = useCallback(
        () =>
            Math.abs(
                isContainerized
                    ? buttonReference.current!.parentElement![
                          orientation == "vertical" ? "scrollTop" : "scrollLeft"
                      ]
                    : window[orientation == "vertical" ? "scrollY" : "scrollX"]
            ),
        [buttonReference.current]
    );

    useEffect(() => {
        ScrollCallback();

        if (rootElement == null) {
            return;
        }

        rootElement.addEventListener("scroll", ScrollCallback);

        return () => {
            rootElement.removeEventListener("scroll", ScrollCallback);
        };
    }, [rootElement]);

    function ScrollCallback() {
        if (buttonReference.current == null || rootElement == null) {
            return;
        }

        console.log(GetScrollValue());

        buttonReference.current.classList[
            GetScrollValue() < threshold ? "add" : "remove"
        ]("hidden");
    }

    function JumpToTop() {
        if (rootElement == null) {
            return;
        }

        rootElement.scrollTo({
            [orientation == "vertical" ? "top" : "left"]: 0,
            behavior: "smooth",
        });
    }

    return (
        <IconButton
            id={id}
            ref={buttonReference}
            className={twMerge(
                "bottom-page z-50 opacity-75",
                isContainerized ? "sticky" : "fixed",
                direction == "ltr" ? "right-page" : "left-page",
                className
            )}
            onClick={(e) => (JumpToTop(), onClick?.(e))}
            icon={{
                source: arrow_icon,
                className: orientation == "horizontal" ? "rotate-270" : "",
            }}
            {...props}
        />
    );
};
