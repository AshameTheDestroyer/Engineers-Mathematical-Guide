import { createPortal } from "react-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { Dispatch, FC, SetStateAction } from "react";
import { IconButton } from "../IconButton/IconButton";
import { ComponentProps } from "@types_/ComponentProps";

import cross_icon from "@/assets/icons/cross.svg";

export type DrawerProps = {
    direction: Direction;
} & ModalProps;

export const Drawer: FC<DrawerProps> = ({
    id,
    ref,
    isOpen,
    children,
    direction,
    hasCloseButton,
    setIsOpen,
    className,
}) => {
    const positionClassNames: Record<Direction, string> = {
        top: "bottom-auto",
        bottom: "top-auto",
        right: "left-auto",
        left: "right-auto",
    };

    const translateClassNames: Record<Direction, string> = {
        top: isOpen ? "translate-y-0" : "-translate-y-full",
        bottom: isOpen ? "translate-y-0" : "translate-y-full",
        right: isOpen ? "translate-x-0" : "translate-x-full",
        left: isOpen ? "translate-x-0" : "-translate-x-full",
    };

    const buttonPositionClassNames: Record<Direction, string> = {
        top: "right-4 top-4",
        bottom: "right-4 bottom-4",
        right: "right-4 top-4",
        left: "left-4 top-4",
    };

    return createPortal(
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30"
                    onClick={(_e) => setIsOpen(false)}
                />
            )}
            hasCloseButton={hasCloseButton}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            {children}
        </Modal>
    );
};
