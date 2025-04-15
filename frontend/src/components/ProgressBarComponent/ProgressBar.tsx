import { FC, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type ProgressBarProps = ChildlessComponentProps<HTMLDivElement> & {
    value: number;
    maximum?: number;
    minimum?: number;
    variant?: Variant;
    onComplete?: () => void;
    onProgress?: (value: number) => void;
};

export const ProgressBar: FC<ProgressBarProps> = ({
    id,
    ref,
    value,
    className,
    onProgress,
    onComplete,
    minimum = 0,
    maximum = 100,
    variant = "primary",
}) => {
    if (minimum >= maximum) {
        throw new Error("Minimum value must be less than maximum value.");
    }

    if (value < minimum || value > maximum) {
        throw new Error(
            "Value is out of bounds of minimum value and maximum value."
        );
    }

    const percentage = ((value - minimum) / (maximum - minimum)) * 100;

    useEffect(() => {
        onProgress?.(value);

        if (value == maximum) {
            onComplete?.();
        }
    }, [value, onProgress, onComplete]);

    const variantClassNames = {
        default:
            "[&>div]:bg-tertiary-light [&>div]:border-tertiary-dark border-tertiary-dark bg-tertiary-normal-hover",
        primary:
            "[&>div]:bg-primary-normal [&>div]:border-primary-darker border-primary-darker bg-primary-dark-hover",
        secondary:
            "[&>div]:bg-secondary-normal [&>div]:border-secondary-darker border-secondary-darker bg-secondary-dark-hover",
    };

    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                variantClassNames[variant],
                "border-3 flex h-5 w-full rounded-full",
                className
            )}
        >
            <div
                role="progressbar"
                className="border-3 -m-[3px] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};
