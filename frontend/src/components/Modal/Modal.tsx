import { createPortal } from "react-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { IconButton } from "../IconButton/IconButton";
import { ComponentProps } from "@types_/ComponentProps";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

import "./modal.css";
import cross_icon from "@/assets/icons/cross.svg";

export type ModalProps = {
    isOpen: boolean;
    hasCloseButton?: boolean;
    isAnimationDisabled?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentProps<HTMLDivElement>;

export const Modal: FC<ModalProps> = ({
    id,
    ref,
    isOpen,
    children,
    className,
    setIsOpen,
    hasCloseButton,
    isAnimationDisabled = false,
}) => {
    const { direction } = useLocalization();
    const [isRendered, setIsRendered] = useState(isOpen);

    useEffect(() => {
        if (!isOpen) {
            const timeoutID = setTimeout(() => {
                setIsRendered(false);
            }, 400);

            return () => {
                clearTimeout(timeoutID);
            };
        }

        setIsRendered(true);
    }, [isOpen]);

    if (!isRendered) {
        return <></>;
    }

    return createPortal(
        <>
            <div
                className="fixed inset-0 bg-black/30"
                onClick={(_e) => setIsOpen(false)}
            />
            <div
                id={id}
                ref={ref}
                className={twMerge(
                    "modal -translate-1/2 fixed left-1/2 top-1/2 z-50 flex min-h-12 min-w-12 flex-col rounded-2xl p-8",
                    !isAnimationDisabled && "animated",
                    isOpen && "open",
                    className
                )}
            >
                {hasCloseButton && (
                    <IconButton
                        className={twJoin(
                            "absolute top-4 z-[1] text-[var(--color-vibrant-red)!important]",
                            direction == "rtl" ? "left-4" : "right-4"
                        )}
                        thickness="thin"
                        icon={{
                            width: 20,
                            height: 20,
                            thickness: 2,
                            source: cross_icon,
                            stroke: "currentColor",
                        }}
                        onClick={(_e) => setIsOpen(false)}
                    />
                )}
                {children}
            </div>
        </>,
        document.body
    );
};
