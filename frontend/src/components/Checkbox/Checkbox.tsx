import { twMerge } from "tailwind-merge";
import { FC } from "react";
import { Icon, IconProps } from "@components/Icon/Icon";
import { ComponentProps } from "@types_/ComponentProps";

export type CheckboxProps = {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    isThick?: boolean;
    link?: string;
    linkText?: string;
} & ComponentProps;

export const Checkbox: FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    isThick,
    className,
    link,
    linkText,
    ...props
}) => {
    return (
        <label
            className={twMerge(
                "relative inline-flex cursor-pointer items-center gap-2",
                className
            )}
        >
            {/* Hidden native checkbox */}
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                {...props}
            />
            {/* Styled checkbox */}
            <div
                className={twMerge(
                    isThick ? "h-8 w-8" : "h-6 w-6",
                    "flex items-center justify-center rounded border-2 transition duration-200",
                    checked
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 bg-white"
                )}
                data-content
            >
                {checked && (
                    <svg
                        className="h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L7 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>

            {/* Label with optional link */}
            {label && (
                <span>
                    {label}
                    {link && linkText && (
                        <a href={link} className="ml-2 text-blue-600 underline">
                            {linkText}
                        </a>
                    )}
                </span>
            )}
        </label>
    );
};

export default Checkbox;
