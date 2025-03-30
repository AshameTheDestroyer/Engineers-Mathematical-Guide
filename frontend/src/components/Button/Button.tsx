import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { ButtonHTMLAttributes, FC } from "react";
import { Icon, IconProps } from "@components/Icon/Icon";
import { ComponentProps } from "@types_/ComponentProps";

export type ButtonProps = {
    link?: string;
    isThick?: boolean;
    variant?: Variant;
    icon?: IconProps & {
        placement: "left" | "right";
    };
} & ComponentProps &
    ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
    link,
    icon,
    isThick,
    onClick,
    children,
    className,
    variant = "default",
    ...props
}) => {
    const Navigator = useNavigate();

    const variantClassNames: VariantClassNames = {
        default: {
            idle: "[&>[data-content]]:bg-tertiary-light [&>*]:border-tertiary-light-active [&>[data-thickness]]:bg-tertiary-light-active text-tertiary-normal",
            hover: "[&:where(&:hover,&:focus-within)]:[&>[data-content]]:bg-tertiary-light-hover [&:where(&:hover,&:focus-within)]:text-tertiary-normal-hover [&:where(&:hover,&:focus-within)]:[&>[data-thickness]]:bg-tertiary-light-active [&:where(&:hover,&:focus-within)]:[&>*]:border-tertiary-light-active",
            active: "active:[&>[data-content]]:bg-tertiary-light-active active:text-tertiary-normal-active active:[&>[data-thickness]]:bg-tertiary-light-active active:[&>*]:border-tertiary-normal-hover",
        },
        primary: {
            idle: "[&>[data-content]]:bg-primary-normal [&>*]:border-primary-dark text-primary-light font-bold [&>[data-thickness]]:bg-primary-dark",
            hover: "[&:where(&:hover,&:focus-within)]:[&>[data-content]]:bg-primary-normal-hover [&:where(&:hover,&:focus-within)]:text-primary-light-hover [&:where(&:hover,&:focus-within)]:[&>[data-thickness]]:bg-primary-dark-hover [&:where(&:hover,&:focus-within)]:[&>*]:border-primary-dark-hover",
            active: "active:[&>[data-content]]:bg-primary-normal-active active:text-primary-light-active active:[&>[data-thickness]]:bg-primary-dark-active active:[&>*]:border-primary-dark-active",
        },
        secondary: {
            idle: "[&>[data-content]]:bg-secondary-normal [&>*]:border-secondary-dark text-secondary-light font-bold [&>[data-thickness]]:bg-secondary-dark",
            hover: "[&:where(&:hover,&:focus-within)]:[&>[data-content]]:bg-secondary-normal-hover [&:where(&:hover,&:focus-within)]:text-secondary-light-hover [&:where(&:hover,&:focus-within)]:[&>[data-thickness]]:bg-secondary-dark-hover [&:where(&:hover,&:focus-within)]:[&>*]:border-secondary-dark-hover",
            active: "active:[&>[data-content]]:bg-secondary-normal-active active:text-secondary-light-active active:[&>[data-thickness]]:bg-secondary-dark-active active:[&>*]:border-secondary-dark-active",
        },
    };

    return (
        <button
            className={twMerge(
                Object.values(variantClassNames[variant]),
                "relative isolate cursor-pointer",
                isThick
                    ? "active:[&>[data-content]]:translate-y-2"
                    : "active:[&>1[data-content]]:translate-y-1",
                className
            )}
            type="button"
            role={link != null ? "link" : "button"}
            onClick={(e) => (onClick?.(e), link != null && Navigator(link))}
            {...props}
        >
            <div
                className={twMerge(
                    isThick ? "px-4 py-2" : "px-2 py-1",
                    "flex h-full place-content-center place-items-center gap-2 rounded-xl border-2 transition duration-200"
                )}
                data-content
            >
                {icon != null && (
                    <Icon
                        width={24}
                        height={24}
                        {...icon}
                        className={twMerge(
                            icon.className,
                            icon.placement == "right" ? "order-1" : ""
                        )}
                    />
                )}
                {children}
            </div>
            <div
                className={twMerge(
                    isThick ? "-bottom-2 h-8" : "-bottom-1 h-6",
                    "absolute inset-x-0 top-auto z-[-1] rounded-b-xl border-2 transition duration-200"
                )}
                data-thickness
            />
        </button>
    );
};
