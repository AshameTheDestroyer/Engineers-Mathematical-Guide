import { createPortal } from "react-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { Dispatch, FC, SetStateAction } from "react";
import { IconButton } from "../IconButton/IconButton";
import { ComponentProps } from "@types_/ComponentProps";

import cross_icon from "@/assets/icons/cross.svg";

import "./drawer.css";

export type DrawerProps = {
    direction: Direction;
} & ModalProps;

export const Drawer: FC<DrawerProps> = ({
    id,
    ref,
    children,
    className,
    direction,
    ...props
}) => {
    const positionClassNames: Record<Direction, string> = {
        top: "bottom-auto",
        left: "right-auto",
        right: "left-auto",
        bottom: "top-auto",
    };

    const directionCoordinates: Record<
        Direction,
        { from: Coordinates; to: Coordinates }
    > = {
        top: { from: { x: 0, y: -100 }, to: { x: 0, y: 0 } },
        left: { from: { x: -100, y: 0 }, to: { x: 0, y: 0 } },
        right: { from: { x: 100, y: 0 }, to: { x: 0, y: 0 } },
        bottom: { from: { x: 0, y: 100 }, to: { x: 0, y: 0 } },
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
            animationDuration={200}
            style={
                {
                    "--from-x": directionCoordinates[direction].from.x + "%",
                    "--from-y": directionCoordinates[direction].from.y + "%",
                    "--to-x": directionCoordinates[direction].to.x + "%",
                    "--to-y": directionCoordinates[direction].to.y + "%",
                } as CSSProperties
            }
            {...props}
        >
            {children}
        </Modal>
    );
};
