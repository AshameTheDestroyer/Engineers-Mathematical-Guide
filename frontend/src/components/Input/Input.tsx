import React, { useState } from "react";

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
        text: "text-foreground-normal",
        border: "border-foreground-normal",
        hover: "hover:border-foreground-normal-hover",
        focus: "focus:border-foreground-normal-active",
        label: {
            normal: "text-foreground-normal",
            focused: "text-foreground-normal-active",
            filled: "text-blue-500",
            error: "text-red-500",
        },
    },
    primary: {
        text: "text-primary-normal",
        border: "border-primary-normal",
        hover: "hover:border-primary-normal-hover",
        focus: "focus:border-primary-normal-active",
        label: {
            normal: "text-primary-normal",
            focused: "text-primary-normal-active",
            filled: "text-green-500",
            error: "text-red-500",
        },
    },
    secondary: {
        text: "text-secondary-normal",
        border: "border-secondary-normal",
        hover: "hover:border-secondary-normal-hover",
        focus: "focus:border-secondary-normal-active",
        label: {
            normal: "text-secondary-normal",
            focused: "text-secondary-normal-active",
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
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event);
        }
        setInternalValue(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isLabelUp =
        isFocused || (externalValue || internalValue).toString().trim() !== "";
    const variantStyle = variantClasses[variant];

    const getLabelColor = () => {
        if (error) return variantStyle.label.error;
        if (isFocused) return variantStyle.label.focused;
        if (isLabelUp) return variantStyle.label.filled;
        return variantStyle.label.normal;
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className="relative mb-4">
            <label
                className={`absolute left-4 transition-all duration-300 ${
                    isLabelUp ? "-top-6 text-base" : "top-1/2 -translate-y-1/2"
                } ${getLabelColor()}`}
            >
                {label}
            </label>
            <div className="relative">
                <input
                    type={inputType}
                    name={name}
                    value={externalValue ?? internalValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`peer block w-full rounded-md border px-4 py-2 ${variantStyle.border} ${variantStyle.hover} ${variantStyle.focus} focus:ring-2 ${
                        error
                            ? "border-red-500 text-red-800 outline-red-800"
                            : `${variantStyle.border} ${variantStyle.text}`
                    } ${className} ${type === "password" ? "pr-10" : ""}`}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${variantStyle.text}`}
                        onClick={togglePasswordVisibility}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                )}
            </div>
            {error && <p className="mt-1 text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
