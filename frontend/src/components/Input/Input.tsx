import { twJoin, twMerge } from "tailwind-merge";
import { Typography } from "../Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import {
    FC,
    useState,
    PropsWithChildren,
    InputHTMLAttributes,
    LabelHTMLAttributes,
} from "react";

export type InputProps = {
    name: string;
    variant?: Variant;
    errorMessage?: string;
    label?: PropsWithChildren["children"];
} & ChildlessComponentProps<HTMLDivElement> &
    Omit<InputHTMLAttributes<HTMLInputElement>, "children">;

export const Input: FC<InputProps> = ({
    id,
    ref,
    name,
    label,
    required,
    onChange,
    className,
    placeholder,
    errorMessage,
    value: _value,
    variant = "default",
    ...props
}) => {
    const inputID = `input-${name}`;
    const { direction } = useLocalization();

    const [value, setValue] = useState(_value ?? "");

    const variantClassNames: VariantClassNames = {
        default: {
            idle: "[&>input]:border-tertiary-light-active [&>input]:placeholder-tertiary-light-active",
            hover: "hover:border-tertiary-normal",
            active: "focus-within:border-tertiary-normal-active",
        },
        primary: {
            idle: "[&>input]:border-primary-normal [&>input]:placeholder-primary-normal",
            hover: "hover:border-primary-dark [&>input]:placeholder-primary-dark",
            active: "focus-within:border-primary-dark-active [&>input]:placeholder-primary-dark-active",
        },
        secondary: {
            idle: "[&>input]:border-secondary-normal [&>input]:placeholder-secondary-normal",
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
                "relative rounded-xl transition duration-200 [&>input:is(:focus-within,:not(:placeholder-shown))+label]:top-0",
                direction == "ltr"
                    ? "[&>input:is(:focus-within,:not(:placeholder-shown))+label]:right-auto"
                    : "[&>input:is(:focus-within,:not(:placeholder-shown))+label]:left-auto",
                errorMessage != null ? "mb-[calc(var(--spacing)*8)]" : "",
                className
            )}
        >
            <input
                id={inputID}
                className="w-full text-ellipsis rounded-[inherit] border-2 px-6 py-2"
                value={value}
                required={required}
                placeholder={placeholder ?? ""}
                onChange={(e) => (onChange?.(e), setValue(e.target.value))}
                {...props}
            />
            <Typography<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>
                className="bg-background-light pointer-events-none absolute inset-x-4 top-1/2 max-w-[calc(100%-var(--spacing)*10)] -translate-y-1/2 overflow-clip text-ellipsis text-nowrap px-2 transition-all duration-200"
                variant="label"
                htmlFor={inputID}
            >
                {label ?? name.toTitleCase()}
                {required && (
                    <span className="text-vibrant-red font-bold">*</span>
                )}
            </Typography>
            {errorMessage != null && (
                <Typography
                    data-error-message
                    className={twJoin(
                        direction == "ltr" ? "pl-6" : "pr-6",
                        "text-vibrant-red absolute inset-x-0 top-[calc(100%+var(--spacing)*2)] overflow-hidden text-ellipsis text-nowrap px-4"
                    )}
                    variant="p"
                    title={errorMessage}
                >
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};
