import React from "react";

interface CustomInputProps {
    type: string;
    name: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    label: string;
}

const Input: React.FC<CustomInputProps> = ({
    type,
    name,
    placeholder,
    value,
    onChange,
    className,
    error,
    label,
}) => {
    return (
        <div className="mb-4">
            <label className="bg-primary-dark-active text-primary-light ml-10 rounded-3xl p-2 shadow-lg">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`block w-full rounded-md border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    error
                        ? "border-red-500 text-red-800 outline-red-800"
                        : "border-gray-300"
                } ${className}`}
            />
            {type === "password" && (
                <div className="-ml-4 h-3 w-3 bg-black">show</div>
            )}

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
