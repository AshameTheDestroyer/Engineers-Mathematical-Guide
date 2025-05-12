import { twJoin, twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";
import { Dispatch, FC, SetStateAction } from "react";
import { IconButton } from "../IconButton/IconButton";
import cross_icon from "@/assets/icons/cross.svg";
import { createPortal } from "react-dom";

export type DrawerProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    direction: Direction;
} & ComponentProps<HTMLDivElement>;

export const Drawer: FC<DrawerProps> = ({
    id,
    ref,
    isOpen,
    children,
    direction,
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
                    className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-30"
                    onClick={(_e) => setIsOpen(false)}
                />
            )}
            <div
                id={id}
                ref={ref}
                className={twMerge(
                    "bg-background-normal fixed inset-0 z-50 p-4 pt-20 transition-all duration-300",
                    positionClassNames[direction],
                    translateClassNames[direction],
                    className
                )}
            >
                <IconButton
                    className={twJoin(
                        "absolute z-[1]",
                        buttonPositionClassNames[direction]
                    )}
                    icon={{
                        width: 20,
                        height: 20,
                        thickness: 2,
                        source: cross_icon,
                        stroke: "currentColor",
                    }}
                    onClick={(_e) => setIsOpen(false)}
                />
                {children}
            </div>
        </>,
        document.body
    );
};
