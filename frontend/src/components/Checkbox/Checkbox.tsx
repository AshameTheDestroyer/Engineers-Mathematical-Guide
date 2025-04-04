import React from "react";
import { useState } from "react";
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
        let className: Array<string> = [];
        switch (variant) {
            case "default":
                return (className = [
                    "bg-foreground-dark",
                    "text-foreground-normal",
                    "border-foreground-normal border-2",
                ]);
            case "primary":
                return (className = [
                    "bg-primary-dark",
                    "text-primary-normal",
                    "border-primary-normal border-2",
                ]);
            case "secondary":
                return (className = [
                    "bg-secondary-dark",
                    "text-secondary-normal",
                    "border-secondary-normal border-2",
                ]);
            default:
                return className;
        }
    })();

    return (
        <label className="flex h-10 cursor-pointer items-center">
            <input type="checkbox" className="index hidden" />
            <div
                className={twMerge(
                    variantClass[0],
                    `transition-h relative flex w-6 rounded-[0.5rem] duration-300`,
                    isChecked ? "h-6" : "h-7"
                )}
                onClick={handleToggle}
            >
                <div
                    className={twMerge(
                        variantClass[0],
                        variantClass[2],
                        `absolute flex h-6 w-6 items-center justify-center rounded-[0.5rem] transition-colors duration-300`,
                        className,
                        isChecked
                            ? `${variantClass[0]} border-transparent`
                            : "bg-white"
                    )}
                >
                    {isChecked && <span className="text-white">✓</span>}
                </div>
            </div>
            <span className="ml-2 font-medium">
                {label}
                <a className={`ml-1 ${variantClass[1]} underline`} href={link}>
                    {linkText}
                </a>
            </span>
        </label>
    );
};
export default Checkbox;
