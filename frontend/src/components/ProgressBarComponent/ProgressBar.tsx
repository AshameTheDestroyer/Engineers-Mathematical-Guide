import { FC, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type ProgressBarProps = ChildlessComponentProps<HTMLDivElement> & {
    value: number;
    maximum?: number;
    minimum?: number;
    variant?: Variant;
    onComplete?: () => void;
    checkpoints?: Array<number>;
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
    checkpoints,
}) => {
    if (minimum >= maximum) {
        throw new Error("Minimum value must be less than maximum value.");
    }

    if (value < minimum || value > maximum) {
        throw new Error(
            "Value is out of bounds of minimum value and maximum value."
        );
    }

    function GetPercentage(value: number) {
        return ((value - minimum) / (maximum - minimum)) * 100;
    }

    useEffect(() => {
        onProgress?.(value);

        if (value == maximum) {
            onComplete?.();
        }
    }, [value, onProgress, onComplete]);

    const variantClassNames = {
        default:
            "[&>div]:bg-tertiary-light [&>div]:border-tertiary-dark border-tertiary-dark bg-tertiary-normal-hover text-tertiary-normal [&>div[data-reached=false]]:bg-tertiary-normal-hover [&>div[data-reached=false]]:text-tertiary-dark",
        primary:
            "[&>div]:bg-primary-normal [&>div]:border-primary-darker border-primary-darker bg-primary-dark-hover text-primary-light [&>div[data-reached=false]]:bg-primary-dark-hover [&>div[data-reached=false]]:text-primary-dark-active",
        secondary:
            "[&>div]:bg-secondary-normal [&>div]:border-secondary-darker border-secondary-darker bg-secondary-dark-hover text-primary-light [&>div[data-reached=false]]:bg-secondary-dark-hover [&>div[data-reached=false]]:text-secondary-dark-active",
    };

    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                variantClassNames[variant],
                "border-3 relative flex h-5 w-full rounded-full",
                className
            )}
        >
            <div
                role="progressbar"
                className="border-3 -m-[3px] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${GetPercentage(value)}%` }}
            />
            {checkpoints?.map((checkpoint, i) => {
                if (checkpoint < minimum || checkpoint > maximum) {
                    throw new Error(
                        "Checkpoints are out of bounds of minimum value and maximum value."
                    );
                }

                return (
                    <div
                        key={i}
                        data-reached={value >= checkpoint}
                        className="border-3 absolute top-1/2 flex aspect-square w-[calc(3ch+var(--spacing)*4)] -translate-x-[calc(100%-3px)] -translate-y-1/2 place-content-center place-items-center rounded-full font-bold"
                        style={{ left: `${GetPercentage(checkpoint)}%` }}
                    >
                        {checkpoint}
                    </div>
                );
            })}
        </div>
    );
};
