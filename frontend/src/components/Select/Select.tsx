import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import { InputProps } from "../Input/Input";
import { twJoin, twMerge } from "tailwind-merge";
import { DropDownProps } from "../DropDown/DropDown";
import { Typography } from "../Typography/Typography";
import { DropDownList } from "../DropDownList/DropDownList";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import {
    FC,
    useRef,
    useState,
    useEffect,
    PropsWithChildren,
    InputHTMLAttributes,
    LabelHTMLAttributes,
    SelectHTMLAttributes,
    ButtonHTMLAttributes,
} from "react";

export type SelectProps<T extends EnumValues> = {
    options: T;
    name: string;
    value?: T[number];
    placeholderOfNone?: string;
    MapOptions?: (value: T[number]) => string;
    RendersOptions?: (key: T[number]) => PropsWithChildren["children"];
} & Omit<
    InputProps,
    "type" | "ref" | keyof InputHTMLAttributes<HTMLInputElement>
> &
    WithPartial<
        Omit<
            DropDownProps,
            "text" | "children" | keyof ButtonHTMLAttributes<HTMLButtonElement>
        >,
        "position"
    > &
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "children">;

export const Select = <T extends EnumValues>({
    id,
    ref,
    name,
    label,
    onFocus,
    required,
    onChange,
    className,
    MapOptions,
    errorMessage,
    value: _value,
    RendersOptions,
    options: _options,
    placeholderOfNone,
    variant = "default",
    doesTextGrow = true,
    functionallyRequired,
    doesHaveOverflowScroll,
    doesHaveMinimumWidth = true,
    doesCloseOnInteraction = true,
    position = "bottom-center",
    ...props
}: SelectProps<T>): ReturnType<FC<SelectProps<T>>> => {
    const inputID = `input-${id ?? name}`;
    const { direction } = useLocalization();

    const dropDownReference = useRef<HTMLDivElement>(null);
    const [labelParent, setLabelParent] = useState<HTMLButtonElement>();

    const [value, setValue] = useState(_value ?? "");

    const options = value != "" && !required ? ["", ..._options] : _options;

    const variantClassNames: VariantClassNames = {
        default: {
            idle: "[&>button>div]:border-tertiary-light-active",
            hover: "hover:[&>button>div]:border-tertiary-normal",
            active: "active:[&>button>div]:border-tertiary-normal-active",
        },
        primary: {
            idle: "[&>button>div]:border-primary-normal",
            hover: "hover:[&>button>div]:border-primary-dark",
            active: "active:[&>button>div]:border-primary-dark-active",
        },
        secondary: {
            idle: "[&>button>div]:border-secondary-normal",
            hover: "hover:[&>button>div]:border-secondary-dark",
            active: "active:[&>button>div]:border-secondary-dark-active",
        },
    };

    useEffect(() => {
        if (dropDownReference.current == null) {
            return;
        }

        setLabelParent(
            dropDownReference.current.querySelector(
                "button"
            ) as HTMLButtonElement
        );
    }, [dropDownReference.current]);

    useEffect(() => {
        if (dropDownReference.current == null) {
            return;
        }

        onChange?.({ target: { value: MapOptions?.(value) ?? value } } as any);
    }, [value, dropDownReference.current]);

    const RenderOption: FC<{ option: typeof value }> = ({ option }) => {
        return option != ""
            ? (RendersOptions?.(option) ?? `${option}`.toTitleCase())
            : (placeholderOfNone ?? "None");
    };

    return (
        <div
            ref={ref}
            id={id ?? name}
            className={twMerge("relative flex flex-col gap-3", className)}
        >
            <select
                id={inputID}
                className="pointer-events-none absolute opacity-0"
                name={name}
                required={functionallyRequired}
                onFocus={(e) => (
                    onFocus?.(e),
                    dropDownReference.current?.querySelector("button")?.click()
                )}
                {...props}
            >
                {options.map((option, i) => (
                    <option key={i} value={MapOptions?.(option) ?? `${option}`}>
                        {MapOptions?.(option) ?? `${option}`}
                    </option>
                ))}
            </select>
            <DropDownList
                ref={dropDownReference}
                className={twMerge(
                    Object.values(variantClassNames[variant]),
                    value == ""
                        ? "[&>button:active>label]:top-6.5"
                        : "[&>button:active>label]:top-1",
                    direction == "ltr"
                        ? "[&>button>[data-content]]:pl-6 [&>button>[data-content]]:pr-3.5"
                        : "[&>button>[data-content]]:pl-3.5 [&>button>[data-content]]:pr-6",
                    "h-[calc(var(--spacing)*10)] [&>button>[data-thickness]]:border-t-0 [&>button>div]:bg-[transparent!important] [&>button>div]:transition-[color,background-color,border] [&>button>div]:duration-200 [&>button]:text-[var(--color-foreground-darker)!important]"
                )}
                position={position}
                doesTextGrow={doesTextGrow}
                text={<RenderOption option={value} />}
                doesHaveMinimumWidth={doesHaveMinimumWidth}
                doesCloseOnInteraction={doesCloseOnInteraction}
                doesHaveOverflowScroll={doesHaveOverflowScroll}
            >
                {options.map((option, i) => (
                    <Button
                        key={i}
                        data-selected={value == option}
                        variant={value == option ? "primary" : "default"}
                        onClick={(_e) => setValue(option)}
                    >
                        <RenderOption option={option} />
                    </Button>
                ))}
            </DropDownList>
            {labelParent != null &&
                createPortal(
                    <Typography<
                        HTMLLabelElement,
                        LabelHTMLAttributes<HTMLLabelElement>
                    >
                        className={twJoin(
                            direction == "ltr"
                                ? value == ""
                                    ? "top-5.5 right-10"
                                    : "top-0"
                                : value == ""
                                  ? "top-5.5 left-10"
                                  : "top-0",
                            direction == "ltr" ? "left-4" : "right-4",
                            "bg-background-light pointer-events-none absolute h-7 max-w-[calc(100%-var(--spacing)*10)] -translate-y-1/2 overflow-clip text-ellipsis text-nowrap px-2 text-start transition-[top,color,background-color] duration-200"
                        )}
                        variant="label"
                        htmlFor={inputID}
                    >
                        {label ?? name.toTitleCase()}
                        {required && (
                            <span className="text-vibrant-red font-bold">
                                *
                            </span>
                        )}
                    </Typography>,
                    labelParent
                )}
            {errorMessage != null && (
                <Typography
                    data-error-message
                    className={twJoin(
                        direction == "ltr" ? "pl-6" : "pr-6",
                        "text-vibrant-red px-4"
                    )}
                    variant="p"
                >
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};
