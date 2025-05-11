import { useNavigate } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, FC } from "react";
import { Icon, IconProps } from "@components/Icon/Icon";
import { ComponentProps } from "@types_/ComponentProps";

export type ButtonProps = {
    link?: string;
    variant?: Variant;
    thickness?: Thickness;
    doesTextGrow?: boolean;
    icon?: IconProps & {
        placement: "left" | "right";
    };
} & ComponentProps<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
    id,
    link,
    icon,
    onClick,
    children,
    disabled,
    className,
    doesTextGrow,
    variant = "default",
    thickness = "normal",
    ...props
}) => {
    const Navigate = useNavigate();

    const variantClassNames: VariantClassNames = {
        default: {
            idle: "[&>[data-content]]:bg-tertiary-light [&>*]:border-tertiary-light-active [&>[data-thickness]]:bg-tertiary-light-active text-tertiary-normal",
            hover: "[&:where(&:hover,&:focus-within)]:[&>[data-content]]:bg-tertiary-light-hover [&:where(&:hover,&:focus-within)]:text-tertiary-normal-hover [&:where(&:hover,&:focus-within)]:[&>[data-thickness]]:bg-tertiary-light-active [&:where(&:hover,&:focus-within)]:[&>*]:border-tertiary-light-active",
            active: "active:[&>[data-content]]:bg-tertiary-light-active active:text-tertiary-normal-active active:[&>[data-thickness]]:bg-tertiary-normal-active active:[&>*]:border-tertiary-normal-hover",
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
            id={id}
            className={twMerge(
                "relative isolate",
                Object.values(variantClassNames[variant]),
                disabled
                    ? "grayscale-25 saturate-75 contrast-85 pointer-events-none cursor-auto"
                    : "cursor-pointer",
                thickness == "thick"
                    ? "active:[&>[data-content]]:translate-y-1.5"
                    : thickness == "thin"
                      ? "active:[&>[data-content]]:translate-y-0.5"
                      : "active:[&>[data-content]]:translate-y-1",
                className
            )}
            type="button"
            disabled={disabled}
            role={link != null ? "link" : "button"}
            onClick={(e) => (onClick?.(e), link != null && Navigate(link))}
            {...props}
        >
            <div
                data-content
                className={twMerge(
                    thickness == "thick"
                        ? "px-4 py-2"
                        : thickness == "thin"
                          ? "px-1 py-0.5"
                          : "px-2 py-1",
                    "flex h-full w-full place-content-center place-items-center gap-2 rounded-xl border-2 transition duration-200"
                )}
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
                {children != null && (
                    <div
                        className={twJoin(
                            doesTextGrow ? "grow" : "",
                            icon?.placement == "left"
                                ? "text-end"
                                : "text-start"
                        )}
                    >
                        {children}
                    </div>
                )}
            </div>
            <div
                data-thickness
                className={twJoin(
                    "absolute inset-x-0 top-auto z-[-1] rounded-b-xl border-2 transition duration-200",
                    thickness == "thick"
                        ? "-bottom-1.5 h-8"
                        : thickness == "thin"
                          ? "-bottom-0.5 h-4"
                          : "-bottom-1 h-6"
                )}
            />
        </button>
    );
};
