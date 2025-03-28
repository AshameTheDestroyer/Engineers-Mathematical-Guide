import React from "react";
import { useState } from "react";

interface CustomInputProps {
    type: string;
    name: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    label: string;
    variant: string;
}

const Input: React.FC<CustomInputProps> = ({
    type,
    name,
    value,
    onChange,
    className,
    error,
    label,
    variant = "default",
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const isLabelUp = isFocused || (value && value.toString().trim() !== "");

    return (
        <div className="relative mb-4">
            <label
                className={`absolute left-4 text-gray-500 transition-all duration-300 peer-focus:text-blue-500 ${
                    isLabelUp ? "-top-6 text-base" : "top-1/2 -translate-y-1/2"
                }`}
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`peer block w-full rounded-md border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    error
                        ? "border-red-500 text-red-800 outline-red-800"
                        : "border-gray-300"
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
