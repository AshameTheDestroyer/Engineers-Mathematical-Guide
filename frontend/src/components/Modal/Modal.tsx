import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";
import { Dispatch, FC, SetStateAction } from "react";
import { IconButton } from "../IconButton/IconButton";
// import { IconButton } from "../IconButton/IconButton";
import cross_icon from "@/assets/icons/cross.svg";
import { createPortal } from "react-dom";
// import { createPortal } from "react-dom";

export type ModalProps = {
    isOpen: boolean;
    hasCloseButton?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentProps<HTMLDivElement>;

export const Modal: FC<ModalProps> = ({
    id,
    ref,
    isOpen,
    children,
    hasCloseButton,
    setIsOpen,
    className,
}) => {
    if (!isOpen) {
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
                    "-translate-1/2 fixed left-1/2 top-1/2 z-50 flex min-h-12 min-w-12 justify-items-center rounded-2xl p-8 transition-all duration-300",
                    children != null && hasCloseButton ? "py-16" : "",
                    className
                )}
            >
                {hasCloseButton && (
                    <IconButton
                        className="absolute right-4 top-4 z-[1] text-[var(--color-vibrant-red)!important]"
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
