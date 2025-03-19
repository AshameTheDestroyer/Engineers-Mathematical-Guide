import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, FC } from "react";
import { ComponentEventProps, ComponentProps } from "@types_/ComponentProps";

export type ButtonProps = {
    link?: string;
    variant?: "primary" | "secondary" | "default";
    icon?: {
        place: "left" | "right";
        source: string;
    };
} & ComponentProps &
    ComponentEventProps<
        HTMLButtonElement,
        ButtonHTMLAttributes<HTMLButtonElement>
    >;

export const Button: FC<ButtonProps> = ({
    className,
    children,
    variant = "default",
    ...props
}) => {
    const variantClassName = (() => {
        let className: string = "";
        switch (variant) {
            case "default":
                return (className = `
                        [&>div:first-child]:bg-background-normal [&>div]:border-gray-normal [&>div:last-child]:bg-gray-normal text-foreground-light
                        [&:where(&:hover,&:focus-within)]:[&>div:first-child]:bg-gray-normal [&:where(&:hover,&:focus-within)]:text-foreground-light-hover [&:where(&:hover,&:focus-within)]:[&>div:last-child]:bg-gray-normal-hover [&:where(&:hover,&:focus-within)]:[&>div]:border-gray-normal-hover
                        active:[&>div:first-child]:bg-gray-normal active:text-foreground-light-active active:[&>div:last-child]:bg-gray-normal-active active:[&>div]:border-gray-normal-active
                    `);
            case "primary":
                return (className = `
                        [&>div:first-child]:bg-primary-normal [&>div]:border-primary-dark text-primary-light font-bold [&>div:last-child]:bg-primary-dark
                        [&:where(&:hover,&:focus-within)]:[&>div:first-child]:bg-primary-normal-hover [&:where(&:hover,&:focus-within)]:text-primary-light-hover [&:where(&:hover,&:focus-within)]:[&>div:last-child]:bg-primary-dark-hover [&:where(&:hover,&:focus-within)]:[&>div]:border-primary-dark-hover
                        active:[&>div:first-child]:bg-primary-normal-active active:text-primary-light-active active:[&>div:last-child]:bg-primary-dark-active active:[&>div]:border-primary-dark-active
                    `);
            case "secondary":
                return (className = `
                        [&>div:first-child]:bg-secondary-normal [&>div]:border-secondary-dark text-secondary-light font-bold [&>div:last-child]:bg-secondary-dark
                        [&:where(&:hover,&:focus-within)]:[&>div:first-child]:bg-secondary-normal-hover [&:where(&:hover,&:focus-within)]:text-secondary-light-hover [&:where(&:hover,&:focus-within)]:[&>div:last-child]:bg-secondary-dark-hover [&:where(&:hover,&:focus-within)]:[&>div]:border-secondary-dark-hover
                        active:[&>div:first-child]:bg-secondary-normal-active active:text-secondary-light-active active:[&>div:last-child]:bg-secondary-dark-active active:[&>div]:border-secondary-dark-active
                    `);
            default:
                return className;
        }
    })();

    return (
        <button
            className={twMerge(
                "relative isolate cursor-pointer active:[&>div:first-child]:translate-y-2",
                variantClassName,
                className
            )}
            {...props}
        >
            <div className="rounded-xl border-2 px-4 py-2 transition duration-200">
                {children}
            </div>
            <div className="absolute inset-0 -bottom-2 top-auto z-[-1] h-8 rounded-b-xl border-2 transition duration-200" />
        </button>
    );
};
