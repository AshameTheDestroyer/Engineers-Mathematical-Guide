import { twJoin, twMerge } from "tailwind-merge";
import { Typography } from "../Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import {
    FC,
    PropsWithChildren,
    InputHTMLAttributes,
    LabelHTMLAttributes,
} from "react";

export type InputProps = {
    name: string;
    variant?: Variant;
    errorMessage?: string;
    functionallyRequired?: boolean;
    label?: PropsWithChildren["children"];
} & ChildlessComponentProps<HTMLDivElement> &
    Omit<InputHTMLAttributes<HTMLInputElement>, "children">;

export const Input: FC<InputProps> = ({
    id,
    ref,
    name,
    label,
    required,
    className,
    placeholder,
    errorMessage,
    variant = "default",
    functionallyRequired,
    ...props
}) => {
    const inputID = `input-${id ?? name}`;
    const { direction } = useLocalization();

    const variantClassNames: VariantClassNames = {
        default: {
            idle: "[&>input]:border-tertiary-light-active [&>input]:placeholder-tertiary-light-active",
            hover: "hover:[&>input]:border-tertiary-normal",
            active: "focus-within:[&>input]:border-tertiary-normal-active",
        },
        primary: {
            idle: "[&>input]:border-primary-normal [&>input]:placeholder-primary-normal",
            hover: "hover:[&>input]:border-primary-dark hover:[&>input]:placeholder-primary-dark",
            active: "focus-within:[&>input]:border-primary-dark-active focus-within:[&>input]:placeholder-primary-dark-active",
        },
        secondary: {
            idle: "[&>input]:border-secondary-normal [&>input]:placeholder-secondary-normal",
            hover: "hover:[&>input]:border-secondary-dark hover:[&>input]:placeholder-secondary-dark",
            active: "focus-within:[&>input]:border-secondary-dark-active focus-within:[&>input]:placeholder-secondary-dark-active",
        },
        information: {
            idle: "[&>input]:border-vibrant-blue-normal [&>input]:placeholder-vibrant-blue-normal",
            hover: "hover:[&>input]:border-vibrant-blue-dark hover:[&>input]:placeholder-vibrant-blue-dark",
            active: "focus-within:saturate-150",
        },
        warning: {
            idle: "[&>input]:border-vibrant-yellow-normal [&>input]:placeholder-vibrant-yellow-normal",
            hover: "hover:[&>input]:border-vibrant-yellow-dark hover:[&>input]:placeholder-vibrant-yellow-dark",
            active: "focus-within:saturate-150",
        },
        success: {
            idle: "[&>input]:border-vibrant-green-normal [&>input]:placeholder-vibrant-green-normal",
            hover: "hover:[&>input]:border-vibrant-green-dark hover:[&>input]:placeholder-vibrant-green-dark",
            active: "focus-within:saturate-150",
        },
        error: {
            idle: "[&>input]:border-vibrant-red-normal [&>input]:placeholder-vibrant-red-normal",
            hover: "hover:[&>input]:border-vibrant-red-dark hover:[&>input]:placeholder-vibrant-red-dark",
            active: "focus-within:saturate-150",
        },
        epic: {
            idle: "[&>input]:border-vibrant-purple-normal [&>input]:placeholder-vibrant-purple-normal",
            hover: "hover:[&>input]:border-vibrant-purple-dark hover:[&>input]:placeholder-vibrant-purple-dark",
            active: "focus-within:saturate-150",
        },
    };

    return (
        <div
            ref={ref}
            id={id ?? name}
            className={twMerge(
                Object.values(variantClassNames[variant]),
                "relative flex flex-col gap-2 rounded-xl transition duration-200 [&>input:is(:focus-within,:not(:placeholder-shown))+label]:top-0",
                direction == "ltr"
                    ? "[&>input:is(:focus-within,:not(:placeholder-shown))+label]:right-auto"
                    : "[&>input:is(:focus-within,:not(:placeholder-shown))+label]:left-auto",
                props.disabled && "grayscale-50 opacity-75",
                className
            )}
        >
            <input
                id={inputID}
                className="w-full text-ellipsis rounded-[inherit] border-2 px-6 py-2"
                required={functionallyRequired}
                placeholder={placeholder ?? ""}
                {...props}
            />
            <Typography<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>
                className="bg-background-light pointer-events-none absolute inset-x-4 top-6 h-7 max-w-[calc(100%-var(--spacing)*10)] -translate-y-1/2 overflow-clip text-ellipsis text-nowrap px-2 transition-all duration-200"
                variant="label"
                htmlFor={inputID}
            >
                {label ?? name.toTitleCase()}
                {required && (
                    <span className="text-vibrant-red-normal font-bold">*</span>
                )}
            </Typography>
            {errorMessage != null && (
                <Typography
                    data-error-message
                    className={twJoin(
                        direction == "ltr" ? "pl-6" : "pr-6",
                        "text-vibrant-red-normal px-4"
                    )}
                    variant="p"
                >
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};
