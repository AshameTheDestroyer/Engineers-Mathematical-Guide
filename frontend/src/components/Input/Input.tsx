import { twMerge } from "tailwind-merge";
import { FC, InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { Typography } from "../Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type InputProps = {
    name: string;
    label?: string;
    variant?: Variant;
} & ChildlessComponentProps<HTMLDivElement> &
    Omit<InputHTMLAttributes<HTMLInputElement>, "children">;

export const Input: FC<InputProps> = ({
    id,
    ref,
    name,
    label,
    className,
    placeholder,
    variant = "default",
    ...props
}) => {
    const inputID = `input-${name}`;

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
                id={inputID}
                className="w-full rounded-[inherit] px-6 py-2"
                placeholder={placeholder ?? ""}
                {...props}
            />
            <Typography<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>
                className="bg-background-light pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 px-2 transition-all duration-200"
                variant="label"
                htmlFor={inputID}
            >
                {label ?? name.toTitleCase()}
            </Typography>
        </div>
    );
};
