import React from "react";
import { useState } from "react";

type Variant = "primary" | "secondary" | "default";

interface CustomInputProps {
    type: string;
    name: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    label: string;
    variant?: Variant;
}

const variantClasses = {
    default: {
        text: "text-red-50",
        border: "border-red-600",
        hover: "hover:bg-red-600",
        focus: "focus:border-blue-200 focus:text-blue-200",
        label: {
            normal: "text-gray-500",
            focused: "text-blue-500",
            filled: "text-blue-500",
            error: "text-red-500",
        },
    },
    primary: {
        text: "text-blue-50",
        border: "border-blue-600",
        hover: "hover:bg-blue-600",
        focus: "focus:border-green-400 focus:text-green-400",
        label: {
            normal: "text-gray-500",
            focused: "text-green-500",
            filled: "text-green-500",
            error: "text-red-500",
        },
    },
    secondary: {
        text: "text-gray-50",
        border: "border-gray-600",
        hover: "hover:bg-gray-600",
        focus: "focus:border-yellow-600 focus:text-yellow-600",
        label: {
            normal: "text-gray-500",
            focused: "text-yellow-600",
            filled: "text-yellow-600",
            error: "text-red-500",
        },
    },
};

const Input: React.FC<CustomInputProps> = ({
    type,
    name,
    value: externalValue,
    onChange,
    className,
    error,
    label,
    variant = "default",
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState<string | number>("");

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event);
        }
        setInternalValue(event.target.value);
    };

    const isLabelUp =
        isFocused || (externalValue || internalValue).toString().trim() !== "";
    const variantStyle = variantClasses[variant];

    // Determine label color based on state
    const getLabelColor = () => {
        if (error) return variantStyle.label.error;
        if (isFocused) return variantStyle.label.focused;
        if (isLabelUp) return variantStyle.label.filled;
        return variantStyle.label.normal;
    };

    return (
        <div className="relative mb-4">
            <label
                className={`absolute left-4 transition-all duration-300 ${
                    isLabelUp ? "-top-6 text-base" : "top-1/2 -translate-y-1/2"
                } ${getLabelColor()}`}
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={externalValue ?? internalValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`peer block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 ${
                    error
                        ? "border-red-500 text-red-800 outline-red-800"
                        : `border-gray-300 ${variantStyle.focus}`
                } ${className}`}
            />
            {type === "password" && (
                <div className="-ml-4 h-3 w-3 bg-black">show</div>
            )}

            {error && <p className="mt-1 text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
