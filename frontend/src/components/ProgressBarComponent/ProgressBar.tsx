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
            "[&>div]:bg-tertiary-light border-tertiary-normal bg-tertiary-dark",
        primary:
            "[&>div]:bg-primary-normal border-primary-dark bg-primary-darker",
        secondary:
            "[&>div]:bg-secondary-normal border-secondary-dark bg-secondary-darker",
    };

    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                variantClassNames[variant],
                "flex h-4 w-full rounded-full border-2",
                className
            )}
        >
            <div
                role="progressbar"
                className="rounded-full transition-all duration-300 ease-out"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};
