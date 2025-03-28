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
    variant?: string;
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
        <div className="mb-4">
            <label className="bg-primary-dark-active text-primary-light ml-10 rounded-3xl p-2 shadow-lg">
                {label}
            </label>
            <input
                type={type}
                name={name}
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
