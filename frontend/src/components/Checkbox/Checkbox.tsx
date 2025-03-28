import React from "react";
import { useState } from "react";

interface CustomCheckboxProps {
    name: string;
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
    variant,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onChange) {
            onChange(newCheckedState);
        }
    };

    const variantClassName = (() => {
        let className: string = "";
        switch (variant) {
            case "default":
                return (className = `
                        [&>[data-content]]:bg-white [&>*]:border-gray-normal [&>[data-thickness]]:bg-gray-normal text-foreground-light
                        [&:where(&:hover,&:focus-within)]:[&>[data-content]]:bg-gray-normal [&:where(&:hover,&:focus-within)]:text-foreground-light-hover [&:where(&:hover,&:focus-within)]:[&>[data-thickness]]:bg-gray-normal-hover [&:where(&:hover,&:focus-within)]:[&>*]:border-gray-normal-hover
                        active:[&>[data-content]]:bg-gray-normal active:text-foreground-light-active active:[&>[data-thickness]]:bg-gray-normal-active active:[&>*]:border-gray-normal-active
                    `);
            case "primary":
                return (className = `
                        [&>[data-content]]:bg-primary-normal [&>*]:border-primary-dark text-primary-light font-bold [&>[data-thickness]]:bg-primary-dark
                        [&:where(&:hover,&:focus-within)]:[&>[data-content]]:bg-primary-normal-hover [&:where(&:hover,&:focus-within)]:text-primary-light-hover [&:where(&:hover,&:focus-within)]:[&>[data-thickness]]:bg-primary-dark-hover [&:where(&:hover,&:focus-within)]:[&>*]:border-primary-dark-hover
                        active:[&>[data-content]]:bg-primary-normal-active active:text-primary-light-active active:[&>[data-thickness]]:bg-primary-dark-active active:[&>*]:border-primary-dark-active
                    `);
            case "secondary":
                return (className = `
                        [&>[data-content]]:bg-secondary-normal [&>*]:border-secondary-dark text-secondary-light font-bold [&>[data-thickness]]:bg-secondary-dark
                        [&:where(&:hover,&:focus-within)]:[&>[data-content]]:bg-secondary-normal-hover [&:where(&:hover,&:focus-within)]:text-secondary-light-hover [&:where(&:hover,&:focus-within)]:[&>[data-thickness]]:bg-secondary-dark-hover [&:where(&:hover,&:focus-within)]:[&>*]:border-secondary-dark-hover
                        active:[&>[data-content]]:bg-secondary-normal-active active:text-secondary-light-active active:[&>[data-thickness]]:bg-secondary-dark-active active:[&>*]:border-secondary-dark-active
                    `);
            default:
                return className;
        }
    })();

    return (
        <label className="flex cursor-pointer items-center">
            <div
                className={`rounded-1xl border-primary-dark flex h-6 w-6 items-center justify-center border-2 transition-colors duration-300 ${variant} ${className} ${
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
