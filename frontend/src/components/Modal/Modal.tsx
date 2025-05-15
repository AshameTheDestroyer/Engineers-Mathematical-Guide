import { createPortal } from "react-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { IconButton } from "../IconButton/IconButton";
import { ComponentProps } from "@types_/ComponentProps";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import {
    FC,
    Dispatch,
    useState,
    useEffect,
    CSSProperties,
    SetStateAction,
    HTMLAttributes,
} from "react";

import cross_icon from "@/assets/icons/cross.svg";

import "./modal.css";

export type ModalProps = {
    isOpen: boolean;
    hasCloseButton?: boolean;
    animationDuration?: number;
    isBackdropDisabled?: boolean;
    isAnimationDisabled?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentProps<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>;

export const Modal: FC<ModalProps> = ({
    id,
    ref,
    isOpen,
    children,
    className,
    setIsOpen,
    style: _style,
    hasCloseButton,
    isBackdropDisabled,
    isAnimationDisabled,
    animationDuration = 400,
    ...props
}) => {
    const { direction } = useLocalization();
    const [isRendered, setIsRendered] = useState(isOpen);

    const style = {
        "--animation-duration": `${animationDuration}ms`,
        ..._style,
    } as CSSProperties;

    useEffect(() => {
        if (isAnimationDisabled || isOpen) {
            setIsRendered(isOpen);
            return;
        }

        const timeoutID = setTimeout(() => {
            setIsRendered(false);
        }, animationDuration);

        return () => {
            clearTimeout(timeoutID);
        };
    }, [isOpen]);

    if (!isRendered) {
        return <></>;
    }

    return createPortal(
        <>
            {!isBackdropDisabled && (
                <div
                    className={twMerge(
                        "modal-backdrop fixed inset-0 bg-black/30",
                        !isAnimationDisabled && "animated",
                        isOpen && "open"
                    )}
                    style={style}
                    onClick={(_e) => setIsOpen(false)}
                />
            )}
            <div
                id={id}
                ref={ref}
                className={twMerge(
                    "modal -translate-1/2 fixed left-1/2 top-1/2 z-50 flex min-h-12 min-w-12 flex-col rounded-2xl p-8",
                    !isAnimationDisabled && "animated",
                    isOpen && "open",
                    className
                )}
                style={style}
                {...props}
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
