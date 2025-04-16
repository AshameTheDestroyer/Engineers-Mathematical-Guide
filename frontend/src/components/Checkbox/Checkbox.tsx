import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { Input, InputProps } from "../Input/Input";
import { IconButton } from "../IconButton/IconButton";
import { FC, useEffect, useRef, useState } from "react";

import check_icon from "@icons/check.svg";

export type CustomCheckboxProps = Omit<InputProps, "type"> & {
    variant?: Variant;
    indeterminate?: boolean;
};

export const Checkbox: FC<CustomCheckboxProps> = ({
    id,
    ref,
    name,
    checked,
    onClick,
    onChange,
    className,
    indeterminate,
    variant = "default",
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(checked || indeterminate);
    const [isIndeterminate, setIsIndeterminate] = useState(indeterminate);

    const [buttonParent, setButtonParent] = useState<HTMLDivElement>();
    const buttonReference = useRef<HTMLButtonElement>(null);

    const variantClasses: Record<Variant, string> = {
        default: "var(--color-tertiary-light-active)",
        primary: "var(--color-primary-dark)",
        secondary: "var(--color-secondary-dark)",
    };

    const checkColour = !isChecked
        ? variantClasses[variant]
        : isIndeterminate && isChecked
          ? "currentColor"
          : undefined;

    useEffect(() => {
        const buttonParent = document.querySelector(`#input-${name}`)
            ?.parentElement as HTMLDivElement;

        if (buttonParent == null) {
            return;
        }

        setButtonParent(buttonParent);
    }, []);

    function ButtonOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onClick?.(e as any);
        setIsIndeterminate(false);
        setIsChecked((isChecked) => !isChecked);
    }

    return (
        <>
            <Input
                id={id}
                ref={ref}
                className={twMerge(
                    "flex flex-row-reverse place-items-start border-0 [&>input]:hidden [&>input]:w-auto [&>label]:pointer-events-auto [&>label]:static [&>label]:translate-y-1.5 [&>label]:text-wrap",
                    className
                )}
                name={name}
                type="checkbox"
                checked={isChecked}
                onChange={(e) => (
                    onChange?.(e), setIsChecked(e.target.checked)
                )}
                {...props}
            />
            {buttonParent != null &&
                createPortal(
                    <IconButton
                        ref={buttonReference}
                        className="[&>div]:rounded-xl"
                        variant={variant}
                        icon={{
                            width: 16,
                            height: 16,
                            thickness: 3,
                            fill: checkColour,
                            source: check_icon,
                            stroke: checkColour,
                            className: "scale-140",
                        }}
                        onClick={ButtonOnClick}
                    />,
                    buttonParent
                )}
        </>
    );
};
