import { twMerge } from "tailwind-merge";
import { FC, InputHTMLAttributes } from "react";
import { Typography } from "../Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type CustomInputProps = {
    name: string;
    label?: string;
    variant?: Variant;
} & ChildlessComponentProps<HTMLDivElement> &
    InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<CustomInputProps> = ({
    id,
    ref,
    name,
    label,
    className,
    placeholder,
    variant = "default",
    ...props
}) => {
    const variantClassNames: VariantClassNames = {
        default: {
            idle: "border-tertiary-light-active [&>input]:placeholder-tertiary-light-active",
            hover: "hover:border-tertiary-normal",
            active: "focus-within:border-tertiary-normal-active",
        },
        primary: {
            idle: "border-primary-normal [&>input]:placeholder-primary-normal",
            hover: "hover:border-primary-dark [&>input]:placeholder-primary-dark",
            active: "focus-within:border-primary-dark-active [&>input]:placeholder-primary-dark-active",
        },
        secondary: {
            idle: "border-secondary-normal [&>input]:placeholder-secondary-normal",
            hover: "hover:border-secondary-dark [&>input]:placeholder-secondary-dark",
            active: "focus-within:border-secondary-dark-active [&>input]:placeholder-secondary-dark-active",
        },
    };

    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                Object.values(variantClassNames[variant]),
                "relative rounded-xl border-2 transition duration-200 [&>input:is(:focus-within,:not(:placeholder-shown))+label]:right-auto [&>input:is(:focus-within,:not(:placeholder-shown))+label]:top-0",
                className
            )}
        >
            <input
                className="w-full px-6 py-2"
                placeholder={placeholder ?? ""}
                {...props}
            />
            <Typography
                variant="label"
                className="bg-background-light pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 px-2 transition-all duration-200"
            >
                {label ?? name.toTitleCase()}
            </Typography>
        </div>
    );
};
