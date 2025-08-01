import { twMerge } from "tailwind-merge";
import { Modal, ModalProps } from "../Modal/Modal";
import { useElementInformation } from "@/hooks/useElementInformation";
import {
    FC,
    Touch,
    useRef,
    useMemo,
    useState,
    useEffect,
    CSSProperties,
    useImperativeHandle,
} from "react";

import "./drawer.css";

export type DrawerProps = {
    direction: Direction;
    closingPercentage?: `${number}%`;
} & ModalProps;

export const Drawer: FC<DrawerProps> = ({
    id,
    ref,
    isOpen,
    children,
    className,
    direction,
    setIsOpen,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    animationDuration = 300,
    closingPercentage = "50%",
    ...props
}) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => drawerRef.current!);

    const drawerInformation = useElementInformation(drawerRef);

    const [touchPosition, setTouchPosition] = useState<Coordinates>();
    const [startTouchPosition, setStartTouchPosition] = useState<Coordinates>();

    const positionDelta: Coordinates = useMemo(() => {
        if (startTouchPosition == null || touchPosition == null) {
            return { x: 0, y: 0 };
        }

        const position = {
            x: touchPosition.x - startTouchPosition.x,
            y: touchPosition.y - startTouchPosition.y,
        };

        return {
            x:
                (direction == "left" && position.x < 0) ||
                (direction == "right" && position.x > 0)
                    ? position.x
                    : 0,
            y:
                (direction == "top" && position.y < 0) ||
                (direction == "bottom" && position.y > 0)
                    ? position.y
                    : 0,
        };
    }, [touchPosition, startTouchPosition]);

    useEffect(() => {
        const { width, height } = drawerInformation;
        const percentage = +closingPercentage.replace("%", "") / 100;

        if (width == 0 || height == 0) {
            return;
        }

        if (
            [
                direction == "top" && -positionDelta.y >= height * percentage,
                direction == "left" && -positionDelta.x >= width * percentage,
                direction == "right" && positionDelta.x >= width * percentage,
                direction == "bottom" && positionDelta.y >= height * percentage,
            ].some(Boolean)
        ) {
            setIsOpen(false);
        }
    }, [positionDelta, drawerInformation.width, drawerInformation.height]);

    useEffect(() => {
        if (isOpen) {
            setTouchPosition(undefined);
            setStartTouchPosition(undefined);
            return;
        }

        setTimeout(() => {
            setTouchPosition(undefined);
            setStartTouchPosition(undefined);
        }, animationDuration);
    }, [isOpen]);

    const positionClassNames: Record<Direction, string> = {
        top: "bottom-auto px-12",
        left: "right-auto py-12",
        right: "left-auto py-12",
        bottom: "top-auto px-12",
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

    function TouchToCoordinate(touch: Touch): Coordinates {
        return { x: touch.clientX, y: touch.clientY };
    }

    return (
        <Modal
            id={id}
            ref={drawerRef}
            className={twMerge(
                "drawer bg-background-light translate-0 inset-0 touch-none rounded-none",
                positionClassNames[direction],
                className
            )}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            animationDuration={animationDuration}
            onTouchStart={(e) => (
                isOpen &&
                    setStartTouchPosition(TouchToCoordinate(e.touches.item(0))),
                onTouchEnd?.(e)
            )}
            onTouchMove={(e) => (
                isOpen &&
                    setTouchPosition(TouchToCoordinate(e.touches.item(0))),
                onTouchMove?.(e)
            )}
            onTouchEnd={(e) => (
                isOpen && setStartTouchPosition(undefined),
                isOpen && setTouchPosition(undefined),
                onTouchEnd?.(e)
            )}
            style={
                {
                    "--to-x": `calc(${directionCoordinates[direction].to.x}% + ${positionDelta.x}px)`,
                    "--to-y": `calc(${directionCoordinates[direction].to.y}% + ${positionDelta.y}px)`,
                    "--from-x": `calc(${directionCoordinates[direction].from.x}% + ${positionDelta.x}px)`,
                    "--from-y": `calc(${directionCoordinates[direction].from.y}% + ${positionDelta.y}px)`,
                } as CSSProperties
            }
            {...props}
        >
            {children}
        </Modal>
    );
};
