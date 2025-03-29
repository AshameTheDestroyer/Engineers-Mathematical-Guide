import { Icon } from "../Icon/Icon";
import React, { useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import eye_open from "@icons/eye_open.svg";
import eye_closed from "@icons/eye_closed.svg";

export type CustomInputProps = {
    type: string;
    name: string;
    label: string;
    error?: string;
    variant?: Variant;
    className?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

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
    error,
    label,
    onChange,
    className,
    variant = "default",
    value: externalValue,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState<string | number>("");

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
                className={twMerge(
                    getLabelColor(),
                    "absolute left-4 transition-all duration-300",
                    isLabelUp ? "-top-6 text-base" : "top-1/2 -translate-y-1/2"
                )}
            >
                {label}
            </label>
            <div className="relative">
                <input
                    className={twMerge(
                        variantStyle.focus,
                        variantStyle.hover,
                        variantStyle.border,
                        type === "password" ? "pr-10" : "",
                        "peer block w-full rounded-md border px-4 py-2 focus:ring-2",
                        error
                            ? "border-red-500 text-red-800 outline-red-800"
                            : variantStyle.border + " " + variantStyle.text,
                        className
                    )}
                    name={name}
                    type={inputType}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    value={externalValue ?? internalValue}
                />
                {type === "password" && (
                    <button
                        className={twJoin(
                            variantStyle.text,
                            "absolute right-3 top-1/2 -translate-y-1/2"
                        )}
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        <Icon source={showPassword ? eye_closed : eye_open} />
                    </button>
                )}
            </div>
            {error && <p className="mt-1 text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
