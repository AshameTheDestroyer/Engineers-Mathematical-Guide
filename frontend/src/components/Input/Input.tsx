import { Icon } from "../Icon/Icon";
import { twJoin, twMerge } from "tailwind-merge";
import React, { InputHTMLAttributes, useState } from "react";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import eye_open from "@icons/eye_open.svg";
import eye_closed from "@icons/eye_closed.svg";

export type CustomInputProps = {
    label: string;
    variant?: Variant;
} & ChildlessComponentProps &
    InputHTMLAttributes<HTMLInputElement>;

// const variantClasses = {
//     default: {
//         text: "text-foreground-normal",
//         border: "border-foreground-normal",
//         hover: "hover:border-foreground-normal-hover",
//         focus: "focus:border-foreground-normal-active",
//         label: {
//             normal: "text-foreground-normal",
//             focused: "text-foreground-normal-active",
//             filled: "text-foreground-light",
//         },
//     },
//     primary: {
//         text: "text-primary-normal",
//         border: "border-primary-normal",
//         hover: "hover:border-primary-normal-hover",
//         focus: "focus:border-primary-normal-active",
//         label: {
//             normal: "text-primary-normal",
//             focused: "text-primary-normal-active",
//             filled: "text-primary-normal",
//         },
//     },
//     secondary: {
//         text: "text-secondary-normal",
//         border: "border-secondary-normal",
//         hover: "hover:border-secondary-normal-hover",
//         focus: "focus:border-secondary-normal-active",
//         label: {
//             normal: "text-secondary-normal",
//             focused: "text-secondary-normal-active",
//             filled: "text-yellow-600",
//         },
//     },
// };

const Input: React.FC<CustomInputProps> = ({
    type,
    name,
    label,
    onBlur,
    onFocus,
    onChange,
    className,
    placeholder,
    value: value_,
    variant = "default",
    ...props
}) => {
    const [value, setValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // const variantClass = variantClasses[variant];
    const isLabelUp = isFocused || (value_ ?? value).toString().trimAll() != "";

    return (
        <div className="relative">
            <div className="relative">
                <input
                    className={twMerge(
                        "peer block w-full rounded-md border-2 px-4 py-2 focus:ring-2",
                        (type != "password" || showPassword) && "text-ellipsis",
                        type == "password" && "pr-12",
                        className
                    )}
                    name={name}
                    value={value_ ?? value}
                    placeholder={isFocused ? placeholder : ""}
                    type={type == "password" && showPassword ? "text" : type}
                    onBlur={(e) => (setIsFocused(false), onBlur?.(e))}
                    onFocus={(e) => (setIsFocused(true), onFocus?.(e))}
                    onChange={(e) => (setValue(e.target.value), onChange?.(e))}
                    {...props}
                />
                {type == "password" && (
                    <button
                        className={twJoin(
                            // variantClass.text,
                            "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
            <label
                className={twMerge(
                    isLabelUp ? "top-0 px-2" : "top-1/2",
                    "pointer-events-none absolute left-4 -translate-y-1/2 bg-white transition-all duration-200"
                )}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
