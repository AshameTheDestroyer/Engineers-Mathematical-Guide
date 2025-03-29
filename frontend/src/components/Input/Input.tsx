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
    value?: string;
    variant?: Variant;
    className?: string;
    placeholder?: string;
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
    value: value_,
    variant = "default",
}) => {
    const [value, setValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event);
        }
        setValue(event.target.value);
    };

    const variantClass = variantClasses[variant];
    const isLabelUp = isFocused || (value_ ?? value).trimAll() !== "";

    const getLabelColor = () => {
        if (error) return variantClass.label.error;
        if (isLabelUp) return variantClass.label.filled;
        if (isFocused) return variantClass.label.focused;
        return variantClass.label.normal;
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className="relative mb-4">
            <label
                className={twJoin(
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
                        variantClass.focus,
                        variantClass.hover,
                        variantClass.border,
                        type === "password" ? "pr-10" : "",
                        "peer block w-full rounded-md border px-4 py-2 focus:ring-2",
                        error
                            ? "border-red-500 text-red-800 outline-red-800"
                            : variantClass.border + " " + variantClass.text,
                        className
                    )}
                    name={name}
                    type={inputType}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    value={value_ ?? value}
                />
                {type === "password" && (
                    <button
                        className={twJoin(
                            variantClass.text,
                            "absolute right-3 top-1/2 -translate-y-1/2"
                        )}
                        type="button"
                        title={
                            showPassword ? "Hide password." : "Show password."
                        }
                        aria-label={
                            showPassword ? "Hide password." : "Show password."
                        }
                        onClick={(_e) => setShowPassword(!showPassword)}
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
