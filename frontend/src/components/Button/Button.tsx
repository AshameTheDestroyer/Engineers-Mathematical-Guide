import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, FC } from "react";
import { ComponentEventProps, ComponentProps } from "@types_/ComponentProps";
import { useNavigate } from "react-router-dom";

export type ButtonProps = {
    link?: string;
    variant?: "primary" | "secondary" | "default";
    icon?: {
        source: string;
        placement: "left" | "right";
    };
} & ComponentProps &
    ComponentEventProps<
        HTMLButtonElement,
        ButtonHTMLAttributes<HTMLButtonElement>
    >;

export const Button: FC<ButtonProps> = ({
    link,
    onClick,
    children,
    className,
    variant = "default",
    ...props
}) => {
    const Navigator = useNavigate();

    const variantClassName = (() => {
        let className: string = "";
        switch (variant) {
            case "default":
                return (className = `
                        [&>[data-content]]:bg-background-normal [&>*]:border-gray-normal [&>[data-thickness]]:bg-gray-normal text-foreground-light
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
        <button
            className={twMerge(
                "relative isolate cursor-pointer active:[&>[data-content]]:translate-y-2",
                variantClassName,
                className
            )}
            role={link != null ? "link" : "button"}
            onClick={(e) => (onClick?.(e), link != null && Navigator(link))}
            {...props}
        >
            <div
                className="rounded-xl border-2 px-4 py-2 transition duration-200"
                data-content
            >
                {children}
            </div>
            <div
                className="absolute inset-0 -bottom-2 top-auto z-[-1] h-8 rounded-b-xl border-2 transition duration-200"
                data-thickness
            />
        </button>
    );
};
