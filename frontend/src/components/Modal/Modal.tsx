import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";
import { ComponentProps } from "@types_/ComponentProps";
import { MODAL_CONTAINER_ELEMENT, ROOT_ELEMENT } from "@/index";
import { IconButton, IconButtonProps } from "../IconButton/IconButton";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import {
    FC,
    useRef,
    Dispatch,
    useState,
    useEffect,
    CSSProperties,
    SetStateAction,
    HTMLAttributes,
    useImperativeHandle,
} from "react";

import cross_icon from "@/assets/icons/cross.svg";

import "./modal.css";

export type ModalProps = {
    isOpen: boolean;
    animationDuration?: number;
    isBackdropDisabled?: boolean;
    isAnimationDisabled?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
} & Either<
    {
        hasCloseButton?: false;
    },
    {
        hasCloseButton: true;
        closeButtonProps?: Partial<IconButtonProps>;
    }
> &
    ComponentProps<HTMLDivElement> &
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
    closeButtonProps,
    isBackdropDisabled,
    isAnimationDisabled,
    animationDuration = 400,
    ...props
}) => {
    const { direction } = useLocalization();
    const modalReference = useRef<HTMLDivElement>(null);
    const [isRendered, setIsRendered] = useState(isOpen);

    useImperativeHandle(ref, () => modalReference.current!);

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

    useEffect(() => {
        const shouldNotUpdate = [
            !isRendered,
            ROOT_ELEMENT == null,
            modalReference.current == null,
        ].some(Boolean);

        if (shouldNotUpdate) {
            return;
        }

        const modalElement = modalReference.current!;
        const focusableElements = modalElement.getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1)!;

        function OnModalTabKeyDown(e: KeyboardEvent) {
            if (e.key != "Tab") {
                return;
            }

            if (
                document.activeElement?.closest("#modal-container") !=
                MODAL_CONTAINER_ELEMENT
            ) {
                e.preventDefault();
                firstElement.focus();
                return;
            }

            if (e.shiftKey && document.activeElement == firstElement) {
                e.preventDefault();
                lastElement.focus();
                return;
            }

            if (!e.shiftKey && document.activeElement == lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }

        function OnModalEscapeKeyDown(e: KeyboardEvent) {
            if (e.key != "Escape") {
                return;
            }

            setIsRendered(false);
        }

        document.addEventListener("keydown", OnModalTabKeyDown);
        document.addEventListener("keydown", OnModalEscapeKeyDown);

        return () => {
            document.removeEventListener("keydown", OnModalTabKeyDown);
            document.removeEventListener("keydown", OnModalEscapeKeyDown);
        };
    }, [isRendered]);

    if (!isRendered || MODAL_CONTAINER_ELEMENT == null) {
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
                ref={modalReference}
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
                        variant="error"
                        thickness="thin"
                        {...closeButtonProps}
                        className={twMerge(
                            "absolute top-4 z-[1]",
                            direction == "rtl" ? "left-4" : "right-4",
                            closeButtonProps?.className
                        )}
                        icon={{
                            width: 20,
                            height: 20,
                            thickness: 2,
                            source: cross_icon,
                            stroke: "currentColor",
                            ...closeButtonProps?.icon,
                        }}
                        onClick={(e) => (
                            closeButtonProps?.onClick?.(e), setIsOpen(false)
                        )}
                    />
                )}
                {children}
            </div>
        </>,
        MODAL_CONTAINER_ELEMENT
    );
};
