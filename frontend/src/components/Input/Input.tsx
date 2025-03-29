import { Icon } from "../Icon/Icon";
import { twJoin, twMerge } from "tailwind-merge";
import React, { InputHTMLAttributes, useState } from "react";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import eye_open from "@icons/eye_open.svg";
import eye_closed from "@icons/eye_closed.svg";

export type CustomInputProps = {
    label: string;
    error?: string;
    variant?: Variant;
} & ChildlessComponentProps &
    InputHTMLAttributes<HTMLInputElement>;

const variantClasses = {
    default: {
        text: "text-foreground-normal",
        border: "border-foreground-normal",
        hover: "hover:border-foreground-normal-hover",
        focus: "focus:border-foreground-normal-active",
        label: {
            normal: "text-foreground-normal",
            focused: "text-foreground-normal-active",
            filled: "text-foreground-light",
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
            filled: "text-primary-normal",
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
    onBlur,
    onFocus,
    onChange,
    className,
    value: value_,
    variant = "default",
    ...props
}) => {
    const [value, setValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const variantClass = variantClasses[variant];
    const isLabelUp =
        isFocused || (value_ ?? value).toString().trimAll() !== "";

    const getLabelColor = () => {
        if (error) return variantClass.label.error;
        if (isLabelUp) return variantClass.label.filled;
        if (isFocused) return variantClass.label.focused;
        return variantClass.label.normal;
    };

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
                        type == "password" ? "pr-10" : "",
                        "peer block w-full rounded-md border px-4 py-2 focus:ring-2",
                        error
                            ? "border-red-500 text-red-800 outline-red-800"
                            : variantClass.border + " " + variantClass.text,
                        className
                    )}
                    name={name}
                    value={value_ ?? value}
                    type={type == "password" && showPassword ? "text" : type}
                    onBlur={(e) => (setIsFocused(false), onBlur?.(e))}
                    onFocus={(e) => (setIsFocused(true), onFocus?.(e))}
                    onChange={(e) => (setValue(e.target.value), onChange?.(e))}
                    {...props}
                />
                {type == "password" && (
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
