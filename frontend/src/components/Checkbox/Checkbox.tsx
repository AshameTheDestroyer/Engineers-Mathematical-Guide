import { twMerge } from "tailwind-merge";
import { FC } from "react";
import { Icon, IconProps } from "@components/Icon/Icon";
import { ComponentProps } from "@types_/ComponentProps";

export type CheckboxProps = {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    isThick?: boolean;
    variant?: Variant;
    icon?: IconProps & {
        placement: "left" | "right";
    };
} & ComponentProps;

export const Checkbox: FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    isThick,
    icon,
    className,
    variant = "default",
    ...props
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
        <label
            className={twMerge(
                variantClassName,
                "relative inline-flex cursor-pointer items-center gap-2",
                className
            )}
        >
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                {...props}
            />
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

            {label && <span>{label}</span>}

            {icon != null && (
                <Icon
                    {...icon}
                    className={twMerge(
                        icon.className,
                        icon.placement == "right" ? "order-1" : ""
                    )}
                />
            )}
        </label>
    );
};

export default Checkbox;
