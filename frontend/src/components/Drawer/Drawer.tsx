import { twMerge } from "tailwind-merge";
import { FC } from "react";
import { Modal, ModalProps } from "../Modal/Modal";

export type Direction = "top" | "bottom" | "left" | "right";

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

    const transitionClassNames =
        "transition-transform duration-300 ease-in-out";

    return (
        <Modal
            id={id}
            ref={ref}
            className={twMerge(
                "bg-background-light translate-0 inset-0 rounded-none",
                positionClassNames[direction],
                translateClassNames[direction],
                transitionClassNames,
                className
            )}
            hasCloseButton={hasCloseButton}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isAnimationDisabled={true}
        >
            {children}
        </Modal>
    );
};
