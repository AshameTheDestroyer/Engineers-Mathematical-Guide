import { twJoin, twMerge } from "tailwind-merge";
import { IconButton } from "../IconButton/IconButton";
import { Button, ButtonProps } from "../Button/Button";
import { ComponentProps } from "@/types/ComponentProps";
import { FC, useEffect, useRef, useState } from "react";

import drop_down_icon from "@icons/triangle_arrow.svg";

export type DropDownProps = {
    text?: string;
    position: Position;
    doesCloseOnInteraction?: boolean;
    icon?: WithPartial<ButtonProps["icon"] & {}, "source" | "placement">;
} & ComponentProps<HTMLDivElement> &
    Omit<ButtonProps, "ref" | "icon" | "link">;

export const DropDown: FC<DropDownProps> = ({
    id,
    ref,
    text,
    icon,
    position,
    children,
    className,
    doesCloseOnInteraction,
    ...props
}) => {
    const containerReference = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropDownElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            containerReference.current?.style.setProperty("overflow", "hidden");
            return;
        }

        const timeoutID = setTimeout(() => {
            containerReference.current?.style.setProperty(
                "overflow",
                "visible"
            );
        }, 200);

        document.addEventListener("click", CloseDropDown);

        return () => {
            clearTimeout(timeoutID);
            document.removeEventListener("click", CloseDropDown);
        };
    }, [isOpen]);

    function CloseDropDown(e: MouseEvent) {
        if (!isOpen) {
            return;
        }

        const clickedElement = (e.target as HTMLElement).closest(".drop-down");

        if (
            clickedElement == dropDownElementRef.current ||
            dropDownElementRef.current?.contains(clickedElement)
        ) {
            return;
        }

        setIsOpen(false);
        e.preventDefault();
    }

    const positionClassNames: PositionClassNames = {
        "top-start": `bottom-full right-0 my-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
        "top-center": `bottom-full left-1/2 -translate-x-1/2 my-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
        "top-end": `bottom-full left-0 my-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,

        "right-start": `left-full bottom-0 mx-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
        "right-center": `left-full top-1/2 -translate-y-1/2 mx-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
        "right-end": `left-full top-0 mx-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,

        "bottom-start": `top-full left-0 my-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
        "bottom-center": `top-full left-1/2 -translate-x-1/2 my-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
        "bottom-end": `top-full right-0 my-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,

        "left-start": `right-full top-0 mx-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
        "left-center": `right-full top-1/2 -translate-y-1/2 mx-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
        "left-end": `right-full bottom-0 mx-4 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
    };

    const Button_ = text != null ? Button : IconButton;

    return (
        <div
            id={id}
            data-is-open={isOpen}
            ref={dropDownElementRef}
            data-has-custom-icon={icon != null}
            className={twMerge("drop-down relative flex", className)}
        >
            <Button_
                className="flex w-full items-center justify-start gap-8"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
                icon={{
                    ...icon,
                    placement: icon?.placement ?? "right",
                    source: icon?.source ?? drop_down_icon,
                    className: twMerge(
                        "pointer-events-none",
                        !isOpen && icon?.source == null ? "rotate-180" : "",
                        icon?.source == null
                            ? "transition-all duration-200 pointer-events-none"
                            : "",
                        icon?.className
                    ),
                }}
                {...props}
            >
                {text}
            </Button_>
            <div
                className={twJoin(
                    positionClassNames[position],
                    isOpen ? "border-2 shadow-lg" : "border-0",
                    "bg-background-light border-background-dark absolute z-10 grid w-full min-w-max rounded-lg transition-[grid-template-rows_box-shadow] duration-200"
                )}
            >
                <div
                    ref={containerReference}
                    className={twJoin(
                        "flex flex-col transition-all duration-200",
                        isOpen ? "p-2" : "p-0"
                    )}
                    onClick={() => doesCloseOnInteraction && setIsOpen(false)}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
