import React from "react";
import { useState } from "react";

interface CustomCheckboxProps {
    value?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
    label: string;
    linkText: string;
    link: string;
    variant?: string;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
    onChange,
    className,
    label,
    link,
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

    return (
        <label className="flex cursor-pointer items-center">
            <div
                className={`rounded-1xl border-primary-dark flex h-6 w-6 items-center justify-center border-2 transition-colors duration-300 ${className} ${
                    isChecked
                        ? "bg-primary-normal border-transparent"
                        : "bg-white"
                }`}
                onClick={handleToggle}
            >
                {isChecked && <span className="text-white">✓</span>}
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
