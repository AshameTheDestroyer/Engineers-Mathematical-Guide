import { twMerge } from "tailwind-merge";
import { CSSProperties, FC } from "react";
import { Modal, ModalProps } from "../Modal/Modal";

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

    return (
        <Modal
            id={id}
            ref={ref}
            className={twMerge(
                "drawer bg-background-light translate-0 inset-0 rounded-none",
                positionClassNames[direction],
                className
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
