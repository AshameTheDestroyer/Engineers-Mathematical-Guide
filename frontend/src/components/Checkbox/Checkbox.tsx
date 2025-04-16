import { createPortal } from "react-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { Input, InputProps } from "../Input/Input";
import React, { useEffect, useState } from "react";
import { IconButton } from "../IconButton/IconButton";

import check_icon from "@icons/check.svg";

export type CustomCheckboxProps = Omit<InputProps, "type"> & {
    variant?: Variant;
};

export const Checkbox: React.FC<CustomCheckboxProps> = ({
    id,
    ref,
    name,
    checked,
    onChange,
    className,
    variant = "default",
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(checked);
    const [buttonParent, setButtonParent] = useState<HTMLDivElement>();

    useEffect(() => {
        const buttonParent = document.querySelector(`#input-${name}`)
            ?.parentElement as HTMLDivElement;

        if (buttonParent == null) {
            return;
        }

        setButtonParent(buttonParent);
    }, []);

    return (
        <>
            <Input
                id={id}
                ref={ref}
                className={twMerge(
                    "[&>label]:translate-none flex flex-row-reverse place-items-center border-0 [&>input]:hidden [&>input]:w-auto [&>label]:pointer-events-auto [&>label]:static",
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
                        className="[&>div]:rounded-xl"
                        variant={variant}
                        icon={{
                            width: 16,
                            height: 16,
                            thickness: 2,
                            source: check_icon,
                            className: twJoin(
                                "scale-140",
                                isChecked ? "" : "[&>svg]:invisible"
                            ),
                        }}
                        onClick={(_e) =>
                            setIsChecked((isChecked) => !isChecked)
                        }
                    />,
                    buttonParent
                )}
        </>
    );
};
