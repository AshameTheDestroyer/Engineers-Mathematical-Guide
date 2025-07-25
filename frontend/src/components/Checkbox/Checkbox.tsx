import { twMerge } from "tailwind-merge";
import { Input, InputProps } from "../Input/Input";
import { IconButton } from "../IconButton/IconButton";
import { FC, useEffect, useRef, useState } from "react";

import check_icon from "@icons/check_filled.svg";

export type CheckboxProps = Omit<InputProps, "type" | "placeholder"> & {
    variant?: Variant;
    indeterminate?: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({
    id,
    ref,
    name,
    value,
    checked,
    onClick,
    onFocus,
    onChange,
    className,
    indeterminate,
    variant = "default",
    ...props
}) => {
    const [isIndeterminate, setIsIndeterminate] = useState(indeterminate);
    const [isChecked, setIsChecked] = useState(
        (checked || indeterminate) ?? false
    );

    const buttonReference = useRef<HTMLButtonElement>(null);

    const variantClasses: Record<Variant, string> = {
        default: "var(--color-tertiary-light-active)",
        primary: "var(--color-primary-dark)",
        secondary: "var(--color-secondary-dark)",
        information: "var(--color-vibrant-blue-dark)",
        warning: "var(--color-vibrant-yellow-dark)",
        success: "var(--color-vibrant-green-dark)",
        error: "var(--color-vibrant-red-dark)",
        epic: "var(--color-vibrant-purple-dark)",
    };

    const checkColour = !isChecked
        ? variantClasses[variant]
        : isIndeterminate && isChecked
          ? "currentColor"
          : undefined;

    useEffect(() => {
        const inputElement = document.querySelector(`#input-${name}`);

        if (inputElement == null || buttonReference.current == null) {
            return;
        }

        inputElement.insertAdjacentElement("afterend", buttonReference.current);
        buttonReference.current.classList.remove("hidden");
    }, []);

    function ButtonOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onClick?.(e as any);
        setIsIndeterminate(false);
        setIsChecked((isChecked) => !isChecked);
        onChange?.({ target: { checked: !isChecked } } as any);
    }

    return (
        <>
            <Input
                id={id}
                ref={ref}
                className={twMerge(
                    "grid grid-cols-[auto_1fr] place-items-baseline justify-items-start gap-[0_calc(var(--spacing)*4)] rounded-none border-0",
                    "[&>input]:absolute [&>input]:left-2.5 [&>input]:top-1/2 [&>input]:w-auto [&>input]:-translate-y-1/2 [&>input]:opacity-0",
                    "[&>label]:translate-0 [&>label>*]:overflow-auto [&>label]:pointer-events-auto [&>label]:static [&>label]:inset-auto [&>label]:h-auto [&>label]:text-clip [&>label]:text-wrap [&>label]:p-0",
                    "[&_[data-error-message]]:col-start-2 [&_[data-error-message]]:w-full [&_[data-error-message]]:px-0",
                    className
                )}
                name={name}
                type="checkbox"
                checked={isChecked}
                onChange={(e) => (
                    onChange?.(e), setIsChecked(e.target.checked)
                )}
                onFocus={(e) => (
                    onFocus?.(e), buttonReference.current?.focus()
                )}
                {...props}
            />
            <IconButton
                ref={buttonReference}
                className="hidden [&>div]:rounded-xl"
                variant={variant}
                disabled={props.disabled}
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
            />
        </>
    );
};
