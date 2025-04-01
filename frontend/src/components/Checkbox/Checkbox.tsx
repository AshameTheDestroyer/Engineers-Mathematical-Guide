import React from "react";
import { useState } from "react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type CustomCheckboxProps = {
    value?: boolean;
    onChange?: (checked: boolean) => void;
    label: string;
    linkText?: string;
    className?: string;
    link?: string;
    isThick?: boolean;
    variant?: Variant;
};

const Checkbox: React.FC<CustomCheckboxProps> = ({
    onChange,
    label,
    link,
    className,
    linkText,
    variant = "default",
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onChange) {
            onChange(newCheckedState);
        }
    };

    const variantClass = (() => {
        let className: string = "";
        switch (variant) {
            case "default":
                return (className = `bg-foreground-dark`);
            case "primary":
                return (className = `bg-primary-dark`);
            case "secondary":
                return (className = `bg-secondary-dark`);
            default:
                return className;
        }
    })();

    return (
        <label className="flex h-10 cursor-pointer items-center">
            <div
                className={twMerge(
                    variantClass,
                    `transition-h relative flex w-6 rounded-[0.5rem] duration-300`,
                    isChecked ? "h-6" : "h-8"
                )}
                onClick={handleToggle}
            >
                <div
                    className={twMerge(
                        variantClass,
                        `absolute flex h-6 w-6 items-center justify-center rounded-[0.5rem] border-2 transition-colors duration-300`,
                        className,
                        isChecked
                            ? `${variantClass} border-transparent`
                            : "bg-white"
                    )}
                >
                    {isChecked && <span className="text-white">✓</span>}
                </div>
            </div>
            <span className="ml-2 font-medium">
                {label}
                <a className="ml-1 text-blue-600" href={link}>
                    {linkText}
                </a>
            </span>
        </label>
    );
};
export default Checkbox;
